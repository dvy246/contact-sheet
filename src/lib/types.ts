export type ReviewStatus = 'unreviewed' | 'keep' | 'reject' | 'flag';

export type WorkspaceMode = 'contact-sheet' | 'collage';

export type PageSize = 'a4' | 'letter' | '16-9' | 'auto' | 'square' | 'story' | 'custom';

export type PageOrientation = 'portrait' | 'landscape';

export type ImageFit = 'contain' | 'cover';

export type LabelPosition = 'below' | 'overlay' | 'none';

export type LabelType = 'filename' | 'number' | 'both' | 'none';

/** Photo ordering. `custom` means "whatever order the user dragged them into"
 *  and is what any manual reorder falls back to. */
export type SortKey =
  | 'custom'
  | 'name-asc'
  | 'name-desc'
  | 'date-asc'
  | 'date-desc'
  | 'size-asc'
  | 'size-desc';

export type FilterStatus = 'all' | 'keep' | 'flag' | 'reject' | 'unreviewed' | 'exclude-rejected';

export type ExportFormat = 'png' | 'jpeg' | 'pdf' | 'csv' | 'txt' | 'json';

export interface ImageExifData {
  dateTimeOriginal?: string;
  captureDate?: Date;
  cameraMake?: string;
  cameraModel?: string;
  lensModel?: string;
  focalLength?: string;
  fNumber?: string;
  exposureTime?: string;
  iso?: number;
  exposureBias?: string;
  rating?: number;
  copyright?: string;
}

export interface ImageItem {
  id: string;
  file: File;
  name: string;
  sanitizedName: string;
  size: number;
  type: string;
  width: number;
  height: number;
  aspectRatio: number;
  previewUrl: string;
  thumbnailUrl: string;
  status: ReviewStatus;
  order: number;
  note?: string;
  notes?: string;
  rating?: number;
  tags?: string[];
  lastModified?: number;
  /** Optional custom user-defined label overriding the camera filename */
  customLabel?: string;
  exif?: ImageExifData;
}

export type WatermarkStyle = 'diagonal' | 'tiled' | 'center';
export type WatermarkType = 'text' | 'image';
export type WatermarkImagePosition = 'center' | 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'tiled';

export interface LayoutConfig {
  columns: number;
  rows: number;
  spacing: number;
  margin: number;
  pageSize: PageSize;
  orientation: PageOrientation;
  fit: ImageFit;
  bg: string;
  textColor: string;
  showLabels: boolean;
  labelType: LabelType;
  labelPosition: LabelPosition;
  fontSize: number;
  showStatusBadges: boolean;
  /** Sheet title band across the top of every page. */
  showHeader: boolean;
  /** Empty string means "use the default title" rather than "draw nothing" —
   *  drawing nothing is what showHeader: false is for. */
  headerText: string;
  /** "Page 2 of 5" band along the bottom of every page. */
  showPageNumbers: boolean;
  /** Hairline keyline around each photo, in unscaled px. 0 disables it. */
  cellBorderWidth: number;
  cellBorderColor: string;
  /** Frame flow. `row` fills left-to-right then down (how a proof sheet is
   *  normally read); `column` fills top-to-bottom then across, which is how a
   *  film strip is laid out on a light table. */
  fillOrder: 'row' | 'column';
  /** Page size in mm, used only when `pageSize` is `custom`. */
  customWidthMm: number;
  customHeightMm: number;
  /** Print labels in capitals. Some studios require it for legibility on
   *  small thumbnails. */
  labelUppercase: boolean;
  /** Drop `.jpg` / `.cr2` etc. from a filename label. */
  labelHideExtension: boolean;
  /** Where a `below` label sits within its cell width. */
  labelAlign: 'center' | 'left';
  /** Corner radius on each photo, in unscaled px. 0 keeps square corners. */
  cellRadius: number;
  /** Optional protective watermark on photo frames */
  showWatermark: boolean;
  watermarkType: WatermarkType;
  watermarkText: string;
  watermarkStyle: WatermarkStyle;
  watermarkOpacity: number;
  watermarkColor: string;
  /** Custom logo/image watermark properties */
  watermarkImageUrl?: string;
  watermarkImageScale?: number;
  watermarkImagePosition?: WatermarkImagePosition;
}

