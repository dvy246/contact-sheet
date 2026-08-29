import { atom, computed } from 'nanostores';
import type {
  ImageItem,
  MoodBoardElement,
  MoodBoardElementType,
  MoodBoardCanvasConfig,
  MoodBoardTemplate,
  MoodBoardState,
  MoodBoardManifest,
} from './types';

export const MAX_HISTORY_STEPS = 30;

export const DEFAULT_MOODBOARD_CONFIG: MoodBoardCanvasConfig = {
  width: 1920,
  height: 1080,
  backgroundColor: '#181513',
  backgroundPattern: 'dots',
  showGrid: true,
  snapToGrid: true,
  snapToElements: true,
  gridSize: 20,
  zoom: 1,
  panX: 0,
  panY: 0,
};

export interface CanvasSizePreset {
  id: string;
  name: string;
  width: number;
  height: number;
  ratio: string;
  description: string;
}

export const CANVAS_SIZE_PRESETS: CanvasSizePreset[] = [
  { id: '16-9', name: '16:9 Widescreen', width: 1920, height: 1080, ratio: '16:9', description: 'Optimal for desktop, presentations & pitch decks' },
  { id: '4-3', name: '4:3 Classic Board', width: 1600, height: 1200, ratio: '4:3', description: 'Traditional portfolio & editorial balance' },
  { id: '1-1', name: '1:1 Square Study', width: 1200, height: 1200, ratio: '1:1', description: 'Social grid & focused concept exploration' },
  { id: '9-16', name: '9:16 Vertical Story', width: 1080, height: 1920, ratio: '9:16', description: 'Mobile lookbooks, Reels & stories' },
  { id: '3-2', name: '3:2 35mm Frame', width: 1800, height: 1200, ratio: '3:2', description: 'Classic 35mm photography aspect ratio' },
  { id: 'a4-landscape', name: 'A4 Print (Landscape)', width: 1754, height: 1240, ratio: '√2:1', description: 'Print-ready A4 150 DPI landscape canvas' },
  { id: 'a4-portrait', name: 'A4 Print (Portrait)', width: 1240, height: 1754, ratio: '1:√2', description: 'Print-ready A4 150 DPI portrait canvas' },
  { id: '21-9', name: '21:9 Ultrawide', width: 2560, height: 1080, ratio: '21:9', description: 'Cinematic wide panoramic sequence' },
];

export const MOODBOARD_COLOR_PALETTES = [
  { name: 'Dark Truffle', hex: '#181513' },
  { name: 'Obsidian Noir', hex: '#0f1115' },
  { name: 'Charcoal Slate', hex: '#1e2229' },
  { name: 'Warm Parchment', hex: '#f6f3ee' },
  { name: 'Studio Cream', hex: '#f9f6f0' },
  { name: 'Pure Chalk', hex: '#ffffff' },
  { name: 'Olive Drab', hex: '#1e231b' },
  { name: 'Earthy Terracotta', hex: '#261b17' },
];

export interface MoodBoardSnapshot {
  elements: MoodBoardElement[];
  config: MoodBoardCanvasConfig;
  selectedIds: string[];
}

export interface MoodBoardHistoryState {
  past: MoodBoardSnapshot[];
  future: MoodBoardSnapshot[];
}

// ---------------------------------------------------------------------------
// Core Reactive Atoms
// ---------------------------------------------------------------------------
export const $moodboardElements = atom<MoodBoardElement[]>([]);
export const $moodboardConfig = atom<MoodBoardCanvasConfig>({ ...DEFAULT_MOODBOARD_CONFIG });
export const $moodboardSelection = atom<string[]>([]);
export const $moodboardHistory = atom<MoodBoardHistoryState>({ past: [], future: [] });

// ---------------------------------------------------------------------------
// Computed Stores
// ---------------------------------------------------------------------------
export const $selectedElements = computed(
  [$moodboardElements, $moodboardSelection],
  (elements, selectedIds) => elements.filter((el) => selectedIds.includes(el.id))
);

export const $canUndo = computed($moodboardHistory, (h) => h.past.length > 0);
export const $canRedo = computed($moodboardHistory, (h) => h.future.length > 0);

export const $highestZIndex = computed($moodboardElements, (elements) =>
  elements.reduce((max, el) => Math.max(max, el.zIndex), 0)
);

export const $moodboardStats = computed(
  [$moodboardElements, $moodboardSelection],
  (elements, selectedIds) => ({
    total: elements.length,
    selected: selectedIds.length,
    images: elements.filter((e) => e.type === 'image').length,
    texts: elements.filter((e) => e.type === 'text').length,
    swatches: elements.filter((e) => e.type === 'swatch').length,
    notes: elements.filter((e) => e.type === 'note').length,
    shapes: elements.filter((e) => e.type === 'shape').length,
  })
);

// ---------------------------------------------------------------------------
// Helpers & Utilities
// ---------------------------------------------------------------------------
export function generateElementId(prefix = 'mb'): string {
  return `${prefix}_${Math.random().toString(36).substring(2, 9)}_${Date.now().toString(36)}`;
}

export function cloneElements(elements: MoodBoardElement[]): MoodBoardElement[] {
  return elements.map((el) => ({
    ...el,
    crop: el.crop ? { ...el.crop } : undefined,
  }));
}

export function cloneSnapshot(
  elements: MoodBoardElement[],
  config: MoodBoardCanvasConfig,
  selectedIds: string[]
): MoodBoardSnapshot {
  return {
    elements: cloneElements(elements),
    config: { ...config },
    selectedIds: [...selectedIds],
  };
}

export function getNextZIndex(): number {
  const elements = $moodboardElements.get();
  return elements.reduce((max, el) => Math.max(max, el.zIndex), 0) + 1;
}

export function normalizeZIndices(elements: MoodBoardElement[]): MoodBoardElement[] {
  const sorted = [...elements].sort((a, b) => a.zIndex - b.zIndex);
  return sorted.map((el, idx) => ({
    ...el,
    zIndex: idx + 1,
  }));
}

export function getSelectionBoundingBox(elements: MoodBoardElement[]): {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  width: number;
  height: number;
  centerX: number;
  centerY: number;
} {
  if (elements.length === 0) {
    return { minX: 0, minY: 0, maxX: 0, maxY: 0, width: 0, height: 0, centerX: 0, centerY: 0 };
  }

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const el of elements) {
    minX = Math.min(minX, el.x);
    minY = Math.min(minY, el.y);
    maxX = Math.max(maxX, el.x + el.width);
    maxY = Math.max(maxY, el.y + el.height);
  }

  const width = Math.max(0, maxX - minX);
  const height = Math.max(0, maxY - minY);

  return {
    minX,
    minY,
    maxX,
    maxY,
    width,
    height,
    centerX: minX + width / 2,
    centerY: minY + height / 2,
  };
}

// ---------------------------------------------------------------------------
// History (Undo / Redo) Management
// ---------------------------------------------------------------------------
export function pushHistorySnapshot(skipFutureClear = false) {
  const currentSnapshot = cloneSnapshot(
    $moodboardElements.get(),
    $moodboardConfig.get(),
    $moodboardSelection.get()
  );

  const history = $moodboardHistory.get();
  const newPast = [...history.past, currentSnapshot].slice(-MAX_HISTORY_STEPS);

  $moodboardHistory.set({
    past: newPast,
    future: skipFutureClear ? history.future : [],
  });
}

export function commitHistory() {
  pushHistorySnapshot();
}

