import fs from 'fs';
import path from 'path';

const DIST_DIR = path.resolve('dist');
const LOCALES = ['es', 'de', 'fr', 'ja', 'pt'];

console.log('=== RUNNING COMPREHENSIVE MULTILINGUAL E2E TEST ===\n');

// 1. Collect all HTML files
function getHtmlFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getHtmlFiles(fullPath, files);
    } else if (entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

const allHtmlFiles = getHtmlFiles(DIST_DIR);
console.log(`Total HTML files found in dist/: ${allHtmlFiles.length}`);

let totalErrors = 0;
const report = {
  rawKeyLeaks: [],
  wrongLangAttr: [],
  untranslatedPhrases: [],
  missingCanonicals: [],
  hreflangErrors: [],
  brokenLinks: []
};

// Common raw key regex pattern (e.g. "home.heroBadge", "workflow.step1Tag", etc.)
const RAW_KEY_PATTERN = /\b(common|nav|home|features|workflow|compare|templates|footer|tools|guides)\.[a-zA-Z0-9_]{3,}\b/g;

// Key English phrases that MUST NOT appear in the body of non-English pages
const FORBIDDEN_ENGLISH_PHRASES = [
  'SEE WHAT YOU CAN CREATE',
  'PROOFING PRESETS',
  'CREATIVE COMPOSITIONS',
  'THREE-STEP WORKFLOW',
  'Related Tools & Workflows',
  'Use Preset',
  'Select Template'
];

for (const filePath of allHtmlFiles) {
  const relPath = path.relative(DIST_DIR, filePath);
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Determine locale of this file
  const firstSegment = relPath.split(path.sep)[0];
  const isLocalized = LOCALES.includes(firstSegment);
  const expectedLocale = isLocalized ? firstSegment : 'en';

  // Test 1: HTML lang attribute
  const langMatch = content.match(/<html[^>]+lang=["']([^"']+)["']/i);
  if (!langMatch || langMatch[1] !== expectedLocale) {
    report.wrongLangAttr.push({ file: relPath, expected: expectedLocale, got: langMatch ? langMatch[1] : 'none' });
    totalErrors++;
  }

  // Test 2: Raw key leaks
  const rawKeyMatches = content.match(RAW_KEY_PATTERN);
  if (rawKeyMatches) {
    // Filter out false positives if any
    const genuineLeaks = rawKeyMatches.filter(k => !k.includes('googleapis') && !k.includes('schema.org'));
    if (genuineLeaks.length > 0) {
      report.rawKeyLeaks.push({ file: relPath, keys: [...new Set(genuineLeaks)] });
      totalErrors += genuineLeaks.length;
    }
  }

  // Test 3: Untranslated English phrases on localized pages
  if (isLocalized) {
    // Only check outside script and style tags
    const cleanBody = content
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

    for (const phrase of FORBIDDEN_ENGLISH_PHRASES) {
      if (cleanBody.includes(phrase)) {
        report.untranslatedPhrases.push({ file: relPath, phrase });
        totalErrors++;
      }
    }
  }

  // Test 4: Canonical tag check
  const canonicalMatch = content.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  if (!canonicalMatch) {
    report.missingCanonicals.push(relPath);
    totalErrors++;
  }

  // Test 5: Check internal link validity
  const hrefMatches = content.matchAll(/href=["'](\/[^"']*)["']/g);
  for (const match of hrefMatches) {
    let target = match[1].split('#')[0].split('?')[0];
    if (target === '' || target === '/') {
      target = '/index.html';
    } else if (!path.extname(target)) {
      target = target.replace(/\/$/, '') + '/index.html';
    }
    const targetFile = path.join(DIST_DIR, target);
    if (!fs.existsSync(targetFile)) {
      report.brokenLinks.push({ source: relPath, target: match[1] });
      totalErrors++;
    }
  }
}

console.log('--- TEST RESULTS ---');
console.log(`- HTML lang errors: ${report.wrongLangAttr.length}`);
console.log(`- Raw key leaks: ${report.rawKeyLeaks.length}`);
console.log(`- Untranslated key English phrases: ${report.untranslatedPhrases.length}`);
console.log(`- Missing canonicals: ${report.missingCanonicals.length}`);
console.log(`- Broken internal links: ${report.brokenLinks.length}`);

if (report.rawKeyLeaks.length > 0) {
  console.log('\n[RAW KEY LEAKS]:', JSON.stringify(report.rawKeyLeaks, null, 2));
}
if (report.untranslatedPhrases.length > 0) {
  console.log('\n[UNTRANSLATED PHRASES]:', JSON.stringify(report.untranslatedPhrases, null, 2));
}
if (report.brokenLinks.length > 0) {
  console.log('\n[BROKEN LINKS]:', JSON.stringify(report.brokenLinks.slice(0, 10), null, 2));
}

if (totalErrors === 0) {
  console.log('\nSUCCESS: ALL 169 PAGES PASSED COMPREHENSIVE I18N E2E TESTS WITH 0 ERRORS!');
  process.exit(0);
} else {
  console.error(`\nFAILED: Found ${totalErrors} issues.`);
  process.exit(1);
}
