# Contact Sheet Micro-SaaS Strategy

**Working name:** FrameProof  
**Decision date:** August 25, 2026  
**Primary market:** English-language search, with the United States as the first validation market  
**Business model:** Free browser utility, AdSense on supporting content, optional paid expansion only after repeat use is proven

## Executive decision

**Go, but only as a four-week build-to-validate MVP.** Do not promise that the product will rank, defeat every competitor, or earn a particular AdSense RPM. The evidence supports a cheap, testable opportunity; it does not support a traffic or revenue guarantee.

The best opportunity is not another generic thumbnail grid. It is:

> **A private, browser-based review desk that turns a mixed folder of photos and videos into a filename-accurate contact sheet, client selection record, shot log, and reopenable project.**

The grid generator is a core feature, not a separate product. It is the visible entry point. The durable layer is the review state that survives export and can be reopened later.

## What the validation report proves

The supplied `final-contact-sheet-validation-report.pdf` is dated August 25, 2026 and recommends a combined photo-plus-video MVP. Its strongest findings are:

- Photo intent is the best observed acquisition signal. The supplied Ahrefs session showed `contact sheet maker`, `contact sheet photography`, `how to make a contact sheet`, `what is a contact sheet`, and `contact sheet template` above 100 monthly searches in the UK with Easy KD.
- Video intent is smaller but more defensible. The same session showed six video-contact-sheet phrases below 100 searches with KD shown as N/A; a US check for `video contact sheet maker` also showed below 100 with KD N/A.
- The category is not empty. Photo tools are strong at grids, labels, and print output; video tools are strong at frame extraction and storyboards; MoviePrint is strong at desktop analysis and archiving; hosted tools are strong at client proofing.
- Privacy and local processing are already common claims. They improve trust and conversion, but they are not a moat by themselves.
- A static tool is cheap to launch. Client-side processing and exports avoid an upload bucket, server-side media processing, and a required account system.

**Evidence boundary:** the Ahrefs figures above are session observations, not a downloadable current export. They are useful for prioritization, not a forecast. The report explicitly says that no traffic forecast, revenue forecast, or RPM ranking is justified yet.

## Biggest opportunity gap

### The gap to own

**Selection-driven, mixed-media review that remains editable and reopenable, then exports a clean handoff pack with exact source identity.**

Most observed tools solve one part of the job:

| Competitor or workaround | Strong at | Gap to test |
|---|---|---|
| ContactSheetMaker | Photo grids, filenames, PDF, saved projects, client proofing | The cited page does not present a unified local photo-plus-video review project |
| Vizua | Fast local raster sheet for 2-50 JPG/PNG/WebP files | Photo-only, raster-first workflow; no visible video review or shot log on the cited page |
| ImgTweak | Local photo proof sheets, filenames, numbers, A4 and Letter presets | The opening is mixed-media review and structured handoff, not another photo grid |
| Cutsio | Local video storyboard, timestamps, no signup, JPEG export | Needs to be beaten on continuity, multi-file review, notes, and project reopening |
| TheFluxTrain | Exact frame, multiple frames, thumbnail, storyboard, ZIP and timestamps | Frame extraction is not the same as a persistent decision and handoff workflow |
| UtilityCove | Simple local video strip with frame-count and column controls | No visible review state, notes, selection record, or multi-format evidence pack |
| MoviePrint | Deep desktop shot analysis, scene refinement, selection, reimport | Install friction; opportunity for a no-install browser handoff pack |
| Photoshop, Lightroom, Bridge, Canva | Familiar editing and layout workflows | Setup complexity, paid software, or no single-purpose review flow |

These are source-page observations, not proof that a competitor lacks every unlisted feature. The honest positioning is not “nobody has this.” It is “the category is fragmented, and the product will join the highest-value steps into one local workflow.”

### Why this gap can compound

The user is not only downloading a PNG. They are making decisions:

1. Ingest a folder or mixed batch.
2. Generate a layout-first grid.
3. Keep, reject, flag, reorder, or group items.
4. Preserve filename, dimensions, capture date where available, duration, frame number, and timecode.
5. Export a visual sheet plus structured metadata.
6. Reopen the project later and relink local files if paths changed.

