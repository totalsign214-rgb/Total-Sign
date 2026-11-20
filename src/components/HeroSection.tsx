import { MapPin, MessageCircle, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../data/business';
import {
  buildGoogleMapsDirectionsUrl,
  buildWhatsAppQuoteUrl,
} from '../utils/signage';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  onRequestQuote: () => void;
}

export function HeroSection({ onRequestQuote }: HeroSectionProps) {
  const directionsUrl = buildGoogleMapsDirectionsUrl(
    BUSINESS_INFO.coordinates.lat,
    BUSINESS_INFO.coordinates.lng
  );
  const whatsappUrl = buildWhatsAppQuoteUrl(BUSINESS_INFO.whatsappDigits, {});

  return (
    <section
      id="home"
      className="border-b border-slate-200 bg-white pt-8 pb-12 sm:pt-12 sm:pb-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* 2-Column Balanced Split */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col justify-center lg:col-span-6">
            <p className="text-sm font-medium text-slate-600">
              {BUSINESS_INFO.alternateName} · Ranchi, Jharkhand
            </p>

            <h1 className="font-display mt-3 text-[clamp(2.25rem,4vw,3.5rem)] font-bold leading-[1.1] tracking-tight text-slate-900 text-balance">
              Custom Signboards, 3D Letters &amp; ACP Signage Built to Stand Out
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              From precision CNC-cut 3D acrylic and LED channel letters to ACP
              storefront cladding, backlit translite, and latex glass graphics,
              we fabricate and install commercial signage across Ranchi and
              Jharkhand.
            </p>

            {/* Primary CTA + Direct Customer Contact Actions */}
            <div className="mt-8 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
              <button
                type="button"
                onClick={onRequestQuote}
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-700 transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
              >
                Request Quote
              </button>

              <a
                href={BUSINESS_INFO.phoneHref}
                aria-label={`Call ${BUSINESS_INFO.phoneDisplay}`}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
              >
                <Phone className="h-4 w-4 text-slate-700" aria-hidden="true" />
                <span>Call Shop</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-emerald-700 bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800 transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-100 transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
              >
                <MapPin className="h-4 w-4 text-amber-600" aria-hidden="true" />
                <span>Directions</span>
              </a>
            </div>
          </div>

          {/* Dominant Brand Showcase Visual */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="group relative aspect-square w-full max-w-[460px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm transition-shadow duration-200 hover:shadow-xl">
              <ResilientImage
                src="/assets/aistudio/WhatsApp_Image_2026-11-20_at_6.40.52_PM_5e2033cc.jpeg"
                alt="Sign & Signage — The Signage Builder showcase of 3D acrylic letters, backlit boards, and storefront signage"
                className="h-full w-full rounded-2xl object-cover transition-transform duration-200 ease-out group-hover:scale-[1.025] hover:scale-[1.025]"
                fallbackTitle="Sign & Signage — The Signage Builder"
              />
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Verified Facts Bar */}
        <div className="mt-10 grid grid-cols-1 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-slate-50 sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
          <div className="p-4 sm:p-5">
            <p className="text-xs font-medium text-slate-500">Workshop Address</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              Kalal Toli, Lower Bazaar
            </p>
            <p className="mt-0.5 text-xs text-slate-600">
              Mahatma Gandhi Main Rd, Ranchi 834001
            </p>
          </div>

          <div className="p-4 sm:p-5">
            <p className="text-xs font-medium text-slate-500">Opening Hours</p>
            <p className="mt-1 text-sm font-semibold text-slate-900 tabular-nums">
              10:30 AM – 8:00 PM
            </p>
            <p className="mt-0.5 text-xs text-slate-600">
              Monday to Saturday · Sunday Closed
            </p>
          </div>

          <div className="p-4 sm:p-5">
            <p className="text-xs font-medium text-slate-500">Phone &amp; WhatsApp</p>
            <a
              href={BUSINESS_INFO.phoneHref}
              className="mt-1 block text-sm font-semibold text-slate-900 tabular-nums hover:text-amber-700"
            >
              {BUSINESS_INFO.phoneDisplay}
            </a>
            <p className="mt-0.5 text-xs text-slate-600">
              Call or message for site visits
            </p>
          </div>

          <div className="p-4 sm:p-5">
            <p className="text-xs font-medium text-slate-500">Customer Rating</p>
            <p className="mt-1 text-sm font-semibold text-slate-900 tabular-nums">
              {BUSINESS_INFO.ratingSummary.score} / {BUSINESS_INFO.ratingSummary.scale}
            </p>
            <p className="mt-0.5 text-xs text-slate-600">
              {BUSINESS_INFO.ratingSummary.sourceLabel}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
