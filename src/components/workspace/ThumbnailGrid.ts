import { 
  $filteredImages, 
  $selectedImageId, 
  $images,
  removeImage, 
  reorderImages, 
  setImageStatus,
  setImageCustomLabel,
  batchSetCustomLabels,
  batchClearCustomLabels,
} from '../../lib/store';
import { formatBytes } from '../../lib/media/fileSanitizer';
import { escapeHtml } from '../../lib/utils';


/**
 * ThumbnailGrid manages the photo list in the studio sidebar:
 * - Drag and drop reordering with live insertion indicators
 * - Collapsible Batch Rename recipe builder (prefix, start #, padding, suffix)
 * - Single photo inline custom label editing with instant revert
 * - Quick review status tagging (keep, flag, reject, remove)
 * - Zero-loss input focus and non-destructive event synchronization
 */
export class ThumbnailGrid {
  private container: HTMLElement;
  private draggedIndex: number | null = null;
  private editingImageId: string | null = null;

  // Batch rename recipe state
  private recipePrefix: string = 'IMG_';
  private recipeStart: number = 1;
  private recipePadding: number = 3;
  private recipeSuffix: string = '';
  private isRecipeOpen: boolean = false;

  constructor(container: HTMLElement) {
    this.container = container;
    this.render();
    this.setupStoreSubscriptions();
  }

  private getSamplePreview(firstImage?: { name: string }): string {
    const sampleFilename = firstImage?.name || 'DSC_0001.JPG';
    return this.computeLabel(sampleFilename, 0);
  }

  private computeLabel(originalFilename: string, index: number): string {
    const num = Math.max(0, this.recipeStart) + index;
    const formattedNum = this.recipePadding > 0 
      ? String(num).padStart(this.recipePadding, '0') 
      : String(num);

    const cleanSuffix = this.recipeSuffix.trim();
    let formattedSuffix = '';
    if (cleanSuffix) {
      formattedSuffix = cleanSuffix.startsWith('_') || cleanSuffix.startsWith('-')
        ? cleanSuffix
        : `_${cleanSuffix}`;
    }

    const extMatch = originalFilename.match(/\.[a-zA-Z0-9]+$/);
    const ext = extMatch ? extMatch[0] : '';
    return `${this.recipePrefix}${formattedNum}${formattedSuffix}${ext}`;
  }

  private render() {
    const allImages = $images.get();
    const filteredImages = $filteredImages.get();

    if (allImages.length === 0) {
      this.container.innerHTML = `
        <div class="flex flex-col items-center justify-center p-8 text-center text-workspace-muted text-xs">
          <p>No photos added yet</p>
        </div>
      `;
      return;
    }

    // If the shell structure (batch rename header + items container) does not exist, build it once.
    const batchRenameSection = this.container.querySelector('#batch-rename-section');
    const itemList = this.container.querySelector('#thumbnail-item-list');

    if (!batchRenameSection || !itemList) {
      this.container.innerHTML = `
        <div id="thumbnail-grid-root" class="flex flex-col min-h-full">
          <!-- Sticky Collapsible Batch Rename Recipe Section -->
          <div id="batch-rename-section" class="sticky top-0 z-10 bg-workspace-panel border-b border-workspace-border shadow-xs">
            ${this.renderBatchRenameHTML(filteredImages.length)}
          </div>

          <!-- Thumbnail Items List -->
          <div class="flex flex-col gap-2 p-2.5 flex-1" id="thumbnail-item-list"></div>
        </div>
      `;
      this.attachBatchRenameEvents();
    }

    this.renderItemList();
    this.syncBatchRenameUI();
    this.paintSelection();
  }

