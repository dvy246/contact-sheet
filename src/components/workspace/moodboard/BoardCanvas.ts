import {
  $moodboardElements,
  $moodboardConfig,
  $moodboardSelection,
  updateElement,
  updateElements,
  selectElement,
  toggleSelectElement,
  clearSelection,
  selectAll,
  removeElements,
  duplicateSelected,
  bringForward,
  sendBackward,
  bringToFront,
  sendToBack,
  undo,
  redo,
  addImageElement,
  updateConfig,
  panBy,
  setZoom,
  centerBoard,
} from '../../../lib/moodboardStore';
import { $images, addImages } from '../../../lib/store';
import { loadImagesFromFiles } from '../../../lib/media/imageLoader';
import { TRAY_DRAG_TYPE } from '../PhotoTray';
import { BoardElement, type HandleType } from './BoardElement';
import { SnappingGuidesRenderer, calculateSnapping } from './SnappingGuides';
import type { MoodBoardElement, ImageItem } from '../../../lib/types';

enum InteractionMode {
  NONE,
  PAN,
  DRAG_ELEMENTS,
  RESIZE_ELEMENT,
  ROTATE_ELEMENT,
  MARQUEE_SELECT,
}

interface DragInitialState {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
}

/**
 * Tactical, Apple-quality DOM Freeform Canvas Engine for the Mood Board Studio.
 * Handles subpixel coordinate transformations, pointer direct manipulation,
 * 8-point resize, rotation, snapping guides, rubberband marquee selection,
 * desktop/tray drag-and-drop, and comprehensive keyboard shortcuts.
 */
export class BoardCanvas {
  private container: HTMLElement;
  private viewport: HTMLDivElement;
  private stage: HTMLDivElement;
  private boardSurface: HTMLDivElement;
  private elementsLayer: HTMLDivElement;
  private marqueeBox: HTMLDivElement;
  private dropOverlay: HTMLDivElement;

  private snappingGuides: SnappingGuidesRenderer;
  private elementMap = new Map<string, BoardElement>();

  private interactionMode: InteractionMode = InteractionMode.NONE;
  private pointerStart = { clientX: 0, clientY: 0, boardX: 0, boardY: 0 };
  private activeElementId: string | null = null;
  private activeHandle: HandleType | null = null;
  private dragInitialStates = new Map<string, DragInitialState>();
  private hasMovedPastThreshold = false;
  private isSpacePanning = false;

  private unsubElements?: () => void;
  private unsubConfig?: () => void;
  private unsubSelection?: () => void;

  private boundOnKeyDown: (e: KeyboardEvent) => void;
  private boundOnKeyUp: (e: KeyboardEvent) => void;
  private boundOnWindowPointerMove: (e: PointerEvent) => void;
  private boundOnWindowPointerUp: (e: PointerEvent) => void;
  private resizeObserver?: ResizeObserver;

