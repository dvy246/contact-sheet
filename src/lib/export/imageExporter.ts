import type { PageLayoutResult, CollageLayoutResult, LayoutConfig } from '../types';
import { renderContactSheetToCanvas, renderCollageToCanvas } from '../engine/canvasRenderer';

export async function exportLayoutAsImage(
  layout: PageLayoutResult | CollageLayoutResult,
  config: LayoutConfig,
  format: 'png' | 'jpeg' = 'png',
  quality = 0.92,
  filename = 'makecontactsheet-export'
): Promise<void> {
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

  if (!blob) {
    throw new Error('Failed to generate image blob');
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.${format === 'jpeg' ? 'jpg' : 'png'}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
