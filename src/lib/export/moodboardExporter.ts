/**
 * Mood Board Multi-Format High-Fidelity Exporter Engine
 *
 * Provides offscreen Canvas 2D rendering and export for the Mood Board Maker.
 * Supports:
 * - Multi-scale rendering (1x 1080p Standard, 2x 2K Retina, 3x 4K Ultra HD, 300 DPI Fine Art Print)
 * - Exact element geometries, rotations, z-index ordering, opacities, and rounded corners
 * - Precise image rendering with aspect-ratio fitting ('cover'/'contain'), crop offsets, and label badges
 * - Rich typography rendering with word wrapping, font styles, alignments, and custom colors
 * - Designer color swatch cards with specular reflection gradients and hex badges
 * - Stylist sticky notes with paper tape accents and multiline text
 * - Vector background grid and dot pattern rendering
 * - Direct download as PNG, JPEG, and encrypted PDF (via dynamic jsPDF import)
 * - Fine-grained progress reporting for high-resolution rendering
 *
 * 100% Client-Side Processing. Zero Cloud Telemetry.
 */

import type { MoodBoardElement, MoodBoardCanvasConfig, ImageFit } from '../types';

export interface MoodBoardExportProgress {
  (current: number, total: number, phase: string): void;
}

export interface PDFExportOptions {
  password?: string;
}

export interface MoodBoardExportOptions {
  format: 'png' | 'jpeg' | 'pdf';
  scale?: number;
  quality?: number;
  filename?: string;
  pdfOptions?: PDFExportOptions;
  onProgress?: MoodBoardExportProgress;
}

export interface ResolutionPreset {
  id: string;
  name: string;
  scale: number;
  description: string;
  tag: string;
}

export const RESOLUTION_PRESETS: ResolutionPreset[] = [
  {
    id: '1x',
    name: '1x Standard Screen',
    scale: 1,
    description: 'Fast export for web messaging & previews',
    tag: '1080p',
  },
  {
    id: '2x',
    name: '2x Retina / 2K',
    scale: 2,
    description: 'Crisp for high-DPI displays & pitch decks',
    tag: '2K',
  },
  {
    id: '3x',
    name: '3x Ultra HD / 4K',
    scale: 3,
    description: 'Ultra high-definition visual fidelity',
    tag: '4K',
  },
  {
    id: '300dpi',
    name: '300 DPI Fine Art Print',
    scale: 3.125,
    description: 'Museum-grade resolution for physical studio prints',
    tag: '300 DPI',
  },
];

const PX_PER_MM = 3.779527559; // Standard 96 DPI CSS px per mm (at 1x scale)

// In-memory image element cache for export operations with LRU bounding
const MAX_EXPORTER_IMAGE_CACHE_SIZE = 100;
const exporterImageCache = new Map<string, HTMLImageElement>();

/**
 * Clears the mood board exporter image cache.
 */
export function clearExporterImageCache(url?: string): void {
  if (url) {
    const img = exporterImageCache.get(url);
    if (img) {
      img.src = '';
      exporterImageCache.delete(url);
    }
  } else {
    for (const img of exporterImageCache.values()) {
      img.src = '';
    }
    exporterImageCache.clear();
  }
}

/**
 * Loads an image from a URL or Blob object URL into an HTMLImageElement.
 */
export function loadExporterImage(url: string): Promise<HTMLImageElement> {
  if (exporterImageCache.has(url)) {
    const cached = exporterImageCache.get(url)!;
    if (cached.complete && cached.naturalWidth > 0) {
      // Re-insert to refresh LRU order
      exporterImageCache.delete(url);
      exporterImageCache.set(url, cached);
      return Promise.resolve(cached);
    }
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // LRU eviction if cache exceeds threshold
      if (exporterImageCache.size >= MAX_EXPORTER_IMAGE_CACHE_SIZE) {
        const oldestKey = exporterImageCache.keys().next().value;
        if (oldestKey) {
          const oldImg = exporterImageCache.get(oldestKey);
          if (oldImg) oldImg.src = '';
          exporterImageCache.delete(oldestKey);
        }
      }
      exporterImageCache.set(url, img);
      resolve(img);
    };
    img.onerror = () => {
      reject(new Error(`Failed to load image at: ${url.substring(0, 60)}...`));
    };
    img.src = url;
  });
}

