import { jsPDF } from 'jspdf';
import type { PageLayoutResult, LayoutConfig } from '../types';
import { renderContactSheetToCanvas } from '../engine/canvasRenderer';

export interface PDFExportProgress {
  (current: number, total: number): void;
}

export async function exportContactSheetPagesToPDF(
  pages: PageLayoutResult[],
  config: LayoutConfig,
  onProgress?: PDFExportProgress,
  filename = 'frameproof-contact-sheet'
): Promise<void> {
  if (pages.length === 0) return;

  const isPortrait = config.orientation === 'portrait';
  const format = config.pageSize === 'letter' ? 'letter' : 'a4';

  const doc = new jsPDF({
    orientation: isPortrait ? 'portrait' : 'landscape',
    unit: 'mm',
    format: format,
    compress: true,
  });

  const offscreen = document.createElement('canvas');

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    if (i > 0) {
      doc.addPage(format, isPortrait ? 'portrait' : 'landscape');
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
