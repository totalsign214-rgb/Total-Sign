import { MapPin, MessageCircle, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../data/business';
import {
  buildGoogleMapsDirectionsUrl,
  buildWhatsAppQuoteUrl,
} from '../utils/signage';

export function MobileQuickBar() {
  const whatsappUrl = buildWhatsAppQuoteUrl(BUSINESS_INFO.whatsappDigits, {});
  const directionsUrl = buildGoogleMapsDirectionsUrl(
    BUSINESS_INFO.coordinates.lat,
    BUSINESS_INFO.coordinates.lng
  );

  return (
    <div
      aria-label="Quick mobile contact actions"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 px-3 py-1.5 backdrop-blur md:hidden"
    >
      <div className="grid grid-cols-3 gap-2">
        <a
          href={BUSINESS_INFO.phoneHref}
          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-2 text-xs font-semibold text-white whitespace-nowrap"
        >
          <Phone className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Call</span>
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-emerald-700 px-2 text-xs font-semibold text-white whitespace-nowrap"
        >
          <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
          <span>WhatsApp</span>
        </a>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-2 text-xs font-semibold text-slate-900 whitespace-nowrap"
        >
          <MapPin className="h-3.5 w-3.5 text-amber-600" aria-hidden="true" />
          <span>Directions</span>
        </a>
      </div>
    </div>
  );
}
