import {
  $moodboardSelection,
  $moodboardElements,
  $moodboardConfig,
  updateElement,
  updateElements,
  removeElements,
  duplicateSelected,
  bringForward,
  sendBackward,
  bringToFront,
  sendToBack,
  alignLeft,
  alignCenter,
  alignRight,
  alignTop,
  alignMiddle,
  alignBottom,
  distributeHorizontally,
  distributeVertically,
  matchWidth,
  matchHeight,
  getSelectionBoundingBox,
} from '../../../lib/moodboardStore';
import type { MoodBoardElement } from '../../../lib/types';
import type { BoardCanvas } from './BoardCanvas';

export class FloatingToolbar {
  private container: HTMLElement;
  private boardCanvas: BoardCanvas;
  private toolbarEl: HTMLElement;
  private isVisible = false;

  private unsubSelection?: () => void;
  private unsubElements?: () => void;
  private unsubConfig?: () => void;

  constructor(container: HTMLElement, boardCanvas: BoardCanvas) {
    this.container = container;
    this.boardCanvas = boardCanvas;

    this.toolbarEl = document.createElement('div');
    this.toolbarEl.className =
      'moodboard-floating-toolbar absolute z-40 flex items-center gap-1 p-1 bg-stone-900/95 dark:bg-stone-900/95 backdrop-blur-md border border-white/15 rounded-xl shadow-2xl transition-[opacity,transform] duration-150 select-none text-xs text-stone-100 opacity-0 pointer-events-none will-change-[transform,left,top]';
    this.toolbarEl.style.transform = 'scale(0.96)';

    // Prevent clicking inside floating toolbar from deselecting elements on canvas
    this.toolbarEl.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
    });
    this.toolbarEl.addEventListener('mousedown', (e) => {
      e.stopPropagation();
    });

    this.container.appendChild(this.toolbarEl);

    this.setupSubscriptions();
    this.update();
  }

  private setupSubscriptions() {
    this.unsubSelection = $moodboardSelection.subscribe(() => this.update());
    this.unsubElements = $moodboardElements.subscribe(() => this.updatePosition());
    this.unsubConfig = $moodboardConfig.subscribe(() => this.updatePosition());
  }

  public update() {
    const selection = $moodboardSelection.get();
    if (selection.length === 0) {
      this.hide();
      return;
    }

    const allElements = $moodboardElements.get();
    const selectedElements = allElements.filter((el) => selection.includes(el.id));

    if (selectedElements.length === 0) {
      this.hide();
      return;
    }

    this.renderToolbar(selectedElements);
    this.updatePosition();
    this.show();
  }

  public updatePosition() {
    const selection = $moodboardSelection.get();
    if (selection.length === 0 || !this.isVisible) return;

    const allElements = $moodboardElements.get();
    const selectedElements = allElements.filter((el) => selection.includes(el.id));
    if (selectedElements.length === 0) return;

    const bbox = getSelectionBoundingBox(selectedElements);

    // Convert top-center and bottom-center of bounding box to screen coordinates
    const topScreen = this.boardCanvas.boardToScreen(bbox.centerX, bbox.minY);
    const bottomScreen = this.boardCanvas.boardToScreen(bbox.centerX, bbox.maxY);

    const containerRect = this.container.getBoundingClientRect();
    const toolbarWidth = this.toolbarEl.offsetWidth || 340;
    const toolbarHeight = this.toolbarEl.offsetHeight || 38;

    // Ideal placement: 14px above top edge of selection
    let left = topScreen.x - containerRect.left - toolbarWidth / 2;
    let top = topScreen.y - containerRect.top - toolbarHeight - 14;

    // If top overflows container, flip to bottom of selection
    if (top < 10) {
      top = bottomScreen.y - containerRect.top + 14;
    }

    // Clamp horizontally within container bounds
    const maxLeft = Math.max(10, this.container.clientWidth - toolbarWidth - 12);
    left = Math.max(10, Math.min(maxLeft, left));

    // Clamp vertically within container bounds
    const maxTop = Math.max(10, this.container.clientHeight - toolbarHeight - 10);
    top = Math.max(10, Math.min(maxTop, top));

    this.toolbarEl.style.left = `${Math.round(left)}px`;
    this.toolbarEl.style.top = `${Math.round(top)}px`;
  }

  private show() {
    this.isVisible = true;
    this.toolbarEl.classList.remove('opacity-0', 'pointer-events-none');
    this.toolbarEl.classList.add('opacity-100', 'pointer-events-auto');
    this.toolbarEl.style.transform = 'scale(1)';
  }

  private hide() {
    this.isVisible = false;
    this.toolbarEl.classList.remove('opacity-100', 'pointer-events-auto');
    this.toolbarEl.classList.add('opacity-0', 'pointer-events-none');
    this.toolbarEl.style.transform = 'scale(0.96)';
  }

  private renderToolbar(selectedElements: MoodBoardElement[]) {
    this.toolbarEl.innerHTML = '';
    const count = selectedElements.length;
    const primary = selectedElements[0];

    // Single vs Multi-select mode
    if (count === 1) {
      this.renderSingleElementControls(primary);
    } else {
      this.renderMultiElementControls(selectedElements);
    }

    // Universal Common Divider
    this.addDivider();

    // Universal Controls: Layering, Opacity, Rotate, Duplicate, Delete
    this.renderUniversalControls(selectedElements);
  }

  // ---------------------------------------------------------------------------
  // Single Element Contextual Controls
  // ---------------------------------------------------------------------------
  private renderSingleElementControls(el: MoodBoardElement) {
    switch (el.type) {
      case 'image':
        this.renderImageControls(el);
        break;
      case 'text':
        this.renderTextControls(el);
        break;
      case 'swatch':
        this.renderSwatchControls(el);
        break;
      case 'note':
        this.renderNoteControls(el);
        break;
      case 'shape':
        this.renderShapeControls(el);
        break;
    }
  }

  private renderImageControls(el: MoodBoardElement) {
    // 1. Fit Toggle (Cover / Contain)
    const fitBtn = this.createButton({
      icon: el.fit === 'contain' ? 'fit-contain' : 'fit-cover',
      label: el.fit === 'contain' ? 'Fit: Contain' : 'Fit: Cover',
      title: 'Toggle Image Fit (Cover / Contain)',
      onClick: () => {
        const nextFit = el.fit === 'contain' ? 'cover' : 'contain';
        updateElement(el.id, { fit: nextFit }, true);
      },
    });
    this.toolbarEl.appendChild(fitBtn);

    // 2. Corner Radius Quick Toggle
    const radiusBtn = this.createButton({
      icon: 'corner-radius',
      label: `${el.borderRadius ?? 6}px`,
      title: 'Adjust Corner Radius',
      onClick: () => {
        const rads = [0, 4, 8, 16, 28];
        const cur = el.borderRadius ?? 6;
        const nextIdx = (rads.indexOf(cur) + 1) % rads.length;
        updateElement(el.id, { borderRadius: rads[nextIdx] }, true);
      },
    });
    this.toolbarEl.appendChild(radiusBtn);

    // 3. Border Width Toggle
    const borderBtn = this.createButton({
      icon: 'border-width',
      label: `${el.borderWidth ?? 0}px`,
      title: 'Cycle Border Width (0, 2, 4, 8px)',
      onClick: () => {
        const borders = [0, 2, 4, 8];
        const cur = el.borderWidth ?? 0;
        const nextIdx = (borders.indexOf(cur) + 1) % borders.length;
        const nextWidth = borders[nextIdx];
        updateElement(
          el.id,
          {
            borderWidth: nextWidth,
            borderColor: nextWidth > 0 ? (el.borderColor || '#ffffff') : undefined,
          },
          true
        );
      },
    });
    this.toolbarEl.appendChild(borderBtn);

    // 4. Shadow Toggle
    const shadowBtn = this.createButton({
      icon: 'shadow',
      label: el.shadow !== false ? 'Shadow' : 'Flat',
      active: el.shadow !== false,
      title: 'Toggle Drop Shadow',
      onClick: () => {
        updateElement(el.id, { shadow: el.shadow === false }, true);
      },
    });
    this.toolbarEl.appendChild(shadowBtn);
  }

  private renderTextControls(el: MoodBoardElement) {
    // 1. Font Size +/-
    const decreaseFontBtn = this.createIconButton({
      icon: 'minus',
      title: 'Decrease Font Size',
      onClick: () => {
        const cur = el.fontSize || 24;
        updateElement(el.id, { fontSize: Math.max(12, cur - 2) }, true);
      },
    });
    const sizeBadge = document.createElement('span');
    sizeBadge.className = 'px-1 text-[11px] font-mono text-stone-300 min-w-[28px] text-center';
    sizeBadge.textContent = `${el.fontSize || 24}px`;

    const increaseFontBtn = this.createIconButton({
      icon: 'plus',
      title: 'Increase Font Size',
      onClick: () => {
        const cur = el.fontSize || 24;
        updateElement(el.id, { fontSize: Math.min(96, cur + 2) }, true);
      },
    });

    const fontGroup = document.createElement('div');
    fontGroup.className = 'flex items-center bg-white/5 rounded-lg p-0.5 border border-white/10';
    fontGroup.appendChild(decreaseFontBtn);
    fontGroup.appendChild(sizeBadge);
    fontGroup.appendChild(increaseFontBtn);
    this.toolbarEl.appendChild(fontGroup);

    // 2. Font Weight Toggle (Normal / Bold)
    const isBold = el.fontWeight === '700' || el.fontWeight === 'bold';
    const boldBtn = this.createIconButton({
      icon: 'bold',
      active: isBold,
      title: 'Toggle Bold Weight',
      onClick: () => {
        updateElement(el.id, { fontWeight: isBold ? '400' : '700' }, true);
      },
    });
    this.toolbarEl.appendChild(boldBtn);

    // 3. Text Alignment (Left / Center / Right)
    const alignBtn = this.createIconButton({
      icon: el.textAlign === 'center' ? 'align-center' : el.textAlign === 'right' ? 'align-right' : 'align-left',
      title: `Text Align (${el.textAlign || 'left'})`,
      onClick: () => {
        const nextAlign = el.textAlign === 'left' || !el.textAlign ? 'center' : el.textAlign === 'center' ? 'right' : 'left';
        updateElement(el.id, { textAlign: nextAlign }, true);
      },
    });
    this.toolbarEl.appendChild(alignBtn);

    // 4. Color Picker input
    const colorWrap = this.createColorPicker(el.color || '#ffffff', (newColor) => {
      updateElement(el.id, { color: newColor }, true);
    });
    this.toolbarEl.appendChild(colorWrap);
  }

  private renderSwatchControls(el: MoodBoardElement) {
    const currentColor = el.backgroundColor || el.content || '#d97706';

    // 1. Color Picker
    const colorWrap = this.createColorPicker(currentColor, (newColor) => {
      updateElement(
        el.id,
        {
          backgroundColor: newColor,
          content: newColor,
          label: el.label === currentColor ? newColor : el.label,
        },
        true
      );
    });
    this.toolbarEl.appendChild(colorWrap);

    // 2. Edit Label Button
    const labelBtn = this.createButton({
      icon: 'edit',
      label: 'Rename',
      title: 'Rename Swatch Label',
      onClick: () => {
        const next = window.prompt('Swatch Label:', el.label || currentColor);
        if (next !== null && next.trim().length > 0) {
          updateElement(el.id, { label: next.trim() }, true);
        }
      },
    });
    this.toolbarEl.appendChild(labelBtn);
  }

  private renderNoteControls(el: MoodBoardElement) {
    // Note color presets palette
    const colors = [
      { name: 'Yellow', hex: '#fef3c7', text: '#1c1917' },
      { name: 'Rose', hex: '#ffe4e6', text: '#1c1917' },
      { name: 'Sage', hex: '#dcfce7', text: '#14532d' },
      { name: 'Blue', hex: '#e0f2fe', text: '#0c4a6e' },
      { name: 'Slate', hex: '#1e293b', text: '#f8fafc' },
    ];

    const noteColorsWrap = document.createElement('div');
    noteColorsWrap.className = 'flex items-center gap-1 px-1';

    for (const c of colors) {
      const dot = document.createElement('button');
      dot.className =
        'w-4 h-4 rounded-full border transition-transform hover:scale-125 cursor-pointer flex-shrink-0';
      dot.style.backgroundColor = c.hex;
      dot.style.borderColor = el.backgroundColor === c.hex ? '#c98a46' : 'rgba(255,255,255,0.2)';
      if (el.backgroundColor === c.hex) {
        dot.style.boxShadow = '0 0 0 1.5px #c98a46';
      }
      dot.title = `${c.name} Note`;
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        updateElement(el.id, { backgroundColor: c.hex, color: c.text }, true);
      });
      noteColorsWrap.appendChild(dot);
    }
    this.toolbarEl.appendChild(noteColorsWrap);
  }

  private renderShapeControls(el: MoodBoardElement) {
    const colorWrap = this.createColorPicker(el.backgroundColor || '#ffffff', (newColor) => {
      updateElement(el.id, { backgroundColor: newColor }, true);
    });
    this.toolbarEl.appendChild(colorWrap);
  }

  // ---------------------------------------------------------------------------
  // Multi-Element Contextual Controls (Align & Distribute)
  // ---------------------------------------------------------------------------
  private renderMultiElementControls(_selectedElements: MoodBoardElement[]) {
    // Alignment group
    const alignLeftBtn = this.createIconButton({
      icon: 'align-left',
      title: 'Align Left',
      onClick: () => alignLeft(),
    });
    const alignCenterBtn = this.createIconButton({
      icon: 'align-center',
      title: 'Align Center',
      onClick: () => alignCenter(),
    });
    const alignRightBtn = this.createIconButton({
      icon: 'align-right',
      title: 'Align Right',
      onClick: () => alignRight(),
    });
    const alignTopBtn = this.createIconButton({
      icon: 'align-top',
      title: 'Align Top',
      onClick: () => alignTop(),
    });
    const alignMiddleBtn = this.createIconButton({
      icon: 'align-middle',
      title: 'Align Middle',
      onClick: () => alignMiddle(),
    });
    const alignBottomBtn = this.createIconButton({
      icon: 'align-bottom',
      title: 'Align Bottom',
      onClick: () => alignBottom(),
    });

    const alignGroup = document.createElement('div');
    alignGroup.className = 'flex items-center bg-white/5 rounded-lg p-0.5 border border-white/10 gap-0.5';
    alignGroup.appendChild(alignLeftBtn);
    alignGroup.appendChild(alignCenterBtn);
    alignGroup.appendChild(alignRightBtn);
    alignGroup.appendChild(alignTopBtn);
    alignGroup.appendChild(alignMiddleBtn);
    alignGroup.appendChild(alignBottomBtn);
    this.toolbarEl.appendChild(alignGroup);

    // Distribution group
    const distHBtn = this.createIconButton({
      icon: 'distribute-h',
      title: 'Distribute Horizontally',
      onClick: () => distributeHorizontally(),
    });
    const distVBtn = this.createIconButton({
      icon: 'distribute-v',
      title: 'Distribute Vertically',
      onClick: () => distributeVertically(),
    });
    const matchWBtn = this.createIconButton({
      icon: 'match-width',
      title: 'Match Width',
      onClick: () => matchWidth(),
    });
    const matchHBtn = this.createIconButton({
      icon: 'match-height',
      title: 'Match Height',
      onClick: () => matchHeight(),
    });

    const distGroup = document.createElement('div');
    distGroup.className = 'flex items-center bg-white/5 rounded-lg p-0.5 border border-white/10 gap-0.5';
    distGroup.appendChild(distHBtn);
    distGroup.appendChild(distVBtn);
    distGroup.appendChild(matchWBtn);
    distGroup.appendChild(matchHBtn);
    this.toolbarEl.appendChild(distGroup);
  }

  // ---------------------------------------------------------------------------
  // Universal Action Controls (Layering, Opacity, Rotate, Duplicate, Delete)
  // ---------------------------------------------------------------------------
  private renderUniversalControls(selectedElements: MoodBoardElement[]) {
    // 1. Layer Ordering (Bring Forward, Send Backward)
    const layerForwardBtn = this.createIconButton({
      icon: 'bring-forward',
      title: 'Bring Forward ( ] )',
      onClick: () => bringForward(),
    });
    const layerBackwardBtn = this.createIconButton({
      icon: 'send-backward',
      title: 'Send Backward ( [ )',
      onClick: () => sendBackward(),
    });
    const layerFrontBtn = this.createIconButton({
      icon: 'bring-to-front',
      title: 'Bring to Front ( Cmd + ] )',
      onClick: () => bringToFront(),
    });
    const layerBackBtn = this.createIconButton({
      icon: 'send-to-back',
      title: 'Send to Back ( Cmd + [ )',
      onClick: () => sendToBack(),
    });

    const layerGroup = document.createElement('div');
    layerGroup.className = 'flex items-center bg-white/5 rounded-lg p-0.5 border border-white/10 gap-0.5';
    layerGroup.appendChild(layerFrontBtn);
    layerGroup.appendChild(layerForwardBtn);
    layerGroup.appendChild(layerBackwardBtn);
    layerGroup.appendChild(layerBackBtn);
    this.toolbarEl.appendChild(layerGroup);

    // 2. Rotate 90°
    const rotate90Btn = this.createIconButton({
      icon: 'rotate-cw',
      title: 'Rotate 90° Clockwise',
      onClick: () => {
        const updates = selectedElements.map((el) => {
          let nextRot = Math.round((el.rotation || 0) + 90);
          while (nextRot > 180) nextRot -= 360;
          return {
            id: el.id,
            changes: { rotation: nextRot },
          };
        });
        updateElements(updates, true);
      },
    });
    this.toolbarEl.appendChild(rotate90Btn);

    // 3. Opacity Slider
    const firstOpacity = Math.round((selectedElements[0]?.opacity ?? 1) * 100);
    const opacityBtn = this.createButton({
      icon: 'opacity',
      label: `${firstOpacity}%`,
      title: 'Cycle Opacity (100%, 80%, 60%, 40%)',
      onClick: () => {
        const opacities = [1, 0.8, 0.6, 0.4];
        const cur = selectedElements[0]?.opacity ?? 1;
        const nextIdx = (opacities.indexOf(cur) + 1) % opacities.length;
        const nextOpacity = opacities[nextIdx];
        const updates = selectedElements.map((el) => ({
          id: el.id,
          changes: { opacity: nextOpacity },
        }));
        updateElements(updates, true);
      },
    });
    this.toolbarEl.appendChild(opacityBtn);

    // 4. Duplicate (Cmd+D)
    const duplicateBtn = this.createIconButton({
      icon: 'copy',
      title: 'Duplicate Selection (Cmd + D)',
      onClick: () => duplicateSelected(24),
    });
    this.toolbarEl.appendChild(duplicateBtn);

    // 5. Delete (Backspace)
    const deleteBtn = this.createIconButton({
      icon: 'trash',
      title: 'Delete Selection (Backspace)',
      danger: true,
      onClick: () => removeElements(),
    });
    this.toolbarEl.appendChild(deleteBtn);
  }

  // ---------------------------------------------------------------------------
  // UI Builder Helpers
  // ---------------------------------------------------------------------------
  private addDivider() {
    const div = document.createElement('div');
    div.className = 'w-[1px] h-4 bg-white/15 my-auto mx-0.5 flex-shrink-0';
    this.toolbarEl.appendChild(div);
  }

  private createButton(opts: {
    icon?: string;
    label: string;
    title: string;
    active?: boolean;
    onClick: () => void;
  }): HTMLElement {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `h-7 px-2 rounded-lg text-[11px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer flex-shrink-0 ${
      opts.active
        ? 'bg-amber-600/30 text-amber-300 border border-amber-500/40'
        : 'hover:bg-white/10 text-stone-200 hover:text-white'
    }`;
    btn.title = opts.title;

    if (opts.icon) {
      btn.innerHTML = `${this.getSvgIcon(opts.icon)}<span>${opts.label}</span>`;
    } else {
      btn.textContent = opts.label;
    }

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      opts.onClick();
    });

    return btn;
  }

  private createIconButton(opts: {
    icon: string;
    title: string;
    active?: boolean;
    danger?: boolean;
    onClick: () => void;
  }): HTMLElement {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `w-7 h-7 rounded-lg flex items-center justify-center transition-colors cursor-pointer flex-shrink-0 ${
      opts.danger
        ? 'hover:bg-rose-500/20 text-rose-400 hover:text-rose-300'
        : opts.active
        ? 'bg-amber-600/30 text-amber-300 border border-amber-500/40'
        : 'hover:bg-white/10 text-stone-300 hover:text-white'
    }`;
    btn.title = opts.title;
    btn.innerHTML = this.getSvgIcon(opts.icon);

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      opts.onClick();
    });

    return btn;
  }

  private createColorPicker(initialColor: string, onChange: (color: string) => void): HTMLElement {
    const wrap = document.createElement('div');
    wrap.className = 'relative w-6 h-6 rounded-md overflow-hidden border border-white/20 flex-shrink-0 cursor-pointer shadow-sm';

    const input = document.createElement('input');
    input.type = 'color';
    input.value = initialColor.startsWith('#') ? initialColor : '#d97706';
    input.className = 'absolute -inset-2 w-10 h-10 cursor-pointer opacity-0';

    const preview = document.createElement('div');
    preview.className = 'w-full h-full';
    preview.style.backgroundColor = initialColor;

    input.addEventListener('input', (e) => {
      e.stopPropagation();
      const val = (e.target as HTMLInputElement).value;
      preview.style.backgroundColor = val;
      onChange(val);
    });

    wrap.appendChild(preview);
    wrap.appendChild(input);
    return wrap;
  }

  private getSvgIcon(name: string): string {
    const stroke = 'currentColor';
    const sw = '2';
    const cls = 'w-3.5 h-3.5';

    switch (name) {
      case 'trash':
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>`;
      case 'copy':
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
      case 'rotate-cw':
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>`;
      case 'opacity':
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"/></svg>`;
      case 'bring-forward':
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><rect x="8" y="8" width="12" height="12" rx="1"/><path d="M4 16V4h12"/></svg>`;
      case 'send-backward':
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><rect x="4" y="4" width="12" height="12" rx="1"/><path d="M16 8v12H8"/></svg>`;
      case 'bring-to-front':
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><rect x="9" y="9" width="12" height="12" rx="1" fill="currentColor" fill-opacity="0.3"/><path d="M3 15V3h12"/></svg>`;
      case 'send-to-back':
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><rect x="3" y="3" width="12" height="12" rx="1"/><path d="M9 21h12V9"/></svg>`;
      case 'fit-cover':
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`;
      case 'fit-contain':
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><rect x="3" y="3" width="18" height="18" rx="2"/><rect x="7" y="7" width="10" height="10" rx="1"/></svg>`;
      case 'corner-radius':
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><path d="M4 20v-5a9 9 0 0 1 9-9h7"/></svg>`;
      case 'border-width':
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><rect x="3" y="3" width="18" height="18" rx="2" stroke-width="3"/></svg>`;
      case 'shadow':
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><rect x="3" y="3" width="14" height="14" rx="2"/><path d="M7 21h12a2 2 0 0 0 2-2V7"/></svg>`;
      case 'bold':
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/></svg>`;
      case 'align-left':
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><line x1="21" y1="6" x2="3" y2="6"/><line x1="15" y1="12" x2="3" y2="12"/><line x1="17" y1="18" x2="3" y2="18"/></svg>`;
      case 'align-center':
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><line x1="18" y1="6" x2="6" y2="6"/><line x1="21" y1="12" x2="3" y2="12"/><line x1="18" y1="18" x2="6" y2="18"/></svg>`;
      case 'align-right':
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="12" x2="9" y2="12"/><line x1="21" y1="18" x2="7" y2="18"/></svg>`;
      case 'align-top':
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><line x1="4" y1="4" x2="20" y2="4"/><rect x="7" y="8" width="4" height="10" rx="1"/><rect x="13" y="8" width="4" height="6" rx="1"/></svg>`;
      case 'align-middle':
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><line x1="4" y1="12" x2="20" y2="12"/><rect x="7" y="7" width="4" height="10" rx="1"/><rect x="13" y="9" width="4" height="6" rx="1"/></svg>`;
      case 'align-bottom':
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><line x1="4" y1="20" x2="20" y2="20"/><rect x="7" y="6" width="4" height="10" rx="1"/><rect x="13" y="10" width="4" height="6" rx="1"/></svg>`;
      case 'distribute-h':
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><rect x="4" y="6" width="4" height="12" rx="1"/><rect x="16" y="6" width="4" height="12" rx="1"/><path d="M12 3v18"/></svg>`;
      case 'distribute-v':
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><rect x="6" y="4" width="12" height="4" rx="1"/><rect x="6" y="16" width="12" height="4" rx="1"/><path d="M3 12h18"/></svg>`;
      case 'match-width':
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><path d="M3 7h18M3 17h18M7 3l-4 4 4 4M17 3l4 4-4 4"/></svg>`;
      case 'match-height':
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><path d="M7 3v18M17 3v18M3 7l4-4 4 4M3 17l4 4 4-4"/></svg>`;
      case 'edit':
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`;
      case 'plus':
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><path d="M12 5v14M5 12h14"/></svg>`;
      case 'minus':
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><path d="M5 12h14"/></svg>`;
      default:
        return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${sw}"><circle cx="12" cy="12" r="8"/></svg>`;
    }
  }

  public destroy() {
    if (this.unsubSelection) this.unsubSelection();
    if (this.unsubElements) this.unsubElements();
    if (this.unsubConfig) this.unsubConfig();

    if (this.toolbarEl.parentElement) {
      this.toolbarEl.parentElement.removeChild(this.toolbarEl);
    }
  }
}