  private renderBatchRenameHTML(photoCount: number): string {
    const images = $filteredImages.get();
    const samplePreview = this.getSamplePreview(images[0]);

    return `
      <details id="batch-rename-details" class="group/batch" ${this.isRecipeOpen ? 'open' : ''}>
        <summary class="flex items-center justify-between px-3 py-2 cursor-pointer select-none text-xs font-semibold text-workspace-muted hover:text-workspace-text transition-colors outline-none list-none">
          <span class="flex items-center gap-1.5 min-w-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-accent-ink shrink-0">
              <path d="m18 5-3-3H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2"/>
              <path d="M8 18h1"/>
              <path d="M12 18h1"/>
              <path d="m15 11 3 3"/>
              <path d="m14 15 4-4"/>
            </svg>
            <span class="text-[11px] font-bold tracking-tight truncate">Batch Rename Labels</span>
          </span>
          <div class="flex items-center gap-1.5 shrink-0">
            <span id="batch-rename-badge" class="text-[10px] font-mono text-workspace-muted bg-workspace-surface px-1.5 py-0.5 rounded border border-workspace-border">
              ${photoCount} photos
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-workspace-muted transition-transform duration-200 group-open/batch:rotate-180">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </div>
        </summary>

        <div class="p-3 pt-1 flex flex-col gap-2.5 border-t border-workspace-border/50 bg-workspace-bg/40">
          <!-- Row 1: Prefix and Start # -->
          <div class="grid grid-cols-3 gap-2">
            <div class="col-span-2">
              <label for="batch-rename-prefix" class="block text-[10px] font-medium text-workspace-muted mb-1">Prefix</label>
              <input 
                type="text" 
                id="batch-rename-prefix" 
                value="${this.recipePrefix}" 
                placeholder="e.g. IMG_ or SHOOT_"
                class="w-full h-7 px-2 rounded-md bg-workspace-surface border border-workspace-border text-xs text-workspace-text placeholder:text-workspace-muted/50 focus:border-accent focus:outline-none transition-colors" 
              />
            </div>
            <div class="col-span-1">
              <label for="batch-rename-start" class="block text-[10px] font-medium text-workspace-muted mb-1">Start #</label>
              <input 
                type="number" 
                id="batch-rename-start" 
                value="${this.recipeStart}" 
                min="0"
                step="1"
                class="w-full h-7 px-2 rounded-md bg-workspace-surface border border-workspace-border text-xs font-mono text-workspace-text focus:border-accent focus:outline-none transition-colors" 
              />
            </div>
          </div>

          <!-- Row 2: Padding and Suffix -->
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label for="batch-rename-padding" class="block text-[10px] font-medium text-workspace-muted mb-1">Number Padding</label>
              <select 
                id="batch-rename-padding" 
                class="w-full h-7 px-1.5 rounded-md bg-workspace-surface border border-workspace-border text-xs text-workspace-text focus:border-accent focus:outline-none cursor-pointer transition-colors"
              >
                <option value="3" ${this.recipePadding === 3 ? 'selected' : ''}>3 digits (001)</option>
                <option value="4" ${this.recipePadding === 4 ? 'selected' : ''}>4 digits (0001)</option>
                <option value="2" ${this.recipePadding === 2 ? 'selected' : ''}>2 digits (01)</option>
                <option value="0" ${this.recipePadding === 0 ? 'selected' : ''}>Unpadded (1, 2...)</option>
                <option value="5" ${this.recipePadding === 5 ? 'selected' : ''}>5 digits (00001)</option>
              </select>
            </div>
            <div>
              <label for="batch-rename-suffix" class="block text-[10px] font-medium text-workspace-muted mb-1">Suffix <span class="text-workspace-muted/60 font-normal">(optional)</span></label>
              <input 
                type="text" 
                id="batch-rename-suffix" 
                value="${this.recipeSuffix}" 
                placeholder="e.g. edit or proof"
                class="w-full h-7 px-2 rounded-md bg-workspace-surface border border-workspace-border text-xs text-workspace-text placeholder:text-workspace-muted/50 focus:border-accent focus:outline-none transition-colors" 
              />
            </div>
          </div>

          <!-- Sample Live Preview -->
          <div class="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg bg-workspace-surface/80 border border-workspace-border text-[11px]">
            <span class="text-workspace-muted text-[10px] font-medium shrink-0">Sample label:</span>
            <span id="batch-rename-preview-sample" class="font-mono font-bold text-[11px] text-accent-ink bg-accent/10 px-1.5 py-0.5 rounded border border-accent/20 truncate max-w-[170px]" title="${samplePreview}">
              ${samplePreview}
            </span>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center gap-2 pt-0.5">
            <button 
              type="button" 
              id="btn-apply-batch-rename" 
              class="flex-1 h-7.5 px-3 rounded-lg bg-accent hover:bg-accent-hover text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              title="Apply recipe to rename ${photoCount} photos"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span id="btn-apply-batch-rename-label">Apply Recipe (${photoCount})</span>
            </button>

            <button 
              type="button" 
              id="btn-reset-batch-rename" 
              class="h-7.5 px-2.5 rounded-lg bg-workspace-surface hover:bg-workspace-surface-hover text-workspace-muted hover:text-amber-600 dark:hover:text-amber-400 text-xs font-medium border border-workspace-border flex items-center justify-center gap-1 transition-colors cursor-pointer"
              title="Clear all custom labels and revert to original filenames"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                <path d="M3 3v5h5"></path>
              </svg>
              <span>Reset All</span>
            </button>
          </div>
        </div>
      </details>
    `;
  }

