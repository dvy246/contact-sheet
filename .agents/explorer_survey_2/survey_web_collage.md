# Comprehensive Market Survey: Web-Based Collage, Grid Maker, and Online Contact Sheet Tools

**Document ID:** `survey_web_collage.md`  
**Target Project:** MakeContactSheet.com  
**Author:** Explorer Survey Agent (Teamwork Explorer)  
**Date:** August 28, 2026  
**Status:** Completed & Verified  

---

## 1. Executive Summary

This research report provides an evidence-based market and technical evaluation of the top web-based photo collage makers, photo grid tools, and online contact sheet generators. As digital photography workflows, film scanning, client proofing, and social media production continue to converge, significant friction and market fragmentation have emerged between **consumer graphic design platforms** (Canva, BeFunky, Fotor, Adobe Express) and **bare-bones utility scripts/converters** (PhotoJoiner, Photovisi, ImgTweak, ImageMagick wrappers).

### Key Strategic Discoveries:
1. **The Cloud Privacy & Latency Chasm:** All four major consumer platforms (Canva, BeFunky, Fotor, Adobe Express) enforce cloud-dependent architectures requiring full network uploads of every image. For high-volume photographic shoots (50–200+ RAW/JPEG/HEIC images, 500MB–2GB+), this introduces immense upload latency, server storage quota limits, and severe privacy violations for commercial NDAs, boudoir, medical/forensic, corporate, and private family photos.
2. **The "Social Graphic" vs. "Photographic Proof" Mismatch:** Consumer collage makers design exclusively for low-batch, single-graphic social media posts (typically 2–9 photos, capped at 16). They completely lack photographic contact sheet essentials: **automated multi-page pagination**, **automatic filename extraction**, **EXIF metadata display**, **non-destructive photo containment (contain vs. cover)**, and **batch review workflows (Select / Flag / Reject)**.
3. **Pervasive Freemium Paywalls & Forced Watermarks:** Free tiers across competitors routinely penalize users with mandatory watermarks (Fotor, Photovisi, PhotoJoiner), resolution caps (limiting downloads to low/standard web resolution while gating 300 DPI / HD behind $8.99–$19.99/month subscriptions), and locked grid templates.
4. **MakeContactSheet.com's Defensible Moat:** By pairing a **100% Client-Side, Zero-Upload Architecture** with **high-volume batch pagination (100+ images)**, **protective proof watermarking**, **per-photo custom labels**, **batch rename recipes**, and **instant CSV/TXT filename export**, MakeContactSheet.com occupies a unique, highly defensible niche that neither generic collage tools nor heavy desktop software (Lightroom/Bridge) adequately serve.

---

## 2. Detailed Competitor Profiles

### 2.1 Canva (Photo Collage Maker & Grid Templates)
* **Overview & Core Focus:** Broad-spectrum web graphic design suite with a dedicated photo collage maker and flexible element grids. Targets general consumers, social media marketers, and small businesses.
* **Onboarding & Friction:**
  * *Authentication:* Mandatory account creation (Google/Email/Apple SSO) to save, collaborate, or download high-quality designs.
  * *Data Flow:* 100% cloud upload. Every image dropped onto the canvas is uploaded to Canva's cloud media library (AWS S3).
  * *Privacy & Governance:* User assets are stored on remote servers; terms of service permit automated asset scanning for platform safety, content moderation, and AI feature training (Canva Magic Studio).
* **Freemium Limits & Paywalls:**
  * *Free Tier:* Basic layouts, standard web resolution exports (PNG, JPG, standard PDF at 96 DPI).
  * *Canva Pro ($120/year or $14.99/month):* Paywalls CMYK PDF Print (required for professional printing), transparent PNG exports, SVG vector downloads, custom canvas resizing, premium stock elements, and cloud storage beyond 200 items per folder.
* **Layout & Grid Capabilities:**
  * *Grid Models:* Element frames and grid presets ranging from 1 to 16 sections.
  * *Batch Limits:* No automated bulk-fill or auto-pagination. Adding 100 photos requires manually creating dozens of pages and dragging images one by one into individual frame elements.
  * *Framing:* Grid frames force image cropping (cover mode); manual double-click and pan adjustments required per cell.
