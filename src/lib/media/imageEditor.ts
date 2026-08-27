/**
 * Pixel-level edits, all in-browser.
 *
 * Every function takes and returns `File` objects rather than `ImageItem`s so it
 * stays independent of the store: the caller feeds the result back through
 * `loadImagesFromFiles`, which is the one place that decodes dimensions and mints
 * object URLs. That keeps a rotated photo indistinguishable from an imported one.
 *
 * Nothing here mutates the original file. An edit produces a new file with a
 * suffixed name, so an accidental crop is one undo-by-reimport away rather than
 * a lost original.
 */

export type RotateAngle = 90 | 180 | 270;
export type FlipAxis = 'horizontal' | 'vertical';
export type MergeMode = 'horizontal' | 'vertical' | 'grid';

export interface CropPreset {
  id: string;
  label: string;
  /** width / height */
  ratio: number;
}

export const CROP_PRESETS: CropPreset[] = [
  { id: '1-1', label: 'Square 1:1', ratio: 1 },
  { id: '4-5', label: 'Portrait 4:5', ratio: 4 / 5 },
  { id: '5-4', label: 'Landscape 5:4', ratio: 5 / 4 },
  { id: '2-3', label: 'Portrait 2:3', ratio: 2 / 3 },
  { id: '3-2', label: 'Landscape 3:2', ratio: 3 / 2 },
  { id: '9-16', label: 'Story 9:16', ratio: 9 / 16 },
  { id: '16-9', label: 'Screen 16:9', ratio: 16 / 9 },
];

export interface SplitGrid {
  id: string;
  label: string;
  cols: number;
  rows: number;
}

export const SPLIT_GRIDS: SplitGrid[] = [
  { id: '2x1', label: 'Left / right', cols: 2, rows: 1 },
  { id: '1x2', label: 'Top / bottom', cols: 1, rows: 2 },
  { id: '2x2', label: '2 × 2 quarters', cols: 2, rows: 2 },
  { id: '3x1', label: 'Three columns', cols: 3, rows: 1 },
  { id: '1x3', label: 'Three rows', cols: 1, rows: 3 },
  { id: '3x3', label: '3 × 3 tiles', cols: 3, rows: 3 },
];

/**
 * Ceiling on any canvas this module allocates. iOS Safari refuses to allocate
 * beyond roughly 16.7 million pixels and silently hands back a blank canvas, so
 * a merge of nine 24-megapixel frames has to be scaled down rather than
 * attempted — a smaller sheet beats a white rectangle.
 */
const MAX_OUTPUT_PIXELS = 16_000_000;

/** JPEG quality for edits that cannot carry alpha. */
const JPEG_QUALITY = 0.92;

export async function rotateImageFile(file: File, angle: RotateAngle): Promise<File> {
  const source = await decode(file);
  const swap = angle === 90 || angle === 270;
  const w = swap ? source.height : source.width;
  const h = swap ? source.width : source.height;

  const { canvas, ctx } = createCanvas(w, h);
  ctx.translate(w / 2, h / 2);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.drawImage(source.image, -source.width / 2, -source.height / 2);
  release(source);

  return canvasToFile(canvas, file, `rot${angle}`);
}

export async function flipImageFile(file: File, axis: FlipAxis): Promise<File> {
  const source = await decode(file);
  const { canvas, ctx } = createCanvas(source.width, source.height);

  if (axis === 'horizontal') {
    ctx.translate(source.width, 0);
    ctx.scale(-1, 1);
  } else {
    ctx.translate(0, source.height);
    ctx.scale(1, -1);
  }
  ctx.drawImage(source.image, 0, 0);
  release(source);

  return canvasToFile(canvas, file, axis === 'horizontal' ? 'flipH' : 'flipV');
}

/**
 * Centre-crops to a target aspect. Only ever removes pixels — the crop is
 * inscribed in the original, so no edge is invented and nothing is upscaled.
 */
export async function cropImageFileToAspect(file: File, preset: CropPreset): Promise<File> {
  const source = await decode(file);
  const current = source.width / source.height;

  let cropW = source.width;
  let cropH = source.height;
  if (current > preset.ratio) {
    cropW = Math.round(source.height * preset.ratio);
  } else if (current < preset.ratio) {
    cropH = Math.round(source.width / preset.ratio);
  }

  const sx = Math.round((source.width - cropW) / 2);
  const sy = Math.round((source.height - cropH) / 2);

  const { canvas, ctx } = createCanvas(cropW, cropH);
  ctx.drawImage(source.image, sx, sy, cropW, cropH, 0, 0, cropW, cropH);
  release(source);

  return canvasToFile(canvas, file, `crop${preset.id}`);
}

