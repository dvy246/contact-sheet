# Make Contact Sheet SEO Governance

*This document serves as the canonical, single source of truth governing all SEO decisions for Make Contact Sheet.*

---

## 1. Purpose & Scope
*Defines the authority and application of this document.*

This document is the canonical SEO governance standard for Make Contact Sheet — a browser-first photo contact-sheet, collage, and review workspace. It dictates the strategy, technical requirements, content standards, and evidence policies required to maintain search visibility. Any deviations from these guidelines must be documented and justified.

---

## 2. Evidence Policy
*Establishes strict standards for truthfulness and data verification in SEO claims.*

Make Contact Sheet adheres to strict evidentiary standards for all SEO claims. We do not fabricate or inflate metrics.

*   **No Fabrication:** Never fabricate search volumes, keyword difficulty, rankings, traffic, or revenue.
*   **Evidence Labels:** All SEO data and claims must be labeled with one of the following tiers:
    *   *Verified:* Backed by direct, current data (e.g., GSC for our site, current Ahrefs data for competitors).
    *   *Derived:* Calculated using a transparent methodology from verified data.
    *   *Inference:* Logically deduced from available trends, lacking direct proof.
    *   *Hypothesis:* A reasoned assumption waiting to be tested.
    *   *Unknown:* Lacking sufficient data to form a hypothesis.
*   **Evidence Classification (Tactics):**
    *   *Supported by Google:* Explicitly documented in Google Search Central.
    *   *Consistent with Google:* Aligns with known algorithms but not explicitly stated.
    *   *Experimental:* Testing a theory; monitor closely.
    *   *Avoid:* Known anti-patterns or violations of guidelines.
*   **Fresh Data:** Keyword volumes and difficulty metrics require fresh data (e.g., Ahrefs) and cannot be permanently relied upon without periodic re-verification.

---

## 3. Keyword Strategy
*Outlines target keywords, their intent, and our strategy for ranking.*

### 3.1 Keyword Map
*Evidence Status below reflects our strategic hypotheses prior to launch.*

