import { atom, computed } from 'nanostores';
import type {
  ImageItem,
  LayoutConfig,
  WorkspaceMode,
  FilterStatus,
  ReviewStatus,
  SortKey,
  ProjectManifest
} from './types';
import { clearImageElementCache } from './engine/canvasRenderer';

export const DEFAULT_LAYOUT_CONFIG: LayoutConfig = {
  columns: 4,
  rows: 5,
  spacing: 12,
  margin: 24,
  pageSize: 'a4',
  orientation: 'portrait',
  fit: 'contain',
  bg: '#1a1210', // Dark chocolate sheet — the truffle tone at printable density
  textColor: '#f7efe6',
  showLabels: true,
  labelType: 'filename',
  labelPosition: 'below',
  fontSize: 11,
  showStatusBadges: true,
  showHeader: false,
  headerText: '',
  showPageNumbers: false,
  cellBorderWidth: 0,
  cellBorderColor: '#4a352b',
  fillOrder: 'row',
  // 100 × 150 mm — a 4×6 print, so "custom" starts somewhere real rather than
  // at zero.
  customWidthMm: 100,
  customHeightMm: 150,
  labelUppercase: false,
  labelHideExtension: false,
  labelAlign: 'center',
  cellRadius: 0,
};

// Core Reactive Atoms
export const $images = atom<ImageItem[]>([]);
export const $selectedImageId = atom<string | null>(null);
export const $workspaceMode = atom<WorkspaceMode>('contact-sheet');
export const $layoutConfig = atom<LayoutConfig>({ ...DEFAULT_LAYOUT_CONFIG });
export const $filterStatus = atom<FilterStatus>('all');
export const $activeTemplateId = atom<string>('a4-portrait-proof');
export const $activePage = atom<number>(0);
export const $isExporting = atom<boolean>(false);
export const $exportProgress = atom<number>(0);
export const $isImporting = atom<boolean>(false);
export const $sortKey = atom<SortKey>('custom');
export const $pendingManifest = atom<ProjectManifest | null>(null);

// Computed: Filtered Images based on current review status filter
export const $filteredImages = computed([$images, $filterStatus], (images, filter) => {
  if (filter === 'all') return images;
  if (filter === 'keep') return images.filter(img => img.status === 'keep');
  if (filter === 'flag') return images.filter(img => img.status === 'flag');
  if (filter === 'reject') return images.filter(img => img.status === 'reject');
  if (filter === 'unreviewed') return images.filter(img => img.status === 'unreviewed');
  if (filter === 'exclude-rejected') return images.filter(img => img.status !== 'reject');
  return images;
});

// Computed: Review Counts summary
export const $reviewCounts = computed($images, (images) => {
  let keep = 0;
  let reject = 0;
  let flag = 0;
  let unreviewed = 0;

  for (const img of images) {
    if (img.status === 'keep') keep++;
    else if (img.status === 'reject') reject++;
    else if (img.status === 'flag') flag++;
    else unreviewed++;
  }

  return {
    total: images.length,
    keep,
    reject,
    flag,
    unreviewed,
  };
});

// Store Actions
export function addImages(newImages: ImageItem[]) {
  const current = $images.get();
  const startIndex = current.length;
  const orderedNew = newImages.map((img, idx) => ({
    ...img,
    order: startIndex + idx,
  }));
  $images.set([...current, ...orderedNew]);
  if (!$selectedImageId.get() && orderedNew.length > 0) {
    $selectedImageId.set(orderedNew[0].id);
  }
}

export function removeImage(id: string) {
  const current = $images.get();
  const target = current.find(img => img.id === id);
  if (target) {
    URL.revokeObjectURL(target.previewUrl);
    clearImageElementCache(target.previewUrl);
    if (target.thumbnailUrl && target.thumbnailUrl !== target.previewUrl) {
      URL.revokeObjectURL(target.thumbnailUrl);
      clearImageElementCache(target.thumbnailUrl);
    }
  }
  const filtered = current.filter(img => img.id !== id).map((img, idx) => ({
    ...img,
    order: idx,
  }));
  $images.set(filtered);

  if ($selectedImageId.get() === id) {
    $selectedImageId.set(filtered.length > 0 ? filtered[0].id : null);
  }
}

