# Mood Board Maker Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium, Apple-quality Mood Board Maker tool for MakeContactSheet.com with local multi-image import, pan/zoom freeform canvas, snapping guides, direct manipulation (drag, resize, rotate, crop, text), starter templates, zero-upload privacy, and high-fidelity PNG/JPG/PDF export.

**Architecture:** A DOM-based freeform canvas driven by a reactive Nanostores state engine (`src/lib/moodboardStore.ts`) with pointer-event direct manipulation, dynamic snapping guides, floating contextual action bars, and an offscreen canvas rendering engine (`src/lib/export/moodboardExporter.ts`) for pixel-accurate 300 DPI exports.

**Tech Stack:** Astro 5, Tailwind v4, Nanostores, jsPDF, Vanilla TypeScript. Zero React runtime.

**Spec:** `docs/superpowers/specs/2026-08-29-moodboard-design.md`

## Global Constraints
- `0 errors / 0 warnings / 0 hints` on `astro check`.
- 100% Client-side processing. Zero server upload.
- No React runtime shipped to client.
- Maintain existing contact sheet/collage workflows without regressions.
- Flawless light and dark theme support using Tailwind `@theme` workspace tokens.

---

### Task 1: Type Definitions, SEO Metadata, Navigation & Route Shell

**Files:**
- Modify: `src/lib/types.ts`
- Modify: `src/lib/seo/metadata.ts`
- Modify: `src/lib/seo/schemaGenerator.ts`
- Modify: `src/components/common/Header.astro`
- Modify: `src/components/common/Footer.astro`
- Create: `src/pages/mood-board-maker.astro`

**Interfaces:**
- Consumes: `ImageItem`, `WorkspaceMode`, `METADATA_REGISTRY`.
- Produces: `WorkspaceMode` includes `'mood-board'`, metadata registered for `/mood-board-maker`, header/footer navigation links added, and `/mood-board-maker` page shell renders BaseLayout with structured data.

- [ ] **Step 1: Update `WorkspaceMode` and add MoodBoard types in `src/lib/types.ts`**
Add `MoodBoardElement`, `MoodBoardCanvasConfig`, and `'mood-board'` to `WorkspaceMode`.

- [ ] **Step 2: Add SEO Metadata and Schema in `src/lib/seo/metadata.ts` & `src/lib/seo/schemaGenerator.ts`**
Add `/mood-board-maker` route with comprehensive title, description, canonical link, breadcrumbs, and SoftwareApplication schema.

- [ ] **Step 3: Update `src/components/common/Header.astro` and `src/components/common/Footer.astro`**
Add "Mood Board" navigation link to the header tools dropdown and footer navigation grid.

- [ ] **Step 4: Create `src/pages/mood-board-maker.astro`**
Build the page shell importing `BaseLayout`, `Header`, `Footer`, and mounting the mood board studio container.

- [ ] **Step 5: Verify static check**
Run: `npm run check`
Expected: `0 errors / 0 warnings / 0 hints`

- [ ] **Step 6: Commit**
```bash
git add src/lib/types.ts src/lib/seo/metadata.ts src/lib/seo/schemaGenerator.ts src/components/common/Header.astro src/components/common/Footer.astro src/pages/mood-board-maker.astro
git commit -m "feat: setup mood board route, navigation, and seo metadata"
```

---

### Task 2: Mood Board State Store, History (Undo/Redo) & Presets

**Files:**
- Create: `src/lib/moodboardStore.ts`

**Interfaces:**
- Consumes: `ImageItem` from `src/lib/types.ts`.
- Produces: Reactive atoms `$moodboardElements`, `$moodboardConfig`, `$moodboardSelection`, `$moodboardHistory`, and actions (`addElement`, `updateElement`, `removeElements`, `duplicateSelected`, `reorderZIndex`, `undo`, `redo`, `applyTemplate`, `resetBoard`, `exportManifest`, `importManifest`).

- [ ] **Step 1: Write `src/lib/moodboardStore.ts` with full state and actions**
Implement:
- Element interfaces (`image`, `text`, `swatch`, `note`)
- Canvas config (aspectRatio, background color/pattern, grid snapping toggle, zoom, pan)
- Undo/redo immutable state stack with 30-step cap
- Z-index layering controls (bringForward, sendBackward, bringToFront, sendToBack)
- Alignment utilities (alignLeft, alignCenter, alignRight, alignTop, alignMiddle, alignBottom, distributeHorizontally, distributeVertically)
- Template presets (e.g. "Editorial Photoshoot", "Lighting & Concept Board", "Warm Film Mood", "Fashion Lookbook", "Minimalist Clean")

- [ ] **Step 2: Verify typescript compilation**
Run: `npm run check`
Expected: `0 errors / 0 warnings / 0 hints`

- [ ] **Step 3: Commit**
```bash
git add src/lib/moodboardStore.ts
git commit -m "feat: implement mood board reactive state store with undo/redo and presets"
```

---

### Task 3: Interactive Freeform Canvas Engine & Direct Manipulation

**Files:**
- Create: `src/components/workspace/moodboard/BoardCanvas.ts`
- Create: `src/components/workspace/moodboard/BoardElement.ts`
- Create: `src/components/workspace/moodboard/SnappingGuides.ts`

**Interfaces:**
- Consumes: `$moodboardElements`, `$moodboardConfig`, `$moodboardSelection` from `src/lib/moodboardStore.ts`.
- Produces: High-performance DOM canvas engine supporting fluid dragging, multi-point resizing (8 handles), rotation handle, live alignment snapping guides, pan & zoom (wheel / pinch / trackpad), rubberband multi-selection, and keyboard shortcuts (`Cmd+Z`, `Cmd+Shift+Z`, `Delete`, arrow keys for nudging).

