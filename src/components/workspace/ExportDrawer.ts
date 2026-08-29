import { 
  $images, 
  $layoutConfig, 
  $workspaceMode, 
  $activeTemplateId,
  $isExporting,
  $exportProgress,
  $activePage,
  $filterStatus,
  $reviewCounts,
  $sortKey
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
  private pdfPassword = '';
  private isRendered = false;

  constructor(container: HTMLElement) {
    this.container = container;
    this.render();
    this.setupStoreSubscriptions();
  }

  private render() {
    if (!this.isRendered) {
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
                <option value="all">All Images</option>
                <option value="keep">Kept Only</option>
                <option value="flag">Flagged Only</option>
                <option value="reject">Rejected</option>
                <option value="unreviewed">Unreviewed</option>
                <option value="exclude-rejected">Exclude Rejected</option>
              </select>
            </div>
          </div>

          <!-- Export Integrity Summary Card -->
          <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 p-3 rounded-xl bg-workspace-surface border border-workspace-border mt-1 mb-2">
            <div class="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-medium">
               <div class="flex items-center gap-1.5"><span class="text-workspace-muted">Total:</span><span id="export-summary-total" class="text-workspace-text">0</span></div>
               <div class="w-px h-3.5 bg-workspace-border hidden sm:block"></div>
               <div class="flex items-center gap-1.5"><span class="text-workspace-muted">Selected:</span><span id="export-summary-selected" class="text-accent">0</span></div>
               <div class="w-px h-3.5 bg-workspace-border hidden sm:block"></div>
               <div class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-emerald-500"></span><span id="export-summary-keep">0</span></div>
               <div class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-amber-500"></span><span id="export-summary-flag">0</span></div>
               <div class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-red-500"></span><span id="export-summary-reject">0</span></div>
               <div class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-gray-400"></span><span id="export-summary-unreviewed">0</span></div>
            </div>
            <button id="btn-copy-audit" class="flex-shrink-0 h-7 px-3 rounded border border-workspace-border bg-workspace-bg hover:bg-workspace-panel text-[11px] font-semibold text-workspace-text transition-colors cursor-pointer whitespace-nowrap">
              Copy Plain-Text Audit Summary
            </button>
          </div>

          <!-- Format Selector Tabs -->
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-8 gap-2 sm:gap-2.5">
            <button data-format="png" class="export-format-btn p-2.5 sm:p-3 rounded-xl border text-center transition-all cursor-pointer">
              <div class="font-medium text-xs">PNG Image</div>
              <div class="text-[10px] text-workspace-muted mt-0.5">High-Res Lossless</div>
            </button>
            <button data-format="jpeg" class="export-format-btn p-2.5 sm:p-3 rounded-xl border text-center transition-all cursor-pointer">
              <div class="font-medium text-xs">JPEG Image</div>
              <div class="text-[10px] text-workspace-muted mt-0.5">Compressed Photo</div>
            </button>
            <button data-format="pdf" class="export-format-btn p-2.5 sm:p-3 rounded-xl border text-center transition-all cursor-pointer">
              <div class="font-medium text-xs">PDF Document</div>
              <div class="text-[10px] text-workspace-muted mt-0.5">Print Proof Sheet</div>
            </button>
            <button data-format="html" class="export-format-btn p-2.5 sm:p-3 rounded-xl border text-center transition-all cursor-pointer">
              <div class="font-medium text-xs">Client Review Portal</div>
              <div class="text-[10px] text-workspace-muted mt-0.5">Offline Self-Contained HTML</div>
            </button>
            <button data-format="csv" class="export-format-btn p-2.5 sm:p-3 rounded-xl border text-center transition-all cursor-pointer">
              <div class="font-medium text-xs">Selected Filenames</div>
              <div class="text-[10px] text-workspace-muted mt-0.5">CSV Spreadsheet</div>
            </button>
            <button data-format="txt" class="export-format-btn p-2.5 sm:p-3 rounded-xl border text-center transition-all cursor-pointer">
              <div class="font-medium text-xs">Lightroom Filter</div>
              <div class="text-[10px] text-workspace-muted mt-0.5">Comma-Separated Text</div>
            </button>
            <button data-format="json" class="export-format-btn p-2.5 sm:p-3 rounded-xl border text-center transition-all cursor-pointer">
              <div class="font-medium text-xs">Project Session</div>
              <div class="text-[10px] text-workspace-muted mt-0.5">.makecontactsheet.json</div>
            </button>
            <button data-format="xmp" class="export-format-btn p-2.5 sm:p-3 rounded-xl border text-center transition-all cursor-pointer">
              <div class="font-medium text-xs">Lightroom XMP</div>
              <div class="text-[10px] text-workspace-muted mt-0.5">Zero-Click Sidecars</div>
            </button>
          </div>

          <!-- Password Protection (PDF only) -->
          <div id="export-password-group" class="p-3 rounded-xl bg-workspace-surface border border-workspace-border">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label for="export-pdf-password" class="flex items-center gap-1.5 text-xs font-medium text-workspace-text">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-accent shrink-0"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <span>PDF Password Protection <span class="text-workspace-muted font-normal">(Optional)</span></span>
              </label>
              <input 
                type="password" 
                id="export-pdf-password" 
                placeholder="Leave empty for no password" 
                autocomplete="new-password"
                class="w-full sm:w-72 bg-workspace-panel border border-workspace-border rounded-lg px-3 py-1.5 text-xs text-workspace-text placeholder:text-workspace-muted focus:border-accent focus:outline-none transition-colors" 
              />
            </div>
          </div>

          <!-- Action Row -->
          <div class="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-workspace-border">
            <div class="flex items-center gap-3">
              <span id="export-desc" class="text-xs text-workspace-muted"></span>
            </div>

            <div class="flex items-center gap-3">
              <button 
                id="btn-trigger-export"
                class="inline-flex items-center justify-center gap-2 h-9 px-5 rounded-lg bg-accent hover:bg-accent-hover text-white font-semibold text-xs tracking-tight shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              ></button>
            </div>
          </div>
        </div>
      `;

      this.attachEvents();
      this.isRendered = true;
    }
    
    this.sync();
  }

  private sync() {
    const isExporting = $isExporting.get();
    const progress = $exportProgress.get();
    const images = $images.get();
    const counts = $reviewCounts.get();

    const scopeSelect = document.getElementById('export-scope-select') as HTMLSelectElement | null;
    if (scopeSelect) {
      if (document.activeElement !== scopeSelect) {
        scopeSelect.value = this.exportScope;
      }
      Array.from(scopeSelect.options).forEach(opt => {
        if (opt.value === 'all') opt.textContent = `All Images (${counts.total})`;
        if (opt.value === 'keep') opt.textContent = `Kept Only (${counts.keep})`;
        if (opt.value === 'flag') opt.textContent = `Flagged Only (${counts.flag})`;
        if (opt.value === 'reject') opt.textContent = `Rejected (${counts.reject})`;
        if (opt.value === 'unreviewed') opt.textContent = `Unreviewed (${counts.unreviewed})`;
        if (opt.value === 'exclude-rejected') opt.textContent = `Exclude Rejected (${counts.total - counts.reject})`;
      });
    }

    // Update Export Integrity Summary Card
    const elTotal = document.getElementById('export-summary-total');
    const elSelected = document.getElementById('export-summary-selected');
    const elKeep = document.getElementById('export-summary-keep');
    const elFlag = document.getElementById('export-summary-flag');
    const elReject = document.getElementById('export-summary-reject');
    const elUnreviewed = document.getElementById('export-summary-unreviewed');

    if (elTotal) elTotal.textContent = String(counts.total);
    if (elKeep) elKeep.textContent = `${counts.keep} Keep`;
    if (elFlag) elFlag.textContent = `${counts.flag} Flag`;
    if (elReject) elReject.textContent = `${counts.reject} Reject`;
    if (elUnreviewed) elUnreviewed.textContent = `${counts.unreviewed} Unreviewed`;

    if (elSelected) {
      let selectedCount = counts.total;
      if (this.exportScope === 'keep') selectedCount = counts.keep;
      else if (this.exportScope === 'flag') selectedCount = counts.flag;
      else if (this.exportScope === 'reject') selectedCount = counts.reject;
      else if (this.exportScope === 'unreviewed') selectedCount = counts.unreviewed;
      else if (this.exportScope === 'exclude-rejected') selectedCount = counts.total - counts.reject;
      elSelected.textContent = String(selectedCount);
    }

    this.container.querySelectorAll('.export-format-btn').forEach((btn) => {
      const fmt = btn.getAttribute('data-format');
      if (fmt === this.selectedFormat) {
        btn.className = 'export-format-btn p-2.5 sm:p-3 rounded-xl border text-center transition-all cursor-pointer bg-workspace-surface-hover border-accent text-workspace-text font-bold shadow-xs';
      } else {
        btn.className = 'export-format-btn p-2.5 sm:p-3 rounded-xl border text-center transition-all cursor-pointer bg-workspace-surface border-workspace-border text-workspace-muted hover:text-workspace-text';
      }
    });

    const passwordGroup = document.getElementById('export-password-group');
    if (passwordGroup) {
      passwordGroup.className = this.selectedFormat === 'pdf' ? 'block p-3 rounded-xl bg-workspace-surface border border-workspace-border' : 'hidden p-3 rounded-xl bg-workspace-surface border border-workspace-border';
    }

    const passwordInput = document.getElementById('export-pdf-password') as HTMLInputElement | null;
    if (passwordInput && document.activeElement !== passwordInput) {
      passwordInput.value = this.pdfPassword;
    }

    const desc = document.getElementById('export-desc');
    if (desc) {
      desc.textContent = this.selectedFormat === 'pdf' ? 'Multi-page 300 DPI print document' : this.selectedFormat === 'html' ? 'Standalone offline HTML proofing gallery with client culling & review tools' : this.selectedFormat === 'txt' ? 'Comma-separated filename string ready to paste into Lightroom search' : this.selectedFormat === 'csv' ? 'Lightroom-compatible structured metadata table with review statuses and ratings' : this.selectedFormat === 'json' ? 'Portable JSON review session manifest with full layout config and statuses' : 'Export rendered at 2x studio quality';
    }

    const btnExport = document.getElementById('btn-trigger-export') as HTMLButtonElement | null;
    if (btnExport) {
      btnExport.disabled = isExporting || images.length === 0;
      if (isExporting) {
        btnExport.innerHTML = `
          <svg class="animate-spin -ml-1 mr-1 h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Exporting (${progress}%)...</span>
        `;
      } else {
        btnExport.innerHTML = `<span>Download ${this.selectedFormat === 'html' ? 'HTML PORTAL' : this.selectedFormat.toUpperCase()}</span>`;
      }
    }
  }

  private attachEvents() {
    this.container.querySelectorAll('.export-format-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const fmt = btn.getAttribute('data-format') as ExportFormat | 'txt';
        if (fmt) {
          this.selectedFormat = fmt;
          this.render();
        }
      });
    });

    const passwordInput = document.getElementById('export-pdf-password') as HTMLInputElement | null;
    passwordInput?.addEventListener('input', (e) => {
      this.pdfPassword = (e.target as HTMLInputElement).value;
    });

    const scopeSelect = document.getElementById('export-scope-select') as HTMLSelectElement | null;
    scopeSelect?.addEventListener('change', () => {
      this.exportScope = scopeSelect.value as FilterStatus;
      this.sync();
    });

    document.getElementById('btn-trigger-export')?.addEventListener('click', () => {
      this.executeExport();
    });

    const btnCopyAudit = document.getElementById('btn-copy-audit');
    if (btnCopyAudit) {
      btnCopyAudit.addEventListener('click', () => {
        const counts = $reviewCounts.get();
        const scopeNames: Record<string, string> = {
          'all': 'All Images',
          'keep': 'Kept Only',
          'flag': 'Flagged Only',
          'reject': 'Rejected',
          'unreviewed': 'Unreviewed',
          'exclude-rejected': 'Exclude Rejected'
        };
        const scopeName = scopeNames[this.exportScope] || 'Unknown';
        
        let targetCount = counts.total;
        if (this.exportScope === 'keep') targetCount = counts.keep;
        else if (this.exportScope === 'flag') targetCount = counts.flag;
        else if (this.exportScope === 'reject') targetCount = counts.reject;
        else if (this.exportScope === 'unreviewed') targetCount = counts.unreviewed;
        else if (this.exportScope === 'exclude-rejected') targetCount = counts.total - counts.reject;

        const report = `Make Contact Sheet Export Summary: Total: ${counts.total} | Export Scope: ${scopeName} (${targetCount}) | Flagged: ${counts.flag} | Rejected: ${counts.reject}`;
        
        navigator.clipboard.writeText(report).then(() => {
          const original = btnCopyAudit.textContent;
          btnCopyAudit.textContent = 'Copied!';
          setTimeout(() => {
            btnCopyAudit.textContent = original;
          }, 2000);
        }).catch(err => {
          console.error('Failed to copy audit:', err);
          const original = btnCopyAudit.textContent;
          btnCopyAudit.textContent = 'Failed to Copy';
          setTimeout(() => {
            btnCopyAudit.textContent = original;
          }, 2000);
        });
      });
    }
  }

  private async executeExport() {
    const rawImages = $images.get();
    let targetImages = rawImages;

    if (this.exportScope === 'keep') {
      targetImages = rawImages.filter(img => img.status === 'keep');
    } else if (this.exportScope === 'flag') {
      targetImages = rawImages.filter(img => img.status === 'flag');
    } else if (this.exportScope === 'reject') {
      targetImages = rawImages.filter(img => img.status === 'reject');
    } else if (this.exportScope === 'unreviewed') {
      targetImages = rawImages.filter(img => img.status === 'unreviewed');
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
        exportFilenamesAsCSV(targetImages, 'makecontactsheet-selected-filenames');
        $exportProgress.set(100);
      } else if (this.selectedFormat === 'txt') {
        exportFilenamesAsTXT(targetImages, 'comma', 'makecontactsheet-filenames');
        $exportProgress.set(100);
      } else if (this.selectedFormat === 'json') {
        exportProjectManifest(
          targetImages,
          mode,
          config,
          $activeTemplateId.get(),
          'makecontactsheet-session',
          $filterStatus.get(),
          $sortKey.get()
        );
        $exportProgress.set(100);
      } else if (this.selectedFormat === 'xmp') {
        const { exportXmpSidecarsZip } = await import('../../lib/export/xmpGenerator');
        await exportXmpSidecarsZip(targetImages, 'makecontactsheet-xmp-sidecars');
        $exportProgress.set(100);
      } else if (this.selectedFormat === 'html') {
        const { exportClientProofingPortal } = await import('../../lib/export/htmlPortalExporter');
        await exportClientProofingPortal(
          targetImages,
          config,
          'makecontactsheet-proofing-portal',
          (loaded, total) => {
            $exportProgress.set(Math.round((loaded / total) * 90));
          }
        );
        $exportProgress.set(100);
      } else if (this.selectedFormat === 'pdf') {
        const { exportContactSheetPagesToPDF, exportCollageLayoutToPDF } = await import('../../lib/export/pdfExporter');
        const pdfOptions = { password: this.pdfPassword.trim() || undefined };
        if (mode === 'contact-sheet') {
          const pages = calculateContactSheetPages(targetImages, config, this.scale);
          await exportContactSheetPagesToPDF(
            pages,
            config,
            (cur, tot) => {
              $exportProgress.set(Math.round((cur / tot) * 90));
            },
            'makecontactsheet-contact-sheet',
            pdfOptions
          );
        } else {
           const template = COLLAGE_TEMPLATES.find(t => t.id === $activeTemplateId.get()) || COLLAGE_TEMPLATES[0];
           const collageLayout = calculateCollageLayout(targetImages, template, config, this.scale);
           await exportCollageLayoutToPDF(
             collageLayout, 
             config, 
             undefined, 
             `makecontactsheet-collage-${template.id}`,
             pdfOptions
           );
        }
        $exportProgress.set(100);
      } else {
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
    $reviewCounts.subscribe(() => this.render());
    $isExporting.subscribe(() => this.render());
    $exportProgress.subscribe(() => this.render());
  }
}