| Page URL | Primary Keyword | Secondary Keywords | Search Intent | Content Type | Competition Level | Evidence Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/` | free contact sheet maker | photo contact sheet, proof sheet creator | Transactional / Navigational | Hub / Tool | Low/Medium | Hypothesis |
| `/photo-contact-sheet-maker` | photo contact sheet maker | create contact sheet online, image proofing | Transactional | Tool Entry | Low/Medium | Hypothesis |
| `/photo-collage-maker` | photo collage maker | picture collage creator, combine photos | Transactional | Tool Entry | High | Hypothesis |
| `/contact-sheet-template` | contact sheet template | photography proof sheet template | Informational / Navigational | Gallery | Low/Medium | Hypothesis |
| `/collage-templates` | photo collage templates | free collage layouts | Informational / Navigational | Gallery | High | Hypothesis |
| `/guides/how-to-make-a-contact-sheet` | how to make a contact sheet | creating a proof sheet, contact sheet tutorial | Informational | Guide | Medium | Hypothesis |
| `/guides/how-to-make-photo-collage` | how to make a photo collage | create collage online tutorial | Informational | Guide | High | Hypothesis |
| `/guides/photo-proof-sheet-with-filenames` | photo proof sheet with filenames | contact sheet export names | Informational / Transactional | Guide / Use Case | Low | Hypothesis |
| `/compare/photoshop-contact-sheet-alternative` | photoshop contact sheet alternative | lightroom contact sheet alternative | Commercial Investigation | Comparison | Medium | Hypothesis |
| `/privacy-policy` | privacy policy | N/A | Navigational | Legal | N/A | N/A |
| `/about-us` | about frameproof | N/A | Navigational | About | N/A | N/A |
| `/contact-us` | contact frameproof | N/A | Navigational | Contact | N/A | N/A |
| `/terms-and-conditions`| terms and conditions | N/A | Navigational | Legal | N/A | N/A |

### 3.2 Keyword Clusters
1.  **Contact Sheet Creation (Primary Wedge):**
    *   *Examples:* contact sheet maker, create proof sheet online, free contact sheet software.
    *   *Intent:* Transactional.
    *   *Evidence:* Hypothesis (lower competition assumed vs. collage).
    *   *Target Pages:* `/`, `/photo-contact-sheet-maker`, `/contact-sheet-template`.
2.  **Collage Creation (Aspirational):**
    *   *Examples:* photo collage maker, combine photos online, picture collage templates.
    *   *Intent:* Transactional.
    *   *Evidence:* Hypothesis (high competition acknowledged).
    *   *Target Pages:* `/photo-collage-maker`, `/collage-templates`.
3.  **Workflow & Exporting:**
    *   *Examples:* export photos with filenames, proof sheet with file names, client photo review tool.
    *   *Intent:* Informational / Transactional.
    *   *Evidence:* Hypothesis.
    *   *Target Pages:* `/guides/photo-proof-sheet-with-filenames`.
4.  **Alternatives & Comparisons:**
    *   *Examples:* photoshop contact sheet alternative, lightroom proof sheet alternative.
    *   *Intent:* Commercial Investigation.
    *   *Evidence:* Hypothesis.
    *   *Target Pages:* `/compare/photoshop-contact-sheet-alternative`.
5.  **Tutorials & Guides:**
    *   *Examples:* how to make a contact sheet, best way to share photos for review.
    *   *Intent:* Informational.
    *   *Evidence:* Hypothesis.
    *   *Target Pages:* `/guides/*`.

### 3.3 Cannibalization Prevention
*   Each URL must target a distinct primary intent.
*   Avoid overlapping primary keywords across multiple pages (e.g., do not optimize both the homepage and a guide page equally for "contact sheet maker" — the guide is informational, the homepage is transactional).
*   Use canonical tags if dynamic parameters create duplicate content.

### 3.4 Priority Strategy
Given this is a new site, our immediate priority is the lower-competition "contact sheet maker" cluster. This serves as our realistic SEO wedge. The high-volume, high-competition "collage maker" cluster is an aspirational, long-term authority goal and should receive secondary focus during the initial growth phase.

---

## 4. User Workflow & SEO Mapping
*Maps user intent and search journeys to specific acquisition funnels.*

### 4.1 Discovery-to-Conversion Funnels
*   **Photographer needing contact sheets:**
    ```
    Search: "contact sheet maker free" 
      → Lands on: / or /photo-contact-sheet-maker
        → Uses tool → Exports
          → Explores: /guides/photo-proof-sheet-with-filenames
            → Returns: direct visit or "frameproof" search
    ```

*   **Creator wanting a collage:**
    ```
    Search: "photo collage maker online"
      → Lands on: /photo-collage-maker
        → Uses tool → Exports
          → Explores: /collage-templates
            → Returns: direct visit
    ```

*   **Student learning:**
    ```
    Search: "how to make a contact sheet"
      → Lands on: /guides/how-to-make-a-contact-sheet
        → Clicks CTA → Uses tool
          → Exports → Bookmarks
    ```

*   **Alternative seeker:**
    ```
    Search: "photoshop contact sheet alternative"
      → Lands on: /compare/photoshop-contact-sheet-alternative
        → Clicks CTA → Uses tool
    ```

### 4.2 Internal Linking Flow
```text
Homepage (/)
├── /photo-contact-sheet-maker ←→ /guides/how-to-make-a-contact-sheet
│   └── /contact-sheet-template ←→ /guides/photo-proof-sheet-with-filenames
├── /photo-collage-maker ←→ /guides/how-to-make-photo-collage
│   └── /collage-templates
├── /compare/photoshop-contact-sheet-alternative → / (CTA)
├── /about-us → /privacy-policy
└── /contact-us
```

---

## 5. Page Content Requirements
*Specifies the mandatory structure and word counts for each page type.*

| Page type | Min words | Must include | Must link to |
| :--- | :--- | :--- | :--- |
| **Tool page** | 400-600 | Feature list, how-to steps, FAQ, CTA | Related guide, templates |
| **Guide page** | 800-1200 | Step-by-step, screenshots/examples, FAQ | Tool CTA, related guides |
| **Template page**| 300-500 | Template previews, use cases, specs | Tool CTA, guides |
| **Comparison page**| 600-1000| Honest comparison table, use cases | Tool CTA |
| **Legal page** | As needed| Required legal content | Homepage |
| **About page** | 300-500 | Who, why, credibility | Tool CTA, contact |

---

## 6. On-Page Rules
*Defines formatting, metadata, and structural requirements for all pages.*

### 6.1 Title Tags
*   Primary keyword must appear near the front.
*   Length: ≤60 characters.
*   Phrased to earn the click (value proposition over just keywords).
*   Must be uniquely written for every page across the site.

### 6.2 Meta Descriptions
*   Length: 150-165 characters.
*   Include the primary keyword naturally.
*   Must be unique per page.
*   Honest framing: Google frequently rewrites these based on the user's query; they are suggestions, not guarantees.

### 6.3 Headers
*   Exactly one `<h1>` per page.
*   Maintain a strict, logical hierarchy (`<h2>`, then `<h3>`); no skipped levels (do not jump from `<h2>` to `<h4>`).
*   Use question-phrased headers for FAQ and guide content.
*   Favor clear, literal headings over clever or overly branded phrases.

### 6.4 Anti-Stuffing Rule
*   No exact-match keyword phrase may appear more than once per 150 words of body copy.
*   Favor natural variation, synonyms, and semantic relevance over exact matching.

### 6.5 URLs
*   Short, keyword-relevant slugs.
*   Use hyphens (`-`), never underscores (`_`).
*   Maintain a consistent trailing-slash convention sitewide.

### 6.6 Body Content
*   Depth is determined by the query need, not arbitrary word-count targets. A complete, concise 400-word answer is superior to a padded 1200-word article.

---

## 7. Metadata Inventory
*Comprehensive list of titles, descriptions, and settings for current and planned routes.*

| Route | Title (≤60 chars) | Description (150-165 chars) | Index | OG |
| :--- | :--- | :--- | :--- | :--- |
| `/` | Make Contact Sheet — Free Contact Sheet & Collage Maker | Create professional contact sheets and photo collages directly in your browser. Fast, secure, and free. No signup required to start arranging your photos. | index, follow | Yes |
| `/privacy-policy` | Privacy Policy · Make Contact Sheet | Read the Make Contact Sheet Privacy Policy. Learn how we handle your data securely and respect your privacy while you use our browser-based photo workspace tools. | noindex, follow | No |
| `/terms-and-conditions` | Terms and Conditions · Make Contact Sheet | Read the Make Contact Sheet terms and conditions of use. Important legal information regarding your use of our contact sheet, collage, and photo review tools. | noindex, follow | No |
| `/about-us` | About Make Contact Sheet | Learn about Make Contact Sheet's mission to build the fastest, most private browser-first workspace for photo contact sheets, collages, and client reviews. | index, follow | Yes |
| `/contact-us` | Contact Us · Make Contact Sheet | Get in touch with the Make Contact Sheet team. Reach out for support, feedback, or inquiries regarding our photo contact sheet and collage making workspace. | index, follow | Yes |
| `/404` | Page Not Found · Make Contact Sheet | We couldn't find the page you're looking for. Return to the Make Contact Sheet homepage to start creating contact sheets and photo collages for free. | noindex, follow | No |
| `/photo-contact-sheet-maker` | Fast Photo Contact Sheet Maker | Create professional photo contact sheets instantly in your browser. Perfect for proofing, reviewing, and exporting images with filenames intact. | index, follow | Yes |
| `/photo-collage-maker` | Free Photo Collage Maker | Combine your images into beautiful layouts with our browser-based photo collage maker. No downloads or sign-ups required. Secure and easy to use. | index, follow | Yes |
| `/contact-sheet-template` | Free Contact Sheet Templates | Browse our gallery of free contact sheet templates. Find the perfect layout for client proofing, photography portfolios, or printing your image collections. | index, follow | Yes |
| `/collage-templates` | Custom Photo Collage Templates | Explore customizable photo collage templates. Create stunning visual stories, mood boards, and social media graphics directly in your web browser. | index, follow | Yes |
| `/guides/how-to-make-a-contact-sheet` | How to Make a Contact Sheet: Step-by-Step Guide | Learn how to make a professional contact sheet quickly. Our step-by-step guide covers the best practices for arranging and proofing your photography. | index, follow | Yes |
| `/guides/how-to-make-photo-collage` | How to Make a Photo Collage Online | Discover how to make a beautiful photo collage online. Follow our simple tutorial to combine your favorite pictures into stunning layouts in minutes. | index, follow | Yes |
| `/guides/photo-proof-sheet-with-filenames` | Create Photo Proof Sheets with Filenames | Learn the best workflow for creating photo proof sheets that include filenames. Simplify your client review process and ensure accurate image selection. | index, follow | Yes |
| `/compare/photoshop-contact-sheet-alternative` | Best Photoshop Contact Sheet Alternative | Looking for a faster way to proof photos? Discover why Make Contact Sheet is the best lightweight alternative to Photoshop for creating contact sheets. | index, follow | Yes |

---

## 8. Structured Data Plan
*Requirements and examples for JSON-LD schema across the site.*

### 8.1 Site-Level Schema
*   **WebSite:** Deployed on the homepage (`/`).
*   **Organization:** Deployed on the homepage (`/`) and About page (`/about-us`).
*   **BreadcrumbList:** Deployed on all nested routes (e.g., guides, compare).

### 8.2 Content-Type Schema
*   **SoftwareApplication:** Deployed *only* on tool entry pages (`/photo-contact-sheet-maker`, `/photo-collage-maker`), never on blog or guide content.
*   **FAQPage:** Deployed on pages with visible FAQs. The schema content must match the visible text exactly.
*   **HowTo:** Deployed on step-by-step guide pages (`/guides/*`).

### 8.3 Validation Rules
*   Every schema block must be valid JSON-LD.
*   All implementations must be run through the Google Rich Results Test.
*   Every URL referenced in schema must resolve to the production domain.
*   No placeholder values are permitted in production code.

### 8.4 Prohibited Structured Data
*   `AggregateRating` without real, verifiable user reviews.
*   Fake author credentials or personas.
*   Any schema field describing information not visibly present on the page.

### 8.5 JSON-LD Templates

**WebSite (Homepage)**
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Make Contact Sheet",
  "url": "https://www.frameproof.com/",
  "description": "Browser-first photo contact-sheet, collage, and review workspace."
}
```

**Organization (Homepage, About)**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Make Contact Sheet",
  "url": "https://www.frameproof.com/",
  "logo": "https://www.frameproof.com/logo.png"
}
```

**SoftwareApplication (Tool Pages)**
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Make Contact Sheet Contact Sheet Maker",
  "operatingSystem": "Web Browser",
  "applicationCategory": "MultimediaApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

**FAQPage (Where applicable)**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Is Make Contact Sheet free to use?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Yes, Make Contact Sheet is completely free to use for creating contact sheets and collages in your browser."
    }
  }]
}
```

**BreadcrumbList (Nested Routes)**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": "https://www.frameproof.com/"
  },{
    "@type": "ListItem",
    "position": 2,
    "name": "Guides",
    "item": "https://www.frameproof.com/guides/"
  },{
    "@type": "ListItem",
    "position": 3,
    "name": "How to Make a Contact Sheet"
  }]
}
```

---

## 9. Technical SEO Requirements
*Ensures the technical foundation allows for maximum crawlability, rendering, and performance.*

### 9.1 Crawlability
*   `robots.txt`: Must be valid, allowing necessary crawling while blocking internal API routes or user-specific session data.
*   `sitemap.xml`: Auto-generated, containing only canonical 200 OK URLs.
*   **Canonical tags:** Required on all pages. Self-referencing by default.
*   **Status Codes:** Maintain strict adherence to 200 (OK), 301 (Permanent Redirect), and 404 (Not Found). No soft 404s.

### 9.2 Rendering
*   **Astro Framework:** We utilize Astro to render content as static HTML. Primary content must be present in the server-rendered output.
*   **Hydration:** No critical SEO content (text, main images, links) can be hidden behind client-side hydration only.
*   **Semantic HTML:** Use proper HTML5 elements (`<article>`, `<nav>`, `<aside>`, `<main>`).

### 9.3 Core Web Vitals Targets
*Honest framing: Passing these thresholds will not make thin content rank, but failing them acts as a tiebreaker against us.*
*   **LCP (Largest Contentful Paint):** < 2.5s
*   **CLS (Cumulative Layout Shift):** < 0.1
*   **INP (Interaction to Next Paint):** < 200ms
*   *Measurement:* Use PageSpeed Insights / Chrome UX Report. Never estimate these values.

### 9.4 Mobile
*   Assume mobile-first indexing for all pages.
*   Test responsive design starting at 375px width.
*   Touch targets must be ≥44px by ≥44px.
*   Ensure zero horizontal overflow (no sideways scrolling).

---

## 10. GEO & AEO Patterns
*Rules for content structure to succeed in Generative Engine and Answer Engine Optimization.*

### 10.1 Direct-Answer-First
Under every question header, the first 1-2 sentences must directly and concisely answer the question. Supporting details, context, and examples follow afterward.

### 10.2 Self-Contained Statements
Key claims and answers must be readable in isolation. Avoid vague pronoun references (e.g., replace "It is fast" with "Make Contact Sheet is fast").

### 10.3 Question-Phrased Headers
Format informational headers as real questions people ask (e.g., "How do I add filenames to a contact sheet?" instead of "Adding Filenames").

### 10.4 Lists and Tables in Real Markup
Use genuine HTML tags (`<ol>`, `<ul>`, `<table>`) for structured data. Do not format prose to look like a list using dashes or asterisks without proper markup.

---

## 11. E-E-A-T & Content Quality
*Guidelines to establish Experience, Expertise, Authoritativeness, and Trustworthiness.*

### 11.1 Claims Policy
*   Every factual claim requires a verifiable source.
*   Never use phrases like "studies show" without naming and linking the study.
*   Label estimates or hypotheses honestly.

### 11.2 Authorship
*   The `/about-us` page must explain who runs Make Contact Sheet and why they are credible to build this software.
*   Use real names where expertise matters (e.g., guide authorship).

### 11.3 AI Content Policy
*   AI-slop is strictly prohibited.
*   All AI-assisted drafting requires a rigorous human editorial pass.
*   Editors must check for and eliminate: vague hedging, repetitive openers, generic claims, and templated page structures.

### 11.4 Topic Clusters
*   **Hub:** Homepage and main tool pages.
*   **Supporting:** Guides, templates, comparison pages.
*   **Cross-linking:** Guides must link to tools, tools should link to relevant guides, and comparisons must link to tools.

---

## 12. Internal Linking Rules
*Directives for maintaining a cohesive, spider-friendly internal link architecture.*

*   Use descriptive anchor text (never "click here" or "read more").
*   Ensure zero orphan pages (every page must be linked from somewhere).
*   No broken links (404s).
*   Every public page must be within 3 clicks of the homepage.
*   Minimum ~3 relevant internal links per page.
*   Include 1-3 external links to authoritative sources where helpful to the user.

---

## 13. AdSense Compatibility
*Rules to ensure monetization does not negatively impact user experience or SEO.*

*   Ads are permitted *only* on content pages (guides, blog). Never place ads in the tool workspace.
*   No ads near drop zones, upload controls, review controls, export buttons, or progress indicators.
*   Content pages hosting ads must contain 300-500+ words of genuine, unique content.
*   No revenue forecasts or fabricated financial claims.
*   No scaled/programmatic keyword-swap pages.
*   Must strictly comply with all Google AdSense placement policies.

---

## 14. Image SEO
*Standards for ensuring visual assets contribute to search visibility.*

*   Filenames must be descriptive and use kebab-case (e.g., `contact-sheet-example.jpg`).
*   `alt` text is required on all non-decorative images.
*   Ensure appropriate dimensions (serve correctly sized images, no oversized files).
*   Implement native lazy loading (`loading="lazy"`) for images below the fold.
*   Serve modern formats (WebP/AVIF) with appropriate fallbacks.

---

## 15. Prohibited Practices
*A definitive list of tactics that are strictly forbidden.*

Any use of the following tactics is strictly prohibited and grounds for immediate rollback:
*   Fabricating search volumes, rankings, traffic, or revenue.
*   Keyword stuffing.
*   Hidden text or links (CSS `display: none` or matching background colors).
*   Cloaking.
*   Doorway pages.
*   Scaled content abuse (e.g., mass programmatic keyword-swap pages).
*   Fake reviews or testimonials.
*   Fabricated or misleading structured data.
*   Promising or guaranteeing specific rankings or approval.

---

## 16. Monitoring & Measurement
*Tools and cadence for tracking SEO performance safely.*

*   **Google Search Console:** Primary tool for monitoring indexed pages, impressions, clicks, and average position.
*   **Core Web Vitals:** Monitored via PageSpeed Insights.
*   **Broken Links:** Conduct periodic automated scans.
*   **Metadata:** Perform a sitewide scan for duplicate titles or descriptions prior to major launches.
*   *Note:* We do not make or rely upon ranking or traffic guarantees. SEO is a continuous process of aligning with user intent and technical best practices.
