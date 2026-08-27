import { 
  addImages, 
  $isImporting, 
  $pendingManifest, 
  setPendingManifest, 
  restoreWorkspaceFromManifest 
} from '../../lib/store';
import { loadImagesFromFiles } from '../../lib/media/imageLoader';
import { isAllowedImage } from '../../lib/media/fileSanitizer';
import { 
  parseProjectManifest, 
  restoreProjectSession 
} from '../../lib/export/projectManifest';

const ICON_IMAGE =
  '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>';

const ICON_CHECK =
  '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';

const ICON_X =
  '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export class DropZone {
  /** Window-level drag/drop is a single global concern. `WorkspaceApp` builds
   *  one DropZone per trigger (panel + sidebar button), so registering the
   *  window handlers per instance made a body drop import every file twice. */
  private static windowHandlersBound = false;
  private static instances: DropZone[] = [];

  private element: HTMLElement;
  private fileInput: HTMLInputElement;
  private folderInput: HTMLInputElement;
  private manifestInput: HTMLInputElement;

  constructor(element: HTMLElement) {
    this.element = element;
    this.fileInput = document.createElement('input');
    this.fileInput.type = 'file';
    this.fileInput.multiple = true;
    this.fileInput.accept = 'image/jpeg,image/png,image/webp,image/avif,image/gif,image/bmp,.json';
    this.fileInput.className = 'hidden';

    this.folderInput = document.createElement('input');
    this.folderInput.type = 'file';
    this.folderInput.setAttribute('webkitdirectory', '');
    this.folderInput.setAttribute('directory', '');
    this.folderInput.multiple = true;
    this.folderInput.className = 'hidden';

    this.manifestInput = document.createElement('input');
    this.manifestInput.type = 'file';
    this.manifestInput.accept = '.json,.makecontactsheet.json';
    this.manifestInput.className = 'hidden';

    document.body.appendChild(this.fileInput);
    document.body.appendChild(this.folderInput);
    document.body.appendChild(this.manifestInput);

    DropZone.instances.push(this);
    this.setupListeners();
    DropZone.bindWindowHandlers();
  }

  private setupListeners() {
    // Click triggers
    this.element.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('#btn-choose-folder')) {
        this.folderInput.click();
      } else if (target.closest('#btn-reopen-project')) {
        this.manifestInput.click();
      } else {
        this.fileInput.click();
      }
    });

    // Keyboard activation — the panel is role="button", so it must respond to
    // Enter and Space like one.
    this.element.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      if ((e.target as HTMLElement).closest('button')) return;
      e.preventDefault();
      this.fileInput.click();
    });

    this.fileInput.addEventListener('change', () => {
      if (this.fileInput.files && this.fileInput.files.length > 0) {
        this.processFiles(this.fileInput.files);
      }
    });

    this.folderInput.addEventListener('change', () => {
      if (this.folderInput.files && this.folderInput.files.length > 0) {
        this.processFiles(this.folderInput.files);
      }
    });

    this.manifestInput.addEventListener('change', () => {
      if (this.manifestInput.files && this.manifestInput.files.length > 0) {
        this.processManifestOnly(this.manifestInput.files[0]);
      }
    });

    // Drag & Drop. dragenter/dragleave fire for descendants too, so a counter
    // keeps the active state from flickering as the cursor crosses children.
    let dragDepth = 0;

    this.element.addEventListener('dragenter', (e) => {
      e.preventDefault();
      dragDepth++;
      this.element.classList.add('drag-over-active');
    });

    this.element.addEventListener('dragleave', (e) => {
      e.preventDefault();
      dragDepth = Math.max(0, dragDepth - 1);
      if (dragDepth === 0) {
        this.element.classList.remove('drag-over-active');
      }
    });

    this.element.addEventListener('dragover', (e) => {
      e.preventDefault();
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'copy';
      }
    });

    this.element.addEventListener('drop', (e) => {
      e.preventDefault();
      dragDepth = 0;
      this.element.classList.remove('drag-over-active');
      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        DropZone.pulse();
        this.processFiles(e.dataTransfer.files);
      }
    });
  }

  /** Dropping anywhere on the page imports, but only once regardless of how
   *  many DropZone instances exist. */
  private static bindWindowHandlers() {
    if (DropZone.windowHandlersBound) return;
    DropZone.windowHandlersBound = true;

    window.addEventListener('dragover', (e) => e.preventDefault());
    window.addEventListener('drop', (e) => {
      const target = e.target as Node | null;
      const insideAnyZone = DropZone.instances.some(
        (zone) => target === zone.element || (target !== null && zone.element.contains(target))
      );
      if (insideAnyZone) return;

      e.preventDefault();
      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        DropZone.pulse();
        DropZone.instances[0]?.processFiles(e.dataTransfer.files);
      }
    });
  }

  private static pulse() {
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      navigator.vibrate(12);
    }
  }

  /**
   * Renders one queue row per file up front, then marks rows complete as the
   * decoder actually finishes them. Nothing here is simulated: progress comes
   * from `loadImagesFromFiles`'s callback, so a bar reaching 100% means that
   * file is decoded and in the store.
   */
  private renderQueue(accepted: File[], rejected: File[]): HTMLElement | null {
    const list = document.getElementById('import-file-list');
    if (!list) return null;

    const row = (file: File, state: 'pending' | 'rejected') => `
      <div class="dz-row ${state === 'rejected' ? 'is-rejected' : ''}" data-file-name="${escapeHtml(file.name)}">
        <div class="dz-row-icon">${state === 'rejected' ? ICON_X : ICON_IMAGE}</div>
        <div class="dz-row-body">
          <div class="dz-row-name">${escapeHtml(file.name)}</div>
          <div class="dz-row-meta">${
            state === 'rejected' ? 'Unsupported file type — skipped' : formatFileSize(file.size)
          }</div>
          ${state === 'rejected' ? '' : '<div class="dz-row-track"><div class="dz-row-fill"></div></div>'}
        </div>
      </div>
    `;

    list.innerHTML = [...accepted.map((f) => row(f, 'pending')), ...rejected.map((f) => row(f, 'rejected'))].join('');
    list.classList.remove('hidden');
    return list;
  }

  private markRowDone(list: HTMLElement | null, fileName: string) {
    if (!list) return;
    const rows = list.querySelectorAll<HTMLElement>(
      `.dz-row[data-file-name="${CSS.escape(fileName)}"]:not(.is-done):not(.is-rejected)`
    );
    const target = rows[0];
    if (!target) return;
    target.classList.add('is-done');
    const icon = target.querySelector('.dz-row-icon');
    if (icon) icon.innerHTML = ICON_CHECK;
  }

  private async processManifestOnly(file: File) {
    try {
      const text = await file.text();
      const manifest = parseProjectManifest(text);
      if (!manifest) {
        alert('Invalid or unrecognised project manifest file.');
        return;
      }
      setPendingManifest(manifest);
      restoreWorkspaceFromManifest(manifest);

      const progressEl = document.getElementById('import-progress-status');
      if (progressEl) {
        progressEl.textContent = `Manifest loaded: ${manifest.images.length} photos in project. Select photo files or folder to relink session.`;
      }
      this.fileInput.click();
    } catch (err) {
      console.warn('Failed to load manifest:', err);
      alert('Could not read project manifest file.');
    } finally {
      this.manifestInput.value = '';
    }
  }

  private async processFiles(fileList: FileList) {
    const files = Array.from(fileList);

    // Check if user dropped a JSON project manifest
    const jsonFile = files.find((f) => f.name.endsWith('.json'));
    let incomingManifest = null;
    if (jsonFile) {
      try {
        const text = await jsonFile.text();
        incomingManifest = parseProjectManifest(text);
      } catch (err) {
        console.warn('Failed to parse project manifest:', err);
      }
    }

    const accepted = files.filter(isAllowedImage);
    const rejected = files.filter((f) => !isAllowedImage(f) && !f.name.endsWith('.json'));

    const progressEl = document.getElementById('import-progress-status');

    // Case 1: Manifest dropped alone without image files
    if (incomingManifest && accepted.length === 0) {
      setPendingManifest(incomingManifest);
      restoreWorkspaceFromManifest(incomingManifest);
      if (progressEl) {
        progressEl.textContent = `Manifest loaded: ${incomingManifest.images.length} photos in project. Select photos or folder to relink session.`;
      }
      this.fileInput.value = '';
      this.folderInput.value = '';
      return;
    }

    const list = this.renderQueue(accepted, rejected);

    if (accepted.length === 0) {
      if (progressEl) {
        progressEl.textContent = rejected.length
          ? `No supported images found in ${rejected.length} file${rejected.length === 1 ? '' : 's'}.`
          : '';
      }
      this.fileInput.value = '';
      this.folderInput.value = '';
      return;
    }

    $isImporting.set(true);

    try {
      const items = await loadImagesFromFiles(accepted, (loaded, total, currentName) => {
        this.markRowDone(list, currentName);
        if (progressEl) {
          progressEl.textContent = `Decoding ${loaded} of ${total} — ${currentName}`;
        }
      });

      if (items.length > 0) {
        const activeManifest = incomingManifest || $pendingManifest.get();
        if (activeManifest) {
          const report = restoreProjectSession(activeManifest, items);
          setPendingManifest(null);
          if (progressEl) {
            const matchPct = Math.round(report.matchRate * 100);
            progressEl.textContent = `Restored project session: ${report.matches.length} of ${activeManifest.images.length} photos relinked (${matchPct}% match).`;
          }
        } else {
          addImages(items);
          if (progressEl) {
            progressEl.textContent = `Added ${items.length} photo${items.length === 1 ? '' : 's'}.`;
          }
        }
      }
    } finally {
      $isImporting.set(false);
      this.fileInput.value = '';
      this.folderInput.value = '';
    }
  }
}