That review state creates a repeat habit. A different color palette or a “no upload” label does not.

## Primary positioning

**Short promise:** Review private photos and videos quickly, keep every filename and timestamp attached, and export a clean review pack without uploading the files.

**Homepage headline:** Make a contact sheet that keeps the decisions, not just the thumbnails.

**Supporting line:** Build a labeled photo grid or timestamped video storyboard in your browser. Mark selections, export PDF/PNG/JPG plus a shot log, and reopen the project later.

**What not to say:** “The best contact sheet maker,” “guaranteed rankings,” “100% private” before network behavior is independently checked, or “the only tool with...” unless that claim is verified.

## Target users and first wedge

### Primary users

1. **Part-time, event, and portrait photographers** - need to scan a large shoot, make a proof sheet, preserve filenames, and send a client-selectable review artifact without buying a larger proofing platform.
2. **Freelance photographers and small studios** - need repeatable print and client-review presets, quick keep/reject decisions, and a clean handoff to a client or editor.
3. **Freelance video editors and small production teams** - need to see a clip or batch of clips at a glance, choose frames, preserve timecodes, and create a shot log.
4. **Photography students and hobbyists** - need a low-friction way to compare, print, archive, and explain a photo set.

### First wedge

Start with **photo proof sheets plus persistent selection and exact filename output**. Use video as the differentiator and second entry point, not as the only acquisition channel.

The first user question should be answered in seconds:

> “Can I drop in my files, see a useful grid immediately, mark the ones I want, and export something I can hand to someone else?”

## Product scope

### P0: the smallest useful product

#### Grid generator - core, not a later module

The grid generator should be layout-first and tightly tied to contact-sheet output:

- Choose columns or use smart auto-fit.
- Set page size: auto, A4, Letter, portrait, landscape, 16:9.
- Set padding, cell spacing, background, label position, and label size.
- Choose `contain` or `cover` behavior for mixed aspect ratios.
- Preserve source order, sort by filename/date/dimensions, or drag to reorder.
- Toggle filename, number, dimensions, and optional timestamp labels.
- Preview changes instantly without reprocessing the original files.
- Create a grid from all items or only the kept/flagged selection.
- Export high-resolution PNG, JPG, and print-oriented PDF.

The grid is the narrow answer to “make a contact sheet.” Do not turn it into a general collage designer. No stickers, freeform Canva-style composition, or full photo editor in the MVP.

#### Photo workflow

- Drag-and-drop or file-picker import for multiple images.
- Support common browser-decodable formats first: JPG/JPEG, PNG, WebP, GIF, BMP, and AVIF where tested.
- Show count, dimensions, filename, and a clear import-progress state.
- Sort, reorder, remove, keep, reject, and flag.
- Batch rotate and a simple fit/crop choice; defer deep retouching.
- Export PNG, JPG, PDF, and a JSON project manifest.

#### Video workflow

- Import one or more local videos that the current browser can decode.
- Sample by fixed frame count or time interval.
- Show source filename and timecode on every frame.
- Group frames by source video.
- Keep, reject, remove, reorder, and export a timestamped storyboard.
- Export CSV/TSV shot log with stable columns: source, timecode, frame number, status, notes, dimensions.

#### Reopenable project

Export a small `.contactsheet.json` manifest containing:

- Schema version.
- Project name and creation/update timestamps.
- Source filename, relative path when available, file size, MIME type, dimensions, duration, and optional hash.
- Sampling settings and layout settings.
- Item order and status: unreviewed, kept, rejected, flagged.
- Notes and tags when the notes UI ships.
- Export preferences.

On reopen, the app should relink by available file identity signals and give a clear manual relink path when a file moved. Do not pretend that a browser can retain unrestricted filesystem access across every browser. Treat the manifest as the portable fallback.

#### Privacy and trust surface

