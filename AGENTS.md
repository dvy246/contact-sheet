# AGENTS.md

- Implemented **Large Photo Print Layout Suite & SEO Landing Page (`/large-photo-prints`)**:
  - Registered `/large-photo-prints` in `src/lib/seo/metadata.ts` and `public/sitemap-index.xml` with complete OpenGraph metadata and structured schemas (`SoftwareApplication`, `HowTo`, `FAQPage`, `BreadcrumbList`).
  - Created high-craft landing page `src/pages/large-photo-prints.astro` featuring an integrated live studio launcher, visual dimension & DPI reference cards (11×14, 12×18, 16×20, 24×36 at 150 & 300 DPI), step-by-step gang sheet HowTo guide, entity-dense SEO prose detailing print mathematics and zero-upload privacy, and comprehensive FAQ accordion.
  - Linked new route across `src/components/common/Header.astro` (desktop Tools mega menu & mobile drawer), `src/components/common/Footer.astro` (Workspace Tools), and `src/components/common/SeoRelatedLinks.astro`.
  - Maintained strict `0 errors / 0 warnings / 0 hints` on `astro check` and confirmed successful 24-page static build.

- Executed **Pre-Launch UI/UX Audit & Comprehensive SEO Content Injection**:
  - Performed rigorous code-level visual review against `web-design-reviewer` standards, verifying WCAG AA 4.5:1 contrast compliance for the custom `--color-accent` adaptive palette, proper touch targets, and robust `max-w-[1240px]` responsive fluidity that prevents horizontal overflow on mobile.
  - Confirmed custom domain deployment readiness (Cloudflare Pages), validating canonical domains, sitemaps, and absolute Open Graph URLs.
  - Implemented strong SEO interlinking architecture (Lever 1) by creating `SeoRelatedLinks.astro`, a dynamic sidebar cross-linking the 6 primary tool hubs (AI Culling, 8x10 Print Saver, Contact Sheet, Collage, Mood Board, Batch Tools).
  - Authored and injected highly optimized, entity-dense prose components (`SeoToolProse.astro`) across previously thin utility pages (`/auto-cull-photos`, `/bulk-resize-photos-to-16-9`, `/compress-photos-for-web`) detailing the privacy and technical advantages (e.g. Laplacian variance, WebP conversion, local Web Workers).
  - Maintained zero TypeScript errors and confirmed successful 23-page static build.

- Implemented **Phase 1: 8×10 Print-Saver Suite & P0 Guided Workflow**:
  - Added native `'8x10'` dimensions ($1200 \times 1500$ px at 150 DPI baseline, $2400 \times 3000$ px at 300 DPI 2x export scale) in `src/lib/types.ts` and `src/lib/engine/contactSheetEngine.ts`.
  - Added dedicated 8×10 contact sheet presets (`print-8x10-2up-5x7`, `print-8x10-4up-4x5`, `print-8x10-8up-wallet`, `print-8x10-full`), collage templates (`collage-8x10-2up-5x7`, `collage-8x10-4up-4x5`, `collage-8x10-8up-wallet`), and grid presets in `src/lib/engine/templates.ts` and `src/lib/engine/gridPresets.ts`.
  - Created high-intent SEO landing page `src/pages/free-8x10-photo-prints.astro` targeting the Walgreens/CVS multi-photo print hack with interactive studio launcher, HowTo steps, and FAQ schema.
  - Implemented center-stage first-run guided workflow modal ("1. Drop Photos → 2. Review & Cull → 3. Choose Layout → 4. Export Handoff") with localStorage dismissal persistence in `StudioApp.astro`.
  - Added live Export Integrity Summary Card (Total, Scope-Selected, Keep, Flag, Reject, Unreviewed) and 1-click clipboard summary copying in `src/components/workspace/ExportDrawer.ts`.
  - Maintained strict `0 errors / 0 warnings / 0 hints` on `astro check` and confirmed successful static build.

- Implemented **Phase 2: Professional Handoff, Adobe XMP Sidecars & White-Label Portals**:
  - Created `src/lib/export/zipBuilder.ts` (pure TypeScript zero-dependency PKZip archiver with standard LFH, CDH, EOCD, and CRC32 checksums).
  - Created `src/lib/export/xmpGenerator.ts` producing Adobe-standard XMP sidecar XMLs mapping client Keep/Flag selections to 5-star ratings and green color labels, with 1-click ZIP export in `ExportDrawer.ts`.
  - Created high-intent AEO/GEO tutorial landing page `src/pages/lightroom-client-selection-workflow.astro` with structured step-by-step Lightroom Classic/Capture One sync instructions and HowTo schema.
  - Built custom studio branding & white-label controls in `src/components/workspace/LayoutControls.ts` and `src/lib/export/htmlPortalExporter.ts` (custom Base64 logo upload, primary hex color picker, CSS variable injection, and "Hide Platform Branding" toggle).
  - Created dedicated B2B landing page `src/pages/white-label-client-gallery.astro` featuring comparison charts against cloud subscription paywalls ($25/mo vs free local-first).
  - Maintained strict `0 errors / 0 warnings / 0 hints` on `astro check` and confirmed successful 20-page static build.

