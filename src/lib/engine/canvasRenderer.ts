import type { PageLayoutResult, CollageLayoutResult, LayoutConfig, ReviewStatus, ImageItem } from '../types';

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

  // Pre-load optional custom logo watermark if configured
  const watermarkPromise = (config.showWatermark && config.watermarkType === 'image' && config.watermarkImageUrl)
    ? getCachedImage(config.watermarkImageUrl).catch(() => null)
    : Promise.resolve(null);

  const [loadedImages, watermarkImg] = await Promise.all([
    Promise.all(loadPromises),
    watermarkPromise,
  ]);

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

    // Optional protective watermark
    if (config.showWatermark) {
      drawWatermark(ctx, cell.x, cell.y, cell.width, cell.height, radius, config, scale, watermarkImg);
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

    // Optional dynamic EXIF / metadata badge overlay
    if (config.showExifOverlay) {
      drawExifBadge(ctx, cell, config, scale, i + 1);
    }
  }

  // 3. Title and page-number bands, drawn last so nothing overlaps them.
  if (page.headerRect) {
    drawHeaderBand(ctx, page, config, scale);
  }
  if (page.footerRect) {
    drawFooterBand(ctx, page, config, scale);
  }

  // Phase 4: Forensic Watermark
  if (isExport && config.enableForensicWatermark) {
    const { $sessionUUID } = await import('../store');
    const { embedForensicWatermark } = await import('./forensicWatermark');
    embedForensicWatermark(canvas, $sessionUUID.get());
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

  // Pre-load optional custom logo watermark if configured
  const watermarkPromise = (config.showWatermark && config.watermarkType === 'image' && config.watermarkImageUrl)
    ? getCachedImage(config.watermarkImageUrl).catch(() => null)
    : Promise.resolve(null);

  const [loadedImages, watermarkImg] = await Promise.all([
    Promise.all(loadPromises),
    watermarkPromise,
  ]);

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
      if (config.showWatermark) {
        drawWatermark(ctx, cell.x, cell.y, cell.width, cell.height, radius, config, 1, watermarkImg);
      }
      if (config.showExifOverlay) {
        drawExifBadge(ctx, cell, config, 1, i + 1);
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

  // Phase 4: Forensic Watermark
  if (isExport && config.enableForensicWatermark) {
    const { $sessionUUID } = await import('../store');
    const { embedForensicWatermark } = await import('./forensicWatermark');
    embedForensicWatermark(canvas, $sessionUUID.get());
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

/**
 * Draws an optional protective watermark over a photo cell.
 * Supports both uploaded logo/image watermarks and text watermarks
 * (single diagonal stamp, repeating multi-line tiled grid, or center stamp).
 */
function drawWatermark(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number,
  config: LayoutConfig,
  scale = 1,
  watermarkImg?: HTMLImageElement | null
) {
  if (!config.showWatermark) return;
  const opacity = Math.max(0.01, Math.min(1, (config.watermarkOpacity ?? 20) / 100));

  // --- Image / Logo Watermark Branch ---
  if (config.watermarkType === 'image' && watermarkImg && watermarkImg.naturalWidth > 0) {
    const scaleFactor = Math.max(0.05, Math.min(1, (config.watermarkImageScale ?? 30) / 100));
    const pos = config.watermarkImagePosition || 'bottom-right';

    const maxBoxW = w * scaleFactor;
    const maxBoxH = h * scaleFactor;
    const aspect = watermarkImg.naturalWidth / (watermarkImg.naturalHeight || 1);

    let logoW = maxBoxW;
    let logoH = maxBoxW / aspect;
    if (logoH > maxBoxH) {
      logoH = maxBoxH;
      logoW = maxBoxH * aspect;
    }

    ctx.save();

    // Clip watermark strictly within the photo bounds and rounded corner radius
    if (radius > 0) {
      traceRoundedRect(ctx, x, y, w, h, radius);
    } else {
      ctx.beginPath();
      ctx.rect(x, y, w, h);
    }
    ctx.clip();

    ctx.globalAlpha = opacity;

    if (pos === 'tiled') {
      const centerX = x + w / 2;
      const centerY = y + h / 2;
      ctx.translate(centerX, centerY);
      ctx.rotate(-Math.PI / 6);

      const diag = Math.hypot(w, h);
      const stepX = Math.max(logoW * 1.4, 40 * scale);
      const stepY = Math.max(logoH * 1.4, 30 * scale);

      const startX = -diag / 2 - stepX;
      const endX = diag / 2 + stepX;
      const startY = -diag / 2 - stepY;
      const endY = diag / 2 + stepY;

      let rowIndex = 0;
      for (let curY = startY; curY <= endY; curY += stepY) {
        const offsetX = rowIndex % 2 === 0 ? 0 : stepX / 2;
        for (let curX = startX; curX <= endX; curX += stepX) {
          ctx.drawImage(watermarkImg, curX + offsetX, curY, logoW, logoH);
        }
        rowIndex++;
      }
    } else if (pos === 'center') {
      const destX = x + (w - logoW) / 2;
      const destY = y + (h - logoH) / 2;
      ctx.drawImage(watermarkImg, destX, destY, logoW, logoH);
    } else {
      const pad = Math.max(4 * scale, Math.min(16 * scale, w * 0.04));
      let destX = x + pad;
      let destY = y + pad;

      if (pos === 'bottom-right') {
        destX = x + w - logoW - pad;
        destY = y + h - logoH - pad;
      } else if (pos === 'bottom-left') {
        destX = x + pad;
        destY = y + h - logoH - pad;
      } else if (pos === 'top-right') {
        destX = x + w - logoW - pad;
        destY = y + pad;
      } else if (pos === 'top-left') {
        destX = x + pad;
        destY = y + pad;
      }

      ctx.drawImage(watermarkImg, destX, destY, logoW, logoH);
    }

    ctx.restore();
    return;
  }

  // --- Text Watermark Branch ---
  const rawText = (config.watermarkText || '').trim();
  if (!rawText) return;

  const text = config.labelUppercase ? rawText.toUpperCase() : rawText;
  const color = config.watermarkColor || '#ffffff';
  const style = config.watermarkStyle || 'diagonal';

  ctx.save();

  // Clip watermark strictly within the photo bounds and rounded corner radius
  if (radius > 0) {
    traceRoundedRect(ctx, x, y, w, h, radius);
  } else {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
  }
  ctx.clip();

  ctx.globalAlpha = opacity;
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const centerX = x + w / 2;
  const centerY = y + h / 2;

  if (style === 'center') {
    // Single centered stamp
    const fontSize = Math.max(10, Math.min(w * 0.18, h * 0.18, 36 * scale));
    ctx.font = `700 ${fontSize}px system-ui, -apple-system, sans-serif`;
    ctx.fillText(text, centerX, centerY);
  } else if (style === 'tiled') {
    // Repeating diagonal tiled grid across cell — highest resistance against AI inpainting
    const fontSize = Math.max(8, Math.min(w * 0.08, h * 0.08, 15 * scale));
    ctx.font = `600 ${fontSize}px system-ui, -apple-system, sans-serif`;

    ctx.translate(centerX, centerY);
    ctx.rotate(-Math.PI / 6); // -30 degrees

    const diag = Math.hypot(w, h);
    const stepX = Math.max(40 * scale, ctx.measureText(text).width + 24 * scale);
    const stepY = Math.max(20 * scale, fontSize * 2.6);

    const startX = -diag / 2 - stepX;
    const endX = diag / 2 + stepX;
    const startY = -diag / 2 - stepY;
    const endY = diag / 2 + stepY;

    let rowIndex = 0;
    for (let curY = startY; curY <= endY; curY += stepY) {
      const offsetX = rowIndex % 2 === 0 ? 0 : stepX / 2;
      for (let curX = startX; curX <= endX; curX += stepX) {
        ctx.fillText(text, curX + offsetX, curY);
      }
      rowIndex++;
    }
  } else {
    // 'diagonal': single bold angled line across the cell
    const fontSize = Math.max(10, Math.min(w * 0.15, h * 0.15, 30 * scale));
    ctx.font = `700 ${fontSize}px system-ui, -apple-system, sans-serif`;

    const angle = Math.atan2(-h, w) * 0.65;
    ctx.translate(centerX, centerY);
    ctx.rotate(angle);
    ctx.fillText(text, 0, 0);
  }

  ctx.restore();
}

/**
 * Resolves dynamic metadata / EXIF token strings for an image.
 * Supported tokens:
 * - {name}, {filename}: Original or sanitized filename
 * - {basename}: Filename without extension
 * - {ext}: File extension without dot
 * - {index}: 1-based index (supports {index:02}, {index:03}, {index:04}, etc.)
 * - {camera}: Camera Make + Model (deduplicated)
 * - {lens}: Lens model name
 * - {focal}: Focal length (e.g. 50mm)
 * - {fstop}, {aperture}: F-number / aperture (e.g. f/1.8)
 * - {shutter}, {exposure}: Shutter / exposure time (e.g. 1/500s)
 * - {iso}: ISO sensitivity (e.g. 100)
 * - {date}: Capture date formatted as YYYY-MM-DD
 * - {rating}: Star rating (e.g. ★★★★★)
 * - {customlabel}, {custom}: Custom user-defined label
 */
export function resolveMetadataTokens(
  template: string,
  image: ImageItem,
  index = 1
): string {
  if (!template || !image) return '';

  const exif = image.exif || {};

  // 1. Camera string normalization
  let cameraStr = '';
  const make = (exif.cameraMake || '').trim();
  const model = (exif.cameraModel || '').trim();
  if (make && model) {
    if (model.toLowerCase().startsWith(make.toLowerCase())) {
      cameraStr = model;
    } else {
      cameraStr = `${make} ${model}`;
    }
  } else {
    cameraStr = model || make || '';
  }

  // 2. Focal length
  let focalStr = (exif.focalLength || '').trim();
  if (focalStr && /^\d+(\.\d+)?$/.test(focalStr)) {
    focalStr = `${focalStr}mm`;
  }

  // 3. F-number / aperture
  let fstopStr = (exif.fNumber || '').trim();
  if (fstopStr && /^\d+(\.\d+)?$/.test(fstopStr)) {
    fstopStr = `f/${fstopStr}`;
  }

  // 4. Exposure / shutter speed
  const shutterStr = (exif.exposureTime || '').trim();

  // 5. ISO
  const isoStr = exif.iso ? String(exif.iso) : '';

  // 6. Lens model
  const lensStr = (exif.lensModel || '').trim();

  // 7. Date formatting (YYYY-MM-DD)
  let dateStr = '';
  if (exif.captureDate) {
    try {
      const d = new Date(exif.captureDate);
      if (!isNaN(d.getTime())) {
        dateStr = d.toISOString().slice(0, 10);
      }
    } catch {
      // fallback
    }
  }
  if (!dateStr && exif.dateTimeOriginal) {
    const match = exif.dateTimeOriginal.match(/^(\d{4})[:\-](\d{2})[:\-](\d{2})/);
    if (match) {
      dateStr = `${match[1]}-${match[2]}-${match[3]}`;
    } else {
      dateStr = exif.dateTimeOriginal.split(' ')[0] || '';
    }
  }
  if (!dateStr && image.lastModified) {
    try {
      dateStr = new Date(image.lastModified).toISOString().slice(0, 10);
    } catch {
      // fallback
    }
  }

  // 8. Filename components
  const rawName = image.sanitizedName || image.name || '';
  const extMatch = rawName.match(/\.([^./\\]+)$/);
  const extStr = extMatch ? extMatch[1] : '';
  const basenameStr = extMatch ? rawName.slice(0, -extMatch[0].length) : rawName;

  // 9. Star rating
  const ratingVal = image.rating ?? exif.rating;
  const ratingStr = ratingVal && ratingVal > 0 ? '★'.repeat(Math.min(5, Math.max(1, Math.round(ratingVal)))) : '';

  // 10. Custom label
  const customStr = (image.customLabel || '').trim();

  const tokenMap: Record<string, string> = {
    name: rawName,
    filename: rawName,
    basename: basenameStr,
    ext: extStr,
    camera: cameraStr,
    lens: lensStr,
    focal: focalStr,
    fstop: fstopStr,
    aperture: fstopStr,
    shutter: shutterStr,
    exposure: shutterStr,
    iso: isoStr,
    date: dateStr,
    rating: ratingStr,
    customlabel: customStr,
    custom: customStr,
  };

  // Replace tokens including padded index
  let result = template.replace(/\{([a-zA-Z0-9_:]+)\}/g, (match, rawKey: string) => {
    const lowerKey = rawKey.toLowerCase();
    if (lowerKey === 'index' || lowerKey.startsWith('index:')) {
      const parts = rawKey.split(':');
      if (parts.length > 1) {
        const padSpec = parts[1];
        const padWidth = parseInt(padSpec, 10);
        if (Number.isFinite(padWidth) && padWidth > 0) {
          return String(index).padStart(padWidth, '0');
        }
      }
      return String(index);
    }

    if (lowerKey in tokenMap) {
      return tokenMap[lowerKey];
    }

    return match;
  });

  // Clean up dangling labels / prefixes when EXIF values are absent
  result = result.replace(/\bISO\b(?!\s*\d)/gi, '');
  result = result.replace(/\bf\/(?!\s*\d)/gi, '');

  // Normalize repeated spaces
  result = result.replace(/[ \t]+/g, ' ');

  // Remove redundant consecutive separators
  result = result.replace(/(?:[ \t]*[·|•,\-/][ \t]*){2,}/g, ' · ');

  // Trim leading/trailing separators and whitespace
  result = result.replace(/^[ \t·|•,\-/]+|[ \t·|•,\-/]+$/g, '').trim();

  return result;
}

/**
 * Draws the dynamic EXIF / metadata badge on a photo cell.
 * Supports plain-text (with drop-shadow), dark-pill, and subtle-badge styles.
 * Clips text to cell width and scales font and padding with `scale`.
 */
function drawExifBadge(
  ctx: CanvasRenderingContext2D,
  cell: { x: number; y: number; width: number; height: number; image?: ImageItem; indexNumber?: number; label?: string },
  config: LayoutConfig,
  scale = 1,
  index = 1
) {
  if (!config.showExifOverlay || !cell.image) return;

  const template = config.exifTokenTemplate || '{basename} · {focal} {fstop} {shutter} ISO {iso}';
  const text = resolveMetadataTokens(template, cell.image, cell.indexNumber ?? index);
  if (!text) return;

  const style = config.exifBadgeStyle || 'plain-text';
  const fontSize = Math.max(7, Math.min(config.fontSize * scale * 0.85, cell.height * 0.14, 12 * scale));

  ctx.save();
  ctx.font = `500 ${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;

  const isPill = style === 'dark-pill' || style === 'subtle-badge';
  const padX = isPill ? Math.max(5 * scale, 7 * scale) : 0;
  const padY = isPill ? Math.max(2 * scale, 3.5 * scale) : 0;

  // Clip text to cell width minus margins
  const maxBadgeWidth = Math.max(20, cell.width - 12 * scale);
  const maxTextWidth = Math.max(10, maxBadgeWidth - padX * 2);

  const displayText = truncateToWidth(ctx, text, maxTextWidth);
  const textMetrics = ctx.measureText(displayText);
  const textWidth = textMetrics.width;

  const badgeWidth = textWidth + padX * 2;
  const badgeHeight = fontSize + padY * 2;

  const bottomMargin = 6 * scale;
  let badgeY = cell.y + cell.height - badgeHeight - bottomMargin;

  // If overlay label is drawn at the bottom, shift badge above it
  if (config.showLabels && config.labelPosition === 'overlay' && cell.label) {
    const labelBandHeight = Math.min(cell.height, (Math.max(6, config.fontSize * scale)) * 2.2);
    badgeY = cell.y + cell.height - labelBandHeight - badgeHeight - 3 * scale;
  }

  const badgeX = cell.x + (cell.width - badgeWidth) / 2;

  if (style === 'dark-pill') {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    traceRoundedRect(ctx, badgeX, badgeY, badgeWidth, badgeHeight, badgeHeight / 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
    ctx.lineWidth = Math.max(1, scale);
    ctx.stroke();

    ctx.fillStyle = '#f9fafb';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(displayText, badgeX + badgeWidth / 2, badgeY + badgeHeight / 2);
  } else if (style === 'subtle-badge') {
    ctx.fillStyle = 'rgba(24, 24, 27, 0.5)';
    traceRoundedRect(ctx, badgeX, badgeY, badgeWidth, badgeHeight, 4 * scale);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
    ctx.lineWidth = Math.max(1, scale);
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(displayText, badgeX + badgeWidth / 2, badgeY + badgeHeight / 2);
  } else {
    // plain-text
    ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
    ctx.shadowBlur = 3 * scale;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 1 * scale;

    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(displayText, badgeX + badgeWidth / 2, badgeY + badgeHeight / 2);
  }

  ctx.restore();
}


