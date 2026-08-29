# SEO, AEO, and GEO Launch Audit Report: Make Contact Sheet (makecontactsheet.com)

**Prepared by:** Senior SEO Grandmaster
**Date:** August 29, 2026
**Primary data sources:** Source code analysis, local build artifacts, sitemap, robots.txt, metadata configs.

## Executive Narrative

Make Contact Sheet has successfully implemented a robust, indexable, and compliant technical foundation. The codebase relies entirely on zero-upload, local-first in-browser processing, which serves as a powerful E-E-A-T trust signal (Privacy-First Principle) and a highly defensible moat against cloud-dependent competitors. 

The site clears all technical indexing gates and Search Essentials spam-policy checks. Competitors like Pixieset, CloudSpot, and ContactSheetMaker depend on server-side processing and subscription paywalls, exposing a strategic vulnerability that Make Contact Sheet exploits through its free, serverless, high-utility tools.

---

## Part 1: Sequential Launch Checklist (Phases 0-9)

| Phase | Verdict | Critical issues | Notes |
|---|---|---|---|
| 0-3 Indexing gate | **PASS** | None | Sitemap matches canonicals; robots.txt correctly allows all but legal pages; no redirects loop. |
| 4 Spam policy | **PASS** | None | No doorway pages or scaled content abuse. Tool pages offer genuine distinct functionality. |
| 5 E-E-A-T/YMYL | **PASS** | None | Clear "About Us" and contact info. The zero-upload claim is technically verifiable. |
| 6 Page experience | **PASS** | None | Zero-overhead GPU compositor animations and static Astro build ensure near-instant LCP. |
| 7 Structured data | **PASS** | None | Clean SoftwareApplication, HowTo, FAQPage, and BreadcrumbList schemas. No fabricated reviews. |
| 8 AEO | **PASS** | None | Uses `FaqAccordion` and question-based headings with concise answers. |
| 9 GEO | **PASS** | None | Unique point of view (local-first privacy) is clearly articulated. No artificial `llms.txt`. |

**`LAUNCH: PASS`**
No self-inflicted technical, spam-policy, or content-quality issue found. The repository is technically sound, indexable, and search-engine friendly. *(Disclaimer: This verdict certifies nothing self-inflicted is blocking the site — it is not, and can never honestly be, a ranking guarantee.)*

---

## Part 2: SEO Grandmaster Strategic Assessment

The site's architecture aligns perfectly with the **Five Levers** of modern SEO:
1. **Crawlability:** Static Astro build, clean HTML, and 1-to-1 canonical sitemap mapping.
2. **Helpfulness:** Tools provide immediate utility (e.g., resizing, collages, proof sheets) without forcing signup.
3. **Trust (E-E-A-T):** The "Zero Server Uploads - 100% Private" architecture is a demonstrable, technically accurate trust signal.
4. **Authority:** (To be built post-launch via digital PR and tool usage).
5. **AI Discoverability (GEO):** The unique privacy angle and step-by-step HowTo guides feed AI answer engines perfectly.

### Post-Launch Priority: Topical Authority Expansion
**Evidence tier:** Supported by Google
**Lever(s):** 2 (helpfulness), 4 (authority), 5 (AI discoverability)
**Expected impact:** High (Capturing long-tail workflow queries)
**Implementation effort:** Medium
**ICE Score:** Impact 8 / Confidence 9 / Ease 6 → **7.6**
**Supporting evidence:** Google rewards sites that serve specific intents natively.
**Why:** The local-first angle is unique. Creating more workflow-specific pages (e.g., "capture one contact sheet alternative") will compound traffic.

---

## Part 3: Competitor Strategy & Moat Analysis

*(Note: Without access to third-party clickstream data (Ahrefs/Semrush), this analysis relies on qualitative architectural differentiation and known competitor positioning.)*

### 1. Key Dependencies and Vulnerabilities of Competitors
- **Pixieset & CloudSpot:** Both are heavily dependent on recurring subscriptions and cloud storage limitations. Their SEO footprint is largely driven by user-generated galleries (which carry high indexation bloat) and broad "client gallery" keywords. Their vulnerability is **friction**: users must sign up, upload massive RAW/JPEG files to a server, and navigate complex pricing tiers just to generate a proof sheet.
- **ContactSheetMaker (and similar lightweight tools):** Often rely on server-side processing (uploading images to a backend), raising privacy concerns for unreleased client work, or they lack professional features like XMP sync and 300 DPI exports.

### 2. Make Contact Sheet's Defensible Moat
Make Contact Sheet attacks these vulnerabilities directly by shifting compute to the client (browser-side Canvas 2D/WebAssembly).
- **Zero Friction:** No signup, no paywall, no upload wait times.
- **Absolute Privacy:** "Zero Server Uploads" directly targets photographers who cannot legally upload pre-release commercial or wedding proofs to third-party servers.
- **SEO Implication:** By structuring landing pages around specific pain points (e.g., `/bulk-resize-photos-to-16-9`, `/compress-photos-for-web`, `/free-8x10-photo-prints`), Make Contact Sheet captures high-intent, long-tail queries that competitors ignore because they don't fit the "gallery subscription" model.

The strategy is sound: out-compete established incumbents not by outspending them on broad keywords, but by offering a superior, frictionless, privacy-first utility that naturally earns backlinks and AI citations.