- Explain exactly what happens: media decoding and export are intended to occur in the browser.
- Show a visible “Files stay on this device” status only after network behavior is tested.
- Do not send filenames, image pixels, video frames, EXIF values, or project contents to analytics.
- Publish a plain-language privacy page and a technical privacy note.
- Add a “works offline after initial load” test only if the service worker and asset caching actually pass.

### P1: make it a repeat workflow

- Per-item notes, tags, and status filters.
- Multi-file video batches with source grouping.
- Self-contained HTML review pack with embedded or linked previews and metadata.
- ZIP export of selected frames.
- Exact timestamp capture and near-frame stepping where browser decoding allows it.
- Saved local presets for portrait proof sheets, event selects, A4, Letter, landscape, and 16:9 storyboards.
- Selection-only merge or comparison strips, plus batch resize/compress/crop when they directly improve review handoff.
- PWA install and recent local projects.
- Better mobile touch controls and single-column review mode.

### P2: only after usage proves demand

- Scene-boundary suggestions.
- Duplicate or near-duplicate suppression.
- Optional local AI labels or handoff summaries.
- Public or private cloud sharing.
- Client proofing links backed by a server.
- Editing-workflow plugin or import/export schema integrations.

### Feature-gap ranking

Scores are prioritization judgments, not market measurements. Demand means likely usefulness to the target job; SEO means how directly the feature supports a distinct search intent; effort is relative for an Astro/TypeScript browser build.

| Feature | Demand | SEO | Differentiation | Effort | Decision |
|---|---:|---:|---:|---:|---|
| Filename-accurate labeled grids | High | High | High | Medium | P0 |
| Selection-driven grid from kept items | High | Medium | High | Medium | P0 |
| Reopenable local project manifest | Medium/High | Medium | Very high | Medium | P0 |
| Print-quality PDF, PNG, JPG | High | High | Medium | Medium | P0 |
| Layout-first grid with auto-fit | High | High | Medium | Low/Medium | P0 |
| Video storyboard with timestamps | Medium | Medium | High | High | P0, constrained |
| CSV/TSV shot log | Medium | Medium | High | Low/Medium | P0 |
| Notes, tags, status filters | Medium/High | Low/Medium | High | Medium | P1 |
| Batch rotate/crop/resize/compress | Medium | Medium | Low | High | P1, only if it supports the review job |
| Self-contained HTML review pack | Medium | Medium | High | Medium/High | P1 |
| Cloud client proofing | High | Medium | Medium | Very high | P2 |
| Local AI labels | Unknown | Low | Medium | High | P2 |

## Technical approach

### Recommended architecture

Use an Astro site with a client-side app island for the workspace and static, indexable content pages around it. Keep media processing in browser workers where practical.

Suggested boundaries:

- `media-core`: file intake, type detection, metadata extraction, image/video sampling.
- `review-state`: item identity, ordering, statuses, notes, tags, source grouping.
- `grid-engine`: layout calculation, labels, fit/crop, pagination, output dimensions.
- `export-engine`: PNG/JPG/PDF, CSV/TSV, JSON manifest, later HTML/ZIP.
- `relink-engine`: manifest matching and manual relink flow.
- `workspace-ui`: import, grid preview, review controls, keyboard shortcuts, export drawer.
- `content`: SEO pages, guides, templates, comparisons, FAQ blocks, schema.

### Performance rules

- Decode and render incrementally; do not create full-size canvases for every item at once.
- Use object URLs carefully and revoke them when previews are discarded.
- Keep preview resolution separate from export resolution.
- Virtualize long grids or paginate large batches.
- Move expensive work off the main thread when browser support allows it.
- Set transparent limits and show progress for large jobs rather than freezing the UI.
- Build a fixture matrix for JPG, PNG, WebP, MOV, MP4, and WebM across Chrome and Firefox first; test Safari and mobile before claiming support.
- Use WebCodecs or File System Access APIs as progressive enhancements, not as hard requirements. Browser support and permission behavior must be checked on the target versions.

### Mobile stance

Make mobile friendly, not falsely feature-identical:

