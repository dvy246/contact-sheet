import type { MoodBoardElement } from '../../../lib/types';
import { updateElement } from '../../../lib/moodboardStore';

export type HandleType =
  | 'nw'
  | 'n'
  | 'ne'
  | 'e'
  | 'se'
  | 's'
  | 'sw'
  | 'w'
  | 'rotate';

export interface BoardElementCallbacks {
  onPointerDownOnElement: (id: string, e: PointerEvent) => void;
  onPointerDownOnHandle: (id: string, handle: HandleType, e: PointerEvent) => void;
  onDoubleClick: (id: string, e: MouseEvent) => void;
}

/**
 * High-performance DOM wrapper for an individual Mood Board element.
 * Manages rendering, inline content editing, bounding box, selection chrome,
 * 8-point resize handles, and rotation knob.
 */
export class BoardElement {
  private elementData: MoodBoardElement;
  private callbacks: BoardElementCallbacks;
  private domNode: HTMLElement;
  private contentContainer: HTMLElement;
  private selectionChrome: HTMLElement;
  private dimensionBadge: HTMLElement;
  private isSelected = false;
  private isEditingText = false;
  private activeTextEditor: HTMLElement | HTMLInputElement | HTMLTextAreaElement | null = null;

  constructor(element: MoodBoardElement, callbacks: BoardElementCallbacks) {
    this.elementData = element;
    this.callbacks = callbacks;

    // 1. Root DOM element
    this.domNode = document.createElement('div');
    this.domNode.className = 'moodboard-element-wrapper group absolute select-none';
    this.domNode.dataset.elementId = element.id;
    this.domNode.style.touchAction = 'none';
    this.domNode.style.willChange = 'transform, left, top, width, height';

    // 2. Content Container
    this.contentContainer = document.createElement('div');
    this.contentContainer.className = 'moodboard-element-content w-full h-full relative overflow-hidden transition-[box-shadow,border-color] duration-150';
    this.domNode.appendChild(this.contentContainer);

    // 3. Selection Chrome & Handles Overlay
    this.selectionChrome = document.createElement('div');
    this.selectionChrome.className = 'moodboard-element-chrome absolute inset-0 pointer-events-none hidden';
    this.domNode.appendChild(this.selectionChrome);

    // 4. Dimension / Rotation Readout Badge
    this.dimensionBadge = document.createElement('div');
    this.dimensionBadge.className = 'moodboard-dimension-badge absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-black/85 backdrop-blur-md text-[10px] font-mono text-white/95 font-medium shadow-lg pointer-events-none hidden whitespace-nowrap z-50 border border-white/10';
    this.selectionChrome.appendChild(this.dimensionBadge);

    this.buildChrome();
    this.renderContent();
    this.applyTransform();
    this.setupEvents();
  }

  public getDomNode(): HTMLElement {
    return this.domNode;
  }

  public getId(): string {
    return this.elementData.id;
  }

  public getData(): MoodBoardElement {
    return this.elementData;
  }

  public isEditing(): boolean {
    return this.isEditingText;
  }

