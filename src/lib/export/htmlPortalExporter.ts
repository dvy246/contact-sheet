import type { ImageItem, LayoutConfig, ReviewStatus, ImageExifData } from '../types';

export interface PortalImagePayload {
  id: string;
  name: string;
  sanitizedName: string;
  size: number;
  width: number;
  height: number;
  aspectRatio: number;
  status: ReviewStatus;
  order: number;
  rating?: number;
  notes?: string;
  customLabel?: string;
  thumbnailDataUrl: string;
  exif?: ImageExifData;
}

/**
 * Converts ImageItem instances to lightweight portal items with base64 data URLs.
 * Processes in progressive batches to maintain high frame rate and prevent UI freezes.
 */
async function convertImagesForPortal(
  images: ImageItem[],
  onProgress?: (loaded: number, total: number) => void
): Promise<PortalImagePayload[]> {
  const total = images.length;
  const results: PortalImagePayload[] = [];
  const BATCH_SIZE = 6;

  for (let i = 0; i < total; i += BATCH_SIZE) {
    const batch = images.slice(i, i + BATCH_SIZE);
    const batchPromises = batch.map(async (img, batchIdx) => {
      const idx = i + batchIdx;
      const dataUrl = await convertThumbnailToDataUrl(img.thumbnailUrl || img.previewUrl);
      const payload: PortalImagePayload = {
        id: img.id || `img_${idx}`,
        name: img.name,
        sanitizedName: img.sanitizedName,
        size: img.size,
        width: img.width,
        height: img.height,
        aspectRatio: img.aspectRatio || (img.width / (img.height || 1)),
        status: img.status || 'unreviewed',
        order: typeof img.order === 'number' ? img.order : idx,
        rating: img.rating,
        notes: img.notes || img.note,
        customLabel: img.customLabel,
        thumbnailDataUrl: dataUrl,
        exif: img.exif,
      };
      return payload;
    });

    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);

    if (onProgress) {
      onProgress(results.length, total);
    }

    if (i + BATCH_SIZE < total) {
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  }

  return results;
}

/**
 * Converts a blob URL, object URL, or image source into a compressed JPEG base64 data URL bounded to 480px.
 */
async function convertThumbnailToDataUrl(src: string, maxDim = 480, quality = 0.82): Promise<string> {
  if (!src) return '';
  if (src.startsWith('data:image/jpeg;base64,') && src.length < 150000) {
    return src;
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        let w = img.naturalWidth || img.width || 400;
        let h = img.naturalHeight || img.height || 300;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.max(1, Math.round((maxDim / w) * h));
            w = maxDim;
          } else {
            w = Math.max(1, Math.round((maxDim / h) * w));
            h = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'medium';
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/jpeg', quality));
        } else {
          resolve(src.startsWith('data:') ? src : '');
        }
      } catch {
        resolve(src.startsWith('data:') ? src : '');
      }
    };
    img.onerror = () => {
      if (src.startsWith('blob:')) {
        fetch(src)
          .then((res) => res.blob())
          .then((blob) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(typeof reader.result === 'string' ? reader.result : '');
            reader.onerror = () => resolve('');
            reader.readAsDataURL(blob);
          })
          .catch(() => resolve(''));
      } else {
        resolve(src.startsWith('data:') ? src : '');
      }
    };
    img.src = src;
  });
}

/**
 * Escapes characters for safe embedding inside script/HTML strings.
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Generates the complete, self-contained single-file HTML document for the client proofing portal.
 */