- Implemented **Phase 3: Advanced Media Processing & Native RAW Camera Support**:
  - Enhanced `src/lib/media/batchProcessor.ts` to support center-crop aspect ratio conversions (1:1, 4:5, 16:9, 9:16, 3:2) and multi-format compression (JPEG, PNG, WebP) with max dimension bounding.
  - Added Aspect Ratio Crop dropdown and Quick Preset chips (Instagram 1:1, Widescreen 16:9, Web 1080p WebP) to `src/components/marketing/BatchToolsApp.astro` and `BatchToolsApp.ts`.
  - Implemented proprietary RAW camera file support (`.CR2`, `.CR3`, `.NEF`, `.ARW`, `.DNG`, `.ORF`, `.RW2`, `.RAF`, `.PEF`) in `src/lib/media/fileSanitizer.ts` with binary JPEG SOI/EOI chunk scanning fallback in `src/lib/media/imageLoader.ts`.
  - Created dedicated landing pages `src/pages/bulk-resize-photos-to-16-9.astro` and `src/pages/compress-photos-for-web.astro` with structured SEO schemas and FAQs.
  - Maintained strict `0 errors / 0 warnings / 0 hints` on `astro check` and confirmed successful 22-page static build.

- Implemented **Phase 4: Local AI Auto-Culling & Forensic Invisible Watermarking**:
  - Created `src/lib/ai/cullingEngine.ts` calculating modified Laplacian variance sharpness scoring across luminance channels directly on thumbnail bitmaps.
  - Added "✨ Smart Cull" button in `src/components/workspace/ReviewToolbar.ts` with progress reporting, automatic rejection/flagging with numerical score notes, and instant 1-click Undo toast.
  - Created `src/lib/engine/forensicWatermark.ts` embedding session UUID payloads into spatial pixel luminance for proof leak verification, complete with "Verify Leaked Proof" inspector in `src/components/workspace/LayoutControls.ts`.
  - Created dedicated landing page `src/pages/auto-cull-photos.astro` with HowTo and SoftwareApplication schemas.
  - Updated `public/sitemap-index.xml` and `Header.astro` / `Footer.astro` navigation with all new routes.
  - Ran full `seo-aeo-geo-launch-checklist` with **`LAUNCH: PASS`** across all 23 production routes, zero diagnostics on `npm run check`, and successful 23-page static build.

- Implemented **High-Fidelity Multi-Format Mood Board Exporter & Studio Integration (`/mood-board-maker`)**:
  - Created `src/lib/export/moodboardExporter.ts` supporting offscreen multi-scale Canvas 2D rendering (1x 1080p Standard, 2x 2K Retina, 3x 4K Ultra HD, 300 DPI Fine Art Print), element rotations, z-index layering, opacities, drop shadows, aspect ratio image fitting (`cover`/`contain`) with crop viewports and filename badges, designer color swatch cards with specular reflection gradients and hex codes, stylist sticky notes with paper tape accents and multiline typography wrapping, background patterns (`dots`, `grid`), and password-protected PDF export via dynamic `jspdf` import.
  - Built high-craft Export Drawer / Modal dialog in `src/components/workspace/moodboard/MoodBoardApp.astro` featuring format switching (PNG, JPEG, PDF), resolution scale presets (1x, 2x, 3x, 300 DPI), live output dimension calculations, custom filename inputs, optional PDF password protection, and live progress reporting.
  - Integrated Mood Board Maker showcase highlights and quick-start links on the homepage `src/pages/index.astro` and `src/components/marketing/FeatureGrid.astro`.
  - Added dedicated landing page `src/pages/mood-board-maker.astro` with structured SEO schemas, FAQ accordions, and header/footer navigation links.
  - Maintained strict `0 errors / 0 warnings / 0 hints` on `astro check` and confirmed successful 17-page static build.

- Implemented **Dedicated Batch Photo Tools & Operations Hub (`/batch-photo-tools`)**:
  - Created `src/lib/media/batchProcessor.ts` supporting token-based batch renaming (`{name}`, `{index:03}`, `{date}`, `{camera}`, `{focal}`, `{fstop}`, `{iso}`), downloadable shell script generation (Mac/Linux `.sh` and Windows PowerShell `.ps1`), CSV rename manifests, and client-side bounded image format conversion (JPEG, PNG, WebP) with resolution caps (1080p, 2K, 4K, custom px).
  - Built interactive tabbed client workbench `src/components/marketing/BatchToolsApp.astro` & `BatchToolsApp.ts` with live before/after rename table, deep EXIF camera metadata inspector, format converter with progress yielding, and direct 1-click handoff into the full-screen Contact Sheet Studio.
  - Added dedicated landing page `src/pages/batch-photo-tools.astro` with structured SEO schemas, FAQ accordions, and header/footer navigation links.
  - Maintained strict `0 errors / 0 warnings / 0 hints` on `astro check` and confirmed successful 16-page static build.

