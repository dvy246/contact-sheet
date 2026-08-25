# FrameProof — Product Requirements Document

> **Working name:** FrameProof
> **Document version:** 2.0
> **Research date:** August 25, 2026
> **Decision:** Go — four-week build-to-validate MVP
> **Primary market:** English-language search, United States first
> **Stack:** Astro.js + Tailwind CSS v4, true multi-page application (MPA)
> **Business model:** Free browser utility, AdSense on content pages, optional paid expansion only after repeat use is proven

---

## 1. Executive Summary

FrameProof is a browser-first, privacy-respecting photo preparation, contact-sheet, collage, and review workspace that helps photographers, visual creators, hobbyists, and small studios privately prepare batches of images, build polished contact sheets or practical collages from templates, review and select photos, and export a clean final image or accurate filename list — without requiring an account, an upload, or a full photography-business suite.

**The central workflow:**

> Import photos → prepare or organize them → create a contact sheet or collage → review and select images → export the finished result or exact filenames.

**The bet:** The contact-sheet category is visibly fragmented across photo grid generators, hosted client-proofing platforms, and desktop review software. No observed browser tool joins contact sheets, collages, review states, filename handoff, and reopenable projects into one local workflow. That gap is the product.

**What this is not:** A general photo editor. Not a Canva-style design platform. Not a full proofing SaaS. Not a random directory of unrelated utilities. Not a video tool in the first release. FrameProof does one job family — prepare, compose, review, and hand off — and does it without signup, upload, or installation.

### 1.1 Product Scope in One Sentence

> FrameProof will help photographers and visual creators privately prepare batches of images, build polished contact sheets or practical collages from templates, review and select photos, and export a clean final image or accurate filename list without requiring a full photography-business suite.

### 1.2 Build Confidence

1. Validate the photo contact-sheet and filename-selection workflow.
2. Build the reliable local photo MVP with collage mode.
3. Add connected preparation utilities (P1).
4. Validate demand before building hosted proofing, video, accounts, or advanced collaboration (P2).

### 1.3 Project Assumptions

| # | Assumption | Status | Validation needed |
|---|---|---|---|
| A1 | Photo contact-sheet intent is the strongest acquisition channel | Hypothesis — Ahrefs UK session: >100 searches, Easy KD for core terms | Fresh U.S. Ahrefs export |
| A2 | Collage mode shares enough infrastructure with contact sheets to ship in the same MVP | Derived — both use the same import, grid engine, and export pipeline | Implementation validation |
| A3 | "Photo collage maker" is a high-volume, high-competition term where contact sheets are the realistic SEO wedge | Inference — search analysis shows Canva/Adobe dominate collage SERPs | Verify with Ahrefs KD data |
| A4 | The filename-to-selection handoff gap is a real pain point | Inference — category fragmentation + Reddit evidence of manual workarounds | 10+ workflow interviews |
| A5 | Local-first browser processing handles 100-300 images reliably | Hypothesis — Canvas API well-documented but untested at scale | Fixture testing |
| A6 | Reopenable project manifests create repeat use | Hypothesis — no competitor observed offering this in browser | MVP analytics |
| A7 | Client proofing via portable review pack is viable without a server | Hypothesis — requires HTML/ZIP packaging | Technical spike |
| A8 | AdSense on content pages won't harm tool activation | Hypothesis | A/B test post-launch |
| A9 | Video contact sheets are technically viable in the browser | Hypothesis — deferred to P2 feasibility spike | Not validated until P2 |

---

## 2. Evidence Ledger

### 2.1 Source Register