/**
 * Pre-loads all image assets required for rendering a mood board.
 */
export async function preloadMoodBoardImages(
  elements: MoodBoardElement[],
  onProgress?: MoodBoardExportProgress
): Promise<Map<string, HTMLImageElement | null>> {
  const imageElements = elements.filter(
    (el) => el.type === 'image' && el.content && el.content.trim().length > 0
  );
  const total = imageElements.length;
  const imageMap = new Map<string, HTMLImageElement | null>();

  if (total === 0) {
    if (onProgress) onProgress(1, 1, 'Assets ready');
    return imageMap;
  }

  let loadedCount = 0;
  if (onProgress) onProgress(0, total, 'Loading image assets...');

  const promises = imageElements.map(async (el) => {
    const src = el.content!;
    try {
      const img = await loadExporterImage(src);
      imageMap.set(el.id, img);
    } catch {
      imageMap.set(el.id, null);
    } finally {
      loadedCount++;
      if (onProgress) {
        onProgress(loadedCount, total, `Loading assets (${loadedCount}/${total})...`);
      }
    }
  });

  await Promise.all(promises);
  return imageMap;
}

/**
 * Renders the entire Mood Board onto an HTMLCanvasElement with accurate high-DPI scaling.
 */
export async function renderMoodBoardToCanvas(
  canvas: HTMLCanvasElement,
  elements: MoodBoardElement[],
  config: MoodBoardCanvasConfig,
  scale = 1,
  onProgress?: MoodBoardExportProgress
): Promise<void> {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Unable to obtain 2D rendering context for export canvas');
  }

  const canvasWidth = Math.round(config.width * scale);
  const canvasHeight = Math.round(config.height * scale);

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  // 1. Preload image assets
  const loadedImages = await preloadMoodBoardImages(elements, onProgress);

  if (onProgress) onProgress(0, elements.length, 'Rendering board composition...');

  // 2. Draw Board Background
  ctx.fillStyle = config.backgroundColor || '#181513';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // 3. Draw Background Grid / Pattern
  drawBackgroundPattern(ctx, config, scale, canvasWidth, canvasHeight);

  // 4. Sort elements by zIndex ascending so layers compose correctly
  const sortedElements = [...elements].sort((a, b) => (a.zIndex || 1) - (b.zIndex || 1));

  // 5. Render elements sequentially
  for (let i = 0; i < sortedElements.length; i++) {
    const el = sortedElements[i];
    const loadedImg = loadedImages.get(el.id) || null;

    drawMoodBoardElement(ctx, el, scale, loadedImg);

    if (onProgress) {
      onProgress(i + 1, sortedElements.length, `Compositing layers (${i + 1}/${sortedElements.length})...`);
    }
  }

  if (onProgress) {
    onProgress(elements.length, elements.length, 'Finalizing export buffer...');
  }
}

/**
 * Renders background pattern (dots or grid) matching the workspace aesthetics.
 */
function drawBackgroundPattern(
  ctx: CanvasRenderingContext2D,
  config: MoodBoardCanvasConfig,
  scale: number,
  canvasWidth: number,
  canvasHeight: number
) {
  const pattern = config.backgroundPattern || 'dots';
  if (pattern === 'none') return;

  const gridSize = Math.max(8, Math.round((config.gridSize || 20) * scale));

  if (pattern === 'dots') {
    const dotRadius = Math.max(1, 1.25 * scale);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';

    for (let x = gridSize; x < canvasWidth; x += gridSize) {
      for (let y = gridSize; y < canvasHeight; y += gridSize) {
        ctx.beginPath();
        ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  } else if (pattern === 'grid') {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
    ctx.lineWidth = Math.max(1, 1 * scale);
    ctx.beginPath();

    for (let x = gridSize; x < canvasWidth; x += gridSize) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvasHeight);
    }
    for (let y = gridSize; y < canvasHeight; y += gridSize) {
      ctx.moveTo(0, y);
      ctx.lineTo(canvasWidth, y);
    }
    ctx.stroke();
  }
}

/**
 * Draws an individual mood board element onto the canvas context.
 */