- Expanded **High-Quality Template & Preset Collection** (18 Collage Templates & 21 Contact Sheet Presets):
  - Added new collage templates: **Vertical Triptych (3-Photo Tall 9:16)**, **Film Strip Quad (4 Photos)**, **Master Hero + 3 Stacked (Golden Quad)**, **Cinematic Header + 3 Insets**, **Editorial Center Hero (5 Photos)**, **Social Portrait 2×3 (6 Photos 4:5)**, **Central Spotlight (5 Photos)**, **Panorama + 4 Thumbnails**, and **Editorial Duo (3:2)**.
  - Added new contact sheet presets: **Studio Technical EXIF Sheet** (with live EXIF metadata pills), **120 Film 6×7 Proof (10-Up)** (medium format analog roll layout), **Detail & Focus QC (8-Up)**, **Lookbook Double Spread (2-Up)**, **Reel & Short Storyboard (8-Up)**, and **Archival Lab Mega Index (70-Up)**.
  - Implemented interactive category filter bars on `/collage-templates` and `/contact-sheet-template` for instant switching between categories (Basic, Showcase, Social, Comparison / Print, Film, Client, Digital).
  - Maintained strict `0 errors / 0 warnings / 0 hints` on `astro check` and successful 15-page static build.

- Implemented **Visual Grid Template Previews on Preset & Collage Cards**:
  - Created `src/components/marketing/CollageTemplatePreview.astro` rendering scaled, responsive geometric canvas mockups for each collage layout with normalized cell positions, index badges (`#1`, `#2`), aperture vectors, and specular reflections.
  - Created `src/components/marketing/ContactSheetPreview.astro` rendering authentic paper proof sheet mockups (A4/Letter portrait & landscape, 16:9, square) with title header bands, dynamic $N \times M$ thumbnail grids, filename label strips, and 300 DPI export footers.
  - Integrated visual previews into `src/pages/collage-templates.astro`, `src/pages/contact-sheet-template.astro`, and the homepage `src/components/marketing/TemplateShowcase.astro`.
  - Maintained strict `0 errors / 0 warnings / 0 hints` on `astro check` and confirmed successful 15-page static build.

- Implemented **120 FPS Zero-Overhead GPU Compositor Scroll-Driven Animations**:
  - Completely removed external JavaScript scroll libraries (`lenis`) and layout-querying rAF listeners to eliminate all main-thread overhead and CPU drag.
  - Implemented modern CSS `@keyframes` scroll-driven animations (`animation-timeline: view()` and `animation-timeline: scroll()`) running 100% on the GPU compositor thread with instant native browser scrolling.
  - Added subtle entry lift and ambient glow drift across hero showcase, bento pillars, and feature cards.
  - Added non-blocking passive top scroll progress indicator bar in `MarketingLayout.astro`.
  - Re-verified static build (15/15 pages) and deployed to Cloudflare Pages (`https://frameproof-4fw.pages.dev`).

- Implemented **Apple Keynote-Style Studio Showcase Demo Section**:
  - Created `src/components/marketing/StudioShowcase.astro` and integrated into `src/pages/index.astro`.
  - Built an interactive, high-craft proofing showcase featuring 3 switchable presentation views: **Technical EXIF & Film Proof** (Hasselblad medium format 120 proof look with live aperture, shutter speed, ISO, and focal length badges), **Archival Gallery Fine Art** (warm cotton museum rag paper aesthetic with 300 DPI vector margins), and **Client Proofing Portal** (interactive culling cards with Keep/Flag/Reject tags, client notes, and selection counters).
  - Designed Apple-style bento technical pillars highlighting sub-pixel print precision, dynamic metadata token engine, and zero-upload privacy enclave.
  - Verified with 0 errors on `astro check`, 0 design lint findings with `impeccable`, and a successful 15-page static build.

- Implemented **Serverless Client Proofing Portal HTML Exporter** (Task 3):
  - Created `src/lib/export/htmlPortalExporter.ts` and implemented `exportClientProofingPortal(images, config, customFilename, onProgress)` generating 100% self-contained single-file HTML proofing galleries with zero server dependencies.
  - Implemented progressive batch conversion of thumbnail/preview blobs into compressed, bounded base64 JPEG data URLs (< 480px, ~0.82 quality) for offline viewing and ultra-compact file bundles (~2-5MB for 100 photos).
  - Built interactive, responsive dark/light client proofing gallery with full-screen Lightbox zoom, keyboard culling shortcuts (`1`/`K` Keep, `2`/`F` Flag, `3`/`R` Reject, `0`/`U` Clear, `←`/`→` navigation), 5-star ratings, per-photo notes, and search/filtering.
  - Integrated 2-way sync feedback modal supporting 1-click download of `.makecontactsheet.json` review manifests (directly importable back into Make Contact Sheet via `relinkProjectManifest`) and multi-format filename export (comma, newline, space).
  - Added HTML Portal option to `src/components/workspace/ExportDrawer.ts` with asynchronous dynamic chunk loading and progress tracking.
  - Maintained strict 0 errors, 0 warnings, 0 hints on `astro check` and 15-page static build.

