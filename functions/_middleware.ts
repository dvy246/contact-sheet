// Cloudflare Pages middleware: block search-engine indexing on *.pages.dev
// preview domains to prevent duplicate content with the production domain
// (makecontactsheet.com). Only the custom domain should be indexed.

export const onRequest: PagesFunction = async (context) => {
  const response = await context.next();
  const host = context.request.headers.get('host') || '';

  // Add noindex header on any *.pages.dev preview/staging URL
  if (host.endsWith('.pages.dev')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response;
};