- [ ] **Step 1: Create `SnappingGuides.ts`**
Implement geometry calculations for element-to-element and element-to-canvas edge/center alignment snapping with magnetic threshold and overlay guide rendering.

- [ ] **Step 2: Create `BoardElement.ts`**
Implement DOM element wrapper with bounding box, resize corner/edge handles, rotation handle, inline text editing, and image crop/contain styling.

- [ ] **Step 3: Create `BoardCanvas.ts`**
Implement canvas coordinate transformations, zoom/pan viewport controller, pointer event dispatching, drop zone handling from outside and from photo tray, selection management, and undo/redo keyboard listener.

- [ ] **Step 4: Verify typescript check**
Run: `npm run check`
Expected: `0 errors / 0 warnings / 0 hints`

- [ ] **Step 5: Commit**
```bash
git add src/components/workspace/moodboard/SnappingGuides.ts src/components/workspace/moodboard/BoardElement.ts src/components/workspace/moodboard/BoardCanvas.ts
git commit -m "feat: implement mood board direct manipulation canvas engine and snapping"
```

---

### Task 4: Mood Board Workspace UI, Sidebar, Context Toolbar & Templates

**Files:**
- Create: `src/components/workspace/moodboard/MoodBoardApp.astro`
- Create: `src/components/workspace/moodboard/MoodBoardSidebar.ts`
- Create: `src/components/workspace/moodboard/FloatingToolbar.ts`
- Modify: `src/pages/mood-board-maker.astro`

**Interfaces:**
- Consumes: `BoardCanvas`, `moodboardStore`, `imageLoader`, `fileSanitizer`.
- Produces: Complete workspace layout containing top control header (undo, redo, zoom, canvas size, bg color, export button), left sidebar (image tray, templates picker, add text, add color swatch), floating contextual toolbar on selection, and empty dropzone states.

- [ ] **Step 1: Create `FloatingToolbar.ts`**
Build contextual floating bar that follows selected elements with quick actions: duplicate, delete, layer order (front/back), opacity slider, corner radius slider, rotate 90°, and text style toggles.

- [ ] **Step 2: Create `MoodBoardSidebar.ts`**
Build responsive left sidebar with tabs for:
- Photos Tray (with drag-to-board support, multi-image file dropzone)
- Curated Starter Templates (with instant preview and 1-click apply)
- Assets & Elements (add text headings/captions, color swatches, sticky notes)
- Board Settings (custom dimensions, background color palette, grid snap toggle)

- [ ] **Step 3: Create `MoodBoardApp.astro` and wire into `src/pages/mood-board-maker.astro`**
Combine toolbar, sidebar, canvas light-table, and floating context controls into a cohesive Apple-style studio interface with dark/light theme polish.

- [ ] **Step 4: Verify static check and build**
Run: `npm run check`
Expected: `0 errors / 0 warnings / 0 hints`

- [ ] **Step 5: Commit**
```bash
git add src/components/workspace/moodboard/FloatingToolbar.ts src/components/workspace/moodboard/MoodBoardSidebar.ts src/components/workspace/moodboard/MoodBoardApp.astro src/pages/mood-board-maker.astro
git commit -m "feat: build mood board workspace UI, sidebar tray, and floating toolbar"
```

---

### Task 5: High-Fidelity Multi-Format Export Engine & End-to-End QA

**Files:**
- Create: `src/lib/export/moodboardExporter.ts`
- Modify: `src/components/workspace/moodboard/MoodBoardApp.astro`
- Modify: `src/pages/index.astro`
- Modify: `AGENTS.md`

**Interfaces:**
- Consumes: `$moodboardElements`, `$moodboardConfig`.
- Produces: Multi-scale PNG, JPEG, and PDF export (up to 300 DPI print quality) matching exact canvas positions, text styling, and color swatches, plus homepage integration and documentation.

- [ ] **Step 1: Create `src/lib/export/moodboardExporter.ts`**
Implement offscreen Canvas 2D renderer supporting:
- Multi-scale rendering (1x screen, 2x retina, 300 DPI print)
- Exact position, dimensions, rotation, opacity, and corner radius
- High-res image rendering with aspect ratio fit/fill
- Text element rendering with accurate typography, line wrapping, and colors
- Color swatches and geometric shapes
- Direct download as PNG, JPEG, and PDF (via dynamic jsPDF import)
- Progress callback for smooth UX during large board exports

- [ ] **Step 2: Hook Export Modal / Drawer into `MoodBoardApp`**
Add export format selector (PNG / JPEG / PDF), scale/resolution options (1080p, 2K, 4K, 300 DPI Print), and download progress indicator.

- [ ] **Step 3: Add Mood Board feature highlight to Homepage `src/pages/index.astro`**
Add Mood Board Maker card/link to the homepage showcase and features grid.

- [ ] **Step 4: Update `AGENTS.md` and run verification suite**
Run: `npm run check` && `npm run build`
Verify 0 errors, 0 warnings, 0 hints and successful multi-page static build.

- [ ] **Step 5: Commit**
```bash
git add src/lib/export/moodboardExporter.ts src/components/workspace/moodboard/MoodBoardApp.astro src/pages/index.astro AGENTS.md
git commit -m "feat: add high-fidelity mood board exporter and complete end-to-end integration"
```