export interface MergeOptions {
  mode: MergeMode;
  /** Gap between photos in output pixels. */
  gap: number;
  /** Fill behind the gaps and behind any letterboxing in grid mode. */
  background: string;
}

/**
 * Stitches several photos into one image.
 *
 * `horizontal` and `vertical` scale every frame to a shared edge — the smallest
 * one present, never the largest, so no photo is upscaled into softness.
 * `grid` uses uniform cells and letterboxes each photo inside its cell rather
 * than cropping to fill: a merge should not silently throw away the edges of
 * someone's frame. Crop first if that is what you want.
 */
export async function mergeImageFiles(files: File[], options: MergeOptions): Promise<File> {
  if (files.length === 0) throw new Error('Nothing to merge.');
  if (files.length === 1) return files[0];

  const sources = await Promise.all(files.map(decode));
  const gap = Math.max(0, Math.round(options.gap));

  try {
    if (options.mode === 'horizontal' || options.mode === 'vertical') {
      const vertical = options.mode === 'vertical';
      // Shared edge: height for a row, width for a column.
      const edge = vertical
        ? Math.min(...sources.map((s) => s.width))
        : Math.min(...sources.map((s) => s.height));

      const scaled = sources.map((s) =>
        vertical
          ? { s, w: edge, h: Math.max(1, Math.round((s.height * edge) / s.width)) }
          : { s, w: Math.max(1, Math.round((s.width * edge) / s.height)), h: edge }
      );

      const totalW = vertical ? edge : scaled.reduce((a, b) => a + b.w, 0) + gap * (scaled.length - 1);
      const totalH = vertical ? scaled.reduce((a, b) => a + b.h, 0) + gap * (scaled.length - 1) : edge;

      const fit = fitToPixelBudget(totalW, totalH);
      const { canvas, ctx } = createCanvas(Math.round(totalW * fit), Math.round(totalH * fit));
      ctx.fillStyle = options.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      let cursor = 0;
      for (const item of scaled) {
        const x = vertical ? 0 : cursor;
        const y = vertical ? cursor : 0;
        ctx.drawImage(
          item.s.image,
          Math.round(x * fit),
          Math.round(y * fit),
          Math.max(1, Math.round(item.w * fit)),
          Math.max(1, Math.round(item.h * fit))
        );
        cursor += (vertical ? item.h : item.w) + gap;
      }

      return canvasToFile(canvas, files[0], mergeSuffix(options.mode, files.length), true);
    }

    // Grid: as square as the count allows, then letterbox into uniform cells.
    const cols = Math.ceil(Math.sqrt(sources.length));
    const rows = Math.ceil(sources.length / cols);
    const cellW = Math.min(...sources.map((s) => s.width));
    const cellH = Math.round(cellW / medianAspect(sources));

    const totalW = cols * cellW + gap * (cols - 1);
    const totalH = rows * cellH + gap * (rows - 1);
    const fit = fitToPixelBudget(totalW, totalH);

    const { canvas, ctx } = createCanvas(Math.round(totalW * fit), Math.round(totalH * fit));
    ctx.fillStyle = options.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < sources.length; i++) {
      const s = sources[i];
      const cx = (i % cols) * (cellW + gap);
      const cy = Math.floor(i / cols) * (cellH + gap);
      const inner = Math.min(cellW / s.width, cellH / s.height);
      const drawW = s.width * inner;
      const drawH = s.height * inner;
      ctx.drawImage(
        s.image,
        Math.round((cx + (cellW - drawW) / 2) * fit),
        Math.round((cy + (cellH - drawH) / 2) * fit),
        Math.max(1, Math.round(drawW * fit)),
        Math.max(1, Math.round(drawH * fit))
      );
    }

    return canvasToFile(canvas, files[0], mergeSuffix('grid', files.length), true);
  } finally {
    sources.forEach(release);
  }
}

/**
 * Slices one photo into `cols × rows` tiles, left to right and top to bottom.
 * Tile edges are computed from rounded boundaries rather than a fixed tile size,
 * so a 1001px width across three columns loses no pixel to rounding.
 */
