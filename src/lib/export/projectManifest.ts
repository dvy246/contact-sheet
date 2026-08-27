import type { 
  ImageItem, 
  LayoutConfig, 
  ProjectManifest, 
  ProjectManifestItem, 
  WorkspaceMode, 
  FilterStatus, 
  SortKey, 
  RelinkMatch, 
  RelinkReport, 
  ReviewStatus 
} from '../types';
import { DEFAULT_LAYOUT_CONFIG, restoreWorkspaceFromManifest, setImages } from '../store';
import { sanitizeFilename } from '../media/fileSanitizer';

/**
 * Builds a complete portable project session manifest object capturing
 * full layout config, review filter, sorting, active template, and per-image review states.
 */
export function buildProjectManifest(
  images: ImageItem[],
  mode: WorkspaceMode,
  config: LayoutConfig,
  activeTemplateId?: string,
  filterStatus?: FilterStatus,
  sortKey?: SortKey
): ProjectManifest {
  return {
    version: '1.0.0',
    generator: 'Make Contact Sheet',
    createdAt: new Date().toISOString(),
    mode,
    layoutConfig: { ...config },
    activeTemplateId,
    filterStatus,
    sortKey,
    images: images.map(img => ({
      name: img.name,
      sanitizedName: img.sanitizedName,
      size: img.size,
      lastModified: img.file?.lastModified ?? img.lastModified,
      type: img.type,
      width: img.width,
      height: img.height,
      status: img.status,
      order: img.order,
      note: img.note ?? img.notes,
      notes: img.notes ?? img.note,
      rating: img.rating,
      tags: img.tags ? [...img.tags] : undefined,
    })),
  };
}

/**
 * Serializes and downloads the project manifest as a `.makecontactsheet.json` file.
 */
