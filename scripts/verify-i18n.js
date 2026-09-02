// scripts/verify-i18n.js (ESM)
// Gate 1: 100% Dictionary Key Parity Gate
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOCALES = ["es", "de", "fr", "ja", "pt"];
const LOCALES_DIR = path.join(process.cwd(), "src", "i18n", "locales");

function extractKeys(obj, prefix = "") {
  let keys = [];
  for (const key of Object.keys(obj)) {
    const fullPath = prefix ? `${prefix}.${key}` : key;
    if (obj[key] !== null && typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      keys = keys.concat(extractKeys(obj[key], fullPath));
    } else {
      keys.push(fullPath);
    }
  }
  return keys;
}

function loadTsDict(filePath) {
  const tsCode = fs.readFileSync(filePath, "utf-8");
  const cleanCode = tsCode
    .replace(/import\s+.*?from\s+.*?;/g, "")
    .replace(/export\s+type\s+.*?;/g, "")
    .replace(/:\s*TranslationDict/g, "")
    .replace(/export\s+const\s+\w+\s*=\s*/, "return ");

  const fn = new Function(cleanCode);
  return fn();
}

async function verify() {
  console.log("=== GATE 1: DICTIONARY KEY PARITY AUDIT ===");

  const enPath = path.join(LOCALES_DIR, "en.ts");
  if (!fs.existsSync(enPath)) {
    console.error("FAIL: Master dictionary en.ts not found at", enPath);
    process.exit(1);
  }

  const enDict = loadTsDict(enPath);
  const enKeys = new Set(extractKeys(enDict));
  console.log(`Found ${enKeys.size} translation keys in master en.ts`);

  let hasErrors = false;

  for (const locale of LOCALES) {
    const locPath = path.join(LOCALES_DIR, `${locale}.ts`);
    if (!fs.existsSync(locPath)) {
      console.error(`FAIL [${locale}]: Locale dictionary ${locale}.ts does not exist!`);
      hasErrors = true;
      continue;
    }

    const locDict = loadTsDict(locPath);
    const locKeys = new Set(extractKeys(locDict));

    const missing = [...enKeys].filter(k => !locKeys.has(k));
    const extra = [...locKeys].filter(k => !enKeys.has(k));

    if (missing.length > 0) {
      console.error(`FAIL [${locale}]: ${missing.length} missing keys:`);
      missing.slice(0, 10).forEach(k => console.error(`  - ${k}`));
      if (missing.length > 10) console.error(`  ...and ${missing.length - 10} more`);
      hasErrors = true;
    }

    if (extra.length > 0) {
      console.error(`FAIL [${locale}]: ${extra.length} unexpected extra keys:`);
      extra.slice(0, 10).forEach(k => console.error(`  + ${k}`));
      hasErrors = true;
    }

    if (missing.length === 0 && extra.length === 0) {
      console.log(`PASS [${locale}]: 100% key parity (${locKeys.size}/${enKeys.size} keys match)`);
    }
  }

  if (hasErrors) {
    console.error("\nGATE 1: FAILED - Dictionary key parity check failed.");
    process.exit(1);
  } else {
    console.log("\nGATE 1: PASSED - All target dictionaries match master en.ts with 100% key parity!");
    process.exit(0);
  }
}

verify().catch(err => {
  console.error("Error running verify-i18n:", err);
  process.exit(1);
});
