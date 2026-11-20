export type ServiceCategory =
  | 'All'
  | '3D & LED Signs'
  | 'ACP & Cladding'
  | 'Prints & Glass'
  | 'CNC & Fabrication';

export interface SignageService {
  id: string;
  index: string;
  title: string;
  category: Exclude<ServiceCategory, 'All'>;
  summary: string;
  materials: string[];
}

export interface GalleryMediaItem {
  id: string;
  label: string;
  type: 'image' | 'video';
  url: string;
  alt?: string;
}

export interface GalleryProject {
  id: string;
  title: string;
  category: Exclude<ServiceCategory, 'All'>;
  locationNote: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  isRepresentativeVisual: boolean;
  secondaryImageUrl?: string;
  secondaryImageAlt?: string;
  videoUrl?: string;
  mediaItems?: GalleryMediaItem[];
  suggestedService?: string;
}

export interface CatalogueMediaExtra {
  id: string;
  title: string;
  subtitle: string;
  category: Exclude<ServiceCategory, 'All'>;
  type: 'image' | 'video';
  url: string;
  alt: string;
  description: string;
  suggestedService: string;
}

export type FaqTopic =
  | 'All'
  | 'Timelines'
  | 'Warranty'
  | 'Materials'
  | 'Orders & Visits';

export interface FaqItem {
  id: string;
  topic: Exclude<FaqTopic, 'All'>;
  question: string;
  answer: string;
}

export interface InstagramProfile {
  handle: string;
  url?: string;
}

export const BUSINESS_INFO = {
  name: 'SIGN & SIGNAGE',
  alternateName: 'SIGN & SIGNAGE AD WORLD',
  phoneDisplay: '+91 87894 87848',
  phoneHref: 'tel:+918789487848',
  whatsappDigits: '918789487848',
  addressLine: 'Mahatma Gandhi Main Road, Kalal Toli, Lower Bazaar',
  cityRegionPostal: 'Ranchi, Jharkhand 834001, India',
  fullAddress:
    'Mahatma Gandhi Main Road, Kalal Toli, Lower Bazaar, Ranchi, Jharkhand 834001, India',
  coordinates: {
    lat: 23.361649,
    lng: 85.327284,
  },
  hours: {
    weekdays: 'Monday – Saturday: 10:30 AM – 8:00 PM',
    sunday: 'Sunday: Closed',
    compact: 'Mon–Sat · 10:30 AM – 8:00 PM',
  },
  ratingSummary: {
    score: '4.6',
    scale: '5',
    sourceLabel: 'Based on verified local directory listings',
  },
  mapsShareUrl: 'https://share.google/5TcpxyOdEMLmREWBV',
  googleSiteUrl: 'https://sites.google.com/view/signandsignage/home',
  email: 'signsignage2020@gmail.com' as string | null,
  instagram: {
    handle: '@signsignage_2020',
    url: 'https://www.instagram.com/signsignage_2020?cnvx=MTdhbjBhM25pMXpndw==',
  } as InstagramProfile | null,
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  'All',
  '3D & LED Signs',
  'ACP & Cladding',
  'Prints & Glass',
  'CNC & Fabrication',
];

