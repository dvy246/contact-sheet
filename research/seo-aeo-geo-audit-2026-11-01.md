# SEO / AEO / GEO Audit: makecontactsheet.com

**Date:** 2026-11-01
**Tooling:** claude-seo 2.4.2 (seo-audit, plus the seo-content and seo-geo subagents), a custom crawler, and Lighthouse 12.2.1 run locally.
**Scope:** all 156 URLs in the live `/sitemap.xml` (26 English pages plus 5 locales). Deep review covered the 26 English pages and spot-checked 4 localized ones.

**Limitations:**
- PageSpeed Insights and CrUX quota was exhausted, so performance figures are **lab-only** with no field data.
- No GSC, GA4 or backlink API credentials were available, so rankings, impressions and referring domains were not measured.
- Both subagents hit their turn limits and delivered partial findings files.
- Raw data is in the session scratchpad, under `makecontactsheet.com-audit/`.

---

## Score: 66 / 100 → **6.6 / 10**

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 84 | 18.5 |
| Content Quality (E-E-A-T) | 23% | 56 | 12.9 |
| On-Page SEO | 20% | 72 | 14.4 |
| Schema / Structured Data | 10% | 62 | 6.2 |
| Performance (lab) | 10% | 55 | 5.5 |
| AI Search Readiness (GEO/AEO) | 10% | 55 | 5.5 |
| Images | 5% | 70 | 3.5 |
| **Total** | | | **66.5** |

**Business type:** free browser-based SaaS utility, ad-monetised, with 6 locales.

**One-line verdict:** the technical foundation is near-textbook. The limits are trust (false product claims, anonymous authorship), thin tool pages, slow mobile LCP, and a domain only 2 months old with no off-site footprint.

---

## What is already good (don't touch)
- **Status codes:** all 156 URLs return 200 with no chains. The `/page/` → `/page` 308 fix is live, and http and www redirect to the apex with a 301.
- **Canonicals and indexing:** canonicals are self-referencing everywhere. Legal pages are `noindex, follow` and left out of the sitemap.
- **hreflang:** complete on all 156 URLs, with x-default, every target resolving, every link reciprocal, and `<html lang>` correct.
- **Uniqueness:** there are no duplicate titles, descriptions or H1s, and each page has exactly one H1. No page is orphaned (every one has 3 or more inbound internal links).
- **Security headers:** HSTS preload, CSP, X-Frame-Options, nosniff, Referrer-Policy and Permissions-Policy are all set. TTFB is about 140 ms.
- **Server rendering:** pages are fully server-rendered. The homepage has about 3,100 words in raw HTML, so no JS is needed to read the content.
- **AI crawler policy:** AI *search* crawlers can reach every page: OAI-SearchBot, ChatGPT-User, PerplexityBot, Claude-SearchBot, Bingbot, Applebot, Amzn-SearchBot, meta-webindexer and DuckAssistBot. Training crawlers are blocked.
- **Schema hygiene:** FAQ and HowTo schema text matches the visible copy (0 mismatches). Every page has alt text.
- **Accessibility:** CLS is 0. Accessibility scores 96–100, and the workspace controls are agent-legible (0 unnamed controls).

---

## Top 5 critical issues

1. **False product claims, some of them in FAQPage JSON-LD and llms.txt (High).** These are trust and helpful-content risks, and answer engines quote them verbatim.
   - "Web Workers" appears on 28 live pages, in llms.txt twice, and in 29 built files, but the codebase has no `new Worker(` anywhere.
   - "AI" auto-cull: it is Laplacian variance, not machine learning. "WebAssembly" also appears, but there is no wasm, and blink detection is claimed but doesn't exist.
   - The "forensic watermark" is said to trace leaks posted to social media. It is a least-significant-bit mark in the blue channel, and any JPEG recompression wipes it.
   - "Vector" and "uncompressed" PDFs: the PDFs are JPEG pages at quality 0.88.
   - WebP contact-sheet export doesn't exist.
   - "Lightroom TXT" and "CSV Table" button names in the FAQ schema are wrong. The real labels are "Selected Filenames" and "Lightroom Filter".
   - "Without quality loss" is claimed for compression that is lossy.
   - "Zero Cloud Telemetry" sits next to GA4, which loads on every page.
   - "Free & Open" is claimed, but there is no public repo.