  /**
   * Builds selection outline, 8 resize handles, rotation handle, and connector stem.
   */
  private buildChrome() {
    this.selectionChrome.innerHTML = '';

    // Selection border outline
    const outline = document.createElement('div');
    outline.className = 'absolute -inset-0.5 border-[1.5px] border-[#c98a46] rounded-[inherit] pointer-events-none shadow-[0_0_0_1px_rgba(201,138,70,0.35),0_4px_12px_rgba(0,0,0,0.15)]';
    this.selectionChrome.appendChild(outline);

    // 8-Point Resize Handles definition
    const handles: { type: HandleType; classes: string }[] = [
      { type: 'nw', classes: '-top-1.5 -left-1.5 cursor-nwse-resize' },
      { type: 'n', classes: '-top-1.5 left-1/2 -translate-x-1/2 cursor-ns-resize' },
      { type: 'ne', classes: '-top-1.5 -right-1.5 cursor-nesw-resize' },
      { type: 'e', classes: 'top-1/2 -right-1.5 -translate-y-1/2 cursor-ew-resize' },
      { type: 'se', classes: '-bottom-1.5 -right-1.5 cursor-nwse-resize' },
      { type: 's', classes: '-bottom-1.5 left-1/2 -translate-x-1/2 cursor-ns-resize' },
      { type: 'sw', classes: '-bottom-1.5 -left-1.5 cursor-nesw-resize' },
      { type: 'w', classes: 'top-1/2 -left-1.5 -translate-y-1/2 cursor-ew-resize' },
    ];

    for (const h of handles) {
      const handleEl = document.createElement('div');
      handleEl.className = `absolute w-3 h-3 bg-white dark:bg-stone-900 border-[1.5px] border-[#9c5a1c] dark:border-[#d99a4e] rounded-full shadow-md pointer-events-auto hover:scale-125 transition-transform z-30 ${h.classes}`;
      handleEl.dataset.handle = h.type;
      this.selectionChrome.appendChild(handleEl);
    }

    // Rotation Handle & Stem
    const stem = document.createElement('div');
    stem.className = 'absolute -top-6 left-1/2 -translate-x-1/2 w-[1.5px] h-6 bg-[#c98a46] pointer-events-none';
    this.selectionChrome.appendChild(stem);

    const rotateHandle = document.createElement('div');
    rotateHandle.className = 'absolute -top-8 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-stone-900 border-[1.5px] border-[#9c5a1c] dark:border-[#d99a4e] rounded-full shadow-md pointer-events-auto cursor-grab active:cursor-grabbing hover:scale-125 transition-transform flex items-center justify-center z-30';
    rotateHandle.dataset.handle = 'rotate';
    rotateHandle.innerHTML = `
      <svg class="w-2.5 h-2.5 text-[#9c5a1c] dark:text-[#d99a4e]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/>
        <path d="M21 3v5h-5"/>
      </svg>
    `;
    this.selectionChrome.appendChild(rotateHandle);
    this.selectionChrome.appendChild(this.dimensionBadge);
  }

  /**
   * Renders the element content according to its specific type.
   */
  private renderContent() {
    const el = this.elementData;
    const container = this.contentContainer;
    container.innerHTML = '';

    // Apply common box styles
    const borderRadius = el.borderRadius ?? 6;
    container.style.borderRadius = `${borderRadius}px`;
    container.style.opacity = `${el.opacity ?? 1}`;

    if (el.borderWidth && el.borderWidth > 0) {
      container.style.border = `${el.borderWidth}px solid ${el.borderColor || 'rgba(255,255,255,0.2)'}`;
    } else {
      container.style.border = 'none';
    }

    if (el.shadow !== false) {
      container.style.boxShadow = '0 8px 24px -4px rgba(0, 0, 0, 0.28), 0 2px 6px -1px rgba(0, 0, 0, 0.12)';
    } else {
      container.style.boxShadow = 'none';
    }

    switch (el.type) {
      case 'image':
        this.renderImageElement(container);
        break;

      case 'text':
        this.renderTextElement(container);
        break;

      case 'swatch':
        this.renderSwatchElement(container);
        break;

      case 'note':
        this.renderNoteElement(container);
        break;

      case 'shape':
        this.renderShapeElement(container);
        break;
    }
  }

  /**
   * Image Element Rendering
   */
  private renderImageElement(container: HTMLElement) {
    const el = this.elementData;
    container.style.backgroundColor = '#1c1917';

    const imgWrap = document.createElement('div');
    imgWrap.className = 'w-full h-full relative overflow-hidden flex items-center justify-center bg-black/10';

    if (el.content) {
      const img = document.createElement('img');
      img.src = el.content;
      img.alt = el.label || 'Mood board image';
      img.draggable = false;
      img.className = 'w-full h-full select-none pointer-events-none';
      img.style.objectFit = el.fit || 'cover';

      if (el.crop) {
        // Render with crop offset viewport
        const { x, y, width, height } = el.crop;
        img.style.position = 'absolute';
        img.style.width = `${(1 / width) * 100}%`;
        img.style.height = `${(1 / height) * 100}%`;
        img.style.left = `-${(x / width) * 100}%`;
        img.style.top = `-${(y / height) * 100}%`;
      }

      img.onerror = () => {
        imgWrap.innerHTML = `
          <div class="flex flex-col items-center justify-center p-4 text-center text-white/50 space-y-1.5">
            <svg class="w-8 h-8 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="M21 15l-5-5L5 21"/>
            </svg>
            <span class="text-[11px] font-mono font-medium">Image unavailable</span>
          </div>
        `;
      };

      imgWrap.appendChild(img);
    } else {
      imgWrap.innerHTML = `
        <div class="flex flex-col items-center justify-center p-4 text-center text-white/40 space-y-1">
          <svg class="w-8 h-8 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <path d="M21 15l-5-5L5 21"/>
          </svg>
          <span class="text-[10px] font-mono">Empty frame</span>
        </div>
      `;
    }

    // Optional subtle photo label badge
    if (el.label && el.label.trim().length > 0) {
      const labelBadge = document.createElement('div');
      labelBadge.className = 'absolute bottom-2 left-2 max-w-[85%] px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] font-mono text-white/90 truncate pointer-events-none border border-white/10 shadow-sm';
      labelBadge.textContent = el.label;
      imgWrap.appendChild(labelBadge);
    }

    container.appendChild(imgWrap);
  }

