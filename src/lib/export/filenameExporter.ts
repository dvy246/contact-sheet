import type { FilterStatus, FilenameExportOptions, ImageItem } from '../types';

/**
 * Filters an array of ImageItems according to the provided review status filter.
 */
export function filterImagesByScope(images: ImageItem[], filter?: FilterStatus): ImageItem[] {
  if (!filter || filter === 'all') return images;
  if (filter === 'keep') return images.filter(img => img.status === 'keep');
  if (filter === 'flag') return images.filter(img => img.status === 'flag');
  if (filter === 'reject') return images.filter(img => img.status === 'reject');
  if (filter === 'unreviewed') return images.filter(img => img.status === 'unreviewed');
  if (filter === 'exclude-rejected') return images.filter(img => img.status !== 'reject');
  return images;
}

function sanitizeCsvCell(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return '""';
  const str = String(value);
  const safeStr = /^[=+\-@\t\r]/.test(str) ? `'${str}` : str;
  return `"${safeStr.replace(/"/g, '""')}"`;
}

function sanitizeTsvCell(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return '';
  const str = String(value).replace(/\t|\r|\n/g, ' ');
  return /^[=+\-@\t\r]/.test(str) ? `'${str}` : str;
}

/**
 * Generates CSV string containing image review data with exact source filenames.
 */
export function generateFilenamesCSV(images: ImageItem[], filter?: FilterStatus): string {
  const targetImages = filterImagesByScope(images, filter);
  const header = ['Index', 'Filename', 'Status', 'Rating', 'Notes', 'Width', 'Height', 'SizeBytes', 'FileType'];
  const rows = targetImages.map((img, idx) => [
    idx + 1,
    sanitizeCsvCell(img.name),
    sanitizeCsvCell(img.status),
    img.rating !== undefined ? img.rating : '',
    sanitizeCsvCell(img.note || img.notes || ''),
    img.width,
    img.height,
    img.size,
    sanitizeCsvCell(img.type),
  ]);

  return [
    header.join(','),
    ...rows.map(row => row.join(',')),
  ].join('\n');
}

/**
 * Exports review state as a CSV file.
 */
export function exportFilenamesAsCSV(
  images: ImageItem[],
  options?: FilenameExportOptions | string
): void {
  const opts: FilenameExportOptions = typeof options === 'string'
    ? { filename: options }
    : options || {};
  const filename = opts.filename || 'makecontactsheet-selected-filenames';
  const csvContent = generateFilenamesCSV(images, opts.filter);
  downloadTextBlob(csvContent, `${filename}.csv`, 'text/csv;charset=utf-8;');
}

/**
 * Generates TSV (Tab Separated Values) string containing image review data.
 */
export function generateFilenamesTSV(images: ImageItem[], filter?: FilterStatus): string {
  const targetImages = filterImagesByScope(images, filter);
  const header = ['Index', 'Filename', 'Status', 'Rating', 'Notes', 'Width', 'Height', 'SizeBytes', 'FileType'];
  const rows = targetImages.map((img, idx) => [
    idx + 1,
    sanitizeTsvCell(img.name),
    sanitizeTsvCell(img.status),
    img.rating !== undefined ? img.rating : '',
    sanitizeTsvCell(img.note || img.notes || ''),
    img.width,
    img.height,
    img.size,
    sanitizeTsvCell(img.type),
  ]);

  return [
    header.join('\t'),
    ...rows.map(row => row.join('\t')),
  ].join('\n');
}

/**
 * Exports review state as a TSV file.
 */
export function exportFilenamesAsTSV(
  images: ImageItem[],
  options?: FilenameExportOptions | string
): void {
  const opts: FilenameExportOptions = typeof options === 'string'
    ? { filename: options }
    : options || {};
  const filename = opts.filename || 'makecontactsheet-selected-filenames';
  const tsvContent = generateFilenamesTSV(images, opts.filter);
  downloadTextBlob(tsvContent, `${filename}.tsv`, 'text/tab-separated-values;charset=utf-8;');
}

/**
 * Generates plain text filename strings for Lightroom search or shell scripting.
 */
export function generateFilenamesTXT(
  images: ImageItem[],
  format: 'newline' | 'comma' | 'space' = 'newline',
  filter?: FilterStatus
): string {
  const targetImages = filterImagesByScope(images, filter);
  if (format === 'comma') {
    return targetImages.map(img => img.name).join(', ');
  }
  if (format === 'space') {
    return targetImages
      .map(img => (img.name.includes(' ') ? `"${img.name}"` : img.name))
      .join(' ');
  }
  return targetImages.map(img => img.name).join('\n');
}

/**
 * Exports exact source filenames as a plain text (.txt) file.
 */
export function exportFilenamesAsTXT(
  images: ImageItem[],
  format: 'newline' | 'comma' | 'space' = 'newline',
  filename = 'makecontactsheet-filenames',
  filter?: FilterStatus
): void {
  const content = generateFilenamesTXT(images, format, filter);
  downloadTextBlob(content, `${filename}.txt`, 'text/plain;charset=utf-8;');
}

function downloadTextBlob(text: string, filename: string, mimeType: string) {
  const blob = new Blob([text], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
