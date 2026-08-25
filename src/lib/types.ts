export type ReviewStatus = 'unreviewed' | 'keep' | 'reject' | 'flag';

export type WorkspaceMode = 'contact-sheet' | 'collage';

export type PageSize = 'a4' | 'letter' | '16-9' | 'auto' | 'square' | 'story' | 'custom';

export type PageOrientation = 'portrait' | 'landscape';

export type ImageFit = 'contain' | 'cover';

export type LabelPosition = 'below' | 'overlay' | 'none';

export type LabelType = 'filename' | 'number' | 'both' | 'none';

export type FilterStatus = 'all' | 'keep' | 'flag' | 'reject' | 'unreviewed' | 'exclude-rejected';

export type ExportFormat = 'png' | 'jpeg' | 'pdf' | 'csv' | 'txt' | 'json';

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
}

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
  cells: {
    image: ImageItem;
    x: number;
    y: number;
    width: number;
    height: number;
    label?: string;
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

export interface ProjectManifest {
  version: '1.0.0';
  generator: 'FrameProof';
  createdAt: string;
  mode: WorkspaceMode;
  layoutConfig: LayoutConfig;
  activeTemplateId?: string;
  images: {
    name: string;
    sanitizedName: string;
    size: number;
    type: string;
    width: number;
    height: number;
    status: ReviewStatus;
    order: number;
    note?: string;
  }[];
}
