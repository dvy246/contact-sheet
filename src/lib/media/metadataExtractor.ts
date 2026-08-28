import ExifReader from 'exifreader';
import type { ImageExifData } from '../types';

/** Common RAW photo extensions that typically store IFD/XMP headers deeper in the file */
const RAW_EXTENSIONS = new Set([
  'cr2',
  'cr3',
  'nef',
  'nrw',
  'arw',
  'srf',
  'sr2',
  'dng',
  'orf',
  'rw2',
  'pef',
  'raf',
  'raw',
]);

const STAGE_1_PROBE_SIZE = 131072; // 128 KB
const STAGE_2_FALLBACK_SIZE = 524288; // 512 KB

/**
 * Extracts photographic EXIF, IPTC, and XMP metadata client-side using ExifReader
 * with a memory-safe two-stage byte range slice. Avoids loading multi-megabyte image
 * buffers into memory, keeping decoding instant and tab memory bounded.
 */
export async function extractMetadataWithTwoStageSlicing(file: File): Promise<ImageExifData> {
  const fallbackDate = file.lastModified ? new Date(file.lastModified) : undefined;
  if (!file || file.size === 0) {
    return { captureDate: fallbackDate };
  }

  const ext = (file.name.split('.').pop() || '').toLowerCase();
  const isRaw = RAW_EXTENSIONS.has(ext);

  // Stage 1: Fast 128KB slice (or direct 512KB for known deep-header RAW formats)
  const initialProbeSize = isRaw ? STAGE_2_FALLBACK_SIZE : STAGE_1_PROBE_SIZE;
  const stage1Slice = file.slice(0, Math.min(file.size, initialProbeSize));

  let tags: any = null;

  try {
    const stage1Buffer = await stage1Slice.arrayBuffer();
    tags = ExifReader.load(stage1Buffer, { expanded: true });
  } catch {
    // Stage 2 Fallback: If initial 128KB probe failed on a JPEG/TIFF with large APP1/XMP markers,
    // retry with 512KB slice before falling back to empty metadata.
    if (!isRaw && file.size > STAGE_1_PROBE_SIZE) {
      try {
        const stage2Slice = file.slice(0, Math.min(file.size, STAGE_2_FALLBACK_SIZE));
        const stage2Buffer = await stage2Slice.arrayBuffer();
        tags = ExifReader.load(stage2Buffer, { expanded: true });
      } catch {
        return { captureDate: fallbackDate };
      }
    } else {
      return { captureDate: fallbackDate };
    }
  }

  if (!tags || typeof tags !== 'object') {
    return { captureDate: fallbackDate };
  }

  return parseExifTags(tags, fallbackDate);
}

/**
 * Parses raw ExifReader tags into a structured, type-safe ImageExifData model.
 */
function parseExifTags(tags: any, fallbackDate?: Date): ImageExifData {
  const exif = tags.exif;
  const xmp = tags.xmp;
  const iptc = tags.iptc;
  const composite = tags.composite;
  const makerNotes = tags.makerNotes;

  // 1. Date & Time
  const dateTimeOriginal = cleanString(
    exif?.DateTimeOriginal?.description ||
    xmp?.DateTimeOriginal?.description ||
    exif?.DateTime?.description ||
    exif?.DateTimeDigitized?.description ||
    iptc?.['Date Created']?.description
  );
  const captureDate = parseExifDate(dateTimeOriginal, fallbackDate);

  // 2. Camera hardware
  const cameraMake = cleanString(exif?.Make?.description || xmp?.Make?.description);
  const cameraModel = cleanString(exif?.Model?.description || xmp?.Model?.description);

  // 3. Lens info
  const lensModel = cleanString(
    exif?.LensModel?.description ||
    xmp?.LensModel?.description ||
    exif?.Lens?.description ||
    makerNotes?.LensModel?.description
  );

  // 4. Exposure parameters
  const focalLength = formatFocalLength(
    exif?.FocalLength?.description || composite?.FocalLength35efl?.description
  );
  const fNumber = formatFNumber(exif?.FNumber?.description || exif?.ApertureValue?.description);
  const exposureTime = formatExposureTime(
    exif?.ExposureTime?.description || exif?.ShutterSpeedValue?.description
  );
  const iso = parseIso(
    exif?.ISOSpeedRatings?.value ??
    exif?.ISOSpeedRatings?.description ??
    exif?.PhotographicSensitivity?.value ??
    xmp?.ISO?.value ??
    exif?.ISO?.value
  );
  const exposureBias = formatExposureBias(exif?.ExposureBiasValue?.description);

  // 5. In-camera rating (XMP or EXIF Rating)
  const rating = parseRating(
    xmp?.Rating?.value ??
    exif?.Rating?.value ??
    xmp?.Rating?.description
  );

  // 6. Copyright
  const copyright = cleanString(
    exif?.Copyright?.description ||
    iptc?.['Copyright Notice']?.description ||
    xmp?.rights?.description ||
    iptc?.['Credit']?.description
  );

  return {
    dateTimeOriginal,
    captureDate,
    cameraMake,
    cameraModel,
    lensModel,
    focalLength,
    fNumber,
    exposureTime,
    iso,
    exposureBias,
    rating,
    copyright,
  };
}

