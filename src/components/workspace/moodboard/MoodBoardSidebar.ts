import {
  $images,
  addImages,
  removeImage,
  resetWorkspace,
} from '../../../lib/store';
import {
  $moodboardConfig,
  $moodboardElements,
  CANVAS_SIZE_PRESETS,
  MOODBOARD_COLOR_PALETTES,
  MOODBOARD_TEMPLATES,
  addTextElement,
  addSwatchElement,
  addNoteElement,
  addShapeElement,
  addImageElement,
  applyTemplate,
  resetBoard,
  updateConfig,
  setCanvasSize,
  setBackgroundColor,
  setBackgroundPattern,
  downloadMoodBoardManifest,
  importMoodBoardManifest,
} from '../../../lib/moodboardStore';
import { loadImagesFromFiles } from '../../../lib/media/imageLoader';
import { TRAY_DRAG_TYPE } from '../PhotoTray';
import type { ImageItem, MoodBoardTemplate } from '../../../lib/types';
import type { BoardCanvas } from './BoardCanvas';

type SidebarTab = 'photos' | 'templates' | 'elements' | 'settings';

export class MoodBoardSidebar {
  private container: HTMLElement;
  private boardCanvas: BoardCanvas;
  private activeTab: SidebarTab = 'photos';
  private activeTemplateCategory: string = 'all';

  private tabButtons: Map<SidebarTab, HTMLButtonElement> = new Map();
  private panels: Map<SidebarTab, HTMLElement> = new Map();

  private photoCountBadge!: HTMLElement;

  private unsubImages?: () => void;
  private unsubConfig?: () => void;
  private unsubElements?: () => void;

  constructor(container: HTMLElement, boardCanvas: BoardCanvas) {
    this.container = container;
    this.boardCanvas = boardCanvas;

    this.renderShell();
    this.setupSubscriptions();
  }

  // ---------------------------------------------------------------------------
  // Shell & Tab Navigation Setup
  // ---------------------------------------------------------------------------
  private renderShell() {
    this.container.innerHTML = '';
    this.container.className =
      'moodboard-sidebar flex flex-col w-full h-full bg-workspace-panel border-r border-workspace-border text-workspace-text select-none min-w-0';

    // 1. Top Tab Navigation Bar
    const tabBar = document.createElement('div');
    tabBar.className =
      'flex items-center justify-between p-1.5 border-b border-workspace-border bg-workspace-bg/80 backdrop-blur-xs flex-shrink-0';

    const tabs: { id: SidebarTab; label: string; icon: string }[] = [
      { id: 'photos', label: 'Photos', icon: 'photo' },
      { id: 'templates', label: 'Templates', icon: 'template' },
      { id: 'elements', label: 'Elements', icon: 'shapes' },
      { id: 'settings', label: 'Canvas', icon: 'settings' },
    ];

    for (const t of tabs) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `flex-1 flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2 px-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
        this.activeTab === t.id
          ? 'bg-workspace-surface text-accent-ink shadow-xs border border-workspace-border'
          : 'text-workspace-muted hover:text-workspace-text hover:bg-workspace-surface/50'
      }`;
      btn.dataset.tab = t.id;

      const iconSvg = this.getSvgIcon(t.icon);
      btn.innerHTML = `${iconSvg}<span class="truncate">${t.label}</span>`;

      // Badges
      if (t.id === 'photos') {
        const badge = document.createElement('span');
        badge.className =
          'hidden sm:inline-block ml-0.5 px-1.5 py-0.2 rounded-full bg-accent/15 text-[10px] font-mono text-accent-ink font-bold';
        badge.textContent = '0';
        this.photoCountBadge = badge;
        btn.appendChild(badge);
      } else if (t.id === 'templates') {
        const badge = document.createElement('span');
        badge.className =
          'hidden sm:inline-block ml-0.5 px-1.5 py-0.2 rounded-full bg-workspace-border text-[10px] font-mono text-workspace-muted font-bold';
        badge.textContent = String(MOODBOARD_TEMPLATES.length);
        btn.appendChild(badge);
      }

      btn.addEventListener('click', () => this.switchTab(t.id));
      this.tabButtons.set(t.id, btn);
      tabBar.appendChild(btn);
    }
    this.container.appendChild(tabBar);

    // 2. Tab Panels Container
    const panelsContainer = document.createElement('div');
    panelsContainer.className = 'flex-1 overflow-y-auto custom-scrollbar min-h-0 relative';

    // Build 4 Panels
    const photosPanel = this.buildPhotosPanel();
    const templatesPanel = this.buildTemplatesPanel();
    const elementsPanel = this.buildElementsPanel();
    const settingsPanel = this.buildSettingsPanel();

    this.panels.set('photos', photosPanel);
    this.panels.set('templates', templatesPanel);
    this.panels.set('elements', elementsPanel);
    this.panels.set('settings', settingsPanel);

    panelsContainer.appendChild(photosPanel);
    panelsContainer.appendChild(templatesPanel);
    panelsContainer.appendChild(elementsPanel);
    panelsContainer.appendChild(settingsPanel);

    this.container.appendChild(panelsContainer);

