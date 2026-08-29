import { METADATA_REGISTRY } from '../lib/seo/metadata';

export async function GET() {
  const urls = Object.values(METADATA_REGISTRY)
    .filter(meta => meta.robots.includes('index') && !meta.robots.includes('noindex'))
    .map(meta => `  <url>\n    <loc>${meta.canonical}</loc>\n  </url>`)
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