function drawMoodBoardElement(
  ctx: CanvasRenderingContext2D,
  el: MoodBoardElement,
  scale: number,
  loadedImg: HTMLImageElement | null
) {
  const x = Math.round(el.x * scale);
  const y = Math.round(el.y * scale);
  const w = Math.round(el.width * scale);
  const h = Math.round(el.height * scale);
  const radius = Math.min((el.borderRadius ?? 6) * scale, w / 2, h / 2);

  ctx.save();

  // Element rotation around its geometric center
  if (el.rotation && el.rotation !== 0) {
    const cx = x + w / 2;
    const cy = y + h / 2;
    ctx.translate(cx, cy);
    ctx.rotate((el.rotation * Math.PI) / 180);
    ctx.translate(-cx, -cy);
  }

  // Element opacity
  ctx.globalAlpha = Math.max(0, Math.min(1, el.opacity ?? 1));

  // Render drop shadow
  if (el.shadow !== false) {
    ctx.shadowColor = 'rgba(0, 0, 0, 0.32)';
    ctx.shadowBlur = 18 * scale;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 6 * scale;
  } else {
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }

  switch (el.type) {
    case 'image':
      drawImageElement(ctx, el, x, y, w, h, radius, scale, loadedImg);
      break;

    case 'text':
      drawTextElement(ctx, el, x, y, w, h, radius, scale);
      break;

    case 'swatch':
      drawSwatchElement(ctx, el, x, y, w, h, radius, scale);
      break;

    case 'note':
      drawNoteElement(ctx, el, x, y, w, h, radius, scale);
      break;

    case 'shape':
      drawShapeElement(ctx, el, x, y, w, h, radius, scale);
      break;
  }

  ctx.restore();
}

/**
 * Image Element Canvas Renderer
 */
