import { METADATA_REGISTRY } from '../lib/seo/metadata';
import { LOCALES } from '../i18n/config';
import { getCanonicalUrl, getHreflangLinks } from '../i18n/utils';

export async function GET() {
  const today = new Date().toISOString().split('T')[0];

  const indexablePaths = Object.keys(METADATA_REGISTRY).filter((path) => {
    const meta = METADATA_REGISTRY[path];
    return meta.robots.includes('index') && !meta.robots.includes('noindex');
  });

  const urlEntries: string[] = [];

  for (const path of indexablePaths) {
    const isHome = path === '/';
    const isTool =
      !path.includes('/guides/') &&
      !path.includes('/compare/') &&
      !path.includes('/about-us') &&
      !path.includes('/contact-us');
    const priority = isHome ? '1.0' : isTool ? '0.9' : '0.8';
    const changefreq = isHome ? 'daily' : isTool ? 'weekly' : 'monthly';

    const hreflangLinks = getHreflangLinks(path);
    const alternateTags = hreflangLinks
      .map(
        (link) =>
          `    <xhtml:link rel="alternate" hreflang="${link.hreflang}" href="${link.href}" />`
      )
      .join('\n');

    for (const locale of LOCALES) {
      const locUrl = getCanonicalUrl(path, locale);
      urlEntries.push(`  <url>
    <loc>${locUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${alternateTags}
  </url>`);
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries.join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, must-revalidate',
    },
  });
}
