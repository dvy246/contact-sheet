# Handoff Report: Competitor Survey on Web-Based Collage & Contact Sheet Tools

**Agent Folder:** `/Users/divyyadav/developer/another-tool/.agents/explorer_survey_2`  
**Target Report:** `/Users/divyyadav/developer/another-tool/.agents/explorer_survey_2/survey_web_collage.md`  
**Parent Orchestrator:** `cc48fb14-5d68-419c-b2c1-6bce1816b1a9`  
**Date:** 2026-08-28T18:20:00Z  

---

## 1. Observation

1. **Competitors Analyzed**:
   - **Canva** (Collage & Grid maker): Mandatory account login, 100% cloud upload to AWS/S3, paywalls CMYK 300 DPI PDF Print, transparent PNG, and custom resize ($120/yr); lacks automated multi-page pagination for 50+ photos; has zero automated filename extraction or EXIF support.
   - **BeFunky** (Collage Maker & Wizard): Basic editing free but locks Collage Wizard, advanced borders, and templates behind BeFunky Plus ($14.99/mo or $84/yr); caps canvas size at 4088x4088px; does not support automated contact sheet pagination or filename badges.
   - **Fotor** (Collage Maker & Stitcher): Mandatory login; enforces Fotor watermarks on free exports; gates HD/300 DPI downloads behind Pro tier ($8.99-$12.99/mo); rigid 2-16 photo grids; zero filename/EXIF extraction.
   - **Adobe Express** (Collage & Grids): Mandatory Adobe ID login; uploads to Creative Cloud (2GB free); hard limit of 9 media files in automated collage grids; lacks multi-page batch contact sheet workflows, filename display, and photo proofing triage.
   - **Free Web Utilities** (PhotoJoiner, Photovisi, ImgTweak, ImageMagick wrappers): PhotoJoiner & Photovisi add forced watermarks on free tiers; server wrappers (PineTools/Ezgif) upload images over the wire risking HTTP 413 timeouts and data privacy violations; ImgTweak is client-side but limited to a single continuous scrolling canvas without multi-page PDF document generation.

2. **MakeContactSheet.com Verified Baseline**:
   - Executes 100% client-side with zero network uploads, protecting private client shoots, boudoir, weddings, and commercial NDAs.
   - Handles 100–200+ photos via progressive batched decoding and bounded 480px thumbnail generation.
   - Generates 300 DPI multi-page print-ready PDFs with vector headers, exact mm margins, page counters, and client-side password protection.
   - Includes custom per-photo labels, batch rename recipes (`Prefix + Index + Zero Padding + Suffix`), proofing review tags (Select, Flag, Reject, Star Ratings), and structured CSV/TSV/TXT filename export.

---

## 2. Logic Chain

1. *Premise 1:* Mainstream consumer collage tools (Canva, BeFunky, Fotor, Adobe Express) are optimized for single-image social graphics (2–9 photos) and monetize via paywalls (watermarks, HD resolution caps, CMYK gating, and subscriptions).
2. *Premise 2:* Professional and prosumer photographers, film labs, and studio managers require high-volume batch processing (50–200+ images), strict data privacy (zero cloud uploads for NDAs/boudoir/commercial work), automated filename extraction, and 300 DPI multi-page PDF generation.
3. *Premise 3:* Generic collage tools cannot and will not pivot to serve this audience because their infrastructure is tied to cloud storage, cloud compute, and consumer social media templates.
4. *Deduction:* MakeContactSheet.com occupies an uncrowded, highly defensible niche by offering a fast, zero-upload, free, and privacy-first contact sheet and collage engine.
5. *Strategic Opportunity:* By adding **client-side EXIF shooting parameter badges** (Proposal 1) and a **zero-server standalone HTML client proofing portal** (Proposal 2), MakeContactSheet.com can capture high-value users migrating away from expensive cloud proofing platforms (Pixieset/ShootProof) and complex desktop software (Lightroom/Bridge).

---

## 3. Caveats

1. *Native Desktop Comparison:* This survey focused specifically on **web-based** collage and contact sheet tools. Desktop software (Adobe Bridge, Lightroom Classic, DiapoSheet, XnView MP) was referenced as workflow context but was not the primary subject of deep web-UI evaluation.
2. *Mobile App Ecosystem:* Native iOS/Android collage apps (e.g. Layout from Instagram, PicCollage) were excluded as MakeContactSheet.com is focused on browser desktop/tablet workflows.
3. *Pricing Fluidity:* Competitor pricing tiers (Canva Pro $120/yr, BeFunky Plus $84/yr, Fotor Pro $108/yr, Adobe Express $99.99/yr) are subject to regional adjustments and promotional discounts.

---

## 4. Conclusion

1. The market research for the 5 competitor categories (Canva, BeFunky, Fotor, Adobe Express, and Free Web Utilities) is complete, verified, and documented in `survey_web_collage.md`.
2. All 5 key evaluation dimensions (Onboarding/Privacy, Freemium/Watermarks, Layout/Batch Scale, Metadata/Filenames/EXIF, and Output Formats) have been systematically assessed and compiled into a detailed feature matrix.
3. Four concrete, client-side, premium feature proposals (EXIF metadata badges, Standalone HTML client proofing portal, Smart Mosaic layout engine, and Lightroom XMP sidecar exporter) have been formulated with technical specifications to establish a long-term competitive moat.

---

## 5. Verification Method

To verify the findings and deliverables:
1. Inspect the survey report at `/Users/divyyadav/developer/another-tool/.agents/explorer_survey_2/survey_web_collage.md`.
2. Confirm the presence of:
   - Exactly 5 distinct competitor profiles and the side-by-side feature matrix.
   - Comprehensive analysis of the 5 requested evaluation dimensions.
   - At least 3–4 evidence-gated premium feature proposals with technical specifications.
   - Evidence classification and citation sources.
3. Verify codebase consistency by checking that proposed features leverage existing client-side stores (`src/lib/store.ts`), layout engines (`src/lib/engine/contactSheetEngine.ts`), and exporters (`src/lib/export/`).
