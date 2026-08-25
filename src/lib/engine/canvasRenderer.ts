import type { PageLayoutResult, CollageLayoutResult, LayoutConfig, ReviewStatus } from '../types';

// In-memory cache for loaded Image elements to prevent repeated DOM Image instantiation
const imageElementCache = new Map<string, HTMLImageElement>();

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

  // 1. Draw Workspace Background
  ctx.fillStyle = config.bg || '#141417';
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

    if (imgEl && imgEl.naturalWidth > 0) {
      drawImageWithFit(ctx, imgEl, cell.x, cell.y, cell.width, cell.height, config.fit);
    } else {
      // Placeholder if image failed to load
      ctx.fillStyle = '#27272a';
      ctx.fillRect(cell.x, cell.y, cell.width, cell.height);
    }

    // Selected highlight outline (workspace only, not in final export)
    if (isSelected && !isExport) {
      ctx.save();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.strokeRect(cell.x - 1, cell.y - 1, cell.width + 2, cell.height + 2);
      ctx.restore();
    }

    // Status Badges (Keep / Flag / Reject)
    if (config.showStatusBadges && cell.status !== 'unreviewed') {
      drawStatusBadge(ctx, cell.x, cell.y, cell.width, cell.status);
    }

    // Text Label below image
    if (cell.label && config.showLabels) {
      drawCellLabel(
        ctx, 
        cell.label, 
        cell.x + cell.width / 2, 
        cell.y + cell.height + 14, 
        cell.width, 
        config.textColor, 
        config.fontSize
      );
    }
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
  ctx.fillStyle = config.bg || '#141417';
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

    if (imgEl && imgEl.naturalWidth > 0) {
      drawImageWithFit(ctx, imgEl, cell.x, cell.y, cell.width, cell.height, cell.fit);
    } else {
      // Empty cell placeholder
      ctx.fillStyle = '#1e1e24';
      ctx.fillRect(cell.x, cell.y, cell.width, cell.height);
      ctx.strokeStyle = '#2e2e38';
      ctx.lineWidth = 1;
      ctx.strokeRect(cell.x, cell.y, cell.width, cell.height);

      if (!isExport) {
        ctx.fillStyle = '#71717a';
        ctx.font = '13px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`Drop Photo ${i + 1}`, cell.x + cell.width / 2, cell.y + cell.height / 2);
      }
    }

    if (isSelected && !isExport) {
      ctx.save();
      ctx.strokeStyle = '#f59e0b';
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
    // contain
    ctx.drawImage(img, 0, 0, imgW, imgH, x, y, w, h);
  }
}

function drawStatusBadge(
  ctx: CanvasRenderingContext2D,
  cellX: number,
  cellY: number,
  cellW: number,
  status: ReviewStatus
) {
  const badgeSize = 20;
  const badgeX = cellX + cellW - badgeSize - 6;
  const badgeY = cellY + 6;

  ctx.save();
  ctx.beginPath();
  ctx.arc(badgeX + badgeSize / 2, badgeY + badgeSize / 2, badgeSize / 2, 0, Math.PI * 2);

  if (status === 'keep') {
    ctx.fillStyle = '#10b981';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(badgeX + 6, badgeY + 10);
    ctx.lineTo(badgeX + 9, badgeY + 14);
    ctx.lineTo(badgeX + 15, badgeY + 6);
    ctx.stroke();
  } else if (status === 'flag') {
    ctx.fillStyle = '#f59e0b';
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('★', badgeX + badgeSize / 2, badgeY + badgeSize / 2 + 1);
  } else if (status === 'reject') {
    ctx.fillStyle = '#f43f5e';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(badgeX + 6, badgeY + 6);
    ctx.lineTo(badgeX + 14, badgeY + 14);
    ctx.moveTo(badgeX + 14, badgeY + 6);
    ctx.lineTo(badgeX + 6, badgeY + 14);
    ctx.stroke();
  }
  ctx.restore();
}

function drawCellLabel(
  ctx: CanvasRenderingContext2D,
  text: string,
  centerX: number,
  baselineY: number,
  maxWidth: number,
  color = '#f4f4f5',
  fontSize = 11
) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.font = `500 ${fontSize}px system-ui, -apple-system, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';

  // Truncate text if wider than available cell width
  let displayString = text;
  if (ctx.measureText(displayString).width > maxWidth - 8) {
    while (displayString.length > 3 && ctx.measureText(displayString + '…').width > maxWidth - 8) {
      displayString = displayString.slice(0, -1);
    }
    displayString += '…';
  }

  ctx.fillText(displayString, centerX, baselineY);
  ctx.restore();
}
