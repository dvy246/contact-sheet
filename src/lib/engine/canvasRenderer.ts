import type { PageLayoutResult, CollageLayoutResult, LayoutConfig, ReviewStatus } from '../types';

// In-memory cache for loaded Image elements with size bounding to prevent memory leaks
const MAX_IMAGE_CACHE_SIZE = 120;
const imageElementCache = new Map<string, HTMLImageElement>();

export function clearImageElementCache(url?: string): void {
  if (url) {
    const img = imageElementCache.get(url);
    if (img) {
      img.src = '';
      imageElementCache.delete(url);
    }
  } else {
    for (const img of imageElementCache.values()) {
      img.src = '';
    }
    imageElementCache.clear();
  }
}

export function getCachedImage(url: string): Promise<HTMLImageElement> {
  if (imageElementCache.has(url)) {
    const cached = imageElementCache.get(url)!;
    if (cached.complete && cached.naturalWidth > 0) {
      return Promise.resolve(cached);
    }
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // LRU eviction if cache exceeds threshold
      if (imageElementCache.size >= MAX_IMAGE_CACHE_SIZE) {
        const oldestKey = imageElementCache.keys().next().value;
        if (oldestKey) {
          const oldImg = imageElementCache.get(oldestKey);
          if (oldImg) oldImg.src = '';
          imageElementCache.delete(oldestKey);
        }
      }
      imageElementCache.set(url, img);
      resolve(img);
    };
    img.onerror = () => {
      reject(new Error(`Failed to load image at ${url}`));
    };
    img.src = url;
  });
}

export async function renderContactSheetToCanvas(
  canvas: HTMLCanvasElement,
  page: PageLayoutResult,
  config: LayoutConfig,
  selectedId: string | null = null,
  isExport = false
): Promise<void> {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = page.canvasWidth;
  canvas.height = page.canvasHeight;

  // Everything measured in unscaled px — type, keylines, badges — multiplies by
  // this, so a 300dpi export looks like the preview instead of hairline-thin.
  const scale = page.scale || 1;

  // 1. Draw Workspace Background
  ctx.fillStyle = config.bg || '#1a1210';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Pre-load all page images concurrently
  const loadPromises = page.cells.map(cell =>
    getCachedImage(cell.image.previewUrl).catch(() => null)
  );
  const loadedImages = await Promise.all(loadPromises);

  // 2. Draw each photo cell
  for (let i = 0; i < page.cells.length; i++) {
    const cell = page.cells[i];
    const imgEl = loadedImages[i];
    const isSelected = selectedId === cell.image.id;

    // Never more than half the shorter side, or the corners cross over and the
    // path inverts.
    const radius =
      config.cellRadius > 0
        ? Math.min(config.cellRadius * scale, cell.width / 2, cell.height / 2)
        : 0;

    if (imgEl && imgEl.naturalWidth > 0) {
      if (radius > 0) {
        ctx.save();
        traceRoundedRect(ctx, cell.x, cell.y, cell.width, cell.height, radius);
        ctx.clip();
        drawImageWithFit(ctx, imgEl, cell.x, cell.y, cell.width, cell.height, config.fit);
        ctx.restore();
      } else {
        drawImageWithFit(ctx, imgEl, cell.x, cell.y, cell.width, cell.height, config.fit);
      }
    } else {
      // Placeholder if image failed to load
      ctx.fillStyle = '#2a1d18';
      if (radius > 0) {
        traceRoundedRect(ctx, cell.x, cell.y, cell.width, cell.height, radius);
        ctx.fill();
      } else {
        ctx.fillRect(cell.x, cell.y, cell.width, cell.height);
      }
    }

    // Optional keyline around the photo. Drawn inset by half the stroke so the
    // line sits on the photo edge rather than straddling it.
    if (config.cellBorderWidth > 0) {
      const lw = Math.max(1, config.cellBorderWidth * scale);
      ctx.save();
      ctx.strokeStyle = config.cellBorderColor || '#4a352b';
      ctx.lineWidth = lw;
      if (radius > 0) {
        traceRoundedRect(
          ctx,
          cell.x + lw / 2,
          cell.y + lw / 2,
          cell.width - lw,
          cell.height - lw,
          Math.max(0, radius - lw / 2)
        );
        ctx.stroke();
      } else {
        ctx.strokeRect(cell.x + lw / 2, cell.y + lw / 2, cell.width - lw, cell.height - lw);
      }
      ctx.restore();
    }

    // Selected highlight outline (workspace only, not in final export)
    if (isSelected && !isExport) {
      ctx.save();
      ctx.strokeStyle = '#c98a46';
      ctx.lineWidth = 3;
      if (radius > 0) {
        traceRoundedRect(ctx, cell.x - 1, cell.y - 1, cell.width + 2, cell.height + 2, radius + 1);
        ctx.stroke();
      } else {
        ctx.strokeRect(cell.x - 1, cell.y - 1, cell.width + 2, cell.height + 2);
      }
      ctx.restore();
    }

    // Status Badges (Keep / Flag / Reject)
    if (config.showStatusBadges && cell.status !== 'unreviewed') {
      drawStatusBadge(ctx, cell.x, cell.y, cell.width, cell.status, scale);
    }

    // Text Label — below the photo on a per-row baseline, or printed inside
    // the frame on a scrim when `overlay` is chosen.
    if (cell.label && config.showLabels && config.labelPosition !== 'none') {
      const fontSize = Math.max(6, config.fontSize * scale);
      if (config.labelPosition === 'overlay') {
        drawOverlayLabel(
          ctx,
          cell.label,
          cell.x,
          cell.y,
          cell.width,
          cell.height,
          fontSize
        );
      } else {
        drawCellLabel(
          ctx,
          cell.label,
          // Strip geometry, which is the grid column — not the photo rect, which
          // under `contain` may be inset inside it.
          cell.labelX ?? cell.x,
          cell.labelWidth ?? cell.width,
          cell.labelY ?? cell.y + cell.height + 14 * scale,
          config.textColor,
          fontSize,
          config.labelAlign
        );
      }
    }
  }

  // 3. Title and page-number bands, drawn last so nothing overlaps them.
  if (page.headerRect) {
    drawHeaderBand(ctx, page, config, scale);
  }
  if (page.footerRect) {
    drawFooterBand(ctx, page, config, scale);
  }
}

