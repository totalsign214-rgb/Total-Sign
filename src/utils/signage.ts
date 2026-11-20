import type {
  CatalogueMediaExtra,
  FaqItem,
  FaqTopic,
  GalleryMediaItem,
  GalleryProject,
  ServiceCategory,
  SignageService,
} from '../data/business';

export type CatalogueMediaTypeFilter = 'All' | 'Photos' | 'Videos';

export interface CatalogueEntry {
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

export interface QuoteFormInput {
  name: string;
  phone: string;
  service: string;
  dimensions: string;
  notes: string;
}

export interface QuoteValidationErrors {
  name?: string;
  phone?: string;
  service?: string;
}

export function filterServicesByCategory(
  services: SignageService[],
  category: ServiceCategory
): SignageService[] {
  if (category === 'All') {
    return services;
  }
  return services.filter((service) => service.category === category);
}

export function filterGalleryByCategory(
  projects: GalleryProject[],
  category: ServiceCategory
): GalleryProject[] {
  if (category === 'All') {
    return projects;
  }
  return projects.filter((project) => project.category === category);
}

export function getSuggestedServiceForCategory(
  category: Exclude<ServiceCategory, 'All'>
): string {
  switch (category) {
    case '3D & LED Signs':
      return '3D Acrylic & Channel Letters';
    case 'ACP & Cladding':
      return 'ACP Paneling, Cladding & 2D Boards';
    case 'Prints & Glass':
      return 'Backlit Translite & Glass Flex';
    case 'CNC & Fabrication':
      return 'CNC & Laser Cutting Fabrication';
  }
}

export function getGalleryProjectMedia(
  project: GalleryProject
): GalleryMediaItem[] {
  if (project.mediaItems && project.mediaItems.length > 0) {
    return project.mediaItems;
  }

  const items: GalleryMediaItem[] = [
    {
      id: `${project.id}-primary`,
      label: 'Project View',
      type: 'image',
      url: project.imageUrl,
      alt: project.imageAlt,
    },
  ];

  if (project.secondaryImageUrl) {
    items.push({
      id: `${project.id}-secondary`,
      label: 'Secondary View',
      type: 'image',
      url: project.secondaryImageUrl,
      alt: project.secondaryImageAlt ?? project.imageAlt,
    });
  }

  if (project.videoUrl) {
    items.push({
      id: `${project.id}-video`,
      label: 'Installation Video',
      type: 'video',
      url: project.videoUrl,
    });
  }

  return items;
}

export function buildPhotoCatalogueEntries(
  projects: GalleryProject[],
  extras: CatalogueMediaExtra[] = []
): CatalogueEntry[] {
  const entries: CatalogueEntry[] = [];

  for (const project of projects) {
    const media = getGalleryProjectMedia(project);
    const service =
      project.suggestedService ??
      getSuggestedServiceForCategory(project.category);

    for (const item of media) {
      entries.push({
        id: `${project.id}--${item.id}`,
        title: media.length > 1 ? `${project.title} — ${item.label}` : project.title,
        subtitle: `${project.category} · ${project.locationNote}`,
        category: project.category,
        type: item.type,
        url: item.url,
        alt: item.alt ?? `${project.title} (${item.label})`,
        description: project.description,
        suggestedService: service,
      });
    }
  }

  for (const extra of extras) {
    entries.push({
      id: extra.id,
      title: extra.title,
      subtitle: `${extra.category} · ${extra.subtitle}`,
      category: extra.category,
      type: extra.type,
      url: extra.url,
      alt: extra.alt,
      description: extra.description,
      suggestedService: extra.suggestedService,
    });
  }

  return entries;
}

export function filterCatalogueEntries(
  entries: CatalogueEntry[],
  category: ServiceCategory,
  mediaType: CatalogueMediaTypeFilter
): CatalogueEntry[] {
  return entries.filter((entry) => {
    const matchesCategory =
      category === 'All' || entry.category === category;
    const matchesMediaType =
      mediaType === 'All' ||
      (mediaType === 'Photos' && entry.type === 'image') ||
      (mediaType === 'Videos' && entry.type === 'video');
    return matchesCategory && matchesMediaType;
  });
}

export function filterFaqsByTopic(
  faqs: FaqItem[],
  topic: FaqTopic
): FaqItem[] {
  if (topic === 'All') {
    return faqs;
  }
  return faqs.filter((item) => item.topic === topic);
}

export function normalizePhoneDigits(rawPhone: string): string {
  return rawPhone.replace(/\D/g, '');
}

export function validateQuoteInput(
  input: QuoteFormInput
): QuoteValidationErrors {
  const errors: QuoteValidationErrors = {};
  const trimmedName = input.name.trim();
  const phoneDigits = normalizePhoneDigits(input.phone);

  if (trimmedName.length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }

  if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    errors.phone = 'Please enter a valid 10-digit mobile or WhatsApp number.';
  }

