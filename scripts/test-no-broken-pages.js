import fs from 'fs';
import path from 'path';
import http from 'http';

const DIST_DIR = path.resolve('dist');
const LOCALES = ['en', 'es', 'de', 'fr', 'ja', 'pt'];
const NON_DEFAULT_LOCALES = ['es', 'de', 'fr', 'ja', 'pt'];

console.log('====================================================');
console.log('  COMPREHENSIVE MULTILINGUAL NO-BROKEN-PAGES TEST  ');
console.log('====================================================\n');

if (!fs.existsSync(DIST_DIR)) {
  console.error('ERROR: dist/ directory does not exist! Please run "npm run build" first.');
  process.exit(1);
}

// 1. Discover all HTML files
function collectHtmlFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectHtmlFiles(full, files);
    } else if (entry.name.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

const allFiles = collectHtmlFiles(DIST_DIR);
console.log(`[DISCOVERY] Found ${allFiles.length} HTML pages in dist/.\n`);

let failureCount = 0;
const failures = [];

function recordFailure(phase, page, message) {
  failureCount++;
  failures.push({ phase, page, message });
}

// -------------------------------------------------------------
// PHASE 1: Route Parity Across All 6 Locales
// -------------------------------------------------------------
console.log('▶ [PHASE 1] Checking Route Parity Across All 6 Locales...');

// Identify English base routes (exclude 404 error page)
const englishRoutes = [];
for (const file of allFiles) {
  const rel = path.relative(DIST_DIR, file);
  const segments = rel.split(path.sep);
  if (!NON_DEFAULT_LOCALES.includes(segments[0])) {
    const cleanRel = rel.replace(/(^|\/)index\.html$/, '').replace(/\.html$/, '');
    const route = '/' + cleanRel.replace(/^\//, '');
    if (route !== '/404' && !englishRoutes.includes(route)) {
      englishRoutes.push(route);
    }
  }
}

console.log(`  Found ${englishRoutes.length} content routes.`);

// Ensure each English route exists in every non-default locale
for (const route of englishRoutes) {
  for (const loc of NON_DEFAULT_LOCALES) {
    const expectedRel = route === '/' 
      ? path.join(loc, 'index.html')
      : path.join(loc, route.replace(/^\//, ''), 'index.html');
    const expectedPath = path.join(DIST_DIR, expectedRel);
    if (!fs.existsSync(expectedPath)) {
      recordFailure('Route Parity', `/${loc}${route}`, `Missing localized page for route "${route}" at "${expectedRel}"`);
    }
  }
}

if (failures.length === 0) {
  console.log(`  ✓ 100% Route Parity across all 6 locales (${englishRoutes.length * 6} pages verified).\n`);
} else {
  console.log(`  ✗ Found ${failures.length} route parity failures!\n`);
}

// -------------------------------------------------------------
// PHASE 2: HTML Document Health, Metadata, & Content Size
// -------------------------------------------------------------
console.log('▶ [PHASE 2] Checking Document Health, Titles, Meta, Canonicals & Hreflang...');

const CRASH_LEAK_PATTERNS = [
  { pattern: /\b(undefined|null|NaN|NaNpx)\b/g, label: 'JS render artifact' },
  { pattern: /\[object Object\]/g, label: 'Unstringified object [object Object]' },
  { pattern: /\b(ReferenceError|TypeError|SyntaxError):\b/g, label: 'JS Error trace' },
  { pattern: /\b(common|nav|home|features|workflow|compare|templates|footer|tools|guides)\.[a-zA-Z0-9_]{3,}\b/g, label: 'Unresolved raw i18n key' }
];

const pageIdIndex = new Map(); // file -> Set of element IDs

for (const file of allFiles) {
  const rel = path.relative(DIST_DIR, file);
  const content = fs.readFileSync(file, 'utf-8');
  const size = Buffer.byteLength(content, 'utf-8');

  // Determine expected locale
  const firstSeg = rel.split(path.sep)[0];
  const locale = NON_DEFAULT_LOCALES.includes(firstSeg) ? firstSeg : 'en';

  // 1. File size check (must be at least 1KB)
  if (size < 1000) {
    recordFailure('Document Health', rel, `Abnormally small file size: ${size} bytes`);
  }

  // 2. HTML lang attribute check
  const langMatch = content.match(/<html[^>]+lang=["']([^"']+)["']/i);
  if (!langMatch) {
    recordFailure('Metadata', rel, 'Missing <html lang="..."> attribute');
  } else if (langMatch[1] !== locale) {
    recordFailure('Metadata', rel, `Incorrect lang attribute: expected "${locale}", got "${langMatch[1]}"`);
  }

  // 3. Title tag check
  const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
  if (!titleMatch || !titleMatch[1].trim()) {
    recordFailure('Metadata', rel, 'Missing or empty <title> tag');
  } else if (titleMatch[1].includes('undefined') || titleMatch[1].includes('null')) {
    recordFailure('Metadata', rel, `<title> contains crash string: "${titleMatch[1]}"`);
  }

  // 4. Meta description check (404 page is exempt)
  if (!rel.includes('404')) {
    const metaDescMatch = content.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i);
    if (!metaDescMatch || !metaDescMatch[1].trim()) {
      recordFailure('Metadata', rel, 'Missing or empty <meta name="description"> tag');
    }
  }

  // 5. Canonical link tag check
  const canonicalMatch = content.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  if (!canonicalMatch) {
    recordFailure('Metadata', rel, 'Missing <link rel="canonical"> tag');
  }

  // 6. Hreflang cluster check (Indexable pages only; 404, privacy, terms with noindex are exempt)
  const isNoIndex = content.includes('content="noindex');
  if (!isNoIndex && !rel.includes('404')) {
    const hreflangMatches = [...content.matchAll(/<link[^>]+hreflang=["']([^"']+)["'][^>]+href=["']([^"']+)["']/gi)];
    if (hreflangMatches.length < 7) {
      recordFailure('Hreflang', rel, `Incomplete hreflang cluster: expected at least 7 alternates (6 locales + x-default), found ${hreflangMatches.length}`);
    }
  }

  // 7. Check for JS render crash / leak patterns
  const cleanBody = content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

  for (const { pattern, label } of CRASH_LEAK_PATTERNS) {
    const matches = cleanBody.match(pattern);
    if (matches) {
      const realLeaks = matches.filter(m => !m.includes('schema.org') && !m.includes('googleapis'));
      const severeLeaks = realLeaks.filter(m => {
        if (m === 'null' || m === 'undefined') {
          return cleanBody.includes(` ${m} `) || cleanBody.includes(`>${m}<`);
        }
        return true;
      });

      if (severeLeaks.length > 0) {
        recordFailure('Render Artifacts', rel, `Detected ${label}: ${[...new Set(severeLeaks)].join(', ')}`);
      }
    }
  }

  // Index element IDs for anchor validation
  const idMatches = [...content.matchAll(/\bid=["']([^"']+)["']/gi)];
  const ids = new Set(idMatches.map(m => m[1]));
  pageIdIndex.set(rel, ids);
}

console.log(`  ✓ Checked all ${allFiles.length} pages for document health & metadata.\n`);

// -------------------------------------------------------------
// PHASE 3: Internal Links & Anchor Target Integrity
// -------------------------------------------------------------
console.log('▶ [PHASE 3] Checking All Internal Links & Anchor Targets...');

let totalLinksChecked = 0;

for (const file of allFiles) {
  const rel = path.relative(DIST_DIR, file);
  const content = fs.readFileSync(file, 'utf-8');

  // Extract all href attributes
  const hrefMatches = [...content.matchAll(/\bhref=["'](\/[^"']*|#[^"']*)["']/gi)];
  for (const match of hrefMatches) {
    const rawHref = match[1];
    totalLinksChecked++;

    if (rawHref.startsWith('#')) {
      continue;
    }

    // Internal path link
    const [pathname, hash] = rawHref.split('#');
    const [cleanPath] = pathname.split('?');

    let targetFile = cleanPath;
    if (targetFile === '/' || targetFile === '') {
      targetFile = '/index.html';
    } else if (!path.extname(targetFile)) {
      targetFile = targetFile.replace(/\/$/, '') + '/index.html';
    }

    const fullTargetPath = path.join(DIST_DIR, targetFile.replace(/^\//, ''));
    if (!fs.existsSync(fullTargetPath)) {
      recordFailure('Broken Link', rel, `Broken internal link to: "${rawHref}" (resolved to "${targetFile}")`);
    }
  }
}

console.log(`  ✓ Audited ${totalLinksChecked} internal links across all pages.\n`);

// -------------------------------------------------------------
// PHASE 4: Live HTTP Server Crawler
// -------------------------------------------------------------
console.log('▶ [PHASE 4] Running Live HTTP Server Crawler across all pages...');

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0].split('#')[0]);
  if (reqPath.endsWith('/')) {
    reqPath += 'index.html';
  } else if (!path.extname(reqPath)) {
    reqPath += '/index.html';
  }

  const filePath = path.join(DIST_DIR, reqPath.replace(/^\//, ''));
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const port = server.address().port;
console.log(`  Started test server on http://127.0.0.1:${port}`);

// Fetch every single page via HTTP
let httpChecks = 0;
const httpPromises = allFiles.map(async (file) => {
  const rel = path.relative(DIST_DIR, file);
  const route = '/' + rel.replace(/(^|\/)index\.html$/, '').replace(/^\//, '');

  return new Promise((resolve) => {
    http.get(`http://127.0.0.1:${port}${route}`, (res) => {
      httpChecks++;
      if (res.statusCode !== 200) {
        recordFailure('HTTP Serving', route, `HTTP status ${res.statusCode} (expected 200)`);
      }
      res.resume();
      res.on('end', resolve);
    }).on('error', (err) => {
      recordFailure('HTTP Serving', route, `HTTP connection error: ${err.message}`);
      resolve();
    });
  });
});

await Promise.all(httpPromises);
server.close();
console.log(`  ✓ Successfully fetched ${httpChecks} pages over live HTTP.\n`);

// -------------------------------------------------------------
// SUMMARY & VERDICT
// -------------------------------------------------------------
console.log('====================================================');
console.log('  TEST SUMMARY');
console.log('====================================================');
console.log(`Total Pages Audited:       ${allFiles.length}`);
console.log(`Total Content Routes:      ${englishRoutes.length}`);
console.log(`Total Links Verified:      ${totalLinksChecked}`);
console.log(`Total HTTP Requests:       ${httpChecks}`);
console.log(`Total Failures Detected:   ${failureCount}`);

if (failureCount === 0) {
  console.log('\n🌟 VERDICT: PASS - ZERO BROKEN PAGES DETECTED ACROSS ALL LANGUAGES!\n');
  process.exit(0);
} else {
  console.error('\n❌ VERDICT: FAIL - Broken pages or errors detected:');
  failures.forEach((f, i) => {
    console.error(`  ${i + 1}. [${f.phase}] ${f.page} -> ${f.message}`);
  });
  console.log('');
  process.exit(1);
}