- Implemented **Dynamic Token Resolving & Canvas Overlay Badge** (Task 2):
  - Added `MetadataBadgeStyle` (`'plain-text' | 'dark-pill' | 'subtle-badge'`) and `LayoutConfig` fields (`showExifOverlay`, `exifTokenTemplate`, `exifBadgeStyle`) in `src/lib/types.ts`, `src/lib/store.ts`, `src/lib/engine/templates.ts`, and `src/lib/engine/gridPresets.ts`.
  - Implemented `resolveMetadataTokens` and `drawExifBadge` in `src/lib/engine/canvasRenderer.ts` supporting `{name}`, `{filename}`, `{basename}`, `{ext}`, `{index}` (with optional zero-padding like `{index:03}`), `{camera}`, `{lens}`, `{focal}`, `{fstop}`/`{aperture}`, `{shutter}`/`{exposure}`, `{iso}`, `{date}`, `{rating}`, and `{customlabel}`/`{custom}`, with smart separator cleanup and negative lookahead for missing numeric EXIF prefixes.
  - Implemented canvas badge rendering scaled by `scale` with text truncation/clipping to cell bounds and collision avoidance against overlay labels.
  - Added collapsible "Photo metadata & EXIF" control section in `src/components/workspace/LayoutControls.ts` with live preview readouts, 1-click token insertion chips, badge style selection, and non-destructive event synchronization.
  - Maintained strict 0 errors, 0 warnings, 0 hints on `astro check` and 15-page static build.

- Implemented **Client-Side EXIF Metadata Extraction & Store Integration** (Task 1):
  - Created `src/lib/media/metadataExtractor.ts` with `extractMetadataWithTwoStageSlicing` using `ExifReader` with 128KB initial slice and 512KB fallback to keep memory footprint strictly bounded and zero-upload.
  - Added `ImageExifData` interface to `src/lib/types.ts` capturing `dateTimeOriginal`, `captureDate`, `cameraMake`, `cameraModel`, `lensModel`, `focalLength`, `fNumber`, `exposureTime`, `iso`, `exposureBias`, `rating`, and `copyright`.
  - Updated `ImageItem` and `ProjectManifestItem` in `src/lib/types.ts` and `src/lib/export/projectManifest.ts` to store, serialize, and restore EXIF metadata.
  - Wired metadata extraction into `decodeSingleImage` / `loadImageFile` in `src/lib/media/imageLoader.ts` and improved `sortImages` in `src/lib/store.ts` to prioritize EXIF capture dates with graceful filesystem fallback.
  - Maintained strict 0 errors, 0 warnings, 0 hints on `astro check` and 15-page static build.

- Implemented **Integrated Batch Rename & Label Recipe Builder** (Task 3):
  - Added collapsible Batch Rename recipe builder to `src/components/workspace/ThumbnailGrid.ts` supporting custom prefixes, start index, configurable zero-padding (e.g. 001, 0001), optional suffixes, and live formatted badge preview.
  - Added "Apply Recipe" (with dynamic target photo counts) and 1-click "Reset All" labels action directly in the photo tray.
  - Added `batchSetCustomLabels` and `batchClearCustomLabels` helpers to `src/lib/store.ts` for atomic state mutations.
  - Preserved non-destructive event synchronization adhering to strict focus-retention guidelines.
  - Maintained strict 0 errors, 0 warnings, 0 hints on `astro check`.

- Implemented **Export Drawer Password Protection UI** (Task 2):
  - Added PDF password input field to `src/components/workspace/ExportDrawer.ts` dynamically displayed when PDF format is active.
  - Linked password state to both contact sheet and collage layout PDF exporters without causing UI layout thrashing.
  - Maintained strict 0 errors, 0 warnings, 0 hints on `astro check`.
- Implemented **Client-Side PDF Password Protection & Exporter Options** (Task 1):
  - Updated `src/lib/export/pdfExporter.ts` to export `PDFExportOptions { password?: string; }`.
  - Added optional `options?: PDFExportOptions` to `exportContactSheetPagesToPDF` and `exportCollageLayoutToPDF`.
  - Integrated dynamic `jsPDF` encryption engine (`userPassword`, `ownerPassword`, `userPermissions: ['print', 'modify', 'copy', 'annot-forms']`) providing 100% local, zero-upload PDF password protection.
  - Exported alias `exportContactSheetToPDF` for clean ergonomics.
  - Maintained 0 errors, 0 warnings, 0 hints on `astro check`.

- Implemented **3-Pane Studio Ergonomics, Custom Logo Watermarks, Designer Palettes & Custom Labels**:
  - **Ergonomic 3-Pane Workspace Shell**: Separated the studio into **Sheet Configuration & Presets on the LEFT**, **Interactive Canvas Light-Table in the CENTER** (with floating zoom, pagination, and toggle controls), and **Photos Tray & Tools on the RIGHT** (`src/components/workspace/StudioApp.astro`), resolving UI clutter.
  - **Fluid Drag-and-Drop Photo Arrangement**: Added visual grip drag handles (`⋮⋮`), active dragging states, drop insertion indicators, and seamless reordering via `reorderImages` in `src/components/workspace/ThumbnailGrid.ts`.
  - **Per-Photo Custom Labels**: Added `customLabel` support in `src/lib/types.ts`, `store.ts` (`setImageCustomLabel`), `contactSheetEngine.ts`, `projectManifest.ts` (`.makecontactsheet.json` export/restore), and inline interactive editing in `src/components/workspace/ThumbnailGrid.ts` with quick revert to original filename.
  - **Custom Logo / Stamp Watermark Upload**: Added support for uploading custom watermark logos (PNG transparent, JPG, SVG, WebP), positioning (`bottom-right`, `bottom-left`, `top-right`, `top-left`, `center`, `tiled`), scale slider (10%–80%), and opacity controls in `src/lib/types.ts`, `store.ts`, `templates.ts`, `canvasRenderer.ts`, and `src/components/workspace/LayoutControls.ts`.
  - **Expanded Designer Color Palette**: Implemented 20 curated designer color swatches across 4 aesthetic collections (**Studio Darks**, **Gallery & Paper**, **Earth & Editorial**, **Pastels & Vibrant**) plus native color pickers with real-time hex readouts in `src/components/workspace/LayoutControls.ts`.
  - Maintained strict 0 errors, 0 warnings, 0 hints on `astro check` and successful 15-page static build.
