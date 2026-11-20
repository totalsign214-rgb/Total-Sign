import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Images,
  LayoutGrid,
  Maximize2,
  MessageCircle,
  Play,
  Star,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  BUSINESS_INFO,
  EXTRA_CATALOGUE_MEDIA,
  GALLERY_PROJECTS,
  type GalleryProject,
  type ServiceCategory,
} from '../data/business';
import {
  buildPhotoCatalogueEntries,
  buildWhatsAppQuoteUrl,
  filterCatalogueEntries,
  filterGalleryByCategory,
  getGalleryProjectMedia,
  getSuggestedServiceForCategory,
  type CatalogueMediaTypeFilter,
} from '../utils/signage';
import { ResilientImage } from './ResilientImage';

interface GalleryAndReviewsSectionProps {
  onSelectServiceForQuote?: (serviceTitle: string) => void;
}

const GALLERY_FILTERS: ServiceCategory[] = [
  'All',
  '3D & LED Signs',
  'Prints & Glass',
  'CNC & Fabrication',
];

const MEDIA_TYPE_FILTERS: CatalogueMediaTypeFilter[] = [
  'All',
  'Photos',
  'Videos',
];

type LightboxState =
  | {
      mode: 'project';
      project: GalleryProject;
      mediaIndex: number;
    }
  | {
      mode: 'catalogue';
      entryIndex: number;
    };

