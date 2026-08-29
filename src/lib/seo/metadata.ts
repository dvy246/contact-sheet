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
    title: 'Contact Sheet Maker — Free Photo Proof Sheets Online',
    description: 'Create photo contact sheets online for free. Arrange proof sheets with original filenames intact, review picks with fast shortcuts, and export print-ready PDFs.',
    canonical: `${SITE_URL}/`,
    robots: 'index, follow',
    ogType: 'website',
    schemaType: ['WebSite', 'Organization', 'SoftwareApplication'],
  },
  '/auto-cull-photos': {
    title: 'AI Photo Auto-Cull — Filter Blurry Photos in Browser',
    description: 'Automatically cull blurry, out-of-focus, and low-quality photos in your browser using local AI vision analysis. 100% private with zero cloud uploads.',
    canonical: `${SITE_URL}/auto-cull-photos`,
    robots: 'index, follow',
    ogType: 'website',
    schemaType: ['SoftwareApplication', 'HowTo', 'BreadcrumbList'],
  },
  '/batch-photo-tools': {
    title: 'Batch Photo Tools — Local Image Renamer, EXIF & Converter',
    description: 'Free local batch photo tools: batch rename photos with dynamic tokens, extract technical EXIF metadata, and convert image formats directly in your browser.',
    canonical: `${SITE_URL}/batch-photo-tools`,
    robots: 'index, follow',
    ogType: 'website',
    schemaType: ['SoftwareApplication', 'BreadcrumbList'],
  },
  '/photo-contact-sheet-maker': {
    title: 'Photo Contact Sheet Maker — Free Photography Proof Sheets',
    description: 'Make a photography contact sheet online for free. Arrange image batches into structured proof sheets with camera filenames and 300 DPI PDF print exports.',
    canonical: `${SITE_URL}/photo-contact-sheet-maker`,
    robots: 'index, follow',
    ogType: 'website',
    schemaType: ['SoftwareApplication', 'BreadcrumbList'],
  },
  '/bulk-resize-photos-to-16-9': {
    title: 'Bulk Resize Photos to 16:9 Online — Free Batch Aspect Ratio Cropper',
    description: 'Crop and resize multiple photos to 16:9 widescreen format in bulk. 100% private in-browser image processing with custom quality and zero uploads.',
    canonical: `${SITE_URL}/bulk-resize-photos-to-16-9`,
    robots: 'index, follow',
    ogType: 'website',
    schemaType: ['SoftwareApplication', 'HowTo', 'BreadcrumbList'],
  },
  '/compress-photos-for-web': {
    title: 'Compress Photos for Web — Local Batch JPEG, WebP & PNG Compressor',
    description: 'Compress images for websites and social media locally in your browser. Reduce photo file size without quality loss or privacy risks. Zero server uploads.',
    canonical: `${SITE_URL}/compress-photos-for-web`,
    robots: 'index, follow',
    ogType: 'website',
    schemaType: ['SoftwareApplication', 'HowTo', 'BreadcrumbList'],
  },
  // Indexable in its own right: the route carries a full copy block under the
  // app (how it works, every configuration field, shortcuts, formats, FAQ), so
  // it self-canonicalises and sits in the sitemap. Its target phrasing is
  // deliberately the *editor / full screen* wording rather than
  // "photo contact sheet maker", which `/photo-contact-sheet-maker` owns — two
  // pages chasing one phrase split their own signals.
  '/studio/contact-sheet': {
    title: 'Contact Sheet Editor — Full-Screen Studio',
    description: 'Full-screen browser contact sheet editor. Set custom grids, preserve camera filenames, review with fast shortcuts, and export print-ready PDFs or selection lists.',
    canonical: `${SITE_URL}/studio/contact-sheet`,
    robots: 'index, follow',
    ogType: 'website',
    schemaType: ['SoftwareApplication', 'BreadcrumbList'],
  },
  '/photo-collage-maker': {
    title: 'Free Photo Collage Maker Online — Grid & Story Layouts',
    description: 'Create custom photo collages online for free. Arrange pictures in balanced grid layouts, mobile stories, and side-by-side comparisons with zero cloud uploads.',
    canonical: `${SITE_URL}/photo-collage-maker`,
    robots: 'index, follow',
    ogType: 'website',
    schemaType: ['SoftwareApplication', 'BreadcrumbList'],
  },
  '/mood-board-maker': {
    title: 'Free Mood Board Maker Online — Visual Direction Studio',
    description: 'Design aesthetic mood boards and lookbooks online for free. Freeform canvas with drag-and-drop photos, color swatches, sticky notes, and 300 DPI exports.',
    canonical: `${SITE_URL}/mood-board-maker`,
    robots: 'index, follow',
    ogType: 'website',
    schemaType: ['SoftwareApplication', 'BreadcrumbList'],
  },
  '/mood-board-templates': {
    title: 'Free Mood Board Templates — Aesthetic Photo Layouts',
    description: 'Browse customizable photography mood board templates. Choose from aesthetic editorial, fashion lookbook, lighting, and minimal concept board presets.',
    canonical: `${SITE_URL}/mood-board-templates`,
    robots: 'index, follow',
    ogType: 'website',
    schemaType: ['BreadcrumbList'],
  },
  '/contact-sheet-template': {
    title: 'Free Contact Sheet Templates — Printable Proof Layouts',
    description: 'Browse free printable contact sheet templates. Choose calibrated A4, US Letter, and digital 16:9 contact sheet layouts with camera filenames and 300 DPI exports.',
    canonical: `${SITE_URL}/contact-sheet-template`,
    robots: 'index, follow',
    ogType: 'website',
    schemaType: ['BreadcrumbList'],
  },
  '/collage-templates': {
    title: 'Custom Photo Collage Templates — Creative Grid Layouts',
    description: 'Explore customizable photo collage templates. Create balanced visual stories, mood boards, and social media graphics directly in your web browser.',
    canonical: `${SITE_URL}/collage-templates`,
    robots: 'index, follow',
    ogType: 'website',
    schemaType: ['BreadcrumbList'],
  },
  '/guides/how-to-make-a-contact-sheet': {
    title: 'How to Make a Contact Sheet: Step-by-Step Photography Guide',
    description: 'Learn how to make a contact sheet for photography in minutes. Compare Photoshop, Lightroom, and free online methods to arrange proof sheets with filenames.',
    canonical: `${SITE_URL}/guides/how-to-make-a-contact-sheet`,
    robots: 'index, follow',
    ogType: 'article',
    schemaType: ['HowTo', 'BreadcrumbList'],
  },
  '/guides/how-to-make-photo-collage': {
    title: 'How to Make a Photo Collage Online — Step-by-Step Tutorial',
    description: 'Discover how to make a photo collage online for free. Follow our simple tutorial to combine your pictures into balanced geometric layouts in minutes.',
    canonical: `${SITE_URL}/guides/how-to-make-photo-collage`,
    robots: 'index, follow',
    ogType: 'article',
    schemaType: ['HowTo', 'BreadcrumbList'],
  },
  '/guides/how-to-make-a-mood-board': {
    title: 'How to Make a Mood Board: Step-by-Step Direction Guide',
    description: 'Learn how to make a mood board for photoshoots, brand books, and fashion lookbooks. Step-by-step tutorial on composition, color swatches, and 300 DPI exports.',
    canonical: `${SITE_URL}/guides/how-to-make-a-mood-board`,
    robots: 'index, follow',
    ogType: 'article',
    schemaType: ['HowTo', 'BreadcrumbList'],
  },
  '/guides/photo-proof-sheet-with-filenames': {
    title: 'Photo Proof Sheet with Filenames: Complete Workflow Guide',
    description: 'Learn how to create a photo proof sheet with filenames intact. Simplify client selection, preserve camera identifiers, and streamline Lightroom culling.',
    canonical: `${SITE_URL}/guides/photo-proof-sheet-with-filenames`,
    robots: 'index, follow',
    ogType: 'article',
    schemaType: ['HowTo', 'BreadcrumbList'],
  },
  '/compare/photoshop-contact-sheet-alternative': {
    title: 'Photoshop Contact Sheet Alternative — Fast In-Browser Proofing',
    description: 'Looking for a faster way to proof photos? Discover why Make Contact Sheet is the best lightweight alternative to Photoshop for creating contact sheets.',
    canonical: `${SITE_URL}/compare/photoshop-contact-sheet-alternative`,
    robots: 'index, follow',
    ogType: 'article',
    schemaType: ['BreadcrumbList'],
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
    title: '8x10 Photo Prints — Free Multi-Photo 8x10 Layout Saver',
    description: 'Create 8x10 photo prints online for free. Combine multiple 5x7s, 4x5s, or wallets onto an 8x10 photo sheet at 300 DPI for cheap Walgreens or CVS photo printing.',
    canonical: `${SITE_URL}/free-8x10-photo-prints`,
    robots: 'index, follow',
    ogType: 'website',
    schemaType: ['SoftwareApplication', 'HowTo', 'BreadcrumbList'],
  },
  '/large-photo-prints': {
    title: 'Large Photo Print Layout Maker — Free 16x20 & 24x36 Poster Collages',
    description: 'Create large photo print layouts online for free. Arrange 11x14, 16x20, and 24x36 poster collages and 300 DPI gang sheets for Walgreens and CVS printing.',
    canonical: `${SITE_URL}/large-photo-prints`,
    robots: 'index, follow',
    ogType: 'website',
    schemaType: ['SoftwareApplication', 'HowTo', 'BreadcrumbList'],
  },
  '/lightroom-client-selection-workflow': {
    title: 'Lightroom Client Selection Workflow — Sync Proof Selections with XMP',
    description: 'Step-by-step guide and zero-click XMP sidecar generator for syncing client photo selections directly into Lightroom Classic and Capture One without plugins.',
    canonical: `${SITE_URL}/lightroom-client-selection-workflow`,
    robots: 'index, follow',
    ogType: 'article',
    schemaType: ['HowTo', 'SoftwareApplication', 'BreadcrumbList'],
  },
  '/white-label-client-gallery': {
    title: 'White Label Client Photo Gallery & Proofing Portal — 100% Private',
    description: 'Create custom-branded, serverless client photo proofing portals with your own studio logo and colors. Zero monthly fees, zero cloud storage limits, 100% local.',
    canonical: `${SITE_URL}/white-label-client-gallery`,
    robots: 'index, follow',
    ogType: 'website',
    schemaType: ['SoftwareApplication', 'BreadcrumbList'],
  },
  '/404': {
    title: 'Page Not Found · Make Contact Sheet',
    description: 'We couldn\'t find the page you\'re looking for. Return to the Make Contact Sheet homepage to start creating contact sheets and photo collages for free.',
    canonical: `${SITE_URL}/404`,
    robots: 'noindex, follow',
    ogType: 'website',
  },
};
