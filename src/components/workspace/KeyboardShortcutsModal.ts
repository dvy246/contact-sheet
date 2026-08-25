import { 
  $images, 
  $filteredImages, 
  $selectedImageId, 
  setImageStatus, 
  removeImage 
} from '../../lib/store';

export class KeyboardShortcutsManager {
  private modal: HTMLElement | null = null;
  private isOpen = false;

  constructor() {
    this.createModalDOM();
    this.setupGlobalListener();
  }

  private createModalDOM() {
    this.modal = document.createElement('div');
    this.modal.id = 'shortcuts-modal';
    this.modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 hidden animate-in fade-in duration-150';
    this.modal.innerHTML = `
      <div class="bg-workspace-panel border border-workspace-border rounded-xl shadow-2xl max-w-md w-full p-6 text-workspace-text space-y-5">
        <div class="flex items-center justify-between border-b border-workspace-border pb-3">
          <div class="flex items-center gap-2">
            <span class="text-base font-bold">Keyboard Shortcuts</span>
          </div>
          <button id="btn-close-shortcuts" class="p-1 rounded text-workspace-muted hover:text-workspace-text text-sm">✕</button>
        </div>

        <div class="grid grid-cols-2 gap-3 text-xs">
          <div class="flex items-center justify-between p-2 rounded bg-workspace-bg border border-workspace-border">
            <span class="text-emerald-400 font-medium">Mark Keep</span>
            <kbd class="px-2 py-0.5 rounded bg-workspace-surface border border-workspace-border font-mono font-bold">1</kbd>
          </div>
          <div class="flex items-center justify-between p-2 rounded bg-workspace-bg border border-workspace-border">
            <span class="text-amber-400 font-medium">Mark Flag</span>
            <kbd class="px-2 py-0.5 rounded bg-workspace-surface border border-workspace-border font-mono font-bold">2</kbd>
          </div>
          <div class="flex items-center justify-between p-2 rounded bg-workspace-bg border border-workspace-border">
            <span class="text-rose-400 font-medium">Mark Reject</span>
            <kbd class="px-2 py-0.5 rounded bg-workspace-surface border border-workspace-border font-mono font-bold">3</kbd>
          </div>
          <div class="flex items-center justify-between p-2 rounded bg-workspace-bg border border-workspace-border">
            <span class="text-zinc-300 font-medium">Reset Status</span>
            <kbd class="px-2 py-0.5 rounded bg-workspace-surface border border-workspace-border font-mono font-bold">0</kbd>
          </div>
          <div class="flex items-center justify-between p-2 rounded bg-workspace-bg border border-workspace-border">
            <span class="text-workspace-muted">Next Photo</span>
            <kbd class="px-2 py-0.5 rounded bg-workspace-surface border border-workspace-border font-mono">→</kbd>
          </div>
          <div class="flex items-center justify-between p-2 rounded bg-workspace-bg border border-workspace-border">
            <span class="text-workspace-muted">Prev Photo</span>
            <kbd class="px-2 py-0.5 rounded bg-workspace-surface border border-workspace-border font-mono">←</kbd>
          </div>
          <div class="flex items-center justify-between p-2 rounded bg-workspace-bg border border-workspace-border">
            <span class="text-rose-400">Remove Photo</span>
            <kbd class="px-2 py-0.5 rounded bg-workspace-surface border border-workspace-border font-mono">Del</kbd>
          </div>
          <div class="flex items-center justify-between p-2 rounded bg-workspace-bg border border-workspace-border">
            <span class="text-workspace-muted">Help Modal</span>
            <kbd class="px-2 py-0.5 rounded bg-workspace-surface border border-workspace-border font-mono">?</kbd>
          </div>
        </div>

        <div class="text-[11px] text-workspace-muted pt-2 border-t border-workspace-border">
          Tip: Pressing 1, 2, or 3 automatically advances to the next photo for high-speed batch culling.
        </div>
      </div>
    `;

    document.body.appendChild(this.modal);

    document.getElementById('btn-close-shortcuts')?.addEventListener('click', () => this.toggleModal(false));
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.toggleModal(false);
    });

    document.getElementById('btn-help-shortcuts')?.addEventListener('click', () => this.toggleModal(true));
  }

  public toggleModal(open?: boolean) {
    this.isOpen = open !== undefined ? open : !this.isOpen;
    if (this.modal) {
      if (this.isOpen) {
        this.modal.classList.remove('hidden');
      } else {
        this.modal.classList.add('hidden');
      }
    }
  }

  private setupGlobalListener() {
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      // Don't trigger if typing in an input/textarea
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
        return;
      }

      if (e.key === '?') {
        e.preventDefault();
        this.toggleModal();
        return;
      }

      if (e.key === 'Escape' && this.isOpen) {
        this.toggleModal(false);
        return;
      }

      const images = $filteredImages.get();
      if (images.length === 0) return;

      const selectedId = $selectedImageId.get();
      const currentIndex = selectedId ? images.findIndex(img => img.id === selectedId) : 0;

      if (e.key === '1') {
        // Keep
        if (selectedId) {
          setImageStatus(selectedId, 'keep');
          this.advanceSelection(currentIndex, 1, images);
        }
      } else if (e.key === '2') {
        // Flag
        if (selectedId) {
          setImageStatus(selectedId, 'flag');
          this.advanceSelection(currentIndex, 1, images);
        }
      } else if (e.key === '3') {
        // Reject
        if (selectedId) {
          setImageStatus(selectedId, 'reject');
          this.advanceSelection(currentIndex, 1, images);
        }
      } else if (e.key === '0' || e.key.toLowerCase() === 'u') {
        // Reset
        if (selectedId) {
          setImageStatus(selectedId, 'unreviewed');
        }
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        this.advanceSelection(currentIndex, 1, images);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        this.advanceSelection(currentIndex, -1, images);
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedId) {
          removeImage(selectedId);
        }
      }
    });
  }

  private advanceSelection(currentIndex: number, delta: number, images: { id: string }[]) {
    const nextIndex = Math.max(0, Math.min(images.length - 1, currentIndex + delta));
    if (images[nextIndex]) {
      $selectedImageId.set(images[nextIndex].id);
    }
  }
}