export const CONFIRMED_SERVICES: SignageService[] = [
  {
    id: '3d-channel-acrylic',
    index: '01',
    title: '3D Acrylic & Channel Letters',
    category: '3D & LED Signs',
    summary:
      'Custom 3D acrylic letters, 3D channel letters, and trimcap letterfronts engineered for commercial storefronts and retail showrooms.',
    materials: ['3D Acrylic', 'Channel Letters', 'Trimcap Profiles'],
  },
  {
    id: 'led-neon-boards',
    index: '02',
    title: 'LED Boards & Neon Light Work',
    category: '3D & LED Signs',
    summary:
      'Illuminated LED signboards, neon light accents paired with 3D channel letters, and high-visibility glow sign boards (GSB).',
    materials: ['LED Modules', 'Neon Light Work', 'Glow Sign Boards'],
  },
  {
    id: 'acp-paneling-cladding',
    index: '03',
    title: 'ACP Paneling, Cladding & 2D Boards',
    category: 'ACP & Cladding',
    summary:
      'Complete Aluminum Composite Panel (ACP) facade cladding, 2D sign boards on ACP backing, and 4-sided flag poles with ACP cladding.',
    materials: ['ACP Cladding', '2D Sign Boards', '4-Side Flag Poles'],
  },
  {
    id: 'translite-backlit-glass',
    index: '04',
    title: 'Backlit Translite & Glass Flex',
    category: 'Prints & Glass',
    summary:
      'Translite prints fixed onto backlit acrylic polysheets, fabric lightboxes, and JINDAL star flex glass applications for malls and stores.',
    materials: ['Translite Acrylic', 'Backlit Polysheet', 'JINDAL Star Flex'],
  },
  {
    id: 'latex-retro-flex',
    index: '05',
    title: 'UV Print, Latex Vinyl, 3M Retro & Flex Printing',
    category: 'Prints & Glass',
    summary:
      'UV flatbed printing, latex vinyl with matte lamination and fixing, 3M retro reflective graphics, eco-solvent GSB, star media, and sunboard prints.',
    materials: ['UV Print', 'Latex Vinyl', '3M Retro', 'Eco-Solvent GSB & Sunboard'],
  },
  {
    id: 'cnc-laser-cutting',
    index: '06',
    title: 'CNC & Laser Cutting Fabrication',
    category: 'CNC & Fabrication',
    summary:
      'In-house CNC routing and precision laser cutting for clean acrylic lettering, ACP grooves, custom stencils, and bespoke displays.',
    materials: ['CNC Routing', 'Laser Cutting', 'Custom Fixing'],
  },
];

