import type { ImageItem } from '../types';
import { isAllowedImage, sanitizeFilename, isHeicFile } from './fileSanitizer';

export interface LoadProgressCallback {
  (loaded: number, total: number, currentFileName: string): void;
}

/** Maximum dimension (width or height) for generated thumbnail blobs in px */
const MAX_THUMBNAIL_DIMENSION = 480;
const THUMBNAIL_JPEG_QUALITY = 0.82;
const BATCH_SIZE = 4;

/**
 * Loads and decodes an array of local image files into ImageItem models with
 * memory-safe progressive batching, EXIF orientation correction, and downscaled thumbnails.
 */
export async function loadImagesFromFiles(
  files: File[] | FileList,
  onProgress?: LoadProgressCallback
): Promise<ImageItem[]> {
  const fileArray = Array.from(files).filter(isAllowedImage);
  if (fileArray.length === 0) return [];

  const total = fileArray.length;
  let loaded = 0;
  const results: ImageItem[] = [];

  // Process in progressive concurrent batches to prevent event loop starvation and memory spikes
  for (let i = 0; i < total; i += BATCH_SIZE) {
    const batch = fileArray.slice(i, i + BATCH_SIZE);
    const batchPromises = batch.map(async (file) => {
      try {
        const item = await decodeSingleImage(file);
        loaded++;
        if (onProgress) {
          onProgress(loaded, total, file.name);
        }
        return item;
      } catch (err) {
        if (isHeicFile(file)) {
          console.warn(
            `Failed to decode HEIC/HEIF file "${file.name}". Your browser or OS may lack native HEIC/HEIF decoding support (natively supported in Safari, iOS, macOS, or Chromium with HEVC codecs). Please convert to JPEG or PNG.`
          );
        } else {
          console.warn(`Failed to decode image "${file.name}":`, err);
        }
        loaded++;
        if (onProgress) {
          onProgress(loaded, total, file.name);
        }
        return null;
      }
    });

    const batchResults = await Promise.all(batchPromises);
    for (const item of batchResults) {
      if (item) results.push(item);
    }

    // Yield control to the browser between batches so UI remains responsive
    if (i + BATCH_SIZE < total) {
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  }

  return results;
}

/**
 * Generates a bounded thumbnail blob (max 480px) from a canvas image source
 * to prevent retaining high-resolution uncompressed bitmaps in memory for sidebar thumbnails.
 */
async function generateThumbnailBlob(
  source: CanvasImageSource,
  width: number,
  height: number
): Promise<Blob | null> {
  if (width <= 0 || height <= 0) return null;

  let thumbWidth = width;
  let thumbHeight = height;

  if (thumbWidth > MAX_THUMBNAIL_DIMENSION || thumbHeight > MAX_THUMBNAIL_DIMENSION) {
    if (thumbWidth > thumbHeight) {
      thumbHeight = Math.max(1, Math.round((MAX_THUMBNAIL_DIMENSION / thumbWidth) * thumbHeight));
      thumbWidth = MAX_THUMBNAIL_DIMENSION;
    } else {
      thumbWidth = Math.max(1, Math.round((MAX_THUMBNAIL_DIMENSION / thumbHeight) * thumbWidth));
      thumbHeight = MAX_THUMBNAIL_DIMENSION;
    }
  }

  // Use OffscreenCanvas where available to avoid DOM overhead
  if (typeof OffscreenCanvas !== 'undefined') {
    try {
      const offscreen = new OffscreenCanvas(thumbWidth, thumbHeight);
      const ctx = offscreen.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'medium';
        ctx.drawImage(source, 0, 0, thumbWidth, thumbHeight);
        return await offscreen.convertToBlob({
          type: 'image/jpeg',
          quality: THUMBNAIL_JPEG_QUALITY,
        });
      }
    } catch {
      // Fallback to DOM canvas if OffscreenCanvas fails
    }
  }

  if (typeof document !== 'undefined') {
    const canvas = document.createElement('canvas');
    canvas.width = thumbWidth;
    canvas.height = thumbHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'medium';
      ctx.drawImage(source, 0, 0, thumbWidth, thumbHeight);
      return new Promise<Blob | null>((resolve) => {
        canvas.toBlob(
          (blob) => resolve(blob),
          'image/jpeg',
          THUMBNAIL_JPEG_QUALITY
        );
      });
    }
  }

  return null;
}

/**
 * Decodes a single file using createImageBitmap with EXIF orientation correction,
 * falling back gracefully to HTMLImageElement. Immediately generates a lightweight thumbnail
 * and releases uncompressed bitmap memory.
 */
async function decodeSingleImage(file: File): Promise<ImageItem> {
  const id = `img_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  const sanitizedName = sanitizeFilename(file.name);
  const isHeic = isHeicFile(file);

  let width = 0;
  let height = 0;
  let thumbnailBlob: Blob | null = null;
  let decodedViaBitmap = false;

  // Prefer createImageBitmap with EXIF orientation handling
  if (typeof createImageBitmap !== 'undefined') {
    let bitmap: ImageBitmap | null = null;
    try {
      bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
    } catch {
      // Retry without options if browser doesn't support the imageOrientation option
      try {
        bitmap = await createImageBitmap(file);
      } catch {
        bitmap = null;
      }
    }

    if (bitmap) {
      width = bitmap.width;
      height = bitmap.height;
      try {
        thumbnailBlob = await generateThumbnailBlob(bitmap, width, height);
      } finally {
        // Critical memory safeguard: release uncompressed GPU/RAM pixel buffer immediately
        bitmap.close();
      }
      decodedViaBitmap = true;
    }
  }

  // Fallback to Image element if createImageBitmap is unsupported or failed
  if (!decodedViaBitmap) {
    const fallbackUrl = URL.createObjectURL(file);
    try {
      const img = await loadImageElement(fallbackUrl);
      width = img.naturalWidth || 800;
      height = img.naturalHeight || 600;
      thumbnailBlob = await generateThumbnailBlob(img, width, height);
      img.src = '';
    } catch (err) {
      URL.revokeObjectURL(fallbackUrl);
      if (isHeic) {
        throw new Error(
          `Browser could not decode HEIC/HEIF image "${file.name}". Native HEIC support is required.`
        );
      }
      throw err;
    }
  }

  const previewUrl = URL.createObjectURL(file);
  const thumbnailUrl = thumbnailBlob ? URL.createObjectURL(thumbnailBlob) : previewUrl;
  const aspectRatio = width / (height || 1);

  return {
    id,
    file,
    name: file.name,
    sanitizedName,
    size: file.size,
    type: file.type || (isHeic ? 'image/heic' : 'image/jpeg'),
    width,
    height,
    aspectRatio,
    previewUrl,
    thumbnailUrl,
    status: 'unreviewed',
    order: 0,
    lastModified: file.lastModified,
  };
}

function loadImageElement(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      resolve(img);
    };
    img.onerror = () => {
      reject(new Error(`Failed to load image element for ${url}`));
    };
    img.src = url;
  });
}
