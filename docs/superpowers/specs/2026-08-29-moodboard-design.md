# Premium Mood Board Maker Design Spec

## 1. Goal
Add a premium, high-quality Mood Board Maker tool to MakeContactSheet.com targeted at photographers and art directors. It provides a tactile, DOM-based freeform canvas with Apple-quality interaction, zero-upload local file handling, and flawless high-resolution export.

## 2. Architecture & Approach
**Approach:** DOM-Based Visual Editor + Hidden Canvas Export Engine.
- **Why:** DOM provides superior interaction fidelity (native CSS transitions, focus rings, accessibility, pointer events) compared to a pure `<canvas>` editor, which is essential for a premium feel. 
- **Export Strategy:** The exact state (x, y, w, h, z-index, rotation) is fed into a pure canvas rendering pipeline to generate print-ready JPG/PDFs, rather than relying on brittle HTML-to-image libraries.

## 3. Data Model (`src/lib/types.ts` & `src/lib/moodboardStore.ts`)
- Add `'mood-board'` to `WorkspaceMode`.
- **`MoodBoardElement`**: 
  - `id`: string
  - `type`: 'image' | 'text' | 'shape'
  - `content`: string (URL for image, text for text node)
  - `x`, `y`, `width`, `height`, `rotation`, `zIndex`: numbers
  - `opacity`: number
  - `imageItemId`: string (links back to `ImageItem` in core store)
- **`MoodBoardState`**:
  - `boardWidth`, `boardHeight` (e.g. 1920x1080)
  - `backgroundColor`: string
  - `elements`: MoodBoardElement[]
  - `selectedIds`: string[]
  - `history`: MoodBoardState[] (for Undo/Redo)

## 4. UI Components (`src/components/workspace/moodboard/`)
- **`MoodBoardShell.astro`**: The full-screen route for the mood board.
- **`BoardCanvas.ts`**: Handles pan/zoom of the infinite workspace and maps pointer events to elements.
- **`BoardElement.ts`**: Renders individual elements with bounding boxes, resize handles, and rotation points.
- **`ContextToolbar.ts`**: A floating glassmorphism toolbar that appears near the active selection for contextual actions (delete, crop, bring forward).
- **`MoodBoardSidebar.ts`**: The left panel containing the asset tray (reusing `ThumbnailGrid`) and layout templates.

## 5. Export Engine (`src/lib/export/moodboardExporter.ts`)
- Iterates over `MoodBoardState.elements`.
- Sorts by `zIndex`.
- Draws images and text to an offscreen canvas at a specified DPI multiplier (1x, 2x, 300dpi).
- Reuses existing `pdfExporter` and `imageExporter` for final generation.

## 6. SEO & Routing
- **Route:** `/mood-board-maker.astro`
- **Metadata:** Targeted at "Photography Mood Board Maker" and "Free Online Mood Board Creator".
- **Internal Linking:** Prominently linked from the homepage hero, `contact-sheet-template`, and `collage-templates`.

## 7. Global Constraints
- Must maintain `0 errors / 0 warnings / 0 hints` on `astro check`.
- 100% Client-side. Zero server upload.
- Reuse `nanostores`, `Tailwind v4`. No React runtime.