export const GALLERY_PROJECTS: GalleryProject[] = [
  {
    id: 'ccl-coal-india-major-client',
    title: 'Coal India (CCL) — 3D LED & Rooftop Signage',
    category: '3D & LED Signs',
    locationNote: 'Major Client · Central Coalfields Limited (Coal India)',
    description:
      'Large-format illuminated 3D LED channel letters, Coal India emblem, and rooftop structural steel-frame signage installed for Central Coalfields Limited (CCL).',
    imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-20_at_6.45.20_PM_ef7347e3.jpeg',
    imageAlt: 'Night-illuminated CCL Coal India 3D LED channel letters and ACP display board',
    isRepresentativeVisual: false,
    secondaryImageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-20_at_6.45.33_PM_de91ab47.jpeg',
    secondaryImageAlt: 'Daytime rooftop steel-frame CCL Coal India 3D channel letter installation',
    videoUrl: '/assets/aistudio/WhatsApp_Video_2026-11-20_at_6.45.33_PM_dd26360c.mp4',
    mediaItems: [
      {
        id: 'ccl-night-board',
        label: 'Night View',
        type: 'image',
        url: '/assets/aistudio/WhatsApp_Image_2026-11-20_at_6.45.20_PM_ef7347e3.jpeg',
        alt: 'Night-illuminated CCL Coal India 3D LED channel letters and ACP display board',
      },
      {
        id: 'ccl-rooftop-day',
        label: 'Rooftop Structure',
        type: 'image',
        url: '/assets/aistudio/WhatsApp_Image_2026-11-20_at_6.45.33_PM_de91ab47.jpeg',
        alt: 'Daytime rooftop steel-frame CCL Coal India 3D channel letter installation',
      },
      {
        id: 'ccl-rooftop-day-video',
        label: 'Rooftop Day Video',
        type: 'video',
        url: '/assets/aistudio/WhatsApp_Video_2026-11-20_at_6.45.33_PM_dd26360c.mp4',
      },
      {
        id: 'ccl-rooftop-night-video-1',
        label: 'Rooftop Night Video 1',
        type: 'video',
        url: '/assets/aistudio/WhatsApp_Video_2026-11-20_at_7.49.33_PM_248a9b3d.mp4',
      },
      {
        id: 'ccl-rooftop-night-video-2',
        label: 'Rooftop Night Video 2',
        type: 'video',
        url: '/assets/aistudio/WhatsApp_Video_2026-11-20_at_7.49.35_PM_e9194c3e.mp4',
      },
      {
        id: 'ccl-rooftop-night-video-3',
        label: 'Rooftop Night Video 3',
        type: 'video',
        url: '/assets/aistudio/WhatsApp_Video_2026-11-20_at_7.49.37_PM_9accc589.mp4',
      },
    ],
  },
  {
    id: 'cmpdi-ranchi-major-client',
    title: 'CMPDI (HQ Ranchi) — 3D LED & Jaali Signage',
    category: '3D & LED Signs',
    locationNote: 'Major Client · Central Mine Planning & Design Institute (HQ Ranchi)',
    description:
      'Custom illuminated "I ❤️ cmpdi" 3D acrylic channel letters with backlit CNC-cut jaali panels and rooftop CMPDI LED signage installed at CMPDI Headquarters, Ranchi.',
    imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-20_at_7.23.48_PM_4be5c5e6.jpeg',
    imageAlt: 'Night-illuminated I Love CMPDI 3D LED channel-letter and CNC jaali signage at CMPDI HQ Ranchi',
    isRepresentativeVisual: false,
    mediaItems: [
      {
        id: 'cmpdi-night-main',
        label: 'I ❤️ CMPDI (Night)',
        type: 'image',
        url: '/assets/aistudio/WhatsApp_Image_2026-11-20_at_7.23.48_PM_4be5c5e6.jpeg',
        alt: 'Night-illuminated I Love CMPDI 3D LED channel-letter and CNC jaali signage at CMPDI HQ Ranchi',
      },
      {
        id: 'cmpdi-red-led',
        label: 'CMPDI Red LED Sign',
        type: 'image',
        url: '/assets/aistudio/WhatsApp_Image_2026-11-20_at_7.24.11_PM_97832e91.jpeg',
        alt: 'Illuminated red 3D LED CMPDI signboard with Coal India emblem at night',
      },
      {
        id: 'cmpdi-site-video',
        label: 'Site Night Video',
        type: 'video',
        url: '/assets/aistudio/WhatsApp_Video_2026-11-20_at_7.49.41_PM_7e863c38.mp4',
      },
      {
        id: 'cmpdi-workshop-video',
        label: 'Workshop Glow Test',
        type: 'video',
        url: '/assets/aistudio/WhatsApp_Video_2026-11-20_at_7.49.41_PM__1__9b684209.mp4',
      },
    ],
  },
  {
    id: 'translite-mall-display',
    title: 'Hospital, Showroom & Backlit Works',
    category: 'Prints & Glass',
    locationNote: 'Completed Works · Santevita Hospital, Nucleus, Jewellers & JBL Lightboxes',
    description:
      'Real installations across Ranchi and Jharkhand—including illuminated 3D hospital fascias, backlit showroom lightboxes, jewellery store channel letters, and glow sign boards.',
    imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-20_at_7.24.08_PM_92a8ebc4.jpeg',
    imageAlt: 'Night-illuminated Santevita Hospital 3D LED fascia and backlit information panels',
    isRepresentativeVisual: false,
    suggestedService: 'Backlit Translite & Glass Flex',
    mediaItems: [
      {
        id: 'work-santevita-night',
        label: 'Santevita Hospital (Night)',
        type: 'image',
        url: '/assets/aistudio/WhatsApp_Image_2026-11-20_at_7.24.08_PM_92a8ebc4.jpeg',
        alt: 'Night-illuminated Santevita Hospital 3D LED fascia and backlit information panels',
      },
      {
        id: 'work-santevita-day',
        label: 'Santevita Hospital (Day)',
        type: 'image',
        url: '/assets/aistudio/WhatsApp_Image_2026-11-20_at_7.24.08_PM__1__2569de27.jpeg',
        alt: 'Daytime Santevita Hospital ACP facade and yellow 3D channel lettering',
      },
      {
        id: 'work-santevita-canopy',
        label: 'Santevita Canopy View',
        type: 'image',
        url: '/assets/aistudio/WhatsApp_Image_2026-11-20_at_7.23.50_PM_9acfcc5d.jpeg',
        alt: 'Evening angled architectural view along the illuminated Santevita Hospital entrance canopy',
      },
      {
        id: 'work-santevita-video',
        label: 'Santevita Video',
        type: 'video',
        url: '/assets/aistudio/WhatsApp_Video_2026-11-20_at_7.24.10_PM__1__b40be0ee.mp4',
      },
      {
        id: 'work-satya-jewellers-night',
        label: 'Satya Prakash Jewellers',
        type: 'image',
        url: '/assets/aistudio/WhatsApp_Image_2026-11-20_at_7.24.11_PM__2__6584abd7.jpeg',
        alt: 'Warm-illuminated Satya Prakash Gupta Jewellers 3D LED channel letters during installation',
      },
      {
        id: 'work-satya-jewellers-bis',
        label: 'Jewellers BIS & Blade',
        type: 'image',
        url: '/assets/aistudio/WhatsApp_Image_2026-11-20_at_7.24.11_PM__1__f80ac60d.jpeg',
        alt: 'Satya Prakash Gupta Jewellers ACP facade with BIS emblem, vertical SPG blade, and projecting box sign',
      },
      {
        id: 'work-satya-jewellers-video',
        label: 'Jewellers Video',
        type: 'video',
        url: '/assets/aistudio/WhatsApp_Video_2026-11-20_at_7.24.12_PM_aedcb2ce.mp4',
      },
      {
        id: 'work-nucleus-sign',
        label: 'Nucleus LED Sign',
        type: 'image',
        url: '/assets/aistudio/WhatsApp_Image_2026-11-20_at_7.24.03_PM__1__4f106f64.jpeg',
        alt: 'Night-illuminated purple and white Nucleus 3D backlit wall signage and vertical blade sign',
      },
      {
        id: 'work-nucleus-city',
        label: 'Nucleus City Rooftop',
        type: 'image',
        url: '/assets/aistudio/WhatsApp_Image_2026-11-20_at_7.23.50_PM__1__a7d126db.jpeg',
        alt: 'Illuminated Nucleus City large wall-mounted LED logo installation',
      },
      {
        id: 'work-cmpdi-gandhinagar',
        label: 'CMPDI Gandhi Nagar',
        type: 'image',
        url: '/assets/aistudio/WhatsApp_Image_2026-11-20_at_7.23.53_PM_8790a57d.jpeg',
        alt: 'Daytime CMPDI Mini Ratna Coal India 3D acrylic signboard at CMPDI Complex, Gandhi Nagar, Ranchi',
      },
      {
        id: 'work-jbl-showroom',
        label: 'JBL Showroom Backlit',
        type: 'image',
        url: '/assets/aistudio/WhatsApp_Image_2026-11-20_at_7.23.49_PM__2__751da37f.jpeg',
        alt: 'Indoor backlit JBL showroom header strip and electronics wall display graphics',
      },
      {
        id: 'work-jbl-partybox-lightbox',
        label: 'JBL Partybox Lightbox',
        type: 'image',
        url: '/assets/aistudio/WhatsApp_Image_2026-11-20_at_7.23.49_PM__1__77a50b22.jpeg',
        alt: 'Full-height illuminated backlit JBL Partybox 520 fabric lightbox installation inside showroom',
      },
      {
        id: 'work-ankit-medical-video',
        label: 'Ankit Medical Video',
        type: 'video',
        url: '/assets/aistudio/WhatsApp_Video_2026-11-20_at_7.24.03_PM_7f9804c1.mp4',
      },
      {
        id: 'work-sonilex-gsb-video',
        label: 'SONILEX GSB Video',
        type: 'video',
        url: '/assets/aistudio/WhatsApp_Video_2026-11-20_at_7.24.06_PM_009c8986.mp4',
      },
    ],
  },
  {
    id: 'cnc-trimcap-workshop',
    title: 'CNC Laser Cutting, Trimcap & ACP Samples',
    category: 'CNC & Fabrication',
    locationNote: 'Representative craft visual · Ranchi workshop fabrication',
    description:
      'CNC laser-cut acrylic letters, trimcap channel edges, and multi-finish ACP samples prepared prior to on-site installation.',
    imageUrl: '/src/assets/images/service_cnc_fabrication_1795178877110.jpg',
    imageAlt: 'Signage workshop workbench with laser-cut 3D acrylic letters, trimcap channels, and ACP swatches',
    isRepresentativeVisual: true,
    suggestedService: 'CNC & Laser Cutting Fabrication',
  },
];