export function undo(): boolean {
  const history = $moodboardHistory.get();
  if (history.past.length === 0) return false;

  const currentSnapshot = cloneSnapshot(
    $moodboardElements.get(),
    $moodboardConfig.get(),
    $moodboardSelection.get()
  );

  const newPast = [...history.past];
  const previousSnapshot = newPast.pop();
  if (!previousSnapshot) return false;

  const newFuture = [currentSnapshot, ...history.future].slice(0, MAX_HISTORY_STEPS);

  $moodboardHistory.set({
    past: newPast,
    future: newFuture,
  });

  $moodboardElements.set(cloneElements(previousSnapshot.elements));
  $moodboardConfig.set({ ...previousSnapshot.config });
  $moodboardSelection.set([...previousSnapshot.selectedIds]);

  return true;
}

export function redo(): boolean {
  const history = $moodboardHistory.get();
  if (history.future.length === 0) return false;

  const currentSnapshot = cloneSnapshot(
    $moodboardElements.get(),
    $moodboardConfig.get(),
    $moodboardSelection.get()
  );

  const newFuture = [...history.future];
  const nextSnapshot = newFuture.shift();
  if (!nextSnapshot) return false;

  const newPast = [...history.past, currentSnapshot].slice(-MAX_HISTORY_STEPS);

  $moodboardHistory.set({
    past: newPast,
    future: newFuture,
  });

  $moodboardElements.set(cloneElements(nextSnapshot.elements));
  $moodboardConfig.set({ ...nextSnapshot.config });
  $moodboardSelection.set([...nextSnapshot.selectedIds]);

  return true;
}

export function clearHistory() {
  $moodboardHistory.set({ past: [], future: [] });
}

// ---------------------------------------------------------------------------
// Selection Actions
// ---------------------------------------------------------------------------
export function setSelection(ids: string[]) {
  $moodboardSelection.set(ids);
}

export function selectElement(id: string, additive = false) {
  if (additive) {
    const current = $moodboardSelection.get();
    if (!current.includes(id)) {
      $moodboardSelection.set([...current, id]);
    }
  } else {
    $moodboardSelection.set([id]);
  }
}

export function toggleSelectElement(id: string, multiSelect = false) {
  const current = $moodboardSelection.get();
  if (multiSelect) {
    if (current.includes(id)) {
      $moodboardSelection.set(current.filter((item) => item !== id));
    } else {
      $moodboardSelection.set([...current, id]);
    }
  } else {
    if (current.length === 1 && current[0] === id) {
      $moodboardSelection.set([]);
    } else {
      $moodboardSelection.set([id]);
    }
  }
}

export function deselectElement(id: string) {
  const current = $moodboardSelection.get();
  if (current.includes(id)) {
    $moodboardSelection.set(current.filter((item) => item !== id));
  }
}

export function clearSelection() {
  $moodboardSelection.set([]);
}

export function selectAll() {
  const allIds = $moodboardElements.get().map((el) => el.id);
  $moodboardSelection.set(allIds);
}

// ---------------------------------------------------------------------------
// Element Creation Actions
// ---------------------------------------------------------------------------
export function addElement(
  input: Partial<MoodBoardElement> & { type: MoodBoardElementType }
): MoodBoardElement {
  pushHistorySnapshot();

  const config = $moodboardConfig.get();
  const id = input.id || generateElementId(input.type);
  const zIndex = input.zIndex ?? getNextZIndex();

  let defaultProps: Partial<MoodBoardElement> = {
    x: Math.round((config.width - 360) / 2),
    y: Math.round((config.height - 270) / 2),
    width: 360,
    height: 270,
    rotation: 0,
    opacity: 1,
    shadow: true,
  };

  switch (input.type) {
    case 'image':
      defaultProps = {
        x: Math.round((config.width - 380) / 2),
        y: Math.round((config.height - 280) / 2),
        width: 380,
        height: 280,
        rotation: 0,
        opacity: 1,
        fit: 'cover',
        borderRadius: 6,
        borderWidth: 0,
        borderColor: '#ffffff',
        shadow: true,
      };
      break;

    case 'text':
      defaultProps = {
        x: Math.round((config.width - 340) / 2),
        y: Math.round((config.height - 80) / 2),
        width: 340,
        height: 70,
        rotation: 0,
        opacity: 1,
        content: 'Editorial Mood Heading',
        fontSize: 28,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontWeight: '700',
        textAlign: 'left',
        color: '#ffffff',
        backgroundColor: 'transparent',
        borderRadius: 4,
        shadow: false,
      };
      break;

    case 'swatch':
      defaultProps = {
        x: Math.round((config.width - 100) / 2),
        y: Math.round((config.height - 100) / 2),
        width: 100,
        height: 100,
        rotation: 0,
        opacity: 1,
        backgroundColor: input.backgroundColor || '#d97706',
        content: input.content || input.backgroundColor || '#d97706',
        label: input.label || 'Amber Glow',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.15)',
        shadow: true,
      };
      break;

    case 'note':
      defaultProps = {
        x: Math.round((config.width - 240) / 2),
        y: Math.round((config.height - 160) / 2),
        width: 240,
        height: 160,
        rotation: -1.5,
        opacity: 0.96,
        content: 'Director styling note:\nSoft overhead key with warm bounce reflector.',
        backgroundColor: input.backgroundColor || '#fef3c7',
        color: '#1c1917',
        fontSize: 14,
        fontFamily: 'system-ui, sans-serif',
        fontWeight: '400',
        borderRadius: 4,
        shadow: true,
      };
      break;

    case 'shape':
      defaultProps = {
        x: Math.round((config.width - 200) / 2),
        y: Math.round((config.height - 200) / 2),
        width: 200,
        height: 200,
        rotation: 0,
        opacity: 1,
        backgroundColor: input.backgroundColor || 'rgba(255, 255, 255, 0.08)',
        borderWidth: 1,
        borderColor: input.borderColor || 'rgba(255, 255, 255, 0.25)',
        borderRadius: 8,
        shadow: false,
      };
      break;
  }

  const newElement: MoodBoardElement = {
    ...defaultProps,
    ...input,
    id,
    type: input.type,
    zIndex,
  } as MoodBoardElement;

  const currentElements = $moodboardElements.get();
  $moodboardElements.set([...currentElements, newElement]);
  $moodboardSelection.set([id]);

  return newElement;
}

export function addImageElement(
  image: ImageItem,
  initialProps?: Partial<MoodBoardElement>
): MoodBoardElement {
  let width = 380;
  let height = 280;

  if (image.width && image.height && image.width > 0 && image.height > 0) {
    const ratio = image.width / image.height;
    if (ratio >= 1) {
      width = 400;
      height = Math.round(400 / ratio);
    } else {
      height = 420;
      width = Math.round(420 * ratio);
    }
  }

  return addElement({
    type: 'image',
    width,
    height,
    content: image.previewUrl || image.thumbnailUrl,
    imageItemId: image.id,
    label: image.customLabel || image.name,
    ...initialProps,
  });
}

export function addTextElement(initialProps?: Partial<MoodBoardElement>): MoodBoardElement {
  return addElement({
    type: 'text',
    ...initialProps,
  });
}

export function addSwatchElement(
  color: string,
  label?: string,
  initialProps?: Partial<MoodBoardElement>
): MoodBoardElement {
  return addElement({
    type: 'swatch',
    backgroundColor: color,
    content: color,
    label: label || color,
    ...initialProps,
  });
}

export function addNoteElement(
  text?: string,
  color?: string,
  initialProps?: Partial<MoodBoardElement>
): MoodBoardElement {
  return addElement({
    type: 'note',
    content: text,
    backgroundColor: color || '#fef3c7',
    ...initialProps,
  });
}