export async function renderCollageToCanvas(
  canvas: HTMLCanvasElement,
  layout: CollageLayoutResult,
  config: LayoutConfig,
  selectedId: string | null = null,
  isExport = false
): Promise<void> {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = layout.canvasWidth;
  canvas.height = layout.canvasHeight;

  // Background fill
  ctx.fillStyle = config.bg || '#1a1210';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Pre-load images
  const loadPromises = layout.cells.map(cell => 
    cell.image ? getCachedImage(cell.image.previewUrl).catch(() => null) : Promise.resolve(null)
  );
  const loadedImages = await Promise.all(loadPromises);

  for (let i = 0; i < layout.cells.length; i++) {
    const cell = layout.cells[i];
    const imgEl = loadedImages[i];
    const isSelected = cell.image && selectedId === cell.image.id;

    // Collage cells are drawn at 1x geometry, so the configured radius applies
    // directly. Same clamp as the contact sheet.
    const radius =
      config.cellRadius > 0
        ? Math.min(config.cellRadius, cell.width / 2, cell.height / 2)
        : 0;

    if (imgEl && imgEl.naturalWidth > 0) {
      if (radius > 0) {
        ctx.save();
        traceRoundedRect(ctx, cell.x, cell.y, cell.width, cell.height, radius);
        ctx.clip();
        drawImageWithFit(ctx, imgEl, cell.x, cell.y, cell.width, cell.height, cell.fit);
        ctx.restore();
      } else {
        drawImageWithFit(ctx, imgEl, cell.x, cell.y, cell.width, cell.height, cell.fit);
      }
    } else {
      // Empty cell placeholder
      ctx.fillStyle = '#1f1613';
      ctx.strokeStyle = '#3a2921';
      ctx.lineWidth = 1;
      if (radius > 0) {
        traceRoundedRect(ctx, cell.x, cell.y, cell.width, cell.height, radius);
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.fillRect(cell.x, cell.y, cell.width, cell.height);
        ctx.strokeRect(cell.x, cell.y, cell.width, cell.height);
      }

      if (!isExport) {
        ctx.fillStyle = '#8a7365';
        ctx.font = '13px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`Drop Photo ${i + 1}`, cell.x + cell.width / 2, cell.y + cell.height / 2);
      }
    }

    if (isSelected && !isExport) {
      ctx.save();
      ctx.strokeStyle = '#c98a46';
      ctx.lineWidth = 3;
      ctx.strokeRect(cell.x - 1, cell.y - 1, cell.width + 2, cell.height + 2);
      ctx.restore();
    }
  }
}

