import type { ImageExifData, ImageItem } from '../types';

export interface BatchRenameRecipe {
  prefix: string;
  startNumber: number;
  padding: number;
  suffix: string;
  template: string; // e.g. '{prefix}{index}{suffix}'
  caseTransform: 'preserve' | 'lowercase' | 'uppercase';
  replaceSpacesWith: 'none' | 'hyphen' | 'underscore';
}

export interface BatchRenameItem {
  id: string;
  originalName: string;
  newName: string;
  extension: string;
  size: number;
  exif?: ImageExifData;
}

export interface BatchConvertOptions {
  targetFormat: 'image/jpeg' | 'image/png' | 'image/webp';
  quality: number; // 0.1 to 1.0
  maxDimension?: number; // 0 = original
  preserveExif?: boolean;
  aspectRatio?: 'original' | '1:1' | '4:5' | '16:9' | '9:16' | '3:2' | '2:3';
  cropMode?: 'cover' | 'contain' | 'none';
}

export interface BatchConvertResult {
  id: string;
  originalName: string;
  convertedBlob: Blob;
  convertedFilename: string;
  originalSize: number;
  convertedSize: number;
}

/**
 * Resolves a rename string with dynamic token substitution.
 */
export function applyRenamePattern(
  originalName: string,
  index: number,
  recipe: BatchRenameRecipe,
  exif?: ImageExifData
): string {
  const lastDot = originalName.lastIndexOf('.');
  const baseName = lastDot > 0 ? originalName.slice(0, lastDot) : originalName;
  const ext = lastDot > 0 ? originalName.slice(lastDot + 1) : '';

  const paddedIndex = index.toString().padStart(Math.max(1, recipe.padding), '0');

  let result = recipe.template || '{prefix}{index}{suffix}';

  // Core replacements (use function replacers to prevent $1, $& regex expansion issues)
  result = result.replace(/\{name\}|\{basename\}/gi, () => baseName);
  result = result.replace(/\{filename\}/gi, () => originalName);
  result = result.replace(/\{ext\}/gi, () => ext);
  result = result.replace(/\{prefix\}/gi, () => recipe.prefix || '');
  result = result.replace(/\{suffix\}/gi, () => recipe.suffix ? `_${recipe.suffix}` : '');
  result = result.replace(/\{index\}/gi, () => paddedIndex);

  // EXIF replacements
  if (exif) {
    result = result.replace(/\{camera\}/gi, () => (exif.cameraModel || exif.cameraMake || '').replace(/\s+/g, '-'));
    result = result.replace(/\{lens\}/gi, () => (exif.lensModel || '').replace(/\s+/g, '-'));
    result = result.replace(/\{focal\}/gi, () => exif.focalLength || '');
    result = result.replace(/\{fstop\}|\{aperture\}/gi, () => (exif.fNumber || '').replace('f/', 'f'));
    result = result.replace(/\{iso\}/gi, () => exif.iso ? `ISO${exif.iso}` : '');
    if (exif.captureDate) {
      const d = exif.captureDate;
      const yyyymmdd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
      result = result.replace(/\{date\}/gi, () => yyyymmdd);
    }
  }

  // Clean empty tokens
  result = result.replace(/\{[a-z0-9_-]+\}/gi, '');

  // Space replacement
  if (recipe.replaceSpacesWith === 'hyphen') {
    result = result.replace(/\s+/g, '-');
  } else if (recipe.replaceSpacesWith === 'underscore') {
    result = result.replace(/\s+/g, '_');
  }

  // Case transform (excluding extension)
  if (recipe.caseTransform === 'lowercase') {
    result = result.toLowerCase();
  } else if (recipe.caseTransform === 'uppercase') {
    result = result.toUpperCase();
  }

  // Re-attach extension
  if (ext && !result.toLowerCase().endsWith(`.${ext.toLowerCase()}`)) {
    const finalExt = recipe.caseTransform === 'lowercase' ? ext.toLowerCase() : (recipe.caseTransform === 'uppercase' ? ext.toUpperCase() : ext);
    result = `${result}.${finalExt}`;
  }

  return result.replace(/[/\\?%*:|"<>]/g, '_');
}

/**
 * Computes rename preview items for a list of images.
 */
export function generateBatchRenameItems(
  images: ImageItem[],
  recipe: BatchRenameRecipe
): BatchRenameItem[] {
  return images.map((img, idx) => {
    const currentIndex = recipe.startNumber + idx;
    const newName = applyRenamePattern(img.name, currentIndex, recipe, img.exif);
    const lastDot = img.name.lastIndexOf('.');
    const ext = lastDot > 0 ? img.name.slice(lastDot + 1) : '';

    return {
      id: img.id,
      originalName: img.name,
      newName,
      extension: ext,
      size: img.size,
      exif: img.exif,
    };
  });
}

/**
 * Generates a standard Unix Bash shell script (`.sh`) for batch renaming files locally.
 */
export function generateBashRenameScript(items: BatchRenameItem[]): string {
  const lines = [
    '#!/usr/bin/env bash',
    '# Make Contact Sheet — Batch Rename Script',
    '# Run this script inside the folder containing your photos: bash rename.sh',
    '',
    'set -euo pipefail',
    '',
    `echo "Renaming ${items.length} files..."`,
    '',
  ];

  for (const item of items) {
    if (item.originalName !== item.newName) {
      // Escape single quotes for bash safety and use -- to prevent option injection
      const origEscaped = item.originalName.replace(/'/g, "'\\''");
      const newEscaped = item.newName.replace(/'/g, "'\\''");
      lines.push(`if [ -f -- '${origEscaped}' ]; then`);
      lines.push(`  mv -n -- '${origEscaped}' '${newEscaped}'`);
      lines.push('fi');
    }
  }

  lines.push('', 'echo "Batch rename complete!"');
  return lines.join('\n');
}

/**
 * Generates a Windows PowerShell (`.ps1`) script for batch renaming files.
 */
export function generatePowerShellRenameScript(items: BatchRenameItem[]): string {
  const lines = [
    '# Make Contact Sheet — Windows PowerShell Batch Rename',
    '# Right-click -> Run with PowerShell or execute in terminal: .\\rename.ps1',
    '',
    `Write-Host "Renaming ${items.length} files..." -ForegroundColor Cyan`,
    '',
  ];

  for (const item of items) {
    if (item.originalName !== item.newName) {
      const origEscaped = item.originalName.replace(/'/g, "''");
      const newEscaped = item.newName.replace(/'/g, "''");
      lines.push(`if (Test-Path -LiteralPath '${origEscaped}') {`);
      lines.push(`    Rename-Item -LiteralPath '${origEscaped}' -NewName '${newEscaped}' -ErrorAction SilentlyContinue`);
      lines.push('}');
    }
  }

  lines.push('', 'Write-Host "Batch rename complete!" -ForegroundColor Green');
  return lines.join('\r\n');
}

/**
 * Sanitizes a cell for safe CSV rendering, neutralizing spreadsheet formula injection (CWE-1236).
 */
function sanitizeCsvCell(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return '""';
  const str = String(value);
  const safeStr = /^[=+\-@\t\r]/.test(str) ? `'${str}` : str;
  return `"${safeStr.replace(/"/g, '""')}"`;
}

/**
 * Generates a CSV mapping of Original Filename -> New Filename for asset tracking.
 */
export function generateRenameMappingCSV(items: BatchRenameItem[]): string {
  const header = ['Index', 'Original Filename', 'New Filename', 'Extension', 'Size (Bytes)', 'Camera', 'Lens', 'Focal Length', 'Aperture', 'Shutter', 'ISO'];
  const rows = items.map((item, idx) => [
    idx + 1,
    sanitizeCsvCell(item.originalName),
    sanitizeCsvCell(item.newName),
    sanitizeCsvCell(item.extension),
    item.size,
    sanitizeCsvCell(item.exif?.cameraModel || ''),
    sanitizeCsvCell(item.exif?.lensModel || ''),
    sanitizeCsvCell(item.exif?.focalLength || ''),
    sanitizeCsvCell(item.exif?.fNumber || ''),
    sanitizeCsvCell(item.exif?.exposureTime || ''),
    sanitizeCsvCell(item.exif?.iso || ''),
  ]);

  return [header.join(','), ...rows.map(r => r.join(','))].join('\n');
}

/**
 * Client-side bounded image resizing and format conversion.
 */
export async function convertAndResizeSingleImage(
  file: File | Blob,
  filename: string,
  options: BatchConvertOptions
): Promise<{ blob: Blob; filename: string; width: number; height: number }> {
  const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
  let width = bitmap.width;
  let height = bitmap.height;
  
  let sx = 0, sy = 0, sw = width, sh = height;

  if (options.aspectRatio && options.aspectRatio !== 'original') {
    const ratios: Record<string, number> = {
      '1:1': 1,
      '4:5': 4 / 5,
      '16:9': 16 / 9,
      '9:16': 9 / 16,
      '3:2': 3 / 2,
      '2:3': 2 / 3,
    };
    const R = ratios[options.aspectRatio] || 1;
    
    if (!options.cropMode || options.cropMode === 'cover') {
      if (width / height > R) {
        sh = height;
        sw = Math.round(sh * R);
        sx = Math.floor((width - sw) / 2);
        sy = 0;
      } else {
        sw = width;
        sh = Math.round(sw / R);
        sx = 0;
        sy = Math.floor((height - sh) / 2);
      }
      width = sw;
      height = sh;
    }
  }

  // Scale down if maxDimension is specified and exceeded
  if (options.maxDimension && options.maxDimension > 0) {
    const maxDim = options.maxDimension;
    if (width > maxDim || height > maxDim) {
      if (width >= height) {
        height = Math.round((height * maxDim) / width);
        width = maxDim;
      } else {
        width = Math.round((width * maxDim) / height);
        height = maxDim;
      }
    }
  }

  let canvas: HTMLCanvasElement | OffscreenCanvas;
  if (typeof OffscreenCanvas !== 'undefined') {
    canvas = new OffscreenCanvas(width, height);
  } else {
    canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
  }

  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null;
  if (!ctx) {
    bitmap.close();
    throw new Error('Could not acquire 2D canvas rendering context.');
  }

  // Draw scaled and optionally cropped bitmap
  ctx.drawImage(bitmap, sx, sy, sw, sh, 0, 0, width, height);
  bitmap.close();

  let blob: Blob;
  if (canvas instanceof OffscreenCanvas) {
    blob = await canvas.convertToBlob({
      type: options.targetFormat,
      quality: options.quality,
    });
  } else {
    blob = await new Promise<Blob>((resolve, reject) => {
      (canvas as HTMLCanvasElement).toBlob(
        (b) => {
          if (b) resolve(b);
          else reject(new Error('Canvas conversion to blob failed'));
        },
        options.targetFormat,
        options.quality
      );
    });
  }

  // Compute new filename extension
  const extMap: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
  };
  const targetExt = extMap[options.targetFormat] || 'jpg';
  const lastDot = filename.lastIndexOf('.');
  const base = lastDot > 0 ? filename.slice(0, lastDot) : filename;
  const newFilename = `${base}.${targetExt}`;

  return { blob, filename: newFilename, width, height };
}

/**
 * Triggers a native browser file download of a text blob or data.
 */
export function downloadTextContent(content: string, filename: string, mimeType: string = 'text/plain;charset=utf-8;'): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

/**
 * Triggers a native browser download of a binary Blob.
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