  private attachBatchRenameEvents() {
    const details = this.container.querySelector<HTMLDetailsElement>('#batch-rename-details');
    const prefixInput = this.container.querySelector<HTMLInputElement>('#batch-rename-prefix');
    const startInput = this.container.querySelector<HTMLInputElement>('#batch-rename-start');
    const paddingSelect = this.container.querySelector<HTMLSelectElement>('#batch-rename-padding');
    const suffixInput = this.container.querySelector<HTMLInputElement>('#batch-rename-suffix');
    const applyBtn = this.container.querySelector<HTMLButtonElement>('#btn-apply-batch-rename');
    const resetBtn = this.container.querySelector<HTMLButtonElement>('#btn-reset-batch-rename');

    details?.addEventListener('toggle', () => {
      this.isRecipeOpen = details.open;
    });

    prefixInput?.addEventListener('input', () => {
      this.recipePrefix = prefixInput.value;
      this.syncBatchRenameUI();
    });

    startInput?.addEventListener('input', () => {
      this.recipeStart = parseInt(startInput.value, 10) || 0;
      this.syncBatchRenameUI();
    });

    paddingSelect?.addEventListener('change', () => {
      this.recipePadding = parseInt(paddingSelect.value, 10) || 0;
      this.syncBatchRenameUI();
    });

    suffixInput?.addEventListener('input', () => {
      this.recipeSuffix = suffixInput.value;
      this.syncBatchRenameUI();
    });

    applyBtn?.addEventListener('click', () => {
      const images = $filteredImages.get();
      if (images.length === 0) return;

      const labelsMap = new Map<string, string>();
      images.forEach((img, index) => {
        const newName = this.computeLabel(img.name, index);
        labelsMap.set(img.id, newName);
      });

      batchSetCustomLabels(labelsMap);
    });

    resetBtn?.addEventListener('click', () => {
      batchClearCustomLabels();
    });
  }

  private syncBatchRenameUI() {
    const images = $filteredImages.get();
    const sample = this.getSamplePreview(images[0]);

    const badge = this.container.querySelector('#batch-rename-badge');
    if (badge) {
      badge.textContent = `${images.length} photos`;
    }

    const applyBtnLabel = this.container.querySelector('#btn-apply-batch-rename-label');
    if (applyBtnLabel) {
      applyBtnLabel.textContent = `Apply Recipe (${images.length})`;
    }

    const previewSample = this.container.querySelector('#batch-rename-preview-sample');
    if (previewSample) {
      previewSample.textContent = sample;
      previewSample.setAttribute('title', sample);
    }
  }