- Completed **SEO/AEO/GEO Launch Audit & Cloudflare Deployment**:
  - Ran sequential pre-launch audit via `/seo-aeo-geo-launch-checklist` with **`LAUNCH: PASS`** across all 15 static routes (0 errors on sitemaps, canonicals, schema JSON-LD, E-E-A-T, robots.txt, and Search Essentials compliance).
  - Updated header brand markup to consistently display **Make Contact Sheet** matching footer and metadata.
  - Successfully built and deployed static distribution to Cloudflare Pages (`frameproof` project / `https://frameproof-4fw.pages.dev`).
- Implemented **Optional Protective Watermarking** (Flagship Feature):
  - Added optional, customizable watermarking support with `showWatermark`, `watermarkText`, `watermarkStyle` (`'diagonal'` | `'tiled'` | `'center'`), `watermarkOpacity`, and `watermarkColor` in `src/lib/types.ts`, `store.ts`, and `templates.ts`.
  - Implemented `drawWatermark` in `src/lib/engine/canvasRenderer.ts` supporting single diagonal angled stamps, repeating multi-line tiled grids (optimized for resistance against AI inpainting/extraction), and centered stamps, clipped strictly to photo bounds and rounded corners.
  - Integrated watermark rendering across both contact sheet (`renderContactSheetToCanvas`) and collage layouts (`renderCollageToCanvas`), scaling typography accurately with `scale` for crisp 300 DPI exports (PDF, PNG, JPEG).
  - Added dedicated "Watermark & proof protection" sidebar UI controls in `src/components/workspace/LayoutControls.ts` with live preview syncing, opacity slider, style selector, and color customization.
  - Integrated watermark config into project manifests (`.makecontactsheet.json`), ensuring seamless export and restoration.
  - Confirmed 0 errors, 0 warnings, 0 hints on `astro check` and successful 15-page static build.
- Implemented **Memory and Format Compatibility** (Task 4):
  - Added full HEIC/HEIF MIME type support (`image/heic`, `image/heif`, `image/heic-sequence`, `image/heif-sequence`) and extension allowlisting with `isHeicFile` helper in `src/lib/media/fileSanitizer.ts`.
  - Implemented robust EXIF orientation correction via `createImageBitmap(file, { imageOrientation: 'from-image' })` with graceful fallback across `src/lib/media/imageLoader.ts` and `src/lib/media/imageEditor.ts`.
  - Built bounded thumbnail generation (max 480px) in `src/lib/media/imageLoader.ts` using `OffscreenCanvas` / canvas, immediately invoking `bitmap.close()` to release full-resolution uncompressed pixel memory.
  - Implemented progressive batched decoding (batch size 4 with async yielding) to prevent browser tab OOM crashes and UI freeze during 50–100+ high-res image drops.
  - Enhanced `src/components/workspace/ThumbnailGrid.ts`, `PhotoTray.ts`, and `CanvasPreview.ts` to render lightweight `thumbnailUrl` blobs instead of full-res images.
  - Added bounded LRU cache (capped at 120 elements) and `clearImageElementCache` in `src/lib/engine/canvasRenderer.ts`, synchronized with `src/lib/store.ts` URL revocation lifecycle.
  - Implemented graceful HEIC error handling with actionable browser compatibility warnings without stalling or failing the entire import batch.
- Implemented **Portable Review Workflow** (Task 3):
  - Updated `src/lib/export/projectManifest.ts` with `buildProjectManifest`, `exportProjectManifest`, `parseProjectManifest`, `relinkProjectManifest`, `applyManifestToImageItems`, and `restoreProjectSession` capturing full review states (`status`, `rating`, `notes`, `tags`, original filenames, byte sizes, dimensions, timestamps, layout config, filter status, sort key).
  - Built multi-tier matching in `relinkProjectManifest` matching user-imported files to manifest items by exact filename & size (1.0), name match (0.85), or size match (0.50), providing match rate and unmatched item diagnostics.
  - Added project session relinking and "Reopen Project" action in `src/components/workspace/DropZone.ts` and `ImportPanel.astro`, supporting instant restore when dropping manifests and source photos together or sequentially via `$pendingManifest`.
  - Enhanced `src/lib/export/filenameExporter.ts` to export exact source filenames for CSV, TSV, and TXT with comprehensive scope filtering (All, Kept Only, Flagged, Rejected, Unreviewed, Exclude Rejected).
  - Updated `src/components/workspace/ExportDrawer.ts` with complete scope selection, live photo counts, and manifest session export.