function drawImageWithFit(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
  fit: 'contain' | 'cover' = 'contain'
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
    // Contain: letterbox inside the rect, preserving aspect. This used to draw
    // the whole image into the whole rect, which is a stretch, not a fit — the
    // contact-sheet engine happens to pre-fit its rects so it never showed
    // there, but every collage cell declaring fit: 'contain' was distorted.
    const scale = Math.min(w / imgW, h / imgH);
    const drawW = imgW * scale;
    const drawH = imgH * scale;
    const drawX = x + (w - drawW) / 2;
    const drawY = y + (h - drawH) / 2;
    ctx.drawImage(img, 0, 0, imgW, imgH, drawX, drawY, drawW, drawH);
  }
}

/** Title band: sheet name on the left, photo count on the right, hairline rule
 *  underneath. Text colour comes from the sheet's own textColor so it stays
 *  legible on both light and dark backgrounds. */
function drawHeaderBand(
  ctx: CanvasRenderingContext2D,
  page: PageLayoutResult,
  config: LayoutConfig,
  scale: number
) {
  const rect = page.headerRect;
  if (!rect) return;

  const title = (config.headerText || '').trim() || 'Contact Sheet';
  const titleSize = Math.max(9, 18 * scale);
  const metaSize = Math.max(7, 11 * scale);
  const baseline = rect.y + rect.height * 0.42;

  ctx.save();
  ctx.fillStyle = config.textColor || '#f7efe6';
  ctx.textBaseline = 'middle';

  ctx.font = `600 ${titleSize}px system-ui, -apple-system, sans-serif`;
  ctx.textAlign = 'left';
  ctx.fillText(truncateToWidth(ctx, title, rect.width * 0.66), rect.x, baseline);

  const shown = page.cells.length;
  const meta =
    page.totalPages > 1
      ? `${shown} photo${shown === 1 ? '' : 's'} on this page`
      : `${shown} photo${shown === 1 ? '' : 's'}`;
  ctx.globalAlpha = 0.65;
  ctx.font = `500 ${metaSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
  ctx.textAlign = 'right';
  ctx.fillText(meta, rect.x + rect.width, baseline);

  ctx.globalAlpha = 0.25;
  ctx.strokeStyle = config.textColor || '#f7efe6';
  ctx.lineWidth = Math.max(1, scale);
  ctx.beginPath();
  ctx.moveTo(rect.x, Math.round(rect.y + rect.height - 8 * scale));
  ctx.lineTo(rect.x + rect.width, Math.round(rect.y + rect.height - 8 * scale));
  ctx.stroke();
  ctx.restore();
}

function drawFooterBand(
  ctx: CanvasRenderingContext2D,
  page: PageLayoutResult,
  config: LayoutConfig,
  scale: number
) {
  const rect = page.footerRect;
  if (!rect) return;

  ctx.save();
  ctx.fillStyle = config.textColor || '#f7efe6';
  ctx.globalAlpha = 0.65;
  ctx.font = `500 ${Math.max(7, 11 * scale)}px ui-monospace, SFMono-Regular, Menlo, monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(
    `Page ${page.pageIndex + 1} of ${page.totalPages}`,
    rect.x + rect.width / 2,
    rect.y + rect.height / 2
  );
  ctx.restore();
}