- Support camera roll/file-picker import and a single-column or two-column preview.
- Use large touch targets, bottom-sheet controls, and sticky export actions.
- Preserve the manifest and selection workflow on mobile.
- Warn before very large jobs and offer a lower-preview-memory mode.
- Treat desktop as the primary surface for large folders, detailed ordering, and video review until device testing proves more.

## SEO strategy

### Primary keyword recommendation

**Primary acquisition term:** `contact sheet maker`

Why this is the best lead:

- The supplied Ahrefs session observed it above 100 monthly searches in the UK with Easy KD.
- It matches the product category directly and can support both photo and video entry points.
- Google autocomplete expanded it into `free`, `online`, `Photoshop`, `Canva`, `app`, `photography`, `free download`, and `Mac`, which reveals useful modifiers.

**Important:** no exact volume, US KD, or current US SERP ownership was provided. Treat this as the best observed hypothesis, not a verified “high-volume, low-difficulty” US keyword.

### Supporting keyword cluster

The ranges below are exactly what the supplied report supports. “>100” and “<100” are observed ranges, not exact monthly volumes.

| Cluster | Example terms | Observed range | Evidence status | Page/use |
|---|---|---|---|---|
| Photo acquisition | `contact sheet maker`, `contact sheet photography`, `how to make a contact sheet`, `what is a contact sheet`, `contact sheet template` | >100 UK; Easy KD shown | Ahrefs session observation | Hub, photo tool, guide, definition, template |
| Video wedge | `video contact sheet`, `video contact sheet generator`, `video contact sheet maker`, `video contact sheet Photoshop`, `YouTube video contact sheet`, `video contact sheet Windows` | <100 UK; KD N/A | Ahrefs session observation | Video tool and workflow guides |
| US video check | `video contact sheet maker` | <100 US; KD N/A | Ahrefs session observation | Supporting landing page, not the acquisition forecast |
| Photo modifiers | `photo contact sheet maker free`, `contact sheet PDF`, `photo proof sheet with filenames`, `contact sheet from folder images`, `how to print contact sheet of photos` | No numeric range in supplied evidence | Autocomplete/seed only | Use only when page has unique workflow/value |
| Video problem language | `make a thumbnail sheet from a video`, `see all video frames at once`, `review video footage quickly`, `extract frames from MP4 without uploading`, `video shot log` | No numeric range in supplied evidence | Autocomplete/seed only | Guides and feature-led pages |
| Comparison intent | `MoviePrint alternative`, `MoviePrint online alternative`, `contact sheet maker Photoshop alternative`, `best video contact sheet generator` | No numeric range in supplied evidence | Seed only | Comparison pages after product works |

### Site architecture

Launch a small set of pages with distinct intent:

- `/contact-sheet-maker/` - canonical hub and tool entry point.
- `/photo-contact-sheet-maker/` - photos, filenames, proof sheets, print, PDF/PNG/JPG.
- `/video-contact-sheet-maker/` - frames, timestamps, storyboard, shot log.
- `/contact-sheet-from-video/` - only if it answers a materially different job from the video page.
- `/guides/how-to-make-a-contact-sheet-from-photos/`.
- `/guides/how-to-make-a-contact-sheet-from-video/`.
- `/guides/how-to-create-a-shot-log-from-rushes/`.
- `/templates/contact-sheet-a4/`, `/templates/contact-sheet-letter/`, `/templates/video-storyboard/`.
- `/compare/movieprint-alternative/` and `/compare/photoshop-contact-sheet-alternative/` only after the product genuinely supports the comparison.

Do not generate pages for every file extension, synonym, city, or operating system. Google Search Central warns against scaled, low-value content and doorway-style pages. Each page needs a distinct job, a working or relevant artifact, and original explanation.

### First 90-day content plan

**Days 1-30: prove the tool and earn the first impressions**

- Contact sheet maker hub.
- Photo contact sheet maker.
- Video contact sheet maker.
- How to make a contact sheet from photos.
- Contact sheet template for A4 and Letter.
- Contact sheet PDF export guide.

**Days 31-60: capture problem-shaped searches**

