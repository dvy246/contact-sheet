/**
 * Validates and sanitizes image files for safe browser processing and label rendering.
 */

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/gif',
  'image/bmp',
  'image/heic',
  'image/heif',
  'image/heic-sequence',
  'image/heif-sequence',
]);

const ALLOWED_EXTENSIONS = new Set([
  'jpg',
  'jpeg',
  'png',
  'webp',
  'avif',
  'gif',
  'bmp',
  'heic',
  'heif',
  'cr2',
  'cr3',
  'nef',
  'arw',
  'dng',
  'orf',
  'rw2',
  'raf',
  'pef'
]);

export const MAX_FILE_SIZE_BYTES = 500 * 1024 * 1024; // 500 MB per file

export function isAllowedImage(file: File): boolean {
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return false;
  }
  if (ALLOWED_MIME_TYPES.has(file.type.toLowerCase())) {
    return true;
  }
  const ext = file.name.split('.').pop()?.toLowerCase();
  return ext ? ALLOWED_EXTENSIONS.has(ext) : false;
}

export function isRawFile(file: File): boolean {
  const ext = file.name.split('.').pop()?.toLowerCase();
  const rawExts = new Set(['cr2', 'cr3', 'nef', 'arw', 'dng', 'orf', 'rw2', 'raf', 'pef']);
  return ext ? rawExts.has(ext) : false;
}

/**
 * Checks if a file is a HEIC or HEIF image based on MIME type or extension.
 */
export function isHeicFile(file: File): boolean {
  const type = (file.type || '').toLowerCase();
  if (type.includes('heic') || type.includes('heif')) return true;
  const ext = file.name.split('.').pop()?.toLowerCase();
  return ext === 'heic' || ext === 'heif';
}

/**
 * Sanitizes filename to prevent HTML/XSS injection in Canvas and DOM text rendering.
 */
export function sanitizeFilename(filename: string): string {
  if (!filename) return 'unnamed-image';
  
  // Remove control characters, HTML tags, and suspicious path delimiters
  return filename
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, '_')
    .trim()
    .slice(0, 120);
}

/**
 * Formats byte size into human readable string (e.g. 3.4 MB).
 */
export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