2. **No E-E-A-T scaffolding (High).**
   - None of the 156 pages has an author, byline, `datePublished`/`dateModified` or a visible "updated" date, and that includes all 7 guides.
   - /about-us claims "engineers and working commercial photographers" but names nobody, and its meta description says "Meet the team".
   - /contact-us has 49 words and two role email addresses, with no operator or entity named.
3. **Slow mobile LCP (High).** In the lab, LCP is 5.3–6.2 s and Lighthouse performance is 63–70.
   - The homepage HTML is 290 KB with 2,189 DOM nodes.
   - CSS is render-blocking.
   - gtag.js is 182 KB.
   - About 143 KB of JavaScript is unused, mostly imageLoader and KeyboardShortcutsModal, which load eagerly.
   - AGENTS.md records perf 96 and LCP 2.3 s for a local build. Production does not match that.
4. **Thin money pages and keyword cannibalisation (Medium-High).**
   - The "contact sheet maker" intent is split across `/` (about 1,480 words of prose), `/photo-contact-sheet-maker` (358) and `/studio/contact-sheet` (833).
   - The homepage H1 also targets "Photo Collage".
   - Thin satellite pages: /photo-collage-maker 286 words, /mood-board-maker 310, /white-label-client-gallery 154, /lightroom-client-selection-workflow 240, and /compare/… 278 (its table is copied from `/`).
   - /bulk-resize and /compress are off-scope converter pages that mount the same app as /batch-photo-tools.
5. **No off-site brand or authority (High for GEO).**
   - The domain was registered 2026-08-30.
   - I found no Wikipedia, Hacker News, GitHub, YouTube or social presence, and the site has no `sameAs` links.
   - A web search for the core query and for the brand did not return the site.
   - Competitors that do appear include a Dodo Payments index tool, Imagen-AI, Milanote and iPad apps.

## Top 5 quick wins (under 1 hour each)
1. **Move `ads.txt` into `public/`.** It currently returns 404 because the file is at the repo root. That blocks AdSense revenue rather than rankings.
2. **Fix the 15 internal links that redirect.** `l('/#workspace', locale)` produces `/de/#workspace`, which 308s. Use ``${l('/', locale)}#workspace`` instead, in `HeroSection.astro:75`, `[locale]/collage-templates.astro:120` and `[locale]/contact-sheet-template.astro:124`.
3. **Fix the CSP console error.** The CSP blocks the Cloudflare Web Analytics beacon. Turn CF Web Analytics off (GA4 already covers analytics) or allow `static.cloudflareinsights.com`. This lifts Best Practices from 93 to 100.
4. **Remove "Web Workers" everywhere:** the i18n data files, the schema builders and `public/llms.txt`. Then confirm `grep -r "Web Worker" dist` returns nothing.
5. **Rewrite llms.txt.** Use proper `- [Title](url): desc` Markdown links (Lighthouse currently fails it). Cover all 26 English URLs (it lists 12 today) and include the XMP, CSV and HTML-portal exports.

---

## Category detail

### Technical SEO: 84
| Sev | Finding | Fix |
|---|---|---|
| High (revenue) | `ads.txt` returns 404 | Move it to `public/ads.txt` |
| Med | 15 internal links 308-redirect (`/xx/#workspace`) | Change the URL builder, as in quick win 2 |
| Med | The CSP blocks the CF Insights beacon, which logs a console error on every page | Turn off CF Web Analytics, or allowlist it |
| Med | Baiduspider and PetalBot (real search engines) are blocked by Cloudflare's AI-bot list | Unblock them unless dropping those markets is intended |
| Low | robots.txt has two `User-agent: *` groups: Cloudflare's managed block is prepended to `public/robots.txt`. Lighthouse marks `Content-Signal` invalid, which caps the SEO score at 92. Google is unaffected. | Drop the repo's duplicate group, or turn off managed robots.txt |
| Low | All 156 `lastmod` values are 2026-10-12, and `changefreq daily` and `priority` are set | Emit a real per-file lastmod and drop changefreq and priority |
| Low | CF Email Obfuscation means crawlers without JS see "[email protected]" and a `/cdn-cgi/l/email-protection` link that returns 404 | Turn obfuscation off |
| Low | AGENTS.md references `public/sitemap-index.xml`, which returns 404. The sitemap is generated by `src/pages/sitemap.xml.ts`. | Update the doc |

