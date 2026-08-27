import { 
  $images, 
  $filteredImages, 
  $layoutConfig, 
  $workspaceMode, 
  $selectedImageId, 
  $activeTemplateId,
  $activePage,
  swapImages
} from '../../lib/store';
import { TRAY_DRAG_TYPE } from './PhotoTray';
import { calculateContactSheetPages, LABEL_BAND_HEIGHT } from '../../lib/engine/contactSheetEngine';
import { calculateCollageLayout } from '../../lib/engine/collageEngine';
import { COLLAGE_TEMPLATES } from '../../lib/engine/templates';
import { renderContactSheetToCanvas, renderCollageToCanvas } from '../../lib/engine/canvasRenderer';
import type { PageLayoutResult, CollageLayoutResult } from '../../lib/types';

/** Stage padding, mirrored from `.canvas-stage` in workspace.css. Subtracted
 *  from the container before fitting so the sheet never sits under its own
 *  padding. */
const STAGE_PADDING = 24;

/** Pointer travel, in CSS px, before a press on a frame becomes a drag rather
 *  than a click. Below this a shaky click would start reordering the sheet. */
const DRAG_THRESHOLD = 6;

/** A cell resolved from sheet coordinates, in raster pixels. */
interface HitCell {
  id: string;
  previewUrl: string;
  x: number;
  y: number;
  width: number;
  /** Includes the label strip, so the filename belongs to its own frame. */
  height: number;
}

export class CanvasPreview {
  private container: HTMLElement;
  private stage: HTMLDivElement;
  private canvas: HTMLCanvasElement;
  /** Zoom is relative to fit: 1 means "the whole sheet is visible". */
  private zoomLevel = 1.0;
  /** Scale that makes the current sheet fit the container exactly. */
  private fitScale = 1;
  /** Raster multiplier the sheet is currently drawn at. Follows the zoom so a
   *  magnified frame shows real pixels instead of an upscale. */
  private renderScale = 1;
  private currentContactPages: PageLayoutResult[] = [];
  private currentCollageLayout: CollageLayoutResult | null = null;
  private isRendering = false;
  private needsRender = false;
  /** Outline drawn over the cell a drag would land in. A DOM overlay rather
   *  than a canvas repaint: re-rendering the sheet on every pointermove would
   *  redecode every thumbnail. */
  private dropMarker: HTMLDivElement;
  /** Thumbnail that follows the pointer during an on-sheet drag. */
  private floater: HTMLDivElement | null = null;
  private cellDrag: { id: string; startX: number; startY: number; active: boolean } | null = null;
  /** A drag ends with a click event too; this stops it changing the selection. */
  private suppressClick = false;

  constructor(container: HTMLElement) {
    this.container = container;

    // The canvas is sized in CSS pixels rather than left to `max-h-full`, so
    // zooming past fit actually enlarges the sheet and the container scrolls.
    // That needs a stage between the two: a flex-centred child that outgrows
    // its scroll container has its top and left edges clipped unreachably.
    this.stage = document.createElement('div');
    this.stage.className = 'canvas-stage';

    this.canvas = document.createElement('canvas');
    this.canvas.className = 'canvas-sheet rounded-lg shadow-2xl cursor-crosshair';
    this.stage.appendChild(this.canvas);

    this.dropMarker = document.createElement('div');
    this.dropMarker.className = 'canvas-drop-marker';
    this.dropMarker.hidden = true;
    this.stage.appendChild(this.dropMarker);

    this.container.appendChild(this.stage);

    this.setupEventListeners();
    this.setupDragAndDrop();
    this.setupStoreSubscriptions();

    if (typeof ResizeObserver !== 'undefined') {
      new ResizeObserver(() => this.applySize()).observe(this.container);
    }
  }