export const EXTRA_CATALOGUE_MEDIA: CatalogueMediaExtra[] = [
  {
    id: 'portfolio-storefront-collage',
    title: '3D Acrylic & Storefront Signage Showcase',
    subtitle: 'Client Installations · Heart Centre, Santevita Hospital, The BBQ Company & MR SNACK',
    category: '3D & LED Signs',
    type: 'image',
    url: '/assets/aistudio/WhatsApp_Image_2026-11-20_at_6.40.52_PM_5e2033cc.jpeg',
    alt: 'Sign & Signage showcase collage of 3D acrylic letters, Heart Centre, Santevita Hospital, The BBQ Company, and MR SNACK signage',
    description:
      'Showcase of fabricated 3D acrylic letters, backlit hospital fascias, and commercial retail boards built by SIGN & SIGNAGE.',
    suggestedService: '3D Acrylic & Channel Letters',
  },
];

export const FAQ_TOPICS: FaqTopic[] = [
  'All',
  'Timelines',
  'Warranty',
  'Materials',
  'Orders & Visits',
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-production-timelines',
    topic: 'Timelines',
    question: 'How long does it take to produce and install a custom signboard?',
    answer:
      'Turnaround depends on the signage type, overall size, and mounting requirements. Printed flex, vinyl, or UV panels generally complete faster than custom CNC-cut 3D acrylic channel letters, ACP cladding, or rooftop steel frames. Share your board dimensions and preferred date on WhatsApp or call +91 87894 87848 for an exact schedule before confirming your order.',
  },
  {
    id: 'faq-urgent-openings',
    topic: 'Timelines',
    question: 'Can you coordinate signage delivery for upcoming store openings?',
    answer:
      'Yes. Reaching out early with your storefront photos and measurements helps us schedule CNC/laser cutting, printing, LED wiring, and on-site installation to align with your opening timeline. Visit or call during shop hours (Monday – Saturday, 10:30 AM – 8:00 PM) to plan ahead.',
  },
  {
    id: 'faq-warranty-terms',
    topic: 'Warranty',
    question: 'What warranty is provided on LED signboards and 3D channel letters?',
    answer:
      'Warranty coverage depends on the components chosen for your project—such as LED modules, power supplies, and branded films like 3M retro or JINDAL star media. Exact warranty terms are confirmed on your project quote before fabrication begins—ask our team when requesting your estimate.',
  },
  {
    id: 'faq-maintenance-repairs',
    topic: 'Warranty',
    question: 'Do you handle LED repairs or replacing graphics on existing boards?',
    answer:
      'Yes. Whether you need fresh flex/vinyl printing for an existing frame, LED module servicing, or new 3D acrylic letters on an existing ACP backing, send a daytime photo of your board on WhatsApp (+91 87894 87848) and we will advise on repair or re-facing options.',
  },
  {
    id: 'faq-material-durability',
    topic: 'Materials',
    question: 'Which signage materials are best suited for outdoor weather durability?',
    answer:
      'For long-lasting outdoor storefronts, we fabricate Aluminum Composite Panel (ACP) cladding and 2D/3D backing paired with 3D acrylic channel letters or trimcap profiles. For printed graphics, we offer UV flatbed printing, matte-laminated latex vinyl, JINDAL star flex, and 3M retro reflective films tailored to sun and rain exposure.',
  },
  {
    id: 'faq-backlit-vs-3d',
    topic: 'Materials',
    question: 'Should I choose backlit translite, a glow sign board, or 3D LED channel letters?',
    answer:
      'Glow sign boards (GSB) and backlit translite on acrylic polysheets illuminate the full graphic area evenly, making them ideal for detailed visuals, menus, and mall displays. 3D acrylic and channel letters mount raised letters onto ACP paneling for crisp architectural depth and strong night readability.',
  },
  {
    id: 'faq-quote-service-area',
    topic: 'Orders & Visits',
    question: 'How do I get a price estimate, and which locations do you serve?',
    answer:
      'We serve customers all over Jharkhand—from our Ranchi workshop at Mahatma Gandhi Main Road, Kalal Toli, Lower Bazaar to commercial, retail, and institutional projects across every district in the state (including Jamshedpur, CCL, and CMPDI). Use the Quote Request form below or message us on WhatsApp with approximate feet/inches and a photo of your wall or storefront for an estimate.',
  },
];
