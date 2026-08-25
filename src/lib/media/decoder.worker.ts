/**
 * Web Worker for decoding image metadata and generating downscaled thumbnails.
 */

self.onmessage = async (e: MessageEvent<{ id: string; file: File; maxThumbDim?: number }>) => {
  const { id, file, maxThumbDim = 320 } = e.data;

  try {
    const bitmap = await createImageBitmap(file);
    const originalWidth = bitmap.width;
    const originalHeight = bitmap.height;
    const aspectRatio = originalWidth / (originalHeight || 1);

    // Calculate thumbnail dimensions
    let thumbWidth = originalWidth;
    let thumbHeight = originalHeight;

    if (thumbWidth > maxThumbDim || thumbHeight > maxThumbDim) {
      if (thumbWidth > thumbHeight) {
        thumbWidth = maxThumbDim;
        thumbHeight = Math.round(maxThumbDim / aspectRatio);
      } else {
        thumbHeight = maxThumbDim;
        thumbWidth = Math.round(maxThumbDim * aspectRatio);
      }
    }

    // Render thumbnail using OffscreenCanvas if supported
    let thumbnailBlob: Blob | null = null;
    if (typeof OffscreenCanvas !== 'undefined') {
      const offscreen = new OffscreenCanvas(thumbWidth, thumbHeight);
      const ctx = offscreen.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'medium';
        ctx.drawImage(bitmap, 0, 0, thumbWidth, thumbHeight);
        thumbnailBlob = await offscreen.convertToBlob({ type: 'image/jpeg', quality: 0.8 });
      }
    }

    bitmap.close();

    self.postMessage({
      id,
      success: true,
      width: originalWidth,
      height: originalHeight,
      aspectRatio,
      thumbnailBlob,
    });
  } catch (error) {
    self.postMessage({
      id,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown decode error',
    });
  }
};