  /**
   * Text Element Rendering with Inline Editable Support
   */
  private renderTextElement(container: HTMLElement) {
    const el = this.elementData;
    container.style.backgroundColor = el.backgroundColor || 'transparent';

    const textDiv = document.createElement('div');
    textDiv.className = 'moodboard-text-display w-full h-full flex flex-col justify-center px-3 py-2 leading-snug break-words select-none overflow-hidden';
    textDiv.style.fontSize = `${el.fontSize || 24}px`;
    textDiv.style.fontFamily = el.fontFamily || 'system-ui, -apple-system, sans-serif';
    textDiv.style.fontWeight = `${el.fontWeight || '600'}`;
    textDiv.style.textAlign = el.textAlign || 'left';
    textDiv.style.color = el.color || '#ffffff';

    const rawContent = el.content || 'Click to edit text';
    textDiv.textContent = '';
    const textLines = rawContent.split('\n');
    textLines.forEach((line, idx) => {
      if (idx > 0) textDiv.appendChild(document.createElement('br'));
      textDiv.appendChild(document.createTextNode(line));
    });

    container.appendChild(textDiv);
  }

  /**
   * Swatch Element Rendering (Designer Color Card)
   */
  private renderSwatchElement(container: HTMLElement) {
    const el = this.elementData;
    const colorHex = el.backgroundColor || el.content || '#d97706';
    const label = el.label || colorHex;

    container.style.backgroundColor = '#181513';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';

    const swatchCard = document.createElement('div');
    swatchCard.className = 'w-full h-full flex flex-col overflow-hidden bg-stone-900 border border-white/10';

    // Color Fill Box
    const colorBox = document.createElement('div');
    colorBox.className = 'flex-1 w-full transition-colors relative';
    colorBox.style.backgroundColor = colorHex;

    // Specular reflection accent
    const specular = document.createElement('div');
    specular.className = 'absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/15 pointer-events-none';
    colorBox.appendChild(specular);

    // Label Bar
    const labelBar = document.createElement('div');
    labelBar.className = 'px-2.5 py-1.5 bg-stone-950/95 flex items-center justify-between gap-1 text-[10px] font-mono border-t border-white/10 select-none';

    const labelSpan = document.createElement('span');
    labelSpan.className = 'font-semibold text-white/90 truncate';
    labelSpan.textContent = label;

    const hexSpan = document.createElement('span');
    hexSpan.className = 'text-white/60 text-[9px] uppercase tracking-wider shrink-0';
    hexSpan.textContent = colorHex;

    labelBar.appendChild(labelSpan);
    labelBar.appendChild(hexSpan);

    swatchCard.appendChild(colorBox);
    swatchCard.appendChild(labelBar);

    container.appendChild(swatchCard);
  }