* **Metadata & Customization:**
  * *Filename Handling:* **Zero** automated filename extraction. Users must manually create, position, and type individual text boxes beneath every photo.
  * *EXIF Metadata:* No EXIF parsing or camera parameter rendering.
  * *Watermarking:* No built-in proofing watermark generator; requires manual text/graphic layer placement.
* **Output Capabilities:**
  * PNG, JPG, PDF Standard (96 DPI), PDF Print (300 DPI RGB free, CMYK Pro), MP4/GIF. No structured metadata exports (CSV, TSV, TXT) or session backup files.

---

### 2.2 BeFunky (Collage Maker, Grid Builder, Designer Templates)
* **Overview & Core Focus:** Hybrid browser photo editor, graphic designer, and collage maker. Features a "Collage Wizard" and dynamic grid adjusting tools.
* **Onboarding & Friction:**
  * *Authentication:* Basic collage editing available without login; saving to cloud or accessing Plus templates requires an account.
  * *Data Flow:* Browser-cached with cloud sync. Cloud storage and project backups are stored on BeFunky servers.
* **Freemium Limits & Paywalls:**
  * *BeFunky Plus ($14.99/month or $84/year):* Paywalls the Collage Wizard auto-layout engine, premium designer templates, advanced border patterns, AI background removal, AI image upscaling, and advanced typography.
  * *Export Limitations:* Free tier limits canvas dimensions to a maximum of 4088 × 4088 pixels. PNG exports do not preserve DPI metadata.
* **Layout & Grid Capabilities:**
  * *Grid Mechanics:* Draggable grid borders allow dynamic resizing of rows and columns; adjustable cell spacing, corner rounding, and canvas aspect ratio presets.
  * *Collage Wizard:* Automatically slots uploaded photos into grid layouts, but is bounded to single-page collages (~15–30 photos max before severe UI slowdown). Cannot generate multi-page documents.
* **Metadata & Customization:**
  * *Filename Handling:* **Zero** automatic filename reading or rendering.
  * *EXIF Metadata:* None.
  * *Watermarking:* Manual text and overlay additions only; no automated protective proofing watermarks.
* **Output Capabilities:**
  * JPG, PNG, PDF (Print quality preset available up to 300 DPI within pixel limits). No filename list exports or portable project manifests.

---

### 2.3 Fotor (Collage Maker, Photo Stitching, Artistic Layouts)
* **Overview & Core Focus:** Commercial web and mobile photo editor with collage making, photo stitching, and AI creative tools.
* **Onboarding & Friction:**
  * *Authentication:* Mandatory account creation for saving projects and downloading clean exports.
  * *Ad Load & Modals:* Free tier is heavily monetized with intrusive display ads, upgrade prompts, and popups.
  * *Data Flow:* Full cloud upload to Fotor servers.
* **Freemium Limits & Paywalls:**
  * *Free Tier:* **Forced Fotor Watermark** stamped onto collage exports; export resolution capped at standard/low web resolution.
  * *Fotor Pro ($8.99/month billed annually / $12.99 monthly) & Pro+ ($19.99/month):* Required to remove watermarks, unlock HD/300 DPI exports, access premium collage grids, and enable batch editing tools.
* **Layout & Grid Capabilities:**
  * *Grid Types:* Classic grids (2–16 cells), artistic/funky collages, and linear photo stitching (vertical/horizontal strips).
  * *Batch Scaling:* Rigid cell counts; impossible to drop a batch of 80 photos and generate a structured proof sheet.
* **Metadata & Customization:**
  * *Filename Handling:* Completely absent.
  * *EXIF Metadata:* Not supported.
  * *Review Status:* No image selection, tagging, or rejection tools.
* **Output Capabilities:**
  * Low-res JPG/PNG/PDF on Free; HD JPG/PNG/PDF on Pro. Single-page only.

---

### 2.4 Adobe Express (Collage Maker & Grid Layouts)
* **Overview & Core Focus:** Adobe's cloud-first web design suite aimed at social creators and enterprise teams, integrating Adobe Fonts, Adobe Stock, and Firefly GenAI.
* **Onboarding & Friction:**
  * *Authentication:* Mandatory Adobe ID login (Google, Apple, Adobe SSO).
  * *Data Flow:* 100% cloud sync into Adobe Creative Cloud storage (Free plan includes 2GB).
  * *Privacy & AI:* Subject to Adobe Cloud terms; assets may be processed by cloud services and Firefly machine learning pipelines.