  private setupEventListeners() {
    // Cell Click Selection
    this.canvas.addEventListener('click', (e) => {
      if (this.suppressClick) {
        this.suppressClick = false;
        return;
      }
      const point = this.toRaster(e.clientX, e.clientY);
      const cell = this.cellAtRaster(point.x, point.y);
      if (cell) $selectedImageId.set(cell.id);
    });

    // Ctrl/⌘ + wheel zooms, like every other image tool. Without the modifier
    // the wheel keeps scrolling the sheet, so a trackpad still pans.
    this.container.addEventListener(
      'wheel',
      (e) => {
        if (!e.ctrlKey && !e.metaKey) return;
        e.preventDefault();
        this.setZoom(this.zoomLevel * (e.deltaY < 0 ? 1.12 : 1 / 1.12));
      },
      { passive: false }
    );

    // Zoom Controls
    const zoomInBtn = document.getElementById('btn-zoom-in');
    const zoomOutBtn = document.getElementById('btn-zoom-out');
    const zoomResetBtn = document.getElementById('btn-zoom-reset');

    zoomInBtn?.addEventListener('click', () => this.setZoom(this.zoomLevel * 1.25));
    zoomOutBtn?.addEventListener('click', () => this.setZoom(this.zoomLevel / 1.25));
    zoomResetBtn?.addEventListener('click', () => this.setZoom(1.0));

    // Page navigation
    const prevPageBtn = document.getElementById('btn-prev-page');
    const nextPageBtn = document.getElementById('btn-next-page');

    prevPageBtn?.addEventListener('click', () => {
      const current = $activePage.get();
      if (current > 0) $activePage.set(current - 1);
    });

    nextPageBtn?.addEventListener('click', () => {
      const current = $activePage.get();
      const maxPages = this.currentContactPages.length;
      if (current < maxPages - 1) $activePage.set(current + 1);
    });
  }

  private setZoom(level: number) {
    // Up to 6× fit: on an A4 sheet at a 6×8 grid that is the difference
    // between a 90px thumbnail and a legible frame.
    this.zoomLevel = Math.max(0.25, Math.min(6, level));
    this.applySize();
    this.syncRenderScale();
  }

  /** Re-measure and re-fit. Call after the container changes size for a reason
   *  ResizeObserver cannot see immediately (e.g. a collapsed sidebar). */
  public refit() {
    requestAnimationFrame(() => {
      this.applySize();
      this.syncRenderScale();
    });
  }

  /** Lay the sheet out at `fitScale × zoomLevel` CSS pixels. */
  private applySize() {
    // Measure against the sheet's 1× reference size, not the raster: the
    // raster grows with renderScale when zoomed in, and display size must not
    // move when that happens.
    const w = this.canvas.width / this.renderScale;
    const h = this.canvas.height / this.renderScale;
    if (!w || !h) return;

    const availW = Math.max(80, this.container.clientWidth - STAGE_PADDING * 2);
    const availH = Math.max(80, this.container.clientHeight - STAGE_PADDING * 2);
    this.fitScale = Math.min(availW / w, availH / h);

    const effective = this.fitScale * this.zoomLevel;
    this.canvas.style.width = `${Math.round(w * effective)}px`;
    this.canvas.style.height = `${Math.round(h * effective)}px`;

    const zoomLabel = document.getElementById('zoom-percentage');
    if (zoomLabel) {
      // Percentage of the sheet's own pixel size, not of fit — that is the
      // number that tells you whether you are looking at real detail.
      zoomLabel.textContent = `${Math.round(effective * 100)}%`;
    }
  }

  /**
   * Raster multiplier the sheet should be drawn at.
   *
   * Rendering a 1240px A4 sheet and then displaying it 3× larger is just an
   * upscale — the thumbnails go soft exactly when someone zooms in to judge
   * one. So the raster follows the display size, quantised to half steps to
   * stop it re-rendering on every wheel tick, and capped by a pixel budget:
   * A4 at 3× would be 78MB of canvas backing store.
   */
  private desiredRenderScale(): number {
    const w = this.canvas.width / this.renderScale;
    const h = this.canvas.height / this.renderScale;
    if (!w || !h) return 1;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const need = Math.ceil(this.fitScale * this.zoomLevel * dpr * 2) / 2;
    const budget = Math.sqrt(8_000_000 / (w * h));
    return Math.min(3, budget, Math.max(1, need));
  }

  /** Re-render only if the raster is now the wrong resolution for the zoom. */
  private syncRenderScale() {
    if (Math.abs(this.desiredRenderScale() - this.renderScale) > 0.01) {
      this.requestRender();
    }
  }

  private setupStoreSubscriptions() {
    const triggerRender = () => this.requestRender();

    $images.subscribe(triggerRender);
    $filteredImages.subscribe(triggerRender);
    $layoutConfig.subscribe(triggerRender);
    $workspaceMode.subscribe(triggerRender);
    $selectedImageId.subscribe(triggerRender);
    $activeTemplateId.subscribe(triggerRender);
    $activePage.subscribe(triggerRender);
  }

  public requestRender() {
    if (this.isRendering) {
      this.needsRender = true;
      return;
    }
    this.render();
  }