  if (!input.service.trim()) {
    errors.service = 'Please select the signage service you need.';
  }

  return errors;
}

export function buildWhatsAppQuoteUrl(
  whatsappDigits: string,
  input: Partial<QuoteFormInput>
): string {
  const lines = ['Hello SIGN & SIGNAGE, I would like a quote for signage work.'];
  if (input.name?.trim()) {
    lines.push(`Name: ${input.name.trim()}`);
  }
  if (input.phone?.trim()) {
    lines.push(`Phone: ${input.phone.trim()}`);
  }
  if (input.service?.trim()) {
    lines.push(`Service: ${input.service.trim()}`);
  }
  if (input.dimensions?.trim()) {
    lines.push(`Approx. Size: ${input.dimensions.trim()}`);
  }
  if (input.notes?.trim()) {
    lines.push(`Details: ${input.notes.trim()}`);
  }

  const encoded = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${whatsappDigits}?text=${encoded}`;
}

export function buildGoogleMapsDirectionsUrl(
  lat: number,
  lng: number
): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

export function buildGoogleMapsEmbedUrl(
  lat: number,
  lng: number,
  label: string
): string {
  const q = encodeURIComponent(`${lat},${lng} (${label})`);
  return `https://maps.google.com/maps?q=${q}&z=16&output=embed`;
}

/**
 * Checks whether SIGN & SIGNAGE is open based on verified hours:
 * Monday - Saturday: 10:30 AM - 8:00 PM IST; Sunday: Closed.
 */
export function isShopOpenAt(
  dayOfWeekSun0: number,
  hour24: number,
  minute: number
): boolean {
  if (dayOfWeekSun0 === 0) {
    return false;
  }
  const minutesSinceMidnight = hour24 * 60 + minute;
  const openMinutes = 10 * 60 + 30; // 10:30 AM
  const closeMinutes = 20 * 60; // 8:00 PM
  return minutesSinceMidnight >= openMinutes && minutesSinceMidnight < closeMinutes;
}

function extractInstagramUsername(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) {
    return '';
  }

  const urlMatch = trimmed.match(/instagram\.com\/([^/?#]+)/i);
  if (urlMatch && urlMatch[1]) {
    return urlMatch[1].replace(/^@+/, '').trim();
  }

  return trimmed.replace(/^@+/, '').replace(/\/+$/, '').trim();
}

export function formatInstagramHandle(handleOrUrl: string): string {
  const username = extractInstagramUsername(handleOrUrl);
  return username ? `@${username}` : '';
}

export function buildInstagramProfileUrl(
  handleOrUrl: string | null | undefined
): string | null {
  if (!handleOrUrl) {
    return null;
  }
  const trimmed = handleOrUrl.trim();
  if (!trimmed) {
    return null;
  }
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  const username = extractInstagramUsername(trimmed);
  return username ? `https://www.instagram.com/${username}/` : null;
}

