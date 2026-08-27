import { 
  $images, 
  $layoutConfig, 
  $workspaceMode, 
  $activeTemplateId,
  $isExporting,
  $exportProgress,
  $activePage
} from '../../lib/store';
import { calculateContactSheetPages } from '../../lib/engine/contactSheetEngine';
import { calculateCollageLayout } from '../../lib/engine/collageEngine';
import { COLLAGE_TEMPLATES } from '../../lib/engine/templates';
import { exportLayoutAsImage } from '../../lib/export/imageExporter';
import { exportFilenamesAsCSV, exportFilenamesAsTXT } from '../../lib/export/filenameExporter';
import { exportProjectManifest } from '../../lib/export/projectManifest';
import type { ExportFormat, FilterStatus } from '../../lib/types';

export class ExportDrawer {
  private container: HTMLElement;
  private selectedFormat: ExportFormat | 'txt' = 'png';
  private exportScope: FilterStatus = 'all';
  private quality = 0.92;
  private scale = 2; // 2x high-resolution by default

  constructor(container: HTMLElement) {
    this.container = container;
    this.render();
    this.setupStoreSubscriptions();
  }

  private render() {
    const isExporting = $isExporting.get();
    const progress = $exportProgress.get();
    const images = $images.get();
    const keptCount = images.filter(img => img.status === 'keep').length;

    this.container.innerHTML = `
      <div class="flex flex-col gap-4 p-4 sm:p-5 bg-workspace-panel border-t border-workspace-border text-xs text-workspace-text w-full min-w-0">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <span class="font-bold text-sm tracking-tight">Export Artifact</span>
            <span class="text-[11px] text-workspace-muted">- Generates locally in browser</span>
          </div>

          <!-- Scope Selection -->
          <div class="flex items-center gap-2">
            <label class="text-[11px] text-workspace-muted font-medium">Scope:</label>
            <select id="export-scope-select" class="bg-workspace-surface border border-workspace-border rounded-lg px-3 py-1.5 text-xs text-workspace-text focus:border-accent transition-colors cursor-pointer">
              <option value="all" ${this.exportScope === 'all' ? 'selected' : ''}>All Images (${images.length})</option>
              <option value="keep" ${this.exportScope === 'keep' ? 'selected' : ''}>Kept Only (${keptCount})</option>
              <option value="exclude-rejected" ${this.exportScope === 'exclude-rejected' ? 'selected' : ''}>Exclude Rejected</option>
            </select>
          </div>
        </div>

        <!-- Format Selector Tabs -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5">
          <button data-format="png" class="export-format-btn p-2.5 sm:p-3 rounded-xl border text-center transition-all cursor-pointer ${this.selectedFormat === 'png' ? 'bg-workspace-surface-hover border-accent text-workspace-text font-bold shadow-xs' : 'bg-workspace-surface border-workspace-border text-workspace-muted hover:text-workspace-text'}">
            <div class="font-medium text-xs">PNG Image</div>
            <div class="text-[10px] text-workspace-muted mt-0.5">High-Res Lossless</div>
          </button>
          <button data-format="jpeg" class="export-format-btn p-2.5 sm:p-3 rounded-xl border text-center transition-all cursor-pointer ${this.selectedFormat === 'jpeg' ? 'bg-workspace-surface-hover border-accent text-workspace-text font-bold shadow-xs' : 'bg-workspace-surface border-workspace-border text-workspace-muted hover:text-workspace-text'}">
            <div class="font-medium text-xs">JPEG Image</div>
            <div class="text-[10px] text-workspace-muted mt-0.5">Compressed Photo</div>
          </button>
          <button data-format="pdf" class="export-format-btn p-2.5 sm:p-3 rounded-xl border text-center transition-all cursor-pointer ${this.selectedFormat === 'pdf' ? 'bg-workspace-surface-hover border-accent text-workspace-text font-bold shadow-xs' : 'bg-workspace-surface border-workspace-border text-workspace-muted hover:text-workspace-text'}">
            <div class="font-medium text-xs">PDF Document</div>
            <div class="text-[10px] text-workspace-muted mt-0.5">Print Proof Sheet</div>
          </button>
          <button data-format="csv" class="export-format-btn p-2.5 sm:p-3 rounded-xl border text-center transition-all cursor-pointer ${this.selectedFormat === 'csv' ? 'bg-workspace-surface-hover border-accent text-workspace-text font-bold shadow-xs' : 'bg-workspace-surface border-workspace-border text-workspace-muted hover:text-workspace-text'}">
            <div class="font-medium text-xs">CSV Table</div>
            <div class="text-[10px] text-workspace-muted mt-0.5">Filename Handoff</div>
          </button>
          <button data-format="txt" class="export-format-btn p-2.5 sm:p-3 rounded-xl border text-center transition-all cursor-pointer ${this.selectedFormat === 'txt' ? 'bg-workspace-surface-hover border-accent text-workspace-text font-bold shadow-xs' : 'bg-workspace-surface border-workspace-border text-workspace-muted hover:text-workspace-text'}">
            <div class="font-medium text-xs">Lightroom TXT</div>
            <div class="text-[10px] text-workspace-muted mt-0.5">Search Filter List</div>
          </button>
          <button data-format="json" class="export-format-btn p-2.5 sm:p-3 rounded-xl border text-center transition-all cursor-pointer ${this.selectedFormat === 'json' ? 'bg-workspace-surface-hover border-accent text-workspace-text font-bold shadow-xs' : 'bg-workspace-surface border-workspace-border text-workspace-muted hover:text-workspace-text'}">
            <div class="font-medium text-xs">Manifest</div>
            <div class="text-[10px] text-workspace-muted mt-0.5">.makecontactsheet.json</div>
          </button>
        </div>

        <!-- Action Row -->
        <div class="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-workspace-border">
          <div class="flex items-center gap-3">
            <span class="text-xs text-workspace-muted">
              ${this.selectedFormat === 'pdf' ? 'Multi-page 300 DPI print document with metadata headers' : this.selectedFormat === 'txt' ? 'Comma-separated filename string ready to paste into Lightroom search' : this.selectedFormat === 'csv' ? 'Lightroom-compatible structured metadata table' : 'Export rendered at 2x studio quality'}
            </span>
          </div>

          <div class="flex items-center gap-3">
            <button 
              id="btn-trigger-export"
              class="inline-flex items-center justify-center gap-2 h-9 px-5 rounded-lg bg-accent hover:bg-accent-hover text-white font-semibold text-xs tracking-tight shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              ${isExporting || images.length === 0 ? 'disabled' : ''}
            >
              ${isExporting ? `
                <svg class="animate-spin -ml-1 mr-1 h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Exporting (${progress}%)...</span>
              ` : `
                <span>Download ${this.selectedFormat.toUpperCase()}</span>
              `}
            </button>
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  private attachEvents() {
    // Format tabs
    this.container.querySelectorAll('.export-format-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const fmt = btn.getAttribute('data-format') as ExportFormat | 'txt';
        if (fmt) {
          this.selectedFormat = fmt;
          this.render();
        }
      });
    });

    // Scope select
    const scopeSelect = document.getElementById('export-scope-select') as HTMLSelectElement | null;
    scopeSelect?.addEventListener('change', () => {
      this.exportScope = scopeSelect.value as FilterStatus;
    });

    // Trigger button
    document.getElementById('btn-trigger-export')?.addEventListener('click', () => {
      this.executeExport();
    });
  }

  private async executeExport() {
    const rawImages = $images.get();
    let targetImages = rawImages;

    if (this.exportScope === 'keep') {
      targetImages = rawImages.filter(img => img.status === 'keep');
    } else if (this.exportScope === 'exclude-rejected') {
      targetImages = rawImages.filter(img => img.status !== 'reject');
    }

    if (targetImages.length === 0) {
      alert('No images match the selected export scope!');
      return;
    }

    $isExporting.set(true);
    $exportProgress.set(10);

    const mode = $workspaceMode.get();
    const config = $layoutConfig.get();

    try {
      if (this.selectedFormat === 'csv') {
        exportFilenamesAsCSV(targetImages);
        $exportProgress.set(100);
      } else if (this.selectedFormat === 'txt') {
        exportFilenamesAsTXT(targetImages, 'comma');
        $exportProgress.set(100);
      } else if (this.selectedFormat === 'json') {
        exportProjectManifest(targetImages, mode, config, $activeTemplateId.get());
        $exportProgress.set(100);
      } else if (this.selectedFormat === 'pdf') {
        const { exportContactSheetPagesToPDF, exportCollageLayoutToPDF } = await import('../../lib/export/pdfExporter');
        if (mode === 'contact-sheet') {
          const pages = calculateContactSheetPages(targetImages, config, this.scale);
          await exportContactSheetPagesToPDF(pages, config, (cur, tot) => {
            $exportProgress.set(Math.round((cur / tot) * 90));
          });
        } else {
           // Collage PDF
           const template = COLLAGE_TEMPLATES.find(t => t.id === $activeTemplateId.get()) || COLLAGE_TEMPLATES[0];
           const collageLayout = calculateCollageLayout(targetImages, template, config, this.scale);
           await exportCollageLayoutToPDF(collageLayout, config, undefined, `makecontactsheet-collage-${template.id}`);
        }
        $exportProgress.set(100);
      } else {
        // Image export (PNG / JPEG)
        if (mode === 'contact-sheet') {
          const pages = calculateContactSheetPages(targetImages, config, this.scale);
          const currentPageIndex = Math.min($activePage.get(), pages.length - 1);
          const activePage = pages[currentPageIndex] || pages[0];
          if (activePage) {
            await exportLayoutAsImage(activePage, config, this.selectedFormat as 'png' | 'jpeg', this.quality, `makecontactsheet-sheet-page-${currentPageIndex + 1}`);
          }
        } else {
          const template = COLLAGE_TEMPLATES.find(t => t.id === $activeTemplateId.get()) || COLLAGE_TEMPLATES[0];
          const collageLayout = calculateCollageLayout(targetImages, template, config, this.scale);
          await exportLayoutAsImage(collageLayout, config, this.selectedFormat as 'png' | 'jpeg', this.quality, `makecontactsheet-collage-${template.id}`);
        }
        $exportProgress.set(100);
      }
    } catch (err) {
      console.error('Export failed:', err);
      alert('Export failed. Please check browser console for details.');
    } finally {
      setTimeout(() => {
        $isExporting.set(false);
        $exportProgress.set(0);
        this.render();
      }, 500);
    }
  }

  private setupStoreSubscriptions() {
    $images.subscribe(() => this.render());
    $isExporting.subscribe(() => this.render());
    $exportProgress.subscribe(() => this.render());
  }
}