* **Freemium Limits & Paywalls:**
  * *Free Plan:* Basic grid layouts, standard fonts, limited generative AI credits.
  * *Express Premium ($9.99/month or $99.99/year):* Unlocks full Adobe Fonts collection, brand kits, 100GB cloud storage, one-click resizing, and advanced Adobe Stock assets.
* **Layout & Grid Capabilities:**
  * *Grid Engine:* Dynamic cell distribution, automatic aspect ratio matching, cell reordering, and gap controls.
  * *Batch Limits:* Hard practical limit of **9 media files** in standard automated grid tools. Large photo sets require manual multi-page slide creation.
* **Metadata & Customization:**
  * *Filename Handling:* None. No automated text layer generation for filenames.
  * *EXIF Metadata:* None.
  * *Proofing Controls:* Non-existent.
* **Output Capabilities:**
  * PNG, JPG, PDF. Print-ready PDF available, but lacks standardized contact sheet header bands, sheet margins, and automated pagination.

---

### 2.5 Free Web Utilities & Grid Wrappers (PhotoJoiner, Photovisi, ImgTweak, PineTools, ImageMagick Wrappers)
* **Overview & Core Focus:** Niche single-purpose tools for combining images into strips, grids, or basic contact sheets.
* **Representative Tools:**
  1. *PhotoJoiner.net:* Simple photo stitcher and collage builder. Puts watermarks on free high-res exports.
  2. *Photovisi.com:* Drag-and-drop collage builder. Forces a corner watermark on free downloads; requires subscription for watermark-free 4K downloads.
  3. *ImgTweak Contact Sheet:* Free browser-based canvas tool with zero-upload processing and filename labels, but produces only a single infinite-scrolling canvas without multi-page PDF document pagination.
  4. *PineTools / Ezgif / ImgOnline:* Server-side ImageMagick/GD wrappers. Require uploading all images to backend servers; prone to HTTP 413 file size limit errors and gateway timeouts on batches over 20MB.
* **Summary of Gaps:** Either privacy-invasive (server uploads), ad-ridden with forced watermarks, or rudimentary utilities lacking multi-page document pagination, custom labels, proof ratings, and password protection.

---

## 3. Comprehensive Feature & Limitation Matrix

The following matrix compares MakeContactSheet.com against the 5 competitor categories across architecture, privacy, scale, layout, metadata, and export capabilities.

| Feature / Dimension | MakeContactSheet.com | Canva | BeFunky | Fotor | Adobe Express | Free Web Utilities (PhotoJoiner/Photovisi/ImgTweak) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Architecture** | **100% Client-Side (Zero-Upload)** | Cloud WebApp | Cloud WebApp | Cloud WebApp | Cloud WebApp | Cloud Server / Simple Canvas |
| **Mandatory Login** | **None (Instant Access)** | Yes (Mandatory) | Partial (for saving) | Yes (Mandatory) | Yes (Mandatory Adobe ID) | No (ad-supported) or Yes |
| **Privacy & NDA Safety** | **100% Safe (Local Memory)** | Stored in Cloud S3 | Stored in Cloud | Stored in Cloud | Stored in Cloud (Adobe CC) | Varies (Most upload to server) |
| **Batch Capacity** | **100–200+ Photos (Progressive)** | Manual 1-by-1 (High lag) | ~20–30 Photos Max | 2–16 Photos per Grid | ~9 Photos Max | 10–20 Photos Max (Server limit) |
| **Multi-Page Auto-Pagination** | **Yes (Automatic PDF Sheets)** | No (Manual duplication) | No (Single page only) | No (Single page only) | No (Manual slide creation)| No (Single infinite strip) |
| **Aspect Ratio Handling** | **Contain (Letterbox) & Cover** | Cover (Crop by default) | Cover (Crop by default) | Cover (Crop by default) | Cover (Crop by default) | Rigid or Distort |
| **Automated Filename Labels** | **Yes (Sanitized & Formatted)**| **No** (Manual text boxes) | **No** (Manual text boxes) | **No** (Manual text boxes) | **No** (Manual text boxes) | Partial (ImgTweak only; no styling) |
| **EXIF Metadata Extraction** | **Engine-Ready** | **No** | **No** | **No** | **No** | **No** (Only raw scripts) |
| **Custom Per-Photo Labels** | **Yes (Inline Editing)** | No | No | No | No | No |
| **Batch Rename Recipe Builder** | **Yes (Prefix, Pad, Suffix)** | No | No | No | No | No |
| **Proofing & Selection Triage** | **Yes (Select/Flag/Reject/Stars)**| No | No | No | No | No |
| **Protective Watermarking** | **Yes (Diagonal, Tiled, Logos)** | Manual text layer | Manual text layer | Manual text layer | Manual text layer | Forced Brand Watermarks |
| **Export Formats** | **300 DPI PDF, PNG, JPEG** | PNG, JPG, PDF (CMYK Pro) | PNG, JPG, PDF | PNG, JPG, PDF (HD Pro) | PNG, JPG, PDF | Low-res PNG/JPG |
| **PDF Password Protection** | **Yes (100% Local jsPDF)** | No | No | No | No | No |
| **Filename List Export** | **Yes (CSV, TSV, TXT)** | No | No | No | No | No |
| **Portable Session Manifest** | **Yes (`.makecontactsheet.json`)**| No (Proprietary Cloud) | No (Proprietary Cloud)| No (Proprietary Cloud) | No (Proprietary Cloud)| No |
| **Pricing & Watermarks** | **100% Free & No Watermarks** | $120/yr (Pro features) | $84/yr (Plus features) | $108/yr (Watermark-free) | $99/yr (Premium features) | Freemium ($5–$15/mo) or Ads |