  private renderItemList() {
    const itemList = this.container.querySelector('#thumbnail-item-list');
    if (!itemList) return;

    const images = $filteredImages.get();
    const selectedId = $selectedImageId.get();

    if (images.length === 0) {
      itemList.innerHTML = `
        <div class="flex flex-col items-center justify-center p-8 text-center text-workspace-muted text-xs">
          <p>No photos match current filter</p>
        </div>
      `;
      return;
    }

    itemList.innerHTML = images.map((img, index) => {
      const isSelected = img.id === selectedId;
      const isEditing = this.editingImageId === img.id;
      const displayLabel = img.customLabel || img.sanitizedName;
      const hasCustomLabel = Boolean(img.customLabel && img.customLabel.trim());

      return `
        <div 
          class="photo-tray-item group relative flex items-center gap-2 p-2 rounded-xl border transition-all cursor-pointer select-none ${
            isSelected 
              ? 'bg-workspace-surface border-accent shadow-xs' 
              : 'bg-workspace-surface/50 border-workspace-border hover:border-stone-400 dark:hover:border-stone-600'
          }"
          data-id="${img.id}"
          data-index="${index}"
          draggable="${!isEditing}"
        >
          <!-- Drag Handle & Index -->
          <div class="flex items-center gap-1 text-workspace-muted cursor-grab active:cursor-grabbing shrink-0" title="Drag to arrange order">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-40 group-hover:opacity-100 transition-opacity">
              <circle cx="9" cy="5" r="1"></circle>
              <circle cx="9" cy="12" r="1"></circle>
              <circle cx="9" cy="19" r="1"></circle>
              <circle cx="15" cy="5" r="1"></circle>
              <circle cx="15" cy="12" r="1"></circle>
              <circle cx="15" cy="19" r="1"></circle>
            </svg>
            <span class="text-[10px] font-mono w-3.5 text-right">
              ${index + 1}
            </span>
          </div>

          <!-- Thumbnail Preview -->
          <div class="w-11 h-11 rounded-lg overflow-hidden bg-black/10 dark:bg-black/40 shrink-0 flex items-center justify-center border border-workspace-border">
            <img src="${img.thumbnailUrl || img.previewUrl}" alt="${img.sanitizedName}" class="w-full h-full object-cover pointer-events-none" loading="lazy" />
          </div>

          <!-- Metadata & Custom Label -->
          <div class="flex-1 min-w-0 pr-1">
            ${isEditing ? `
              <form class="flex items-center gap-1 label-edit-form" data-id="${img.id}">
                <input 
                  type="text" 
                  name="customLabel" 
                  value="${escapeHtml(img.customLabel ?? img.sanitizedName)}" 
                  class="w-full h-6 px-1.5 rounded bg-workspace-bg border border-accent text-xs font-medium text-workspace-text focus:outline-none"
                  placeholder="Custom label"
                  autofocus
                />
                <button type="submit" class="h-6 px-1.5 rounded bg-accent text-white text-[10px] font-bold shrink-0 cursor-pointer" title="Save label">✓</button>
                <button type="button" data-action="cancel-edit" class="h-6 px-1.5 rounded bg-workspace-surface text-workspace-muted text-[10px] shrink-0 hover:text-workspace-text cursor-pointer" title="Cancel">✕</button>
              </form>
            ` : `
              <div class="flex items-center gap-1.5 group/label">
                <div 
                  class="text-xs font-semibold truncate ${hasCustomLabel ? 'text-accent-ink font-bold' : 'text-workspace-text'}" 
                  title="${escapeHtml(displayLabel)} (Original: ${escapeHtml(img.sanitizedName)})"
                >
                  ${escapeHtml(displayLabel)}
                </div>
                <button 
                  type="button" 
                  data-action="edit-label" 
                  data-id="${img.id}" 
                  class="opacity-0 group-hover/label:opacity-100 p-0.5 text-workspace-muted hover:text-accent-ink transition-opacity cursor-pointer shrink-0" 
                  title="Edit custom label"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                    <path d="m15 5 4 4"></path>
                  </svg>
                </button>
                ${hasCustomLabel ? `
                  <button 
                    type="button" 
                    data-action="reset-label" 
                    data-id="${img.id}" 
                    class="p-0.5 text-workspace-muted hover:text-amber-500 transition-colors cursor-pointer shrink-0" 
                    title="Revert to filename (${img.sanitizedName})"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                      <path d="M3 3v5h5"></path>
                    </svg>
                  </button>
                ` : ''}
              </div>
              <div class="text-[10px] text-workspace-muted flex items-center gap-1.5 mt-0.5 font-mono">
                <span>${img.width}×${img.height}</span>
                <span>·</span>
                <span>${formatBytes(img.size)}</span>
              </div>
            `}
          </div>

          <!-- Quick Status Buttons -->
          <div class="flex items-center gap-1 shrink-0">
            <button 
              data-action="keep" 
              data-id="${img.id}" 
              class="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${img.status === 'keep' ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500' : 'text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400'}"
              title="Keep (1)"
            >
              ✓
            </button>
            <button 
              data-action="flag" 
              data-id="${img.id}" 
              class="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${img.status === 'flag' ? 'bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500' : 'text-stone-400 hover:text-amber-600 dark:hover:text-amber-400'}"
              title="Flag (2)"
            >
              ★
            </button>
            <button 
              data-action="reject" 
              data-id="${img.id}" 
              class="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${img.status === 'reject' ? 'bg-rose-500/20 text-rose-700 dark:text-rose-400 border border-rose-500' : 'text-stone-400 hover:text-rose-600 dark:hover:text-rose-400'}"
              title="Reject (3)"
            >
              ✕
            </button>
            <button 
              data-action="remove" 
              data-id="${img.id}" 
              class="w-6 h-6 rounded-md flex items-center justify-center text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 text-xs transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
              title="Remove Image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
            </button>
          </div>
        </div>
      `;
    }).join('');

    this.attachItemListEvents();
  }

