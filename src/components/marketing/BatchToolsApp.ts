import { $images, addImages, batchSetCustomLabels } from '../../lib/store';
import { loadImagesFromFiles } from '../../lib/media/imageLoader';
import type { ImageItem } from '../../lib/types';
import {
  type BatchRenameRecipe,
  generateBatchRenameItems,
  generateBashRenameScript,
  generatePowerShellRenameScript,
  generateRenameMappingCSV,
  convertAndResizeSingleImage,
  downloadTextContent,
  downloadBlob,
} from '../../lib/media/batchProcessor';
import { escapeHtml } from '../../lib/utils';


export class BatchToolsApp {
  private container: HTMLElement;
  private activeTab: 'rename' | 'exif' | 'convert' = 'rename';
  private localImages: ImageItem[] = [];
  private isProcessing = false;
  private progressPercent = 0;
  private progressStatus = '';

  // Rename Recipe State
  private recipe: BatchRenameRecipe = {
    prefix: 'IMG_',
    startNumber: 1,
    padding: 3,
    suffix: '',
    template: '{prefix}{index}{suffix}',
    caseTransform: 'preserve',
    replaceSpacesWith: 'none',
  };

  // Convert State
  private convertFormat: 'image/jpeg' | 'image/png' | 'image/webp' = 'image/jpeg';
  private convertQuality = 0.88;
  private convertMaxDimension = 0; // 0 = original
  private convertAspectRatio: 'original' | '1:1' | '4:5' | '16:9' | '9:16' | '3:2' | '2:3' = 'original';

  constructor(container: HTMLElement) {
    this.container = container;
    
    // Check if store already has images from workspace
    const existing = $images.get();
    if (existing.length > 0) {
      this.localImages = [...existing];
    }

    this.render();
    this.attachEvents();
  }

  private render(): void {
    const totalCount = this.localImages.length;
    const renameItems = generateBatchRenameItems(this.localImages, this.recipe);

    this.container.innerHTML = `
      <div class="w-full flex flex-col bg-marketing-surface/70 border border-marketing-border rounded-3xl p-4 sm:p-7 shadow-xl backdrop-blur-xl">
        
        <!-- Header Toolbar & File Drop Zone -->
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-marketing-border">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span class="text-xs font-mono font-bold uppercase tracking-wider text-accent-ink">100% In-Browser Batch Operations</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-bold text-marketing-text">Batch Photo Toolkit</h2>
            <p class="text-xs sm:text-sm text-marketing-muted">Rename files, inspect technical EXIF data, and convert formats with zero server uploads.</p>
          </div>

          <!-- Quick Action Buttons -->
          <div class="flex flex-wrap items-center gap-2.5 shrink-0">
            <label class="px-4 py-2 rounded-xl bg-accent hover:bg-accent-hover text-white text-xs font-semibold cursor-pointer shadow-xs transition-all flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
              <span>Add Photos</span>
              <input type="file" id="batch-file-input" multiple accept="image/*" class="hidden" />
            </label>

            <label class="px-4 py-2 rounded-xl bg-marketing-surface hover:bg-marketing-surface-hover border border-marketing-border text-marketing-text text-xs font-semibold cursor-pointer transition-colors flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>
              <span>Add Folder</span>
              <input type="file" id="batch-folder-input" multiple webkitdirectory class="hidden" />
            </label>

            ${totalCount > 0 ? `
              <button id="batch-clear-btn" class="px-3 py-2 rounded-xl text-xs text-rose-500 hover:bg-rose-500/10 border border-rose-500/30 transition-colors">
                Clear (${totalCount})
              </button>
            ` : ''}
          </div>
        </div>

        ${totalCount === 0 ? this.renderEmptyDropzone() : this.renderWorkbench(renameItems)}

      </div>
    `;

    this.attachEvents();
  }