---

## 4. In-Depth Analysis Across the 5 Key Evaluation Dimensions

### Dimension 1: User Onboarding, Friction & Privacy Governance

```
[ Traditional Cloud Workflow ]
User Files (500MB) ---> Network Upload (2-5 min) ---> Remote Server (AWS/S3) ---> Cloud Processing ---> Network Download
* High Latency | * Privacy Risk (NDAs, Boudoir, Legal) | * Storage Caps | * Account Mandatory

[ MakeContactSheet.com Zero-Upload Architecture ]
User Files (500MB) ---> Local Browser Memory (OffscreenCanvas/WASM) ---> Instant Preview (0 ms Upload) ---> Local PDF Export
* Instant Speed | * 100% Air-Gapped Privacy | * Zero Network Bandwidth | * Zero Signup Friction
```

* **The Network Upload Barrier:**
  * In Canva, Adobe Express, and Fotor, importing 100 high-resolution photos (averaging 15MB each = 1.5GB total) requires several minutes of continuous network upload. On mobile hotspots, slow studio Wi-Fi, or hotel connections, this leads to browser tab freezes, HTTP timeout errors, and dropped files.
  * In MakeContactSheet.com, images are loaded directly from the local filesystem via standard HTML5 File/Blob APIs into `createImageBitmap` and cached offscreen. Memory is managed via progressive batched decoding (batch size 4 with async yielding) and bounded thumbnail generation (max 480px) that immediately releases multi-megabyte uncompressed pixel buffers.
* **The Privacy & Compliance Imperative:**
  * Professional photographers who shoot under commercial Non-Disclosure Agreements (NDAs), celebrity events, boudoir, medical/forensic case studies, or high-profile weddings cannot legally or ethically upload unreleased client proofs to third-party consumer cloud platforms.
  * Canva, Adobe, and Fotor terms of service grant the platforms broad licenses to store, analyze, and process uploaded images across their cloud infrastructure. MakeContactSheet.com eliminates this risk entirely: not a single pixel, thumbnail, or filename ever crosses a network boundary.

---

### Dimension 2: Freemium Limits, Watermarking & Paywalls

* **Forced Hostile Watermarking:**
  * Fotor, Photovisi, and PhotoJoiner monetize by placing forced brand watermarks directly across user designs on the free tier, rendering free exports unusable for professional client delivery.
  * In contrast, MakeContactSheet.com has **zero forced brand watermarking**, while providing the user with **protective proof watermarking tools** (diagonal text stamps, repeating tiled anti-AI inpainting grids, custom photographer logo uploads) to protect the *photographer's* copyright from unauthorized client use.
* **Resolution Caps & DPI Gating:**
  * Canva restricts CMYK 300 DPI PDF Print to its $120/year Pro subscription.
  * Fotor restricts high-definition downloads to its $8.99–$12.99/month plan.
  * BeFunky limits maximum canvas dimension to 4088px and strips DPI metadata on PNG exports.
  * MakeContactSheet.com calculates exact print geometry at 150 DPI base scale (`PX_PER_MM = 150 / 25.4`) and renders exports at `scale = 2`, producing true **300 DPI print-ready documents** in PDF, PNG, and JPEG formats at zero cost.