    this.switchTab('photos');
  }

  public switchTab(tab: SidebarTab) {
    this.activeTab = tab;

    // Update tab button styles
    for (const [id, btn] of this.tabButtons.entries()) {
      if (id === tab) {
        btn.className =
          'flex-1 flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2 px-1.5 rounded-lg text-xs font-semibold bg-workspace-surface text-accent-ink shadow-xs border border-workspace-border transition-all cursor-pointer';
      } else {
        btn.className =
          'flex-1 flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2 px-1.5 rounded-lg text-xs font-semibold text-workspace-muted hover:text-workspace-text hover:bg-workspace-surface/50 transition-all cursor-pointer';
      }
    }

    // Toggle panels visibility
    for (const [id, panel] of this.panels.entries()) {
      if (id === tab) {
        panel.classList.remove('hidden');
      } else {
        panel.classList.add('hidden');
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Subscriptions & Reactive Sync
  // ---------------------------------------------------------------------------
  private setupSubscriptions() {
    this.unsubImages = $images.subscribe((images) => {
      if (this.photoCountBadge) {
        this.photoCountBadge.textContent = String(images.length);
      }
      this.syncPhotosList(images);
    });

    this.unsubConfig = $moodboardConfig.subscribe((config) => {
      this.syncSettingsControls(config);
    });
  }

  // ---------------------------------------------------------------------------
  // TAB 1: Photos Tray & Dropzone Panel
  // ---------------------------------------------------------------------------
  private buildPhotosPanel(): HTMLElement {
    const panel = document.createElement('div');
    panel.className = 'p-3.5 space-y-4';

    // 1. File Upload Dropzone
    const dropzone = document.createElement('div');
    dropzone.className =
      'moodboard-sidebar-dropzone group relative p-4 rounded-xl border-2 border-dashed border-workspace-border hover:border-accent bg-workspace-bg/50 hover:bg-accent/5 transition-all text-center cursor-pointer flex flex-col items-center justify-center space-y-2';

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.multiple = true;
    fileInput.accept = 'image/*';
    fileInput.className = 'hidden';

    dropzone.innerHTML = `
      <div class="w-10 h-10 rounded-full bg-workspace-surface group-hover:bg-accent/10 border border-workspace-border group-hover:border-accent/30 flex items-center justify-center text-accent transition-colors">
        ${this.getSvgIcon('upload')}
      </div>
      <div class="space-y-0.5">
        <p class="text-xs font-semibold text-workspace-text group-hover:text-accent-ink transition-colors">
          Click or drop photos here
        </p>
        <p class="text-[10px] text-workspace-muted font-mono">
          JPEG, PNG, WebP, HEIC · 100% Private
        </p>
      </div>
    `;

    dropzone.appendChild(fileInput);

    dropzone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', async () => {
      if (fileInput.files && fileInput.files.length > 0) {
        await this.handleFileUpload(fileInput.files);
        fileInput.value = '';
      }
    });

    // Native Drag and Drop onto dropzone
    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('border-accent', 'bg-accent/10');
    });

    dropzone.addEventListener('dragleave', () => {
      dropzone.classList.remove('border-accent', 'bg-accent/10');
    });

    dropzone.addEventListener('drop', async (e) => {
      e.preventDefault();
      dropzone.classList.remove('border-accent', 'bg-accent/10');
      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        await this.handleFileUpload(e.dataTransfer.files);
      }
    });

    panel.appendChild(dropzone);

    // 2. Action Bar (Add All, Clear)
    const actionBar = document.createElement('div');
    actionBar.className = 'flex items-center justify-between gap-2 pt-1';

    const countHeader = document.createElement('span');
    countHeader.className = 'text-[11px] font-mono text-workspace-muted';
    countHeader.id = 'moodboard-photos-header-count';
    countHeader.textContent = '0 photos in tray';

    const btnGroup = document.createElement('div');
    btnGroup.className = 'flex items-center gap-1.5';

    const addAllBtn = document.createElement('button');
    addAllBtn.type = 'button';
    addAllBtn.className =
      'px-2 py-1 rounded-md bg-accent hover:bg-accent-hover text-white text-[11px] font-medium shadow-xs transition-colors cursor-pointer flex items-center gap-1';
    addAllBtn.innerHTML = `${this.getSvgIcon('plus')}<span>Add All</span>`;
    addAllBtn.addEventListener('click', () => this.addAllPhotosToBoard());

    const clearBtn = document.createElement('button');
    clearBtn.type = 'button';
    clearBtn.className =
      'px-2 py-1 rounded-md bg-workspace-surface hover:bg-rose-500/20 text-workspace-muted hover:text-rose-400 text-[11px] font-medium border border-workspace-border transition-colors cursor-pointer';
    clearBtn.textContent = 'Clear';
    clearBtn.addEventListener('click', () => {
      if (confirm('Clear all photos from tray?')) {
        resetWorkspace();
      }
    });

    btnGroup.appendChild(addAllBtn);
    btnGroup.appendChild(clearBtn);

    actionBar.appendChild(countHeader);
    actionBar.appendChild(btnGroup);
    panel.appendChild(actionBar);

    // 3. Photos Grid List
    const photosList = document.createElement('div');
    photosList.id = 'moodboard-sidebar-photos-list';
    photosList.className = 'grid grid-cols-2 gap-2.5';
    panel.appendChild(photosList);

    return panel;
  }

  private async handleFileUpload(files: FileList | File[]) {
    const loaded = await loadImagesFromFiles(files);
    if (loaded.length > 0) {
      addImages(loaded);
    }
  }

  private syncPhotosList(images: readonly ImageItem[]) {
    const listEl = document.getElementById('moodboard-sidebar-photos-list');
    const countHeader = document.getElementById('moodboard-photos-header-count');
    if (!listEl) return;

    if (countHeader) {
      countHeader.textContent = `${images.length} photo${images.length === 1 ? '' : 's'} in tray`;
    }

    listEl.innerHTML = '';

    if (images.length === 0) {
      listEl.innerHTML = `
        <div class="col-span-2 py-8 px-4 text-center text-workspace-muted space-y-2 border border-workspace-border/50 rounded-xl bg-workspace-bg/30">
          <div class="w-8 h-8 mx-auto text-workspace-muted/50">
            ${this.getSvgIcon('photo')}
          </div>
          <p class="text-xs">No photos in tray yet.</p>
          <p class="text-[10px]">Import inspiration photos to drag & drop them freely onto your board.</p>
        </div>
      `;
      return;
    }

    for (const img of images) {
      const card = document.createElement('div');
      card.className =
        'group relative aspect-4/3 rounded-lg overflow-hidden border border-workspace-border bg-black/40 cursor-grab active:cursor-grabbing hover:border-accent transition-all shadow-xs hover:shadow-md select-none';
      card.draggable = true;

      // HTML5 Drag Transfer
      card.addEventListener('dragstart', (e) => {
        if (e.dataTransfer) {
          e.dataTransfer.setData(TRAY_DRAG_TYPE, img.id);
          e.dataTransfer.setData('text/plain', img.id);
          e.dataTransfer.effectAllowed = 'copy';
        }
      });

      // Thumbnail Image
      const imgEl = document.createElement('img');
      imgEl.src = img.thumbnailUrl || img.previewUrl || '';
      imgEl.alt = img.name;
      imgEl.className = 'w-full h-full object-cover pointer-events-none';
      card.appendChild(imgEl);

      // Gradient overlay with photo name and quick actions
      const overlay = document.createElement('div');
      overlay.className =
        'absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-between';

      // Top action: Remove from tray
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className =
        'self-end w-5 h-5 rounded-full bg-black/60 hover:bg-rose-600 text-white flex items-center justify-center text-[10px] transition-colors cursor-pointer';
      removeBtn.innerHTML = this.getSvgIcon('x');
      removeBtn.title = 'Remove photo from tray';
      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        removeImage(img.id);
      });
      overlay.appendChild(removeBtn);

      // Bottom action: 1-click Add to Board & Label
      const bottomWrap = document.createElement('div');
      bottomWrap.className = 'space-y-1';

      const label = document.createElement('p');
      label.className = 'text-[10px] font-mono text-white/90 truncate';
      label.textContent = img.customLabel || img.name;
      bottomWrap.appendChild(label);

      const addBtn = document.createElement('button');
      addBtn.type = 'button';
      addBtn.className =
        'w-full py-1 rounded bg-accent hover:bg-accent-hover text-white text-[10px] font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-xs';
      addBtn.innerHTML = `${this.getSvgIcon('plus')}<span>Add to Board</span>`;
      addBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        addImageElement(img);
      });
      bottomWrap.appendChild(addBtn);

      overlay.appendChild(bottomWrap);
      card.appendChild(overlay);

      listEl.appendChild(card);
    }
  }

  private addAllPhotosToBoard() {
    const images = $images.get();
    if (images.length === 0) {
      alert('Please upload photos into the tray first.');
      return;
    }

    const cols = Math.ceil(Math.sqrt(images.length * 1.5));
    const cardWidth = 360;
    const cardHeight = 270;
    const gap = 30;

    images.forEach((img, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      const x = 80 + col * (cardWidth + gap);
      const y = 140 + row * (cardHeight + gap);

      addImageElement(img, { x, y, width: cardWidth, height: cardHeight });
    });

    this.boardCanvas.fitToScreen();
  }

  // ---------------------------------------------------------------------------
  // TAB 2: Curated Starter Templates Panel
  // ---------------------------------------------------------------------------
  private buildTemplatesPanel(): HTMLElement {
    const panel = document.createElement('div');
    panel.className = 'p-3.5 space-y-4';

    // Header info banner
    const banner = document.createElement('div');
    banner.className =
      'p-3 rounded-xl bg-accent/10 border border-accent/20 text-xs text-workspace-text space-y-1';
    banner.innerHTML = `
      <div class="flex items-center gap-1.5 font-bold text-accent-ink">
        ${this.getSvgIcon('template')}
        <span>1-Click Curated Presets</span>
      </div>
      <p class="text-[11px] text-workspace-muted leading-relaxed">
        Apply editorial, lookbook, and lighting layouts. Your tray photos are automatically placed into template frames!
      </p>
    `;
    panel.appendChild(banner);

    // Category filter pills
    const categories: { id: string; label: string }[] = [
      { id: 'all', label: 'All' },
      { id: 'editorial', label: 'Editorial' },
      { id: 'concept', label: 'Concept' },
      { id: 'film', label: 'Film' },
      { id: 'lookbook', label: 'Lookbook' },
      { id: 'minimal', label: 'Minimal' },
    ];

    const filterBar = document.createElement('div');
    filterBar.className = 'flex items-center gap-1 overflow-x-auto custom-scrollbar pb-1';

    for (const cat of categories) {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = `px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors cursor-pointer flex-shrink-0 ${
        this.activeTemplateCategory === cat.id
          ? 'bg-accent text-white font-semibold'
          : 'bg-workspace-surface text-workspace-muted hover:text-workspace-text border border-workspace-border'
      }`;
      chip.textContent = cat.label;
      chip.addEventListener('click', () => {
        this.activeTemplateCategory = cat.id;
        this.renderTemplateCards(cardsContainer);
        // update chips active styles
        filterBar.querySelectorAll('button').forEach((b) => {
          b.className =
            'px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors cursor-pointer flex-shrink-0 bg-workspace-surface text-workspace-muted hover:text-workspace-text border border-workspace-border';
        });
        chip.className =
          'px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors cursor-pointer flex-shrink-0 bg-accent text-white font-semibold';
      });
      filterBar.appendChild(chip);
    }
    panel.appendChild(filterBar);

    // Template cards container
    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'space-y-3';
    this.renderTemplateCards(cardsContainer);
    panel.appendChild(cardsContainer);

    return panel;
  }

  private renderTemplateCards(container: HTMLElement) {
    container.innerHTML = '';

    const filtered =
      this.activeTemplateCategory === 'all'
        ? MOODBOARD_TEMPLATES
        : MOODBOARD_TEMPLATES.filter((t) => t.category === this.activeTemplateCategory);

    for (const tpl of filtered) {
      const card = document.createElement('div');
      card.className =
        'p-3 rounded-xl border border-workspace-border bg-workspace-surface/50 hover:bg-workspace-surface hover:border-accent/50 transition-all space-y-2.5';

      // Card top: Name, category pill, aspect ratio
      const topBar = document.createElement('div');
      topBar.className = 'flex items-center justify-between gap-2';

      const title = document.createElement('h4');
      title.className = 'text-xs font-bold text-workspace-text truncate';
      title.textContent = tpl.name;

      const catBadge = document.createElement('span');
      catBadge.className =
        'px-2 py-0.5 rounded-md bg-workspace-bg text-[10px] font-mono font-semibold text-accent-ink border border-workspace-border uppercase tracking-wider';
      catBadge.textContent = tpl.category || 'Preset';

      topBar.appendChild(title);
      topBar.appendChild(catBadge);
      card.appendChild(topBar);

      // Card geometric miniature preview
      const preview = this.createTemplateMiniature(tpl);
      card.appendChild(preview);

      // Card description
      const desc = document.createElement('p');
      desc.className = 'text-[11px] text-workspace-muted leading-relaxed';
      desc.textContent = tpl.description;
      card.appendChild(desc);

      // Apply button
      const applyBtn = document.createElement('button');
      applyBtn.type = 'button';
      applyBtn.className =
        'w-full py-1.5 rounded-lg bg-accent hover:bg-accent-hover text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer';
      applyBtn.innerHTML = `${this.getSvgIcon('check')}<span>Apply Template</span>`;
      applyBtn.addEventListener('click', () => {
        const currentElements = $moodboardElements.get();
        if (
          currentElements.length > 0 &&
          !confirm('Applying a new template will replace your current mood board canvas. Continue?')
        ) {
          return;
        }
        applyTemplate(tpl.id, $images.get());
        this.boardCanvas.fitToScreen();
      });
      card.appendChild(applyBtn);

      container.appendChild(card);
    }
  }

  private createTemplateMiniature(tpl: MoodBoardTemplate): HTMLElement {
    const box = document.createElement('div');
    box.className =
      'w-full aspect-16/9 rounded-lg overflow-hidden relative border border-workspace-border shadow-inner flex items-center justify-center';
    box.style.backgroundColor = tpl.canvas.backgroundColor || '#161413';

    // Draw scaled layout cells
    const canvasW = tpl.canvas.width || 1920;
    const canvasH = tpl.canvas.height || 1080;

    for (const el of tpl.elements) {
      const cell = document.createElement('div');
      cell.className = 'absolute rounded-[2px] opacity-80';
      cell.style.left = `${(el.x / canvasW) * 100}%`;
      cell.style.top = `${(el.y / canvasH) * 100}%`;
      cell.style.width = `${(el.width / canvasW) * 100}%`;
      cell.style.height = `${(el.height / canvasH) * 100}%`;

      if (el.type === 'image') {
        cell.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
        cell.style.border = '1px solid rgba(255, 255, 255, 0.25)';
      } else if (el.type === 'swatch') {
        cell.style.backgroundColor = el.backgroundColor || '#d97706';
      } else if (el.type === 'note') {
        cell.style.backgroundColor = el.backgroundColor || '#fef3c7';
      } else if (el.type === 'text') {
        cell.style.backgroundColor = 'rgba(201, 138, 70, 0.4)';
      }

      box.appendChild(cell);
    }

    return box;
  }

  // ---------------------------------------------------------------------------
  // TAB 3: Assets & Elements Panel (Text, Swatches, Sticky Notes, Shapes)
  // ---------------------------------------------------------------------------
  private buildElementsPanel(): HTMLElement {
    const panel = document.createElement('div');
    panel.className = 'p-3.5 space-y-5';

    // 1. Typography & Text Headings
    const textSection = document.createElement('div');
    textSection.className = 'space-y-2.5';
    textSection.innerHTML = `
      <div class="flex items-center gap-1.5 text-xs font-bold text-workspace-text">
        ${this.getSvgIcon('text')}
        <span>Typography &amp; Headings</span>
      </div>
    `;

    const textGrid = document.createElement('div');
    textGrid.className = 'grid grid-cols-2 gap-2';

    const textPresets = [
      {
        label: 'Large Title',
        sub: '36px Bold',
        action: () =>
          addTextElement({
            content: 'EDITORIAL MOOD',
            fontSize: 36,
            fontWeight: '700',
            width: 440,
            height: 60,
          }),
      },
      {
        label: 'Subheading',
        sub: '22px Semi-bold',
        action: () =>
          addTextElement({
            content: 'Lighting & Styling Direction',
            fontSize: 22,
            fontWeight: '600',
            width: 380,
            height: 45,
          }),
      },
      {
        label: 'Caption / Body',
        sub: '14px Regular',
        action: () =>
          addTextElement({
            content: '50mm f/1.8 · Diffused key with warm gold reflector.',
            fontSize: 14,
            fontWeight: '400',
            width: 340,
            height: 40,
          }),
      },
      {
        label: 'Director Quote',
        sub: '18px Italic',
        action: () =>
          addTextElement({
            content: '“Simplicity is the keynote of all true elegance.”',
            fontSize: 18,
            fontWeight: '400',
            width: 380,
            height: 50,
          }),
      },
    ];

    for (const tp of textPresets) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className =
        'p-2.5 rounded-lg border border-workspace-border bg-workspace-surface/60 hover:bg-workspace-surface hover:border-accent text-left transition-all cursor-pointer space-y-0.5 shadow-xs';
      btn.innerHTML = `
        <div class="text-xs font-semibold text-workspace-text">${tp.label}</div>
        <div class="text-[10px] text-workspace-muted font-mono">${tp.sub}</div>
      `;
      btn.addEventListener('click', tp.action);
      textGrid.appendChild(btn);
    }
    textSection.appendChild(textGrid);
    panel.appendChild(textSection);

    // 2. Color Swatches & Palettes
    const swatchSection = document.createElement('div');
    swatchSection.className = 'space-y-2.5';
    swatchSection.innerHTML = `
      <div class="flex items-center gap-1.5 text-xs font-bold text-workspace-text">
        ${this.getSvgIcon('palette')}
        <span>Designer Color Swatches</span>
      </div>
    `;

    const swatchPalette = [
      { name: 'Terracotta', hex: '#b45309' },
      { name: 'Cashmere', hex: '#e2d9cc' },
      { name: 'Espresso', hex: '#291e17' },
      { name: 'Olive', hex: '#4d543b' },
      { name: 'Amber Glow', hex: '#d97706' },
      { name: 'Slate Gray', hex: '#334155' },
      { name: 'Obsidian Noir', hex: '#0a0b0d' },
      { name: 'Rose Silk', hex: '#f43f5e' },
      { name: 'Faded Teal', hex: '#0d9488' },
      { name: 'Pure Chalk', hex: '#ffffff' },
    ];

    const swatchGrid = document.createElement('div');
    swatchGrid.className = 'grid grid-cols-5 gap-2';

    for (const sw of swatchPalette) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className =
        'aspect-square rounded-lg border border-white/20 hover:scale-110 transition-transform cursor-pointer shadow-sm relative group';
      dot.style.backgroundColor = sw.hex;
      dot.title = `Add ${sw.name} (${sw.hex})`;
      dot.innerHTML = `
        <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-black/90 text-[9px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none z-30 transition-opacity font-mono">
          ${sw.name}
        </div>
      `;
      dot.addEventListener('click', () => {
        addSwatchElement(sw.hex, sw.name);
      });
      swatchGrid.appendChild(dot);
    }
    swatchSection.appendChild(swatchGrid);

    // Custom Color Swatch Creator
    const customSwatchRow = document.createElement('div');
    customSwatchRow.className = 'flex items-center gap-2 pt-1';

    const colorPickerInput = document.createElement('input');
    colorPickerInput.type = 'color';
    colorPickerInput.value = '#ca8a04';
    colorPickerInput.className = 'w-8 h-8 rounded-lg border border-workspace-border cursor-pointer p-0.5';

    const hexInput = document.createElement('input');
    hexInput.type = 'text';
    hexInput.value = '#CA8A04';
    hexInput.className =
      'flex-1 h-8 px-2.5 rounded-lg border border-workspace-border bg-workspace-bg text-xs font-mono text-workspace-text uppercase focus:border-accent outline-none';

    colorPickerInput.addEventListener('input', () => {
      hexInput.value = colorPickerInput.value.toUpperCase();
    });

    hexInput.addEventListener('input', () => {
      if (/^#[0-9A-F]{6}$/i.test(hexInput.value)) {
        colorPickerInput.value = hexInput.value;
      }
    });

    const addCustomSwatchBtn = document.createElement('button');
    addCustomSwatchBtn.type = 'button';
    addCustomSwatchBtn.className =
      'h-8 px-3 rounded-lg bg-accent hover:bg-accent-hover text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shadow-xs';
    addCustomSwatchBtn.innerHTML = `${this.getSvgIcon('plus')}<span>Add</span>`;
    addCustomSwatchBtn.addEventListener('click', () => {
      addSwatchElement(colorPickerInput.value, hexInput.value);
    });

    customSwatchRow.appendChild(colorPickerInput);
    customSwatchRow.appendChild(hexInput);
    customSwatchRow.appendChild(addCustomSwatchBtn);
    swatchSection.appendChild(customSwatchRow);

    panel.appendChild(swatchSection);

    // 3. Stylist & Lighting Sticky Notes
    const noteSection = document.createElement('div');
    noteSection.className = 'space-y-2.5';
    noteSection.innerHTML = `
      <div class="flex items-center gap-1.5 text-xs font-bold text-workspace-text">
        ${this.getSvgIcon('note')}
        <span>Director &amp; Styling Sticky Notes</span>
      </div>
    `;

    const noteGrid = document.createElement('div');
    noteGrid.className = 'grid grid-cols-2 gap-2';

    const notePresets = [
      {
        name: 'Lighting Note',
        bg: '#fef3c7',
        color: '#1c1917',
        text: 'Key: 5ft Octabox at 45°\nFill: 4x8 white polyboard\nRim: Honeycomb stripbox',
      },
      {
        name: 'Wardrobe & H/MU',
        bg: '#ffe4e6',
        color: '#1c1917',
        text: 'Wardrobe:\n- Steam raw linens\n- Matte gold jewelry\n- Natural skin glow',
      },
      {
        name: 'Location & Timing',
        bg: '#dcfce7',
        color: '#14532d',
        text: 'Studio Stage B:\n- Call time 08:30 AM\n- Sunset magic hour 05:45 PM',
      },
      {
        name: 'Camera & Glass',
        bg: '#e0f2fe',
        color: '#0c4a6e',
        text: 'Specs: 85mm f/1.4\nISO 100 · 1/160s · f/5.6\nTethered capture to Capture One',
      },
    ];

    for (const np of notePresets) {
      const noteBtn = document.createElement('button');
      noteBtn.type = 'button';
      noteBtn.className =
        'p-3 rounded-lg border border-black/10 text-left transition-transform hover:scale-[1.02] cursor-pointer shadow-xs space-y-1 relative';
      noteBtn.style.backgroundColor = np.bg;
      noteBtn.style.color = np.color;
      noteBtn.innerHTML = `
        <div class="text-[11px] font-bold">${np.name}</div>
        <div class="text-[10px] leading-tight opacity-80 line-clamp-2">${np.text.replace(/\n/g, ' · ')}</div>
      `;
      noteBtn.addEventListener('click', () => {
        addNoteElement(np.text, np.bg, { color: np.color });
      });
      noteGrid.appendChild(noteBtn);
    }
    noteSection.appendChild(noteGrid);
    panel.appendChild(noteSection);

    // 4. Shapes & Card Containers
    const shapeSection = document.createElement('div');
    shapeSection.className = 'space-y-2.5';
    shapeSection.innerHTML = `
      <div class="flex items-center gap-1.5 text-xs font-bold text-workspace-text">
        ${this.getSvgIcon('shapes')}
        <span>Containers &amp; Shapes</span>
      </div>
    `;

    const addShapeBtn = document.createElement('button');
    addShapeBtn.type = 'button';
    addShapeBtn.className =
      'w-full py-2 px-3 rounded-lg border border-workspace-border bg-workspace-surface/60 hover:bg-workspace-surface hover:border-accent text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer';
    addShapeBtn.innerHTML = `${this.getSvgIcon('plus')}<span>Add Background Container Box</span>`;
    addShapeBtn.addEventListener('click', () => {
      addShapeElement({
        width: 480,
        height: 360,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderColor: 'rgba(255, 255, 255, 0.15)',
        borderWidth: 1,
      });
    });
    shapeSection.appendChild(addShapeBtn);
    panel.appendChild(shapeSection);

    return panel;
  }

  // ---------------------------------------------------------------------------
  // TAB 4: Board Settings & Canvas Panel
  // ---------------------------------------------------------------------------
  private buildSettingsPanel(): HTMLElement {
    const panel = document.createElement('div');
    panel.className = 'p-3.5 space-y-5';

    // 1. Canvas Dimensions & Aspect Ratio Presets
    const sizeSection = document.createElement('div');
    sizeSection.className = 'space-y-2.5';
    sizeSection.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold text-workspace-text flex items-center gap-1.5">
          ${this.getSvgIcon('maximize')}
          <span>Canvas Aspect Ratio</span>
        </span>
        <span id="moodboard-size-readout" class="text-[11px] font-mono text-workspace-muted">1920 × 1080</span>
      </div>
    `;

    const sizeGrid = document.createElement('div');
    sizeGrid.className = 'grid grid-cols-2 gap-2';

    for (const preset of CANVAS_SIZE_PRESETS) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className =
        'p-2 rounded-lg border border-workspace-border bg-workspace-surface/50 hover:bg-workspace-surface hover:border-accent text-left transition-all cursor-pointer space-y-0.5 shadow-xs';
      btn.dataset.presetId = preset.id;
      btn.innerHTML = `
        <div class="flex items-center justify-between text-xs font-semibold text-workspace-text">
          <span>${preset.name}</span>
          <span class="text-[10px] font-mono text-accent-ink font-bold">${preset.ratio}</span>
        </div>
        <div class="text-[10px] text-workspace-muted font-mono">${preset.width} × ${preset.height} px</div>
      `;
      btn.addEventListener('click', () => {
        setCanvasSize(preset.width, preset.height);
        this.boardCanvas.fitToScreen();
      });
      sizeGrid.appendChild(btn);
    }
    sizeSection.appendChild(sizeGrid);
    panel.appendChild(sizeSection);

    // 2. Background Canvas Colors
    const bgSection = document.createElement('div');
    bgSection.className = 'space-y-2.5';
    bgSection.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold text-workspace-text flex items-center gap-1.5">
          ${this.getSvgIcon('palette')}
          <span>Canvas Background Color</span>
        </span>
      </div>
    `;

    const bgGrid = document.createElement('div');
    bgGrid.className = 'grid grid-cols-4 gap-2';

    for (const pal of MOODBOARD_COLOR_PALETTES) {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className =
        'p-2 rounded-lg border border-white/10 hover:border-accent transition-all cursor-pointer flex flex-col items-center gap-1 shadow-xs';
      chip.title = `${pal.name} (${pal.hex})`;
      chip.innerHTML = `
        <div class="w-6 h-6 rounded-full border border-white/20 shadow-sm" style="background-color: ${pal.hex};"></div>
        <span class="text-[10px] text-workspace-muted font-medium truncate w-full text-center">${pal.name}</span>
      `;
      chip.addEventListener('click', () => {
        setBackgroundColor(pal.hex);
      });
      bgGrid.appendChild(chip);
    }
    bgSection.appendChild(bgGrid);
    panel.appendChild(bgSection);

    // 3. Background Texture Pattern
    const patternSection = document.createElement('div');
    patternSection.className = 'space-y-2.5';
    patternSection.innerHTML = `
      <div class="text-xs font-bold text-workspace-text">Surface Grid Pattern</div>
    `;

    const patternRow = document.createElement('div');
    patternRow.className = 'flex items-center gap-1.5 p-1 bg-workspace-bg rounded-lg border border-workspace-border';

    const patterns: { id: 'dots' | 'grid' | 'none'; label: string }[] = [
      { id: 'dots', label: 'Subtle Dots' },
      { id: 'grid', label: 'Drafting Grid' },
      { id: 'none', label: 'Solid Matte' },
    ];

    for (const pat of patterns) {
      const pBtn = document.createElement('button');
      pBtn.type = 'button';
      pBtn.className =
        'flex-1 py-1 px-2 rounded-md text-xs font-medium text-workspace-muted hover:text-workspace-text transition-colors cursor-pointer text-center';
      pBtn.dataset.pattern = pat.id;
      pBtn.textContent = pat.label;
      pBtn.addEventListener('click', () => {
        setBackgroundPattern(pat.id);
      });
      patternRow.appendChild(pBtn);
    }
    patternSection.appendChild(patternRow);
    panel.appendChild(patternSection);

    // 4. Snapping & Guides
    const snapSection = document.createElement('div');
    snapSection.className = 'space-y-2.5';
    snapSection.innerHTML = `
      <div class="text-xs font-bold text-workspace-text">Snapping &amp; Precision</div>
    `;

    const snapToggles = document.createElement('div');
    snapToggles.className = 'space-y-2 p-3 rounded-xl bg-workspace-surface/50 border border-workspace-border text-xs';

    // Snap to Elements
    const snapElRow = document.createElement('label');
    snapElRow.className = 'flex items-center justify-between cursor-pointer';
    snapElRow.innerHTML = `
      <span class="text-workspace-text font-medium">Snap to Elements</span>
      <input type="checkbox" id="chk-snap-elements" class="accent-accent cursor-pointer w-4 h-4 rounded" checked />
    `;
    const snapElInput = snapElRow.querySelector('input') as HTMLInputElement;
    snapElInput.addEventListener('change', () => {
      updateConfig({ snapToElements: snapElInput.checked });
    });
    snapToggles.appendChild(snapElRow);

    // Snap to Grid
    const snapGridRow = document.createElement('label');
    snapGridRow.className = 'flex items-center justify-between cursor-pointer';
    snapGridRow.innerHTML = `
      <span class="text-workspace-text font-medium">Snap to Grid</span>
      <input type="checkbox" id="chk-snap-grid" class="accent-accent cursor-pointer w-4 h-4 rounded" checked />
    `;
    const snapGridInput = snapGridRow.querySelector('input') as HTMLInputElement;
    snapGridInput.addEventListener('change', () => {
      updateConfig({ snapToGrid: snapGridInput.checked });
    });
    snapToggles.appendChild(snapGridRow);

    snapSection.appendChild(snapToggles);
    panel.appendChild(snapSection);

    // 5. Session Manifest & Board Reset
    const manifestSection = document.createElement('div');
    manifestSection.className = 'space-y-2.5 pt-2 border-t border-workspace-border';
    manifestSection.innerHTML = `
      <div class="text-xs font-bold text-workspace-text">Project Manifest (.json)</div>
    `;

    const manifestButtons = document.createElement('div');
    manifestButtons.className = 'grid grid-cols-2 gap-2';

    const saveManifestBtn = document.createElement('button');
    saveManifestBtn.type = 'button';
    saveManifestBtn.className =
      'py-1.5 px-2.5 rounded-lg border border-workspace-border bg-workspace-surface hover:bg-workspace-surface-hover text-xs font-medium text-workspace-text flex items-center justify-center gap-1.5 transition-colors cursor-pointer';
    saveManifestBtn.innerHTML = `${this.getSvgIcon('download')}<span>Save .json</span>`;
    saveManifestBtn.addEventListener('click', () => {
      downloadMoodBoardManifest();
    });

    const loadManifestBtn = document.createElement('button');
    loadManifestBtn.type = 'button';
    loadManifestBtn.className =
      'py-1.5 px-2.5 rounded-lg border border-workspace-border bg-workspace-surface hover:bg-workspace-surface-hover text-xs font-medium text-workspace-text flex items-center justify-center gap-1.5 transition-colors cursor-pointer';
    loadManifestBtn.innerHTML = `${this.getSvgIcon('upload')}<span>Load .json</span>`;

    const manifestFileInput = document.createElement('input');
    manifestFileInput.type = 'file';
    manifestFileInput.accept = '.json,application/json';
    manifestFileInput.className = 'hidden';

    loadManifestBtn.addEventListener('click', () => manifestFileInput.click());
    manifestFileInput.addEventListener('change', async () => {
      const file = manifestFileInput.files?.[0];
      if (file) {
        try {
          const text = await file.text();
          const json = JSON.parse(text);
          const ok = importMoodBoardManifest(json, $images.get());
          if (ok) {
            this.boardCanvas.fitToScreen();
          } else {
            alert('Invalid Make Contact Sheet Mood Board manifest file.');
          }
        } catch {
          alert('Failed to parse mood board manifest JSON.');
        }
        manifestFileInput.value = '';
      }
    });

    manifestButtons.appendChild(saveManifestBtn);
    manifestButtons.appendChild(loadManifestBtn);
    manifestButtons.appendChild(manifestFileInput);
    manifestSection.appendChild(manifestButtons);

    // Reset Canvas
    const resetCanvasBtn = document.createElement('button');
    resetCanvasBtn.type = 'button';
    resetCanvasBtn.className =
      'w-full py-2 px-3 rounded-lg border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer';
    resetCanvasBtn.innerHTML = `${this.getSvgIcon('trash')}<span>Clear Canvas</span>`;
    resetCanvasBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear all elements from this mood board?')) {
        resetBoard();
      }
    });
    manifestSection.appendChild(resetCanvasBtn);

    panel.appendChild(manifestSection);

    return panel;
  }

  private syncSettingsControls(config: import('../../../lib/types').MoodBoardCanvasConfig) {
    const sizeReadout = document.getElementById('moodboard-size-readout');
    if (sizeReadout) {
      sizeReadout.textContent = `${config.width} × ${config.height} px`;
    }

    const chkSnapEl = document.getElementById('chk-snap-elements') as HTMLInputElement | null;
    if (chkSnapEl && document.activeElement !== chkSnapEl) {
      chkSnapEl.checked = config.snapToElements;
    }

    const chkSnapGrid = document.getElementById('chk-snap-grid') as HTMLInputElement | null;
    if (chkSnapGrid && document.activeElement !== chkSnapGrid) {
      chkSnapGrid.checked = config.snapToGrid;
    }
  }

  // ---------------------------------------------------------------------------
  // SVG Icon Helper
  // ---------------------------------------------------------------------------
  private getSvgIcon(name: string): string {
    const stroke = 'currentColor';
    const sw = '2';
    const cls = 'w-4 h-4';

    switch (name) {
      case 'photo':
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>`;
      case 'template':
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>`;
      case 'shapes':
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>`;
      case 'settings':
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`;
      case 'upload':
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>`;
      case 'download':
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>`;
      case 'plus':
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><path d="M12 5v14M5 12h14"/></svg>`;
      case 'x':
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><path d="M18 6 6 18M6 6l12 12"/></svg>`;
      case 'check':
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><polyline points="20 6 9 17 4 12"/></svg>`;
      case 'palette':
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`;
      case 'text':
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" x2="15" y1="20" y2="20"/><line x1="12" x2="12" y1="4" y2="20"/></svg>`;
      case 'note':
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z"/><path d="M15 3v6h6"/><path d="M9 13h6"/><path d="M9 17h3"/></svg>`;
      case 'maximize':
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3"/></svg>`;
      case 'trash':
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>`;
      default:
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><circle cx="12" cy="12" r="8"/></svg>`;
    }
  }

  public destroy() {
    if (this.unsubImages) this.unsubImages();
    if (this.unsubConfig) this.unsubConfig();
    if (this.unsubElements) this.unsubElements();
  }
}