  /**
   * Note Element Rendering (Stylist / Lighting Sticky Note)
   */
  private renderNoteElement(container: HTMLElement) {
    const el = this.elementData;
    const noteBg = el.backgroundColor || '#fef3c7';
    const noteText = el.color || '#1c1917';

    container.style.backgroundColor = noteBg;

    const noteWrap = document.createElement('div');
    noteWrap.className = 'w-full h-full p-3.5 flex flex-col justify-between overflow-hidden relative shadow-inner';

    // Subtle paper tape / pin accent on top
    const tape = document.createElement('div');
    tape.className = 'absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-5 bg-white/40 backdrop-blur-[1px] border border-black/5 shadow-sm rotate-[-1.5deg] pointer-events-none';
    noteWrap.appendChild(tape);

    const noteBody = document.createElement('div');
    noteBody.className = 'moodboard-note-body w-full flex-1 overflow-hidden leading-relaxed break-words pt-1.5';
    noteBody.style.color = noteText;
    noteBody.style.fontSize = `${el.fontSize || 13}px`;
    noteBody.style.fontFamily = el.fontFamily || 'system-ui, sans-serif';
    noteBody.style.fontWeight = `${el.fontWeight || '400'}`;

    const text = el.content || 'Note content...';
    noteBody.textContent = '';
    const noteLines = text.split('\n');
    noteLines.forEach((line, idx) => {
      if (idx > 0) noteBody.appendChild(document.createElement('br'));
      noteBody.appendChild(document.createTextNode(line));
    });

    noteWrap.appendChild(noteBody);
    container.appendChild(noteWrap);
  }

  /**
   * Shape Element Rendering
   */
  private renderShapeElement(container: HTMLElement) {
    const el = this.elementData;
    container.style.backgroundColor = el.backgroundColor || 'rgba(255, 255, 255, 0.08)';
  }

  /**
   * Synchronizes element transforms (position, size, rotation, z-index) without layout thrashing.
   */
  public applyTransform() {
    const el = this.elementData;
    this.domNode.style.left = `${el.x}px`;
    this.domNode.style.top = `${el.y}px`;
    this.domNode.style.width = `${el.width}px`;
    this.domNode.style.height = `${el.height}px`;
    this.domNode.style.transform = `rotate(${el.rotation || 0}deg)`;
    this.domNode.style.zIndex = `${el.zIndex || 1}`;
  }

  /**
   * Live transform update during active user manipulation (drag / resize / rotate).
   */
  public setLiveTransform(
    x: number,
    y: number,
    width: number,
    height: number,
    rotation: number,
    readoutBadge?: string
  ) {
    this.domNode.style.left = `${x}px`;
    this.domNode.style.top = `${y}px`;
    this.domNode.style.width = `${width}px`;
    this.domNode.style.height = `${height}px`;
    this.domNode.style.transform = `rotate(${rotation}deg)`;

    if (readoutBadge) {
      this.dimensionBadge.textContent = readoutBadge;
      this.dimensionBadge.classList.remove('hidden');
    } else {
      this.dimensionBadge.classList.add('hidden');
    }
  }

  public hideReadoutBadge() {
    this.dimensionBadge.classList.add('hidden');
  }

  /**
   * Updates element data and refreshes view.
   */
  public update(element: MoodBoardElement, isSelected: boolean, isMultiSelected: boolean) {
    const prevType = this.elementData.type;
    const prevContent = this.elementData.content;
    const prevBg = this.elementData.backgroundColor;
    const prevColor = this.elementData.color;
    const prevLabel = this.elementData.label;
    const prevFont = `${this.elementData.fontSize}_${this.elementData.fontWeight}_${this.elementData.textAlign}`;
    const prevRadius = this.elementData.borderRadius;
    const prevBorderWidth = this.elementData.borderWidth;
    const prevBorderColor = this.elementData.borderColor;
    const prevShadow = this.elementData.shadow;
    const prevFit = this.elementData.fit;
    const prevCrop = JSON.stringify(this.elementData.crop);

    this.elementData = element;
    this.setSelected(isSelected, isMultiSelected);
    this.applyTransform();

    const newFont = `${element.fontSize}_${element.fontWeight}_${element.textAlign}`;

    // Only rebuild DOM content when content properties change, preventing flicker
    if (
      prevType !== element.type ||
      prevContent !== element.content ||
      prevBg !== element.backgroundColor ||
      prevColor !== element.color ||
      prevLabel !== element.label ||
      prevFont !== newFont ||
      prevRadius !== element.borderRadius ||
      prevBorderWidth !== element.borderWidth ||
      prevBorderColor !== element.borderColor ||
      prevShadow !== element.shadow ||
      prevFit !== element.fit ||
      prevCrop !== JSON.stringify(element.crop)
    ) {
      this.renderContent();
    }
  }

