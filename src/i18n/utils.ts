import { LOCALES, DEFAULT_LOCALE, type Locale, LOCALE_MAP } from "./config";

export const SITE_URL = "https://makecontactsheet.com";

/**
 * Returns clean localized path.
 * If locale is "en" (default), path is unprefixed.
 * If locale is non-default, path is prefixed with /locale.
 */
export function l(path: string, locale: Locale = DEFAULT_LOCALE): string {
  // Hash/query are split off first: normalising `/#workspace` as a whole left
  // `/de/#workspace`, a slash URL Cloudflare 308-redirects to `/de`.
  const suffixAt = path.search(/[?#]/);
  const suffix = suffixAt === -1 ? "" : path.slice(suffixAt);
  if (suffixAt !== -1) path = path.slice(0, suffixAt) || "/";

  // Normalize path: ensure leading slash, remove trailing slash (unless root)
  let cleanPath = path.startsWith("/") ? path : `/${path}`;
  // With `build.format: 'file'`, Astro.url.pathname is `/page.html` at build
  // time; the public URL Cloudflare serves (and every canonical) has no suffix.
  cleanPath = cleanPath.replace(/(\/index)?\.html$/, "") || "/";
  if (cleanPath.length > 1 && cleanPath.endsWith("/")) {
    cleanPath = cleanPath.slice(0, -1);
  }

  // Strip any existing locale prefix if present to avoid /es/es/
  for (const loc of LOCALES) {
    if (cleanPath === `/${loc}` || cleanPath.startsWith(`/${loc}/`)) {
      cleanPath = cleanPath.slice(loc.length + 1) || "/";
      break;
    }
  }

  if (locale === DEFAULT_LOCALE) {
    return cleanPath + suffix;
  }

  return (cleanPath === "/" ? `/${locale}` : `/${locale}${cleanPath}`) + suffix;
}

/**
 * Given any path and target locale, generates the target locale path.
 * On 404/500 error pages, links to the localized root (e.g. /es/ or /)
 * to prevent broken error page loops (Lesson 4).
 */
export function getLocalizedPath(currentPath: string, targetLocale: Locale): string {
  if (currentPath.includes("/404") || currentPath.includes("/500")) {
    return targetLocale === DEFAULT_LOCALE ? "/" : `/${targetLocale}`;
  }
  return l(currentPath, targetLocale);
}

/**
 * Generates self-referencing canonical URL.
 */
export function getCanonicalUrl(currentPath: string, locale: Locale = DEFAULT_LOCALE): string {
  const localizedPath = l(currentPath, locale);
  return `${SITE_URL}${localizedPath === "/" ? "/" : localizedPath}`;
}

export interface HreflangLink {
  rel: "alternate";
  hreflang: string;
  href: string;
}

/**
 * Generates the full hreflang cluster for all 6 locales + x-default (canonical English URL).
 */
export function getHreflangLinks(currentPath: string): HreflangLink[] {
  const links: HreflangLink[] = [];

  for (const locale of LOCALES) {
    links.push({
      rel: "alternate",
      hreflang: LOCALE_MAP[locale].langAttr,
      href: getCanonicalUrl(currentPath, locale),
    });
  }

  // x-default points to canonical English version
  links.push({
    rel: "alternate",
    hreflang: "x-default",
    href: getCanonicalUrl(currentPath, DEFAULT_LOCALE),
  });

  return links;
}

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}