export async function splitImageFile(file: File, cols: number, rows: number): Promise<File[]> {
  const c = Math.max(1, Math.round(cols));
  const r = Math.max(1, Math.round(rows));
  if (c === 1 && r === 1) return [file];

  const source = await decode(file);
  const out: File[] = [];

  try {
    for (let row = 0; row < r; row++) {
      for (let col = 0; col < c; col++) {
        const x0 = Math.round((source.width * col) / c);
        const x1 = Math.round((source.width * (col + 1)) / c);
        const y0 = Math.round((source.height * row) / r);
        const y1 = Math.round((source.height * (row + 1)) / r);
        const w = Math.max(1, x1 - x0);
        const h = Math.max(1, y1 - y0);

        const { canvas, ctx } = createCanvas(w, h);
        ctx.drawImage(source.image, x0, y0, w, h, 0, 0, w, h);
        out.push(await canvasToFile(canvas, file, `r${row + 1}c${col + 1}`));
      }
    }
  } finally {
    release(source);
  }

  return out;
}

/* ---------------------------------------------------------------- internals */

interface DecodedSource {
  image: CanvasImageSource;
  width: number;
  height: number;
  bitmap?: ImageBitmap;
  url?: string;
}

async function decode(file: File): Promise<DecodedSource> {
  if (typeof createImageBitmap !== 'undefined') {
    try {
      const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
      return { image: bitmap, width: bitmap.width, height: bitmap.height, bitmap };
    } catch {
      try {
        const bitmap = await createImageBitmap(file);
        return { image: bitmap, width: bitmap.width, height: bitmap.height, bitmap };
      } catch {
        // Falls through to the element path — some BMP and animated GIF encodings
        // reject in createImageBitmap but decode fine in an <img>.
      }
    }
  }

  const url = URL.createObjectURL(file);
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new Image();
    el.onload = () => resolve(el);
    el.onerror = () => reject(new Error(`Could not decode ${file.name}`));
    el.src = url;
  });
  return { image: img, width: img.naturalWidth, height: img.naturalHeight, url };
}

function release(source: DecodedSource) {
  source.bitmap?.close();
  if (source.url) URL.revokeObjectURL(source.url);
}

function createCanvas(width: number, height: number) {
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(width));
  canvas.height = Math.max(1, Math.round(height));
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('This browser refused a 2D canvas context.');
  ctx.imageSmoothingQuality = 'high';
  return { canvas, ctx };
}

function fitToPixelBudget(width: number, height: number): number {
  const pixels = width * height;
  if (pixels <= MAX_OUTPUT_PIXELS) return 1;
  return Math.sqrt(MAX_OUTPUT_PIXELS / pixels);
}

function medianAspect(sources: DecodedSource[]): number {
  const ratios = sources.map((s) => s.width / s.height).sort((a, b) => a - b);
  const mid = Math.floor(ratios.length / 2);
  return ratios.length % 2 ? ratios[mid] : (ratios[mid - 1] + ratios[mid]) / 2;
}

function mergeSuffix(mode: MergeMode, count: number): string {
  const shape = mode === 'horizontal' ? 'row' : mode === 'vertical' ? 'column' : 'grid';
  return `merged-${count}-${shape}`;
}

/**
 * Encodes a canvas as a file. PNG is used whenever the input could carry alpha,
 * because re-encoding a transparent PNG as JPEG turns its transparency black.
 */
function canvasToFile(
  canvas: HTMLCanvasElement,
  source: File,
  suffix: string,
  replaceStem = false
): Promise<File> {
  const alphaCapable = /png|webp|avif|gif/i.test(source.type) || /\.(png|webp|avif|gif)$/i.test(source.name);
  const type = alphaCapable ? 'image/png' : 'image/jpeg';
  const ext = alphaCapable ? 'png' : 'jpg';
  const stem = source.name.replace(/\.[^./\\]+$/, '') || 'image';
  const name = replaceStem ? `${suffix}.${ext}` : `${stem}-${suffix}.${ext}`;

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Encoding the edited image failed.'));
          return;
        }
        resolve(new File([blob], name, { type, lastModified: source.lastModified }));
      },
      type,
      type === 'image/jpeg' ? JPEG_QUALITY : undefined
    );
  });
}