export function addShapeElement(initialProps?: Partial<MoodBoardElement>): MoodBoardElement {
  return addElement({
    type: 'shape',
    ...initialProps,
  });
}

// ---------------------------------------------------------------------------
// Element Modification Actions
// ---------------------------------------------------------------------------
export function updateElement(
  id: string,
  updates: Partial<MoodBoardElement>,
  recordHistory = true
) {
  if (recordHistory) {
    pushHistorySnapshot();
  }

  const currentElements = $moodboardElements.get();
  const updated = currentElements.map((el) => {
    if (el.id === id) {
      return { ...el, ...updates };
    }
    return el;
  });

  $moodboardElements.set(updated);
}

export function updateElements(
  updates: { id: string; changes: Partial<MoodBoardElement> }[],
  recordHistory = true
) {
  if (updates.length === 0) return;

  if (recordHistory) {
    pushHistorySnapshot();
  }

  const changeMap = new Map(updates.map((u) => [u.id, u.changes]));
  const currentElements = $moodboardElements.get();
  const updated = currentElements.map((el) => {
    const changes = changeMap.get(el.id);
    if (changes) {
      return { ...el, ...changes };
    }
    return el;
  });

  $moodboardElements.set(updated);
}

export function removeElements(ids?: string[]) {
  const targetIds = ids ?? $moodboardSelection.get();
  if (targetIds.length === 0) return;

  pushHistorySnapshot();

  const currentElements = $moodboardElements.get();
  const filtered = currentElements.filter((el) => !targetIds.includes(el.id));
  $moodboardElements.set(normalizeZIndices(filtered));

  const currentSelection = $moodboardSelection.get();
  $moodboardSelection.set(currentSelection.filter((id) => !targetIds.includes(id)));
}

export function duplicateSelected(offset = 24): MoodBoardElement[] {
  const selectedIds = $moodboardSelection.get();
  if (selectedIds.length === 0) return [];

  pushHistorySnapshot();

  const currentElements = $moodboardElements.get();
  const selectedElements = currentElements.filter((el) => selectedIds.includes(el.id));

  let nextZ = getNextZIndex();
  const newElements: MoodBoardElement[] = selectedElements.map((el) => {
    const newId = generateElementId(el.type);
    return {
      ...el,
      id: newId,
      x: el.x + offset,
      y: el.y + offset,
      zIndex: nextZ++,
      crop: el.crop ? { ...el.crop } : undefined,
    };
  });

  $moodboardElements.set([...currentElements, ...newElements]);
  $moodboardSelection.set(newElements.map((el) => el.id));

  return newElements;
}

// ---------------------------------------------------------------------------
// Z-Index Layer Ordering Controls
// ---------------------------------------------------------------------------
export function reorderZIndex(id: string, newZIndex: number) {
  pushHistorySnapshot();

  const current = $moodboardElements.get();
  const updated = current.map((el) => (el.id === id ? { ...el, zIndex: newZIndex } : el));
  $moodboardElements.set(normalizeZIndices(updated));
}

export function bringForward(ids?: string[]) {
  const targetIds = ids ?? $moodboardSelection.get();
  if (targetIds.length === 0) return;

  pushHistorySnapshot();

  const current = normalizeZIndices($moodboardElements.get());
  const sorted = [...current].sort((a, b) => a.zIndex - b.zIndex);

  for (let i = sorted.length - 2; i >= 0; i--) {
    const currentEl = sorted[i];
    const nextEl = sorted[i + 1];

    if (targetIds.includes(currentEl.id) && !targetIds.includes(nextEl.id)) {
      const tempZ = currentEl.zIndex;
      currentEl.zIndex = nextEl.zIndex;
      nextEl.zIndex = tempZ;
      sorted[i] = nextEl;
      sorted[i + 1] = currentEl;
    }
  }

  $moodboardElements.set(normalizeZIndices(sorted));
}

export function sendBackward(ids?: string[]) {
  const targetIds = ids ?? $moodboardSelection.get();
  if (targetIds.length === 0) return;

  pushHistorySnapshot();

  const current = normalizeZIndices($moodboardElements.get());
  const sorted = [...current].sort((a, b) => a.zIndex - b.zIndex);

  for (let i = 1; i < sorted.length; i++) {
    const currentEl = sorted[i];
    const prevEl = sorted[i - 1];

    if (targetIds.includes(currentEl.id) && !targetIds.includes(prevEl.id)) {
      const tempZ = currentEl.zIndex;
      currentEl.zIndex = prevEl.zIndex;
      prevEl.zIndex = tempZ;
      sorted[i] = prevEl;
      sorted[i - 1] = currentEl;
    }
  }

  $moodboardElements.set(normalizeZIndices(sorted));
}

export function bringToFront(ids?: string[]) {
  const targetIds = ids ?? $moodboardSelection.get();
  if (targetIds.length === 0) return;

  pushHistorySnapshot();

  const current = $moodboardElements.get();
  const maxZ = current.reduce((max, el) => Math.max(max, el.zIndex), 0);

  let zCounter = maxZ + 1;
  const updated = current.map((el) => {
    if (targetIds.includes(el.id)) {
      return { ...el, zIndex: zCounter++ };
    }
    return el;
  });

  $moodboardElements.set(normalizeZIndices(updated));
}

export function sendToBack(ids?: string[]) {
  const targetIds = ids ?? $moodboardSelection.get();
  if (targetIds.length === 0) return;

  pushHistorySnapshot();

  const current = $moodboardElements.get();
  let zCounter = -targetIds.length;

  const updated = current.map((el) => {
    if (targetIds.includes(el.id)) {
      return { ...el, zIndex: zCounter++ };
    }
    return el;
  });

  $moodboardElements.set(normalizeZIndices(updated));
}

// ---------------------------------------------------------------------------
// Alignment & Distribution Utilities
// ---------------------------------------------------------------------------
export function alignLeft(ids?: string[]) {
  const targetIds = ids ?? $moodboardSelection.get();
  const elements = $moodboardElements.get().filter((el) => targetIds.includes(el.id));
  if (elements.length < 2) return;

  pushHistorySnapshot();

  const minX = Math.min(...elements.map((el) => el.x));
  const updated = $moodboardElements.get().map((el) => {
    if (targetIds.includes(el.id)) {
      return { ...el, x: minX };
    }
    return el;
  });

  $moodboardElements.set(updated);
}

export function alignCenter(ids?: string[]) {
  const targetIds = ids ?? $moodboardSelection.get();
  const elements = $moodboardElements.get().filter((el) => targetIds.includes(el.id));
  if (elements.length < 2) return;

  pushHistorySnapshot();

  const bbox = getSelectionBoundingBox(elements);
  const updated = $moodboardElements.get().map((el) => {
    if (targetIds.includes(el.id)) {
      return { ...el, x: Math.round(bbox.centerX - el.width / 2) };
    }
    return el;
  });

  $moodboardElements.set(updated);
}

export function alignRight(ids?: string[]) {
  const targetIds = ids ?? $moodboardSelection.get();
  const elements = $moodboardElements.get().filter((el) => targetIds.includes(el.id));
  if (elements.length < 2) return;

  pushHistorySnapshot();

  const maxX = Math.max(...elements.map((el) => el.x + el.width));
  const updated = $moodboardElements.get().map((el) => {
    if (targetIds.includes(el.id)) {
      return { ...el, x: Math.round(maxX - el.width) };
    }
    return el;
  });

  $moodboardElements.set(updated);
}

