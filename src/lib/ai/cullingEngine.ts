import { type ImageItem } from '../types';
import { updateImageProperties } from '../store';

/**
 * Calculates a normalized sharpness score using a modified Laplacian variance method.
 */
export function analyzeImageSharpness(imageData: ImageData): { score: number; isSharp: boolean; sharpnessRank: string } {
  const { data, width, height } = imageData;
  const grayscale = new Float32Array(width * height);

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    grayscale[i / 4] = 0.299 * r + 0.587 * g + 0.114 * b;
  }

  const laplacian = new Float32Array(width * height);
  let mean = 0;
  let count = 0;

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = y * width + x;
      const val = 
          grayscale[(y - 1) * width + x]
        + grayscale[(y + 1) * width + x]
        + grayscale[y * width + (x - 1)]
        + grayscale[y * width + (x + 1)]
        - 4 * grayscale[idx];
      
      laplacian[idx] = val;
      mean += val;
      count++;
    }
  }

  mean /= count;

  let variance = 0;
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = y * width + x;
      const diff = laplacian[idx] - mean;
      variance += diff * diff;
    }
  }
  variance /= count;

  const cappedVariance = Math.min(variance, 1000);
  let score = Math.round((cappedVariance / 1000) * 100 * 2.5);
  score = Math.min(score, 100);

  const threshold = 25;
  const isSharp = score >= threshold;
  
  let sharpnessRank = 'Sharp';
  if (score < 15) sharpnessRank = 'Severely Blurry';
  else if (score < threshold) sharpnessRank = 'Soft/Blurry';
  else if (score < 40) sharpnessRank = 'Acceptable';
  else if (score < 70) sharpnessRank = 'Very Sharp';
  else sharpnessRank = 'Tack Sharp';

  return { score, isSharp, sharpnessRank };
}

export async function runSmartCull(
  images: ImageItem[], 
  onProgress?: (cur: number, total: number) => void, 
  threshold = 25
): Promise<{ flaggedCount: number; rejectedCount: number; report: Array<{ id: string; name: string; score: number; flagged: boolean }> }> {
  let flaggedCount = 0;
  let rejectedCount = 0;
  const report: Array<{ id: string; name: string; score: number; flagged: boolean }> = [];
  const total = images.length;

  for (let i = 0; i < total; i++) {
    const imgInfo = images[i];
    if (onProgress) onProgress(i, total);

    try {
      const img = new Image();
      img.src = imgInfo.thumbnailUrl || imgInfo.previewUrl;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const maxDim = 400;
      const scale = Math.min(maxDim / img.width, maxDim / img.height, 1);
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);

      let canvas: HTMLCanvasElement | OffscreenCanvas;
      let ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null;

      if (typeof OffscreenCanvas !== 'undefined') {
        canvas = new OffscreenCanvas(w, h);
        ctx = canvas.getContext('2d', { willReadFrequently: true } as any);
      } else {
        canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        ctx = canvas.getContext('2d', { willReadFrequently: true });
      }

      if (ctx) {
        ctx.drawImage(img, 0, 0, w, h);
        const imageData = ctx.getImageData(0, 0, w, h);
        const { score, sharpnessRank } = analyzeImageSharpness(imageData);

        const flagged = score < threshold;
        if (flagged) {
          const newStatus = score < 15 ? 'reject' : 'flag';
          if (newStatus === 'reject') rejectedCount++;
          else flaggedCount++;

          const existingNote = imgInfo.notes || imgInfo.note || '';
          const newNote = existingNote ? `${existingNote}\nSharpness Score: ${score}% (${sharpnessRank})` : `Sharpness Score: ${score}% (${sharpnessRank})`;
          
          updateImageProperties(imgInfo.id, {
            status: newStatus,
            notes: newNote
          });
        }

        report.push({ id: imgInfo.id, name: imgInfo.name, score, flagged });
      }
    } catch (e) {
      console.warn(`Failed to analyze sharpness for ${imgInfo.name}`, e);
    }
  }

  if (onProgress) onProgress(total, total);

  return { flaggedCount, rejectedCount, report };
}
