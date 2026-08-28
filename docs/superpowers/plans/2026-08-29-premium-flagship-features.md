# Flagship Premium Features Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the 5 premium flagship features identified in the research report to outcompete rivals and provide a premium, 100% client-side experience for MakeContactSheet.com.

**Architecture:** Client-side only. Enhancing `imageLoader.ts` for metadata extraction, `contactSheetEngine.ts` and `canvasRenderer.ts` for EXIF overlays and layout configurations, without breaking the hard `sync()` non-destructive re-render rule.

**Tech Stack:** TypeScript, Astro, HTML5 Canvas, jsPDF, nanostores.

**Spec:** `/Users/divyyadav/teamwork_projects/competitor_research/02_PREMIUM_FEATURE_PROPOSALS.md`

## Global Constraints

- Must be 100% client-side (Zero-Upload Privacy Boundary).
- All internal page layouts computed at a deterministic 150 DPI baseline (`PX_PER_MM = 150 / 25.4`).
- No React. Vanilla TS classes rendered via `innerHTML`.
- State mutations in `src/lib/store.ts` only.
- Strict 0 errors on `npm run check` and `npm run build`.
- Must update `AGENTS.md` after each task completes.

---

## Phase 1: Smart Client-Side Metadata & EXIF Overlay Engine (P0)

### Task 1: EXIF Extraction & Storage Integration

**Files:**
- Modify: `package.json`
- Create: `src/lib/media/metadataExtractor.ts`
- Modify: `src/lib/types.ts`
- Modify: `src/lib/store.ts`
- Modify: `src/lib/media/imageLoader.ts`

**Interfaces:**
- Produces: `extractMetadataWithTwoStageSlicing(file: File): Promise<ImageExifData>`

- [ ] **Step 1: Add dependencies and types**
```bash
npm install exifreader
```
Update `src/lib/types.ts` to export `ImageExifData` interface and add `exif?: ImageExifData` to the `ImageItem` type.

- [ ] **Step 2: Implement metadataExtractor.ts**
Implement `extractMetadataWithTwoStageSlicing` using `exifreader` to parse EXIF securely using `slice` and return `ImageExifData` without loading the full file into memory.

- [ ] **Step 3: Wire into store.ts and imageLoader**
In `src/lib/media/imageLoader.ts` (where `File` objects are converted to `ImageItem`), invoke the extractor. Update `src/lib/store.ts` to accept the `exif` field when images are added to `$images`.

- [ ] **Step 4: Verify via Type Check**
Run: `npm run check`
Expected: 0 errors

- [ ] **Step 5: Commit & Update AGENTS.md**
```bash
git add package.json package-lock.json src/lib/types.ts src/lib/media/metadataExtractor.ts src/lib/store.ts src/lib/media/imageLoader.ts
git commit -m "feat: implement client-side EXIF metadata extraction"
echo "- Implemented client-side EXIF metadata extraction using exifreader (Phase 1, Task 1)." >> AGENTS.md
```

### Task 2: Dynamic Token Resolving & Canvas Overlay Badge

**Files:**
- Modify: `src/lib/types.ts`
- Modify: `src/lib/engine/canvasRenderer.ts`
- Modify: `src/lib/engine/contactSheetEngine.ts`
- Modify: `src/components/workspace/LayoutControls.ts`

**Interfaces:**
- Consumes: `ImageExifData` on `ImageItem`
- Consumes: `LayoutConfig.metadataTokenConfig`

- [ ] **Step 1: Define MetadataTokenConfig**
Update `src/lib/types.ts` to add `MetadataTokenConfig` (with `showExifOverlay`, `tokenTemplate`, `badgeStyle`) and append it to `LayoutConfig`. Update `store.ts` `DEFAULT_LAYOUT_CONFIG` with sane defaults.

- [ ] **Step 2: Add UI Controls to LayoutControls**
Add input fields for the token template string (e.g., `{focal} {aperture}`) and toggle in `src/components/workspace/LayoutControls.ts`. Sync with `$layoutConfig`.

- [ ] **Step 3: Implement Token Resolver**
Create `resolveMetadataTokens(template, image, index)` in `src/lib/engine/canvasRenderer.ts` that interpolates the `{tags}` into actual EXIF string values based on the spec.

- [ ] **Step 4: Engine Space Reservation & Canvas Rendering**
In `src/lib/engine/contactSheetEngine.ts`, reserve `LABEL_BAND_HEIGHT` if `showExifOverlay` is true. In `canvasRenderer.ts`, draw the resolved text as a pill badge clipped to the cell width.

- [ ] **Step 5: Verify via Type Check**
Run: `npm run check`
Expected: 0 errors

- [ ] **Step 6: Commit & Update AGENTS.md**
```bash
git add src/lib/types.ts src/lib/engine/canvasRenderer.ts src/lib/engine/contactSheetEngine.ts src/components/workspace/LayoutControls.ts src/lib/store.ts
git commit -m "feat: add EXIF token resolver and canvas badge rendering"
echo "- Implemented EXIF token resolver and canvas overlay badges (Phase 1, Task 2)." >> AGENTS.md
```

## Phase 2: Serverless Standalone "Client Proofing Portal" Exporter (P0)

### Task 3: HTML Portal Generator Core

**Files:**
- Create: `src/lib/export/htmlPortalExporter.ts`
- Modify: `src/components/workspace/ExportDrawer.ts`

**Interfaces:**
- Produces: `exportClientProofingPortal(images, config, filename)`

- [ ] **Step 1: Implement htmlPortalExporter.ts**
Create an exporter that generates a single, standalone HTML file. It iterates over the current `$images`, base64 encodes lightweight thumbnails (`thumbnailUrl`), and embeds them into a hardcoded HTML/CSS/JS template string that includes a simple gallery view and selection UI.

- [ ] **Step 2: Add Export Option to UI**
Update `src/components/workspace/ExportDrawer.ts` to include a "Client Proofing Portal (HTML)" option. When clicked, invoke `exportClientProofingPortal` and trigger a `.html` file download.

- [ ] **Step 3: Verify via Type Check**
Run: `npm run check`
Expected: 0 errors

- [ ] **Step 4: Commit & Update AGENTS.md**
```bash
git add src/lib/export/htmlPortalExporter.ts src/components/workspace/ExportDrawer.ts
git commit -m "feat: implement single-file HTML client proofing portal exporter"
echo "- Implemented Client Proofing Portal HTML exporter (Phase 2, Task 3)." >> AGENTS.md
```

*(Note: Subsequent phases for the Smart Mosaic, Prepress PDF, and Cryptographic Seals will be planned and executed following the completion of Phases 1 & 2 to ensure stability and manageable PR scope).*