/** Label printed inside the frame. A gradient scrim keeps it readable over a
 *  bright photo without hiding the photo itself. */
function drawOverlayLabel(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  w: number,
  h: number,
  fontSize: number
) {
  const bandHeight = Math.min(h, fontSize * 2.2);
  const bandY = y + h - bandHeight;

  ctx.save();
  const grad = ctx.createLinearGradient(0, bandY, 0, y + h);
  grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0.72)');
  ctx.fillStyle = grad;
  ctx.fillRect(x, bandY, w, bandHeight);

  ctx.fillStyle = '#ffffff';
  ctx.font = `600 ${fontSize}px system-ui, -apple-system, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(
    truncateToWidth(ctx, text, w - fontSize),
    x + w / 2,
    y + h - fontSize * 0.55
  );
  ctx.restore();
}

function truncateToWidth(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string {
  if (maxWidth <= 0 || ctx.measureText(text).width <= maxWidth) return text;
  let out = text;
  while (out.length > 1 && ctx.measureText(out + '…').width > maxWidth) {
    out = out.slice(0, -1);
  }
  return out + '…';
}

function drawStatusBadge(
  ctx: CanvasRenderingContext2D,
  cellX: number,
  cellY: number,
  cellW: number,
  status: ReviewStatus,
  scale = 1
) {
  const badgeSize = 20 * scale;
  const pad = 6 * scale;
  const badgeX = cellX + cellW - badgeSize - pad;
  const badgeY = cellY + pad;
  const u = badgeSize / 20; // unit, so the glyph geometry below scales with it

  ctx.save();
  ctx.beginPath();
  ctx.arc(badgeX + badgeSize / 2, badgeY + badgeSize / 2, badgeSize / 2, 0, Math.PI * 2);

  if (status === 'keep') {
    ctx.fillStyle = '#10b981';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2 * u;
    ctx.beginPath();
    ctx.moveTo(badgeX + 6 * u, badgeY + 10 * u);
    ctx.lineTo(badgeX + 9 * u, badgeY + 14 * u);
    ctx.lineTo(badgeX + 15 * u, badgeY + 6 * u);
    ctx.stroke();
  } else if (status === 'flag') {
    ctx.fillStyle = '#f59e0b';
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = `${12 * u}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('★', badgeX + badgeSize / 2, badgeY + badgeSize / 2 + u);
  } else if (status === 'reject') {
    ctx.fillStyle = '#f43f5e';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2 * u;
    ctx.beginPath();
    ctx.moveTo(badgeX + 6 * u, badgeY + 6 * u);
    ctx.lineTo(badgeX + 14 * u, badgeY + 14 * u);
    ctx.moveTo(badgeX + 14 * u, badgeY + 6 * u);
    ctx.lineTo(badgeX + 6 * u, badgeY + 14 * u);
    ctx.stroke();
  }
  ctx.restore();
}

function drawCellLabel(
  ctx: CanvasRenderingContext2D,
  text: string,
  stripX: number,
  stripWidth: number,
  baselineY: number,
  color = '#f7efe6',
  fontSize = 11,
  align: 'center' | 'left' = 'center'
) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.font = `500 ${fontSize}px system-ui, -apple-system, sans-serif`;
  ctx.textAlign = align === 'left' ? 'left' : 'center';
  ctx.textBaseline = 'top';

  // Truncate text if wider than available cell width
  const maxWidth = stripWidth;
  let displayString = text;
  if (ctx.measureText(displayString).width > maxWidth - 8) {
    while (displayString.length > 3 && ctx.measureText(displayString + '…').width > maxWidth - 8) {
      displayString = displayString.slice(0, -1);
    }
    displayString += '…';
  }

  ctx.fillText(displayString, align === 'left' ? stripX : stripX + stripWidth / 2, baselineY);
  ctx.restore();
}

/**
 * Begins a rounded-rect path. `roundRect` is not in older Safari, so the arcTo
 * fallback keeps rounded corners working there instead of throwing mid-render
 * and blanking the sheet.
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
