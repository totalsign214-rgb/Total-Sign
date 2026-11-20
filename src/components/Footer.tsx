import { Instagram } from 'lucide-react';
import { BUSINESS_INFO } from '../data/business';
import {
  buildInstagramProfileUrl,
  formatInstagramHandle,
} from '../utils/signage';

export function Footer() {
  const instagramUrl = buildInstagramProfileUrl(
    BUSINESS_INFO.instagram?.url ?? BUSINESS_INFO.instagram?.handle
  );
  const instagramHandle = BUSINESS_INFO.instagram
    ? formatInstagramHandle(
        BUSINESS_INFO.instagram.handle || BUSINESS_INFO.instagram.url || ''
      )
    : '';

  return (
    <footer className="border-t border-slate-200 bg-slate-900 pb-20 text-slate-300 md:pb-10">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-lg font-bold tracking-tight text-white">
              {BUSINESS_INFO.name}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              {BUSINESS_INFO.fullAddress}
            </p>
            <p className="mt-2 text-sm text-slate-400 tabular-nums">
              {BUSINESS_INFO.hours.weekdays} · {BUSINESS_INFO.hours.sunday}
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs font-semibold text-slate-200">Quick Links</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-xs font-semibold text-slate-200">
              Direct Contact &amp; Listings
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="tabular-nums hover:text-white transition-colors"
                >
                  Phone: {BUSINESS_INFO.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS_INFO.mapsShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Google Maps Profile
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS_INFO.googleSiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Portfolio Reference Site
                </a>
              </li>
              <li>
                {instagramUrl ? (
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                  >
                    <Instagram className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>
                      Instagram{instagramHandle ? ` (${instagramHandle})` : ''}
                    </span>
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-slate-400">
                    <Instagram className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Instagram: Share @handle or link to display</span>
                  </span>
                )}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-800 pt-6 text-xs text-slate-400">
          <p>
            © 2020 {BUSINESS_INFO.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
