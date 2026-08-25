export interface RouteMetadata {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  ogType?: string;
  schemaType?: string[];
}

export const SITE_URL = 'https://www.frameproof.com';

export const METADATA_REGISTRY: Record<string, RouteMetadata> = {
  '/': {
    title: 'FrameProof — Free Contact Sheet & Collage Maker',
    description: 'Create professional contact sheets and photo collages directly in your browser. Fast, secure, and free. No signup required to start arranging your photos.',
    canonical: `${SITE_URL}/`,
    robots: 'index, follow',
    ogType: 'website',
    schemaType: ['WebSite', 'Organization', 'SoftwareApplication', 'FAQPage'],
  },
  '/photo-contact-sheet-maker': {
    title: 'Fast Photo Contact Sheet Maker',
    description: 'Create professional photo contact sheets instantly in your browser. Perfect for proofing, reviewing, and exporting images with filenames intact.',
    canonical: `${SITE_URL}/photo-contact-sheet-maker`,
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
    description: 'Looking for a faster way to proof photos? Discover why FrameProof is the best lightweight alternative to Photoshop for creating contact sheets.',
    canonical: `${SITE_URL}/compare/photoshop-contact-sheet-alternative`,
    robots: 'index, follow',
    ogType: 'article',
    schemaType: ['BreadcrumbList', 'FAQPage'],
  },
  '/about-us': {
    title: 'About FrameProof',
    description: 'Learn about FrameProof\'s mission to build the fastest, most private browser-first workspace for photo contact sheets, collages, and client reviews.',
    canonical: `${SITE_URL}/about-us`,
    robots: 'index, follow',
    ogType: 'website',
    schemaType: ['Organization', 'BreadcrumbList'],
  },
  '/contact-us': {
    title: 'Contact Us · FrameProof',
    description: 'Get in touch with the FrameProof team. Reach out for support, feedback, or inquiries regarding our photo contact sheet and collage making workspace.',
    canonical: `${SITE_URL}/contact-us`,
    robots: 'index, follow',
    ogType: 'website',
    schemaType: ['BreadcrumbList'],
  },
  '/privacy-policy': {
    title: 'Privacy Policy · FrameProof',
    description: 'Read the FrameProof Privacy Policy. Learn how we handle your data securely and respect your privacy while you use our browser-based photo workspace tools.',
    canonical: `${SITE_URL}/privacy-policy`,
    robots: 'noindex, follow',
    ogType: 'website',
    schemaType: ['BreadcrumbList'],
  },
  '/terms-and-conditions': {
    title: 'Terms and Conditions · FrameProof',
    description: 'Read the FrameProof terms and conditions of use. Important legal information regarding your use of our contact sheet, collage, and photo review tools.',
    canonical: `${SITE_URL}/terms-and-conditions`,
    robots: 'noindex, follow',
    ogType: 'website',
    schemaType: ['BreadcrumbList'],
  },
  '/404': {
    title: 'Page Not Found · FrameProof',
    description: 'We couldn\'t find the page you\'re looking for. Return to the FrameProof homepage to start creating contact sheets and photo collages for free.',
    canonical: `${SITE_URL}/404`,
    robots: 'noindex, follow',
    ogType: 'website',
  },
};