- Rebranded the project from **FrameProof** to **Make Contact Sheet** across all pages, UI copy, metadata, schemas, and documentation.
- Removed false "Web Worker" claims from FAQ schema, JSON-LD, and marketing copy (`src/pages/index.astro`, `src/pages/photo-contact-sheet-maker.astro`, `FeatureGrid.astro`, `about-us.astro`).
- Created high-resolution 1200x630 `public/og-image.png` OpenGraph preview card.
- Verified canonical domains across `src/lib/seo/metadata.ts` point to `https://makecontactsheet.com`.
- Updated export artifact filenames to use the `makecontactsheet` prefix (e.g., `makecontactsheet-contact-sheet.pdf`, `makecontactsheet-session.makecontactsheet.json`, `makecontactsheet-selected-filenames.csv`, `makecontactsheet-filenames.txt`).
- Modified the project manifest `generator` field to be a free‑form string and renamed exported manifest files to `.makecontactsheet.json`.
- Fixed collage PDF export to correctly use the collage renderer (`exportCollageLayoutToPDF`) and verified empty cell handling without fallback/substitution bugs.
- Converted `jsPDF` and `pdfExporter` to asynchronous dynamic imports in `ExportDrawer.ts` and `pdfExporter.ts`, removing `jsPDF` (~360kB+ raw / ~118kB gz) from the initial bundle.
- Updated SEO metadata (`src/lib/seo/metadata.ts`) and related docs (`design.md`, `seo.md`) to reflect the new brand name and site URL.
- Adjusted UI labels in the Export Drawer for the new manifest filename.
- Ran `npm run check` and `npm run build`; all TypeScript checks pass and the site builds successfully with 15 pages.
- Verified all public-facing branding strings reflect **Make Contact Sheet**.


Working notes for AI agents (and new humans) on **FrameProof** — a browser-only
photo contact-sheet and collage workspace, monetised by ads, so organic search is
the only acquisition channel that matters.

Read this before touching anything. Most of it is hard-won: the "why" lines exist
because the obvious alternative was tried and broke something.

---

## 1. What this project is

A static Astro 5 site. Two halves that share one codebase:

| Half | Routes | Purpose |
|---|---|---|
| Marketing / content | `/`, `/photo-contact-sheet-maker`, `/photo-collage-maker`, `/contact-sheet-template`, `/collage-templates`, `/guides/*`, `/compare/*`, legal pages | Rank in search, carry ads, explain the tool |
| The tool | `/studio/contact-sheet` (full screen) and the `<WorkspaceApp />` island embedded in marketing pages | Do the actual work: import → arrange → review → export |

Product boundary, from the user's own roadmap: **one connected workflow** —
import photos → prepare them → arrange them → build a contact sheet or collage →
review/select → export the result or the filenames. Not a general image editor,
not a converter directory, not an AI image generator. Features that do not serve
that sentence are out of scope even if they are easy.

Everything runs client-side. There is no backend, no account, no upload. Any
change that sends a user's photo, thumbnail, filename or metadata to a server
breaks the core promise the site makes on every page — do not add one without the
owner explicitly asking for it.

---

## 2. Commands

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run check
```

- `npm run check` is `astro check`. **Treat non-zero output as a failure.** The
  bar for this repo is `0 errors / 0 warnings / 0 hints`; it has been held there,
  so any diagnostic you see is one you introduced.
- `npm run build` must succeed and emit **15 pages** (as of this writing). A page
  count drop means a route stopped compiling.
- There is no test suite and no linter config. Verification is `check` + `build` +
  actually driving the UI in a browser (see §7).
- Dev server for the preview tooling is declared in `.claude/launch.json`
  (`frameproof-dev`). Use the preview tools, not a raw `astro dev` in a shell.

---

## 3. Layout of the code

```
src/
  pages/            One file per route. Metadata comes from METADATA_REGISTRY.
  layouts/
    BaseLayout.astro       <head>, theme anti-FOUC script, OG/Twitter, JSON-LD
    MarketingLayout.astro  Header + main + Footer
    WorkspaceLayout.astro  Header + full-height app shell; `contentBelow` mode
                           adds indexable copy under the app and a footer
  components/
    common/         Header, Footer, Icon, Breadcrumbs, FaqAccordion, GradientBackground
    marketing/      Hero, feature grid, comparison table, workflow steps, showcase
    workspace/      The app. `.astro` files are mount points; `.ts` files are
                    vanilla classes that render into them via innerHTML.
  lib/
    store.ts        nanostores atoms + all mutations. Single source of truth.
    types.ts        LayoutConfig, ImageItem, PageLayoutResult, etc.
    engine/         Pure geometry (contactSheetEngine, collageEngine, templates)
                    + canvasRenderer (draws a computed layout onto a canvas)
    export/         pdfExporter, imageExporter, filenameExporter, projectManifest
    media/          fileSanitizer (allowlist + name sanitising), imageLoader
    seo/            metadata.ts (per-route title/description/canonical/robots),
                    schemaGenerator.ts (JSON-LD builders)
  styles/
    global.css      Tailwind v4 @theme tokens, marketing palette, light/dark
    workspace.css   App shell, canvas stage, dropzone, studio responsive rules