export interface CollageTemplateCell {
  x: number; // 0 to 1
  y: number; // 0 to 1
  w: number; // 0 to 1
  h: number; // 0 to 1
  fit?: ImageFit;
}

export interface CollageTemplate {
  id: string;
  name: string;
  description: string;
  category: 'basic' | 'social' | 'comparison' | 'showcase';
  aspectRatio: number; // width / height
  cells: CollageTemplateCell[];
  defaultSpacing: number;
  defaultMargin: number;
}

export interface PageLayoutResult {
  pageIndex: number;
  totalPages: number;
  canvasWidth: number;
  canvasHeight: number;
  /** Multiplier the page geometry was built at. The renderer needs it so the
   *  header/footer bands and keylines scale with the page instead of staying
   *  11px tall on a 300dpi export. */
  scale: number;
  /** Reserved bands, present only when the corresponding config flag is on. */
  headerRect?: { x: number; y: number; width: number; height: number };
  footerRect?: { x: number; y: number; width: number; height: number };
  cells: {
    image: ImageItem;
    x: number;
    y: number;
    width: number;
    height: number;
    label?: string;
    /** Top of the `below` label strip, in page pixels. Fixed per row rather
     *  than derived from the photo rect: under `contain` a short photo is
     *  centred in its cell, so hanging the label off the photo made labels in
     *  one row sit at different heights. Undefined when no strip was reserved
     *  (labels off, or drawn as an overlay). */
    labelY?: number;
    /** Left edge and width of the label strip — the *cell*, not the photo, so a
     *  left-aligned label lines up with the grid column rather than with a
     *  letterboxed photo that may be inset. */
    labelX?: number;
    labelWidth?: number;
    indexNumber?: number;
    status: ReviewStatus;
  }[];
}

export interface CollageLayoutResult {
  canvasWidth: number;
  canvasHeight: number;
  cells: {
    image?: ImageItem;
    x: number;
    y: number;
    width: number;
    height: number;
    fit: ImageFit;
  }[];
}

export interface ExportOptions {
  format: ExportFormat;
  quality: number; // 0.5 - 1.0
  scale: number; // 1, 2, 3
  dpi: number; // 72, 150, 300
  filter: FilterStatus;
  includeHeader: boolean;
  headerTitle?: string;
}

export interface ProjectManifestItem {
  name: string;
  sanitizedName: string;
  size: number;
  lastModified?: number;
  type: string;
  width: number;
  height: number;
  status: ReviewStatus;
  order: number;
  note?: string;
  notes?: string;
  rating?: number;
  tags?: string[];
  customLabel?: string;
  exif?: ImageExifData;
}

export interface ProjectManifest {
  version: string;
  generator: string;
  createdAt: string;
  mode: WorkspaceMode;
  layoutConfig: LayoutConfig;
  activeTemplateId?: string;
  filterStatus?: FilterStatus;
  sortKey?: SortKey;
  images: ProjectManifestItem[];
}

export type RelinkConfidence = 'exact' | 'name' | 'size';

export interface RelinkMatch {
  file: File;
  manifestItem: ProjectManifestItem;
  confidence: RelinkConfidence;
  score: number;
}

export interface RelinkReport {
  matches: RelinkMatch[];
  unmatchedFiles: File[];
  unmatchedManifestItems: ProjectManifestItem[];
  exactCount: number;
  nameCount: number;
  sizeCount: number;
  matchRate: number;
}

export interface FilenameExportOptions {
  filename?: string;
  filter?: FilterStatus;
  format?: 'newline' | 'comma' | 'space';
  delimiter?: string;
}