  constructor(container: HTMLElement) {
    this.container = container;

    // 1. Viewport Container
    this.viewport = document.createElement('div');
    this.viewport.className = 'moodboard-viewport w-full h-full relative overflow-hidden select-none bg-[#120c09] transition-colors';
    this.viewport.style.touchAction = 'none';

    // 2. Transform Stage (Scales and Pans)
    this.stage = document.createElement('div');
    this.stage.className = 'moodboard-stage absolute top-0 left-0 will-change-transform';
    this.stage.style.transformOrigin = '0 0';

    // 3. Board Surface (Canvas Boundary)
    this.boardSurface = document.createElement('div');
    this.boardSurface.className = 'moodboard-surface relative transition-[background-color,box-shadow] duration-200';
    this.boardSurface.style.boxShadow = '0 25px 60px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08)';

    // 4. Elements Layer
    this.elementsLayer = document.createElement('div');
    this.elementsLayer.className = 'moodboard-elements-layer absolute inset-0';

    // 5. Snapping Guides Overlay
    this.snappingGuides = new SnappingGuidesRenderer();

    // 6. Marquee Selection Rectangle
    this.marqueeBox = document.createElement('div');
    this.marqueeBox.className = 'moodboard-marquee absolute pointer-events-none border-[1.5px] border-dashed border-[#c98a46] bg-[#c98a46]/10 rounded-sm z-50 hidden';

    // 7. Drop Target Highlight Overlay
    this.dropOverlay = document.createElement('div');
    this.dropOverlay.className = 'moodboard-drop-overlay absolute inset-0 pointer-events-none border-2 border-dashed border-[#c98a46] bg-[#c98a46]/10 rounded-lg z-50 transition-opacity opacity-0 flex items-center justify-center';
    this.dropOverlay.innerHTML = `
      <div class="px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-[#c98a46]/40 text-xs font-medium text-white shadow-xl flex items-center gap-2">
        <svg class="w-4 h-4 text-[#c98a46] animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 5v14M19 12l-7 7-7-7"/>
        </svg>
        <span>Drop photos onto mood board</span>
      </div>
    `;

    // Assemble DOM hierarchy
    this.boardSurface.appendChild(this.elementsLayer);
    this.snappingGuides.mount(this.boardSurface);
    this.boardSurface.appendChild(this.marqueeBox);
    this.boardSurface.appendChild(this.dropOverlay);

    this.stage.appendChild(this.boardSurface);
    this.viewport.appendChild(this.stage);
    this.container.appendChild(this.viewport);

    // Bind event handler references
    this.boundOnKeyDown = this.handleKeyDown.bind(this);
    this.boundOnKeyUp = this.handleKeyUp.bind(this);
    this.boundOnWindowPointerMove = this.handlePointerMove.bind(this);
    this.boundOnWindowPointerUp = this.handlePointerUp.bind(this);

    this.setupEventListeners();
    this.setupDropZone();
    this.setupStoreSubscriptions();

    // Initial centering when container dimensions are ready
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        if (this.viewport.clientWidth > 0 && this.viewport.clientHeight > 0) {
          const config = $moodboardConfig.get();
          if (config.panX === 0 && config.panY === 0 && config.zoom === 1) {
            centerBoard(this.viewport.clientWidth, this.viewport.clientHeight, 48);
          }
        }
      });
      this.resizeObserver.observe(this.viewport);
    }
  }

  // ---------------------------------------------------------------------------
  // Coordinate Mathematics & Conversions
  // ---------------------------------------------------------------------------
  /**
   * Converts client viewport screen coordinates (e.g. mouse clientX/clientY)
   * into exact moodboard board coordinates.
   */
  public screenToBoard(clientX: number, clientY: number): { x: number; y: number } {
    const rect = this.viewport.getBoundingClientRect();
    const config = $moodboardConfig.get();
    const screenX = clientX - rect.left;
    const screenY = clientY - rect.top;
    const boardX = (screenX - config.panX) / config.zoom;
    const boardY = (screenY - config.panY) / config.zoom;
    return { x: boardX, y: boardY };
  }

  /**
   * Converts moodboard board coordinates to client viewport screen coordinates.
   */
  public boardToScreen(boardX: number, boardY: number): { x: number; y: number } {
    const rect = this.viewport.getBoundingClientRect();
    const config = $moodboardConfig.get();
    const screenX = boardX * config.zoom + config.panX + rect.left;
    const screenY = boardY * config.zoom + config.panY + rect.top;
    return { x: screenX, y: screenY };
  }

  // ---------------------------------------------------------------------------
  // Viewport & Board Styling Synchronization
  // ---------------------------------------------------------------------------
  private syncConfig() {
    const config = $moodboardConfig.get();

    // Stage transform
    this.stage.style.transform = `translate(${config.panX}px, ${config.panY}px) scale(${config.zoom})`;

    // Board dimensions
    this.boardSurface.style.width = `${config.width}px`;
    this.boardSurface.style.height = `${config.height}px`;

    // Background color
    this.boardSurface.style.backgroundColor = config.backgroundColor || '#181513';

    // Background pattern
    const pattern = config.backgroundPattern || 'dots';
    if (pattern === 'dots') {
      this.boardSurface.style.backgroundImage =
        'radial-gradient(rgba(255, 255, 255, 0.12) 1.25px, transparent 1.25px)';
      this.boardSurface.style.backgroundSize = `${config.gridSize || 24}px ${config.gridSize || 24}px`;
      this.boardSurface.style.backgroundPosition = '0 0';
    } else if (pattern === 'grid') {
      const gSize = config.gridSize || 24;
      this.boardSurface.style.backgroundImage = `
        linear-gradient(to right, rgba(255, 255, 255, 0.07) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.07) 1px, transparent 1px)
      `;
      this.boardSurface.style.backgroundSize = `${gSize}px ${gSize}px`;
      this.boardSurface.style.backgroundPosition = '0 0';
    } else {
      this.boardSurface.style.backgroundImage = 'none';
    }
  }

  // ---------------------------------------------------------------------------
  // Reactive Elements Synchronization
  // ---------------------------------------------------------------------------
  private syncElements() {
    const elements = $moodboardElements.get();
    const selection = $moodboardSelection.get();
    const isMulti = selection.length > 1;

    const currentIds = new Set(elements.map((e: MoodBoardElement) => e.id));

    // Remove obsolete elements
    for (const [id, boardEl] of this.elementMap.entries()) {
      if (!currentIds.has(id)) {
        boardEl.destroy();
        this.elementMap.delete(id);
      }
    }

    // Add or update elements
    for (const elData of elements) {
      const isSelected = selection.includes(elData.id);
      let boardEl = this.elementMap.get(elData.id);

      if (!boardEl) {
        boardEl = new BoardElement(elData, {
          onPointerDownOnElement: (id, e) => this.handleElementPointerDown(id, e),
          onPointerDownOnHandle: (id, handle, e) => this.handleHandlePointerDown(id, handle, e),
          onDoubleClick: (_id, _e) => {
            // Handled internally in BoardElement
          },
        });
        this.elementsLayer.appendChild(boardEl.getDomNode());
        this.elementMap.set(elData.id, boardEl);
      }

      boardEl.update(elData, isSelected, isMulti);
    }
  }

  // ---------------------------------------------------------------------------
  // Event Listeners & Interaction Dispatching
  // ---------------------------------------------------------------------------
  private setupEventListeners() {
    // 1. Wheel Event (Zoom & Pan)
    this.viewport.addEventListener(
      'wheel',
      (e: WheelEvent) => {
        e.preventDefault();
        const config = $moodboardConfig.get();
        const rect = this.viewport.getBoundingClientRect();

        if (e.ctrlKey || e.metaKey) {
          // Anchored zoom centered on cursor
          const zoomFactor = e.deltaY < 0 ? 1.08 : 1 / 1.08;
          const newZoom = Math.max(0.1, Math.min(3.0, Math.round(config.zoom * zoomFactor * 100) / 100));

          const cursorX = e.clientX - rect.left;
          const cursorY = e.clientY - rect.top;

          const newPanX = Math.round(cursorX - (cursorX - config.panX) * (newZoom / config.zoom));
          const newPanY = Math.round(cursorY - (cursorY - config.panY) * (newZoom / config.zoom));

          updateConfig({ zoom: newZoom, panX: newPanX, panY: newPanY });
        } else {
          // Smooth 2-finger trackpad or wheel pan
          panBy(-e.deltaX, -e.deltaY);
        }
      },
      { passive: false }
    );

    // 2. Viewport Pointer Down (Empty canvas click, Marquee select, or Middle-click pan)
    this.viewport.addEventListener('pointerdown', (e: PointerEvent) => {
      const target = e.target as HTMLElement;

      // Ignore if clicking an element or handle directly
      if (target.closest('.moodboard-element-wrapper')) return;

      const boardPoint = this.screenToBoard(e.clientX, e.clientY);
      this.pointerStart = {
        clientX: e.clientX,
        clientY: e.clientY,
        boardX: boardPoint.x,
        boardY: boardPoint.y,
      };

      if (e.button === 1 || this.isSpacePanning) {
        // Middle-click or Spacebar Hand Pan tool
        this.interactionMode = InteractionMode.PAN;
        this.viewport.style.cursor = 'grabbing';
      } else if (e.button === 0) {
        // Left click on empty canvas: Start rubberband marquee selection
        this.interactionMode = InteractionMode.MARQUEE_SELECT;

        if (!e.shiftKey && !e.metaKey && !e.ctrlKey) {
          clearSelection();
        }

        this.marqueeBox.style.left = `${boardPoint.x}px`;
        this.marqueeBox.style.top = `${boardPoint.y}px`;
        this.marqueeBox.style.width = '0px';
        this.marqueeBox.style.height = '0px';
        this.marqueeBox.classList.remove('hidden');
      }

      window.addEventListener('pointermove', this.boundOnWindowPointerMove);
      window.addEventListener('pointerup', this.boundOnWindowPointerUp);
    });

    // 3. Global Window Keyboard Listener
    window.addEventListener('keydown', this.boundOnKeyDown);
    window.addEventListener('keyup', this.boundOnKeyUp);
  }

  // ---------------------------------------------------------------------------
  // Direct Manipulation Handlers
  // ---------------------------------------------------------------------------
  private handleElementPointerDown(id: string, e: PointerEvent) {
    if (e.button !== 0) return; // Only primary button
    e.stopPropagation();

    const selection = $moodboardSelection.get();
    const isMultiSelectKey = e.shiftKey || e.metaKey || e.ctrlKey;

    if (isMultiSelectKey) {
      toggleSelectElement(id, true);
    } else {
      if (!selection.includes(id)) {
        selectElement(id, false);
      }
    }

    const currentSelection = $moodboardSelection.get();
    const boardPoint = this.screenToBoard(e.clientX, e.clientY);

    this.pointerStart = {
      clientX: e.clientX,
      clientY: e.clientY,
      boardX: boardPoint.x,
      boardY: boardPoint.y,
    };
    this.activeElementId = id;
    this.hasMovedPastThreshold = false;

    // Alt/Option duplicate on drag start
    if (e.altKey) {
      const duplicated = duplicateSelected(0);
      this.dragInitialStates.clear();
      for (const el of duplicated) {
        this.dragInitialStates.set(el.id, {
          id: el.id,
          x: el.x,
          y: el.y,
          width: el.width,
          height: el.height,
          rotation: el.rotation || 0,
        });
      }
    } else {
      // Record initial positions of all currently selected elements
      this.dragInitialStates.clear();
      const allElements = $moodboardElements.get();
      for (const el of allElements) {
        if (currentSelection.includes(el.id)) {
          this.dragInitialStates.set(el.id, {
            id: el.id,
            x: el.x,
            y: el.y,
            width: el.width,
            height: el.height,
            rotation: el.rotation || 0,
          });
        }
      }
    }

    this.interactionMode = InteractionMode.DRAG_ELEMENTS;
    window.addEventListener('pointermove', this.boundOnWindowPointerMove);
    window.addEventListener('pointerup', this.boundOnWindowPointerUp);
  }

  private handleHandlePointerDown(id: string, handle: HandleType, e: PointerEvent) {
    if (e.button !== 0) return;
    e.stopPropagation();

    const boardPoint = this.screenToBoard(e.clientX, e.clientY);
    this.pointerStart = {
      clientX: e.clientX,
      clientY: e.clientY,
      boardX: boardPoint.x,
      boardY: boardPoint.y,
    };
    this.activeElementId = id;
    this.activeHandle = handle;
    this.hasMovedPastThreshold = false;

    const el = $moodboardElements.get().find((item: MoodBoardElement) => item.id === id);
    if (el) {
      this.dragInitialStates.clear();
      this.dragInitialStates.set(el.id, {
        id: el.id,
        x: el.x,
        y: el.y,
        width: el.width,
        height: el.height,
        rotation: el.rotation || 0,
      });
    }

    if (handle === 'rotate') {
      this.interactionMode = InteractionMode.ROTATE_ELEMENT;
    } else {
      this.interactionMode = InteractionMode.RESIZE_ELEMENT;
    }

    window.addEventListener('pointermove', this.boundOnWindowPointerMove);
    window.addEventListener('pointerup', this.boundOnWindowPointerUp);
  }

  // ---------------------------------------------------------------------------
  // Pointer Move (Drag / Resize / Rotate / Pan / Marquee)
  // ---------------------------------------------------------------------------
  private handlePointerMove(e: PointerEvent) {
    if (this.interactionMode === InteractionMode.NONE) return;

    const boardPoint = this.screenToBoard(e.clientX, e.clientY);
    const deltaClientX = e.clientX - this.pointerStart.clientX;
    const deltaClientY = e.clientY - this.pointerStart.clientY;

    if (!this.hasMovedPastThreshold) {
      if (Math.hypot(deltaClientX, deltaClientY) > 3) {
        this.hasMovedPastThreshold = true;
      } else {
        return;
      }
    }

    const deltaBoardX = boardPoint.x - this.pointerStart.boardX;
    const deltaBoardY = boardPoint.y - this.pointerStart.boardY;

    switch (this.interactionMode) {
      case InteractionMode.PAN: {
        panBy(deltaClientX, deltaClientY);
        this.pointerStart.clientX = e.clientX;
        this.pointerStart.clientY = e.clientY;
        break;
      }

      case InteractionMode.DRAG_ELEMENTS: {
        this.performElementsDrag(deltaBoardX, deltaBoardY);
        break;
      }

      case InteractionMode.RESIZE_ELEMENT: {
        this.performElementResize(deltaBoardX, deltaBoardY, e.shiftKey);
        break;
      }

      case InteractionMode.ROTATE_ELEMENT: {
        this.performElementRotate(boardPoint.x, boardPoint.y, e.shiftKey);
        break;
      }

      case InteractionMode.MARQUEE_SELECT: {
        this.performMarqueeSelect(boardPoint.x, boardPoint.y);
        break;
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Action Implementations
  // ---------------------------------------------------------------------------
  private performElementsDrag(deltaX: number, deltaY: number) {
    if (!this.activeElementId) return;

    const primaryInitial = this.dragInitialStates.get(this.activeElementId);
    if (!primaryInitial) return;

    const config = $moodboardConfig.get();
    const allElements = $moodboardElements.get();
    const otherElements = allElements.filter((el: MoodBoardElement) => !this.dragInitialStates.has(el.id));

    // Calculate target bounding box for primary element
    const rawTargetX = primaryInitial.x + deltaX;
    const rawTargetY = primaryInitial.y + deltaY;

    const snapResult = calculateSnapping(
      {
        x: rawTargetX,
        y: rawTargetY,
        width: primaryInitial.width,
        height: primaryInitial.height,
      },
      otherElements,
      config
    );

    const finalDeltaX = deltaX + snapResult.dx;
    const finalDeltaY = deltaY + snapResult.dy;

    // Render active alignment guides
    this.snappingGuides.render(snapResult.lines, config.width, config.height);

    // Apply live transformations across all selected elements
    for (const [id, initial] of this.dragInitialStates.entries()) {
      const boardEl = this.elementMap.get(id);
      if (boardEl) {
        boardEl.setLiveTransform(
          Math.round(initial.x + finalDeltaX),
          Math.round(initial.y + finalDeltaY),
          initial.width,
          initial.height,
          initial.rotation
        );
      }
    }
  }

  private performElementResize(deltaX: number, deltaY: number, lockAspectRatio: boolean) {
    if (!this.activeElementId || !this.activeHandle) return;

    const initial = this.dragInitialStates.get(this.activeElementId);
    if (!initial) return;

    const handle = this.activeHandle;
    let newX = initial.x;
    let newY = initial.y;
    let newWidth = initial.width;
    let newHeight = initial.height;

    // Aspect ratio locking for images or when Shift is held
    const targetEl = $moodboardElements.get().find((item: MoodBoardElement) => item.id === this.activeElementId);
    const shouldLockRatio = lockAspectRatio || (targetEl?.type === 'image' && !lockAspectRatio);
    const aspect = initial.width / Math.max(1, initial.height);

    // 8 Handle transformations
    if (handle.includes('e')) {
      newWidth = Math.max(30, initial.width + deltaX);
    }
    if (handle.includes('w')) {
      const candidateWidth = initial.width - deltaX;
      if (candidateWidth >= 30) {
        newWidth = candidateWidth;
        newX = initial.x + deltaX;
      }
    }
    if (handle.includes('s')) {
      newHeight = Math.max(30, initial.height + deltaY);
    }
    if (handle.includes('n')) {
      const candidateHeight = initial.height - deltaY;
      if (candidateHeight >= 30) {
        newHeight = candidateHeight;
        newY = initial.y + deltaY;
      }
    }

    if (shouldLockRatio && (handle === 'nw' || handle === 'ne' || handle === 'se' || handle === 'sw')) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        newHeight = Math.round(newWidth / aspect);
        if (handle.includes('n')) {
          newY = initial.y + (initial.height - newHeight);
        }
      } else {
        newWidth = Math.round(newHeight * aspect);
        if (handle.includes('w')) {
          newX = initial.x + (initial.width - newWidth);
        }
      }
    }

    // Snapping during resize
    const config = $moodboardConfig.get();
    const otherElements = $moodboardElements.get().filter((el: MoodBoardElement) => el.id !== this.activeElementId);
    const snapResult = calculateSnapping(
      { x: newX, y: newY, width: newWidth, height: newHeight },
      otherElements,
      config
    );

    this.snappingGuides.render(snapResult.lines, config.width, config.height);

    const boardEl = this.elementMap.get(this.activeElementId);
    if (boardEl) {
      boardEl.setLiveTransform(
        Math.round(newX),
        Math.round(newY),
        Math.round(newWidth),
        Math.round(newHeight),
        initial.rotation,
        `${Math.round(newWidth)} × ${Math.round(newHeight)}`
      );
    }
  }

  private performElementRotate(boardX: number, boardY: number, snap15Deg: boolean) {
    if (!this.activeElementId) return;

    const initial = this.dragInitialStates.get(this.activeElementId);
    if (!initial) return;

    const centerX = initial.x + initial.width / 2;
    const centerY = initial.y + initial.height / 2;

    const rad = Math.atan2(boardY - centerY, boardX - centerX);
    let deg = Math.round((rad * 180) / Math.PI + 90);

    // Normalize to [-180, 180]
    while (deg > 180) deg -= 360;
    while (deg < -180) deg += 360;

    if (snap15Deg) {
      deg = Math.round(deg / 15) * 15;
    }

    const boardEl = this.elementMap.get(this.activeElementId);
    if (boardEl) {
      boardEl.setLiveTransform(
        initial.x,
        initial.y,
        initial.width,
        initial.height,
        deg,
        `${deg}°`
      );
    }
  }

  private performMarqueeSelect(currentBoardX: number, currentBoardY: number) {
    const minX = Math.min(this.pointerStart.boardX, currentBoardX);
    const minY = Math.min(this.pointerStart.boardY, currentBoardY);
    const width = Math.abs(currentBoardX - this.pointerStart.boardX);
    const height = Math.abs(currentBoardY - this.pointerStart.boardY);

    this.marqueeBox.style.left = `${minX}px`;
    this.marqueeBox.style.top = `${minY}px`;
    this.marqueeBox.style.width = `${width}px`;
    this.marqueeBox.style.height = `${height}px`;

    // Calculate intersecting elements
    const elements = $moodboardElements.get();
    const maxX = minX + width;
    const maxY = minY + height;

    const intersectedIds = elements
      .filter((el: MoodBoardElement) => {
        const elMaxX = el.x + el.width;
        const elMaxY = el.y + el.height;
        return !(el.x > maxX || elMaxX < minX || el.y > maxY || elMaxY < minY);
      })
      .map((el: MoodBoardElement) => el.id);

    $moodboardSelection.set(intersectedIds);
  }

  // ---------------------------------------------------------------------------
  // Pointer Up (Commit Changes)
  // ---------------------------------------------------------------------------
  private handlePointerUp(_e: PointerEvent) {
    window.removeEventListener('pointermove', this.boundOnWindowPointerMove);
    window.removeEventListener('pointerup', this.boundOnWindowPointerUp);

    this.snappingGuides.clear();
    this.marqueeBox.classList.add('hidden');
    this.viewport.style.cursor = this.isSpacePanning ? 'grab' : 'default';

    if (this.interactionMode === InteractionMode.DRAG_ELEMENTS && this.hasMovedPastThreshold) {
      // Commit all moved elements
      const updates: { id: string; changes: Partial<MoodBoardElement> }[] = [];
      for (const [id] of this.dragInitialStates.entries()) {
        const boardEl = this.elementMap.get(id);
        if (boardEl) {
          const dom = boardEl.getDomNode();
          updates.push({
            id,
            changes: {
              x: parseInt(dom.style.left, 10) || 0,
              y: parseInt(dom.style.top, 10) || 0,
            },
          });
          boardEl.hideReadoutBadge();
        }
      }
      updateElements(updates, true);
    } else if (this.interactionMode === InteractionMode.RESIZE_ELEMENT && this.hasMovedPastThreshold) {
      if (this.activeElementId) {
        const boardEl = this.elementMap.get(this.activeElementId);
        if (boardEl) {
          const dom = boardEl.getDomNode();
          updateElement(
            this.activeElementId,
            {
              x: parseInt(dom.style.left, 10) || 0,
              y: parseInt(dom.style.top, 10) || 0,
              width: parseInt(dom.style.width, 10) || 100,
              height: parseInt(dom.style.height, 10) || 100,
            },
            true
          );
          boardEl.hideReadoutBadge();
        }
      }
    } else if (this.interactionMode === InteractionMode.ROTATE_ELEMENT && this.hasMovedPastThreshold) {
      if (this.activeElementId) {
        const boardEl = this.elementMap.get(this.activeElementId);
        if (boardEl) {
          const transform = boardEl.getDomNode().style.transform;
          const match = /rotate\(([-0-9.]+)deg\)/.exec(transform);
          const rotation = match ? parseFloat(match[1]) : 0;
          updateElement(this.activeElementId, { rotation }, true);
          boardEl.hideReadoutBadge();
        }
      }
    }

    this.interactionMode = InteractionMode.NONE;
    this.activeElementId = null;
    this.activeHandle = null;
    this.dragInitialStates.clear();
    this.hasMovedPastThreshold = false;
  }

  // ---------------------------------------------------------------------------
  // Keyboard Shortcuts Listener
  // ---------------------------------------------------------------------------
  private handleKeyDown(e: KeyboardEvent) {
    const target = e.target as HTMLElement | null;
    const isInput =
      target &&
      (target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable ||
        target.classList.contains('moodboard-inline-editor'));

    if (isInput) return;

    // Spacebar Hand Tool Pan mode
    if (e.code === 'Space' && !this.isSpacePanning) {
      this.isSpacePanning = true;
      this.viewport.style.cursor = 'grab';
      return;
    }

    const isMeta = e.metaKey || e.ctrlKey;

    // Undo: Cmd+Z
    if (isMeta && e.key.toLowerCase() === 'z' && !e.shiftKey) {
      e.preventDefault();
      undo();
      return;
    }

    // Redo: Cmd+Shift+Z or Ctrl+Y
    if ((isMeta && e.key.toLowerCase() === 'z' && e.shiftKey) || (isMeta && e.key.toLowerCase() === 'y')) {
      e.preventDefault();
      redo();
      return;
    }

    // Select All: Cmd+A
    if (isMeta && e.key.toLowerCase() === 'a') {
      e.preventDefault();
      selectAll();
      return;
    }

    // Duplicate: Cmd+D
    if (isMeta && e.key.toLowerCase() === 'd') {
      e.preventDefault();
      duplicateSelected(24);
      return;
    }

    // Delete: Backspace or Delete
    if (e.key === 'Backspace' || e.key === 'Delete') {
      const selected = $moodboardSelection.get();
      if (selected.length > 0) {
        e.preventDefault();
        removeElements(selected);
        return;
      }
    }

    // Layer Ordering: [ / ] and Cmd+[ / Cmd+]
    if (e.key === '[') {
      e.preventDefault();
      if (isMeta) sendToBack();
      else sendBackward();
      return;
    }

    if (e.key === ']') {
      e.preventDefault();
      if (isMeta) bringToFront();
      else bringForward();
      return;
    }

    // Arrow keys for precision nudging
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      const selection = $moodboardSelection.get();
      if (selection.length > 0) {
        e.preventDefault();
        const step = e.shiftKey ? 10 : 1;
        let dx = 0;
        let dy = 0;

        if (e.key === 'ArrowUp') dy = -step;
        if (e.key === 'ArrowDown') dy = step;
        if (e.key === 'ArrowLeft') dx = -step;
        if (e.key === 'ArrowRight') dx = step;

        const allElements = $moodboardElements.get();
        const updates = allElements
          .filter((el: MoodBoardElement) => selection.includes(el.id))
          .map((el: MoodBoardElement) => ({
            id: el.id,
            changes: { x: el.x + dx, y: el.y + dy },
          }));

        updateElements(updates, true);
        return;
      }
    }

    // Escape to clear selection
    if (e.key === 'Escape') {
      clearSelection();
    }
  }

  private handleKeyUp(e: KeyboardEvent) {
    if (e.code === 'Space') {
      this.isSpacePanning = false;
      this.viewport.style.cursor = 'default';
    }
  }

  // ---------------------------------------------------------------------------
  // Drop Zone Handling (Tray & Disk)
  // ---------------------------------------------------------------------------
  private setupDropZone() {
    this.viewport.addEventListener('dragenter', (e) => {
      e.preventDefault();
      this.dropOverlay.style.opacity = '1';
    });

    this.viewport.addEventListener('dragover', (e) => {
      e.preventDefault();
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'copy';
      }
      this.dropOverlay.style.opacity = '1';
    });

    this.viewport.addEventListener('dragleave', (e) => {
      // Check if genuinely leaving the viewport container
      const related = e.relatedTarget as HTMLElement | null;
      if (!related || !this.viewport.contains(related)) {
        this.dropOverlay.style.opacity = '0';
      }
    });

    this.viewport.addEventListener('drop', async (e) => {
      e.preventDefault();
      this.dropOverlay.style.opacity = '0';

      const boardPoint = this.screenToBoard(e.clientX, e.clientY);

      // Case 1: Dropped from Photo Tray
      const trayImageData =
        e.dataTransfer?.getData(TRAY_DRAG_TYPE) ||
        e.dataTransfer?.getData('text/plain');

      if (trayImageData) {
        const images = $images.get();
        const matchedImage = images.find(
          (img: ImageItem) => img.id === trayImageData || img.name === trayImageData
        );

        if (matchedImage) {
          addImageElement(matchedImage, {
            x: Math.round(boardPoint.x - 190),
            y: Math.round(boardPoint.y - 140),
          });
          return;
        }
      }

      // Case 2: Dropped image files from desktop
      const files = e.dataTransfer?.files;
      if (files && files.length > 0) {
        const loadedItems = await loadImagesFromFiles(files);
        if (loadedItems.length > 0) {
          addImages(loadedItems);

          loadedItems.forEach((item: ImageItem, idx: number) => {
            const offset = idx * 28;
            addImageElement(item, {
              x: Math.round(boardPoint.x - 190 + offset),
              y: Math.round(boardPoint.y - 140 + offset),
            });
          });
        }
      }
    });
  }

  // ---------------------------------------------------------------------------
  // Store Subscriptions
  // ---------------------------------------------------------------------------
  private setupStoreSubscriptions() {
    this.unsubConfig = $moodboardConfig.subscribe(() => {
      this.syncConfig();
    });

    this.unsubElements = $moodboardElements.subscribe(() => {
      this.syncElements();
    });

    this.unsubSelection = $moodboardSelection.subscribe(() => {
      this.syncElements();
    });
  }

  // ---------------------------------------------------------------------------
  // Public Canvas Controls API
  // ---------------------------------------------------------------------------
  public zoomIn() {
    const current = $moodboardConfig.get().zoom;
    setZoom(current + 0.15);
  }

  public zoomOut() {
    const current = $moodboardConfig.get().zoom;
    setZoom(current - 0.15);
  }

  public resetZoom() {
    updateConfig({ zoom: 1, panX: 0, panY: 0 });
  }

  public fitToScreen() {
    if (this.viewport.clientWidth > 0 && this.viewport.clientHeight > 0) {
      centerBoard(this.viewport.clientWidth, this.viewport.clientHeight, 48);
    }
  }

  public refit() {
    this.fitToScreen();
  }

  public destroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }

    if (this.unsubConfig) this.unsubConfig();
    if (this.unsubElements) this.unsubElements();
    if (this.unsubSelection) this.unsubSelection();

    window.removeEventListener('keydown', this.boundOnKeyDown);
    window.removeEventListener('keyup', this.boundOnKeyUp);
    window.removeEventListener('pointermove', this.boundOnWindowPointerMove);
    window.removeEventListener('pointerup', this.boundOnWindowPointerUp);

    this.snappingGuides.destroy();

    for (const boardEl of this.elementMap.values()) {
      boardEl.destroy();
    }
    this.elementMap.clear();

    if (this.viewport.parentElement) {
      this.viewport.parentElement.removeChild(this.viewport);
    }
  }
}
