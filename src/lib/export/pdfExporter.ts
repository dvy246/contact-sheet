import { jsPDF } from 'jspdf';
import type { PageLayoutResult, LayoutConfig } from '../types';
import { renderContactSheetToCanvas, renderCollageToCanvas } from '../engine/canvasRenderer';
import { PX_PER_MM } from '../engine/contactSheetEngine';

export interface PDFExportProgress {
  (current: number, total: number): void;
}

export async function exportContactSheetPagesToPDF(
  pages: PageLayoutResult[],
  config: LayoutConfig,
  onProgress?: PDFExportProgress,
  filename = 'makecontactsheet-contact-sheet'
): Promise<void> {
  if (pages.length === 0) return;

  // Page size comes from the geometry that was actually laid out, not from the
  // `pageSize` name. Mapping every non-paper size onto a4/letter stretched
  // 16:9, square, story and custom sheets to A4 proportions in the PDF while
  // the PNG export of the same sheet was correct.
  const first = pages[0];
  const baseScale = first.scale || 1;
  const widthMm = round2(first.canvasWidth / baseScale / PX_PER_MM);
  const heightMm = round2(first.canvasHeight / baseScale / PX_PER_MM);
  const format: [number, number] = [widthMm, heightMm];
  // jsPDF reorders an explicit [w, h] to match the orientation it is given, so
  // the two have to agree or the page comes out transposed.
  const orientation: 'portrait' | 'landscape' = widthMm > heightMm ? 'landscape' : 'portrait';

  const doc = new jsPDF({
    orientation,
    unit: 'mm',
    format,
    compress: true,
  });

  const offscreen = document.createElement('canvas');

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    if (i > 0) {
      doc.addPage(format, orientation);
    }

    if (onProgress) {
      onProgress(i + 1, pages.length);
    }

    await renderContactSheetToCanvas(offscreen, page, config, null, true);

    const imgData = offscreen.toDataURL('image/jpeg', 0.88);
    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = doc.internal.pageSize.getHeight();

    doc.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
  }

  doc.save(`${filename}.pdf`);
}

/** Export a single collage layout as PDF */
export async function exportCollageLayoutToPDF(
  layout: any, // CollageLayoutResult type but import to avoid circular deps
  config: LayoutConfig,
  _onProgress?: PDFExportProgress,
  filename = 'makecontactsheet-collage'
): Promise<void> {
  // Render collage to canvas, then add to PDF similar to contact sheet export
  const offscreen = document.createElement('canvas');
  await renderCollageToCanvas(offscreen, layout, config, null, true);

  const widthMm = round2(offscreen.width / PX_PER_MM);
  const heightMm = round2(offscreen.height / PX_PER_MM);
  const format: [number, number] = [widthMm, heightMm];
  const orientation: 'portrait' | 'landscape' = widthMm > heightMm ? 'landscape' : 'portrait';

  const doc = new jsPDF({ orientation, unit: 'mm', format, compress: true });
  const imgData = offscreen.toDataURL('image/jpeg', 0.88);
  const pdfWidth = doc.internal.pageSize.getWidth();
  const pdfHeight = doc.internal.pageSize.getHeight();
  doc.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
  doc.save(`${filename}.pdf`);
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}