function drawImageElement(
  ctx: CanvasRenderingContext2D,
  el: MoodBoardElement,
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number,
  scale: number,
  img: HTMLImageElement | null
) {
  // Base background container
  ctx.fillStyle = '#1c1917';
  if (radius > 0) {
    traceRoundedRect(ctx, x, y, w, h, radius);
    ctx.fill();
  } else {
    ctx.fillRect(x, y, w, h);
  }

  // Clear shadow before drawing inner clipped contents
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;

  if (img && img.naturalWidth > 0) {
    ctx.save();
    if (radius > 0) {
      traceRoundedRect(ctx, x, y, w, h, radius);
      ctx.clip();
    }

    if (el.crop) {
      // Cropped viewport rendering
      const { x: cropX, y: cropY, width: cropW, height: cropH } = el.crop;
      const srcX = cropX * img.naturalWidth;
      const srcY = cropY * img.naturalHeight;
      const srcW = cropW * img.naturalWidth;
      const srcH = cropH * img.naturalHeight;
      ctx.drawImage(img, srcX, srcY, srcW, srcH, x, y, w, h);
    } else {
      // Aspect ratio fit ('cover' | 'contain')
      drawImageWithFit(ctx, img, x, y, w, h, el.fit || 'cover');
    }

    // Optional photo label badge at bottom-left
    if (el.label && el.label.trim().length > 0) {
      drawPhotoLabelBadge(ctx, el.label.trim(), x, y, w, h, scale);
    }

    ctx.restore();
  } else {
    // Empty / unavailable frame placeholder
    ctx.save();
    if (radius > 0) {
      traceRoundedRect(ctx, x, y, w, h, radius);
      ctx.clip();
    }
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.fillRect(x, y, w, h);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.font = `${Math.round(11 * scale)}px monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Image unavailable', x + w / 2, y + h / 2);
    ctx.restore();
  }

  // Element border
  if (el.borderWidth && el.borderWidth > 0) {
    const lw = Math.max(1, el.borderWidth * scale);
    ctx.strokeStyle = el.borderColor || 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = lw;
    if (radius > 0) {
      traceRoundedRect(
        ctx,
        x + lw / 2,
        y + lw / 2,
        w - lw,
        h - lw,
        Math.max(0, radius - lw / 2)
      );
      ctx.stroke();
    } else {
      ctx.strokeRect(x + lw / 2, y + lw / 2, w - lw, h - lw);
    }
  }
}

/**
 * Text Element Canvas Renderer with multiline line wrapping
 */
function drawTextElement(
  ctx: CanvasRenderingContext2D,
  el: MoodBoardElement,
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number,
  scale: number
) {
  // Background box if not transparent
  if (el.backgroundColor && el.backgroundColor !== 'transparent') {
    ctx.fillStyle = el.backgroundColor;
    if (radius > 0) {
      traceRoundedRect(ctx, x, y, w, h, radius);
      ctx.fill();
    } else {
      ctx.fillRect(x, y, w, h);
    }
  }

  // Clear shadow before drawing text
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;

  const rawText = el.content || 'Editorial Heading';
  const fontSize = Math.max(8, Math.round((el.fontSize || 24) * scale));
  const fontFamily = el.fontFamily || 'system-ui, -apple-system, sans-serif';
  const fontWeight = el.fontWeight || '600';
  const textAlign = el.textAlign || 'left';
  const textColor = el.color || '#ffffff';

  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  ctx.fillStyle = textColor;
  ctx.textAlign = textAlign;
  ctx.textBaseline = 'middle';

  const paddingX = Math.round(12 * scale);
  const paddingY = Math.round(8 * scale);
  const maxWidth = Math.max(20, w - paddingX * 2);

  const lines = wrapText(ctx, rawText, maxWidth);
  const lineHeight = Math.round(fontSize * 1.32);
  const totalTextHeight = lines.length * lineHeight;

  // Center text block vertically inside the element box
  let startY = y + Math.max(paddingY + fontSize / 2, (h - totalTextHeight) / 2 + fontSize / 2);

  let startX = x + paddingX;
  if (textAlign === 'center') {
    startX = x + w / 2;
  } else if (textAlign === 'right') {
    startX = x + w - paddingX;
  }

  for (let i = 0; i < lines.length; i++) {
    const lineY = startY + i * lineHeight;
    if (lineY <= y + h - paddingY + fontSize / 2) {
      ctx.fillText(lines[i], startX, lineY);
    }
  }

  // Stroke border if specified
  if (el.borderWidth && el.borderWidth > 0) {
    const lw = Math.max(1, el.borderWidth * scale);
    ctx.strokeStyle = el.borderColor || 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = lw;
    if (radius > 0) {
      traceRoundedRect(
        ctx,
        x + lw / 2,
        y + lw / 2,
        w - lw,
        h - lw,
        Math.max(0, radius - lw / 2)
      );
      ctx.stroke();
    } else {
      ctx.strokeRect(x + lw / 2, y + lw / 2, w - lw, h - lw);
    }
  }
}

/**
 * Swatch Element Canvas Renderer (Designer Color Card)
 */
function drawSwatchElement(
  ctx: CanvasRenderingContext2D,
  el: MoodBoardElement,
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number,
  scale: number
) {
  const colorHex = el.backgroundColor || el.content || '#d97706';
  const label = el.label || colorHex;

  // Base card background
  ctx.fillStyle = '#181513';
  if (radius > 0) {
    traceRoundedRect(ctx, x, y, w, h, radius);
    ctx.fill();
  } else {
    ctx.fillRect(x, y, w, h);
  }

  // Clear shadow before drawing interior card components
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;

  ctx.save();
  if (radius > 0) {
    traceRoundedRect(ctx, x, y, w, h, radius);
    ctx.clip();
  }

  const labelBarHeight = Math.max(22 * scale, Math.min(28 * scale, h * 0.3));
  const colorBoxHeight = Math.max(0, h - labelBarHeight);

  // 1. Color Fill Block
  ctx.fillStyle = colorHex;
  ctx.fillRect(x, y, w, colorBoxHeight);

  // 2. Specular reflection gradient overlay
  const specularGrad = ctx.createLinearGradient(x + w, y, x, y + colorBoxHeight);
  specularGrad.addColorStop(0, 'rgba(255, 255, 255, 0.16)');
  specularGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.0)');
  specularGrad.addColorStop(1, 'rgba(0, 0, 0, 0.18)');
  ctx.fillStyle = specularGrad;
  ctx.fillRect(x, y, w, colorBoxHeight);

  // 3. Bottom Label Bar
  const labelBarY = y + colorBoxHeight;
  ctx.fillStyle = '#0c0a09';
  ctx.fillRect(x, labelBarY, w, labelBarHeight);

  // Divider Line
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = Math.max(1, 1 * scale);
  ctx.beginPath();
  ctx.moveTo(x, labelBarY);
  ctx.lineTo(x + w, labelBarY);
  ctx.stroke();

  // Swatch Label Text (Left)
  const fontSize = Math.max(7, Math.round(9.5 * scale));
  ctx.font = `bold ${fontSize}px monospace`;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';

  const textY = labelBarY + labelBarHeight / 2;
  const paddingX = Math.round(8 * scale);

  // Truncate swatch label if it collides with hex code
  const hexFontSize = Math.max(6, Math.round(8.5 * scale));
  ctx.font = `${hexFontSize}px monospace`;
  const hexStr = colorHex.toUpperCase();
  const hexWidth = ctx.measureText(hexStr).width;

  ctx.font = `bold ${fontSize}px monospace`;
  const maxLabelWidth = Math.max(20, w - paddingX * 2 - hexWidth - 8 * scale);
  const truncatedLabel = truncateText(ctx, label, maxLabelWidth);

  ctx.fillText(truncatedLabel, x + paddingX, textY);

  // Swatch Hex Text (Right)
  ctx.font = `${hexFontSize}px monospace`;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.60)';
  ctx.textAlign = 'right';
  ctx.fillText(hexStr, x + w - paddingX, textY);

  ctx.restore();

  // Border outline
  const lw = Math.max(1, (el.borderWidth || 1) * scale);
  ctx.strokeStyle = el.borderColor || 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = lw;
  if (radius > 0) {
    traceRoundedRect(
      ctx,
      x + lw / 2,
      y + lw / 2,
      w - lw,
      h - lw,
      Math.max(0, radius - lw / 2)
    );
    ctx.stroke();
  } else {
    ctx.strokeRect(x + lw / 2, y + lw / 2, w - lw, h - lw);
  }
}

/**
 * Note Element Canvas Renderer (Stylist Sticky Note with Tape Accent)
 */
function drawNoteElement(
  ctx: CanvasRenderingContext2D,
  el: MoodBoardElement,
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number,
  scale: number
) {
  const noteBg = el.backgroundColor || '#fef3c7';
  const noteTextColor = el.color || '#1c1917';

  // Base Note Paper
  ctx.fillStyle = noteBg;
  if (radius > 0) {
    traceRoundedRect(ctx, x, y, w, h, radius);
    ctx.fill();
  } else {
    ctx.fillRect(x, y, w, h);
  }

  // Clear shadow before drawing note contents
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;

  ctx.save();
  if (radius > 0) {
    traceRoundedRect(ctx, x, y, w, h, radius);
    ctx.clip();
  }

  // Draw multiline note body text
  const rawContent = el.content || 'Note content...';
  const fontSize = Math.max(8, Math.round((el.fontSize || 13) * scale));
  const fontFamily = el.fontFamily || 'system-ui, sans-serif';
  const fontWeight = el.fontWeight || '400';

  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  ctx.fillStyle = noteTextColor;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';

  const paddingX = Math.round(14 * scale);
  const paddingTop = Math.round(18 * scale);
  const maxWidth = Math.max(20, w - paddingX * 2);

  const lines = wrapText(ctx, rawContent, maxWidth);
  const lineHeight = Math.round(fontSize * 1.38);

  for (let i = 0; i < lines.length; i++) {
    const lineY = y + paddingTop + i * lineHeight;
    if (lineY + fontSize <= y + h - Math.round(10 * scale)) {
      ctx.fillText(lines[i], x + paddingX, lineY);
    }
  }

  ctx.restore();

  // Subtle top paper tape strip accent
  ctx.save();
  const tapeWidth = Math.round(48 * scale);
  const tapeHeight = Math.round(16 * scale);
  const tapeX = x + Math.round((w - tapeWidth) / 2);
  const tapeY = y - Math.round(4 * scale);

  ctx.translate(tapeX + tapeWidth / 2, tapeY + tapeHeight / 2);
  ctx.rotate((-1.5 * Math.PI) / 180);
  ctx.translate(-(tapeX + tapeWidth / 2), -(tapeY + tapeHeight / 2));

  ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.fillRect(tapeX, tapeY, tapeWidth, tapeHeight);

  ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
  ctx.lineWidth = Math.max(1, 0.75 * scale);
  ctx.strokeRect(tapeX, tapeY, tapeWidth, tapeHeight);
  ctx.restore();
}

/**
 * Shape Element Canvas Renderer
 */
function drawShapeElement(
  ctx: CanvasRenderingContext2D,
  el: MoodBoardElement,
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number,
  scale: number
) {
  // Fill
  ctx.fillStyle = el.backgroundColor || 'rgba(255, 255, 255, 0.08)';
  if (radius > 0) {
    traceRoundedRect(ctx, x, y, w, h, radius);
    ctx.fill();
  } else {
    ctx.fillRect(x, y, w, h);
  }

  // Clear shadow before stroke
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;

  // Stroke
  const lw = Math.max(1, (el.borderWidth || 1) * scale);
  ctx.strokeStyle = el.borderColor || 'rgba(255, 255, 255, 0.25)';
  ctx.lineWidth = lw;

  if (radius > 0) {
    traceRoundedRect(
      ctx,
      x + lw / 2,
      y + lw / 2,
      w - lw,
      h - lw,
      Math.max(0, radius - lw / 2)
    );
    ctx.stroke();
  } else {
    ctx.strokeRect(x + lw / 2, y + lw / 2, w - lw, h - lw);
  }
}

/**
 * Photo Label Badge drawn on the image bottom corner.
 */
function drawPhotoLabelBadge(
  ctx: CanvasRenderingContext2D,
  label: string,
  x: number,
  y: number,
  w: number,
  h: number,
  scale: number
) {
  const fontSize = Math.max(7, Math.round(9.5 * scale));
  ctx.font = `${fontSize}px monospace`;

  const paddingH = Math.round(6 * scale);
  const paddingV = Math.round(3 * scale);
  const margin = Math.round(8 * scale);

  const maxBadgeWidth = Math.max(20, w * 0.85);
  const truncated = truncateText(ctx, label, maxBadgeWidth - paddingH * 2);

  const textMetrics = ctx.measureText(truncated);
  const badgeWidth = textMetrics.width + paddingH * 2;
  const badgeHeight = fontSize + paddingV * 2;

  const badgeX = x + margin;
  const badgeY = y + h - margin - badgeHeight;
  const badgeRadius = Math.round(3 * scale);

  ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
  traceRoundedRect(ctx, badgeX, badgeY, badgeWidth, badgeHeight, badgeRadius);
  ctx.fill();

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = Math.max(1, 0.75 * scale);
  ctx.stroke();

  ctx.fillStyle = 'rgba(255, 255, 255, 0.90)';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(truncated, badgeX + paddingH, badgeY + badgeHeight / 2);
}

/**
 * Traces a rounded rectangle path onto canvas context.
 */
function traceRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const radius = Math.max(0, Math.min(r, w / 2, h / 2));
  ctx.beginPath();

  const withRoundRect = ctx as CanvasRenderingContext2D & {
    roundRect?: (x: number, y: number, w: number, h: number, r: number) => void;
  };
  if (typeof withRoundRect.roundRect === 'function') {
    withRoundRect.roundRect(x, y, w, h, radius);
    return;
  }

  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

/**
 * Draws an image with aspect ratio fit ('cover' | 'contain').
 */
function drawImageWithFit(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
  fit: ImageFit = 'cover'
) {
  const imgW = img.naturalWidth;
  const imgH = img.naturalHeight;
  if (!imgW || !imgH) return;

  if (fit === 'cover') {
    const imgRatio = imgW / imgH;
    const cellRatio = w / h;
    let srcX = 0;
    let srcY = 0;
    let srcW = imgW;
    let srcH = imgH;

    if (imgRatio > cellRatio) {
      srcW = imgH * cellRatio;
      srcX = (imgW - srcW) / 2;
    } else {
      srcH = imgW / cellRatio;
      srcY = (imgH - srcH) / 2;
    }

    ctx.drawImage(img, srcX, srcY, srcW, srcH, x, y, w, h);
  } else {
    // Contain: letterbox inside bounds
    const scale = Math.min(w / imgW, h / imgH);
    const drawW = imgW * scale;
    const drawH = imgH * scale;
    const drawX = x + (w - drawW) / 2;
    const drawY = y + (h - drawH) / 2;
    ctx.drawImage(img, 0, 0, imgW, imgH, drawX, drawY, drawW, drawH);
  }
}

/**
 * Wraps text into lines according to max bounding width.
 */
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const lines: string[] = [];
  const paragraphs = text.split('\n');

  for (const para of paragraphs) {
    if (para.trim() === '') {
      lines.push('');
      continue;
    }

    const words = para.split(' ');
    let currentLine = '';

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const metrics = ctx.measureText(testLine);

      if (metrics.width > maxWidth && currentLine !== '') {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      lines.push(currentLine);
    }
  }

  return lines;
}

/**
 * Truncates text with an ellipsis if it exceeds maxWidth.
 */
function truncateText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string {
  if (ctx.measureText(text).width <= maxWidth) {
    return text;
  }

  let truncated = text;
  while (truncated.length > 0 && ctx.measureText(`${truncated}…`).width > maxWidth) {
    truncated = truncated.slice(0, -1);
  }

  return `${truncated}…`;
}

// ---------------------------------------------------------------------------
// High-Level Multi-Format Export APIs
// ---------------------------------------------------------------------------

/**
 * Exports the Mood Board as a PNG or JPEG file download.
 */
export async function exportMoodBoardAsImage(
  elements: MoodBoardElement[],
  config: MoodBoardCanvasConfig,
  format: 'png' | 'jpeg' = 'png',
  scale = 1,
  quality = 0.92,
  filename = 'makecontactsheet-moodboard',
  onProgress?: MoodBoardExportProgress
): Promise<void> {
  const offscreen = document.createElement('canvas');
  await renderMoodBoardToCanvas(offscreen, elements, config, scale, onProgress);

  const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png';
  const blob = await new Promise<Blob | null>((resolve) => {
    offscreen.toBlob((b) => resolve(b), mimeType, quality);
  });

  if (!blob) {
    throw new Error('Failed to generate mood board image blob');
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

/**
 * Exports the Mood Board as a print-ready vector-wrapped PDF (via dynamic jsPDF import).
 */
export async function exportMoodBoardAsPDF(
  elements: MoodBoardElement[],
  config: MoodBoardCanvasConfig,
  scale = 2,
  filename = 'makecontactsheet-moodboard',
  options?: PDFExportOptions,
  onProgress?: MoodBoardExportProgress
): Promise<void> {
  const offscreen = document.createElement('canvas');
  await renderMoodBoardToCanvas(offscreen, elements, config, scale, onProgress);

  if (onProgress) {
    onProgress(elements.length, elements.length, 'Generating print PDF document...');
  }

  // Calculate true millimetre dimensions from base canvas resolution
  const widthMm = Math.round((offscreen.width / scale / PX_PER_MM) * 100) / 100;
  const heightMm = Math.round((offscreen.height / scale / PX_PER_MM) * 100) / 100;
  const format: [number, number] = [widthMm, heightMm];
  const orientation: 'portrait' | 'landscape' = widthMm > heightMm ? 'landscape' : 'portrait';

  // Dynamic import keeps initial bundle lightweight
  const { jsPDF } = await import('jspdf');

  const pdfOptions: any = {
    orientation,
    unit: 'mm',
    format,
    compress: true,
  };

  if (options?.password && options.password.trim().length > 0) {
    const secureOwnerSecret = (typeof crypto !== 'undefined' && crypto.randomUUID)
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2) + Date.now().toString(36);
    pdfOptions.encryption = {
      userPassword: options.password,
      ownerPassword: secureOwnerSecret,
      userPermissions: ['print', 'modify', 'copy', 'annot-forms'],
    };
  }

  const doc = new jsPDF(pdfOptions);
  const imgData = offscreen.toDataURL('image/jpeg', 0.92);
  const pdfWidth = doc.internal.pageSize.getWidth();
  const pdfHeight = doc.internal.pageSize.getHeight();

  doc.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
  doc.save(`${filename}.pdf`);
}

/**
 * Unified mood board export dispatcher.
 */
export async function exportMoodBoard(
  elements: MoodBoardElement[],
  config: MoodBoardCanvasConfig,
  options: MoodBoardExportOptions
): Promise<void> {
  const format = options.format || 'png';
  const scale = options.scale || 1;
  const quality = options.quality ?? 0.92;
  const filename = options.filename || 'makecontactsheet-moodboard';

  if (format === 'pdf') {
    await exportMoodBoardAsPDF(
      elements,
      config,
      scale,
      filename,
      options.pdfOptions,
      options.onProgress
    );
  } else {
    await exportMoodBoardAsImage(
      elements,
      config,
      format,
      scale,
      quality,
      filename,
      options.onProgress
    );
  }
}