- How to make a contact sheet from a video.
- How to extract frames from MP4 without uploading it.
- How to create a shot log from rushes.
- Photo proof sheet with filenames.
- Select a YouTube thumbnail from a video.
- Video storyboard versus contact sheet.

**Days 61-90: capture comparison and repeat workflows**

- MoviePrint alternative: desktop versus browser workflow.
- Photoshop contact sheet alternative.
- Contact sheet from a folder of images.
- Video thumbnail sheet for client review.
- Printable photo proof sheet templates.
- Reopenable contact-sheet project format guide.

Every page should show the tool, explain a real workflow, include an original example or template, link to one related page, and make the output clear before asking for an import.

### On-page and structured data

- Server-render the explanatory content and primary headings so the page is useful before the app island loads.
- Use one descriptive title and meta description per intent page.
- Add canonical URLs, Open Graph images, sitemap, robots.txt, and clean internal links.
- Use `SoftwareApplication` or `WebApplication` structured data for the tool page only where the visible page supports the claims.
- Use `BreadcrumbList` on nested guides, templates, and comparison pages.
- Use `FAQPage` only for visible, genuinely answered FAQs; never add hidden or invented questions for markup.
- Use `HowTo` only when the page contains an actual step-by-step procedure and the markup remains eligible under current Google guidance.
- Add `Organization` and `WebSite` data at the site level when the visible identity supports it.
- Validate JSON-LD and Search Console coverage; structured data may help Google understand a page but does not guarantee a rich result or ranking.

## Growth and retention loops

### Acquisition loops

- Search page -> tool -> export -> guide/template link.
- Free A4/Letter and storyboard templates -> tool CTA -> downloadable artifact.
- How-to guides -> preconfigured preset -> first export.
- Comparison pages -> workflow demo -> local/privacy proof -> import.
- Shareable example sheets and shot-log templates -> backlinks and direct visits.

### Retention loops

- Reopen the manifest later and continue the same selection.
- Save local presets for recurring client or studio formats.
- Export a visual sheet and a structured CSV/JSON pack together.
- Keep/reject/filter state makes the next session faster than starting over.
- Optional recent-project list stored locally; do not require accounts for the MVP.
- A self-contained HTML review pack gives users a handoff artifact they can keep and revisit.

### Product-led distribution

Use an unobtrusive “Made with FrameProof” line only where it helps sharing, such as the optional HTML review pack. Do not watermark PNG/PDF exports by default if the promise is high-quality, client-ready output. If attribution is tested, make it an explicit user choice.

## AdSense plan and constraints

### Recommendation

**Put AdSense on content pages, not inside the core workspace.** The first job of the product is activation and trust. Ads beside a file drop zone, review controls, export buttons, or mobile sticky actions create both UX risk and accidental-click risk.

### Safe starting inventory

- One responsive unit after the introductory explanation on long guides.
- One in-content unit after a meaningful section on templates and comparisons.
- One end-of-content unit before related guides.
- No ads between file selection and first preview.
- No ads inside processing progress, selection controls, export drawer, or error states.
- Do not use labels or copy that ask users to click ads or imply that clicks support the tool.
- Test mobile layout shift and tap confusion before expanding inventory.

Google AdSense policy guidance specifically warns about accidental clicks and placing ads near navigation, buttons, drop-downs, video players, and applications. The workspace should therefore be treated as an application surface, not an ad slot.

### Revenue expectations

Do not forecast RPM until there is first-party data. Revenue depends on country mix, page type, traffic quality, viewability, consent, seasonality, and advertiser demand. The validation report intentionally includes no RPM estimate.

If repeat use is proven, consider a later paid power pack for high-cost features such as cloud sharing or team proofing, but do not gate the P0 workflow or build a backend before user behavior justifies it.

### Consent and analytics

If serving users in regions with consent requirements, implement the applicable Google-certified consent flow before personalized advertising. Keep the privacy policy accurate about ads, analytics, code delivery, and local media processing.

## Analytics and success metrics

### Events to measure

Send only coarse, non-content telemetry. Never send filenames, hashes, EXIF, image pixels, video frames, notes, or manifest contents.