export function generateClientProofingPortalHtml(
  images: PortalImagePayload[],
  config: LayoutConfig,
  title = 'Photo Review & Selection Gallery'
): string {
  const projectTitle = config.headerText?.trim() || title;
  const projectPayloadJson = JSON.stringify({
    title: projectTitle,
    createdAt: new Date().toISOString(),
    config: {
      ...config,
      watermarkImageUrl: undefined, // Strip local blob URLs to keep payload clean
    },
    images,
  }).replace(/</g, '\\u003c'); // Prevent XSS or script tag breakout

  const safeBrandColor = (config.customBrandColor || '#3b82f6').replace(/[^a-zA-Z0-9#,.\(\)\s%-]/g, '');

  return `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${escapeHtml(projectTitle)} - Make Contact Sheet Proofing Portal</title>
  <style>
    :root {
      --portal-accent: ${safeBrandColor};
      --bg-main: #09090b;
      --bg-surface: #121215;
      --bg-card: #18181b;
      --bg-card-hover: #202025;
      --border-subtle: #27272a;
      --border-strong: #3f3f46;
      --text-main: #f4f4f5;
      --text-muted: #a1a1aa;
      --text-dim: #71717a;
      --accent: var(--portal-accent);
      --accent-hover: var(--portal-accent);
      --color-keep: #10b981;
      --color-keep-bg: rgba(16, 185, 129, 0.15);
      --color-flag: #f59e0b;
      --color-flag-bg: rgba(245, 158, 11, 0.15);
      --color-reject: #ef4444;
      --color-reject-bg: rgba(239, 68, 68, 0.15);
      --font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }

    html.light {
      --bg-main: #f8fafc;
      --bg-surface: #ffffff;
      --bg-card: #ffffff;
      --bg-card-hover: #f1f5f9;
      --border-subtle: #e2e8f0;
      --border-strong: #cbd5e1;
      --text-main: #0f172a;
      --text-muted: #64748b;
      --text-dim: #94a3b8;
      --accent: var(--portal-accent);
      --accent-hover: var(--portal-accent);
      --color-keep: #059669;
      --color-keep-bg: rgba(5, 150, 105, 0.12);
      --color-flag: #d97706;
      --color-flag-bg: rgba(217, 119, 6, 0.12);
      --color-reject: #dc2626;
      --color-reject-bg: rgba(220, 38, 38, 0.12);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: var(--font-family);
      background-color: var(--bg-main);
      color: var(--text-main);
      line-height: 1.5;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      -webkit-font-smoothing: antialiased;
    }

    /* Header */
    header {
      position: sticky;
      top: 0;
      z-index: 40;
      background: var(--bg-surface);
      border-bottom: 1px solid var(--border-subtle);
      backdrop-filter: blur(12px);
      padding: 12px 20px;
    }
    .header-inner {
      max-width: 1600px;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
    .brand-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .brand-icon {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: linear-gradient(135deg, #3b82f6, #6366f1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
      flex-shrink: 0;
    }
    .brand-title {
      font-size: 15px;
      font-weight: 700;
      letter-spacing: -0.02em;
    }
    .brand-subtitle {
      font-size: 12px;
      color: var(--text-muted);
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .search-box {
      position: relative;
      width: 220px;
    }
    .search-input {
      width: 100%;
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: 8px;
      padding: 7px 12px 7px 32px;
      font-size: 12px;
      color: var(--text-main);
      outline: none;
      transition: border-color 0.2s;
    }
    .search-input:focus {
      border-color: var(--accent);
    }
    .search-icon {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
      pointer-events: none;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 7px 14px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      border: 1px solid var(--border-subtle);
      background: var(--bg-card);
      color: var(--text-main);
      transition: all 0.15s ease;
      user-select: none;
    }
    .btn:hover {
      background: var(--bg-card-hover);
      border-color: var(--border-strong);
    }
    .btn-primary {
      background: var(--accent);
      border-color: var(--accent);
      color: #ffffff;
      box-shadow: 0 2px 8px rgba(59, 130, 246, 0.25);
    }
    .btn-primary:hover {
      background: var(--accent-hover);
      border-color: var(--accent-hover);
    }
    .btn-icon {
      padding: 7px;
    }

    /* Subheader & Filter Bar */
    .filter-bar {
      background: var(--bg-surface);
      border-bottom: 1px solid var(--border-subtle);
      padding: 10px 20px;
    }
    .filter-bar-inner {
      max-width: 1600px;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .filter-tabs {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }
    .tab-btn {
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 500;
      background: transparent;
      border: 1px solid transparent;
      color: var(--text-muted);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s;
    }
    .tab-btn:hover {
      background: var(--bg-card-hover);
      color: var(--text-main);
    }
    .tab-btn.active {
      background: var(--bg-card);
      border-color: var(--border-subtle);
      color: var(--text-main);
      font-weight: 600;
      box-shadow: 0 1px 4px rgba(0,0,0,0.1);
    }
    .tab-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: 700;
      padding: 1px 6px;
      border-radius: 10px;
      background: var(--border-subtle);
      color: var(--text-muted);
    }
    .tab-btn.active .tab-badge {
      background: var(--border-strong);
      color: var(--text-main);
    }
    .tab-btn.active[data-filter="keep"] { border-color: var(--color-keep); color: var(--color-keep); }
    .tab-btn.active[data-filter="keep"] .tab-badge { background: var(--color-keep-bg); color: var(--color-keep); }
    .tab-btn.active[data-filter="flag"] { border-color: var(--color-flag); color: var(--color-flag); }
    .tab-btn.active[data-filter="flag"] .tab-badge { background: var(--color-flag-bg); color: var(--color-flag); }
    .tab-btn.active[data-filter="reject"] { border-color: var(--color-reject); color: var(--color-reject); }
    .tab-btn.active[data-filter="reject"] .tab-badge { background: var(--color-reject-bg); color: var(--color-reject); }

    .density-controls {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    /* Gallery Grid */
    main {
      flex: 1;
      max-width: 1600px;
      width: 100%;
      margin: 0 auto;
      padding: 24px 20px 80px;
    }
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 18px;
    }
    .gallery-grid.dense {
      grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
      gap: 12px;
    }
    .gallery-grid.spacious {
      grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
      gap: 24px;
    }

    /* Photo Card */
    .photo-card {
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
      position: relative;
    }
    .photo-card:hover {
      border-color: var(--border-strong);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    }
    .photo-card[data-status="keep"] {
      border-color: var(--color-keep);
      box-shadow: 0 0 0 1px var(--color-keep-bg);
    }
    .photo-card[data-status="flag"] {
      border-color: var(--color-flag);
      box-shadow: 0 0 0 1px var(--color-flag-bg);
    }
    .photo-card[data-status="reject"] {
      border-color: var(--color-reject);
      opacity: 0.65;
    }
    .photo-card[data-status="reject"]:hover {
      opacity: 0.95;
    }

    .thumb-wrapper {
      position: relative;
      width: 100%;
      padding-top: 66.66%;
      background: #000;
      cursor: pointer;
      overflow: hidden;
    }
    .thumb-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
      transition: transform 0.25s ease;
    }
    .photo-card:hover .thumb-img {
      transform: scale(1.03);
    }

    .card-badges {
      position: absolute;
      top: 8px;
      left: 8px;
      display: flex;
      gap: 6px;
      pointer-events: none;
    }
    .index-badge {
      background: rgba(0,0,0,0.65);
      backdrop-filter: blur(4px);
      color: #fff;
      font-size: 10px;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 6px;
    }
    .status-pill {
      font-size: 10px;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 6px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .status-pill.keep { background: var(--color-keep); color: #fff; }
    .status-pill.flag { background: var(--color-flag); color: #000; }
    .status-pill.reject { background: var(--color-reject); color: #fff; }

    .card-body {
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex: 1;
    }
    .card-header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    .photo-title {
      font-size: 12px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--text-main);
    }
    .photo-label {
      font-size: 11px;
      color: var(--accent);
      font-weight: 500;
    }

    /* Star rating */
    .star-rating {
      display: inline-flex;
      gap: 2px;
      color: var(--text-dim);
      cursor: pointer;
    }
    .star-rating svg {
      width: 14px;
      height: 14px;
      transition: color 0.1s, transform 0.1s;
    }
    .star-rating svg.active {
      color: #fbbf24;
      fill: #fbbf24;
    }
    .star-rating svg:hover {
      transform: scale(1.2);
    }

    /* Action Culling Bar */
    .card-actions {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 6px;
      margin-top: 4px;
    }
    .cull-btn {
      padding: 6px 4px;
      font-size: 11px;
      font-weight: 600;
      border-radius: 6px;
      border: 1px solid var(--border-subtle);
      background: var(--bg-surface);
      color: var(--text-muted);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      transition: all 0.15s;
    }
    .cull-btn:hover {
      background: var(--bg-card-hover);
      color: var(--text-main);
    }
    .cull-btn.active[data-action="keep"] {
      background: var(--color-keep);
      border-color: var(--color-keep);
      color: #fff;
    }
    .cull-btn.active[data-action="flag"] {
      background: var(--color-flag);
      border-color: var(--color-flag);
      color: #000;
    }
    .cull-btn.active[data-action="reject"] {
      background: var(--color-reject);
      border-color: var(--color-reject);
      color: #fff;
    }

    /* Note input */
    .note-input {
      width: 100%;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 6px;
      padding: 6px 8px;
      font-size: 11px;
      color: var(--text-main);
      outline: none;
      resize: none;
      height: 32px;
      transition: height 0.2s, border-color 0.2s;
    }
    .note-input:focus {
      height: 64px;
      border-color: var(--accent);
    }
    .note-input::placeholder {
      color: var(--text-dim);
    }

    /* Lightbox Modal */
    .lightbox-modal {
      position: fixed;
      inset: 0;
      z-index: 100;
      background: rgba(0, 0, 0, 0.92);
      backdrop-filter: blur(12px);
      display: none;
      flex-direction: column;
      opacity: 0;
      transition: opacity 0.2s ease;
    }
    .lightbox-modal.open {
      display: flex;
      opacity: 1;
    }
    .lb-header {
      padding: 12px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #fff;
      z-index: 10;
    }
    .lb-title {
      font-size: 14px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .lb-index {
      background: rgba(255,255,255,0.15);
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 11px;
    }
    .lb-stage {
      flex: 1;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      user-select: none;
    }
    .lb-image {
      max-width: 92vw;
      max-height: 72vh;
      object-fit: contain;
      transition: transform 0.2s ease;
      cursor: zoom-in;
      box-shadow: 0 12px 40px rgba(0,0,0,0.6);
      border-radius: 4px;
    }
    .lb-image.zoomed {
      cursor: grab;
      max-width: none;
      max-height: none;
    }
    .lb-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.15);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.15s;
    }
    .lb-nav:hover {
      background: rgba(255,255,255,0.25);
    }
    .lb-prev { left: 20px; }
    .lb-next { right: 20px; }

    .lb-controls {
      background: rgba(18, 18, 21, 0.95);
      border-top: 1px solid var(--border-subtle);
      padding: 14px 20px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      z-index: 10;
    }
    .lb-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .lb-cull-btn {
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      border: 1px solid var(--border-subtle);
      background: var(--bg-card);
      color: var(--text-main);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s;
    }
    .lb-cull-btn kbd {
      font-size: 10px;
      background: rgba(255,255,255,0.1);
      padding: 1px 5px;
      border-radius: 4px;
      opacity: 0.7;
    }
    .lb-cull-btn[data-action="keep"].active { background: var(--color-keep); border-color: var(--color-keep); color: #fff; }
    .lb-cull-btn[data-action="flag"].active { background: var(--color-flag); border-color: var(--color-flag); color: #000; }
    .lb-cull-btn[data-action="reject"].active { background: var(--color-reject); border-color: var(--color-reject); color: #fff; }

    .lb-meta {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
    }
    .lb-exif-chip {
      font-size: 11px;
      color: var(--text-muted);
      background: rgba(255,255,255,0.05);
      padding: 4px 10px;
      border-radius: 6px;
      border: 1px solid var(--border-subtle);
    }

    /* Export Modal */
    .modal-overlay {
      position: fixed;
      inset: 0;
      z-index: 110;
      background: rgba(0,0,0,0.8);
      backdrop-filter: blur(8px);
      display: none;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .modal-overlay.open {
      display: flex;
    }
    .modal-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 16px;
      width: 100%;
      max-width: 640px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.4);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .modal-header {
      padding: 16px 20px;
      border-bottom: 1px solid var(--border-subtle);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .modal-title {
      font-size: 16px;
      font-weight: 700;
    }
    .modal-body {
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      max-height: 75vh;
      overflow-y: auto;
    }
    .modal-tabs {
      display: flex;
      border-bottom: 1px solid var(--border-subtle);
      gap: 8px;
    }
    .modal-tab {
      padding: 8px 14px;
      font-size: 13px;
      font-weight: 600;
      color: var(--text-muted);
      cursor: pointer;
      border-bottom: 2px solid transparent;
      margin-bottom: -1px;
    }
    .modal-tab.active {
      color: var(--accent);
      border-bottom-color: var(--accent);
    }
    .modal-pane {
      display: none;
      flex-direction: column;
      gap: 14px;
    }
    .modal-pane.active {
      display: flex;
    }
    .textarea-box {
      width: 100%;
      background: var(--bg-main);
      border: 1px solid var(--border-subtle);
      border-radius: 8px;
      padding: 10px;
      font-family: ui-monospace, monospace;
      font-size: 11px;
      color: var(--text-main);
      resize: vertical;
      min-height: 120px;
    }

    /* Toast */
    .toast {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: #18181b;
      color: #fff;
      border: 1px solid #3f3f46;
      border-radius: 8px;
      padding: 10px 18px;
      font-size: 12px;
      font-weight: 600;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      z-index: 200;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s;
      opacity: 0;
      pointer-events: none;
    }
    .toast.show {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }

    @media (max-width: 640px) {
      .header-inner { flex-direction: column; align-items: stretch; }
      .search-box { width: 100%; }
      .gallery-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 10px; }
      .cull-btn span { display: none; }
      .lb-controls { flex-direction: column; align-items: stretch; }
    }
  </style>
</head>
<body>
  <!-- Header -->
  <header>
    <div class="header-inner">
      <div class="brand-group">
        ${config.customBrandLogo ? 
          `<img src="${escapeHtml(config.customBrandLogo)}" alt="Studio Logo" class="brand-icon" style="object-fit: cover; background: none; box-shadow: none; border-radius: 4px;" />` : 
          `<div class="brand-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
          </div>`
        }
        <div>
          <div class="brand-title">${escapeHtml(config.customBrandName || projectTitle)}</div>
          <div class="brand-subtitle" id="stats-summary">Loading photos...</div>
        </div>
      </div>

      <div class="header-actions">
        <div class="search-box">
          <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input type="text" id="search-input" class="search-input" placeholder="Search filenames or notes...">
        </div>

        <button id="theme-toggle" class="btn btn-icon" title="Toggle Light/Dark Theme">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
        </button>

        <button id="btn-open-export" class="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
          <span>Export Feedback</span>
        </button>
      </div>
    </div>
  </header>

  <!-- Filter & Density Toolbar -->
  <div class="filter-bar">
    <div class="filter-bar-inner">
      <div class="filter-tabs">
        <button class="tab-btn active" data-filter="all">All <span class="tab-badge" id="badge-all">0</span></button>
        <button class="tab-btn" data-filter="keep">Kept <span class="tab-badge" id="badge-keep">0</span></button>
        <button class="tab-btn" data-filter="flag">Flagged <span class="tab-badge" id="badge-flag">0</span></button>
        <button class="tab-btn" data-filter="reject">Rejected <span class="tab-badge" id="badge-reject">0</span></button>
        <button class="tab-btn" data-filter="unreviewed">Unreviewed <span class="tab-badge" id="badge-unreviewed">0</span></button>
      </div>

      <div class="density-controls">
        <button class="btn btn-icon" id="density-dense" title="Compact Grid">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        </button>
        <button class="btn btn-icon" id="density-normal" title="Normal Grid">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
        </button>
      </div>
    </div>
  </div>

  <!-- Main Grid -->
  <main>
    <div id="gallery-grid" class="gallery-grid"></div>
  </main>

  <!-- Lightbox Modal -->
  <div id="lightbox-modal" class="lightbox-modal">
    <div class="lb-header">
      <div class="lb-title">
        <span id="lb-filename">Photo Name</span>
        <span class="lb-index" id="lb-index">1 / 1</span>
      </div>
      <div style="display:flex; gap: 8px;">
        <button id="lb-btn-zoom" class="btn btn-icon" title="Toggle Zoom (Z)">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
        </button>
        <button id="lb-btn-close" class="btn btn-icon" title="Close (Esc)">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>

    <div class="lb-stage" id="lb-stage">
      <button class="lb-nav lb-prev" id="lb-prev" title="Previous (Left Arrow)">‹</button>
      <img id="lb-img" class="lb-image" src="" alt="Proof Preview">
      <button class="lb-nav lb-next" id="lb-next" title="Next (Right Arrow)">›</button>
    </div>

    <div class="lb-controls">
      <div class="lb-actions">
        <button class="lb-cull-btn" data-action="keep">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <span>Keep</span>
          <kbd>1</kbd>
        </button>
        <button class="lb-cull-btn" data-action="flag">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
          <span>Flag</span>
          <kbd>2</kbd>
        </button>
        <button class="lb-cull-btn" data-action="reject">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          <span>Reject</span>
          <kbd>3</kbd>
        </button>
        <button class="lb-cull-btn" data-action="unreviewed" title="Clear status">
          <span>Clear</span>
          <kbd>0</kbd>
        </button>
      </div>

      <div class="lb-meta">
        <div class="star-rating" id="lb-stars">
          <svg data-val="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <svg data-val="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <svg data-val="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <svg data-val="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <svg data-val="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </div>
        <div id="lb-exif" class="lb-exif-chip">No EXIF</div>
      </div>
    </div>
  </div>

  <!-- Export Feedback Modal -->
  <div id="export-modal" class="modal-overlay">
    <div class="modal-card">
      <div class="modal-header">
        <div class="modal-title">Export Client Selections & Feedback</div>
        <button id="modal-close" class="btn btn-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <div class="modal-body">
        <div class="modal-tabs">
          <div class="modal-tab active" data-tab="manifest">Review Manifest (.json)</div>
          <div class="modal-tab" data-tab="filenames">Copy Filenames</div>
          <div class="modal-tab" data-tab="summary">Notes Summary</div>
        </div>

        <!-- Manifest Tab -->
        <div class="modal-pane active" id="pane-manifest">
          <p style="font-size: 12px; color: var(--text-muted);">
            Download this review manifest to send back to your photographer. It contains all your selections, ratings, and retouch notes, and syncs instantly when dropped into MakeContactSheet.com.
          </p>
          <div style="background: var(--bg-card); padding: 14px; border-radius: 8px; border: 1px solid var(--border-subtle); display: flex; flex-direction: column; gap: 8px;">
            <div style="font-size: 13px; font-weight: 600;" id="manifest-summary-text">Ready to export selections</div>
            <div style="font-size: 11px; color: var(--text-dim);">Format: .makecontactsheet.json (Standard Review Format)</div>
          </div>
          <button id="btn-download-manifest" class="btn btn-primary" style="height: 38px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
            <span>Download Feedback Manifest (.json)</span>
          </button>
        </div>

        <!-- Filenames Tab -->
        <div class="modal-pane" id="pane-filenames">
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <select id="filename-scope" class="search-input" style="width: auto; flex: 1;">
              <option value="keep">Kept Only</option>
              <option value="keep-flag">Kept + Flagged</option>
              <option value="all">All Photos</option>
            </select>
            <select id="filename-format" class="search-input" style="width: auto; flex: 1;">
              <option value="comma">Comma-separated (Lightroom search)</option>
              <option value="newline">Line-by-line</option>
              <option value="space">Space-separated</option>
            </select>
          </div>
          <textarea id="filename-output" class="textarea-box" readonly></textarea>
          <button id="btn-copy-filenames" class="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <span>Copy to Clipboard</span>
          </button>
        </div>

        <!-- Summary Tab -->
        <div class="modal-pane" id="pane-summary">
          <p style="font-size: 12px; color: var(--text-muted);">
            Formatted text report including notes and star ratings ready to paste into an email or chat.
          </p>
          <textarea id="summary-output" class="textarea-box" readonly style="min-height: 160px;"></textarea>
          <button id="btn-copy-summary" class="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <span>Copy Summary Report</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Toast -->
  <div id="toast" class="toast">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
    <span id="toast-msg">Action completed</span>
  </div>

  <!-- Initial Portal Data -->
  <script id="portal-data" type="application/json">${projectPayloadJson}</script>

  <!-- Interactive Portal Client Application -->
  <script>
    (function() {
      // 1. Data Initialization & Storage Relinking
      const rawDataEl = document.getElementById('portal-data');
      let portalData = { images: [], config: {}, title: 'Proofing Gallery' };
      try {
        portalData = JSON.parse(rawDataEl ? rawDataEl.textContent : '{}');
      } catch (e) {
        console.error('Failed to parse portal data', e);
      }

      let images = portalData.images || [];
      const config = portalData.config || {};
      const projectKey = 'mcs_portal_' + (portalData.title || 'gallery') + '_' + images.length;

      // Restore stored edits if client previously saved ratings/notes
      try {
        const storedEdits = localStorage.getItem(projectKey);
        if (storedEdits) {
          const parsed = JSON.parse(storedEdits);
          if (Array.isArray(parsed)) {
            const editMap = new Map();
            parsed.forEach(p => editMap.set(p.name, p));
            images.forEach(img => {
              const edit = editMap.get(img.name);
              if (edit) {
                if (edit.status) img.status = edit.status;
                if (typeof edit.rating === 'number') img.rating = edit.rating;
                if (typeof edit.notes === 'string') img.notes = edit.notes;
              }
            });
          }
        }
      } catch (e) {}

      function persistEdits() {
        try {
          const toStore = images.map(img => ({
            name: img.name,
            status: img.status,
            rating: img.rating,
            notes: img.notes
          }));
          localStorage.setItem(projectKey, JSON.stringify(toStore));
        } catch (e) {}
      }

      // 2. State & Variables
      let currentFilter = 'all';
      let searchQuery = '';
      let currentLbIndex = 0;
      let activeFilteredImages = [...images];

      // Elements
      const gridEl = document.getElementById('gallery-grid');
      const searchInput = document.getElementById('search-input');
      const statsSummary = document.getElementById('stats-summary');
      const toastEl = document.getElementById('toast');
      const toastMsg = document.getElementById('toast-msg');

      function showToast(msg) {
        toastMsg.textContent = msg;
        toastEl.classList.add('show');
        setTimeout(() => toastEl.classList.remove('show'), 2500);
      }

      // 3. Render Functions
      function updateCounts() {
        let keep = 0, flag = 0, reject = 0, unreviewed = 0;
        images.forEach(img => {
          if (img.status === 'keep') keep++;
          else if (img.status === 'flag') flag++;
          else if (img.status === 'reject') reject++;
          else unreviewed++;
        });

        document.getElementById('badge-all').textContent = images.length;
        document.getElementById('badge-keep').textContent = keep;
        document.getElementById('badge-flag').textContent = flag;
        document.getElementById('badge-reject').textContent = reject;
        document.getElementById('badge-unreviewed').textContent = unreviewed;

        statsSummary.textContent = \`\${images.length} Photos • \${keep} Kept • \${flag} Flagged • \${reject} Rejected • \${unreviewed} Pending\`;
      }

      function filterImages() {
        activeFilteredImages = images.filter(img => {
          const matchesFilter = 
            currentFilter === 'all' ? true :
            currentFilter === 'keep' ? img.status === 'keep' :
            currentFilter === 'flag' ? img.status === 'flag' :
            currentFilter === 'reject' ? img.status === 'reject' :
            img.status === 'unreviewed' || !img.status;

          if (!matchesFilter) return false;

          if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const nameMatch = img.name.toLowerCase().includes(query);
            const labelMatch = img.customLabel && img.customLabel.toLowerCase().includes(query);
            const notesMatch = img.notes && img.notes.toLowerCase().includes(query);
            return nameMatch || labelMatch || notesMatch;
          }
          return true;
        });
      }

      function renderGrid() {
        filterImages();
        updateCounts();

        if (activeFilteredImages.length === 0) {
          gridEl.innerHTML = \`
            <div style="grid-column: 1 / -1; padding: 60px 20px; text-align: center; color: var(--text-muted);">
              <div style="font-size: 14px; font-weight: 600; margin-bottom: 4px;">No photos match the current filter</div>
              <div style="font-size: 12px;">Try switching tabs or clearing your search term.</div>
            </div>
          \`;
          return;
        }

        gridEl.innerHTML = activeFilteredImages.map((img, idx) => {
          const globalIdx = images.indexOf(img);
          const status = img.status || 'unreviewed';
          const starsHtml = [1, 2, 3, 4, 5].map(v => \`
            <svg data-val="\${v}" class="\${(img.rating || 0) >= v ? 'active' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          \`).join('');

          let statusBadge = '';
          if (status === 'keep') statusBadge = '<span class="status-pill keep">Kept</span>';
          else if (status === 'flag') statusBadge = '<span class="status-pill flag">Flagged</span>';
          else if (status === 'reject') statusBadge = '<span class="status-pill reject">Rejected</span>';

          return \`
            <div class="photo-card" data-idx="\${globalIdx}" data-status="\${status}">
              <div class="thumb-wrapper" onclick="window.openLightbox(\${globalIdx})">
                <img class="thumb-img" src="\${img.thumbnailDataUrl || ''}" alt="\${img.name}" loading="lazy">
                <div class="card-badges">
                  <span class="index-badge">#\${globalIdx + 1}</span>
                  \${statusBadge}
                </div>
              </div>
              <div class="card-body">
                <div class="card-header-row">
                  <div class="photo-title" title="\${img.name}">\${img.customLabel || img.name}</div>
                  <div class="star-rating" data-idx="\${globalIdx}">\${starsHtml}</div>
                </div>

                <div class="card-actions">
                  <button class="cull-btn \${status === 'keep' ? 'active' : ''}" data-action="keep" data-idx="\${globalIdx}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>Keep</span>
                  </button>
                  <button class="cull-btn \${status === 'flag' ? 'active' : ''}" data-action="flag" data-idx="\${globalIdx}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
                    <span>Flag</span>
                  </button>
                  <button class="cull-btn \${status === 'reject' ? 'active' : ''}" data-action="reject" data-idx="\${globalIdx}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    <span>Reject</span>
                  </button>
                </div>

                <textarea class="note-input" data-idx="\${globalIdx}" placeholder="Add feedback or retouch notes...">\${img.notes || ''}</textarea>
              </div>
            </div>
          \`;
        }).join('');

        attachCardEvents();
      }

      function attachCardEvents() {
        // Star clicks
        gridEl.querySelectorAll('.star-rating svg').forEach(star => {
          star.addEventListener('click', (e) => {
            e.stopPropagation();
            const parent = star.parentElement;
            const idx = parseInt(parent.getAttribute('data-idx') || '0', 10);
            const val = parseInt(star.getAttribute('data-val') || '0', 10);
            images[idx].rating = images[idx].rating === val ? 0 : val;
            persistEdits();
            renderGrid();
          });
        });

        // Cull buttons
        gridEl.querySelectorAll('.cull-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const idx = parseInt(btn.getAttribute('data-idx') || '0', 10);
            const action = btn.getAttribute('data-action');
            if (images[idx].status === action) {
              images[idx].status = 'unreviewed';
            } else {
              images[idx].status = action;
            }
            persistEdits();
            renderGrid();
          });
        });

        // Note change
        gridEl.querySelectorAll('.note-input').forEach(inp => {
          inp.addEventListener('input', (e) => {
            const idx = parseInt(inp.getAttribute('data-idx') || '0', 10);
            images[idx].notes = inp.value;
            persistEdits();
          });
        });
      }

      // 4. Lightbox Implementation
      const lbModal = document.getElementById('lightbox-modal');
      const lbImg = document.getElementById('lb-img');
      const lbFilename = document.getElementById('lb-filename');
      const lbIndex = document.getElementById('lb-index');
      const lbExif = document.getElementById('lb-exif');
      const lbStars = document.getElementById('lb-stars');
      let isZoomed = false;

      window.openLightbox = function(idx) {
        currentLbIndex = idx;
        updateLightbox();
        lbModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      };

      function closeLightbox() {
        lbModal.classList.remove('open');
        document.body.style.overflow = '';
        if (isZoomed) toggleZoom();
        renderGrid();
      }

      function updateLightbox() {
        const img = images[currentLbIndex];
        if (!img) return;

        lbImg.src = img.thumbnailDataUrl || '';
        lbFilename.textContent = img.customLabel || img.name;
        lbIndex.textContent = \`\${currentLbIndex + 1} / \${images.length}\`;

        // Update EXIF
        if (img.exif && (img.exif.cameraModel || img.exif.focalLength || img.exif.fNumber || img.exif.iso)) {
          const parts = [];
          if (img.exif.cameraModel) parts.push(img.exif.cameraModel);
          if (img.exif.focalLength) parts.push(img.exif.focalLength);
          if (img.exif.fNumber) parts.push('f/' + img.exif.fNumber.replace(/^f\\/?/i, ''));
          if (img.exif.exposureTime) parts.push(img.exif.exposureTime + 's');
          if (img.exif.iso) parts.push('ISO ' + img.exif.iso);
          lbExif.textContent = parts.join(' • ');
          lbExif.style.display = 'block';
        } else {
          lbExif.style.display = 'none';
        }

        // Update status active buttons
        lbModal.querySelectorAll('.lb-cull-btn').forEach(btn => {
          const act = btn.getAttribute('data-action');
          if (act === img.status || (!img.status && act === 'unreviewed')) {
            btn.classList.add('active');
          } else {
            btn.classList.remove('active');
          }
        });

        // Update rating stars
        lbStars.querySelectorAll('svg').forEach(star => {
          const val = parseInt(star.getAttribute('data-val') || '0', 10);
          if ((img.rating || 0) >= val) {
            star.classList.add('active');
          } else {
            star.classList.remove('active');
          }
        });
      }

      function stepLightbox(dir) {
        currentLbIndex = (currentLbIndex + dir + images.length) % images.length;
        updateLightbox();
      }

      function toggleZoom() {
        isZoomed = !isZoomed;
        if (isZoomed) {
          lbImg.classList.add('zoomed');
          lbImg.style.transform = 'scale(2)';
        } else {
          lbImg.classList.remove('zoomed');
          lbImg.style.transform = 'scale(1)';
        }
      }

      // Lightbox Event Listeners
      document.getElementById('lb-btn-close').addEventListener('click', closeLightbox);
      document.getElementById('lb-prev').addEventListener('click', () => stepLightbox(-1));
      document.getElementById('lb-next').addEventListener('click', () => stepLightbox(1));
      document.getElementById('lb-btn-zoom').addEventListener('click', toggleZoom);
      lbImg.addEventListener('click', toggleZoom);

      lbModal.querySelectorAll('.lb-cull-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const act = btn.getAttribute('data-action');
          images[currentLbIndex].status = act === 'unreviewed' ? 'unreviewed' : act;
          persistEdits();
          updateLightbox();
        });
      });

      lbStars.querySelectorAll('svg').forEach(star => {
        star.addEventListener('click', () => {
          const val = parseInt(star.getAttribute('data-val') || '0', 10);
          images[currentLbIndex].rating = images[currentLbIndex].rating === val ? 0 : val;
          persistEdits();
          updateLightbox();
        });
      });

      // Keyboard Shortcuts
      window.addEventListener('keydown', (e) => {
        if (!lbModal.classList.contains('open')) return;
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
          stepLightbox(-1);
        } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
          stepLightbox(1);
        } else if (e.key === 'Escape') {
          closeLightbox();
        } else if (e.key === '1' || e.key === 'k' || e.key === 'K') {
          images[currentLbIndex].status = 'keep';
          persistEdits();
          updateLightbox();
        } else if (e.key === '2' || e.key === 'f' || e.key === 'F') {
          images[currentLbIndex].status = 'flag';
          persistEdits();
          updateLightbox();
        } else if (e.key === '3' || e.key === 'r' || e.key === 'R') {
          images[currentLbIndex].status = 'reject';
          persistEdits();
          updateLightbox();
        } else if (e.key === '0' || e.key === 'u' || e.key === 'U') {
          images[currentLbIndex].status = 'unreviewed';
          persistEdits();
          updateLightbox();
        } else if (e.key === 'z' || e.key === 'Z') {
          toggleZoom();
        }
      });

      // 5. Filter & Search Toolbar Listeners
      document.querySelectorAll('.filter-tabs .tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.filter-tabs .tab-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          currentFilter = btn.getAttribute('data-filter') || 'all';
          renderGrid();
        });
      });

      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderGrid();
      });

      document.getElementById('density-dense').addEventListener('click', () => {
        gridEl.className = 'gallery-grid dense';
      });
      document.getElementById('density-normal').addEventListener('click', () => {
        gridEl.className = 'gallery-grid';
      });

      // 6. Theme Toggle
      const themeBtn = document.getElementById('theme-toggle');
      themeBtn.addEventListener('click', () => {
        const isDark = document.documentElement.classList.contains('dark');
        if (isDark) {
          document.documentElement.classList.remove('dark');
          document.documentElement.classList.add('light');
          localStorage.setItem('mcs_theme', 'light');
        } else {
          document.documentElement.classList.remove('light');
          document.documentElement.classList.add('dark');
          localStorage.setItem('mcs_theme', 'dark');
        }
      });
      if (localStorage.getItem('mcs_theme') === 'light') {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }

      // 7. Export Modal Implementation
      const exportModal = document.getElementById('export-modal');
      const filenameScope = document.getElementById('filename-scope');
      const filenameFormat = document.getElementById('filename-format');
      const filenameOutput = document.getElementById('filename-output');
      const summaryOutput = document.getElementById('summary-output');

      function updateExportModalViews() {
        // Update manifest counts
        const kept = images.filter(i => i.status === 'keep').length;
        const flagged = images.filter(i => i.status === 'flag').length;
        const total = images.length;
        document.getElementById('manifest-summary-text').textContent = \`\${kept} Kept, \${flagged} Flagged of \${total} Total Photos\`;

        // Update filenames view
        const scope = filenameScope.value;
        const fmt = filenameFormat.value;
        let targets = images;
        if (scope === 'keep') targets = images.filter(i => i.status === 'keep');
        else if (scope === 'keep-flag') targets = images.filter(i => i.status === 'keep' || i.status === 'flag');

        const names = targets.map(i => i.name);
        if (fmt === 'comma') filenameOutput.value = names.join(', ');
        else if (fmt === 'newline') filenameOutput.value = names.join('\\n');
        else if (fmt === 'space') filenameOutput.value = names.map(n => n.includes(' ') ? \`"\${n}"\` : n).join(' ');

        // Update summary text
        const notesList = images.filter(i => i.notes && i.notes.trim()).map(i => \`- \${i.name} [\${i.status.toUpperCase()}]: \${i.notes}\`).join('\\n');
        summaryOutput.value = [
          \`Photo Review Summary - \${portalData.title || 'Client Proofing'}\`,
          \`Exported: \${new Date().toLocaleString()}\`,
          \`Total: \${total} | Kept: \${kept} | Flagged: \${flagged} | Rejected: \${images.filter(i => i.status === 'reject').length}\`,
          '',
          '--- SELECTED PHOTOS ---',
          targets.map(i => i.name).join('\\n'),
          '',
          '--- NOTES & RETOUCH INSTRUCTIONS ---',
          notesList || '(No specific photo notes provided)'
        ].join('\\n');
      }

      document.getElementById('btn-open-export').addEventListener('click', () => {
        updateExportModalViews();
        exportModal.classList.add('open');
      });

      document.getElementById('modal-close').addEventListener('click', () => {
        exportModal.classList.remove('open');
      });

      exportModal.querySelectorAll('.modal-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          exportModal.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
          exportModal.querySelectorAll('.modal-pane').forEach(p => p.classList.remove('active'));
          tab.classList.add('active');
          const tabId = tab.getAttribute('data-tab');
          document.getElementById('pane-' + tabId).classList.add('active');
        });
      });

      filenameScope.addEventListener('change', updateExportModalViews);
      filenameFormat.addEventListener('change', updateExportModalViews);

      // Download .makecontactsheet.json
      document.getElementById('btn-download-manifest').addEventListener('click', () => {
        const manifest = {
          version: '1.0.0',
          generator: 'Make Contact Sheet Proofing Portal',
          createdAt: new Date().toISOString(),
          mode: 'contact-sheet',
          layoutConfig: config,
          images: images.map((img, idx) => ({
            name: img.name,
            sanitizedName: img.sanitizedName,
            size: img.size,
            width: img.width,
            height: img.height,
            status: img.status || 'unreviewed',
            order: idx,
            rating: img.rating,
            notes: img.notes,
            customLabel: img.customLabel,
            exif: img.exif
          }))
        };

        const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = \`\${(portalData.title || 'client-review').toLowerCase().replace(/[^a-z0-9]+/g, '-')}.makecontactsheet.json\`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        showToast('Feedback manifest downloaded!');
      });

      // Copy buttons
      document.getElementById('btn-copy-filenames').addEventListener('click', () => {
        navigator.clipboard.writeText(filenameOutput.value).then(() => {
          showToast('Filenames copied to clipboard!');
        });
      });

      document.getElementById('btn-copy-summary').addEventListener('click', () => {
        navigator.clipboard.writeText(summaryOutput.value).then(() => {
          showToast('Summary report copied to clipboard!');
        });
      });

      // Initial execution
      renderGrid();
    })();
  </script>
    ${config.hideMadeWithBadge ? '' : `
  <div style="text-align: center; padding: 40px 20px; font-size: 13px; color: var(--text-muted);">
    Powered by <a href="https://makecontactsheet.com" target="_blank" rel="noopener noreferrer" style="color: var(--accent); text-decoration: none; font-weight: 500;">Make Contact Sheet</a>
  </div>
    `}
</body>
</html>`;
}

/**
 * Main export entry point: creates and triggers browser download of the standalone proofing portal.
 */
export async function exportClientProofingPortal(
  images: ImageItem[],
  config: LayoutConfig,
  customFilename = 'makecontactsheet-proofing-portal',
  onProgress?: (loaded: number, total: number) => void
): Promise<void> {
  if (!images || images.length === 0) {
    throw new Error('No images provided for proofing portal generation');
  }

  // 1. Convert thumbnail URLs to compressed base64 data URLs
  const portalItems = await convertImagesForPortal(images, onProgress);

  // 2. Generate self-contained HTML document
  const htmlContent = generateClientProofingPortalHtml(portalItems, config);

  // 3. Trigger client download
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${customFilename}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