### Content Quality: 56 (E-E-A-T weighted 51: Experience 45, Expertise 60, Authority 40, Trust 55)
- **Claims:** the false claims listed above, plus unsourced competitor pricing (Vizua, Canva $13/mo, Photoshop ~$20–55), which AGENTS.md §6 forbids.
- **Stale counts:** pages say "21 presets" and "18 collage templates", but the code defines 28 and 25.
- **Readability:** median Flesch Reading Ease is 41.8, grade 12.3. /about-us scores 12.8.
- **Tone:** machine-sounding phrasing recurs ("privacy enclave", "studio-grade instrument", "visual contract"). Every page uses the same skeleton: H1 → "Why…" → 3 H3s → Related → FAQ.
- **Localization:** English UI and demo strings remain on about 40 localized tool pages and all 5 localized homepages. The translated prose itself is good.
- **Positives:** the guides are substantive (718–1,025 words of prose) and include quotable specifics, such as 8×10 at 300 DPI = 2400×3000 px. The /free-8x10-photo-prints page (Flesch 66) is the house style worth copying.

### On-Page: 72
- **Titles:** 78 of 156 are over 60 characters, nearly all localized (es, fr, pt, de), so they will truncate. 7 are under 30 characters (About, Contact, ja collage guide).
- **Descriptions:** 31 are under 120 characters, mostly ja and fr. 2 are over 160.
- **H1s:** the homepage H1 competes with /photo-collage-maker. /auto-cull-photos has the H1 "AI Auto-Cull & Forensic Security", which matches no real query. /batch-photo-tools is titled "Batch Photo Editor", but it does no editing.
- **Headings:** every tool page has `<h2>Drop your photos here…</h2>`, a UI string being used as a heading.

### Schema: 62
- **Present:** WebSite, Organization, SoftwareApplication with Offer, FAQPage, HowTo and BreadcrumbList. All of it parses and all of it is visible on the page.
- **Gaps:**
  - The blocks are disconnected: no `@graph` or `@id`.
  - Organization has no `sameAs`, `contactPoint` or `founder`, and no publisher links point to it.
  - The guides have no `Article` markup with author and dates.
  - FAQPage contains false claims.
- **Note:** HowTo rich results are retired and FAQ rich results are limited to government and health sites. Keep the markup for machine parsing, but don't expect SERP features from it.
- **SoftwareApplication stars:** these need a genuine `aggregateRating`. Never fabricate one.

### Performance: 55 (lab, mobile, simulated 4G)
| Page | Perf | LCP | FCP | TBT | CLS |
|---|---|---|---|---|---|
| / | 63 | 6.2 s | 3.6 s | 200 ms | 0 |
| /photo-contact-sheet-maker | 65 | 5.8 s | 4.7 s | 90 ms | 0 |
| /guides/how-to-make-a-contact-sheet | 70 | 5.3 s | 3.4 s | 130 ms | 0 |

**Fixes, in order:**
1. Inline critical CSS. Right now the shared `about-us.*.css` (28 KB) blocks every page.
2. Defer gtag until idle or first interaction.
3. Load the workspace chunks (imageLoader, KeyboardShortcutsModal) behind the existing IntersectionObserver.
4. Trim the StudioShowcase and mega-menu DOM.
5. Self-host the 13 Unsplash images at the size they are displayed, with srcset. That saves about 116 KB.
6. Re-measure with PSI/CrUX. Field data is what Google actually uses.

### AI Search Readiness (GEO/AEO): 55
Sub-scores: Citability 62, Structure 68, Multi-modal 35, Authority 20, Technical access 82.

