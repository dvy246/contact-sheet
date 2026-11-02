# Technical SEO Audit — makecontactsheet.com

**Audit date:** 2026-10-11
**Pages sampled:** Live server behaviour on the homepage, `/photo-collage-maker/`, `/es/`, `/guides/how-to-make-a-contact-sheet/`, `/studio/contact-sheet/` and the `frameproof-4fw.pages.dev` mirror (redirects, headers, status codes, TLS, speed). Markup checks ran on **all 168 indexable built pages** (6 locales × 28 routes) rather than a sample, because the site is static and the full build was available locally.
**Platform detected:** Astro 5 static build (`output: 'static'`) on Cloudflare Pages (direct upload, no Git provider).

Server behaviour was audited on the live site **before** fixes. Fixes were then made in the repo and verified against a local Cloudflare Pages emulator (`wrangler pages dev`), a full rebuild and the repo's test suite. **The fixes are not live yet** — the deploy failed on an expired Cloudflare login (see the end of this report). Two scores are given: the live site today, and the build waiting to deploy.

## Overall Score

| | Score | Band |
|---|---|---|
| **Live site today** | **5.0 / 10** (capped; raw 7.1) | Partial Pass |
| **Fixed build (pending deploy)** | **8.9 / 10** | Strong Pass |

The live site has one serious structural problem. Every page's canonical tag, every hreflang tag and 155 of 156 sitemap URLs point to an address that Cloudflare redirects. Google is told "index `/es`", and requesting `/es` sends it to `/es/`. The localized template pages also served their main content in English under translated URLs. Because that leak appears in more than one locale, the score is capped at 5.0 under the rubric. Both problems are fixed in the pending build.

## Score Breakdown

| Category | Weight | Live /10 | Fixed /10 | Status (fixed) |
|---|---|---|---|---|
| Crawlability & Indexability | 25 | 7.5 | 9.5 | PASS |
| Core Web Vitals & Performance | 20 | 3.3 | 6.7 | PARTIAL PASS |
| Mobile-First & JS Rendering | 15 | 8.8 | 10.0 | PASS |
| Site Architecture & Sitemaps | 10 | 7.0 | 10.0 | PASS |
| HTTPS & Security | 10 | 10.0 | 10.0 | PASS |
| Structured Data | 10 | 10.0 | 10.0 | PASS |
| International SEO & Redirects | 10 | 5.0 | 6.7 | PARTIAL PASS |

Weighted raw: live 7.1, fixed 8.9. The live score is capped at 5.0 because the locale content leak appeared across multiple locales.

## Findings by Category

