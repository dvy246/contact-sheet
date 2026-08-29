/**
 * Embeds a forensic watermark into the canvas using LSB (Least Significant Bit) spatial modulation.
 */
export function embedForensicWatermark(canvas: HTMLCanvasElement | OffscreenCanvas, secretId: string): void {
  const ctx = canvas.getContext('2d', { willReadFrequently: true }) as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
  if (!ctx) return;

  const width = canvas.width;
  const height = canvas.height;
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  // Convert secretId to bits. Let's add a sentinel 'FW' to detect if it's there.
  const payload = `FW:${secretId}`;
  const bits: number[] = [];
  for (let i = 0; i < payload.length; i++) {
    const charCode = payload.charCodeAt(i);
    for (let b = 0; b < 8; b++) {
      bits.push((charCode >> b) & 1);
    }
  }

  // Add null terminator (8 bits of 0)
  for (let b = 0; b < 8; b++) bits.push(0);

  // We spread the bits across the image to avoid visible artifacts, 
  // skipping every N pixels to cover more space if possible, 
  // but to keep it robust against cropping, we tile the payload.
  
  const payloadLen = bits.length;
  let bitIndex = 0;

  // We'll modulate the Blue channel's LSB
  for (let i = 0; i < data.length; i += 4) {
    // b is at i+2
    // Clear LSB and set to bit
    data[i + 2] = (data[i + 2] & ~1) | bits[bitIndex];
    
    bitIndex++;
    if (bitIndex >= payloadLen) {
      bitIndex = 0; // tile the payload
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

/**
 * Extracts a forensic watermark embedded in the canvas.
 */
export function extractForensicWatermark(canvas: HTMLCanvasElement | OffscreenCanvas): string | null {
  const ctx = canvas.getContext('2d', { willReadFrequently: true }) as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
  if (!ctx) return null;

  const width = canvas.width;
  const height = canvas.height;
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  const bits: number[] = [];
  let payloadStr = '';
  
  // Try reading the first chunk
  for (let i = 0; i < data.length; i += 4) {
    const bit = data[i + 2] & 1;
    bits.push(bit);

    if (bits.length === 8) {
      let charCode = 0;
      for (let b = 0; b < 8; b++) {
        charCode |= (bits[b] << b);
      }
      
      if (charCode === 0) {
        break; // null terminator
      }
      payloadStr += String.fromCharCode(charCode);
      bits.length = 0; // clear bits for next char
      
      // Safety break to avoid reading entire massive image if no watermark exists
      if (payloadStr.length > 100) break;
    }
  }

  if (payloadStr.startsWith('FW:')) {
    return payloadStr.slice(3);
  }

  return null;
}
