import { 
  $filteredImages, 
  $selectedImageId, 
  setImageStatus, 
  removeImage,
  undo,
  redo
} from '../../lib/store';
import { LoupeViewer } from './LoupeViewer';

export class KeyboardShortcutsManager {
  private modal: HTMLElement | null = null;
  private isOpen = false;
  private loupe = new LoupeViewer();

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
            <span class="text-stone-300 font-medium">Reset Status</span>
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
            <span class="text-workspace-muted">Loupe Review</span>
            <kbd class="px-2 py-0.5 rounded bg-workspace-surface border border-workspace-border font-mono">Space</kbd>
          </div>
          <div class="flex items-center justify-between p-2 rounded bg-workspace-bg border border-workspace-border">
            <span class="text-workspace-muted">Undo</span>
            <kbd class="px-2 py-0.5 rounded bg-workspace-surface border border-workspace-border font-mono">⌘Z</kbd>
          </div>
          <div class="flex items-center justify-between p-2 rounded bg-workspace-bg border border-workspace-border">
            <span class="text-workspace-muted">Redo</span>
            <kbd class="px-2 py-0.5 rounded bg-workspace-surface border border-workspace-border font-mono">⇧⌘Z</kbd>
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

    // ReviewToolbar rebuilds its markup on every review change, so a listener
    // bound to these buttons once went dead after the first Keep. Delegate.
    document.addEventListener('click', (e) => {
      const target = e.target as Element | null;
      if (target?.closest('#btn-help-shortcuts')) this.toggleModal(true);
      else if (target?.closest('#btn-open-loupe')) this.loupe.openAt($selectedImageId.get());
    });
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
    // The workspace is embedded in long marketing pages, so a window-wide
    // handler swallowed arrow-key scrolling and let Backspace on a footer link
    // delete a photo. Shortcuts only apply once the user last pointed at or
    // focused the workspace; the full-screen studio is the workspace.
    const root = document.getElementById('frameproof-studio') ?? document.getElementById('frameproof-workspace');
    let workspaceActive = root?.id === 'frameproof-studio';
    const trackActive = (e: Event) => {
      const target = e.target as Node | null;
      workspaceActive = !!target && (!!root?.contains(target) || !!this.modal?.contains(target) || this.loupe.contains(target));
    };
    document.addEventListener('pointerdown', trackActive, true);
    document.addEventListener('focusin', trackActive, true);

    window.addEventListener('keydown', (e: KeyboardEvent) => {
      // Don't trigger if typing in an input/textarea
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
        return;
      }
      if ((document.activeElement as HTMLElement | null)?.isContentEditable) return;

      const focused = document.activeElement;
      const focusOutside = !!focused && focused !== document.body && !!root
        && !root.contains(focused) && !this.modal?.contains(focused) && !this.loupe.contains(focused);
      const inWorkspace = (workspaceActive || this.loupe.isOpen) && !focusOutside;

      // ⌘Z / Ctrl+Z undo, ⇧⌘Z / Ctrl+Y redo. Inputs keep their own text undo
      // because the early return above already skipped them.
      const mod = e.metaKey || e.ctrlKey;
      if (inWorkspace && mod && !e.altKey) {
        const key = e.key.toLowerCase();
        if (key === 'z' && !e.shiftKey) { e.preventDefault(); undo(); return; }
        if ((key === 'z' && e.shiftKey) || key === 'y') { e.preventDefault(); redo(); return; }
      }
      // Leave Cmd/Ctrl/Alt chords (tab switching, browser back) to the browser.
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === 'Escape' && this.isOpen) {
        this.toggleModal(false);
        return;
      }

      if (this.loupe.handleKey(e)) return;
      if (!inWorkspace) return;

      if (e.key === '?') {
        e.preventDefault();
        this.toggleModal();
        return;
      }

      const images = $filteredImages.get();
      if (images.length === 0) return;

      const selectedId = $selectedImageId.get();
      const currentIndex = selectedId ? images.findIndex(img => img.id === selectedId) : 0;

      // Space would also press a focused button, so it only opens the loupe
      // when nothing interactive has focus.
      const interactiveFocus = !!focused && focused !== document.body
        && !!(focused as HTMLElement).closest('button, a, summary, [role="button"]');
      if (e.key === ' ' && !interactiveFocus) {
        e.preventDefault();
        this.loupe.openAt(selectedId);
        return;
      }

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