/**
 * Swaps edited photos in for the ones they came from.
 *
 * One action covers every edit because they differ only in cardinality: a
 * rotate is 1→1, a split is 1→N, a merge is N→1. Replacements land at the
 * position of the first source rather than at the end of the list, so a rotated
 * frame stays in frame 7's cell instead of jumping to the last page.
 *
 * Review state is inherited from the first source. Losing a Kept mark because a
 * photo was straightened would mean re-reviewing the shoot, which is worse than
 * the edit is worth.
 *
 * @param keepSources leaves the originals in the sheet and inserts the results
 *        after them — used by merge, where throwing away the frames that went
 *        into a composite is not recoverable without re-importing.
 */
export function replaceImages(
  sourceIds: string[],
  replacements: ImageItem[],
  options: { keepSources?: boolean } = {}
) {
  const current = $images.get();
  const idSet = new Set(sourceIds);
  const indices = current.reduce<number[]>((acc, img, idx) => {
    if (idSet.has(img.id)) acc.push(idx);
    return acc;
  }, []);
  if (replacements.length === 0) return;

  const first = indices.length > 0 ? current[indices[0]] : undefined;
  const inherited = replacements.map((img) => ({
    ...img,
    status: first ? first.status : img.status,
    note: first?.note ?? img.note,
  }));

  let next: ImageItem[];
  if (options.keepSources || indices.length === 0) {
    const at = indices.length > 0 ? indices[indices.length - 1] + 1 : current.length;
    next = [...current.slice(0, at), ...inherited, ...current.slice(at)];
  } else {
    for (const idx of indices) {
      const target = current[idx];
      URL.revokeObjectURL(target.previewUrl);
      clearImageElementCache(target.previewUrl);
      if (target.thumbnailUrl && target.thumbnailUrl !== target.previewUrl) {
        URL.revokeObjectURL(target.thumbnailUrl);
        clearImageElementCache(target.thumbnailUrl);
      }
    }
    const kept = current.filter((img) => !idSet.has(img.id));
    // Count how many survivors precede the first source: that index in the
    // filtered array is where the replacements belong.
    const at = current.slice(0, indices[0]).filter((img) => !idSet.has(img.id)).length;
    next = [...kept.slice(0, at), ...inherited, ...kept.slice(at)];
  }

  $images.set(next.map((img, idx) => ({ ...img, order: idx })));
  $selectedImageId.set(inherited[0].id);
  // The list no longer matches any automatic sort — an edited file has a new
  // name, size and timestamp, so re-applying the old key would shuffle the sheet.
  $sortKey.set('custom');
}

/**
 * Exchanges two photos' positions.
 *
 * Dragging one frame onto another in a grid means "put this here", and a splice
 * move would shift every photo between the two — visually the whole grid
 * reflows when the user asked for one cell to change. A swap moves exactly the
 * two cells the user touched.
 */
export function swapImages(idA: string, idB: string) {
  if (idA === idB) return;
  const current = [...$images.get()];
  const a = current.findIndex((img) => img.id === idA);
  const b = current.findIndex((img) => img.id === idB);
  if (a === -1 || b === -1) return;

  [current[a], current[b]] = [current[b], current[a]];
  $images.set(current.map((img, idx) => ({ ...img, order: idx })));
  $sortKey.set('custom');
}

/**
 * Moves one photo to a position, shifting the rest along — the tray's
 * insert-between gesture, as opposed to `swapImages`' cell exchange.
 *
 * `toIndex` is the slot the photo should end up in *after* it has been lifted
 * out, which is what a caret drawn between two thumbnails means.
 */
export function moveImageToIndex(id: string, toIndex: number) {
  const current = [...$images.get()];
  const from = current.findIndex((img) => img.id === id);
  if (from === -1) return;

  const clamped = Math.max(0, Math.min(current.length - 1, toIndex));
  if (from === clamped) return;

  const [moved] = current.splice(from, 1);
  current.splice(clamped, 0, moved);
  $images.set(current.map((img, idx) => ({ ...img, order: idx })));
  $sortKey.set('custom');
}

export function reorderImages(fromIndex: number, toIndex: number) {
  const current = [...$images.get()];
  if (fromIndex < 0 || fromIndex >= current.length || toIndex < 0 || toIndex >= current.length) {
    return;
  }
  const [moved] = current.splice(fromIndex, 1);
  current.splice(toIndex, 0, moved);
  const reindexed = current.map((img, idx) => ({ ...img, order: idx }));
  $images.set(reindexed);
  // A hand-placed order is no longer any of the automatic sorts.
  $sortKey.set('custom');
}