  private renderEmptyDropzone(): string {
    return `
      <div id="batch-dropzone-box" class="my-8 py-16 px-6 rounded-2xl border-2 border-dashed border-marketing-border hover:border-accent/60 bg-marketing-panel/40 flex flex-col items-center justify-center text-center transition-colors cursor-pointer group">
        <div class="w-14 h-14 rounded-2xl bg-marketing-surface border border-marketing-border flex items-center justify-center text-accent mb-4 group-hover:scale-110 transition-transform shadow-xs">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 class="text-base sm:text-lg font-bold text-marketing-text mb-1">Drag & Drop Your Photos or Folder Here</h3>
        <p class="text-xs sm:text-sm text-marketing-muted max-w-md">Drop RAW exports, JPEGs, PNGs, or WebP images to perform batch operations entirely on your device with 100% privacy.</p>
      </div>
    `;
  }

  private renderWorkbench(renameItems: ReturnType<typeof generateBatchRenameItems>): string {
    return `
      <div class="mt-6 flex flex-col space-y-6">
        
        <!-- Tab Navigation Bar -->
        <div class="flex items-center gap-2 border-b border-marketing-border pb-3 overflow-x-auto no-scrollbar">
          <button data-tab="rename" class="tab-btn px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            this.activeTab === 'rename' ? 'bg-accent text-white shadow-xs' : 'bg-marketing-surface text-marketing-muted hover:text-marketing-text'
          }">
            Batch Rename (${renameItems.length})
          </button>
          <button data-tab="exif" class="tab-btn px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            this.activeTab === 'exif' ? 'bg-accent text-white shadow-xs' : 'bg-marketing-surface text-marketing-muted hover:text-marketing-text'
          }">
            Technical EXIF Data (${renameItems.length})
          </button>
          <button data-tab="convert" class="tab-btn px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            this.activeTab === 'convert' ? 'bg-accent text-white shadow-xs' : 'bg-marketing-surface text-marketing-muted hover:text-marketing-text'
          }">
            Resize &amp; Convert Format
          </button>
          
          <a href="/#workspace" class="ml-auto px-4 py-2 rounded-xl bg-marketing-surface hover:bg-marketing-surface-hover border border-marketing-border text-marketing-text text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0">
            <span>Send to Studio</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </a>
        </div>

        ${this.activeTab === 'rename' ? this.renderRenameTab(renameItems) : ''}
        ${this.activeTab === 'exif' ? this.renderExifTab() : ''}
        ${this.activeTab === 'convert' ? this.renderConvertTab() : ''}

      </div>
    `;
  }

