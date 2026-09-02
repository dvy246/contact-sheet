// scripts/e2e-audit-dist.js (ESM)
// Gate 4: Full-Dist E2E Link, Hreflang & Leak Audit
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(process.cwd(), "dist");
const LOCALES = ["en", "es", "de", "fr", "ja", "pt"];
const SITE_URL = "https://makecontactsheet.com";

function getAllHtmlFiles(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getAllHtmlFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      results.push(fullPath);
    }
  }
  return results;
}

function runAudit() {
  console.log("=== GATE 4: FULL-DIST E2E AUDIT ===");

  if (!fs.existsSync(DIST_DIR)) {
    console.error("FAIL: dist/ directory not found. Run npm run build first.");
    process.exit(1);
  }

  const htmlFiles = getAllHtmlFiles(DIST_DIR);
  console.log(`Auditing ${htmlFiles.length} generated HTML files in dist/...`);

  let brokenLinksCount = 0;
  let missingCanonicals = 0;
  let hreflangErrors = 0;
  let keyLeakCount = 0;

  const rawKeyPattern = /\b(nav|common|footer|home|studio|batch|moodboard|faq|compare|features)\.[a-zA-Z0-9_]{3,}\b/g;

  for (const file of htmlFiles) {
    const relPath = path.relative(DIST_DIR, file);
    const content = fs.readFileSync(file, "utf-8");

    // 1. Raw translation key leak check
    const cleanContent = content
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");

    const leaks = cleanContent.match(rawKeyPattern);
    if (leaks) {
      const trueLeaks = leaks.filter(k => !k.includes(".com") && !k.includes(".org") && !k.includes(".css"));
      if (trueLeaks.length > 0) {
        console.error(`LEAK in ${relPath}: found raw keys:`, trueLeaks.slice(0, 5));
        keyLeakCount += trueLeaks.length;
      }
    }

    // 2. Canonical check
    const canonicalMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
    if (!canonicalMatch) {
      console.error(`MISSING CANONICAL: ${relPath}`);
      missingCanonicals++;
    }

    // 3. Hreflang check (for indexable pages, skipping 404 and noindex legal pages)
    const isNoIndex = content.includes('content="noindex') || relPath.includes('privacy-policy') || relPath.includes('terms-and-conditions');
    if (!relPath.includes("404") && !isNoIndex) {
      const hreflangs = [...content.matchAll(/<link\s+rel=["']alternate["']\s+hreflang=["']([^"']+)["']\s+href=["']([^"']+)["']/gi)];
      const expectedCount = LOCALES.length + 1; // 6 locales + x-default
      if (hreflangs.length < expectedCount) {
        console.error(`INCOMPLETE HREFLANG CLUSTER in ${relPath}: found ${hreflangs.length}, expected ${expectedCount}`);
        hreflangErrors++;
      }
    }

    // 4. Check 404 language switcher
    if (relPath === "404.html") {
      if (content.includes("/es/404") || content.includes("/de/404") || content.includes("/fr/404") || content.includes("/ja/404") || content.includes("/pt/404")) {
        console.error("FAIL: 404.html contains language switcher links with /404 slug! (Violates Lesson 4)");
        brokenLinksCount++;
      }
    }

    // 5. Internal link check
    const linkMatches = [...content.matchAll(/<a\s+[^>]*href=["']([^"\x27#]+)["']/gi)];
    for (const match of linkMatches) {
      const href = match[1];
      if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) {
        continue;
      }
      let targetPath = href.split("?")[0];
      if (targetPath.startsWith("/")) {
        targetPath = targetPath.slice(1);
      }
      
      const possibleFile1 = path.join(DIST_DIR, targetPath);
      const possibleFile2 = path.join(DIST_DIR, targetPath, "index.html");
      const possibleFile3 = targetPath === "" ? path.join(DIST_DIR, "index.html") : path.join(DIST_DIR, `${targetPath}.html`);

      if (!fs.existsSync(possibleFile1) && !fs.existsSync(possibleFile2) && !fs.existsSync(possibleFile3)) {
        console.error(`BROKEN INTERNAL LINK in ${relPath}: href="${href}" -> target does not exist`);
        brokenLinksCount++;
      }
    }
  }

  console.log(`\nAudit Summary:`);
  console.log(`- Broken links: ${brokenLinksCount}`);
  console.log(`- Missing canonicals: ${missingCanonicals}`);
  console.log(`- Hreflang cluster errors: ${hreflangErrors}`);
  console.log(`- Raw key leaks: ${keyLeakCount}`);

  if (brokenLinksCount > 0 || missingCanonicals > 0 || hreflangErrors > 0 || keyLeakCount > 0) {
    console.error("\nGATE 4: FAILED - E2E audit detected issues.");
    process.exit(1);
  } else {
    console.log("\nGATE 4: PASSED - All generated files are clean, valid, and verified!");
    process.exit(0);
  }
}

runAudit();
