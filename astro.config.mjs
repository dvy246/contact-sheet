import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://makecontactsheet.com',
  trailingSlash: 'never',
  // Emit /page.html, not /page/index.html. Cloudflare Pages serves a directory
  // index only at /page/ and 308s /page to it, so the default format made every
  // canonical, hreflang and sitemap URL (all slash-less) point at a redirect.
  build: {
    format: 'file',
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'de', 'fr', 'ja', 'pt'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