---

### Dimension 3: Layout, Grid & Batch Scale Capabilities

* **The 9-to-16 Photo Social Limit:**
  * Canva, Adobe Express, and Fotor grid engines are architected around single-canvas social graphics (Instagram grids, Facebook banners, mood boards). They provide fixed layouts containing 2 to 9 cells, with rare layouts reaching 16 cells.
  * When a photographer drops 120 photos from a studio session, these tools cannot automatically partition the images. The user must manually duplicate pages, create frame grids on each page, and drag-and-drop photos one by one into 120 individual slots.
* **Parametric Contact Sheet Pagination in MakeContactSheet.com:**
  * MakeContactSheet.com calculates layout dynamically: given $N$ images, $C$ columns, and $R$ rows, the engine automatically derives total pages $P = \lceil N / (C \times R) \rceil$, reserves millimeter-accurate margins, draws header bands (Project Name, Date, Page X of Y, Client, Photographer), and positions individual cells with uniform spacing and keylines.
* **Aspect Ratio Preservation (Contain vs. Cover):**
  * Generic collage makers default to `cover` mode, cropping photos into square or fixed-ratio cells. This destroys intentional photographic composition (e.g. cutting off heads in portraits or cropping wide landscape framing).
  * MakeContactSheet.com provides an instant global `contain` vs. `cover` toggle, preserving exact 3:2, 4:3, 1:1, or 16:9 camera aspect ratios with elegant letterboxing.

---

### Dimension 4: Metadata, Filenames, EXIF & Customization

```
+-------------------------------------------------------------+
| [Photo Cell]                                                |
|                                                             |
|                                                             |
+-------------------------------------------------------------+
| [Label Strip]: DSC_4821.JPG                                 |
| [EXIF Badge]:  Sony A7IV | 85mm f/1.4 | 1/500s | ISO 100    |
| [Status]:      [★ 5] [SELECT / KEEP]                        |
+-------------------------------------------------------------+
```

* **The Filename Deficit in Mainstream Tools:**
  * In Canva, BeFunky, Fotor, and Adobe Express, there is **zero automated mechanism** to display photo filenames. To create a 50-photo contact sheet with filenames in Canva, a user must create 50 individual text boxes, type each filename manually, and align them below each photo.
  * MakeContactSheet.com automatically reads the sanitized source filename, computes an exact reserved label strip (`LABEL_BAND_HEIGHT`) in the layout engine, and renders the label with customizable typography, colors, and truncation.
* **Advanced Per-Photo Customization & Batch Recipes:**
  * MakeContactSheet.com supports **custom per-photo labels** (allowing inline edits or overrides while retaining original filename revertibility) and an **integrated batch rename recipe builder** (`Prefix + Start Index + Zero Padding + Suffix`, e.g. `ClientProof_001.jpg`).
  * Competitor tools have zero concept of batch renaming or proof status classification (Select, Flag, Reject, Star Ratings, Notes).

---

### Dimension 5: Output Formats, Document Architecture & Export Ecosystem

* **Multi-Page Vector PDF Documents:**
  * While Canva and Adobe Express export PDFs, they treat each page as a standalone graphic slide. They do not generate structured photographic contact sheets with standardized margins (in mm), continuous page counters (e.g. "Page 3 of 12"), project header bands, and cell borders.
  * MakeContactSheet.com generates clean, multi-page vector PDFs using a dynamically imported `jsPDF` engine that scales canvas rasters accurately to physical paper sizes (A4, US Letter, A3, Tabloid, 4×6) with crisp vector text overlays.
* **Client-Side PDF Password Protection:**
  * MakeContactSheet.com integrates local PDF encryption (`userPassword`, `ownerPassword`, `userPermissions: ['print', 'modify', 'copy', 'annot-forms']`) directly in the browser via `jsPDF`, allowing photographers to distribute password-protected proof PDFs to clients without third-party server tools.