public/             robots.txt, sitemap-index.xml, favicon.svg
```

No React runtime ships. `react`/`react-dom`/`@astrojs/react` are in
`package.json` but the integration is **not** registered in `astro.config.mjs`,
and nothing imports React. Keep it that way: the workspace lives on `/`, the
highest-traffic page, and shipping a renderer to animate a border is not a trade
this project makes. If you are handed a React component to "add", port it to
Astro + CSS (this has already been done twice — see the comments in
`workspace.css` around `.studio-dropzone`).

---

## 4. State: nanostores, and one hard rule

`src/lib/store.ts` owns everything: `$images`, `$selectedImageId`,
`$workspaceMode`, `$layoutConfig`, `$filterStatus`, `$activeTemplateId`,
`$activePage`, `$sortKey`, plus `$filteredImages` and `$reviewCounts` as
computed. Mutations go through the exported functions (`addImages`,
`removeImage`, `reorderImages`, `sortImages`, `setImageStatus`,
`batchSetStatus`, `updateLayoutConfig`, `setWorkspaceMode`, `setFilterStatus`,
`setActiveTemplate`, `resetWorkspace`). Components subscribe; they never hold
their own copy of the truth.

**The hard rule: never re-render a container from inside an event that container
is currently handling.** `LayoutControls` used to rebuild its whole `innerHTML`
on every `input` event, which destroyed the slider element mid-drag — sliders
were unusable. The fix is the pattern now in place: **build the markup once, then
`sync()` patches values**, and `sync()` skips any control that currently has
focus (writing `el.value` during a drag also kills the drag). Same reasoning
drives the use of `<details>` for anything whose open/closed state must survive a
re-render (export drawer, sidebar sections).

---

## 5. The rendering pipeline

```
File[] → fileSanitizer (allowlist + sanitizeFilename) → imageLoader → ImageItem[]
       → $images
       → contactSheetEngine.calculateContactSheetPages(images, config, scale)
         (or collageEngine.calculateCollageLayout)
       → PageLayoutResult (pure numbers, no DOM)
       → canvasRenderer.renderContactSheetToCanvas(canvas, page, config, …)
       → CanvasPreview (screen) or imageExporter / pdfExporter (file)
```

Invariants worth not breaking:

- **Every page size is laid out at 150 dpi.** `PX_PER_MM = 150 / 25.4` in
  `contactSheetEngine.ts` is the *only* mm↔px conversion. Exports render at
  `scale = 2`, which is why a paper size comes out at 300 dpi.
- **`baseScale` multiplies everything measured in unscaled px** — band heights,
  keylines, label type, badges. If you add a new drawn element, multiply it by
  `scale` or it will be hairline-thin on export.
- **The engine reserves space before the renderer draws.** A `below` label only
  gets a strip (`LABEL_BAND_HEIGHT`) because the engine subtracted it from the
  photo area first. `labelY` is `undefined` when no strip was reserved, and
  `CanvasPreview` hit-testing depends on that — setting it unconditionally made
  the clickable area overhang the photo.
- **`labelX`/`labelWidth` are the grid cell, not the photo rect.** Under
  `contain` a photo is letterboxed inside its cell, so aligning a label to the
  photo made a row of labels jump around.
- **PDF page format is derived from the laid-out pixels**, not from the
  `pageSize` name (`first.canvasWidth / baseScale / PX_PER_MM`). jsPDF also
  reorders an explicit `[w, h]` to match the `orientation` it is given, so the
  two arguments must agree or the page comes out transposed.
- **`ctx.roundRect` needs the `arcTo` fallback** in `traceRoundedRect` — older
  Safari lacks it and would throw mid-render, blanking the sheet.

### The canvas fit/zoom chain

This is the part most likely to be "fixed" into breakage:

- `.canvas-stage` is `width/height: max-content` + `min-width/height: 100%` +
  24px padding. That centres the sheet at or below fit, and grows past fit so the
  scroll container can reach every edge. Centring on the scroll container itself
  clips the top-left of an oversized child with no way to scroll back.
- `STAGE_PADDING` in `CanvasPreview.ts` mirrors that 24px. Change one, change both.
- The sheet is sized in **explicit CSS px** (`fitScale × zoomLevel`), never
  `transform: scale()` — the raster follows the zoom so a zoomed thumbnail is
  actually sharper, under an 8,000,000-pixel budget with dpr capped at 2.
- The shell height must be **definite**. `h-dvh` works; `min-h-screen` does not —
  with an indefinite height every nested flex column falls back to content size
  and the app grows into a multi-thousand-pixel page. In `contentBelow` mode the
  definite height comes from `.studio-viewport { height: calc(100dvh - 65px) }`,
  where 65px is the header's `h-16` plus its 1px border.

---

## 6. SEO rules (this is how the project makes money)

- Every route's title/description/canonical/robots lives in
  `src/lib/seo/metadata.ts`. Add the entry when you add the page, and add the
  URL to `public/sitemap-index.xml` if it is indexable.
- **One page per phrase.** `/photo-contact-sheet-maker` owns "photo contact sheet
  maker"; `/studio/contact-sheet` targets the *editor / full screen* wording.
  Do not point two indexable pages at the same query.
- JSON-LD comes from `schemaGenerator.ts` and is passed as `schema` to the
  layout. **Anything in FAQPage or HowTo markup must be true and visible on the
  page.** There is already one live violation to be careful not to copy: the
  homepage and `/photo-contact-sheet-maker` FAQs claim "Web Worker incremental
  decoding", and no worker is ever instantiated (`decoder.worker.ts` is dead
  code). Do not repeat that claim in new copy.
- Do not promise rankings, traffic or revenue in docs or copy, and never invent
  keyword volumes, competitor features or pricing. Where evidence is missing, say
  "I could not verify this" — `research/` and `seo.md` mark their own numbers as
  hypotheses, and that labelling must survive any edit.
- `og-image.png` is referenced sitewide from `BaseLayout.astro` and currently
  **404s**. `ads.txt` is also missing, which AdSense requires. Both are known.

---

## 7. How to verify UI work here

`astro check` and `build` prove nothing about layout. Drive the running app:

1. Start `frameproof-dev` via the preview tools.
2. **Seed photos through real UI events.** Build `File` objects from a canvas,
   put them on the file input with a `DataTransfer`, and dispatch
   `new Event('change', { bubbles: true })`. Do **not** `import('/src/lib/store.ts')`
   in the page and call `addImages` — a dynamic import gets a *different module
   instance* than the page's bundled script, so your mutation never reaches the
   UI and everything looks broken.
3. **`document.hidden === true` in the preview pane**, so `requestAnimationFrame`
   and `ResizeObserver` callbacks never fire. Anything that refits on resize will
   look broken. Force the refit with `document.getElementById('btn-zoom-reset').click()`
   after each resize — it has a direct click handler.
4. Screenshots render at roughly 157px wide and are useless for measurement. Use
   `preview_eval` with `getBoundingClientRect()` / `getComputedStyle()`, and
   verify canvas output by **sampling pixels** (off-centre — synthetic test
   images have a big white numeral in the middle).
5. Theme: toggling `.dark` runs a CSS transition, so read computed colours
   **after a ~500ms delay** or you will capture the pre-toggle value. Emulating
   `colorScheme: dark` does not flip the class on its own — the inline
   anti-FOUC script reads `localStorage`/`prefers-color-scheme` at load, so click
   `#theme-toggle-btn` or reload.
