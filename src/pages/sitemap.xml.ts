import { METADATA_REGISTRY } from '../lib/seo/metadata';

export async function GET() {
  const today = new Date().toISOString().split('T')[0];

  const urls = Object.values(METADATA_REGISTRY)
    .filter(meta => meta.robots.includes('index') && !meta.robots.includes('noindex'))
    .map(meta => {
      const isHome = meta.canonical === 'https://makecontactsheet.com/' || meta.canonical === 'https://makecontactsheet.com';
      const isTool = !meta.canonical.includes('/guides/') && !meta.canonical.includes('/compare/') && !meta.canonical.includes('/about-us') && !meta.canonical.includes('/contact-us');
      const priority = isHome ? '1.0' : isTool ? '0.9' : '0.8';
      const changefreq = isHome ? 'daily' : isTool ? 'weekly' : 'monthly';

      return `  <url>\n    <loc>${meta.canonical}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, must-revalidate',
    },
  });
}