- `tool_view` with entry page and device class.
- `import_started` and `import_success` with photo/video/mixed mode and count buckets.
- `decode_error` with browser, MIME bucket, and error category.
- `grid_preview_ready` with batch-size bucket and elapsed-time bucket.
- `review_started`.
- `item_status_changed` with aggregate count only.
- `export_started` and `export_success` by format.
- `manifest_exported`, `manifest_reopened`, and `relink_success`.
- `feature_used` for notes, CSV, presets, and selection-driven export.

### Scorecard

These are provisional launch gates, not industry benchmarks:

- **Activation:** percentage of successful imports that produce a successful export in the same session.
- **Technical reliability:** export success rate for supported fixtures; decode error rate by browser and format.
- **Review value:** percentage of projects using keep/reject/flag or selection-driven export.
- **Retention:** second project, reopened manifest, or second export within 30 days.
- **Performance:** p75 time to first usable preview and p75 export duration for defined photo/video fixtures.
- **SEO:** indexed pages, impressions, non-brand clicks, query coverage, and landing-page-to-tool starts in Search Console/analytics.
- **Monetization:** content-page RPM, viewability, revenue per engaged content session, and no measurable drop in tool activation after ads are added.

### Four-week validation gates

1. **Week 1 - decoding:** local images, one video, fixed interval frames, basic grid.
2. **Week 2 - handoff:** keep/reject, order, PNG/JPG/PDF, CSV shot log.
3. **Week 3 - repeat use:** JSON manifest, reopen/relink, presets, large-file errors, offline refresh.
4. **Week 4 - demand:** publish the three core pages, recruit 5-10 target users, observe exports and repeat behavior.

The decision signal is a successful export from a real local file, followed by a second project or a clear request for a missing review feature. Signups alone are not a useful MVP signal because the product is intentionally accountless.

## Roadmap

### MVP - four weeks

- Astro shell and indexable content pages.
- Browser-local photo import and layout-first grid.
- Basic local video sampling with timestamps.
- Filename, dimensions, ordering, keep/reject/remove/reorder.
- PNG/JPG/PDF export.
- CSV/TSV video shot log.
- JSON manifest export and reopen/relink.
- Keyboard shortcuts and mobile-safe controls.
- Capability matrix and honest error states.
- Privacy page, network verification, basic aggregate analytics.

### v1 - after usage evidence

- Notes, tags, filters, source grouping.
- Multi-file video review.
- HTML review pack and selected-frame ZIP.
- Presets and recent projects.
- Better print controls, color-managed output investigation, exact timestamp stepping.
- Improved mobile review and PWA shell.

### v2 - only with proof of demand

- Scene detection and duplicate suppression.
- Optional on-device AI assistance.
- Cloud sharing, client comments, and account sync.
- Integrations and paid team workflow.

## Risks and mitigations

| Risk | Why it matters | Mitigation and gate |
|---|---|---|
| Browser codec differences | A video that plays in one browser may fail in another | Test MP4, MOV, WebM fixtures on Chrome, Firefox, Safari, and mobile; provide clear fallback |
| Memory limits on large batches | Users may drop hundreds of images or long videos | Incremental decode, preview downscaling, virtualization, progress, soft limits |
| Privacy claim is overstated | Analytics, CDN, error tools, or third-party scripts may still make network requests | Inspect network behavior and publish exactly what leaves the device |
| Category is already crowded | Generic grids are easy to copy | Build review state, manifest, handoff schema, and selection-driven export first |
| Search demand is smaller than expected | Low-volume video terms cannot carry the business alone | Lead with photo acquisition; re-run Ahrefs for US, UK, Canada, Australia, New Zealand, Germany, Switzerland, Norway, Denmark, and UAE |
| Thin programmatic SEO | Synonym pages may look manipulative or useless | Publish fewer pages with unique workflow, examples, and working output |
| AdSense harms activation | Ads can reduce trust and cause accidental clicks | Content-only placements; delay ads until activation is stable |
| Users only want one PNG | The moat may not be used | Measure notes, selection, CSV, manifest reopen, and second exports before expanding |
| Reopen/relink is confusing | Portable local files are powerful but technically subtle | Show a clear file identity model, match confidence, and manual relink UI |
| Scope creep into Canva or Lightroom | Extra utilities can consume the whole build | Add only features that improve contact-sheet review, selection, or handoff |
| Output quality disappoints | Print artifacts are judged immediately | Test dimensions, sharpness, labels, pagination, PDF rendering, and color behavior with fixtures |