| AI surface | Can retrieve / cite? |
|---|---|
| Google AI Overviews / AI Mode | Yes (Googlebot allowed) |
| ChatGPT Search | Yes (OAI-SearchBot, ChatGPT-User allowed) |
| Perplexity | Yes |
| Claude search | Yes (Claude-SearchBot, Claude-User allowed) |
| Bing Copilot | Yes |
| Siri / Spotlight, Alexa, Meta AI | Yes (Applebot, Amzn-SearchBot, meta-webindexer allowed) |
| **Gemini app / Vertex grounding** | **No.** Google-Extended is blocked, and that token covers grounding, not just training. |
| Training (GPTBot, ClaudeBot, CCBot…) | No (edge 403 and robots.txt). This is intentional. |

**Gaps:**
- No answer-first 40–60-word lead after the H1 on tool pages (the guides' "Quick Answer" block is the pattern to copy).
- 0 of 36 homepage headings are phrased as questions.
- Collage and 8×10 show FAQs but have no FAQPage schema.
- No outbound citations to sources such as Adobe Help or ISO 216.
- No screenshots or video.
- No brand footprint off the site.
- llms.txt is malformed and incomplete, and llms-full.txt returns 404.

### Images: 70
- **Count:** only 78 `<img>` tags site-wide, all of them hotlinked Unsplash portraits on the 6 homepages. Their alt text is "Portrait Photo 1…13".
- **Missing visuals:** guides and tool pages have no real screenshots or example outputs. That costs both Experience signals and image-search traffic.
- **OG image:** og-image.png is 616 KB and shared by every page. Compress it to under 200 KB, and consider per-page OG images.

---

## Action plan

### Phase 1: critical fixes (week 1)
1. Move `ads.txt` into `public/`.
2. Purge or correct every false claim in the i18n data, schema builders, llms.txt and meta descriptions. Rename auto-cull to "sharpness scoring", drop "AI", "WebAssembly", "blinks" and "vector", and describe the watermark honestly (or drop it). Then re-run the i18n e2e gate.
3. Fix the `#workspace` links (15 redirects).
4. Fix the CSP beacon error.
5. Rewrite llms.txt.

### Phase 2: high-impact improvements (weeks 2–3)
6. Fix mobile LCP: critical CSS, deferred gtag, lazy workspace chunks, smaller showcase DOM. Target under 2.5 s in the lab, then confirm in CrUX.
7. Build out E-E-A-T:
   - Add a named maintainer on /about-us with a bio and photography credentials, if they are real.
   - Name the operator or entity on /contact-us.
   - Add visible "Last updated" dates.
   - Add `Article` with author and `dateModified` to the guides.
   - Connect the Organization `@graph` and add `sameAs` once profiles exist.
8. Settle the cannibalisation:
   - Decide which page owns "contact sheet maker". Grow /photo-contact-sheet-maker to 800+ unique words with real output screenshots, or retarget it at "proof sheet generator".
   - Drop "& Photo Collage" from the homepage H1.
9. Fix localized titles over 60 characters (78) and descriptions under 120 characters (31).

### Phase 3: content and authority (month 2)
10. Add a 40–60-word answer-first lead and question-style H2s to every tool page. Add FAQPage schema to collage and 8×10. Demote the dropzone H2.
11. Add real screenshots and example output images (with descriptive alt text) to every guide and tool page, plus one YouTube walkthrough embedded on `/`.
12. Merge /bulk-resize-photos-to-16-9 and /compress-photos-for-web into /batch-photo-tools with 301 redirects, or deepen each one substantially. Retitle the batch page "Batch Rename Photos & Extract EXIF". Expand the white-label, Lightroom and compare pages.
13. Source and date every competitor cell. Generate template counts from the code.
14. Translate the remaining English UI and demo strings, and add them to the i18n gate.
15. Build an off-site presence:
    - Launch on Product Hunt and Show HN.
    - Get listed on AlternativeTo.
    - Answer genuinely helpful threads in r/photography and r/WeddingPhotography.
    - Publish YouTube tutorials.

### Phase 4: monitoring (ongoing)
16. Connect GSC, GA4 and CrUX and re-run this audit with field data.
17. Emit a real per-page sitemap lastmod.
18. Decide whether Gemini visibility matters. If it does, allow Google-Extended in Cloudflare AI Crawl Control.
19. Unblock Baiduspider and PetalBot unless excluding them is intended.
20. Before showing ads to EEA users, add a Google-certified consent banner (CMP). GA4 currently loads without consent mode.