export function exportProjectManifest(
  images: ImageItem[],
  mode: WorkspaceMode,
  config: LayoutConfig,
  activeTemplateId?: string,
  filename = 'makecontactsheet-session',
  filterStatus?: FilterStatus,
  sortKey?: SortKey
): void {
  const manifest = buildProjectManifest(images, mode, config, activeTemplateId, filterStatus, sortKey);
  const jsonStr = JSON.stringify(manifest, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.makecontactsheet.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Parses and validates an incoming JSON string into a ProjectManifest.
 * Supports current `Make Contact Sheet` format and legacy `FrameProof` manifests.
 */
export function parseProjectManifest(jsonText: string): ProjectManifest | null {
  try {
    const data = JSON.parse(jsonText);
    if (!data || typeof data !== 'object') return null;

    const isKnownGenerator = data.generator === 'Make Contact Sheet' || data.generator === 'FrameProof';
    const hasImagesArray = Array.isArray(data.images);
    if (!hasImagesArray) return null;
    if (!isKnownGenerator && !data.version) return null;

    const mode: WorkspaceMode = data.mode === 'collage' ? 'collage' : 'contact-sheet';

    const layoutConfig: LayoutConfig = {
      ...DEFAULT_LAYOUT_CONFIG,
      ...(data.layoutConfig && typeof data.layoutConfig === 'object' ? data.layoutConfig : {}),
    };

    const validStatuses: ReviewStatus[] = ['keep', 'reject', 'flag', 'unreviewed'];
    const images: ProjectManifestItem[] = data.images.map((item: any, idx: number) => {
      const status = validStatuses.includes(item?.status)
        ? (item.status as ReviewStatus)
        : 'unreviewed';

      const rawName = typeof item?.name === 'string' && item.name ? item.name : `image-${idx + 1}`;
      const sanitizedName = typeof item?.sanitizedName === 'string' && item.sanitizedName
        ? item.sanitizedName
        : sanitizeFilename(rawName);

      return {
        name: rawName,
        sanitizedName,
        size: typeof item?.size === 'number' ? item.size : 0,
        lastModified: typeof item?.lastModified === 'number' ? item.lastModified : undefined,
        type: typeof item?.type === 'string' ? item.type : 'image/jpeg',
        width: typeof item?.width === 'number' ? item.width : 0,
        height: typeof item?.height === 'number' ? item.height : 0,
        status,
        order: typeof item?.order === 'number' ? item.order : idx,
        note: typeof item?.note === 'string' ? item.note : typeof item?.notes === 'string' ? item.notes : undefined,
        notes: typeof item?.notes === 'string' ? item.notes : typeof item?.note === 'string' ? item.note : undefined,
        rating: typeof item?.rating === 'number' ? item.rating : undefined,
        tags: Array.isArray(item?.tags) ? item.tags.filter((t: any) => typeof t === 'string') : undefined,
      };
    });

    const validFilters: FilterStatus[] = ['all', 'keep', 'flag', 'reject', 'unreviewed', 'exclude-rejected'];
    const validSortKeys: SortKey[] = ['custom', 'name-asc', 'name-desc', 'date-asc', 'date-desc', 'size-asc', 'size-desc'];

    const manifest: ProjectManifest = {
      version: typeof data.version === 'string' ? data.version : '1.0.0',
      generator: typeof data.generator === 'string' ? data.generator : 'Make Contact Sheet',
      createdAt: typeof data.createdAt === 'string' ? data.createdAt : new Date().toISOString(),
      mode,
      layoutConfig,
      activeTemplateId: typeof data.activeTemplateId === 'string' ? data.activeTemplateId : undefined,
      filterStatus: validFilters.includes(data.filterStatus) ? data.filterStatus : undefined,
      sortKey: validSortKeys.includes(data.sortKey) ? data.sortKey : undefined,
      images,
    };

    return manifest;
  } catch {
    return null;
  }
}

/**
 * Matches user-imported files to manifest items with match confidence tiers:
 * - exact: filename and byte size match (1.0)
 * - name: filename or sanitized name matches (0.85)
 * - size: byte size matches (0.50)
 */
export function relinkProjectManifest(manifest: ProjectManifest, newFiles: File[]): RelinkReport {
  const matches: RelinkMatch[] = [];
  const unmatchedFiles = new Set<File>(newFiles);
  const unmatchedManifestItems = new Set<ProjectManifestItem>(manifest.images);

  let exactCount = 0;
  let nameCount = 0;
  let sizeCount = 0;

  // Pass 1: Exact matches (Filename and file size match)
  for (const file of Array.from(unmatchedFiles)) {
    const sanitizedFileName = sanitizeFilename(file.name);
    for (const item of Array.from(unmatchedManifestItems)) {
      const nameMatches = file.name === item.name || sanitizedFileName === item.sanitizedName;
      const sizeMatches = file.size === item.size;
      if (nameMatches && sizeMatches) {
        matches.push({
          file,
          manifestItem: item,
          confidence: 'exact',
          score: 1.0,
        });
        unmatchedFiles.delete(file);
        unmatchedManifestItems.delete(item);
        exactCount++;
        break;
      }
    }
  }

  // Pass 2: Name matches (Filename matches, size may differ slightly due to re-save/export)
  for (const file of Array.from(unmatchedFiles)) {
    const sanitizedFileName = sanitizeFilename(file.name);
    for (const item of Array.from(unmatchedManifestItems)) {
      const nameMatches = file.name === item.name || sanitizedFileName === item.sanitizedName;
      if (nameMatches) {
        matches.push({
          file,
          manifestItem: item,
          confidence: 'name',
          score: 0.85,
        });
        unmatchedFiles.delete(file);
        unmatchedManifestItems.delete(item);
        nameCount++;
        break;
      }
    }
  }

  // Pass 3: Size matches (Exact byte size match with non-zero size)
  for (const file of Array.from(unmatchedFiles)) {
    if (file.size <= 0) continue;
    for (const item of Array.from(unmatchedManifestItems)) {
      if (file.size === item.size) {
        matches.push({
          file,
          manifestItem: item,
          confidence: 'size',
          score: 0.5,
        });
        unmatchedFiles.delete(file);
        unmatchedManifestItems.delete(item);
        sizeCount++;
        break;
      }
    }
  }

  const totalManifestCount = Math.max(1, manifest.images.length);
  const matchRate = matches.length / totalManifestCount;

  return {
    matches,
    unmatchedFiles: Array.from(unmatchedFiles),
    unmatchedManifestItems: Array.from(unmatchedManifestItems),
    exactCount,
    nameCount,
    sizeCount,
    matchRate,
  };
}

/**
 * Applies manifest metadata (status, notes, ratings, order) to loaded ImageItem instances.
 */
export function applyManifestToImageItems(
  manifest: ProjectManifest,
  items: ImageItem[]
): { items: ImageItem[]; report: RelinkReport } {
  const files = items.map(img => img.file);
  const report = relinkProjectManifest(manifest, files);

  const fileToMatchMap = new Map<File, RelinkMatch>();
  for (const match of report.matches) {
    fileToMatchMap.set(match.file, match);
  }

  const updatedItems = items.map((img, defaultIndex) => {
    const match = fileToMatchMap.get(img.file);
    if (match) {
      const mItem = match.manifestItem;
      return {
        ...img,
        status: mItem.status,
        note: mItem.note ?? mItem.notes ?? img.note,
        notes: mItem.notes ?? mItem.note ?? img.notes,
        rating: mItem.rating ?? img.rating,
        tags: mItem.tags ? [...mItem.tags] : img.tags,
        order: typeof mItem.order === 'number' ? mItem.order : defaultIndex,
      };
    }
    return {
      ...img,
      order: defaultIndex + manifest.images.length,
    };
  });

  // Sort by restored order
  updatedItems.sort((a, b) => a.order - b.order);

  // Normalize order indices
  const sequentialItems = updatedItems.map((img, idx) => ({
    ...img,
    order: idx,
  }));

  return {
    items: sequentialItems,
    report,
  };
}

/**
 * Restores a full project review session: sets store configuration and updates $images.
 */
export function restoreProjectSession(manifest: ProjectManifest, items: ImageItem[]): RelinkReport {
  restoreWorkspaceFromManifest(manifest);
  const { items: restoredItems, report } = applyManifestToImageItems(manifest, items);
  setImages(restoredItems);
  return report;
}