## Assumptions and missing validation

The following items are intentionally unresolved:

- The supplied Ahrefs values are observations from a session, not a current export. Exact US volume and KD remain unknown.
- No live top-20 SERP ownership study was completed. Ranking difficulty cannot be inferred from autocomplete or one keyword tool view.
- Competitor features and prices are self-described page observations captured August 25, 2026. A missing feature statement is not proof of absence.
- No real AdSense RPM, revenue, or advertiser-competition number is available. Do not use a made-up range in a business forecast.
- 30-day repeat usage is not validated. The review-project moat is a hypothesis until users reopen projects or request it.
- Browser support for WebCodecs, File System Access, MOV decoding, large PDFs, and mobile memory needs fixture testing on the target browser versions.
- “Selection letter” in the original voice transcript was interpreted as the persistent selection workflow (“selection later”).
- The product is free and accountless in MVP. That reduces infrastructure cost but also limits server-side sync and direct email retention.
- The phrase “defeat every competitor” is treated as a goal for one defined workflow, not a factual claim.

## Go/no-go conclusion

**Go for the four-week MVP.** The opportunity is credible because the build is cheap, the photo search signal is the strongest observed signal, and the category is fragmented across grids, video extraction, desktop analysis, and proofing.

**Do not go as a broad photo-utility suite.** Do not start with batch rename, full crop/resize/compression, AI labels, cloud accounts, or a general collage editor. Those features can wait until users prove that a local review project and high-quality handoff pack solve a repeat problem.

The single bet worth making is:

> **A browser-first, privacy-respecting contact-sheet workspace where a user can review, select, label, reopen, and hand off private photos and videos without losing source identity.**

## Source register

### Supplied validation source

1. `final-contact-sheet-validation-report.pdf`, supplied local file, dated August 25, 2026. Used for the decision, keyword observations, competitor synthesis, four-week plan, and uncertainty boundaries.

### Competitor pages checked August 25, 2026

2. ContactSheetMaker - https://www.contactsheetmaker.com/  
3. Vizua Contact Sheet - https://vizua.io/contact-sheet/  
4. ImgTweak Contact Sheet Generator - https://imgtweak.com/contact-sheet-generator  
5. Cutsio Storyboard Generator - https://cutsio.com/storyboard-generator  
6. TheFluxTrain Video Frame Extractor - https://thefluxtrain.com/tools/video-frame-extractor/  
7. MoviePrint - https://www.movieprint.org/  
8. UtilityCove Video Thumbnail Strip Generator - https://utilitycove.org/video/video-thumbnail-strip-generator.html

### Keyword and SEO references

9. Ahrefs Keyword Generator - https://ahrefs.com/keyword-generator  
10. Google Search Central SEO Starter Guide - https://developers.google.com/search/docs/fundamentals/seo-starter-guide  
11. Google Search Central spam policies - https://developers.google.com/search/docs/essentials/spam-policies  
12. Google Search Central structured data introduction - https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data

### Monetization and platform references

13. Google AdSense ad placement policies - https://support.google.com/adsense/answer/1346295  
14. Google AdSense consent management requirements - https://support.google.com/adsense/answer/13554116  
15. MDN WebCodecs API - https://developer.mozilla.org/en-US/docs/Web/API/WebCodecs_API  
16. MDN File System Access API - https://developer.mozilla.org/en-US/docs/Web/API/File_System_API  
17. MDN `showDirectoryPicker()` - https://developer.mozilla.org/en-US/docs/Web/API/Window/showDirectoryPicker

All competitor and policy claims should be rechecked at implementation time because pages, features, pricing, browser support, and advertising requirements can change.