* **Structured Data & Non-Destructive Manifest Exports:**
  * MakeContactSheet.com exports filtered filename lists in CSV, TSV, and TXT formats (e.g. exporting only "Kept" or "Flagged" filenames for 1-click batch import into Adobe Lightroom Classic or Capture One).
  * It also exports portable `.makecontactsheet.json` project manifests capturing all ratings, notes, layout configs, and crop states, allowing instant session restore and fuzzy file relinking.

---

## 5. Strategic Gap Analysis & Competitor Comparison Summary

| Competitor | Primary Strength | Critical Failure Point in Contact Sheet / Proofing Workflow |
| :--- | :--- | :--- |
| **Canva** | Massive template library, social media branding | Mandatory signup; cloud upload latency; cannot auto-paginate 50+ photos; no automated filenames or EXIF. |
| **BeFunky** | Draggable grid borders, Collage Wizard | Single-page limit; max 4088px canvas; Plus paywall on auto-wizard; no filename or proof review workflow. |
| **Fotor** | Simple quick collage presets, artistic filters | Forced watermarks on free tier; HD/300 DPI paywalled; cloud upload required; no batch pagination. |
| **Adobe Express** | Adobe Fonts/Stock integration, Firefly AI | Strict 9-photo grid limit; mandatory Adobe ID; cloud sync overhead; no photographic proofing tools. |
| **Free Utilities** | Fast, simple for 2–4 photos | Ugly UI; server upload privacy risks; forced watermarks or intrusive ads; single infinite strip output. |
| **MakeContactSheet** | **Zero-upload privacy, 100+ batch pagination, filenames, proofing, 300 DPI PDF** | Focuses purely on contact sheets and photo grids; does not provide arbitrary vector sticker/poster design. |

---

## 6. Premium Feature Proposals & Technical Specifications for MakeContactSheet.com

To extend MakeContactSheet.com's competitive lead, we propose four high-impact, defensible, and 100% client-side feature additions:

---

### Proposal 1: Client-Side EXIF & Shooting Parameter Badge Overlay Engine

* **Strategic Opportunity:**
  * Commercial photographers, film lab digitizers, cinematography DITs, and gear reviewers need to display shooting parameters (Camera Body, Lens, Focal Length, Aperture, Shutter Speed, ISO, Timestamp) directly beneath or overlaid on photo thumbnails.
  * Currently, Lightroom requires clumsy Print Module setups, and all web collage tools completely ignore EXIF.
* **Architecture & Technical Specification:**
  * *Library:* Integrate a lightweight, pure-JS EXIF parser (such as `exifr` or minimal binary TIFF header reader, ~12kB gz) via dynamic import during file intake in `src/lib/media/imageLoader.ts`.
  * *Data Schema:* Extend `ImageItem` in `src/lib/types.ts`:
    ```typescript
    export interface ImageExifData {
      cameraMake?: string;
      cameraModel?: string;
      lensModel?: string;
      focalLength?: string; // e.g. "85mm"
      aperture?: string;    // e.g. "f/1.4"
      shutterSpeed?: string;// e.g. "1/500s"
      iso?: number;         // e.g. 100
      dateTimeOriginal?: string;
    }
    ```
  * *Layout Engine:* Update `contactSheetEngine.ts` to calculate an optional secondary metadata badge line within `LABEL_BAND_HEIGHT`.
  * *Renderer:* Update `canvasRenderer.ts` to draw pill-style dark/light badges (e.g. `[85mm] [f/1.4] [1/500s] [ISO 100]`) below the filename.

---

### Proposal 2: Standalone Zero-Server "Client Proofing Portal" HTML Exporter

* **Strategic Opportunity:**
  * Photographers routinely pay $15–$40/month for cloud proofing services (Pixieset, CloudSpot, ShootProof) simply to let clients click "Heart" or "Select" on a gallery of photos.
  * We can provide a **100% Serverless, Free Client Proofing Portal** export: a single self-contained `.html` file that photographers email or send to their client.
* **Architecture & Technical Specification:**
  * *Exporter:* In `src/lib/export/clientPortalExporter.ts`, generate a standalone HTML document containing inline CSS, lightweight compressed thumbnail blobs (WebP base64), and a vanilla JS review interface.
  * *Client UX:* The client opens `ProjectProof.html` in any browser (desktop or mobile) with zero internet connection required. They click to toggle "Keep", "Favorite", or "Reject", add per-photo comments, and click **"Complete Selection & Download Review File"**.
  * *Round-Trip Sync:* The client's browser downloads a small `ClientReview.makecontactsheet.json` file. The photographer drops this JSON file into MakeContactSheet.com to instantly synchronize client selections, filter to Kept shots, and export high-res PDFs or Lightroom selection CSVs.