  private attachItemListEvents() {
    const items = this.container.querySelectorAll<HTMLElement>('.photo-tray-item');

    items.forEach((item) => {
      // Click to select
      item.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const actionBtn = target.closest('button, input, form');
        if (actionBtn) return; // handled separately

        const id = item.getAttribute('data-id');
        if (id) $selectedImageId.set(id);
      });

      // Drag and Drop arrangement
      item.addEventListener('dragstart', (e) => {
        const dragEvent = e as DragEvent;
        this.draggedIndex = parseInt(item.getAttribute('data-index') || '0', 10);
        item.classList.add('opacity-40', 'scale-[0.98]');
        if (dragEvent.dataTransfer) {
          dragEvent.dataTransfer.effectAllowed = 'move';
          dragEvent.dataTransfer.setData('text/plain', this.draggedIndex.toString());
        }
      });

      item.addEventListener('dragend', () => {
        item.classList.remove('opacity-40', 'scale-[0.98]');
        items.forEach((el) => el.classList.remove('ring-2', 'ring-accent', 'border-accent', 'bg-accent/10'));
        this.draggedIndex = null;
      });

      item.addEventListener('dragover', (e) => {
        e.preventDefault();
        const dragEvent = e as DragEvent;
        if (dragEvent.dataTransfer) {
          dragEvent.dataTransfer.dropEffect = 'move';
        }
        item.classList.add('border-accent', 'bg-accent/10');
      });

      item.addEventListener('dragleave', () => {
        item.classList.remove('border-accent', 'bg-accent/10');
      });

      item.addEventListener('drop', (e) => {
        e.preventDefault();
        item.classList.remove('border-accent', 'bg-accent/10');
        const dropIndex = parseInt(item.getAttribute('data-index') || '0', 10);
        if (this.draggedIndex !== null && this.draggedIndex !== dropIndex) {
          reorderImages(this.draggedIndex, dropIndex);
        }
        this.draggedIndex = null;
      });
    });

    // Label Edit Forms
    this.container.querySelectorAll<HTMLFormElement>('.label-edit-form').forEach((form) => {
      const input = form.querySelector<HTMLInputElement>('input[name="customLabel"]');
      if (input) {
        input.focus();
        input.select();
      }

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = form.getAttribute('data-id');
        if (id && input) {
          setImageCustomLabel(id, input.value);
        }
        this.editingImageId = null;
        this.renderItemList();
      });

      input?.addEventListener('blur', (e) => {
        // Only trigger blur save if not clicking the cancel button
        const related = e.relatedTarget as HTMLElement | null;
        if (related && related.getAttribute('data-action') === 'cancel-edit') return;
        const id = form.getAttribute('data-id');
        if (id && input) {
          setImageCustomLabel(id, input.value);
        }
        this.editingImageId = null;
        this.renderItemList();
      });
    });

    // Action buttons
    this.container.querySelectorAll('button[data-action]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.getAttribute('data-action');
        const id = btn.getAttribute('data-id');

        if (action === 'edit-label' && id) {
          this.editingImageId = id;
          this.renderItemList();
        } else if (action === 'cancel-edit') {
          this.editingImageId = null;
          this.renderItemList();
        } else if (action === 'reset-label' && id) {
          setImageCustomLabel(id, '');
          this.renderItemList();
        } else if (action === 'keep' && id) {
          setImageStatus(id, 'keep');
        } else if (action === 'flag' && id) {
          setImageStatus(id, 'flag');
        } else if (action === 'reject' && id) {
          setImageStatus(id, 'reject');
        } else if (action === 'remove' && id) {
          removeImage(id);
        }
      });
    });
  }

  private paintSelection() {
    const selected = $selectedImageId.get();
    this.container.querySelectorAll<HTMLElement>('.photo-tray-item').forEach((item) => {
      const isSelected = item.getAttribute('data-id') === selected;
      if (isSelected) {
        item.classList.add('bg-workspace-surface', 'border-accent', 'shadow-xs');
        item.classList.remove('bg-workspace-surface/50', 'border-workspace-border');
      } else {
        item.classList.remove('bg-workspace-surface', 'border-accent', 'shadow-xs');
        item.classList.add('bg-workspace-surface/50', 'border-workspace-border');
      }
    });
  }

  private setupStoreSubscriptions() {
    $filteredImages.subscribe(() => {
      this.render();
    });
    $selectedImageId.subscribe(() => {
      this.paintSelection();
    });
  }
}