export function alignTop(ids?: string[]) {
  const targetIds = ids ?? $moodboardSelection.get();
  const elements = $moodboardElements.get().filter((el) => targetIds.includes(el.id));
  if (elements.length < 2) return;

  pushHistorySnapshot();

  const minY = Math.min(...elements.map((el) => el.y));
  const updated = $moodboardElements.get().map((el) => {
    if (targetIds.includes(el.id)) {
      return { ...el, y: minY };
    }
    return el;
  });

  $moodboardElements.set(updated);
}

export function alignMiddle(ids?: string[]) {
  const targetIds = ids ?? $moodboardSelection.get();
  const elements = $moodboardElements.get().filter((el) => targetIds.includes(el.id));
  if (elements.length < 2) return;

  pushHistorySnapshot();

  const bbox = getSelectionBoundingBox(elements);
  const updated = $moodboardElements.get().map((el) => {
    if (targetIds.includes(el.id)) {
      return { ...el, y: Math.round(bbox.centerY - el.height / 2) };
    }
    return el;
  });

  $moodboardElements.set(updated);
}

export function alignBottom(ids?: string[]) {
  const targetIds = ids ?? $moodboardSelection.get();
  const elements = $moodboardElements.get().filter((el) => targetIds.includes(el.id));
  if (elements.length < 2) return;

  pushHistorySnapshot();

  const maxY = Math.max(...elements.map((el) => el.y + el.height));
  const updated = $moodboardElements.get().map((el) => {
    if (targetIds.includes(el.id)) {
      return { ...el, y: Math.round(maxY - el.height) };
    }
    return el;
  });

  $moodboardElements.set(updated);
}

export function distributeHorizontally(ids?: string[]) {
  const targetIds = ids ?? $moodboardSelection.get();
  const elements = $moodboardElements.get().filter((el) => targetIds.includes(el.id));
  if (elements.length < 3) return;

  pushHistorySnapshot();

  const sorted = [...elements].sort((a, b) => a.x - b.x);
  const minX = sorted[0].x;
  const last = sorted[sorted.length - 1];
  const maxX = last.x + last.width;
  const totalElementsWidth = sorted.reduce((sum, el) => sum + el.width, 0);
  const totalSpan = maxX - minX;

  const changes = new Map<string, number>();

  if (totalSpan > totalElementsWidth) {
    const gap = (totalSpan - totalElementsWidth) / (sorted.length - 1);
    let currentX = minX;
    for (const el of sorted) {
      changes.set(el.id, Math.round(currentX));
      currentX += el.width + gap;
    }
  } else {
    // Distribute centers evenly
    const firstCenter = minX + sorted[0].width / 2;
    const lastCenter = last.x + last.width / 2;
    const centerGap = (lastCenter - firstCenter) / (sorted.length - 1);
    sorted.forEach((el, idx) => {
      const targetCenter = firstCenter + idx * centerGap;
      changes.set(el.id, Math.round(targetCenter - el.width / 2));
    });
  }

  const updated = $moodboardElements.get().map((el) => {
    const newX = changes.get(el.id);
    if (newX !== undefined) {
      return { ...el, x: newX };
    }
    return el;
  });

  $moodboardElements.set(updated);
}

export function distributeVertically(ids?: string[]) {
  const targetIds = ids ?? $moodboardSelection.get();
  const elements = $moodboardElements.get().filter((el) => targetIds.includes(el.id));
  if (elements.length < 3) return;

  pushHistorySnapshot();

  const sorted = [...elements].sort((a, b) => a.y - b.y);
  const minY = sorted[0].y;
  const last = sorted[sorted.length - 1];
  const maxY = last.y + last.height;
  const totalElementsHeight = sorted.reduce((sum, el) => sum + el.height, 0);
  const totalSpan = maxY - minY;

  const changes = new Map<string, number>();

  if (totalSpan > totalElementsHeight) {
    const gap = (totalSpan - totalElementsHeight) / (sorted.length - 1);
    let currentY = minY;
    for (const el of sorted) {
      changes.set(el.id, Math.round(currentY));
      currentY += el.height + gap;
    }
  } else {
    // Distribute centers evenly
    const firstCenter = minY + sorted[0].height / 2;
    const lastCenter = last.y + last.height / 2;
    const centerGap = (lastCenter - firstCenter) / (sorted.length - 1);
    sorted.forEach((el, idx) => {
      const targetCenter = firstCenter + idx * centerGap;
      changes.set(el.id, Math.round(targetCenter - el.height / 2));
    });
  }

  const updated = $moodboardElements.get().map((el) => {
    const newY = changes.get(el.id);
    if (newY !== undefined) {
      return { ...el, y: newY };
    }
    return el;
  });

  $moodboardElements.set(updated);
}

export function matchWidth(ids?: string[]) {
  const targetIds = ids ?? $moodboardSelection.get();
  const elements = $moodboardElements.get().filter((el) => targetIds.includes(el.id));
  if (elements.length < 2) return;

  pushHistorySnapshot();

  const targetWidth = elements[0].width;
  const updated = $moodboardElements.get().map((el) => {
    if (targetIds.includes(el.id)) {
      return { ...el, width: targetWidth };
    }
    return el;
  });

  $moodboardElements.set(updated);
}

export function matchHeight(ids?: string[]) {
  const targetIds = ids ?? $moodboardSelection.get();
  const elements = $moodboardElements.get().filter((el) => targetIds.includes(el.id));
  if (elements.length < 2) return;

  pushHistorySnapshot();

  const targetHeight = elements[0].height;
  const updated = $moodboardElements.get().map((el) => {
    if (targetIds.includes(el.id)) {
      return { ...el, height: targetHeight };
    }
    return el;
  });

  $moodboardElements.set(updated);
}

// ---------------------------------------------------------------------------
// Canvas Viewport, Zoom & Pan Actions
// ---------------------------------------------------------------------------
export function updateConfig(updates: Partial<MoodBoardCanvasConfig>, recordHistory = false) {
  if (recordHistory) {
    pushHistorySnapshot();
  }
  $moodboardConfig.set({
    ...$moodboardConfig.get(),
    ...updates,
  });
}

export function setCanvasSize(width: number, height: number) {
  pushHistorySnapshot();
  updateConfig({ width, height });
}

export function setBackgroundColor(backgroundColor: string) {
  pushHistorySnapshot();
  updateConfig({ backgroundColor });
}

export function setBackgroundPattern(backgroundPattern: 'none' | 'dots' | 'grid') {
  pushHistorySnapshot();
  updateConfig({ backgroundPattern });
}

export function setZoom(zoom: number) {
  const clamped = Math.max(0.1, Math.min(3.0, Math.round(zoom * 100) / 100));
  updateConfig({ zoom: clamped });
}

export function zoomIn(step = 0.15) {
  const current = $moodboardConfig.get().zoom;
  setZoom(current + step);
}

export function zoomOut(step = 0.15) {
  const current = $moodboardConfig.get().zoom;
  setZoom(current - step);
}

export function resetZoom() {
  updateConfig({ zoom: 1, panX: 0, panY: 0 });
}

export function setPan(panX: number, panY: number) {
  updateConfig({ panX, panY });
}

export function panBy(deltaX: number, deltaY: number) {
  const current = $moodboardConfig.get();
  updateConfig({
    panX: current.panX + deltaX,
    panY: current.panY + deltaY,
  });
}

export function centerBoard(viewportWidth: number, viewportHeight: number, padding = 40) {
  const config = $moodboardConfig.get();
  const availableWidth = Math.max(100, viewportWidth - padding * 2);
  const availableHeight = Math.max(100, viewportHeight - padding * 2);

  const scaleX = availableWidth / config.width;
  const scaleY = availableHeight / config.height;
  const fitZoom = Math.min(scaleX, scaleY, 1.0);
  const zoom = Math.max(0.15, Math.min(1.0, Math.round(fitZoom * 100) / 100));

  const scaledWidth = config.width * zoom;
  const scaledHeight = config.height * zoom;

  const panX = Math.round((viewportWidth - scaledWidth) / 2);
  const panY = Math.round((viewportHeight - scaledHeight) / 2);

  updateConfig({ zoom, panX, panY });
}

