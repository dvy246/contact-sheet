import { 
  $images, 
  $filteredImages, 
  $layoutConfig, 
  $workspaceMode, 
  $selectedImageId, 
  $activeTemplateId,
  $activePage
} from '../../lib/store';
import { calculateContactSheetPages } from '../../lib/engine/contactSheetEngine';
import { calculateCollageLayout } from '../../lib/engine/collageEngine';
import { COLLAGE_TEMPLATES } from '../../lib/engine/templates';
import { renderContactSheetToCanvas, renderCollageToCanvas } from '../../lib/engine/canvasRenderer';
import type { PageLayoutResult, CollageLayoutResult } from '../../lib/types';

export class CanvasPreview {
  private container: HTMLElement;
  private canvas: HTMLCanvasElement;
  private zoomLevel = 1.0;
  private currentContactPages: PageLayoutResult[] = [];
  private currentCollageLayout: CollageLayoutResult | null = null;
  private isRendering = false;
  private needsRender = false;

  constructor(container: HTMLElement) {
    this.container = container;
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-transform duration-100 cursor-crosshair';
    this.canvas.style.transformOrigin = 'center center';
    this.container.appendChild(this.canvas);

    this.setupEventListeners();
    this.setupStoreSubscriptions();
  }

  private setupEventListeners() {
    // Cell Click Selection
    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.canvas.width / rect.width;
      const scaleY = this.canvas.height / rect.height;
      const clickX = (e.clientX - rect.left) * scaleX;
      const clickY = (e.clientY - rect.top) * scaleY;

      this.handleCanvasClick(clickX, clickY);
    });

    // Zoom Controls
    const zoomInBtn = document.getElementById('btn-zoom-in');
    const zoomOutBtn = document.getElementById('btn-zoom-out');
    const zoomResetBtn = document.getElementById('btn-zoom-reset');

    zoomInBtn?.addEventListener('click', () => this.setZoom(this.zoomLevel + 0.15));
    zoomOutBtn?.addEventListener('click', () => this.setZoom(this.zoomLevel - 0.15));
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
    this.zoomLevel = Math.max(0.4, Math.min(2.5, level));
    this.canvas.style.transform = `scale(${this.zoomLevel})`;
    const zoomLabel = document.getElementById('zoom-percentage');
    if (zoomLabel) {
      zoomLabel.textContent = `${Math.round(this.zoomLevel * 100)}%`;
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

      if (mode === 'contact-sheet') {
        this.currentContactPages = calculateContactSheetPages(images, config, 1);
        const currentPageIndex = Math.min($activePage.get(), Math.max(0, this.currentContactPages.length - 1));
        const activePage = this.currentContactPages[currentPageIndex];

        this.updatePageIndicator(currentPageIndex + 1, this.currentContactPages.length);

        if (activePage) {
          await renderContactSheetToCanvas(this.canvas, activePage, config, selectedId, false);
        } else {
          // Empty page
          this.canvas.width = 1240;
          this.canvas.height = 1754;
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
        this.currentCollageLayout = calculateCollageLayout(images, template, config, 1);
        
        this.updatePageIndicator(1, 1);
        await renderCollageToCanvas(this.canvas, this.currentCollageLayout, config, selectedId, false);
      }
    } finally {
      this.isRendering = false;
      if (this.needsRender) {
        this.render();
      }
    }
  }

  private handleCanvasClick(x: number, y: number) {
    const mode = $workspaceMode.get();

    if (mode === 'contact-sheet') {
      const pageIndex = Math.min($activePage.get(), this.currentContactPages.length - 1);
      const page = this.currentContactPages[pageIndex];
      if (!page) return;

      for (const cell of page.cells) {
        if (
          x >= cell.x &&
          x <= cell.x + cell.width &&
          y >= cell.y &&
          y <= cell.y + cell.height + 25
        ) {
          $selectedImageId.set(cell.image.id);
          break;
        }
      }
    } else if (this.currentCollageLayout) {
      for (const cell of this.currentCollageLayout.cells) {
        if (
          cell.image &&
          x >= cell.x &&
          x <= cell.x + cell.width &&
          y >= cell.y &&
          y <= cell.y + cell.height
        ) {
          $selectedImageId.set(cell.image.id);
          break;
        }
      }
    }
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