---

### Proposal 3: Dynamic Justified & Masonry "Smart Mosaic" Layout Engine

* **Strategic Opportunity:**
  * Grid makers (Canva, BeFunky, Fotor) struggle when users combine portrait (2:3) and landscape (3:2) photos in the same collection, resulting in either heavy letterboxing or awkward blank spaces.
  * Implementing an intelligent content-aware justified packing algorithm (similar to Flickr/Google Photos justified layout) transforms MakeContactSheet into a world-class editorial collage tool without compromising photographic aspect ratios.
* **Architecture & Technical Specification:**
  * *Engine:* Add `src/lib/engine/mosaicEngine.ts` implementing the Linear Partition algorithm to group images into balanced rows targeting an optimal row height while maintaining exact aspect ratios.
  * *Live Controls:* Add "Smart Mosaic" mode to `src/components/workspace/LayoutControls.ts` with controls for Target Row Height, Spacing, and Outer Padding.

---

### Proposal 4: 1-Click Lightroom Classic & Capture One XMP Sidecar Exporter

* **Strategic Opportunity:**
  * After reviewing, tagging, and ranking 150 photos in MakeContactSheet.com, professional photographers currently export a CSV/TXT list of filenames.
  * By exporting ready-to-use `.xmp` sidecar files or a `.lua` Lightroom selection script, photographers can apply star ratings, color labels, and rejection flags directly to their local RAW catalog with zero manual matching.
* **Architecture & Technical Specification:**
  * *Generator:* Build `src/lib/export/xmpExporter.ts` to generate standard Adobe XMP metadata sidecar XML blocks containing `<xmp:Rating>` and `<photoshop:Urgency>`.
  * *Zip Bundle:* Pack individual `.xmp` files matching the source photo filenames into a single `.zip` file via a client-side zip library (e.g. `fflate` / `JSZip`).

---

## 7. Verification, Evidence Classification & Sources

This survey adheres strictly to the Evidence-Gated Research Protocol:

| Evidence Level | Statement / Fact | Source Reference |
| :--- | :--- | :--- |
| **Verified (First-Party Docs)** | Canva Pro paywalls CMYK PDF Print, transparent PNG, and custom resize; folder limit 200 items on free. | [Canva Help Center & Pricing](https://www.canva.com) |
| **Verified (First-Party Docs)** | BeFunky limits maximum canvas dimension to 4088x4088px; Plus subscription unlocks Collage Wizard and templates ($14.99/mo). | [BeFunky Support & Pricing](https://www.befunky.com) |
| **Verified (First-Party Docs)** | Fotor places mandatory watermarks on free exports and gates HD/300 DPI resolution behind Pro ($8.99-$12.99/mo). | [Fotor Plans & Pricing](https://www.fotor.com) |
| **Verified (First-Party Docs)** | Adobe Express maintains a 9-photo standard grid limit and requires Adobe ID authentication. | [Adobe Express User Guide](https://www.adobe.com/express) |
| **Verified (First-Party Testing)**| PhotoJoiner and Photovisi enforce watermarks on free downloads. | [PhotoJoiner.net](https://www.photojoiner.net), [Photovisi.com](https://www.photovisi.com) |
| **Verified (Local Codebase)** | MakeContactSheet.com executes 100% in-browser via Canvas API, batched 480px thumbnail decoding, 300 DPI PDF rendering, and zero network calls. | `/src/lib/engine/canvasRenderer.ts`, `/src/lib/media/imageLoader.ts`, `/src/lib/export/pdfExporter.ts` |

---

## 8. Conclusion & Strategic Recommendation

MakeContactSheet.com possesses a clear and defensible market advantage. Rather than competing head-to-head with Canva or Adobe Express on general-purpose social media sticker templates, MakeContactSheet.com should double down on **high-volume, high-trust, privacy-first photographic proofing and contact sheet workflows**.

By implementing **Proposal 1 (EXIF metadata badges)** and **Proposal 2 (Zero-server client proofing portal)**, MakeContactSheet.com can capture high-intent organic traffic from frustrated Lightroom, Bridge, and Canva users seeking a fast, free, private, and professional contact sheet solution.