// ---------------------------------------------------------------------------
// Curated Starter Templates
// ---------------------------------------------------------------------------
export const MOODBOARD_TEMPLATES: MoodBoardTemplate[] = [
  {
    id: 'editorial-photoshoot',
    name: 'Editorial Photoshoot',
    description: 'Hero portrait with detail frames, color swatches & director wardrobe notes.',
    category: 'editorial',
    canvas: {
      width: 1920,
      height: 1080,
      backgroundColor: '#161413',
      backgroundPattern: 'dots',
    },
    elements: [
      {
        type: 'text',
        x: 80,
        y: 65,
        width: 620,
        height: 50,
        rotation: 0,
        zIndex: 1,
        opacity: 1,
        content: 'AURA / AUTUMN EDITORIAL',
        fontSize: 32,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontWeight: '700',
        textAlign: 'left',
        color: '#f5f0eb',
      },
      {
        type: 'text',
        x: 80,
        y: 120,
        width: 480,
        height: 30,
        rotation: 0,
        zIndex: 2,
        opacity: 1,
        content: 'Mood & Styling Direction · Studio A',
        fontSize: 15,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontWeight: '400',
        textAlign: 'left',
        color: '#a89f91',
      },
      {
        type: 'image',
        x: 80,
        y: 180,
        width: 440,
        height: 600,
        rotation: 0,
        zIndex: 3,
        opacity: 1,
        fit: 'cover',
        borderRadius: 8,
        shadow: true,
        label: 'Hero Frame 01',
      },
      {
        type: 'image',
        x: 550,
        y: 180,
        width: 340,
        height: 380,
        rotation: 0,
        zIndex: 4,
        opacity: 1,
        fit: 'cover',
        borderRadius: 8,
        shadow: true,
        label: 'Texture Macro',
      },
      {
        type: 'image',
        x: 550,
        y: 580,
        width: 340,
        height: 380,
        rotation: 0,
        zIndex: 5,
        opacity: 1,
        fit: 'cover',
        borderRadius: 8,
        shadow: true,
        label: 'Pose Study 02',
      },
      {
        type: 'image',
        x: 920,
        y: 180,
        width: 380,
        height: 260,
        rotation: 0,
        zIndex: 6,
        opacity: 1,
        fit: 'cover',
        borderRadius: 8,
        shadow: true,
        label: 'Atmosphere Study',
      },
      {
        type: 'swatch',
        x: 920,
        y: 465,
        width: 85,
        height: 85,
        rotation: 0,
        zIndex: 7,
        opacity: 1,
        backgroundColor: '#b45309',
        content: '#b45309',
        label: 'Terracotta',
        borderRadius: 6,
        shadow: true,
      },
      {
        type: 'swatch',
        x: 1018,
        y: 465,
        width: 85,
        height: 85,
        rotation: 0,
        zIndex: 8,
        opacity: 1,
        backgroundColor: '#e2d9cc',
        content: '#e2d9cc',
        label: 'Cashmere',
        borderRadius: 6,
        shadow: true,
      },
      {
        type: 'swatch',
        x: 1116,
        y: 465,
        width: 85,
        height: 85,
        rotation: 0,
        zIndex: 9,
        opacity: 1,
        backgroundColor: '#291e17',
        content: '#291e17',
        label: 'Espresso',
        borderRadius: 6,
        shadow: true,
      },
      {
        type: 'swatch',
        x: 1214,
        y: 465,
        width: 85,
        height: 85,
        rotation: 0,
        zIndex: 10,
        opacity: 1,
        backgroundColor: '#4d543b',
        content: '#4d543b',
        label: 'Olive',
        borderRadius: 6,
        shadow: true,
      },
      {
        type: 'note',
        x: 920,
        y: 580,
        width: 380,
        height: 180,
        rotation: -1,
        zIndex: 11,
        opacity: 0.96,
        content: 'Lighting & Wardrobe:\n- Diffused overhead key + warm reflector\n- Heavy wools, raw linens & matte silks\n- Natural skin glow',
        backgroundColor: '#fef3c7',
        color: '#1c1917',
        fontSize: 14,
        borderRadius: 6,
        shadow: true,
      },
      {
        type: 'image',
        x: 1330,
        y: 180,
        width: 510,
        height: 780,
        rotation: 0,
        zIndex: 12,
        opacity: 1,
        fit: 'cover',
        borderRadius: 8,
        shadow: true,
        label: 'Full Look 03',
      },
    ],
  },
  {
    id: 'lighting-concept',
    name: 'Lighting & Concept Board',
    description: 'Technical multi-point lighting breakdown with gear notes and shadow ratios.',
    category: 'concept',
    canvas: {
      width: 1920,
      height: 1080,
      backgroundColor: '#0f1115',
      backgroundPattern: 'grid',
    },
    elements: [
      {
        type: 'text',
        x: 80,
        y: 60,
        width: 700,
        height: 44,
        rotation: 0,
        zIndex: 1,
        opacity: 1,
        content: 'STUDIO LIGHTING SETUP & RATIOS',
        fontSize: 28,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontWeight: '700',
        textAlign: 'left',
        color: '#f8fafc',
      },
      {
        type: 'text',
        x: 80,
        y: 110,
        width: 500,
        height: 26,
        rotation: 0,
        zIndex: 2,
        opacity: 1,
        content: 'Key Light · Fill Balance · Edge Separation',
        fontSize: 14,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontWeight: '400',
        textAlign: 'left',
        color: '#94a3b8',
      },
      {
        type: 'image',
        x: 80,
        y: 160,
        width: 400,
        height: 300,
        rotation: 0,
        zIndex: 3,
        opacity: 1,
        fit: 'cover',
        borderRadius: 6,
        shadow: true,
        label: 'Key Light Setup',
      },
      {
        type: 'image',
        x: 510,
        y: 160,
        width: 400,
        height: 300,
        rotation: 0,
        zIndex: 4,
        opacity: 1,
        fit: 'cover',
        borderRadius: 6,
        shadow: true,
        label: 'Fill & Bounce',
      },
      {
        type: 'image',
        x: 940,
        y: 160,
        width: 400,
        height: 300,
        rotation: 0,
        zIndex: 5,
        opacity: 1,
        fit: 'cover',
        borderRadius: 6,
        shadow: true,
        label: 'Rim Separation',
      },
      {
        type: 'note',
        x: 80,
        y: 480,
        width: 400,
        height: 140,
        rotation: 0,
        zIndex: 6,
        opacity: 0.96,
        content: 'Key: 5ft Octabox at 45° high, 1/4 power with grid.\nAim at chin level.',
        backgroundColor: '#1e293b',
        color: '#f8fafc',
        fontSize: 14,
        borderRadius: 6,
        shadow: true,
      },
      {
        type: 'note',
        x: 510,
        y: 480,
        width: 400,
        height: 140,
        rotation: 0,
        zIndex: 7,
        opacity: 0.96,
        content: 'Fill: 4x8 white polyboard for gentle shadow lift at 1:3 ratio.',
        backgroundColor: '#1e293b',
        color: '#f8fafc',
        fontSize: 14,
        borderRadius: 6,
        shadow: true,
      },
      {
        type: 'note',
        x: 940,
        y: 480,
        width: 400,
        height: 140,
        rotation: 0,
        zIndex: 8,
        opacity: 0.96,
        content: 'Rim: Stripbox with honeycomb grid behind talent for hair separation.',
        backgroundColor: '#1e293b',
        color: '#f8fafc',
        fontSize: 14,
        borderRadius: 6,
        shadow: true,
      },
      {
        type: 'image',
        x: 1370,
        y: 160,
        width: 470,
        height: 680,
        rotation: 0,
        zIndex: 9,
        opacity: 1,
        fit: 'cover',
        borderRadius: 6,
        shadow: true,
        label: 'Final Output Composite',
      },
      {
        type: 'swatch',
        x: 80,
        y: 650,
        width: 90,
        height: 90,
        rotation: 0,
        zIndex: 10,
        opacity: 1,
        backgroundColor: '#0a0b0d',
        content: '#0a0b0d',
        label: 'Obsidian',
        borderRadius: 6,
        shadow: true,
      },
      {
        type: 'swatch',
        x: 185,
        y: 650,
        width: 90,
        height: 90,
        rotation: 0,
        zIndex: 11,
        opacity: 1,
        backgroundColor: '#f59e0b',
        content: '#f59e0b',
        label: 'Rim Accent',
        borderRadius: 6,
        shadow: true,
      },
      {
        type: 'swatch',
        x: 290,
        y: 650,
        width: 90,
        height: 90,
        rotation: 0,
        zIndex: 12,
        opacity: 1,
        backgroundColor: '#334155',
        content: '#334155',
        label: 'Shadow',
        borderRadius: 6,
        shadow: true,
      },
      {
        type: 'swatch',
        x: 395,
        y: 650,
        width: 90,
        height: 90,
        rotation: 0,
        zIndex: 13,
        opacity: 1,
        backgroundColor: '#fed7aa',
        content: '#fed7aa',
        label: 'Highlight',
        borderRadius: 6,
        shadow: true,
      },
      {
        type: 'text',
        x: 510,
        y: 660,
        width: 830,
        height: 40,
        rotation: 0,
        zIndex: 14,
        opacity: 1,
        content: 'Technical Spec: ISO 100 · 85mm f/5.6 · 1/160s · Profoto B10X System',
        fontSize: 16,
        fontFamily: 'system-ui, sans-serif',
        fontWeight: '600',
        textAlign: 'left',
        color: '#38bdf8',
      },
    ],
  },
  {
    id: 'warm-film-mood',
    name: 'Warm Film Mood',
    description: 'Polaroid-style frames, subtle tilts, vintage film grain & Kodak color palette.',
    category: 'film',
    canvas: {
      width: 1920,
      height: 1080,
      backgroundColor: '#1e1915',
      backgroundPattern: 'dots',
    },
    elements: [
      {
        type: 'text',
        x: 100,
        y: 60,
        width: 600,
        height: 44,
        rotation: 0,
        zIndex: 1,
        opacity: 1,
        content: 'ANALOG 35MM NOSTALGIA',
        fontSize: 30,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontWeight: '700',
        textAlign: 'left',
        color: '#fef3c7',
      },
      {
        type: 'text',
        x: 100,
        y: 110,
        width: 600,
        height: 26,
        rotation: 0,
        zIndex: 2,
        opacity: 1,
        content: 'Warm grain, sun-bleached tones & golden hour shadows',
        fontSize: 14,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontWeight: '400',
        textAlign: 'left',
        color: '#d4af37',
      },
      {
        type: 'image',
        x: 100,
        y: 170,
        width: 360,
        height: 460,
        rotation: -2.5,
        zIndex: 3,
        opacity: 1,
        fit: 'cover',
        borderRadius: 4,
        borderWidth: 8,
        borderColor: '#fcfbf7',
        shadow: true,
        label: 'Roll 01 #14',
      },
      {
        type: 'image',
        x: 490,
        y: 150,
        width: 380,
        height: 480,
        rotation: 1.8,
        zIndex: 4,
        opacity: 1,
        fit: 'cover',
        borderRadius: 4,
        borderWidth: 8,
        borderColor: '#fcfbf7',
        shadow: true,
        label: 'Roll 01 #22',
      },
      {
        type: 'image',
        x: 900,
        y: 180,
        width: 360,
        height: 460,
        rotation: -1.2,
        zIndex: 5,
        opacity: 1,
        fit: 'cover',
        borderRadius: 4,
        borderWidth: 8,
        borderColor: '#fcfbf7',
        shadow: true,
        label: 'Roll 02 #08',
      },
      {
        type: 'image',
        x: 1300,
        y: 140,
        width: 360,
        height: 460,
        rotation: 2.2,
        zIndex: 6,
        opacity: 1,
        fit: 'cover',
        borderRadius: 4,
        borderWidth: 8,
        borderColor: '#fcfbf7',
        shadow: true,
        label: 'Roll 02 #31',
      },
      {
        type: 'swatch',
        x: 100,
        y: 680,
        width: 85,
        height: 85,
        rotation: 0,
        zIndex: 7,
        opacity: 1,
        backgroundColor: '#d97706',
        content: '#d97706',
        label: 'Golden Sun',
        borderRadius: 6,
        shadow: true,
      },
      {
        type: 'swatch',
        x: 200,
        y: 680,
        width: 85,
        height: 85,
        rotation: 0,
        zIndex: 8,
        opacity: 1,
        backgroundColor: '#451a03',
        content: '#451a03',
        label: 'Grain Shadow',
        borderRadius: 6,
        shadow: true,
      },
      {
        type: 'swatch',
        x: 300,
        y: 680,
        width: 85,
        height: 85,
        rotation: 0,
        zIndex: 9,
        opacity: 1,
        backgroundColor: '#fef3c7',
        content: '#fef3c7',
        label: 'Parchment',
        borderRadius: 6,
        shadow: true,
      },
      {
        type: 'swatch',
        x: 400,
        y: 680,
        width: 85,
        height: 85,
        rotation: 0,
        zIndex: 10,
        opacity: 1,
        backgroundColor: '#0d9488',
        content: '#0d9488',
        label: 'Faded Teal',
        borderRadius: 6,
        shadow: true,
      },
      {
        type: 'note',
        x: 530,
        y: 670,
        width: 440,
        height: 160,
        rotation: -0.8,
        zIndex: 11,
        opacity: 0.96,
        content: 'Stock & Process:\n- Kodak Portra 400 pushed +1 stop\n- Warm tungsten lens filter\n- Uncoated vintage 50mm glass',
        backgroundColor: '#fef3c7',
        color: '#292524',
        fontSize: 14,
        borderRadius: 4,
        shadow: true,
      },
      {
        type: 'note',
        x: 1010,
        y: 670,
        width: 360,
        height: 160,
        rotation: 1.2,
        zIndex: 12,
        opacity: 0.96,
        content: 'Soundtrack & Mood:\n- Analog tape warmth & acoustic reverberation\n- Golden dusk atmosphere',
        backgroundColor: '#ffe4e6',
        color: '#292524',
        fontSize: 14,
        borderRadius: 4,
        shadow: true,
      },
    ],
  },
  {
    id: 'fashion-lookbook',
    name: 'Fashion Lookbook & Styling',
    description: 'Vertical lookbook silhouettes, macro textile swatches & model pose studies.',
    category: 'lookbook',
    canvas: {
      width: 1920,
      height: 1080,
      backgroundColor: '#141210',
      backgroundPattern: 'none',
    },
    elements: [
      {
        type: 'text',
        x: 70,
        y: 50,
        width: 650,
        height: 44,
        rotation: 0,
        zIndex: 1,
        opacity: 1,
        content: 'COLLECTION SS/27 LOOKBOOK',
        fontSize: 30,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontWeight: '700',
        textAlign: 'left',
        color: '#f7efe6',
      },
      {
        type: 'text',
        x: 70,
        y: 100,
        width: 450,
        height: 26,
        rotation: 0,
        zIndex: 2,
        opacity: 1,
        content: 'Silhouette Study · Texture Palettes · Castings',
        fontSize: 14,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontWeight: '400',
        textAlign: 'left',
        color: '#a3988c',
      },
      {
        type: 'image',
        x: 70,
        y: 150,
        width: 330,
        height: 560,
        rotation: 0,
        zIndex: 3,
        opacity: 1,
        fit: 'cover',
        borderRadius: 6,
        shadow: true,
        label: 'Look 01 Silhouette',
      },
      {
        type: 'image',
        x: 430,
        y: 150,
        width: 320,
        height: 360,
        rotation: 0,
        zIndex: 4,
        opacity: 1,
        fit: 'cover',
        borderRadius: 6,
        shadow: true,
        label: 'Macro Texture',
      },
      {
        type: 'image',
        x: 430,
        y: 535,
        width: 320,
        height: 360,
        rotation: 0,
        zIndex: 5,
        opacity: 1,
        fit: 'cover',
        borderRadius: 6,
        shadow: true,
        label: 'H/MU Direction',
      },
      {
        type: 'image',
        x: 780,
        y: 150,
        width: 360,
        height: 500,
        rotation: 0,
        zIndex: 6,
        opacity: 1,
        fit: 'cover',
        borderRadius: 6,
        shadow: true,
        label: 'Motion Study',
      },
      {
        type: 'image',
        x: 1170,
        y: 150,
        width: 340,
        height: 560,
        rotation: 0,
        zIndex: 7,
        opacity: 1,
        fit: 'cover',
        borderRadius: 6,
        shadow: true,
        label: 'Look 02 Full',
      },
      {
        type: 'image',
        x: 1540,
        y: 150,
        width: 310,
        height: 420,
        rotation: 0,
        zIndex: 8,
        opacity: 1,
        fit: 'cover',
        borderRadius: 6,
        shadow: true,
        label: 'Backstage Vibe',
      },
      {
        type: 'swatch',
        x: 780,
        y: 680,
        width: 80,
        height: 80,
        rotation: 0,
        zIndex: 9,
        opacity: 1,
        backgroundColor: '#fdfbf7',
        content: '#fdfbf7',
        label: 'Raw Silk',
        borderRadius: 6,
        shadow: true,
      },
      {
        type: 'swatch',
        x: 875,
        y: 680,
        width: 80,
        height: 80,
        rotation: 0,
        zIndex: 10,
        opacity: 1,
        backgroundColor: '#111111',
        content: '#111111',
        label: 'Velvet Noir',
        borderRadius: 6,
        shadow: true,
      },
      {
        type: 'swatch',
        x: 970,
        y: 680,
        width: 80,
        height: 80,
        rotation: 0,
        zIndex: 11,
        opacity: 1,
        backgroundColor: '#9a3412',
        content: '#9a3412',
        label: 'Sienna',
        borderRadius: 6,
        shadow: true,
      },
      {
        type: 'swatch',
        x: 1065,
        y: 680,
        width: 80,
        height: 80,
        rotation: 0,
        zIndex: 12,
        opacity: 1,
        backgroundColor: '#84a98c',
        content: '#84a98c',
        label: 'Sage Linen',
        borderRadius: 6,
        shadow: true,
      },
      {
        type: 'note',
        x: 1170,
        y: 735,
        width: 380,
        height: 160,
        rotation: 0,
        zIndex: 13,
        opacity: 0.96,
        content: 'Styling Requirements:\n- Steam all linens pre-shoot\n- Matte leather boots (size 39/40)\n- Minimalist architectural gold jewelry',
        backgroundColor: '#f5f5f4',
        color: '#1c1917',
        fontSize: 14,
        borderRadius: 6,
        shadow: true,
      },
    ],
  },
  {
    id: 'minimalist-clean',
    name: 'Minimalist Clean',
    description: 'Generous negative space, light cream gallery palette & balanced geometry.',
    category: 'minimal',
    canvas: {
      width: 1920,
      height: 1080,
      backgroundColor: '#f7f6f2',
      backgroundPattern: 'dots',
    },
    elements: [
      {
        type: 'text',
        x: 120,
        y: 70,
        width: 700,
        height: 44,
        rotation: 0,
        zIndex: 1,
        opacity: 1,
        content: 'OBJECT & FORM / STILL LIFE STUDY',
        fontSize: 28,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontWeight: '600',
        textAlign: 'left',
        color: '#18181b',
      },
      {
        type: 'text',
        x: 120,
        y: 120,
        width: 500,
        height: 24,
        rotation: 0,
        zIndex: 2,
        opacity: 1,
        content: 'Curated negative space · Sub-pixel architectural alignment',
        fontSize: 14,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontWeight: '400',
        textAlign: 'left',
        color: '#71717a',
      },
      {
        type: 'image',
        x: 120,
        y: 180,
        width: 480,
        height: 560,
        rotation: 0,
        zIndex: 3,
        opacity: 1,
        fit: 'cover',
        borderRadius: 4,
        shadow: true,
        label: 'Study 01',
      },
      {
        type: 'image',
        x: 640,
        y: 180,
        width: 480,
        height: 560,
        rotation: 0,
        zIndex: 4,
        opacity: 1,
        fit: 'cover',
        borderRadius: 4,
        shadow: true,
        label: 'Study 02',
      },
      {
        type: 'image',
        x: 1160,
        y: 180,
        width: 480,
        height: 560,
        rotation: 0,
        zIndex: 5,
        opacity: 1,
        fit: 'cover',
        borderRadius: 4,
        shadow: true,
        label: 'Study 03',
      },
      {
        type: 'swatch',
        x: 120,
        y: 780,
        width: 75,
        height: 75,
        rotation: 0,
        zIndex: 6,
        opacity: 1,
        backgroundColor: '#f1f5f9',
        content: '#f1f5f9',
        label: 'Alabaster',
        borderRadius: 4,
        shadow: true,
      },
      {
        type: 'swatch',
        x: 210,
        y: 780,
        width: 75,
        height: 75,
        rotation: 0,
        zIndex: 7,
        opacity: 1,
        backgroundColor: '#94a3b8',
        content: '#94a3b8',
        label: 'Concrete',
        borderRadius: 4,
        shadow: true,
      },
      {
        type: 'swatch',
        x: 300,
        y: 780,
        width: 75,
        height: 75,
        rotation: 0,
        zIndex: 8,
        opacity: 1,
        backgroundColor: '#334155',
        content: '#334155',
        label: 'Slate',
        borderRadius: 4,
        shadow: true,
      },
      {
        type: 'swatch',
        x: 390,
        y: 780,
        width: 75,
        height: 75,
        rotation: 0,
        zIndex: 9,
        opacity: 1,
        backgroundColor: '#ca8a04',
        content: '#ca8a04',
        label: 'Ochre Glow',
        borderRadius: 4,
        shadow: true,
      },
      {
        type: 'text',
        x: 640,
        y: 790,
        width: 600,
        height: 30,
        rotation: 0,
        zIndex: 10,
        opacity: 1,
        content: 'Rule: 100% natural northern window illumination. Zero direct flash.',
        fontSize: 15,
        fontFamily: 'system-ui, sans-serif',
        fontWeight: '500',
        textAlign: 'left',
        color: '#52525b',
      },
    ],
  },
  {
    id: 'color-story',
    name: 'Color Story & Palette Study',
    description: 'Prominent horizontal color swatches paired with tone-matched inspiration photographs.',
    category: 'concept',
    canvas: {
      width: 1920,
      height: 1080,
      backgroundColor: '#141312',
      backgroundPattern: 'dots',
    },
    elements: [
      {
        type: 'text',
        x: 80,
        y: 55,
        width: 700,
        height: 44,
        rotation: 0,
        zIndex: 1,
        opacity: 1,
        content: 'TONAL PALETTE & CHROMATIC HARMONY',
        fontSize: 30,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontWeight: '700',
        textAlign: 'left',
        color: '#fefefe',
      },
      {
        type: 'swatch',
        x: 80,
        y: 120,
        width: 320,
        height: 90,
        rotation: 0,
        zIndex: 2,
        opacity: 1,
        backgroundColor: '#c2410c',
        content: '#c2410c',
        label: '#C2410C Rust',
        borderRadius: 6,
        shadow: true,
      },
      {
        type: 'swatch',
        x: 430,
        y: 120,
        width: 320,
        height: 90,
        rotation: 0,
        zIndex: 3,
        opacity: 1,
        backgroundColor: '#d97706',
        content: '#d97706',
        label: '#D97706 Sand',
        borderRadius: 6,
        shadow: true,
      },
      {
        type: 'swatch',
        x: 780,
        y: 120,
        width: 320,
        height: 90,
        rotation: 0,
        zIndex: 4,
        opacity: 1,
        backgroundColor: '#65a30d',
        content: '#65a30d',
        label: '#65A30D Sage',
        borderRadius: 6,
        shadow: true,
      },
      {
        type: 'swatch',
        x: 1130,
        y: 120,
        width: 320,
        height: 90,
        rotation: 0,
        zIndex: 5,
        opacity: 1,
        backgroundColor: '#0284c7',
        content: '#0284c7',
        label: '#0284C7 Marine',
        borderRadius: 6,
        shadow: true,
      },
      {
        type: 'swatch',
        x: 1480,
        y: 120,
        width: 320,
        height: 90,
        rotation: 0,
        zIndex: 6,
        opacity: 1,
        backgroundColor: '#7c3aed',
        content: '#7c3aed',
        label: '#7C3AED Iris',
        borderRadius: 6,
        shadow: true,
      },
      {
        type: 'image',
        x: 80,
        y: 235,
        width: 320,
        height: 480,
        rotation: 0,
        zIndex: 7,
        opacity: 1,
        fit: 'cover',
        borderRadius: 6,
        shadow: true,
        label: 'Rust Tone',
      },
      {
        type: 'image',
        x: 430,
        y: 235,
        width: 320,
        height: 480,
        rotation: 0,
        zIndex: 8,
        opacity: 1,
        fit: 'cover',
        borderRadius: 6,
        shadow: true,
        label: 'Sand Tone',
      },
      {
        type: 'image',
        x: 780,
        y: 235,
        width: 320,
        height: 480,
        rotation: 0,
        zIndex: 9,
        opacity: 1,
        fit: 'cover',
        borderRadius: 6,
        shadow: true,
        label: 'Sage Tone',
      },
      {
        type: 'image',
        x: 1130,
        y: 235,
        width: 320,
        height: 480,
        rotation: 0,
        zIndex: 10,
        opacity: 1,
        fit: 'cover',
        borderRadius: 6,
        shadow: true,
        label: 'Marine Tone',
      },
      {
        type: 'image',
        x: 1480,
        y: 235,
        width: 320,
        height: 480,
        rotation: 0,
        zIndex: 11,
        opacity: 1,
        fit: 'cover',
        borderRadius: 6,
        shadow: true,
        label: 'Iris Tone',
      },
      {
        type: 'note',
        x: 80,
        y: 745,
        width: 500,
        height: 140,
        rotation: 0,
        zIndex: 12,
        opacity: 0.96,
        content: 'Harmony Principle:\nSplit-complementary natural pigments balanced by deep slate ground.',
        backgroundColor: '#fef3c7',
        color: '#1c1917',
        fontSize: 14,
        borderRadius: 6,
        shadow: true,
      },
    ],
  },
];

