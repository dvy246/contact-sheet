import type { ImageItem } from '../types';

export function exportFilenamesAsCSV(images: ImageItem[], filename = 'makecontactsheet-selected-filenames'): void {
  const header = ['Index', 'Filename', 'Status', 'Width', 'Height', 'SizeBytes', 'FileType'];
  const rows = images.map((img, idx) => [
    idx + 1,
    `"${img.name.replace(/"/g, '""')}"`,
    img.status,
    img.width,
    img.height,
    img.size,
    img.type,
  ]);

  const csvContent = [
    header.join(','),
    ...rows.map(row => row.join(',')),
  ].join('\n');

  downloadTextBlob(csvContent, `${filename}.csv`, 'text/csv;charset=utf-8;');
}

export function exportFilenamesAsTXT(images: ImageItem[], format: 'newline' | 'comma' = 'newline', filename = 'makecontactsheet-filenames'): void {
  const content = format === 'comma' 
    ? images.map(img => img.name).join(', ')
    : images.map(img => img.name).join('\n');

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