/**
 * Reorders the sheet. Filenames are compared with `localeCompare` and the
 * numeric collator, so DSC_2.jpg sorts before DSC_10.jpg — plain string
 * comparison puts "10" first, which is the classic contact-sheet complaint.
 *
 * `date-*` uses File.lastModified. That is the filesystem timestamp, not EXIF
 * DateTimeOriginal: EXIF is not parsed anywhere in this codebase yet, and a
 * copied or re-saved file loses its original mtime. Labelled "file date" in the
 * UI for that reason.
 */
export function sortImages(key: SortKey) {
  $sortKey.set(key);
  if (key === 'custom') return;

  const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
  const sorted = [...$images.get()].sort((a, b) => {
    switch (key) {
      case 'name-asc':
        return collator.compare(a.name, b.name);
      case 'name-desc':
        return collator.compare(b.name, a.name);
      case 'date-asc':
        return (a.file.lastModified || 0) - (b.file.lastModified || 0);
      case 'date-desc':
        return (b.file.lastModified || 0) - (a.file.lastModified || 0);
      case 'size-asc':
        return a.size - b.size;
      case 'size-desc':
        return b.size - a.size;
      default:
        return 0;
    }
  });

  $images.set(sorted.map((img, idx) => ({ ...img, order: idx })));
  $activePage.set(0);
}

export function setImageStatus(id: string, status: ReviewStatus) {
  const current = $images.get();
  $images.set(
    current.map(img => (img.id === id ? { ...img, status } : img))
  );
}

export function batchSetStatus(status: ReviewStatus, ids?: string[]) {
  const current = $images.get();
  if (!ids) {
    $images.set(current.map(img => ({ ...img, status })));
  } else {
    const idSet = new Set(ids);
    $images.set(current.map(img => (idSet.has(img.id) ? { ...img, status } : img)));
  }
}

export function updateLayoutConfig(partial: Partial<LayoutConfig>) {
  $layoutConfig.set({
    ...$layoutConfig.get(),
    ...partial,
  });
}

export function setWorkspaceMode(mode: WorkspaceMode) {
  $workspaceMode.set(mode);
}

export function setFilterStatus(filter: FilterStatus) {
  $filterStatus.set(filter);
  $activePage.set(0);
}

export function setActiveTemplate(templateId: string) {
  $activeTemplateId.set(templateId);
}

export function resetWorkspace() {
  const current = $images.get();
  for (const img of current) {
    URL.revokeObjectURL(img.previewUrl);
    clearImageElementCache(img.previewUrl);
    if (img.thumbnailUrl && img.thumbnailUrl !== img.previewUrl) {
      URL.revokeObjectURL(img.thumbnailUrl);
      clearImageElementCache(img.thumbnailUrl);
    }
  }
  clearImageElementCache();
  $images.set([]);
  $selectedImageId.set(null);
  $layoutConfig.set({ ...DEFAULT_LAYOUT_CONFIG });
  $filterStatus.set('all');
  $activePage.set(0);
  $sortKey.set('custom');
  $pendingManifest.set(null);
}

export function setPendingManifest(manifest: ProjectManifest | null) {
  $pendingManifest.set(manifest);
}

export function restoreWorkspaceFromManifest(manifest: ProjectManifest) {
  $workspaceMode.set(manifest.mode);
  $layoutConfig.set({
    ...DEFAULT_LAYOUT_CONFIG,
    ...manifest.layoutConfig,
  });
  if (manifest.activeTemplateId) {
    $activeTemplateId.set(manifest.activeTemplateId);
  }
  if (manifest.filterStatus) {
    $filterStatus.set(manifest.filterStatus);
  }
  if (manifest.sortKey) {
    $sortKey.set(manifest.sortKey);
  }
  $activePage.set(0);
}

export function setImages(images: ImageItem[]) {
  const current = $images.get();
  for (const img of current) {
    if (!images.some(n => n.id === img.id)) {
      URL.revokeObjectURL(img.previewUrl);
      clearImageElementCache(img.previewUrl);
      if (img.thumbnailUrl && img.thumbnailUrl !== img.previewUrl) {
        URL.revokeObjectURL(img.thumbnailUrl);
        clearImageElementCache(img.thumbnailUrl);
      }
    }
  }
  $images.set(images);
  if (images.length > 0) {
    $selectedImageId.set(images[0].id);
  } else {
    $selectedImageId.set(null);
  }
  $activePage.set(0);
}