export function applyTemplate(templateId: string, availableImages?: ImageItem[]): boolean {
  const template = MOODBOARD_TEMPLATES.find((t) => t.id === templateId);
  if (!template) return false;

  let imageIndex = 0;
  const newElements: MoodBoardElement[] = template.elements.map((tplEl) => {
    const id = generateElementId(tplEl.type);
    let extraProps: Partial<MoodBoardElement> = {};

    if (tplEl.type === 'image' && availableImages && availableImages.length > 0) {
      if (imageIndex < availableImages.length) {
        const img = availableImages[imageIndex++];
        extraProps = {
          content: img.previewUrl || img.thumbnailUrl,
          imageItemId: img.id,
          label: img.customLabel || img.name,
        };
      }
    }

    return {
      ...tplEl,
      ...extraProps,
      id,
    } as MoodBoardElement;
  });

  const newConfig: MoodBoardCanvasConfig = {
    ...DEFAULT_MOODBOARD_CONFIG,
    ...template.canvas,
  };

  $moodboardElements.set(normalizeZIndices(newElements));
  $moodboardConfig.set(newConfig);
  $moodboardSelection.set([]);
  clearHistory();

  return true;
}

// ---------------------------------------------------------------------------
// Board Lifecycle & Manifest Import / Export
// ---------------------------------------------------------------------------
export function resetBoard() {
  $moodboardElements.set([]);
  $moodboardConfig.set({ ...DEFAULT_MOODBOARD_CONFIG });
  $moodboardSelection.set([]);
  clearHistory();
}

