import type { PageLayoutResult, CollageLayoutResult, LayoutConfig } from '../types';
import { renderContactSheetToCanvas, renderCollageToCanvas } from '../engine/canvasRenderer';
import { ZipBuilder } from './zipBuilder';

async function renderLayoutToBlob(
  layout: PageLayoutResult | CollageLayoutResult,
  config: LayoutConfig,
  format: 'png' | 'jpeg',
  quality: number
): Promise<Blob> {
  const offscreen = document.createElement('canvas');

  if ('totalPages' in layout) {
    // Contact sheet page
    await renderContactSheetToCanvas(offscreen, layout as PageLayoutResult, config, null, true);
  } else {
    // Collage layout
    await renderCollageToCanvas(offscreen, layout as CollageLayoutResult, config, null, true);
  }

  const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png';
  const blob = await new Promise<Blob | null>((resolve) => {
    offscreen.toBlob((b) => resolve(b), mimeType, quality);
  });
  // Release the backing store now; a 300 dpi page is ~35 MB of pixels and a
  // multi-page export would otherwise hold every page until GC.
  offscreen.width = 0;
  offscreen.height = 0;

  if (!blob) {
    throw new Error('Failed to generate image blob');
  }
  return blob;
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function exportLayoutAsImage(
  layout: PageLayoutResult | CollageLayoutResult,
  config: LayoutConfig,
  format: 'png' | 'jpeg' = 'png',
  quality = 0.92,
  filename = 'makecontactsheet-export'
): Promise<void> {
  const blob = await renderLayoutToBlob(layout, config, format, quality);
  downloadBlob(blob, `${filename}.${format === 'jpeg' ? 'jpg' : 'png'}`);
}

/**
 * Renders every contact sheet page and downloads them as one ZIP, so a 6-page
 * proof set is one file instead of six downloads the browser may block.
 * Pages are rendered one at a time to keep only one full-resolution canvas alive.
 */
export async function exportPagesAsImageZip(
  pages: PageLayoutResult[],
  config: LayoutConfig,
  format: 'png' | 'jpeg' = 'png',
  quality = 0.92,
  filename = 'makecontactsheet-sheet',
  onProgress?: (done: number, total: number) => void
): Promise<void> {
  const ext = format === 'jpeg' ? 'jpg' : 'png';
  const digits = String(pages.length).length;
  const zip = new ZipBuilder();
  for (let i = 0; i < pages.length; i++) {
    const blob = await renderLayoutToBlob(pages[i], config, format, quality);
    zip.addFile(`${filename}-page-${String(i + 1).padStart(digits, '0')}.${ext}`, new Uint8Array(await blob.arrayBuffer()));
    onProgress?.(i + 1, pages.length);
  }
  downloadBlob(zip.buildZipBlob(), `${filename}-${pages.length}-pages.zip`);
}
