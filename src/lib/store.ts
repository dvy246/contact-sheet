import { atom, computed } from 'nanostores';
import type { 
  ImageItem, 
  LayoutConfig, 
  WorkspaceMode, 
  FilterStatus, 
  ReviewStatus
} from './types';

export const DEFAULT_LAYOUT_CONFIG: LayoutConfig = {
  columns: 4,
  rows: 5,
  spacing: 12,
  margin: 24,
  pageSize: 'a4',
  orientation: 'portrait',
  fit: 'contain',
  bg: '#141417', // The Archival Matte dark background
  textColor: '#f4f4f5',
  showLabels: true,
  labelType: 'filename',
  labelPosition: 'below',
  fontSize: 11,
  showStatusBadges: true,
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
    if (target.thumbnailUrl && target.thumbnailUrl !== target.previewUrl) {
      URL.revokeObjectURL(target.thumbnailUrl);
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

export function reorderImages(fromIndex: number, toIndex: number) {
  const current = [...$images.get()];
  if (fromIndex < 0 || fromIndex >= current.length || toIndex < 0 || toIndex >= current.length) {
    return;
  }
  const [moved] = current.splice(fromIndex, 1);
  current.splice(toIndex, 0, moved);
  const reindexed = current.map((img, idx) => ({ ...img, order: idx }));
  $images.set(reindexed);
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
    if (img.thumbnailUrl && img.thumbnailUrl !== img.previewUrl) {
      URL.revokeObjectURL(img.thumbnailUrl);
    }
  }
  $images.set([]);
  $selectedImageId.set(null);
  $layoutConfig.set({ ...DEFAULT_LAYOUT_CONFIG });
  $filterStatus.set('all');
  $activePage.set(0);
}