export function exportMoodBoardManifest(): MoodBoardManifest {
  return {
    version: '1.0.0',
    generator: 'Make Contact Sheet - Mood Board Maker',
    createdAt: new Date().toISOString(),
    canvas: { ...$moodboardConfig.get() },
    elements: cloneElements($moodboardElements.get()),
  };
}

export function downloadMoodBoardManifest(filename = 'makecontactsheet-moodboard.json') {
  const manifest = exportMoodBoardManifest();
  const jsonStr = JSON.stringify(manifest, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

export function importMoodBoardManifest(
  manifest: MoodBoardManifest,
  availableImages?: ImageItem[]
): boolean {
  if (!manifest || !manifest.canvas || !Array.isArray(manifest.elements)) {
    return false;
  }

  // Relink image items if possible
  const relinkedElements: MoodBoardElement[] = manifest.elements.map((el) => {
    if (el.type === 'image' && availableImages && availableImages.length > 0) {
      if (el.imageItemId) {
        const match = availableImages.find((img) => img.id === el.imageItemId);
        if (match) {
          return {
            ...el,
            content: match.previewUrl || match.thumbnailUrl,
            label: match.customLabel || match.name,
          };
        }
      }
    }
    return { ...el };
  });

  $moodboardConfig.set({
    ...DEFAULT_MOODBOARD_CONFIG,
    ...manifest.canvas,
  });

  $moodboardElements.set(normalizeZIndices(relinkedElements));
  $moodboardSelection.set([]);
  clearHistory();

  return true;
}

export function getMoodBoardState(): MoodBoardState {
  return {
    config: { ...$moodboardConfig.get() },
    elements: cloneElements($moodboardElements.get()),
    selectedIds: [...$moodboardSelection.get()],
  };
}

export const exportManifest = exportMoodBoardManifest;
export const importManifest = importMoodBoardManifest;
export const downloadManifest = downloadMoodBoardManifest;
