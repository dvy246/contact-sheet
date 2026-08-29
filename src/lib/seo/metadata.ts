export interface RouteMetadata {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  ogType?: string;
  schemaType?: string[];
}

export const SITE_URL = 'https://makecontactsheet.com';

export const METADATA_REGISTRY: Record<string, RouteMetadata> = {
  '/': {
    title: 'Make Contact Sheet - Free Contact Sheet & Collage Maker',
    description: 'Create professional contact sheets and photo collages directly in your browser. Fast, secure, and free. No signup required to start arranging your photos.',
    canonical: `${SITE_URL}/`,
    robots: 'index, follow',
    ogType: 'website',
    schemaType: ['WebSite', 'Organization', 'SoftwareApplication', 'FAQPage'],
  },
  '/auto-cull-photos': {
    title: 'AI Photo Auto-Culling Tool — Filter Blurry & Out-of-Focus Photos Locally',
    description: 'Automatically cull blurry, out-of-focus, and low-quality photos in your browser using local AI vision analysis. 100% private with zero cloud uploads.',
    canonical: `${SITE_URL}/auto-cull-photos`,
    robots: 'index, follow',
    ogType: 'website',
    schemaType: ['SoftwareApplication', 'HowTo', 'FAQPage', 'BreadcrumbList'],
  },
  '/batch-photo-tools': {
    title: 'Batch Photo Tools — Local Image Renamer, EXIF Extractor & Converter',
    description: 'Batch rename photos with dynamic token recipes, extract technical camera EXIF metadata, and convert image formats locally in your browser. 100% private, zero uploads.',
    canonical: `${SITE_URL}/batch-photo-tools`,
    robots: 'index, follow',
    ogType: 'website',
    schemaType: ['SoftwareApplication', 'FAQPage', 'BreadcrumbList'],
  },
  '/photo-contact-sheet-maker': {
    title: 'Fast Photo Contact Sheet Maker',
    description: 'Create professional photo contact sheets instantly in your browser. Perfect for proofing, reviewing, and exporting images with filenames intact.',
    canonical: `${SITE_URL}/photo-contact-sheet-maker`,
    robots: 'index, follow',
    ogType: 'website',
    schemaType: ['SoftwareApplication', 'FAQPage', 'BreadcrumbList'],
  },
  '/bulk-resize-photos-to-16-9': {
    title: 'Bulk Resize Photos to 16:9 Online — Free Batch Aspect Ratio Cropper',
    description: 'Crop and resize multiple photos to 16:9 widescreen format in bulk. 100% private in-browser image processing with custom quality and zero uploads.',
    canonical: `${SITE_URL}/bulk-resize-photos-to-16-9`,
    robots: 'index, follow',
    ogType: 'website',
    schemaType: ['SoftwareApplication', 'HowTo', 'FAQPage', 'BreadcrumbList'],
  },
  '/compress-photos-for-web': {
    title: 'Compress Photos for Web — Local Batch JPEG, WebP & PNG Compressor',
    description: 'Compress images for websites and social media locally in your browser. Reduce photo file size without quality loss or privacy risks. Zero server uploads.',
    canonical: `${SITE_URL}/compress-photos-for-web`,
    robots: 'index, follow',
    ogType: 'website',
    schemaType: ['SoftwareApplication', 'HowTo', 'FAQPage', 'BreadcrumbList'],
  },
  // Indexable in its own right: the route carries a full copy block under the
  // app (how it works, every configuration field, shortcuts, formats, FAQ), so
  // it self-canonicalises and sits in the sitemap. Its target phrasing is
  // deliberately the *editor / full screen* wording rather than
  // "photo contact sheet maker", which `/photo-contact-sheet-maker` owns — two
  // pages chasing one phrase split their own signals.
  '/studio/contact-sheet': {
    title: 'Contact Sheet Editor — Full-Screen Studio',
    description: 'A full-screen contact sheet editor that runs in your browser. Set any grid, page size or custom mm format, keep original filenames on every frame, review with keyboard shortcuts and export PDF, PNG, JPEG or a selection list.',
    canonical: `${SITE_URL}/studio/contact-sheet`,
    robots: 'index, follow',
    ogType: 'website',
    schemaType: ['SoftwareApplication', 'FAQPage', 'BreadcrumbList'],
  },
  '/photo-collage-maker': {
    title: 'Free Photo Collage Maker',
    description: 'Combine your images into beautiful layouts with our browser-based photo collage maker. No downloads or sign-ups required. Secure and easy to use.',
    canonical: `${SITE_URL}/photo-collage-maker`,
    robots: 'index, follow',
    ogType: 'website',
    schemaType: ['SoftwareApplication', 'FAQPage', 'BreadcrumbList'],
  },
  '/mood-board-maker': {
    title: 'Free Mood Board Maker — Visual Photo Concept & Lookbook Studio',
    description: 'Design aesthetic photo mood boards, concept boards, and fashion lookbooks online. Freeform canvas with drag-and-drop, snapping guides, color swatches, and 300 DPI exports. 100% private.',
    canonical: `${SITE_URL}/mood-board-maker`,
    robots: 'index, follow',
    ogType: 'website',
    schemaType: ['SoftwareApplication', 'FAQPage', 'BreadcrumbList'],
  },
  '/contact-sheet-template': {
    title: 'Free Contact Sheet Templates',
    description: 'Browse our gallery of free contact sheet templates. Find the perfect layout for client proofing, photography portfolios, or printing your image collections.',
    canonical: `${SITE_URL}/contact-sheet-template`,
    robots: 'index, follow',
    ogType: 'website',
    schemaType: ['BreadcrumbList', 'FAQPage'],
  },
  '/collage-templates': {
    title: 'Custom Photo Collage Templates',
    description: 'Explore customizable photo collage templates. Create stunning visual stories, mood boards, and social media graphics directly in your web browser.',
    canonical: `${SITE_URL}/collage-templates`,
    robots: 'index, follow',
    ogType: 'website',
    schemaType: ['BreadcrumbList', 'FAQPage'],
  },
  '/guides/how-to-make-a-contact-sheet': {
    title: 'How to Make a Contact Sheet: Step-by-Step Guide',
    description: 'Learn how to make a professional contact sheet quickly. Our step-by-step guide covers the best practices for arranging and proofing your photography.',
    canonical: `${SITE_URL}/guides/how-to-make-a-contact-sheet`,
    robots: 'index, follow',
    ogType: 'article',
    schemaType: ['HowTo', 'BreadcrumbList', 'FAQPage'],
  },
  '/guides/how-to-make-photo-collage': {
    title: 'How to Make a Photo Collage Online',
    description: 'Discover how to make a beautiful photo collage online. Follow our simple tutorial to combine your favorite pictures into stunning layouts in minutes.',
    canonical: `${SITE_URL}/guides/how-to-make-photo-collage`,
    robots: 'index, follow',
    ogType: 'article',
    schemaType: ['HowTo', 'BreadcrumbList', 'FAQPage'],
  },
  '/guides/photo-proof-sheet-with-filenames': {
    title: 'Create Photo Proof Sheets with Filenames',
    description: 'Learn the best workflow for creating photo proof sheets that include filenames. Simplify your client review process and ensure accurate image selection.',
    canonical: `${SITE_URL}/guides/photo-proof-sheet-with-filenames`,
    robots: 'index, follow',
    ogType: 'article',
    schemaType: ['HowTo', 'BreadcrumbList', 'FAQPage'],
  },
  '/compare/photoshop-contact-sheet-alternative': {
    title: 'Best Photoshop Contact Sheet Alternative',
    description: 'Looking for a faster way to proof photos? Discover why Make Contact Sheet is the best lightweight alternative to Photoshop for creating contact sheets.',
    canonical: `${SITE_URL}/compare/photoshop-contact-sheet-alternative`,
    robots: 'index, follow',
    ogType: 'article',
    schemaType: ['BreadcrumbList', 'FAQPage'],
  },
  '/about-us': {
    title: 'About Make Contact Sheet',
    description: 'Learn about Make Contact Sheet\'s mission to build the fastest, most private browser-first workspace for photo contact sheets, collages, and client reviews.',
    canonical: `${SITE_URL}/about-us`,
    robots: 'index, follow',
    ogType: 'website',
    schemaType: ['Organization', 'BreadcrumbList'],
  },
  '/contact-us': {
    title: 'Contact Us · Make Contact Sheet',
    description: 'Get in touch with the Make Contact Sheet team. Reach out for support, feedback, or inquiries regarding our photo contact sheet and collage making workspace.',
    canonical: `${SITE_URL}/contact-us`,
    robots: 'index, follow',
    ogType: 'website',
    schemaType: ['BreadcrumbList'],
  },
  '/privacy-policy': {
    title: 'Privacy Policy · Make Contact Sheet',
    description: 'Read the Make Contact Sheet Privacy Policy. Learn how we handle your data securely and respect your privacy while you use our browser-based photo workspace tools.',
    canonical: `${SITE_URL}/privacy-policy`,
    robots: 'noindex, follow',
    ogType: 'website',
    schemaType: ['BreadcrumbList'],
  },
  '/terms-and-conditions': {
    title: 'Terms and Conditions · Make Contact Sheet',
    description: 'Read the Make Contact Sheet terms and conditions of use. Important legal information regarding your use of our contact sheet, collage, and photo review tools.',
    canonical: `${SITE_URL}/terms-and-conditions`,
    robots: 'noindex, follow',
    ogType: 'website',
    schemaType: ['BreadcrumbList'],
  },
  '/free-8x10-photo-prints': {
    title: 'Free 8×10 Photo Print Templates & Print-Saver Maker',
    description: 'Combine multiple 5x7 or 4x5 photos onto a single 8x10 print. Save money at Walgreens, CVS, or local labs with our free browser-based print-saver maker.',
    canonical: `${SITE_URL}/free-8x10-photo-prints`,
    robots: 'index, follow',
    ogType: 'website',
    schemaType: ['SoftwareApplication', 'HowTo', 'FAQPage', 'BreadcrumbList'],
  },
  '/lightroom-client-selection-workflow': {
    title: 'Lightroom Client Selection Workflow — Sync Proof Selections with XMP',
    description: 'Step-by-step guide and zero-click XMP sidecar generator for syncing client photo selections directly into Lightroom Classic and Capture One without plugins.',
    canonical: `${SITE_URL}/lightroom-client-selection-workflow`,
    robots: 'index, follow',
    ogType: 'article',
    schemaType: ['HowTo', 'SoftwareApplication', 'FAQPage', 'BreadcrumbList'],
  },
  '/white-label-client-gallery': {
    title: 'White Label Client Photo Gallery & Proofing Portal — 100% Private',
    description: 'Create custom-branded, serverless client photo proofing portals with your own studio logo and colors. Zero monthly fees, zero cloud storage limits, 100% local.',
    canonical: `${SITE_URL}/white-label-client-gallery`,
    robots: 'index, follow',
    ogType: 'website',
    schemaType: ['SoftwareApplication', 'FAQPage', 'BreadcrumbList'],
  },
  '/404': {
    title: 'Page Not Found · Make Contact Sheet',
    description: 'We couldn\'t find the page you\'re looking for. Return to the Make Contact Sheet homepage to start creating contact sheets and photo collages for free.',
    canonical: `${SITE_URL}/404`,
    robots: 'noindex, follow',
    ogType: 'website',
  },
};
