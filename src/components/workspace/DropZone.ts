import { addImages, $isImporting, $workspaceMode, $layoutConfig, setActiveTemplate } from '../../lib/store';
import { loadImagesFromFiles } from '../../lib/media/imageLoader';
import { parseProjectManifest } from '../../lib/export/projectManifest';

export class DropZone {
  private element: HTMLElement;
  private fileInput: HTMLInputElement;
  private folderInput: HTMLInputElement;

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

    document.body.appendChild(this.fileInput);
    document.body.appendChild(this.folderInput);

    this.setupListeners();
  }

  private setupListeners() {
    // Click triggers
    this.element.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('#btn-choose-folder')) {
        this.folderInput.click();
      } else {
        this.fileInput.click();
      }
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

    // Drag & Drop
    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      this.element.classList.add('drag-over-active');
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      this.element.classList.remove('drag-over-active');
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'copy';
      }
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      this.element.classList.remove('drag-over-active');
      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        this.processFiles(e.dataTransfer.files);
      }
    };

    this.element.addEventListener('dragenter', handleDragEnter);
    this.element.addEventListener('dragleave', handleDragLeave);
    this.element.addEventListener('dragover', handleDragOver);
    this.element.addEventListener('drop', handleDrop);

    // Global drag-and-drop onto workspace
    window.addEventListener('dragover', (e) => e.preventDefault());
    window.addEventListener('drop', (e) => {
      if (e.target !== this.element && !this.element.contains(e.target as Node)) {
        e.preventDefault();
        if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
          this.processFiles(e.dataTransfer.files);
        }
      }
    });
  }

  private async processFiles(fileList: FileList) {
    const files = Array.from(fileList);
    
    // Check if user dropped a JSON project manifest
    const jsonFile = files.find(f => f.name.endsWith('.json'));
    if (jsonFile) {
      try {
        const text = await jsonFile.text();
        const manifest = parseProjectManifest(text);
        if (manifest) {
          $workspaceMode.set(manifest.mode);
          $layoutConfig.set(manifest.layoutConfig);
          if (manifest.activeTemplateId) {
            setActiveTemplate(manifest.activeTemplateId);
          }
          alert(`Imported project settings (${manifest.images.length} item manifest). Please re-drop the source photos to populate previews.`);
          return;
        }
      } catch (err) {
        console.warn('Failed to parse project manifest:', err);
      }
    }

    $isImporting.set(true);
    const progressEl = document.getElementById('import-progress-status');

    try {
      const items = await loadImagesFromFiles(files, (loaded, total, currentName) => {
        if (progressEl) {
          progressEl.textContent = `Processing ${loaded}/${total}: ${currentName}`;
        }
      });

      if (items.length > 0) {
        addImages(items);
      }
    } finally {
      $isImporting.set(false);
      if (progressEl) {
        progressEl.textContent = '';
      }
      this.fileInput.value = '';
      this.folderInput.value = '';
    }
  }
}
