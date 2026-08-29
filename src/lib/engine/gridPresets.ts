import type { LayoutConfig } from '../types';

/**
 * One-click grid recipes for the photo grid maker.
 *
 * The contact sheet controls expose about thirty fields because a proof sheet is
 * a document — it needs filenames, page sizes and margins. A photo grid is a
 * picture: the only decisions that matter are how many across, how many down,
 * and what shape the result is. So each preset carries a complete patch and the
 * grid tool ships four live controls instead of thirty.
 *
 * `patch` is deliberately a full override of every field a grid cares about.
 * Arriving from the contact sheet route with labels and a title band switched on
 * would otherwise leak a filename strip into a square Instagram grid.
 */
export interface GridPreset {
  id: string;
  label: string;
  /** Short shape note for the chip, e.g. "1:1" or "9:16". */
  shape: string;
  /** How many photos the grid holds before it spills onto a second sheet. */
  capacity: number;
  patch: Partial<LayoutConfig>;
}

/** Fields every grid preset forces, whatever the user had set before. */
const GRID_BASE: Partial<LayoutConfig> = {
  showLabels: false,
  labelPosition: 'none',
  labelType: 'none',
  showStatusBadges: false,
  showHeader: false,
  showPageNumbers: false,
  // Grids read as a single picture, so a cell is filled rather than
  // letterboxed: a stray band of background inside one cell is the thing that
  // makes a collage look broken.
  fit: 'cover',
  fillOrder: 'row',
  cellBorderWidth: 0,
  orientation: 'portrait',
  showWatermark: false,
  showExifOverlay: false,
};

export const GRID_PRESETS: GridPreset[] = [
  {
    id: 'square-2x2',
    label: '2 × 2',
    shape: '1:1',
    capacity: 4,
    patch: { ...GRID_BASE, columns: 2, rows: 2, pageSize: 'square', spacing: 10, margin: 10, cellRadius: 10 },
  },
  {
    id: 'square-3x3',
    label: '3 × 3',
    shape: '1:1',
    capacity: 9,
    patch: { ...GRID_BASE, columns: 3, rows: 3, pageSize: 'square', spacing: 8, margin: 8, cellRadius: 8 },
  },
  {
    id: 'square-4x4',
    label: '4 × 4',
    shape: '1:1',
    capacity: 16,
    patch: { ...GRID_BASE, columns: 4, rows: 4, pageSize: 'square', spacing: 6, margin: 6, cellRadius: 6 },
  },
  {
    id: 'row-3x1',
    label: '3 across',
    shape: '16:9',
    capacity: 3,
    // `16-9` follows the orientation control, unlike `square` and `story` which
    // are fixed — portrait here would hand back a 1080×1920 page.
    patch: {
      ...GRID_BASE,
      columns: 3,
      rows: 1,
      pageSize: '16-9',
      orientation: 'landscape',
      spacing: 10,
      margin: 10,
      cellRadius: 8,
    },
  },
  {
    id: 'column-1x3',
    label: '3 down',
    shape: '9:16',
    capacity: 3,
    patch: { ...GRID_BASE, columns: 1, rows: 3, pageSize: 'story', spacing: 10, margin: 10, cellRadius: 8 },
  },
  {
    id: 'story-2x3',
    label: '2 × 3',
    shape: '9:16',
    capacity: 6,
    patch: { ...GRID_BASE, columns: 2, rows: 3, pageSize: 'story', spacing: 8, margin: 8, cellRadius: 8 },
  },
  {
    id: 'post-2x2-portrait',
    label: '2 × 2 tall',
    shape: '4:5',
    capacity: 4,
    // 4:5 is the tallest frame Instagram will show uncropped in feed. There is
    // no named page size for it, so it goes through the custom mm path.
    patch: {
      ...GRID_BASE,
      columns: 2,
      rows: 2,
      pageSize: 'custom',
      customWidthMm: 200,
      customHeightMm: 250,
      spacing: 8,
      margin: 8,
      cellRadius: 8,
    },
  },
  {
    id: 'print-4x6',
    label: '4 × 6 print',
    shape: '2:3',
    capacity: 24,
    patch: {
      ...GRID_BASE,
      columns: 4,
      rows: 6,
      pageSize: 'custom',
      customWidthMm: 100,
      customHeightMm: 150,
      spacing: 4,
      margin: 6,
      cellRadius: 4,
    },
  },
  {
    id: 'print-8x10-2x1',
    label: '2 × 1 on 8×10',
    shape: '8:10',
    capacity: 2,
    patch: { ...GRID_BASE, columns: 1, rows: 2, pageSize: '8x10', orientation: 'portrait', spacing: 10, margin: 10, cellRadius: 0 },
  },
  {
    id: 'print-8x10-2x2',
    label: '2 × 2 on 8×10',
    shape: '8:10',
    capacity: 4,
    patch: { ...GRID_BASE, columns: 2, rows: 2, pageSize: '8x10', orientation: 'portrait', spacing: 10, margin: 10, cellRadius: 0 },
  },
  {
    id: 'print-8x10-2x4',
    label: '2 × 4 on 8×10',
    shape: '8:10',
    capacity: 8,
    patch: { ...GRID_BASE, columns: 2, rows: 4, pageSize: '8x10', orientation: 'portrait', spacing: 10, margin: 10, cellRadius: 0 },
  },
];

/** Background swatches offered in the grid tool. */
export const GRID_BACKGROUNDS: { id: string; label: string; bg: string }[] = [
  { id: 'truffle', label: 'Truffle', bg: '#1a1210' },
  { id: 'cream', label: 'Cream', bg: '#fbf6f0' },
  { id: 'caramel', label: 'Caramel', bg: '#c8a27a' },
  { id: 'ink', label: 'Ink', bg: '#000000' },
  { id: 'paper', label: 'Paper white', bg: '#ffffff' },
];

export function findGridPreset(id: string): GridPreset | undefined {
  return GRID_PRESETS.find((p) => p.id === id);
}
