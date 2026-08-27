import { 
  $filteredImages, 
  $selectedImageId, 
  removeImage, 
  reorderImages, 
  setImageStatus 
} from '../../lib/store';
import { formatBytes } from '../../lib/media/fileSanitizer';

export class ThumbnailGrid {
  private container: HTMLElement;
  private draggedIndex: number | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
    this.render();
    this.setupStoreSubscriptions();
  }

  private render() {
    const images = $filteredImages.get();
    const selectedId = $selectedImageId.get();

    if (images.length === 0) {
      this.container.innerHTML = `
        <div class="flex flex-col items-center justify-center p-8 text-center text-workspace-muted text-xs">
          <p>No photos match current filter</p>
        </div>
      `;
      return;
    }

    this.container.innerHTML = `
      <div class="flex flex-col gap-2 p-2.5" id="thumbnail-item-list">
        ${images.map((img, index) => {
          const isSelected = img.id === selectedId;
          return `
            <div 
              class="group relative flex items-center gap-2.5 p-2 rounded-xl border transition-all cursor-pointer ${
                isSelected 
                  ? 'bg-workspace-surface border-accent shadow-xs' 
                  : 'bg-workspace-surface/50 border-workspace-border hover:border-stone-400 dark:hover:border-stone-600'
              }"
              data-id="${img.id}"
              data-index="${index}"
              draggable="true"
            >
              <!-- Drag Handle & Index -->
              <span class="text-[10px] font-mono text-workspace-muted w-4 text-right">
                ${index + 1}
              </span>

              <!-- Thumbnail Preview -->
              <div class="w-12 h-12 rounded-lg overflow-hidden bg-black/10 dark:bg-black/40 flex-shrink-0 flex items-center justify-center border border-workspace-border">
                <img src="${img.thumbnailUrl || img.previewUrl}" alt="${img.sanitizedName}" class="w-full h-full object-cover" loading="lazy" />
              </div>

              <!-- Metadata & Filename -->
              <div class="flex-1 min-w-0 pr-1">
                <div class="text-xs font-semibold text-workspace-text truncate" title="${img.sanitizedName}">
                  ${img.sanitizedName}
                </div>
                <div class="text-[10px] text-workspace-muted flex items-center gap-1.5 mt-0.5 font-mono">
                  <span>${img.width}×${img.height}</span>
                  <span>·</span>
                  <span>${formatBytes(img.size)}</span>
                </div>
              </div>

              <!-- Quick Status Buttons -->
              <div class="flex items-center gap-1">
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
        }).join('')}
      </div>
    `;

    this.attachEvents();
  }

  private attachEvents() {
    const list = this.container.querySelectorAll('[data-id]');

    list.forEach((item) => {
      // Click to select
      item.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const actionBtn = target.closest('button[data-action]');
        if (actionBtn) return; // handled separately

        const id = item.getAttribute('data-id');
        if (id) $selectedImageId.set(id);
      });

      // Drag and drop reordering
      item.addEventListener('dragstart', (e) => {
        const dragEvent = e as DragEvent;
        this.draggedIndex = parseInt(item.getAttribute('data-index') || '0', 10);
        dragEvent.dataTransfer?.setData('text/plain', this.draggedIndex.toString());
      });

      item.addEventListener('dragover', (e) => {
        e.preventDefault();
      });

      item.addEventListener('drop', (e) => {
        e.preventDefault();
        const dropIndex = parseInt(item.getAttribute('data-index') || '0', 10);
        if (this.draggedIndex !== null && this.draggedIndex !== dropIndex) {
          reorderImages(this.draggedIndex, dropIndex);
        }
        this.draggedIndex = null;
      });
    });

    // Action buttons
    this.container.querySelectorAll('button[data-action]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.getAttribute('data-action');
        const id = btn.getAttribute('data-id');
        if (!id) return;

        if (action === 'keep') setImageStatus(id, 'keep');
        else if (action === 'flag') setImageStatus(id, 'flag');
        else if (action === 'reject') setImageStatus(id, 'reject');
        else if (action === 'remove') removeImage(id);
      });
    });
  }

  private setupStoreSubscriptions() {
    $filteredImages.subscribe(() => this.render());
    $selectedImageId.subscribe(() => this.render());
  }
}