6. Check 375 / 768 / 1440 and both themes for anything touching layout. The
   studio splits into two columns at `md` (768); below that it stacks with a
   34vh control column.

---

## 8. Conventions

- **Comments explain why, never what.** Match the surrounding density — this
  codebase comments the non-obvious decision and the trap it avoids, and says
  nothing about the obvious line above it.
- Tailwind utilities in markup; `global.css`/`workspace.css` only for things
  utilities cannot express (the canvas stage, the dropzone treatment, media
  queries with real reasoning behind them).
- Colour comes from tokens: `marketing-*` for reading surfaces, `workspace-*` for
  the app, `accent`/`accent-ink` for emphasis. The palette is the chocolate
  truffle set (dark brown / caramel / cream) applied 60-30-10. No raw hex in
  markup; sheet defaults (`bg`, `textColor`, `cellBorderColor`) live in
  `DEFAULT_LAYOUT_CONFIG`.
- Ids in `WorkspaceApp` and `StudioApp` are **deliberately identical** —
  `CanvasPreview` resolves zoom and pagination controls via
  `document.getElementById`. Exactly one shell may exist per page.
- Animate transform/opacity/box-shadow only. Nothing that triggers layout.
- Adding a `LayoutConfig` field means touching all of: `types.ts`, the default in
  `store.ts`, `PRESET_STRUCTURAL_BASE` in `engine/templates.ts` if it is
  structural, the engine if it changes geometry, `canvasRenderer.ts` if it
  changes drawing, and `LayoutControls.ts` (control markup + `NUMERIC_KEYS` +
  `syncReadouts`). Miss one and the field silently does nothing.

---

## 9. Known open defects

Do not "discover" these again; do not let them decay further. Fix on request.

| Defect | Location |
|---|---|
| Window-level drop handler registered per `DropZone` instance; the homepage builds two, so a body drop imports twice | `src/components/workspace/DropZone.ts` |
| [Resolved in Task 4] Decoding generates bounded thumbnails (max 480px) and releases full-res ImageBitmap memory immediately to prevent tab OOM | `src/lib/media/imageLoader.ts` |
| Missing `ads.txt` | `public/` |
| Export drawer copy promises PDF "metadata headers" unconditionally, but the title band only draws when `showHeader` is on | `src/components/workspace/ExportDrawer.ts` |
| `portfolio-wall` template is described as 5 photos but defines 4 cells | `src/lib/engine/templates.ts` |
| No virtualization in `ThumbnailGrid`; whole-list `innerHTML` rebuilds on the highest-traffic page | `src/components/workspace/ThumbnailGrid.ts` |
| `CanvasPreview`'s `ResizeObserver` is constructed without being stored in a field, so nothing holds a strong reference | `src/components/workspace/CanvasPreview.ts` |

---

## 10. Working agreements

- Explicitly out of scope, permanently: background remover, image→SVG, pixel-art
  tools, audio/silence tools, general PDF utilities, calculators, unrelated
  converters, a stock library, an illustration editor, advanced drawing, a
  full graphic-design editor, AI image generation, a generic all-tools directory.
- "Local-only" claims must stay literally true. Remote client review, if it is
  ever built, cannot be described as fully local — previews and selection state
  would have to reach the client somehow.
- Report what actually happened. If a check failed, quote it. If something was
  verified by derivation rather than by inspecting a real output file, say which.
- Do not commit or push unless asked.
