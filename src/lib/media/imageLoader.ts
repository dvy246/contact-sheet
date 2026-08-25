import type { ImageItem } from '../types';
import { isAllowedImage, sanitizeFilename } from './fileSanitizer';

export interface LoadProgressCallback {
  (loaded: number, total: number, currentFileName: string): void;
}

/**
 * Loads and decodes an array of local image files into ImageItem models.
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

  // Process in concurrent batches to balance memory and speed
  const BATCH_SIZE = 6;
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
        console.warn(`Failed to decode image ${file.name}:`, err);
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
  }

  return results;
}

/**
 * Decodes a single file using createImageBitmap or Image element.
 */
async function decodeSingleImage(file: File): Promise<ImageItem> {
  const id = `img_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  const sanitizedName = sanitizeFilename(file.name);
  const previewUrl = URL.createObjectURL(file);

  let width = 0;
  let height = 0;

  if (typeof createImageBitmap !== 'undefined') {
    try {
      const bitmap = await createImageBitmap(file);
      width = bitmap.width;
      height = bitmap.height;
      bitmap.close();
    } catch {
      // Fallback to Image element if createImageBitmap fails (e.g. for certain SVGs or BMPs)
      const dims = await getImageDimensionsViaElement(previewUrl);
      width = dims.width;
      height = dims.height;
    }
  } else {
    const dims = await getImageDimensionsViaElement(previewUrl);
    width = dims.width;
    height = dims.height;
  }

  const aspectRatio = width / (height || 1);

  return {
    id,
    file,
    name: file.name,
    sanitizedName,
    size: file.size,
    type: file.type || 'image/jpeg',
    width,
    height,
    aspectRatio,
    previewUrl,
    thumbnailUrl: previewUrl,
    status: 'unreviewed',
    order: 0,
  };
}

function getImageDimensionsViaElement(url: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth || 800, height: img.naturalHeight || 600 });
    };
    img.onerror = () => {
      reject(new Error('Failed to load image element'));
    };
    img.src = url;
  });
}