export function GalleryAndReviewsSection({
  onSelectServiceForQuote,
}: GalleryAndReviewsSectionProps) {
  const [viewMode, setViewMode] = useState<'projects' | 'catalogue'>('projects');
  const [activeFilter, setActiveFilter] = useState<ServiceCategory>('All');
  const [mediaTypeFilter, setMediaTypeFilter] =
    useState<CatalogueMediaTypeFilter>('All');
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const allCatalogueEntries = useMemo(
    () => buildPhotoCatalogueEntries(GALLERY_PROJECTS, EXTRA_CATALOGUE_MEDIA),
    []
  );

  const visibleProjects = filterGalleryByCategory(
    GALLERY_PROJECTS,
    activeFilter
  );

  const visibleCatalogueEntries = filterCatalogueEntries(
    allCatalogueEntries,
    activeFilter,
    mediaTypeFilter
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (lightbox) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [lightbox]);

  useEffect(() => {
    if (!lightbox) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setLightbox((prev) => {
          if (!prev) return null;
          if (prev.mode === 'catalogue') {
            if (visibleCatalogueEntries.length <= 1) return prev;
            return {
              ...prev,
              entryIndex:
                (prev.entryIndex + 1) % visibleCatalogueEntries.length,
            };
          }
          const media = getGalleryProjectMedia(prev.project);
          if (media.length <= 1) return prev;
          return {
            ...prev,
            mediaIndex: (prev.mediaIndex + 1) % media.length,
          };
        });
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setLightbox((prev) => {
          if (!prev) return null;
          if (prev.mode === 'catalogue') {
            if (visibleCatalogueEntries.length <= 1) return prev;
            return {
              ...prev,
              entryIndex:
                (prev.entryIndex - 1 + visibleCatalogueEntries.length) %
                visibleCatalogueEntries.length,
            };
          }
          const media = getGalleryProjectMedia(prev.project);
          if (media.length <= 1) return prev;
          return {
            ...prev,
            mediaIndex: (prev.mediaIndex - 1 + media.length) % media.length,
          };
        });
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox, visibleCatalogueEntries.length]);

  const activeLightboxInfo = useMemo(() => {
    if (!lightbox) return null;

    if (lightbox.mode === 'catalogue') {
      const entry =
        visibleCatalogueEntries[lightbox.entryIndex] ??
        visibleCatalogueEntries[0];
      if (!entry) return null;

      return {
        title: entry.title,
        subtitle: entry.subtitle,
        description: entry.description,
        type: entry.type,
        url: entry.url,
        alt: entry.alt,
        suggestedService: entry.suggestedService,
        counterText: `${lightbox.entryIndex + 1} / ${visibleCatalogueEntries.length}`,
        canStep: visibleCatalogueEntries.length > 1,
        projectSwitchers: null as null | {
          items: ReturnType<typeof getGalleryProjectMedia>;
          activeIndex: number;
        },
      };
    }

    const media = getGalleryProjectMedia(lightbox.project);
    const current = media[lightbox.mediaIndex] ?? media[0];
    if (!current) return null;

    return {
      title: lightbox.project.title,
      subtitle: `${lightbox.project.category} · ${lightbox.project.locationNote}`,
      description: lightbox.project.description,
      type: current.type,
      url: current.url,
      alt: current.alt ?? lightbox.project.imageAlt,
      suggestedService:
        lightbox.project.suggestedService ??
        getSuggestedServiceForCategory(lightbox.project.category),
      counterText:
        media.length > 1
          ? `${lightbox.mediaIndex + 1} / ${media.length}`
          : null,
      canStep: media.length > 1,
      projectSwitchers:
        media.length > 1
          ? { items: media, activeIndex: lightbox.mediaIndex }
          : null,
    };
  }, [lightbox, visibleCatalogueEntries]);

  function stepLightbox(delta: 1 | -1) {
    setLightbox((prev) => {
      if (!prev) return null;
      if (prev.mode === 'catalogue') {
        const count = visibleCatalogueEntries.length;
        if (count <= 1) return prev;
        return {
          ...prev,
          entryIndex: (prev.entryIndex + delta + count) % count,
        };
      }
      const media = getGalleryProjectMedia(prev.project);
      if (media.length <= 1) return prev;
      return {
        ...prev,
        mediaIndex: (prev.mediaIndex + delta + media.length) % media.length,
      };
    });
  }

  return (
    <section
      id="gallery"
      className="border-b border-slate-200 bg-slate-50 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Gallery Header & View Mode + Category Controls */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-amber-700">
              Work Gallery &amp; Photo Catalogue
            </p>
            <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl text-balance">
              Signage Craftsmanship &amp; Installation Showcase
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Explore featured client installations or switch to the full{' '}
              <strong className="font-semibold text-slate-800">
                Photo Catalogue
              </strong>{' '}
              to browse every photo and site video in full-screen preview.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 sm:items-end">
            {/* Primary View Mode Switcher: Project Highlights vs Photo Catalogue */}
            <div
              role="tablist"
              aria-label="Gallery view mode"
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1 shadow-xs"
            >
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === 'projects'}
                onClick={() => setViewMode('projects')}
                className={`inline-flex min-h-[38px] items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  viewMode === 'projects'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Featured Projects ({GALLERY_PROJECTS.length})</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === 'catalogue'}
                onClick={() => setViewMode('catalogue')}
                className={`inline-flex min-h-[38px] items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  viewMode === 'catalogue'
                    ? 'bg-amber-600 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Images className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Photo Catalogue ({allCatalogueEntries.length})</span>
              </button>
            </div>

            {/* Category & Media Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <div
                role="tablist"
                aria-label="Filter gallery projects"
                className="flex flex-wrap items-center gap-1.5 rounded-lg bg-slate-200/70 p-1"
              >
                {GALLERY_FILTERS.map((filter) => {
                  const isActive = activeFilter === filter;
                  return (
                    <button
                      key={filter}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveFilter(filter)}
                      className={`min-h-[36px] rounded-md px-3 py-1.5 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
                        isActive
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {filter}
                    </button>
                  );
                })}
              </div>

              {viewMode === 'catalogue' && (
                <div
                  role="tablist"
                  aria-label="Filter catalogue by media type"
                  className="flex items-center gap-1 rounded-lg bg-slate-200/70 p-1"
                >
                  {MEDIA_TYPE_FILTERS.map((typeFilter) => {
                    const isActive = mediaTypeFilter === typeFilter;
                    return (
                      <button
                        key={typeFilter}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setMediaTypeFilter(typeFilter)}
                        className={`min-h-[36px] rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                          isActive
                            ? 'bg-white text-slate-900 shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {typeFilter}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* View 1: Featured Project Cards Grid */}
        {viewMode === 'projects' && (
          <>
            <div
              data-testid="gallery-grid"
              className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              {visibleProjects.map((project) => {
                const mediaCount = getGalleryProjectMedia(project).length;
                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() =>
                      setLightbox({
                        mode: 'project',
                        project,
                        mediaIndex: 0,
                      })
                    }
                    className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white text-left transition-colors duration-150 hover:border-slate-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                      <ResilientImage
                        src={project.imageUrl}
                        alt={project.imageAlt}
                        fallbackTitle={project.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-slate-950/75 px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-sm backdrop-blur-xs transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                      >
                        <Maximize2 className="h-3.5 w-3.5" />
                        <span>Full View</span>
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between gap-3 text-xs text-slate-500">
                        <p className="truncate">
                          {project.category} · {project.locationNote}
                        </p>
                        {mediaCount > 1 && (
                          <span className="shrink-0 font-semibold text-amber-700">
                            {mediaCount} photos/videos
                          </span>
                        )}
                      </div>
                      <h3 className="font-display mt-2 text-lg font-semibold text-slate-900">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        {project.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setViewMode('catalogue')}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-xs transition-colors hover:border-amber-600 hover:bg-amber-50/40 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
              >
                <Images className="h-4 w-4 text-amber-700" aria-hidden="true" />
                <span>
                  Browse All {allCatalogueEntries.length} Photos &amp; Videos in
                  Photo Catalogue
                </span>
              </button>
            </div>
          </>
        )}

        {/* View 2: Full Photo & Video Catalogue Grid */}
        {viewMode === 'catalogue' && (
          <div className="mt-10">
            {visibleCatalogueEntries.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <p className="text-base font-semibold text-slate-900">
                  No matching items in this filter
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Switch back to All categories or media types to view the full
                  photo catalogue.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveFilter('All');
                    setMediaTypeFilter('All');
                  }}
                  className="mt-4 inline-flex min-h-[40px] items-center rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 cursor-pointer"
                >
                  Reset Catalogue Filters
                </button>
              </div>
            ) : (
              <div
                data-testid="photo-catalogue-grid"
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
              >
                {visibleCatalogueEntries.map((entry, idx) => (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() =>
                      setLightbox({ mode: 'catalogue', entryIndex: idx })
                    }
                    className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white text-left transition-all duration-150 hover:border-slate-300 hover:shadow-md cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
                      {entry.type === 'video' ? (
                        <>
                          <video
                            src={entry.url}
                            muted
                            playsInline
                            preload="metadata"
                            className="h-full w-full object-cover opacity-90 transition-transform duration-300 group-hover:scale-[1.03]"
                          />
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-950/25"
                          >
                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-slate-950 shadow-lg transition-transform duration-200 group-hover:scale-105">
                              <Play className="ml-0.5 h-5 w-5 fill-slate-950" />
                            </span>
                          </span>
                        </>
                      ) : (
                        <ResilientImage
                          src={entry.url}
                          alt={entry.alt}
                          fallbackTitle={entry.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      )}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-slate-950/80 px-2.5 py-1 text-[11px] font-semibold text-white"
                      >
                        {entry.type === 'video' ? 'Video' : 'Photo'}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-4">
                      <div>
                        <p className="truncate text-[11px] font-medium text-slate-500">
                          {entry.subtitle}
                        </p>
                        <h3 className="font-display mt-1 text-sm font-semibold leading-snug text-slate-900">
                          {entry.title}
                        </h3>
                      </div>
                      <p className="mt-3 text-xs font-semibold text-amber-700">
                        Click for Full View →
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Customer Reviews Block (Claim-to-Proof Adjacent, Strictly Verified + Honest Placeholder) */}
        <div className="mt-14 rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-amber-700">
                Customer Reviews
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <span className="font-display text-3xl font-bold text-slate-900 tabular-nums">
                  {BUSINESS_INFO.ratingSummary.score} /{' '}
                  {BUSINESS_INFO.ratingSummary.scale}
                </span>
                <div
                  className="flex items-center gap-1 text-amber-500"
                  aria-label="4.6 out of 5 stars"
                >
                  {[0, 1, 2, 3, 4].map((idx) => (
                    <Star
                      key={idx}
                      className="h-5 w-5 fill-amber-500 text-amber-500"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <span className="text-sm text-slate-600">
                  {BUSINESS_INFO.ratingSummary.sourceLabel}
                </span>
              </div>
            </div>

            <a
              href={BUSINESS_INFO.mapsShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
            >
              <span>View Google Maps Listing &amp; Reviews</span>
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* Accessible Full-Screen Project & Photo Catalogue Lightbox Modal */}
      <dialog
        ref={dialogRef}
        onClose={() => setLightbox(null)}
        aria-labelledby="lightbox-title"
        className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-slate-950/95 p-0 text-white backdrop:bg-slate-950/95"
      >
        {activeLightboxInfo && (
          <div className="flex h-full w-full flex-col">
            {/* Top Bar */}
            <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-slate-950/80 px-4 py-3 sm:px-6 sm:py-4">
              <div className="min-w-0">
                <p className="truncate text-xs text-slate-400">
                  {activeLightboxInfo.subtitle}
                </p>
                <div className="flex items-center gap-3">
                  <h3
                    id="lightbox-title"
                    className="font-display truncate text-base font-bold text-white sm:text-lg"
                  >
                    {activeLightboxInfo.title}
                  </h3>
                  {activeLightboxInfo.counterText && (
                    <span className="shrink-0 rounded-md border border-white/15 bg-white/5 px-2 py-0.5 text-xs font-medium text-slate-300 tabular-nums">
                      {activeLightboxInfo.counterText}
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                aria-label="Close project preview"
                onClick={() => setLightbox(null)}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/15 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Full-Screen Media Stage with Prev/Next */}
            <div
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setLightbox(null);
                }
              }}
              className="relative flex min-h-0 flex-1 items-center justify-center p-3 sm:p-6 md:p-8"
            >
              {activeLightboxInfo.canStep && (
                <button
                  type="button"
                  aria-label="Previous catalogue item"
                  onClick={() => stepLightbox(-1)}
                  className="absolute left-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-slate-950/80 text-white shadow-lg transition-colors hover:bg-white/20 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 sm:left-6"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
              )}

              {activeLightboxInfo.type === 'video' ? (
                <video
                  key={activeLightboxInfo.url}
                  src={activeLightboxInfo.url}
                  controls
                  playsInline
                  preload="metadata"
                  className="max-h-full max-w-full rounded-lg bg-black object-contain shadow-2xl"
                />
              ) : (
                <ResilientImage
                  key={activeLightboxInfo.url}
                  src={activeLightboxInfo.url}
                  alt={activeLightboxInfo.alt}
                  fallbackTitle={activeLightboxInfo.title}
                  className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
                />
              )}

              {activeLightboxInfo.canStep && (
                <button
                  type="button"
                  aria-label="Next catalogue item"
                  onClick={() => stepLightbox(1)}
                  className="absolute right-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-slate-950/80 text-white shadow-lg transition-colors hover:bg-white/20 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 sm:right-6"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              )}
            </div>

            {/* Bottom Caption, Media Switchers & Quote Actions */}
            <div className="border-t border-white/10 bg-slate-950/85 px-4 py-3 sm:px-6 sm:py-4">
              <div className="mx-auto flex max-w-5xl flex-col gap-3">
                <p className="text-sm leading-relaxed text-slate-300">
                  {activeLightboxInfo.description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  {activeLightboxInfo.projectSwitchers ? (
                    <div className="flex max-h-24 flex-wrap items-center gap-1.5 overflow-y-auto pr-1 sm:max-h-none sm:overflow-visible">
                      {activeLightboxInfo.projectSwitchers.items.map(
                        (item, idx) => {
                          const isActive =
                            idx ===
                            activeLightboxInfo.projectSwitchers?.activeIndex;
                          const activeClass =
                            item.type === 'video'
                              ? 'bg-amber-500 text-slate-950'
                              : 'bg-white text-slate-950';
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() =>
                                setLightbox((prev) =>
                                  prev?.mode === 'project'
                                    ? { ...prev, mediaIndex: idx }
                                    : prev
                                )
                              }
                              className={`min-h-[30px] rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                                isActive
                                  ? activeClass
                                  : 'border border-white/15 bg-white/5 text-slate-200 hover:bg-white/15'
                              }`}
                            >
                              {item.label}
                            </button>
                          );
                        }
                      )}
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400">
                      Use arrow keys or Next / Previous buttons to browse the
                      photo catalogue
                    </span>
                  )}

                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={buildWhatsAppQuoteUrl(BUSINESS_INFO.whatsappDigits, {
                        service: activeLightboxInfo.suggestedService,
                        notes: `Interested in similar work: ${activeLightboxInfo.title}`,
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[36px] items-center gap-1.5 rounded-md border border-emerald-500/40 bg-emerald-600/20 px-3 py-1.5 text-xs font-semibold text-emerald-200 transition-colors hover:bg-emerald-600/35 whitespace-nowrap"
                    >
                      <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Ask Price on WhatsApp</span>
                    </a>
                    {onSelectServiceForQuote && (
                      <button
                        type="button"
                        onClick={() => {
                          const svc = activeLightboxInfo.suggestedService;
                          setLightbox(null);
                          onSelectServiceForQuote(svc);
                        }}
                        className="inline-flex min-h-[36px] items-center rounded-md bg-amber-500 px-3.5 py-1.5 text-xs font-semibold text-slate-950 transition-colors hover:bg-amber-400 cursor-pointer whitespace-nowrap"
                      >
                        Request Similar Quote
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