  private async render() {
    this.isRendering = true;
    this.needsRender = false;

    try {
      const mode = $workspaceMode.get();
      const images = $filteredImages.get();
      const config = $layoutConfig.get();
      const selectedId = $selectedImageId.get();
      const scale = this.desiredRenderScale();
      this.renderScale = scale;

      if (mode === 'contact-sheet') {
        this.currentContactPages = calculateContactSheetPages(images, config, scale);
        const currentPageIndex = Math.min($activePage.get(), Math.max(0, this.currentContactPages.length - 1));
        const activePage = this.currentContactPages[currentPageIndex];

        this.updatePageIndicator(currentPageIndex + 1, this.currentContactPages.length);

        if (activePage) {
          await renderContactSheetToCanvas(this.canvas, activePage, config, selectedId, false);
        } else {
          // Empty page
          this.canvas.width = Math.round(1240 * scale);
          this.canvas.height = Math.round(1754 * scale);
          const ctx = this.canvas.getContext('2d');
          if (ctx) {
            ctx.fillStyle = config.bg;
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
          }
        }
      } else {
        // Collage mode
        const templateId = $activeTemplateId.get();
        const template = COLLAGE_TEMPLATES.find(t => t.id === templateId) || COLLAGE_TEMPLATES[0];
        this.currentCollageLayout = calculateCollageLayout(images, template, config, scale);

        this.updatePageIndicator(1, 1);
        await renderCollageToCanvas(this.canvas, this.currentCollageLayout, config, selectedId, false);
      }

      // The raster just changed size, so the CSS size has to be recomputed
      // before the browser paints it at its intrinsic dimensions.
      this.applySize();
    } finally {
      this.isRendering = false;
      if (this.needsRender) {
        this.render();
      }
    }
  }