/**
 * Normalizes and parses an EXIF date string ("YYYY:MM:DD HH:MM:SS" or ISO 8601) into a Date object.
 */
function parseExifDate(dateStr?: string, fallback?: Date): Date | undefined {
  if (dateStr && typeof dateStr === 'string') {
    const trimmed = dateStr.trim();
    // Replace EXIF colons in YYYY:MM:DD with dashes (e.g. "2024:08:29 14:05:00" -> "2024-08-29T14:05:00")
    const normalized = trimmed
      .replace(/^(\d{4}):(\d{2}):(\d{2})/, '$1-$2-$3')
      .replace(' ', 'T');
    const parsed = new Date(normalized);
    if (!isNaN(parsed.getTime())) {
      return parsed;
    }
    // Try original string directly
    const directParsed = new Date(trimmed);
    if (!isNaN(directParsed.getTime())) {
      return directParsed;
    }
  }
  return fallback;
}

/**
 * Trims strings, removes null termination characters, and converts empty strings to undefined.
 */
function cleanString(val: any): string | undefined {
  if (val === undefined || val === null) return undefined;
  const str = String(val).replace(/\0/g, '').trim();
  return str.length > 0 ? str : undefined;
}

/**
 * Formats focal length cleanly (e.g. "85mm", "24-70mm").
 */
function formatFocalLength(val: any): string | undefined {
  const cleaned = cleanString(val);
  if (!cleaned) return undefined;
  if (/^\d+(\.\d+)?$/.test(cleaned)) {
    return `${cleaned}mm`;
  }
  // Replace "50 mm" with "50mm"
  return cleaned.replace(/(\d+)\s+mm\b/i, '$1mm');
}

/**
 * Formats f-number / aperture (e.g. "f/1.4", "f/2.8").
 */
function formatFNumber(val: any): string | undefined {
  const cleaned = cleanString(val);
  if (!cleaned) return undefined;
  if (cleaned.toLowerCase().startsWith('f/')) {
    return cleaned.toLowerCase();
  }
  if (/^\d+(\.\d+)?$/.test(cleaned)) {
    return `f/${cleaned}`;
  }
  return cleaned;
}

/**
 * Formats shutter speed / exposure time (e.g. "1/500s", "2s").
 */
function formatExposureTime(val: any): string | undefined {
  const cleaned = cleanString(val);
  if (!cleaned) return undefined;
  if (cleaned.endsWith('s') || cleaned.endsWith('sec') || cleaned.endsWith('sec.')) {
    return cleaned;
  }
  if (/^\d+\/\d+$/.test(cleaned) || /^\d+(\.\d+)?$/.test(cleaned)) {
    return `${cleaned}s`;
  }
  return cleaned;
}

/**
 * Parses ISO value into a valid integer.
 */
function parseIso(val: any): number | undefined {
  if (val === undefined || val === null) return undefined;
  if (typeof val === 'number' && !isNaN(val) && val > 0) {
    return Math.round(val);
  }
  if (Array.isArray(val) && val.length > 0) {
    return parseIso(val[0]);
  }
  const num = parseInt(String(val).replace(/\D/g, ''), 10);
  return !isNaN(num) && num > 0 ? num : undefined;
}

/**
 * Formats exposure bias value (e.g. "+0.3 EV", "-0.7 EV", "0 EV").
 */
function formatExposureBias(val: any): string | undefined {
  const cleaned = cleanString(val);
  if (!cleaned) return undefined;
  if (/^[+-]?\d+(\.\d+)?$/.test(cleaned)) {
    const num = parseFloat(cleaned);
    const sign = num > 0 ? '+' : '';
    return `${sign}${cleaned} EV`;
  }
  return cleaned.includes('EV') ? cleaned : `${cleaned} EV`;
}

/**
 * Parses in-camera rating (1 to 5 stars).
 */
function parseRating(val: any): number | undefined {
  if (val === undefined || val === null) return undefined;
  const num = parseInt(String(val), 10);
  if (!isNaN(num) && num >= 1 && num <= 5) {
    return num;
  }
  return undefined;
}