### 1. Crawlability & Indexability — PASS (fixed build)
- **1.1 robots.txt**: PASS. Returns 200 with `Allow: /` and a sitemap reference; CSS and JS are not blocked. *(Evidence: GET https://makecontactsheet.com/robots.txt)*
- **1.2 Crawl traps**: PASS. There's no faceted navigation, no indexable internal search and no calendar URLs. *(Evidence: internal links across all 168 built pages)*
- **1.3 Server response health**: PASS. Sampled pages return 200 and unknown paths return a real 404. *(Evidence: curl on 12 URL variants, including `/this-page-does-not-exist-zz9` → 404)*
- **1.4 Canonical tags**: Live **FAIL** → fixed PASS. All 168 pages carry exactly one self-consistent, slash-less canonical, but live Cloudflare 308-redirects every slash-less URL except `/`. The canonical pointed at a redirect, which is a conflicting signal. *(Evidence: live HTML of `/photo-collage-maker/` shows canonical `…/photo-collage-maker`; curl shows that URL → 308 → `/photo-collage-maker/`)*
- **1.5 Conflicting index directives**: PASS. Content pages are `index, follow`. The legal pages are deliberately `noindex, follow` and are correctly left out of both the sitemap and hreflang. The `pages.dev` mirror sends `X-Robots-Tag: noindex, nofollow`. *(Evidence: built HTML; curl -I on pages.dev)*
- **1.6 Duplicate URL variants**: PASS. http→https and www→apex both return 301, casing variants return 404, and trailing-slash variants return 308 to a single URL. *(Evidence: curl variant matrix)*
- **1.7 Index Coverage**: NOT VERIFIED. This needs Search Console.
- **1.8 Post-launch noindex survival**: PASS. There's no site-wide noindex on the live homepage or the sampled pages, despite the recent rebrand and i18n launch. *(Evidence: live meta robots)*
- **A.1 Googlebot blocked by CDN/WAF**: NOT VERIFIED. The site is behind Cloudflare, and a normal fetch can't trigger bot rules.
- **A.2 Cloaking**: PASS. The site is fully static, with no user-agent or IP branching, and the raw HTML matches what renders. *(Evidence: built HTML vs Playwright renders)*
- **C.1 Index bloat**: not applicable. With about 168 pages the site is too small for this to matter.
- **C.2 hreflang alternates crawlable and canonical**: Live **FAIL** → fixed PASS. Every non-root alternate was a redirect. *(Evidence: live hreflang hrefs plus curl)*
- **C.3 Pagination/infinite scroll**: not applicable. The site has no paginated listings.
- **C.4 Payload bloat**: PARTIAL. Localized `contact-sheet-template` pages weigh about 395 KB of HTML (inline SVG previews), and the homepage has 3,185 DOM nodes. Brotli is enabled. *(Evidence: dist file sizes; Lighthouse dom-size)*

### 2. Core Web Vitals & Performance — PARTIAL PASS (fixed build)
- **2.1 Real field data**: NOT VERIFIED. The keyless PageSpeed Insights API returned `429 Quota exceeded`, and there's no Search Console access. The lab data below is a proxy, not a substitute.
- **2.2 Image delivery**: Live PARTIAL → fixed PASS. All 12 homepage photos use Unsplash `auto=format` (WebP/AVIF) and explicit width/height, but they were forced to `loading="eager"` below the fold. They're now lazy with async decoding. *(Evidence: dist/index.html img tags)*
- **2.3 Render-blocking and third-party scripts**: Live **FAIL** → fixed PARTIAL.
  - **Live:** Lighthouse mobile scores the homepage 29, with LCP 7.8 s and TBT 2,870 ms. The workspace island ran a 2.57 s long task at load, the LCP text's render was delayed 6.6 s, and Google Fonts blocked render for about 0.95 s.
  - **Fixed:** the build scores 96, with LCP 2.3 s, TBT 110 ms and CLS 0.04.
  - **Still open:** Google Analytics gtag costs about 0.6 s of main thread, and two CSS bundles are still render-blocking.
  - *(Evidence: Lighthouse 12 mobile, live vs local emulator; the "fixed" numbers exclude real network and server time)*
- **2.4 TTFB**: PARTIAL. Measured TTFB varies between 0.18 and 0.76 s, and HTML is `cf-cache-status: DYNAMIC`. *(Evidence: curl timings; Lighthouse server-response-time)*

### 3. Mobile-First & JS Rendering — PASS (fixed build)
- **3.1 Responsive vs separate mobile URLs**: PASS. The site uses a single responsive URL set.
- **3.2 Mobile content parity**: PASS. Desktop and mobile get the same HTML.
- **3.3 JS-dependent content**: PASS. The site is statically generated, so all copy, schema and links are in the raw HTML.
- **3.4 Mobile usability**: Live PARTIAL → fixed PASS. Live, the header action row overflowed every marketing page below about 452 px, clipping the theme toggle and menu button. Fixed and re-verified at 320, 375 and 414 px with zero overflowing or clipped controls. *(Evidence: Playwright sweep of 28 English and 35 localized routes)*
- **B.1–B.3 JS framework edge cases**: not applicable. There's no client-side routing. The mobile nav links are still present in the initial DOM.

### 4. Site Architecture & Sitemaps — PASS (fixed build)
- **4.1 URL structure and depth**: PASS. URLs are clean and descriptive, and everything is reachable within 2 clicks via the header mega-menu.
- **4.2 Internal links**: Live **FAIL** → fixed PASS. All internal links were slash-less, so every one took a redirect hop (113 on the homepage alone). Anchor text is descriptive. `npm test` checks 0 broken links across the build. *(Evidence: dist hrefs; test suite)*
- **4.3 Sitemap**: Live PARTIAL → fixed PASS. 155 of 156 URLs were redirects live; now all return 200. The sitemap is referenced in robots.txt. Minor: every `lastmod` is the same fixed date. *(Evidence: /sitemap.xml; emulator curl)*
- **4.4 Pagination/faceting**: not applicable.
- **4.5 Reclaimable lost links**: NOT VERIFIED. This needs a backlink tool. Worth checking because of the earlier FrameProof → Make Contact Sheet rebrand.
- **D.1 Duplicate titles/descriptions**: PASS. All 168 are unique.
- **D.2 Casing/slash variants**: PASS. Casing variants return 404 and slash variants 308 to one URL.

### 5. HTTPS & Security — PASS
- **5.1 Site-wide HTTPS**: PASS. HTTP returns 301 to HTTPS, HSTS has `preload`, and there's no `http://` resource on any of the 168 pages.
- **5.2 Certificate**: PASS. Every curl call completed full chain verification without `-k`. Expiry date wasn't checked.
- **5.3 Safe Browsing**: PASS. The Transparency Report API returns status `1` (no unsafe content) with all flags false.

### 6. Structured Data — PASS
- **6.1 Implementation and validity**: PASS. JSON-LD parses on all 168 pages (BreadcrumbList 162, FAQPage 132, SoftwareApplication 78, HowTo 60, Organization 12, WebSite 6). `SoftwareApplication` declares a free offer and no invented ratings. These weren't run through Google's Rich Results Test.
- **6.2 Currency gate**: FAQ rich results stopped appearing in Google Search on May 7, 2026, and HowTo rich results were retired earlier. Keep that markup for page understanding and other engines, but **don't expect rich snippets from it**. ([inblog](https://inblog.ai/blog/google-faq-schema-rich-result-deprecation), [the215guys](https://www.the215guys.com/blog/google-removes-faq-rich-results/), [Launchcodex](https://launchcodex.com/blog/seo-geo-ai/google-drops-faq-rich-results/))

### 7. International SEO & Redirects — PARTIAL PASS (fixed build)
- **7.1 hreflang correctness**: PASS. The cluster is reciprocal and self-referencing, uses valid ISO 639-1 codes and absolute URLs, includes `x-default` → English, and each page's canonical is its own locale. It's declared in both HTML and the sitemap, and the two agree. *(Evidence: full-build reciprocity scan)*
- **7.2 Locale content integrity**: Live **FAIL** → fixed PARTIAL.
  - **Live:** template hubs (`collage-templates`, `contact-sheet-template`, `mood-board-templates`) served every template name and description in English across all 5 locales. Every tool page served an English import panel, and the mood board served an English prompt. In total that was 221 untranslated blocks.
  - **Fixed:** 63 templates × 5 locales were translated, along with the panel and prompt copy.
  - **Still open:** a few short studio UI labels in Japanese.
  - *(Evidence: paragraph-level scan of all 2,748 text blocks on every localized page)*
- **7.3 Redirect hygiene**: PARTIAL. `http://www` → `https://www` → `https://` apex takes 2 hops. Everything else is a single 301 or 308.
- **7.4 Migration**: NOT VERIFIED. There was a FrameProof → Make Contact Sheet rebrand and an i18n launch, and the redirect map is unconfirmed.

## Fixes Required — Critical

All three are **implemented in the repo and verified locally, not yet live**.

### 1. Canonical, hreflang, sitemap and internal links all pointed at redirects
- **What's wrong:** Astro emitted `/page/index.html`, which Cloudflare Pages serves only at `/page/`, while every URL the site declares is slash-less.
- **Why it matters:** Every canonical and hreflang target and 155 sitemap URLs were 308s. That's a conflicting signal for canonical consolidation, it breaks the hreflang cluster, and it adds a redirect hop to every internal click.
- **Exact fix (applied):**
  ```js
  // astro.config.mjs
  trailingSlash: 'never',
  build: { format: 'file' },
  ```
  `l()` in `src/i18n/utils.ts` now strips `.html` (in file mode `Astro.url.pathname` is `/page.html`), and `scripts/test-no-broken-pages.js` resolves both layouts.
- **Verify after deploy:** `curl -sI https://makecontactsheet.com/photo-collage-maker` should return `200`, and `…/photo-collage-maker/` should return `308` to the slash-less URL.

### 2. Untranslated main content on localized pages
- **Fix (applied):** added `src/i18n/data/templateCopyData.ts` (keyed by template id, with English fallback) and `Astro.currentLocale` copy in `ImportPanel.astro` and `MoodBoardApp.astro`. **Any new template must get its translations added there.**
- **Verify after deploy:** `/es/collage-templates` shows Spanish template names and descriptions.

### 3. Homepage main-thread block (lab LCP 7.8 s)
- **Fix (applied):**
  - `WorkspaceApp` now builds when it nears the viewport or on the first interaction.
  - The Google Fonts stylesheet loads non-blocking.
  - Below-the-fold showcase photos are lazy-loaded.
- **Verify after deploy:** run pagespeed.web.dev on `/` with Mobile selected and expect lab LCP around 2–3 s. Field data takes about 28 days to reflect the change.

## Fixes Recommended — Good to Have
1. **Single-hop www redirect.** In the Cloudflare dashboard, go to Rules → Redirect Rules and add a rule matching `http.host eq "www.makecontactsheet.com"` → `concat("https://makecontactsheet.com", http.request.uri.path)` with status 301. That turns the 2-hop chain into one.
2. **Defer Google Analytics.** Load gtag after `load` or on first interaction. It costs about 0.6 s of main thread on mobile.
3. **Real sitemap `lastmod`.** `src/pages/sitemap.xml.ts` writes the same date for every URL. Either derive it per page (for example from git commit time) or drop `<lastmod>`, because Google ignores it once it proves unreliable.
4. **Shorter localized titles.** 47 titles, mostly German and French, exceed 65 characters and will be truncated in results.
5. **Template hub payload.** Localized `contact-sheet-template` pages are about 395 KB of HTML. Rendering the inline preview SVGs from data on the client, or sharing one `<symbol>` sprite, would cut that substantially.
6. **CSP before AdSense.** `public/_headers` doesn't allow `pagead2.googlesyndication.com` or the related ad domains, so ads will be blocked the day AdSense is added.

## Path to Elite (9.5+/10)

| Gap | Target state | Why it matters | Est. effort |
|---|---|---|---|
| Field CWV unverified | Search Console CWV report or PSI field data, all green on mobile | The performance score is lab-only right now | Share an export (5 min) |
| GA and render-blocking CSS (2.3) | gtag deferred, critical CSS only | Lifts 2.3 to PASS (+~0.3 overall) | 1–2 h |
| TTFB variance (2.4) | Consistent under 0.4 s | Lifts 2.4 to PASS | Cache Rule test, 30 min |
| www redirect chain (7.3) | 1 hop | Lifts 7.3 to PASS | 10 min in the dashboard |
| Studio UI labels in Japanese (7.2) | Localized workspace chrome | Lifts 7.2 to PASS | 2–3 h (i18n of client-rendered UI) |
| Payload (C.4) | Template hubs under 150 KB | Crawl efficiency | 2–4 h |
| Verification items | GSC coverage, Cloudflare bot settings, backlink 404s | Unscored gaps | User exports |
| Re-audit cadence | Quarterly plus trigger-based | Required for Elite | Calendar it |

## Bonus Track: AI/GEO Readiness & Accessibility (not scored)
This section doesn't affect the score above, because none of these are confirmed Google ranking factors, but they are part of the Elite bar.
- **AI crawler access:** robots.txt allows everything, with no bot-specific rules. GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot and Google-Extended are all implicitly allowed. That's fine *if intended*; it's a business decision.
- **llms.txt:** present. It's a low-value convention, so nothing more to do there.
- **Answer-first content:** the guides open with direct-answer paragraphs.
- **Entity consistency:** "Make Contact Sheet" is consistent across titles, the OG tags and Organization schema.
- **Semantics:** every page has one H1, and all meaningful images have alt text.

## Verification Limitations
- **Field Core Web Vitals (2.1).** The PSI API was out of quota. Share a pagespeed.web.dev mobile report or the Search Console CWV report.
- **Index Coverage (1.7).** Share the Search Console Pages report.
- **Googlebot through Cloudflare (A.1).** Check Security → Events filtered to "Googlebot", and confirm Bot Fight Mode isn't challenging verified bots.
- **Backlinked 404s (4.5) and migration redirect map (7.4).** The FrameProof rebrand makes these worth checking.
- **"Fixed" scores were verified locally,** using the Cloudflare Pages emulator, a full rebuild, the test suite and Lighthouse with simulated throttling. They are not yet verified live, so re-run the variant curl matrix after deploy.

## Evidence Log
1. GET https://makecontactsheet.com/robots.txt → 200
2. GET https://makecontactsheet.com/sitemap.xml → 200, 156 `<loc>` entries with hreflang
3. curl status and redirect matrix: http/https × www/apex, slash/no-slash, casing, `/index.html`, `/es`, unknown path, pages.dev
4. Live HTML `<html lang>`, meta robots, canonical and hreflang for `/photo-collage-maker/`, `/es/`, `/guides/how-to-make-a-contact-sheet/`, pages.dev
5. curl -I headers (HSTS, CSP, compression, cache status) and timing for `/` and `/photo-collage-maker/`
6. PageSpeed Insights API for `/` and `/photo-collage-maker/` → 429 quota exceeded
7. Lighthouse 12 mobile on the live `/`, `/guides/how-to-make-a-contact-sheet/` and `/studio/contact-sheet/`, plus bootup, main-thread and long-task breakdown
8. Full-build markup scan of 168 pages (canonical, robots, titles, descriptions, H1, images, mixed content, JSON-LD, hreflang reciprocity)
9. Full-build locale content scan of every localized page (paragraph-level)
10. Web search: FAQPage rich results 2026 status
11. Web search plus the Transparency Report API: Safe Browsing status for makecontactsheet.com
12. `wrangler pages dev` emulator: routing matrix after `build.format: 'file'`
13. Lighthouse 12 mobile on the fixed build (`/`, `/photo-collage-maker`)
14. Playwright: lazy workspace init, web font load, and the mobile overflow sweep at 320/375/414
15. `npm run check` (0/0/0), `npm run build` (169 pages), `npm test` (0 failures), `scripts/verify-i18n.js` (pass)

## Recommended Next Check
- **Right after the deploy:** re-run the curl variant matrix and pagespeed.web.dev on `/`.
- **Search Console, about 2 weeks later:** watch the Pages report for "Page with redirect" declining and the hreflang cluster being picked up.
- **Calendar:** re-audit quarterly.
- **Triggers for an immediate re-audit:** any change to `astro.config.mjs` output settings, adding a locale or template, adding AdSense (CSP), or a confirmed Google core update.
