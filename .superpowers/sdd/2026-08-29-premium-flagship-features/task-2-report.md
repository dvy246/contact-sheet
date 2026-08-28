# Task 2 Report: Dynamic Token Resolving & Canvas Overlay Badge

## 1. Overview
Successfully implemented dynamic metadata token resolving and canvas overlay badge rendering for Make Contact Sheet. Users can now display camera settings, exposure parameters, dates, ratings, and custom tokens directly on photos across contact sheet pages and collages, styled as plain text, dark pills, or subtle badges.

## 2. Changes Made

### A. Type Definitions (`src/lib/types.ts`)
- Added `MetadataBadgeStyle` type: `'plain-text' | 'dark-pill' | 'subtle-badge'`.
- Added configuration properties to `LayoutConfig`:
  - `showExifOverlay?: boolean;`
  - `exifTokenTemplate?: string;`
  - `exifBadgeStyle?: MetadataBadgeStyle;`

### B. Store & Preset Defaults (`src/lib/store.ts`, `src/lib/engine/templates.ts`, `src/lib/engine/gridPresets.ts`)
- Updated `DEFAULT_LAYOUT_CONFIG` and `PRESET_STRUCTURAL_BASE`:
  - `showExifOverlay: false`
  - `exifTokenTemplate: '{basename} · {focal} {fstop} {shutter} ISO {iso}'`
  - `exifBadgeStyle: 'plain-text'`
- Updated `GRID_BASE` in `gridPresets.ts` with `showExifOverlay: false`.

### C. Canvas Rendering Engine (`src/lib/engine/canvasRenderer.ts`)
- Implemented and exported `resolveMetadataTokens(template: string, image: ImageItem, index?: number): string`:
  - Supported tokens: `{name}`, `{filename}`, `{basename}`, `{ext}`, `{index}` (with custom zero-padding like `{index:02}`, `{index:03}`, `{index:04}`), `{camera}` (make + model deduplicated), `{lens}`, `{focal}`, `{fstop}`/`{aperture}`, `{shutter}`/`{exposure}`, `{iso}`, `{date}` (formatted `YYYY-MM-DD`), `{rating}` (star symbols `★★★★★`), and `{customlabel}`/`{custom}`.
  - Added smart cleanup for missing numeric EXIF prefixes (e.g. `ISO`, `f/`) using negative lookahead (`\bISO\b(?!\s*\d)`), consecutive separator deduplication (`·`, `|`, `/`, `-`), and edge trimming.
- Implemented `drawExifBadge` helper:
  - Renders overlay text using the selected badge style:
    - `dark-pill`: translucent dark rounded pill (`rgba(0, 0, 0, 0.75)`) with fine border and crisp white text.
    - `subtle-badge`: subtle glass background (`rgba(24, 24, 27, 0.5)`) with rounded corners.
    - `plain-text`: readable white typography with drop shadow.
  - Scales fonts, padding, and borders by `scale` to maintain 300 DPI export fidelity.
  - Clips text to `cell.width - 12 * scale` to prevent grid bleed on dense sheets.
  - Automatically offsets badge position when overlay filename labels are active to avoid visual collisions.
- Integrated `drawExifBadge` into `renderContactSheetToCanvas` and `renderCollageToCanvas`.

### D. Studio Layout Controls (`src/components/workspace/LayoutControls.ts`)
- Added collapsible `<details class="group">` section titled "Photo metadata & EXIF".
- Added controls:
  - Checkbox toggle for `showExifOverlay`.
  - Text input for `exifTokenTemplate` with 9 quick token helper chips (`{focal}`, `{aperture}`, `{shutter}`, `{iso}`, `{camera}`, `{lens}`, `{date}`, `{basename}`, `{index:03}`).
  - Dropdown selector for `exifBadgeStyle` (`plain-text`, `dark-pill`, `subtle-badge`).
  - Live preview readout badge showing real-time token resolution.
- Maintained non-destructive event handling: `sync()` patches values while preserving focused inputs without re-rendering the container.

### E. Documentation & Guidelines (`AGENTS.md`)
- Updated Section 11 of `AGENTS.md` with a concise summary of Task 2 implementation.

## 3. Verification & Testing

1. **Static Typing & Astro Diagnostics**:
   ```bash
   npm run check
   ```
   **Result**: `0 errors, 0 warnings, 0 hints` across 62 files.

2. **Static Site Build**:
   ```bash
   npm run build
   ```
   **Result**: 15 pages built successfully in static mode.

3. **Token Resolution Edge Cases (Node / TSX)**:
   - Full EXIF: `DSC0042 · 50mm f/1.2 1/2000s ISO 100`
   - Partial EXIF: Camera and Lens without dangling separators.
   - Padded Index: `{index:03}` -> `007`.
   - Missing EXIF: Clean fallback to basename without dangling `ISO` or separators.
   - Numeric conversions: `35` -> `35mm`, `2.8` -> `f/2.8`.