  private renderRenameTab(items: ReturnType<typeof generateBatchRenameItems>): string {
    return `
      <div class="space-y-6">
        <!-- Recipe Configuration Controls -->
        <div class="p-5 rounded-2xl bg-marketing-panel/80 border border-marketing-border grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          
          <!-- Prefix -->
          <div class="space-y-1.5">
            <label class="font-bold text-marketing-text font-mono text-[11px]">PREFIX</label>
            <input 
              type="text" 
              id="recipe-prefix" 
              value="${this.recipe.prefix}" 
              placeholder="e.g. SHOOT_" 
              class="w-full px-3 py-2 rounded-lg bg-marketing-surface border border-marketing-border text-marketing-text font-mono text-xs focus:border-accent outline-none" 
            />
          </div>

          <!-- Start Number & Padding -->
          <div class="space-y-1.5">
            <label class="font-bold text-marketing-text font-mono text-[11px]">START NUMBER / DIGITS</label>
            <div class="flex gap-2">
              <input 
                type="number" 
                id="recipe-start" 
                value="${this.recipe.startNumber}" 
                min="1" 
                class="w-1/2 px-3 py-2 rounded-lg bg-marketing-surface border border-marketing-border text-marketing-text font-mono text-xs focus:border-accent outline-none" 
              />
              <select 
                id="recipe-padding" 
                class="w-1/2 px-2.5 py-2 rounded-lg bg-marketing-surface border border-marketing-border text-marketing-text font-mono text-xs focus:border-accent outline-none"
              >
                <option value="1" ${this.recipe.padding === 1 ? 'selected' : ''}>1 (1)</option>
                <option value="2" ${this.recipe.padding === 2 ? 'selected' : ''}>2 (01)</option>
                <option value="3" ${this.recipe.padding === 3 ? 'selected' : ''}>3 (001)</option>
                <option value="4" ${this.recipe.padding === 4 ? 'selected' : ''}>4 (0001)</option>
              </select>
            </div>
          </div>

          <!-- Suffix -->
          <div class="space-y-1.5">
            <label class="font-bold text-marketing-text font-mono text-[11px]">OPTIONAL SUFFIX</label>
            <input 
              type="text" 
              id="recipe-suffix" 
              value="${this.recipe.suffix}" 
              placeholder="e.g. FINAL" 
              class="w-full px-3 py-2 rounded-lg bg-marketing-surface border border-marketing-border text-marketing-text font-mono text-xs focus:border-accent outline-none" 
            />
          </div>

          <!-- Case & Spaces -->
          <div class="space-y-1.5">
            <label class="font-bold text-marketing-text font-mono text-[11px]">CASE TRANSFORM</label>
            <select 
              id="recipe-case" 
              class="w-full px-3 py-2 rounded-lg bg-marketing-surface border border-marketing-border text-marketing-text font-mono text-xs focus:border-accent outline-none"
            >
              <option value="preserve" ${this.recipe.caseTransform === 'preserve' ? 'selected' : ''}>Preserve Case</option>
              <option value="lowercase" ${this.recipe.caseTransform === 'lowercase' ? 'selected' : ''}>lowercase</option>
              <option value="uppercase" ${this.recipe.caseTransform === 'uppercase' ? 'selected' : ''}>UPPERCASE</option>
            </select>
          </div>
        </div>

        <!-- Token Quick Insertion Chips -->
        <div class="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
          <span class="text-marketing-muted mr-1">Dynamic Tokens:</span>
          <button data-token="{name}" class="token-chip px-2 py-0.5 rounded bg-marketing-surface border border-marketing-border hover:border-accent text-marketing-text cursor-pointer">+{'{name}'}</button>
          <button data-token="{index}" class="token-chip px-2 py-0.5 rounded bg-marketing-surface border border-marketing-border hover:border-accent text-marketing-text cursor-pointer">+{'{index}'}</button>
          <button data-token="{date}" class="token-chip px-2 py-0.5 rounded bg-marketing-surface border border-marketing-border hover:border-accent text-marketing-text cursor-pointer">+{'{date}'}</button>
          <button data-token="{camera}" class="token-chip px-2 py-0.5 rounded bg-marketing-surface border border-marketing-border hover:border-accent text-marketing-text cursor-pointer">+{'{camera}'}</button>
          <button data-token="{fstop}" class="token-chip px-2 py-0.5 rounded bg-marketing-surface border border-marketing-border hover:border-accent text-marketing-text cursor-pointer">+{'{fstop}'}</button>
          <button data-token="{iso}" class="token-chip px-2 py-0.5 rounded bg-marketing-surface border border-marketing-border hover:border-accent text-marketing-text cursor-pointer">+{'{iso}'}</button>
        </div>

        <!-- Export Action Bar -->
        <div class="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-marketing-surface border border-marketing-border">
          <div class="text-xs text-marketing-muted font-mono">
            <span>Target: </span>
            <span class="font-bold text-marketing-text">${items.length} files</span>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <button id="download-bash-btn" class="px-3.5 py-1.5 rounded-xl bg-marketing-surface hover:bg-marketing-surface-hover border border-marketing-border text-marketing-text text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              <span>Mac / Linux Script (.sh)</span>
            </button>

            <button id="download-ps-btn" class="px-3.5 py-1.5 rounded-xl bg-marketing-surface hover:bg-marketing-surface-hover border border-marketing-border text-marketing-text text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              <span>Windows Script (.ps1)</span>
            </button>

            <button id="download-csv-mapping-btn" class="px-3.5 py-1.5 rounded-xl bg-marketing-surface hover:bg-marketing-surface-hover border border-marketing-border text-marketing-text text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer">
              <span>Rename CSV Manifest</span>
            </button>

            <button id="apply-to-studio-btn" class="px-3.5 py-1.5 rounded-xl bg-accent hover:bg-accent-hover text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer">
              <span>Apply to Workspace</span>
            </button>
          </div>
        </div>

        <!-- Before & After Comparison Table -->
        <div class="border border-marketing-border rounded-2xl overflow-hidden shadow-xs bg-marketing-panel/50">
          <div class="overflow-x-auto max-h-[380px] overflow-y-auto">
            <table class="w-full text-left text-xs font-mono">
              <thead class="bg-marketing-surface border-b border-marketing-border text-marketing-muted text-[11px] sticky top-0 z-10">
                <tr>
                  <th class="p-3 w-12 text-center">#</th>
                  <th class="p-3">Original Filename</th>
                  <th class="p-3 text-accent-ink font-bold">New Computed Name</th>
                  <th class="p-3">Dimensions</th>
                  <th class="p-3">File Size</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-marketing-border text-marketing-text">
                ${items.slice(0, 50).map((item, idx) => `
                  <tr class="hover:bg-marketing-surface/40 transition-colors">
                    <td class="p-3 text-center text-marketing-muted">${idx + 1}</td>
                    <td class="p-3 truncate max-w-[200px] text-marketing-muted">${escapeHtml(item.originalName)}</td>
                    <td class="p-3 font-bold text-accent-ink truncate max-w-[260px]">${escapeHtml(item.newName)}</td>
                    <td class="p-3 text-marketing-muted">${this.localImages[idx]?.width || '-'} × ${this.localImages[idx]?.height || '-'}</td>
                    <td class="p-3 text-marketing-muted">${Math.round(item.size / 1024)} KB</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          ${items.length > 50 ? `<div class="p-2.5 text-center text-xs text-marketing-muted border-t border-marketing-border bg-marketing-surface">Showing first 50 of ${items.length} files (all ${items.length} will be renamed in export).</div>` : ''}
        </div>

      </div>
    `;
  }

  private renderExifTab(): string {
    return `
      <div class="space-y-6">
        <!-- Quick Export Bar -->
        <div class="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-marketing-surface border border-marketing-border">
          <div class="text-xs text-marketing-muted font-mono">
            <span>Extracted EXIF Data: </span>
            <span class="font-bold text-marketing-text">${this.localImages.length} photos</span>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <button id="export-exif-csv-btn" class="px-3.5 py-1.5 rounded-xl bg-accent hover:bg-accent-hover text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer">
              <span>Export Technical EXIF (CSV)</span>
            </button>
            <button id="export-lightroom-syntax-btn" class="px-3.5 py-1.5 rounded-xl bg-marketing-surface hover:bg-marketing-surface-hover border border-marketing-border text-marketing-text text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer">
              <span>Lightroom Search Filter (TXT)</span>
            </button>
          </div>
        </div>

        <!-- EXIF Table -->
        <div class="border border-marketing-border rounded-2xl overflow-hidden shadow-xs bg-marketing-panel/50">
          <div class="overflow-x-auto max-h-[420px] overflow-y-auto">
            <table class="w-full text-left text-xs font-mono">
              <thead class="bg-marketing-surface border-b border-marketing-border text-marketing-muted text-[11px] sticky top-0 z-10">
                <tr>
                  <th class="p-3 w-12 text-center">#</th>
                  <th class="p-3">Filename</th>
                  <th class="p-3">Camera</th>
                  <th class="p-3">Lens</th>
                  <th class="p-3">Focal Length</th>
                  <th class="p-3">Aperture</th>
                  <th class="p-3">Shutter</th>
                  <th class="p-3">ISO</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-marketing-border text-marketing-text">
                ${this.localImages.slice(0, 50).map((img, idx) => `
                  <tr class="hover:bg-marketing-surface/40 transition-colors">
                    <td class="p-3 text-center text-marketing-muted">${idx + 1}</td>
                    <td class="p-3 font-semibold truncate max-w-[180px]">${escapeHtml(img.name)}</td>
                    <td class="p-3 text-marketing-muted">${escapeHtml(img.exif?.cameraModel || img.exif?.cameraMake || '—')}</td>
                    <td class="p-3 text-marketing-muted truncate max-w-[160px]">${escapeHtml(img.exif?.lensModel || '—')}</td>
                    <td class="p-3 text-marketing-muted">${escapeHtml(img.exif?.focalLength || '—')}</td>
                    <td class="p-3 font-bold text-accent-ink">${escapeHtml(img.exif?.fNumber || '—')}</td>
                    <td class="p-3 text-marketing-muted">${escapeHtml(img.exif?.exposureTime || '—')}</td>
                    <td class="p-3 text-marketing-muted">${escapeHtml(img.exif?.iso ? `ISO ${img.exif.iso}` : '—')}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  private renderConvertTab(): string {
    return `
      <div class="space-y-6">
        <div class="p-6 rounded-2xl bg-marketing-panel/80 border border-marketing-border space-y-6">
          
          <div class="flex flex-wrap gap-2 text-xs mb-2">
            <button class="preset-btn px-3 py-1.5 rounded-lg bg-marketing-surface border border-marketing-border hover:border-accent text-marketing-text transition-colors" data-preset="insta">Instagram 1:1</button>
            <button class="preset-btn px-3 py-1.5 rounded-lg bg-marketing-surface border border-marketing-border hover:border-accent text-marketing-text transition-colors" data-preset="wide">Widescreen 16:9</button>
            <button class="preset-btn px-3 py-1.5 rounded-lg bg-marketing-surface border border-marketing-border hover:border-accent text-marketing-text transition-colors" data-preset="web">Web 1080p WebP</button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-xs">
            
            <!-- Format Selector -->
            <div class="space-y-2">
              <label class="font-bold text-marketing-text font-mono text-[11px]">TARGET FORMAT</label>
              <select id="convert-format-select" class="w-full px-3 py-2.5 rounded-xl bg-marketing-surface border border-marketing-border text-marketing-text font-mono text-xs focus:border-accent outline-none">
                <option value="image/jpeg" ${this.convertFormat === 'image/jpeg' ? 'selected' : ''}>JPEG (.jpg)</option>
                <option value="image/webp" ${this.convertFormat === 'image/webp' ? 'selected' : ''}>WebP (.webp)</option>
                <option value="image/png" ${this.convertFormat === 'image/png' ? 'selected' : ''}>PNG (.png)</option>
              </select>
            </div>

            <!-- Max Dimension Constraint -->
            <div class="space-y-2">
              <label class="font-bold text-marketing-text font-mono text-[11px]">MAX EDGE RESOLUTION</label>
              <select id="convert-dimension-select" class="w-full px-3 py-2.5 rounded-xl bg-marketing-surface border border-marketing-border text-marketing-text font-mono text-xs focus:border-accent outline-none">
                <option value="0" ${this.convertMaxDimension === 0 ? 'selected' : ''}>Original Resolution</option>
                <option value="1920" ${this.convertMaxDimension === 1920 ? 'selected' : ''}>1080p Full HD (1920px)</option>
                <option value="2560" ${this.convertMaxDimension === 2560 ? 'selected' : ''}>1440p 2K QHD (2560px)</option>
                <option value="3840" ${this.convertMaxDimension === 3840 ? 'selected' : ''}>4K Ultra HD (3840px)</option>
                <option value="1200" ${this.convertMaxDimension === 1200 ? 'selected' : ''}>Web Standard (1200px)</option>
              </select>
            </div>

            <!-- Aspect Ratio Crop -->
            <div class="space-y-2">
              <label class="font-bold text-marketing-text font-mono text-[11px]">ASPECT RATIO CROP</label>
              <select id="convert-aspect-ratio-select" class="w-full px-3 py-2.5 rounded-xl bg-marketing-surface border border-marketing-border text-marketing-text font-mono text-xs focus:border-accent outline-none">
                <option value="original" ${this.convertAspectRatio === 'original' ? 'selected' : ''}>Original (No Crop)</option>
                <option value="1:1" ${this.convertAspectRatio === '1:1' ? 'selected' : ''}>1:1 Square</option>
                <option value="4:5" ${this.convertAspectRatio === '4:5' ? 'selected' : ''}>4:5 Portrait</option>
                <option value="16:9" ${this.convertAspectRatio === '16:9' ? 'selected' : ''}>16:9 Widescreen</option>
                <option value="9:16" ${this.convertAspectRatio === '9:16' ? 'selected' : ''}>9:16 Story</option>
                <option value="3:2" ${this.convertAspectRatio === '3:2' ? 'selected' : ''}>3:2 Classic</option>
              </select>
            </div>

            <!-- Quality Slider -->
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <label class="font-bold text-marketing-text font-mono text-[11px]">IMAGE QUALITY</label>
                <span class="font-mono text-accent-ink font-bold" id="quality-val">${Math.round(this.convertQuality * 100)}%</span>
              </div>
              <input 
                type="range" 
                id="convert-quality-slider" 
                min="0.4" 
                max="1.0" 
                step="0.02" 
                value="${this.convertQuality}" 
                class="w-full accent-accent cursor-pointer"
              />
            </div>

          </div>

          <!-- Progress Bar (if active) -->
          ${this.isProcessing ? `
            <div class="space-y-2 p-4 rounded-xl bg-marketing-surface border border-marketing-border">
              <div class="flex justify-between text-xs font-mono">
                <span class="text-marketing-text font-semibold">${this.progressStatus}</span>
                <span class="text-accent-ink font-bold">${this.progressPercent}%</span>
              </div>
              <div class="w-full h-2 rounded-full bg-marketing-panel overflow-hidden">
                <div class="h-full bg-accent transition-all duration-150" style="width: ${this.progressPercent}%"></div>
              </div>
            </div>
          ` : `
            <button 
              id="start-batch-convert-btn" 
              class="w-full py-3.5 px-6 rounded-xl bg-accent hover:bg-accent-hover text-white font-bold text-sm tracking-tight shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              <span>Convert &amp; Download ${this.localImages.length} Files</span>
            </button>
          `}
        </div>
      </div>
    `;
  }

  private attachEvents(): void {
    // Tab switching
    this.container.querySelectorAll<HTMLButtonElement>('.tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab as 'rename' | 'exif' | 'convert';
        if (tab) {
          this.activeTab = tab;
          this.render();
        }
      });
    });

    // File Drop Zone
    const dropzone = this.container.querySelector('#batch-dropzone-box');
    if (dropzone) {
      dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('border-accent', 'bg-accent/5');
      });
      dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('border-accent', 'bg-accent/5');
      });
      dropzone.addEventListener('drop', (e: any) => {
        e.preventDefault();
        dropzone.classList.remove('border-accent', 'bg-accent/5');
        if (e.dataTransfer?.files?.length) {
          this.handleFiles(Array.from(e.dataTransfer.files));
        }
      });
      dropzone.addEventListener('click', () => {
        (this.container.querySelector('#batch-file-input') as HTMLInputElement)?.click();
      });
    }

    // File & Folder Inputs
    const fileInput = this.container.querySelector('#batch-file-input') as HTMLInputElement;
    fileInput?.addEventListener('change', (e: any) => {
      if (e.target?.files?.length) {
        this.handleFiles(Array.from(e.target.files));
      }
    });

    const folderInput = this.container.querySelector('#batch-folder-input') as HTMLInputElement;
    folderInput?.addEventListener('change', (e: any) => {
      if (e.target?.files?.length) {
        this.handleFiles(Array.from(e.target.files));
      }
    });

    // Clear Button
    const clearBtn = this.container.querySelector('#batch-clear-btn');
    clearBtn?.addEventListener('click', () => {
      this.localImages = [];
      this.render();
    });

    // Recipe Input Changes
    const prefixInp = this.container.querySelector('#recipe-prefix') as HTMLInputElement;
    prefixInp?.addEventListener('input', () => {
      this.recipe.prefix = prefixInp.value;
      this.syncRenameTable();
    });

    const startInp = this.container.querySelector('#recipe-start') as HTMLInputElement;
    startInp?.addEventListener('input', () => {
      this.recipe.startNumber = parseInt(startInp.value, 10) || 1;
      this.syncRenameTable();
    });

    const padSel = this.container.querySelector('#recipe-padding') as HTMLSelectElement;
    padSel?.addEventListener('change', () => {
      this.recipe.padding = parseInt(padSel.value, 10) || 3;
      this.syncRenameTable();
    });

    const suffInp = this.container.querySelector('#recipe-suffix') as HTMLInputElement;
    suffInp?.addEventListener('input', () => {
      this.recipe.suffix = suffInp.value;
      this.syncRenameTable();
    });

    const caseSel = this.container.querySelector('#recipe-case') as HTMLSelectElement;
    caseSel?.addEventListener('change', () => {
      this.recipe.caseTransform = caseSel.value as any;
      this.syncRenameTable();
    });

    // Token Chips
    this.container.querySelectorAll<HTMLButtonElement>('.token-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        const token = chip.dataset.token || '';
        this.recipe.suffix = this.recipe.suffix ? `${this.recipe.suffix}_${token}` : token;
        const sInp = this.container.querySelector('#recipe-suffix') as HTMLInputElement;
        if (sInp) sInp.value = this.recipe.suffix;
        this.syncRenameTable();
      });
    });

    // Export Buttons
    this.container.querySelector('#download-bash-btn')?.addEventListener('click', () => {
      const items = generateBatchRenameItems(this.localImages, this.recipe);
      const script = generateBashRenameScript(items);
      downloadTextContent(script, 'batch-rename.sh', 'application/x-sh');
    });

    this.container.querySelector('#download-ps-btn')?.addEventListener('click', () => {
      const items = generateBatchRenameItems(this.localImages, this.recipe);
      const script = generatePowerShellRenameScript(items);
      downloadTextContent(script, 'batch-rename.ps1', 'text/plain');
    });

    this.container.querySelector('#download-csv-mapping-btn')?.addEventListener('click', () => {
      const items = generateBatchRenameItems(this.localImages, this.recipe);
      const csv = generateRenameMappingCSV(items);
      downloadTextContent(csv, 'rename-mapping.csv', 'text/csv');
    });

    this.container.querySelector('#apply-to-studio-btn')?.addEventListener('click', () => {
      const items = generateBatchRenameItems(this.localImages, this.recipe);
      const labelMap: Record<string, string> = {};
      items.forEach((item) => {
        labelMap[item.id] = item.newName;
      });
      batchSetCustomLabels(labelMap);
      window.location.href = '/#workspace';
    });

    // EXIF Tab Actions
    this.container.querySelector('#export-exif-csv-btn')?.addEventListener('click', () => {
      const items = generateBatchRenameItems(this.localImages, this.recipe);
      const csv = generateRenameMappingCSV(items);
      downloadTextContent(csv, 'photo-exif-data.csv', 'text/csv');
    });

    this.container.querySelector('#export-lightroom-syntax-btn')?.addEventListener('click', () => {
      const names = this.localImages.map((img) => img.name).join(', ');
      downloadTextContent(names, 'lightroom-search-query.txt', 'text/plain');
    });

    // Convert Controls
    const formatSel = this.container.querySelector('#convert-format-select') as HTMLSelectElement;
    formatSel?.addEventListener('change', () => {
      this.convertFormat = formatSel.value as any;
    });

    const dimSel = this.container.querySelector('#convert-dimension-select') as HTMLSelectElement;
    dimSel?.addEventListener('change', () => {
      this.convertMaxDimension = parseInt(dimSel.value, 10) || 0;
    });

    const aspectSel = this.container.querySelector('#convert-aspect-ratio-select') as HTMLSelectElement;
    aspectSel?.addEventListener('change', () => {
      this.convertAspectRatio = aspectSel.value as any;
    });

    const qSlider = this.container.querySelector('#convert-quality-slider') as HTMLInputElement;
    const qVal = this.container.querySelector('#quality-val');
    qSlider?.addEventListener('input', () => {
      this.convertQuality = parseFloat(qSlider.value);
      if (qVal) qVal.textContent = `${Math.round(this.convertQuality * 100)}%`;
    });

    this.container.querySelectorAll('.preset-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLButtonElement;
        const preset = target.dataset.preset;
        if (preset === 'insta') {
          this.convertAspectRatio = '1:1';
          this.convertMaxDimension = 1080;
          this.convertFormat = 'image/jpeg';
        } else if (preset === 'wide') {
          this.convertAspectRatio = '16:9';
          this.convertMaxDimension = 1920;
          this.convertFormat = 'image/jpeg';
        } else if (preset === 'web') {
          this.convertAspectRatio = 'original';
          this.convertMaxDimension = 1080;
          this.convertFormat = 'image/webp';
        }
        this.render();
      });
    });

    this.container.querySelector('#start-batch-convert-btn')?.addEventListener('click', () => {
      this.executeBatchConversion();
    });
  }

  private async handleFiles(files: File[]): Promise<void> {
    const valid = files.filter(f => f.type.startsWith('image/') || /\.(jpg|jpeg|png|webp|avif|heic|heif|cr2|cr3|nef|arw|dng|orf|rw2|raf|pef)$/i.test(f.name));
    if (valid.length === 0) return;

    this.isProcessing = true;
    this.render();

    try {
      const loaded = await loadImagesFromFiles(valid);
      this.localImages = [...this.localImages, ...loaded];
      addImages(loaded);
    } catch (err) {
      console.warn('Failed to load batch items:', err);
    }

    this.isProcessing = false;
    this.render();
  }

  private syncRenameTable(): void {
    const items = generateBatchRenameItems(this.localImages, this.recipe);
    const tbody = this.container.querySelector('tbody');
    if (!tbody) return;

    tbody.innerHTML = items.slice(0, 50).map((item, idx) => `
      <tr class="hover:bg-marketing-surface/40 transition-colors">
        <td class="p-3 text-center text-marketing-muted">${idx + 1}</td>
        <td class="p-3 truncate max-w-[200px] text-marketing-muted">${escapeHtml(item.originalName)}</td>
        <td class="p-3 font-bold text-accent-ink truncate max-w-[260px]">${escapeHtml(item.newName)}</td>
        <td class="p-3 text-marketing-muted">${this.localImages[idx]?.width || '-'} × ${this.localImages[idx]?.height || '-'}</td>
        <td class="p-3 text-marketing-muted">${Math.round(item.size / 1024)} KB</td>
      </tr>
    `).join('');
  }

  private async executeBatchConversion(): Promise<void> {
    if (this.localImages.length === 0 || this.isProcessing) return;

    this.isProcessing = true;
    this.progressPercent = 0;
    this.progressStatus = 'Starting batch conversion...';
    this.render();

    const options = {
      targetFormat: this.convertFormat,
      quality: this.convertQuality,
      maxDimension: this.convertMaxDimension,
      aspectRatio: this.convertAspectRatio,
      cropMode: 'cover' as const,
    };

    for (let i = 0; i < this.localImages.length; i++) {
      const img = this.localImages[i];
      this.progressStatus = `Converting ${i + 1} of ${this.localImages.length}: ${img.name}`;
      this.progressPercent = Math.round(((i + 1) / this.localImages.length) * 100);
      this.render();

      try {
        const result = await convertAndResizeSingleImage(img.file, img.name, options);
        downloadBlob(result.blob, result.filename);
        // Small async pause to yield execution
        await new Promise((r) => setTimeout(r, 40));
      } catch (err) {
        console.error('Batch convert failed for:', img.name, err);
      }
    }

    this.isProcessing = false;
    this.progressStatus = 'Batch conversion completed!';
    this.render();
  }
}