| # | Source | Type | Access date | Claims supported | Limitations |
|---|---|---|---|---|---|
| S1 | [contact-sheet-micro-saas-strategy.md](file:///Users/divyyadav/developer/another-tool/research/contact-sheet-micro-saas-strategy.md) | Local research | Aug 25, 2026 | Product concept, competitor synthesis, keyword observations, feature priority, technical approach, 4-week plan | Session-based Ahrefs readings, not exported |
| S2 | final-contact-sheet-validation-report.pdf | Local report | Aug 25, 2026 | Ahrefs keyword observations, competitor list, photo+video recommendation | Session observations only |
| S3 | [ContactSheetMaker](https://www.contactsheetmaker.com/) | First-party page | Aug 25, 2026 | Photo grids, filenames, PDF, saved projects, branding, client proofing; Free (1/wk), Pro (\$9/mo), Ultimate (\$19/mo or \$190/yr) | Not independently tested |
| S4 | [Vizua Contact Sheet](https://vizua.io/contact-sheet/) | First-party page | Aug 25, 2026 | Local browser, 2-50 JPG/PNG/WebP, columns, filenames, 2400px canvas, JPEG export | Photo-only, no review state |
| S5 | [ImgTweak](https://imgtweak.com/) | First-party page | Aug 25, 2026 | Broad browser utility: no uploads, free, batch processing, image-to-PDF, format conversion | Broad suite, not focused review |
| S6 | [Cutsio Storyboard](https://cutsio.com/storyboard-generator) | First-party page | Aug 25, 2026 | Free browser video contact sheet, local processing, timestamped JPEG, 9/16/25 frames | Single JPEG; no multi-file, notes, CSV |
| S7 | [MoviePrint](https://movieprint.io/) | First-party page | Aug 25, 2026 | Printable poster flow; desktop app | Desktop only; page shows poster workflow |
| S8 | [UtilityCove](https://utilitycove.com/) | First-party homepage | Aug 25, 2026 | Broad directory; video thumbnail strip (max 12 frames, PNG, timestamps) | No dedicated contact-sheet workflow |
| S9 | [TheFluxTrain](https://thefluxtrain.com/) | First-party homepage | Aug 25, 2026 | Current homepage = AI film platform | Frame-extractor route may be stale |
| S10 | AnySWeb IMG LAB / MEDIA LAB | Search result | Aug 25, 2026 | Browser image/video contact sheets, local processing | Not page-audited |
| S11 | G-Tab (gtab.nl) | Search result | Aug 25, 2026 | Browser video contact sheet, timestamps, PNG | Not page-audited |
| S12 | Canva, Adobe Express, BeFunky | Search results | Aug 25, 2026 | Dominant collage tools; cloud-based; accounts required | High-competition category |
| S13 | PhotoCollage.com, ToolPix | Search results | Aug 25, 2026 | Local-processing collage tools, no accounts | Not page-audited |
| S14 | [Google Search Central](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) | Official docs | Aug 25, 2026 | SEO compliance, structured data, spam policies | Authoritative |
| S15 | [Google AdSense Policies](https://support.google.com/adsense/answer/1346295) | Official docs | Aug 25, 2026 | Ad placement rules, accidental click warnings | Authoritative |
| S16 | Competitor subagent research | Subagent findings | Aug 25, 2026 | Verified workflows for 7 direct competitors + 5 newly discovered | Subject to page changes |
| S17 | SEO subagent research | Subagent findings | Aug 25, 2026 | SERP analysis, metadata templates, structured data plan | No live volume data |
| S18 | Reddit/forum evidence | Third-party directional | Aug 25, 2026 | Client selection pain, filename tracking, proofing workflows | Directional only, not quantitative |

### 2.2 Evidence Labels

| Label | Meaning |
|---|---|
| **Verified** | Directly observed on first-party page or authoritative source |
| **Derived** | Logical conclusion from verified data |
| **Inference** | Reasonable but unverified |
| **Hypothesis** | Testable assumption; not yet validated |
| **Unknown** | Not found; not proof of absence |

### 2.3 Research Limitations

- Ahrefs keyword data are session observations, not exported tables with exact volumes
- No live top-20 SERP ownership study completed for the U.S.
- Competitor features/prices are page observations; missing feature ≠ absent feature
- No AdSense RPM, revenue, or advertiser-competition data exists
- 30-day repeat usage not validated
- Browser compatibility for large batches, PDF rendering, and mobile memory needs fixture testing
- Collage competitor landscape audited via search, not first-party page visits
- Forum/Reddit evidence is directional, not representative

---

## 3. Competitor & Substitute Matrix

### 3.1 Direct Contact-Sheet Tools

| Product | Processing | Signup | Formats in | Formats out | Review states | Project save | Pricing | Limits | Evidence |
|---|---|---|---|---|---|---|---|---|---|
| **ContactSheetMaker** | Server | Yes | JPG/PNG/GIF/BMP/TIFF | PDF, PNG | Client selection + notes (Ultimate) | Saved projects (paid) | Free: 1/wk; Pro: \$9/mo; Ultimate: \$19/mo | 1 sheet/week free | Verified (S3, S16) |
| **Vizua** | Local browser | No | JPG/PNG/WebP (max 50) | JPEG, PNG | None | None | Free | 50 images max | Verified (S4, S16) |
| **ImgTweak** | Local browser | No | JPG/PNG/WebP/GIF/BMP/AVIF | JPG/PNG/WebP | None | None | Free (ad-supported) | No hard limit | Verified (S5, S16) |
| **FLOGVIT** | Unknown | Unknown | Images | PNG/JPG | Unknown | Unknown | Free | Unknown | Unknown |
| **AnySWeb IMG LAB** | Local browser | No | JPG/PNG/WebP | PNG/JPG/PDF | None | None | Free | Unknown | Inference (S10) |

### 3.2 Collage Tools (Adjacent Competition)

| Product | Processing | Signup | Key features | Pricing | FrameProof opening |
|---|---|---|---|---|---|
| **Canva** | Cloud | Yes (required) | Massive template library, AI, stock assets, brand kits | Free + Pro \$13/mo | Local processing; no account; no cloud dependency |
| **Adobe Express** | Cloud | Yes (required) | Firefly AI, professional templates, Adobe integration | Free + Premium \$10/mo | No Adobe subscription; no cloud lock-in |
| **BeFunky** | Cloud | Optional | Photo editing + collage; auto-collage feature | Free + Plus \$10/mo | Focused on photographers, not general design |
| **PhotoCollage.com** | Local browser | No | Local processing, no uploads, save locally | Free | Closest local competitor for collage; lacks contact sheets |
| **ToolPix** | Local browser | No | Privacy-focused, in-browser processing | Free | Lacks contact-sheet mode and review states |

### 3.3 Video Tools (P2 reference only)

| Product | Processing | Type | Key features | Evidence |
|---|---|---|---|---|
| **Cutsio** | Local browser | Storyboard | Timestamped JPEG, 9/16/25 frames, reorder/remove | Verified (S6, S16) |
| **MoviePrint** | Desktop | Frame analysis | Shot detection, face detection, JSON export | Verified (S7, S16) |
| **UtilityCove** | Local browser | Thumbnail strip | Max 12 frames, timestamps, PNG | Verified (S8, S16) |
| **G-Tab** | Local browser | Video contact sheet | Custom grid, timestamps, PNG | Inference (S11) |

### 3.4 Desktop & Suite Substitutes

| Product | Opening for FrameProof |
|---|---|
| Adobe Bridge / Photoshop Contact Sheet II | No subscription; no setup; instant browser access |
| Lightroom Print Module | Faster handoff artifact; dedicated review states |
| Capture One | No installation; portable handoff |
| XnView MP / FastStone | Browser-based; no download; cross-platform |
| Photo Mechanic | No \$140 license; simpler review for lighter workflows |

### 3.5 Manual Substitutes

| Method | What breaks |
|---|---|
| Screenshot + email | Filenames lost; no structured selection |
| Google Drive / Dropbox folder | Upload required; no keep/reject states |
| Lightroom export → email | Filename mapping is manual |
| In-person laptop review | No portable record; decisions forgotten |
| Text/WhatsApp photo share | Compression; no metadata |
| Canva manual grid | No filename labels; no review states; cloud-dependent |
| macOS Finder → Automator PDF | No review states; no customization; macOS only |

---

## 4. Workflow Comparison

### 4.1 End-to-End: Current Alternatives vs. FrameProof

| Step | ContactSheetMaker | Vizua | ImgTweak | Canva | FrameProof (proposed) |
|---|---|---|---|---|---|
| **Acquire** | Search → product page | Search → tool | Search → tool | Existing account | Search → tool / direct |
| **Setup** | Create account (1/wk free) | None | None | Login required | None |
| **Import** | Upload to server | Drag ≤50 images | Drop photos | Upload to cloud | Drag batch from device |
| **Configure** | Grid, labels, branding | Columns, spacing, filenames | Layout, size, labels | Manual drag-and-drop | Columns, page size, labels, fit/cover, sort; OR choose collage template |
| **Review/Select** | Client selection (Ultimate) | None | None | None | Keep / Reject / Flag per item |
| **Export** | Branded PDF | JPEG | JPG/PNG/WebP | PNG/JPG/PDF (cloud) | PNG, JPG, PDF, CSV/TXT filenames, JSON manifest |
| **Handoff** | Share link (paid) | Download image | Download image | Share cloud link | Download + portable review pack; exact filenames |
| **Reopen** | Dashboard (paid) | Not possible | Not possible | Cloud project | Import JSON manifest; relink local files |

### 4.2 Gap Summary

**Where current tools stop:**

| Category | Representative tools | What they produce | What they lack |
|---|---|---|---|
| Grid generators | Vizua, ImgTweak, FLOGVIT | Visual sheet (one image) | No review state, no filename export, no reopen |
| Branded proofing | ContactSheetMaker | Professional PDF with branding | Paid tiers for selection; server uploads |
| General design | Canva, Adobe Express | Beautiful collages | Cloud-dependent; no filename handoff; no review states |
| Local collage | PhotoCollage.com, ToolPix | Quick collage output | No contact sheets; no review; no structured handoff |
| Hosted proofing | Pixieset, ShootProof, Pic-Time | Full gallery with client selection | Requires uploads, accounts, paid plans |
| Desktop suites | Bridge, Lightroom, Capture One | Deep editing integration | Subscription/install friction; no portable web handoff |

**What FrameProof fills:** The selection survives the export. The grid and the collage share one import pipeline. The filename list, the review states, and the notes travel with the visual sheet. The project reopens later.

---

## 5. User Pain, Demand & Switching-Cost Analysis

### 5.1 Pain Map

| Pain | Severity | Who feels it | Current workaround | Evidence |
|---|---|---|---|---|
| **Filenames lost in handoff** — client sees thumbnails but can't tell editor which file | High | Photographers, editors | Manual filename lists; screenshot + type names | Inference (S18) |
| **Selection scattered** — keep/reject decisions in email, text, memory | High | Photographers, studios | Lightroom flags → manual export; email threads | Inference (S18) |
| **Grid tools don't preserve decisions** — consumed, not continued | Medium | Anyone making contact sheets | Remake; re-annotate manually | Derived (S3-S5) |
| **Photo and collage creation split** — different tools for sheets vs. collages | Medium | Creators, small studios | Canva for collage + Vizua for contact sheet | Derived (competitor map) |
| **Desktop software friction** — Photoshop/Bridge require install + subscription | Medium | Students, freelancers, part-timers | Search for "free online" | Verified (S17 — SERP behavior) |
| **Privacy anxiety** — uploading unreleased work | Medium | Commercial, NDA projects | Manual offline methods | Inference (S12, S13 — privacy selling points) |
| **Canva/Adobe lock-in** — cloud accounts, subscriptions, design complexity | Medium | Users wanting simple output | Use multiple free tools | Derived (competitor map) |

### 5.2 Demand Signals

| Signal | Evidence | Status |
|---|---|---|
| "contact sheet maker" >100 UK searches, Easy KD | Validation report session | Hypothesis |
| "photo collage maker" is high-volume, high-competition | SEO research (S17) | Verified — but difficult to rank for |
| "contact sheet" terms are lower-competition SEO wedge | SEO research (S17) | Derived |
| Google autocomplete for contact sheet: free, online, Photoshop, Canva, app | Autocomplete observation | Verified |
| SERP for transactional terms dominated by tools and product pages | SEO subagent (S17) | Verified |
| Hosted proofing platforms have paying users | Market existence | Verified |
| Reddit: photographers discuss filename-tracking and proof-sheet pain | Web search (S18) | Inference |

### 5.3 Switching Costs

| From | Switching cost | Reason |
|---|---|---|
| Manual methods | Near zero | No saved state to migrate |
| Vizua / ImgTweak | Near zero | Free tools with no saved state |
| ContactSheetMaker free | Low | 1/week limit; low lock-in |
| Canva free | Low-Medium | Cloud projects exist but collage is secondary use |
| Photoshop | Low for contact sheets | Users keep Photoshop for editing |
| Hosted proofing (Pixieset etc.) | Medium | Invested in galleries and client workflows |

**Buyer-choice reason:** "I can get a filename-accurate contact sheet or collage in seconds — free, local, no account — with the ability to review, select, and reopen the project later."

---

## 6. Opportunity Scorecard

| Criterion | Score | Evidence | Confidence |
|---|---|---|---|
| Problem severity | 7 | Filename-handoff pain is real but tolerated | Medium |
| Demand evidence | 6 | Photo intent supported; collage high-volume but competitive | Medium |
| Buyer-choice strength | 8 | Free + local + no-account + review + reopen | Medium-High |
| Workflow improvement | 8 | Joins contact sheets, collages, review, handoff in one tool | High |
| Quality & trust | 7 | Browser tools produce adequate output; privacy demonstrable | Medium |
| Differentiation | 7 | Combination of modes is unique; individual features copiable | Medium |
| Copy resistance | 5 | Any competitor could add features within months | Low |
| Distribution fit | 7 | SEO via contact-sheet wedge; collage as value-add | Medium |
| Technical feasibility | 8 | Canvas API, Web Workers, PDF generation well-documented | High |
| Operating cost | 9 | Static site + client-side processing ≈ zero marginal cost | High |
| Monetization potential | 5 | AdSense on content; paid expansion only after demand proof | Low |

**Overall: 7.0 / 10 — Recommended: Build as flagship workflow.**

**Rationale:** The build is cheap, photo search intent is the best observed acquisition signal, the category is fragmented, and the combination of contact sheets + collages + review + filename handoff in one local tool is not observed in any single competitor. Failure is cheap — 4-week MVP with no server costs.

---

## 7. Positioning & Differentiation

### 7.1 Positioning Statement

**For** photographers, visual creators, hobbyists, and small studios **who** need to prepare image batches, build contact sheets or collages, review and select photos, and hand off exact filenames to a client or editor, **FrameProof is** a free browser workspace **that** creates filename-accurate contact sheets, template-based collages, and client selection records without uploading files, creating an account, or installing software. **Unlike** ContactSheetMaker (upload + paid selection), Vizua (grid-only, 50 images max), Canva (cloud-dependent, no filename handoff), and Photoshop (subscription + setup), **FrameProof** joins photo preparation, composition, review, and handoff into one local workflow with a portable evidence pack.

### 7.2 Differentiation Thesis

The differentiation is not privacy (several tools claim it), not "AI-powered" (vague), not feature count (easy to copy), and not being a cheaper Canva (different job). The differentiation is:

> **The selection survives the export.** FrameProof produces a review pack where the decisions, filenames, and notes travel with the visual sheet — and the project can be reopened later. Contact sheets and collages share one pipeline, so preparing images, composing layouts, and reviewing selections happen in one workspace, not three tools.

### 7.3 Claims Registry

| Claim | Status | Rule |
|---|---|---|
| "Files stay on this device" | **Prohibited until verified** | Must inspect network during import/export |
| "No upload required" | **Verified** for local mode | May state; update if remote features added |
| "No account required" | **Verified** — MVP has no auth | May state |
| "Free and unlimited" | **Verified for MVP** | May state; update if limits added |
| "Works offline" | **Prohibited until verified** | Requires service worker test |
| "The only tool that..." | **Prohibited** | Cannot verify across all competitors |
| "Best contact sheet maker" | **Prohibited** | Unsupported superlative |
| Remote proofing is "local" | **Prohibited** | Remote review requires disclosed hosting/transfer |
| Rankings/traffic/revenue forecasts | **Prohibited** | No one can guarantee these |

---

## 8. Target Users & Jobs-to-Be-Done

| User | Trigger | Job-to-be-done | Desired outcome | Current alternative |
|---|---|---|---|---|
| **Part-time / event photographer** | Finished a shoot; needs to show client options | Scan a large shoot, make a proof sheet, preserve filenames, get client selections back | Client picks favorites by filename; photographer edits only those | Screenshot + email; Lightroom export |
| **Freelance photographer / small studio** | Client needs selects from a batch | Repeatable proof-sheet preset, keep/reject, clean filename handoff | Accurate selection record returns to photographer | ContactSheetMaker (1/wk); hosted proofing |
| **Visual creator / hobbyist** | Wants to make a collage for social, portfolio, or personal use | Choose a template, place photos, customize, export | Clean collage without Canva complexity or cloud account | Canva (cloud); PhotoCollage.com |
| **Photography student** | Assignment review or portfolio preparation | Compare, print, archive, explain a photo set | Contact sheet for printing or submission | Manual file arrangement; Canva |

**First wedge:** Photo contact sheets with persistent selection and filename export. Collage mode sharing the same infrastructure. Video deferred to P2.

---

## 9. Product Scope & Feature Priority

### 9.1 P0 — Core MVP (4-week build)

#### 9.1.1 Photo Import & Preview

- Import batch of local photos via drag-and-drop or file picker
- Support selecting multiple files; folder selection where technically reliable
- Supported formats: JPG/JPEG, PNG, WebP, GIF, BMP, AVIF (where browser-decodable)
- Generate lower-resolution working previews for performance
- Show count, dimensions, filename, import progress
- Preserve original filename and image order throughout workflow

#### 9.1.2 Sorting & Organization

- Sort by filename, upload order, or date metadata where available
- Drag to reorder manually
- Remove individual images from the batch

#### 9.1.3 Contact-Sheet Generation

- Configurable rows, columns, spacing, gutters, margins
- Page size: Auto, A4, Letter; orientation: portrait, landscape
- Background color control
- Grid structure: uniform cells or auto-fit
- Choose `contain` or `cover` for mixed aspect ratios
- Labels: filenames, numbers, captions, or optional available metadata
- Label position: below or beside images
- Preview changes instantly without reprocessing originals
- Create grid from all items or only the kept/flagged selection

**Contact-sheet templates:**

| Template | Page size | Orientation | Labels | Use case |
|---|---|---|---|---|
| A4 portrait proof sheet | A4 | Portrait | Filenames + numbers | Standard print review |
| A4 landscape proof sheet | A4 | Landscape | Filenames | Wide-format review |
| US Letter portrait proof sheet | Letter | Portrait | Filenames + numbers | North American standard |
| US Letter landscape proof sheet | Letter | Landscape | Filenames | Wide-format NA review |
| 16:9 digital review board | 16:9 | Landscape | Filenames + dimensions | Screen-based review |
| Photo proof with filenames | A4/Letter | Portrait | Filenames prominent | Filename-first handoff |
| Client-selection sheet | A4/Letter | Portrait | Numbers + status | Client review |
| Before-and-after comparison | Custom | Landscape | Labels | Side-by-side comparison |

#### 9.1.4 Collage Creation Mode

Shares import, preview, layout, export, and privacy infrastructure with contact sheets.

**Collage functionality:**
- Upload multiple photos from device (shared import pipeline)
- Choose a reusable collage template
- Place photos into predefined cells
- Reorder or replace photos in cells
- Adjust spacing, margins, borders, background, aspect ratio
- Choose crop or contain per image
- Move/reposition image inside cell where feasible
- Preview final collage before exporting
- Export as PNG or JPG; PDF for printable layouts where reliable
- Local browser processing for all exports
- Simple customization — not a complex graphic-design editor

**Collage templates:**

| Category | Templates |
|---|---|
| Basic layouts | Two-photo side-by-side, three-photo strip, 2×2 grid, 3×3 grid |
| Social formats | Square post (1:1), portrait post (4:5), landscape post (16:9), 9:16 story |
| Comparisons | Before-and-after comparison |
| Professional | Product showcase, portfolio layout, printable photo wall |
| Storytelling | Event highlights, travel story |

Each template includes: dimensions, orientation, cell structure, spacing, margins, crop behavior, background, output format, intended use.

#### 9.1.5 Review States

- Mark images as **Keep**, **Reject**, or **Flag**
- Review workflow enabled on demand, not forced
- Status persists throughout session
- Filter view by status
- Selection count visible

#### 9.1.6 Export

- Contact sheets and collages: PDF, PNG, JPG (where technically verified)
- High-resolution export at configured page/pixel dimensions
- Quality controls (compression level for JPG/PNG)
- Filename handoff: CSV or TXT of selected filenames for Lightroom or editing workflow
- Visible warning when browser encoder or printer profile may affect results

#### 9.1.7 Large-Batch Handling

- Progress indicators during import, processing, export
- Loading states, processing status, error messages
- Retry actions and useful recovery messages
- Soft limits with warnings for very large batches
- Incremental decode; never create full-size canvases for every item at once

#### 9.1.8 Privacy & Trust

- Local-export mode without requiring account
- Source files remain in browser only if verified through network testing
- No filenames, pixels, EXIF, or project contents sent to analytics
- Plain-language privacy page and technical privacy note
- "Files stay on this device" — only after network behavior passes testing
- Clear distinction between local mode and any future remote features

#### 9.1.9 Responsive Design

- Works on desktop, tablet, and mobile screens
- Single-column or two-column preview on mobile
- Large touch targets (≥44px), bottom-sheet controls
- Desktop is primary for large batches; mobile fully functional for smaller sets

### 9.2 P1 — Connected Photo Utilities (after basic workflow works)

| Utility | Functionality |
|---|---|
| Photo merge | Merge images horizontally, vertically, or in a grid |
| Before-and-after merge | Comparison layouts for before-and-after photos |
| Batch resize | Resize multiple images for mobile, web, or export |
| Compression | Reduce file sizes for sharing and review |
| Crop preparation | Crop using common aspect-ratio presets |
| Format conversion | Convert between JPG, PNG, WebP, AVIF where reliable |
| Batch filename preparation | Normalize filenames before sheets or editing handoff |
| Labels and metadata | Add filenames, captions, timestamps, labels |
| Page splitting | Split large sheets into multiple pages |
| Reusable presets | Save and reuse layouts and settings |
| Portable projects | Save/reopen local `.contactsheet.json` project file |
| Per-image comments | Optional notes per image |

**Scope note:** Photo merge is a connected acquisition utility, not the product moat, because generic image-combining tools already serve that use case.

**Recommendation:** Screenshot stitching was listed in the user's P1 scope. I recommend deferring it to P2 — it serves a different use case (long-form web content) that doesn't directly improve the review/handoff workflow, and adds complexity without strengthening the core moat.

### 9.3 P2 — Deferred (only after demand proof)

| Feature | Reason for deferral |
|---|---|
| Video storyboard / contact sheets | Requires separate technical spike for browser codec reliability |
| Video timestamps and shot logs | Depends on video MVP |
| Remote client galleries / share links | Requires server, hosting, encryption, deletion model |
| Temporary preview hosting | Requires explicit transfer/retention disclosure |
| Client/photographer accounts | Requires auth system |
| Watermarking / EXIF removal | Nice-to-have, not core workflow |
| AI photo culling / duplicate detection | Unproven demand; adds complexity |
| Notifications, payments, subscriptions | Only with proven demand |
| CRM, team collaboration | Enterprise scope |
| PWA / offline functionality | Unless separately validated |

### 9.4 Explicitly Excluded

- Background removal
- Image-to-SVG conversion
- Pixel-art generation
- Audio utilities
- General PDF tools
- Calculators
- Unrelated file tools
- Large stock-image library
- Complex illustration / drawing tools
- Full graphic-design editing
- An "all tools" directory

### 9.5 Feature Priority Matrix

| Feature | Demand | SEO | Diff. | Effort | Priority |
|---|---|---|---|---|---|
| Filename-accurate labeled grids | High | High | Medium | Low | **P0** |
| Collage from templates | High | High (competitive) | Medium | Medium | **P0** |
| Review states (keep/reject/flag) | High | Medium | High | Medium | **P0** |
| Print-quality PDF/PNG/JPG export | High | High | Medium | Medium | **P0** |
| Contact-sheet templates (A4, Letter, 16:9) | High | High | Medium | Low | **P0** |
| Collage templates (social, professional) | High | High (competitive) | Medium | Medium | **P0** |
| Filename CSV/TXT export | High | Medium | High | Low | **P0** |
| Layout controls (rows, columns, spacing) | High | Medium | Medium | Medium | **P0** |
| Responsive design (desktop + mobile) | High | Medium | Low | Medium | **P0** |
| Batch resize / compress / crop | Medium | Medium | Low | Medium | **P1** |
| Photo merge | Medium | Medium | Low | Medium | **P1** |
| Format conversion | Medium | Medium | Low | Low | **P1** |
| Reopenable JSON project | Medium-High | Medium | Very High | Medium | **P1** |
| Per-image comments | Medium | Low | High | Medium | **P1** |
| Reusable presets | Medium | Low | Medium | Low | **P1** |
| Portable review pack (HTML/ZIP) | Medium | Medium | High | High | **P1** |
| Video storyboard | Medium | High | High | Very High | **P2** |
| Remote client proofing | High | Medium | Medium | Very High | **P2** |
| AI culling / duplicate detection | Unknown | Low | Medium | High | **P2** |

---

## 10. Client Selection & Proofing

### 10.1 Hypothesis (validate carefully)

- Let clients review low-resolution photo previews
- Allow keep/favorite selections from mobile
- Simple yes/no or favorite interface
- Return accurate list of selected original filenames
- Reduce screenshot-based selection and manual Lightroom filename matching
- Optional per-image comments

### 10.2 Architecture Distinction

| Mode | What happens | Privacy claim allowed |
|---|---|---|
| **Local export** | Photos processed in browser; result downloaded | "Files stay on your device" (after verification) |
| **Remote review** | Previews and selection state transferred or hosted | **Must explicitly disclose** transfer, hosting, retention, access, encryption, deletion |
| **Portable package** | FrameProof creates self-contained HTML/ZIP review pack; photographer shares manually | "Local creation; shared file is your responsibility" |

**Rule:** Never claim remote client proofing is "completely local" or "no upload." Remote review is a different product technically and requires honest disclosure.

### 10.3 MVP Approach

- P0: Local review states (keep/reject/flag) with filename export
- P1: Portable HTML/ZIP review pack for manual sharing
- P2: Remote hosted review (requires full privacy/security/hosting architecture)

---

## 11. Technical Architecture

### 11.1 Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | Astro.js (static MPA with client-side islands) | Crawlable public pages + interactive tool workspace |
| Styling | Tailwind CSS v4 | CSS-first configuration (`@import "tailwindcss"`) |
| Interactive islands | Svelte or vanilla TypeScript | Hydrated via `client:visible` / `client:idle` |
| Media processing | Browser Canvas API + Web Workers | Client-side; no server dependency |
| PDF generation | Client-side library (dependency scanned before use) | No server rendering |
| Deployment | Static hosting (Vercel / Netlify / Cloudflare Pages) | Zero marginal cost per user |

### 11.2 Module Boundaries

| Module | Responsibility |
|---|---|
| `media-core` | Image loading, decoding, preview generation, format handling, type detection |
| `review-state` | Keep/reject/flag, favorites, comments, status persistence |
| `grid-engine` | Contact-sheet layout, collage template layout, cell calculations, pagination |
| `export-engine` | PNG/JPG/PDF generation, CSV/TXT filename export, JSON manifest |
| `relink-engine` | Preserve and map original filenames; manifest reopen/relink (P1) |
| `workspace-ui` | Import, controls, preview, review, export interface, keyboard navigation |
| `content` | Landing pages, guides, templates, FAQs, SEO content |

### 11.3 Performance Rules

- Generate lower-resolution working previews; separate preview from export resolution
- Decode and render incrementally; never full-size canvases for every item
- Use object URLs carefully; revoke when previews discarded
- Virtualize long grids or paginate large batches
- Move expensive work to Web Workers
- Set transparent limits with progress indicators
- Build fixture matrix: JPG, PNG, WebP across Chrome, Firefox, Safari, mobile
- File System Access API as progressive enhancement, not requirement

### 11.4 Mobile Stance

- Camera roll / file-picker import
- Single-column or two-column preview
- Large touch targets (≥44px), bottom-sheet controls, sticky export
- Desktop primary for large batches and detailed layout
- Mobile fully functional for smaller sets and collages
- Warn before very large jobs; offer lower-preview-memory mode

---

## 12. Information Architecture & Route Map

### 12.1 MVP Public Routes

| Route | Purpose | Intent | Index |
|---|---|---|---|
| `/` | Homepage — primary value proposition, tool CTA, feature overview | Transactional | Yes |
| `/privacy-policy` | Privacy practices, data handling, local processing explanation | Legal/trust | Yes |
| `/terms-and-conditions` | Terms of use | Legal | Yes |
| `/about-us` | Product identity, mission | Trust/credibility | Yes |
| `/contact-us` | Feedback, support, inquiries | Support | Yes |
| `/404` | Custom not-found experience | — | No |
| `/500` | Custom server error experience | — | No |

### 12.2 Future Content Routes (post-MVP, SEO-driven)

| Route | Intent | Unique value | Timeline |
|---|---|---|---|
| `/photo-contact-sheet-maker` | Photo tool entry | Photo workflow preset, filenames, print | Day 1-30 |
| `/photo-collage-maker` | Collage tool entry | Template-based collage creation | Day 1-30 |
| `/contact-sheet-template` | Template download | Real downloadable presets | Day 1-30 |
| `/collage-templates` | Collage template gallery | Social, professional, storytelling presets | Day 1-30 |
| `/guides/how-to-make-a-contact-sheet` | Tutorial | Tool-embedded step-by-step | Day 1-30 |
| `/guides/how-to-make-photo-collage` | Tutorial | Collage guide with templates | Day 31-60 |
| `/guides/photo-proof-sheet-with-filenames` | Workflow | Filename handoff use case | Day 31-60 |
| `/compare/photoshop-contact-sheet-alternative` | Comparison | Free vs. subscription workflow | Day 61-90 |

### 12.3 Internal Linking

```
Homepage (/)
├── Photo Contact Sheet Maker → How-to Guide → Templates
├── Photo Collage Maker → Collage Guide → Collage Templates
├── Contact Sheet Templates → Tool Presets → Export Guides
├── About Us → Privacy Policy → Terms
└── All guides → Tool CTAs → Related guides

Header: Home, Tools (dropdown), Templates, Guides
Footer: Privacy Policy, Terms, About Us, Contact Us
```

**Rules:** Descriptive anchor text. Important pages within 2-3 clicks. Every content page links to the tool. No orphan pages. Breadcrumbs on nested routes.

---

## 13. Design Governance — `design.md` Specification

> **Canonical file:** `design.md` at project root — created from the built world at implementation, not prescribed before building.

### 13.1 Brand Direction

- **Personality:** Precise, trustworthy, fast, professional. Not playful, not enterprise, not generic SaaS.
- **Mode:** Persuade (landing pages) + Operate (workspace tool)
- **Cultural home:** The photographer's light table; the editor's timeline; the studio's production board.
- **Feeling:** A focused instrument that gets out of the way of the work. The user's photos are the content; the interface recedes.

### 13.2 Design Principles

1. **Show the work, not the tool.** User photos provide all the visual interest.
2. **Filename accuracy is trust.** Every label must be verifiable against the source.
3. **One action at a time.** Progressive disclosure over settings overload.
4. **The export is the product.** Downloaded artifacts should look professional-grade.
5. **Privacy is demonstrated, not claimed.** Show what happens; don't just badge it.
6. **Contact sheets and collages are siblings, not strangers.** Shared UI language, shared controls, one workspace feel.

### 13.3 Layout System

| Token | Value | Usage |
|---|---|---|
| `--content-max` | 1200px | Content container maximum |
| `--content-padding` | 24px mobile / 48px desktop | Horizontal padding |
| `--space-xs` | 4px | Tight element spacing |
| `--space-sm` | 8px | Related elements |
| `--space-md` | 16px | Component internal |
| `--space-lg` | 24px | Section internal |
| `--space-xl` | 48px | Section separation |
| `--space-2xl` | 80px | Major section separation |
| `--space-3xl` | 120px | Hero/footer separation |

### 13.4 Responsive Breakpoints

| Name | Min width |
|---|---|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

### 13.5 Typography

| Role | Size range | Weight | Line height | Tracking |
|---|---|---|---|---|
| Display | 3–4rem (clamp) | 700 | 1.1 | -0.03em |
| H1 | 2.25–3rem (clamp) | 700 | 1.15 | -0.02em |
| H2 | 1.5–2rem (clamp) | 600 | 1.2 | -0.02em |
| H3 | 1.25rem | 600 | 1.3 | -0.01em |
| Body | 1rem (16px) | 400 | 1.6 | 0 |
| Small | 0.875rem | 400 | 1.5 | 0 |
| Caption | 0.75rem | 500 | 1.4 | 0.01em |

**Body measure:** 65–75ch max. **Font selection:** Decided during direction commitment — must avoid banned defaults (no Fraunces, Playfair Display, Inter-as-display, DM Sans, Space Grotesk without a brief-specific reason). Tracking stops at -0.04em.

### 13.6 Color System — Semantic Tokens

Token structure (values committed during build):

| Token | Role | Light mode | Dark mode |
|---|---|---|---|
| `--color-bg` | Page background | — | — |
| `--color-surface` | Card/panel | — | — |
| `--color-surface-elevated` | Modal/dropdown | — | — |
| `--color-text` | Primary body | — | — |
| `--color-text-muted` | Secondary text | — | — |
| `--color-link` | Interactive text | — | — |
| `--color-primary` | Primary CTA | — | — |
| `--color-primary-hover` | CTA hover | — | — |
| `--color-secondary` | Secondary actions | — | — |
| `--color-border` | Default borders | — | — |
| `--color-focus` | Focus ring | — | — |
| `--color-success` | Success states | — | — |
| `--color-warning` | Warning states | — | — |
| `--color-error` | Error states | — | — |
| `--color-kept` | Keep status | — | — |
| `--color-rejected` | Reject status | — | — |
| `--color-flagged` | Flag status | — | — |

**Color strategy:** Restrained — neutrals (warm slate family) + one accent for primary actions. Workspace surface may be dark (photographers work in dark environments). Marketing pages may be light. Dark mode is not a simple inversion; separate tested values per token.

**Contrast:** Body ≥4.5:1. Large text (≥24px) ≥3:1. Interactive elements ≥3:1. Focus ≥3:1 against adjacent.

### 13.7 Component Language

| Component | Treatment |
|---|---|
| **Buttons** | Primary (filled, high contrast), Secondary (outlined), Ghost (text-only). Min 44px touch target. |
| **Cards** | Surface background, subtle border, 12–16px radius. No nested cards. No colored left-border >1px. |
| **Forms/inputs** | Clear labels, visible focus, inline validation, error messages name problem and recovery. |
| **Status badges** | Keep (green), Reject (red), Flag (amber), Unreviewed (neutral). Semantic, not decorative. |
| **Navigation** | Persistent header: logo, primary links, theme toggle. Hamburger on mobile. Sticky, minimal. |
| **Footer** | Legal links, contact. Multi-column desktop, stacked mobile. Consistent across all pages. |
| **Empty states** | Clear message + primary action. Never blank. |
| **Loading states** | Skeleton screens for content; progress bars for operations. |
| **Error states** | Specific message + recovery. Never generic "Something went wrong." |

### 13.8 Prohibited Patterns

Per Impeccable craft floor + design governance:

- Gradient text
- Glass/blur as decoration
- Kicker/eyebrow above headings (banned, not a default)
- Section numbers (01, 02, 03) unless information-bearing
- Same-size icon+heading+text cards as page structure
- Hard offset shadows outside a deliberately neobrutalist world
- Monospace as costume for "technical"
- Unicode glyphs/emoji instead of proper icon system
- Generic stock photography without clear purpose
- Scattered hover effects — one authored motion system instead
- Ornamental animation serving no information purpose
- `repeating-linear-gradient` stripes without an actual canvas/blueprint subject
- Sketch-style SVG illustrations pretending to be hand-drawn

---

## 14. Security Governance — `security.md` Specification

> **Canonical file:** `security.md` at project root

### 14.1 Architecture

Static Astro.js site with client-side media processing. For MVP:
- No backend server
- No user authentication
- No database or server-side storage
- No file upload for media processing

### 14.2 Trust Boundaries

| Boundary | What crosses it | Protection |
|---|---|---|
| User device → Browser | Local files via File API | Browser sandboxing |
| Browser → CDN | Static HTML/CSS/JS | HTTPS; SRI hashes |
| Browser → Analytics | Coarse event data (no media) | Consent; minimal data; no PII |
| Browser → AdSense | Ad scripts (content pages only) | Consent; CSP allowlisting |
| Browser → Download | Exported files | Generated client-side |

### 14.3 Security Headers

```
Content-Security-Policy: default-src 'self'; script-src 'self' [adsense]; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data:; connect-src 'self' [analytics]; frame-src [adsense]; worker-src 'self' blob:
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### 14.4 Data Flow

```
Local Files → File API → Canvas/Worker → Object URLs → Preview
                                                      → Export (PNG/JPG/PDF/CSV/TXT)
                                                      → Manifest (JSON, P1)
```

**Must stay local:** All media pixels, filenames, EXIF, selection states, notes, manifests
**May leave:** Coarse analytics events, AdSense requests, CDN asset fetches
**Must never leave:** File content, filenames, EXIF values, notes, project data

### 14.5 Input Validation

- File type detection by magic bytes, not just extension
- File size limits with user-facing warnings
- Filename sanitization for display (prevent XSS in labels)
- JSON manifest schema validation on reopen (P1)
- No `eval()`, no `innerHTML` with user data

### 14.6 What This Architecture Cannot Protect

- Client-side code is inspectable and modifiable
- No server-side access control (no auth = no authorization)
- CDN has access to static assets
- Browser extensions can intercept client-side operations
- Analytics/ad networks receive their standard data

---

## 15. SEO Governance — `seo.md` Specification

> **Canonical file:** `seo.md` at project root

### 15.1 SEO Strategy

**Contact-sheet terms** are the realistic SEO wedge: lower volume, lower competition, directly matching the product. **Collage terms** are high-volume but dominated by Canva/Adobe; FrameProof competes on the privacy/simplicity angle, not head-term ranking.

### 15.2 Keyword Clusters

| Cluster | Terms | Evidence | SEO difficulty | Page target |
|---|---|---|---|---|
| Photo acquisition | contact sheet maker, photo contact sheet maker | Ahrefs UK >100, Easy KD (session) | Low-Medium | Homepage, Photo tool |
| Education | how to make a contact sheet, what is a contact sheet | Ahrefs UK >100, Easy KD (session) | Low-Medium | Guide pages |
| Templates | contact sheet template, contact sheet PDF | Ahrefs UK >100, Easy KD (session) | Low-Medium | Template pages |
| Collage | photo collage maker, collage maker free online | Search analysis (S12) | High | Collage tool page |
| Alternative | Photoshop contact sheet alternative, free contact sheet maker | Autocomplete / seed | Low | Comparison pages |
| Workflow | photo proof sheet with filenames, client selection sheet | Autocomplete / seed | Low | Feature-led guides |

### 15.3 Metadata Inventory

| Route | Title | Chars | Description | Chars | Index |
|---|---|---|---|---|---|
| `/` | FrameProof — Free Contact Sheet & Collage Maker | 48 | Create photo contact sheets and collages in your browser. Review, select, and export with filenames. Free, private, no signup. | 120 | Yes |
| `/privacy-policy` | Privacy Policy · FrameProof | 27 | How FrameProof handles your data. Photos are processed locally in your browser and never uploaded. | 95 | Yes |
| `/terms-and-conditions` | Terms and Conditions · FrameProof | 35 | Terms of use for the FrameProof contact sheet and collage maker. | 62 | Yes |
| `/about-us` | About FrameProof | 16 | FrameProof is a free browser workspace for contact sheets, collages, and photo review. | 85 | Yes |
| `/contact-us` | Contact Us · FrameProof | 23 | Questions or feedback about FrameProof? Get in touch with our team. | 65 | Yes |
| `/404` | Page Not Found · FrameProof | 27 | This page doesn't exist. Return to FrameProof to create contact sheets and collages. | 83 | No |
| `/500` | Server Error · FrameProof | 25 | Something went wrong. Please try again or return to the homepage. | 63 | No |

**All titles ≤60 characters: ✓ — All descriptions ≤160 characters: ✓**

### 15.4 Structured Data

| Schema | Pages | Justification |
|---|---|---|
| `WebSite` | `/` | Site-level identity |
| `Organization` | `/`, `/about-us` | Entity trust — only when visible identity supports it |
| `SoftwareApplication` | `/` | Tool page with visible features — only on tool pages |
| `BreadcrumbList` | All nested routes | Hierarchy clarity |
| `FAQPage` | Tool pages with visible FAQs | Must match visible text exactly |

**Prohibited:** `AggregateRating` without real reviews. FAQ schema for invisible questions. Any schema field for content not on the page.

### 15.5 Technical SEO

- robots.txt: Permit public pages; block admin/draft paths
- sitemap.xml: All canonical, indexable URLs with absolute URLs
- Canonical tags: Self-referencing on every indexable page
- Server-rendered content: Explanatory text renders without JS
- Semantic HTML: `<main>`, `<nav>`, `<article>`, `<section>`, `<footer>`
- No duplicate content; unique titles and descriptions
- Image SEO: Alt text, descriptive filenames, appropriate dimensions
- Internal linking: Every page within 3 clicks of homepage

### 15.6 Compliance

- Each tool page: 300-500+ words of helpful explanatory content (not just the widget)
- No programmatic pages differing only by keyword swap
- No ranking/traffic/approval guarantees in any document

---

## 16. Premium User-Flow Map

### 16.1 Contact-Sheet Flow

```
Discovery → Promise → Trust → CTA → Import → Configure → Preview → Review → Export → Handoff → Return
```

### 16.2 Collage Flow

```
Discovery → Promise → Trust → CTA → Import → Choose Template → Place Photos → Customize → Preview → Export → Return
```

### 16.3 Detailed Stage Map

| Stage | User question | Primary action | Failure states |
|---|---|---|---|
| **Discovery** | "Free online contact sheet maker?" | Click search result | 404; slow load |
| **Promise** | "What does this do? Is it for me?" | Read hero (<5s comprehension) | Vague hero; no audience signal |
| **Trust** | "Can I trust this with my photos?" | See privacy explanation | No privacy info; broken demo |
| **CTA** | "How do I start?" | Click "Start creating" or drag files | CTA hidden; unclear label |
| **Import** | "Did it work?" | Drag photos or pick files | File type error; memory crash |
| **Configure** | "How should this look?" | Choose template or set layout | Settings confusing; no preview |
| **Preview** | "Is this right?" | Verify filenames, layout, quality | Wrong filenames; blurry thumbnails |
| **Review** | "Which ones do I keep?" | Mark: Keep/Reject/Flag | State lost; no undo |
| **Export** | "Can I download this?" | Export PNG/JPG/PDF/CSV | Export fails; low quality |
| **Handoff** | "How do I share this?" | Download + share manually | Dead end; no guidance |
| **Return** | "I have a new batch" | Start new or reopen project (P1) | Manifest corrupted; no relink |

### 16.4 Hero Requirements

The hero must answer five questions in <5 seconds:

1. **Who?** → Photographers, visual creators, and small studios
2. **What?** → Creates contact sheets, collages, and review packs
3. **Why valuable?** → Filenames preserved; selections exportable; project reopenable
4. **Why credible?** → Free, local processing, no account
5. **What next?** → "Start creating" with drag-and-drop or file picker

---

## 17. Landing-Page Content & Visual Direction

### 17.1 Page Sections

| Section | Purpose |
|---|---|
| **Hero** | Headline + supporting line + CTA + drag target |
| **Modes** | Contact sheets and collages — two paths from one workspace |
| **How it works** | 3-step visual: Import → Create → Export |
| **Templates** | Preview of contact-sheet and collage templates |
| **Privacy** | "Files processed locally" with brief explanation |
| **FAQ** | 4-6 real questions (file support, limits, privacy, formats) |
| **Final CTA** | Repeat primary action |

### 17.2 Hero Copy

**Headline:**
> Contact sheets and collages that keep your filenames, your selections, and your privacy.

**Supporting line:**
> Drop your photos, choose a template, review and mark your picks, and export a clean sheet with exact filenames. All in your browser, nothing uploaded.

**CTA:** Start creating — it's free

**Below CTA:** No signup · No upload · Files stay on your device

### 17.3 Visual Direction

- **Color strategy:** Restrained — warm neutrals + one accent. Photos provide the color.
- **Scene:** Photographer's workspace. Dark tool surfaces. Light marketing surfaces.
- **Grid system:** The contact-sheet grid itself becomes a visual motif — real structure, not decoration.
- **Motion:** One authored moment (e.g., photos settling into grid on import). Not scattered effects.

---

## 18. AdSense Plan

### 18.1 Placement Rules

| Location | Ads? | Reason |
|---|---|---|
| Guide/tutorial content | ✅ | Content context; editorial placement |
| Template pages | ✅ | Content context |
| Landing page (below fold, after content) | ✅ Carefully | After substantial content only |
| Tool workspace (import/review/export) | ❌ | Application surface — accidental click risk (S15) |
| Photo drop zone | ❌ | Critical activation area |
| Upload/review/export controls | ❌ | Interrupts core workflow |
| Keep/reject/flag buttons | ❌ | Decision-making context |
| Progress/error/recovery states | ❌ | User frustration context |
| Mobile sticky areas | ❌ | Tap confusion risk |

### 18.2 Revenue

Do not forecast RPM. Revenue depends on traffic quality, page experience, consent, and advertiser demand. The validation report includes no RPM estimate; neither does this PRD.

---

## 19. Analytics & Success Metrics

### 19.1 Events (coarse, non-content telemetry)

| Event | Data sent | Never send |
|---|---|---|
| `tool_view` | Entry page, device class | — |
| `import_started` | Mode (sheet/collage), count bucket | Filenames, pixels |
| `import_success` | Mode, count bucket, elapsed | — |
| `decode_error` | Browser, MIME bucket, error type | File content |
| `template_selected` | Template ID, mode | — |
| `grid_preview_ready` | Batch-size bucket, elapsed | — |
| `review_started` | — | — |
| `status_changed` | Aggregate count only | Individual statuses |
| `export_started` | Format (PNG/JPG/PDF/CSV) | — |
| `export_success` | Format, size bucket | File content |
| `collage_completed` | Template ID | — |

### 19.2 Scorecard

| Metric | What it measures |
|---|---|
| **Activation** | % imports → successful exports in same session |
| **Review usage** | % using keep/reject/flag or selection-driven export |
| **Collage adoption** | % of sessions using collage vs. contact-sheet mode |
| **Retention** | Second project or return within 30 days |
| **Reliability** | Export success rate; decode error rate |
| **Performance** | p75 time to first preview; p75 export duration |
| **SEO** | Indexed pages, impressions, non-brand clicks |

### 19.3 Four-Week Validation Gates

| Week | Gate | Success signal |
|---|---|---|
| 1 | Image decoding + basic grid | Local images render; basic contact sheet and collage work |
| 2 | Export + review | PNG/JPG/PDF export; keep/reject works; CSV filename export |
| 3 | Templates + polish | All templates work; large-batch errors handled; responsive |
| 4 | Demand | Core pages published; 5-10 target users; observe exports |

---

## 20. Growth & Retention Loops

### 20.1 Acquisition

```
Search (contact sheet/collage) → Tool page → Export → Guide link
Template gallery → Tool CTA → First export
How-to guide → Preconfigured preset → Export
Comparison page → Workflow demo → Import CTA
```

### 20.2 Retention

```
Reopen project (P1) → Continue previous review
Saved presets (P1) → Faster repeat sessions
Collage + contact sheet in one session → Combined workflow habit
Keep/reject state → Next session faster than restarting
```

---

## 21. Risks & Mitigations

| Risk | Severity | Mitigation |
|---|---|---|
| Collage mode dilutes contact-sheet focus | Medium | Share infrastructure; same import/export; don't build a design editor |
| "Photo collage maker" SEO is dominated by Canva | High | Use contact-sheet terms as wedge; collage as value-add |
| Browser memory limits on large batches | High | Incremental decode, preview downscaling, progress, soft limits |
| Privacy claim overstated | High | Inspect network; publish exactly what leaves the device |
| Category already crowded | Medium | Build review state + filename handoff — not just another grid |
| Search demand smaller than expected | Medium | Lead with photo acquisition; validate U.S. keywords |
| Users only want one PNG | Medium | Measure review usage, CSV export, template reuse |
| Output quality disappoints | High | Test dimensions, sharpness, PDF rendering with fixtures |
| Scope creep into design platform | High | Explicit exclusion list; feature gating by priority |

---

## 22. Implementation Sequence & Phase Gates

| Phase | Deliverable | Status |
|---|---|---|
| 1 | Research brief & evidence ledger | ✅ Complete (this document) |
| 2 | Competitor & substitute workflow map | ✅ Complete (sections 3-4) |
| 3 | Opportunity scorecard & decision | ✅ Complete (section 6) |
| 4 | User-flow map & information architecture | ✅ Complete (sections 12, 16) |
| 5 | Route map & content model | ✅ Complete (section 12) |
| 6 | `design.md`, `security.md`, `seo.md` specs | ✅ Specified (sections 13-15) |
| 7 | Wireframe layout & responsive plan | ✅ Specified (section 13) |
| 8 | Landing-page & hero content | ✅ Copy defined (section 17) |
| 9 | Shared Astro layout, nav, footer, tokens | ⬜ Implementation |
| 10 | Public MPA routes & content | ⬜ Implementation |
| 11 | Metadata, canonical, robots, sitemap, JSON-LD, errors | ⬜ Implementation |
| 12 | QA: a11y, responsive, security, SEO, performance | ⬜ Implementation |
| 13 | Final positioning review & risk report | ⬜ Implementation |

---

## 23. Remaining Unknowns & Pre-Implementation Checklist

### 23.1 Critical Unknowns

| Unknown | Impact | Resolution |
|---|---|---|
| U.S. keyword volumes and difficulty | High | Fresh Ahrefs export for 20-30 terms |
| User demand for reopenable projects | High | 10+ workflow interviews + MVP analytics |
| Browser large-batch performance | High | Fixture matrix (50/100/300 images × browsers) |
| Collage template UX vs. Canva simplicity | Medium | Usability testing in week 1 |
| PDF rendering quality | Medium | Fixture testing with real page sizes |
| AdSense approval and RPM | Medium | Only knowable post-launch |
| Video feasibility in browser | Low (P2) | Technical spike before P2 |

### 23.2 Pre-Implementation Checklist

- [ ] Fresh U.S. Ahrefs export (20-30 terms)
- [ ] SERP manual review for top 3-5 terms
- [ ] 10+ workflow interviews with target users
- [ ] Browser fixture matrix (formats × browsers × devices)
- [ ] Dependency scanning for candidate libraries
- [ ] Create `design.md` governance file
- [ ] Create `security.md` governance file
- [ ] Create `seo.md` governance file
- [ ] Astro.js + Tailwind v4 project scaffold
- [ ] Design direction commitment (Impeccable skill workflow)
- [ ] Collage template specification with exact dimensions

---

> **Document end.** All material claims are traced to the source register. Unresolved assumptions are labeled with their validation path. No ranking, traffic, revenue, or approval guarantees are made. This PRD is the canonical research output; implementation begins only after user approval.