  /**
   * Sets selection state and reveals chrome.
   */
  public setSelected(selected: boolean, isMultiSelected = false) {
    this.isSelected = selected;

    if (selected) {
      this.selectionChrome.classList.remove('hidden');
      this.domNode.classList.add('is-selected');

      // Hide rotate handle if part of a multi-selection to avoid visual clutter
      const rotateHandle = this.selectionChrome.querySelector('[data-handle="rotate"]') as HTMLElement;
      if (rotateHandle) {
        rotateHandle.style.display = isMultiSelected ? 'none' : 'flex';
      }
    } else {
      this.selectionChrome.classList.add('hidden');
      this.domNode.classList.remove('is-selected');
      this.dimensionBadge.classList.add('hidden');
      this.disableInlineEditing();
    }
  }

  /**
   * Activates inline text editing for Text, Note, or Swatch cards.
   */
  public enableInlineEditing() {
    if (this.isEditingText) return;
    const el = this.elementData;

    if (el.type === 'text' || el.type === 'note') {
      this.isEditingText = true;
      this.selectionChrome.classList.add('hidden');

      const textarea = document.createElement('textarea');
      textarea.className = 'moodboard-inline-editor absolute inset-0 w-full h-full p-3 bg-transparent border-2 border-[#c98a46] rounded-[inherit] outline-none resize-none z-50 font-inherit';
      textarea.style.color = el.type === 'note' ? (el.color || '#1c1917') : (el.color || '#ffffff');
      textarea.style.fontSize = `${el.fontSize || (el.type === 'note' ? 13 : 24)}px`;
      textarea.style.fontFamily = el.fontFamily || 'system-ui, sans-serif';
      textarea.style.fontWeight = `${el.fontWeight || (el.type === 'note' ? '400' : '600')}`;
      textarea.style.textAlign = el.textAlign || 'left';
      textarea.style.lineHeight = '1.3';
      textarea.value = el.content || '';

      this.activeTextEditor = textarea;
      this.contentContainer.appendChild(textarea);

      textarea.focus();
      textarea.select();

      textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          e.stopPropagation();
          this.commitInlineEditing();
        } else if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
          e.stopPropagation();
          this.commitInlineEditing();
        }
      });

      textarea.addEventListener('blur', () => {
        this.commitInlineEditing();
      });

      textarea.addEventListener('pointerdown', (e) => {
        e.stopPropagation();
      });
    } else if (el.type === 'swatch') {
      // Swatch label editing
      const currentLabel = el.label || el.backgroundColor || '#d97706';
      const newLabel = window.prompt('Edit Swatch Label:', currentLabel);
      if (newLabel !== null && newLabel.trim().length > 0) {
        updateElement(el.id, { label: newLabel.trim() }, true);
      }
    }
  }

  public commitInlineEditing() {
    if (!this.isEditingText || !this.activeTextEditor) return;

    const newContent = (this.activeTextEditor as HTMLTextAreaElement).value;
    this.disableInlineEditing();

    if (newContent !== this.elementData.content) {
      updateElement(this.elementData.id, { content: newContent }, true);
    }
  }

  public disableInlineEditing() {
    if (!this.isEditingText) return;
    this.isEditingText = false;

    if (this.activeTextEditor && this.activeTextEditor.parentElement) {
      this.activeTextEditor.parentElement.removeChild(this.activeTextEditor);
    }
    this.activeTextEditor = null;

    if (this.isSelected) {
      this.selectionChrome.classList.remove('hidden');
    }
  }

  /**
   * Set up pointer events and callbacks.
   */
  private setupEvents() {
    // Pointer down on element body
    this.domNode.addEventListener('pointerdown', (e) => {
      if (this.isEditingText) return;

      const target = e.target as HTMLElement;
      const handleType = target.closest('[data-handle]')?.getAttribute('data-handle') as HandleType | null;

      if (handleType) {
        e.stopPropagation();
        this.callbacks.onPointerDownOnHandle(this.elementData.id, handleType, e);
      } else {
        this.callbacks.onPointerDownOnElement(this.elementData.id, e);
      }
    });

    // Double click to trigger inline editing
    this.domNode.addEventListener('dblclick', (e) => {
      this.callbacks.onDoubleClick(this.elementData.id, e);
      this.enableInlineEditing();
    });
  }

  public destroy() {
    this.disableInlineEditing();
    if (this.domNode.parentElement) {
      this.domNode.parentElement.removeChild(this.domNode);
    }
  }
}