  /** Client coordinates → raster coordinates of the sheet. */
  private toRaster(clientX: number, clientY: number) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: (clientX - rect.left) * (this.canvas.width / rect.width),
      y: (clientY - rect.top) * (this.canvas.height / rect.height),
    };
  }

  /**
   * The frame under a point, in either mode.
   *
   * Shared by click selection and both drag paths so a pointer can never
   * select one cell and drop into another.
   */
  private cellAtRaster(x: number, y: number): HitCell | null {
    const mode = $workspaceMode.get();

    if (mode === 'contact-sheet') {
      const pageIndex = Math.min($activePage.get(), this.currentContactPages.length - 1);
      const page = this.currentContactPages[pageIndex];
      if (!page) return null;

      // The label strip belongs to its cell, so clicking a filename selects
      // the photo above it. `labelY` is where the engine actually put that
      // strip — a fixed 25px slop was wrong at every scale but 1×, and wrong
      // in both directions once labels moved to `overlay` or `none`.
      const labelBand = LABEL_BAND_HEIGHT * (page.scale || 1);

      for (const cell of page.cells) {
        const bottom = cell.labelY != null ? cell.labelY + labelBand : cell.y + cell.height;
        if (x >= cell.x && x <= cell.x + cell.width && y >= cell.y && y <= bottom) {
          return {
            id: cell.image.id,
            previewUrl: cell.image.previewUrl,
            x: cell.x,
            y: cell.y,
            width: cell.width,
            height: bottom - cell.y,
          };
        }
      }
      return null;
    }

    if (!this.currentCollageLayout) return null;
    for (const cell of this.currentCollageLayout.cells) {
      if (
        cell.image &&
        x >= cell.x &&
        x <= cell.x + cell.width &&
        y >= cell.y &&
        y <= cell.y + cell.height
      ) {
        return {
          id: cell.image.id,
          previewUrl: cell.image.previewUrl,
          x: cell.x,
          y: cell.y,
          width: cell.width,
          height: cell.height,
        };
      }
    }
    return null;
  }

  /**
   * Dragging frames around the sheet itself.
   *
   * Two gestures land here. A pointer drag from one frame to another swaps the
   * two photos — the sheet is the thing being arranged, so rearranging it by
   * touching it beats hunting for the matching rows in a side list. And a
   * thumbnail dragged out of the tray drops into whichever cell it is released
   * over, which is the only way to say "that photo, in that spot".
   *
   * A swap, not an insert: shifting every following photo along would reflow
   * the whole grid when the user asked for one cell to change.
   */
  private setupDragAndDrop() {
    this.canvas.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 || $images.get().length < 2) return;
      const point = this.toRaster(e.clientX, e.clientY);
      const cell = this.cellAtRaster(point.x, point.y);
      if (!cell) return;
      this.cellDrag = { id: cell.id, startX: e.clientX, startY: e.clientY, active: false };
      // Capture so the gesture survives the pointer leaving the canvas —
      // otherwise a drag towards the sidebar dies halfway.
      this.canvas.setPointerCapture(e.pointerId);
    });

    this.canvas.addEventListener('pointermove', (e) => {
      const drag = this.cellDrag;
      if (!drag) return;

      if (!drag.active) {
        const moved = Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY);
        if (moved < DRAG_THRESHOLD) return;
        drag.active = true;
        const source = $images.get().find((img) => img.id === drag.id);
        if (source) this.showFloater(source.thumbnailUrl || source.previewUrl);
        this.canvas.classList.add('is-cell-dragging');
      }

      this.moveFloater(e.clientX, e.clientY);
      const point = this.toRaster(e.clientX, e.clientY);
      const target = this.cellAtRaster(point.x, point.y);
      this.markCell(target && target.id !== drag.id ? target : null);
    });

    const endPointerDrag = (e: PointerEvent) => {
      const drag = this.cellDrag;
      this.cellDrag = null;
      this.hideFloater();
      this.markCell(null);
      this.canvas.classList.remove('is-cell-dragging');
      if (!drag || !drag.active) return;

      this.suppressClick = true;
      const point = this.toRaster(e.clientX, e.clientY);
      const target = this.cellAtRaster(point.x, point.y);
      if (target && target.id !== drag.id) swapImages(drag.id, target.id);
    };

    this.canvas.addEventListener('pointerup', endPointerDrag);
    this.canvas.addEventListener('pointercancel', endPointerDrag);

    // Tray → cell. Only claims the drag when it carries a tray payload: a file
    // drag has to fall through to the window-level import handler.
    this.canvas.addEventListener('dragover', (e) => {
      if (!e.dataTransfer?.types.includes(TRAY_DRAG_TYPE)) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      const point = this.toRaster(e.clientX, e.clientY);
      this.markCell(this.cellAtRaster(point.x, point.y));
    });

    this.canvas.addEventListener('dragleave', () => this.markCell(null));

    this.canvas.addEventListener('drop', (e) => {
      const sourceId = e.dataTransfer?.getData(TRAY_DRAG_TYPE);
      if (!sourceId) return;
      e.preventDefault();
      e.stopPropagation();
      this.markCell(null);
      const point = this.toRaster(e.clientX, e.clientY);
      const target = this.cellAtRaster(point.x, point.y);
      if (target && target.id !== sourceId) swapImages(sourceId, target.id);
    });
  }

  /** Places the outline over a cell, converting raster px to laid-out px. */
  private markCell(cell: HitCell | null) {
    if (!cell) {
      this.dropMarker.hidden = true;
      return;
    }
    const ratio = this.canvas.clientWidth / this.canvas.width;
    this.dropMarker.hidden = false;
    this.dropMarker.style.left = `${this.canvas.offsetLeft + cell.x * ratio}px`;
    this.dropMarker.style.top = `${this.canvas.offsetTop + cell.y * ratio}px`;
    this.dropMarker.style.width = `${cell.width * ratio}px`;
    this.dropMarker.style.height = `${cell.height * ratio}px`;
  }

  private showFloater(previewUrl: string) {
    this.hideFloater();
    const el = document.createElement('div');
    el.className = 'canvas-drag-floater';
    el.style.backgroundImage = `url("${previewUrl}")`;
    document.body.appendChild(el);
    this.floater = el;
  }

  private moveFloater(clientX: number, clientY: number) {
    if (!this.floater) return;
    this.floater.style.transform = `translate(${clientX}px, ${clientY}px) translate(-50%, -50%) rotate(-3deg)`;
  }

  private hideFloater() {
    this.floater?.remove();
    this.floater = null;
  }

  private updatePageIndicator(current: number, total: number) {
    const indicator = document.getElementById('page-indicator');
    const paginationContainer = document.getElementById('pagination-controls');
    const prevBtn = document.getElementById('btn-prev-page') as HTMLButtonElement | null;
    const nextBtn = document.getElementById('btn-next-page') as HTMLButtonElement | null;

    if (indicator) {
      indicator.textContent = `Page ${current} of ${Math.max(1, total)}`;
    }

    if (paginationContainer) {
      paginationContainer.style.display = total > 1 ? 'flex' : 'none';
    }

    if (prevBtn) prevBtn.disabled = current <= 1;
    if (nextBtn) nextBtn.disabled = current >= total;
  }
}
