import {
  CheckCircle2,
  Clock,
  ExternalLink,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import { BUSINESS_INFO, CONFIRMED_SERVICES } from '../data/business';
import {
  buildGoogleMapsDirectionsUrl,
  buildGoogleMapsEmbedUrl,
  buildInstagramProfileUrl,
  buildWhatsAppQuoteUrl,
  formatInstagramHandle,
  validateQuoteInput,
  type QuoteFormInput,
  type QuoteValidationErrors,
} from '../utils/signage';

interface ContactSectionProps {
  preselectedService: string;
}

export function ContactSection({ preselectedService }: ContactSectionProps) {
  const [form, setForm] = useState<QuoteFormInput>({
    name: '',
    phone: '',
    service: preselectedService || CONFIRMED_SERVICES[0].title,
    dimensions: '',
    notes: '',
  });
  const [errors, setErrors] = useState<QuoteValidationErrors>({});
  const [submittedQuote, setSubmittedQuote] = useState<QuoteFormInput | null>(
    null
  );

  useEffect(() => {
    if (preselectedService) {
      setForm((prev) => ({ ...prev, service: preselectedService }));
      setSubmittedQuote(null);
    }
  }, [preselectedService]);

  const directionsUrl = buildGoogleMapsDirectionsUrl(
    BUSINESS_INFO.coordinates.lat,
    BUSINESS_INFO.coordinates.lng
  );
  const embedUrl = buildGoogleMapsEmbedUrl(
    BUSINESS_INFO.coordinates.lat,
    BUSINESS_INFO.coordinates.lng,
    BUSINESS_INFO.name
  );
  const whatsappHref = buildWhatsAppQuoteUrl(BUSINESS_INFO.whatsappDigits, form);
  const instagramUrl = buildInstagramProfileUrl(
    BUSINESS_INFO.instagram?.url ?? BUSINESS_INFO.instagram?.handle
  );
  const instagramHandle = BUSINESS_INFO.instagram
    ? formatInstagramHandle(
        BUSINESS_INFO.instagram.handle || BUSINESS_INFO.instagram.url || ''
      )
    : '';

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validateQuoteInput(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmittedQuote({ ...form });
  }

  return (
    <section id="contact" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-amber-700">
            Contact &amp; Location
          </p>
          <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl text-balance">
            Visit Our Ranchi Shop or Request a Signage Quote
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Call us directly, message on WhatsApp with your storefront photos or
            dimensions, or visit our workshop at Kalal Toli, Lower Bazaar.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Direct Actions, Verified Info & Google Map */}
          <div className="flex flex-col gap-6 lg:col-span-6">
            {/* Prominent Action Buttons */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <a
                href={BUSINESS_INFO.phoneHref}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span>Call Shop</span>
              </a>

              <a
                href={buildWhatsAppQuoteUrl(BUSINESS_INFO.whatsappDigits, {})}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-800 transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
              >
                <MapPin className="h-4 w-4 text-amber-600" aria-hidden="true" />
                <span>Directions</span>
              </a>
            </div>

            {/* Verified Shop Details Card */}
            <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-start gap-3.5 p-4">
                <MapPin
                  className="mt-0.5 h-5 w-5 shrink-0 text-amber-700"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    Shop Address
                  </h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-slate-600">
                    {BUSINESS_INFO.fullAddress}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4">
                <Phone
                  className="mt-0.5 h-5 w-5 shrink-0 text-amber-700"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    Phone &amp; WhatsApp
                  </h3>
                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="mt-0.5 inline-block text-sm font-medium text-slate-900 tabular-nums hover:text-amber-700"
                  >
                    {BUSINESS_INFO.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4">
                <Clock
                  className="mt-0.5 h-5 w-5 shrink-0 text-amber-700"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    Opening Hours
                  </h3>
                  <p className="mt-0.5 text-sm text-slate-600 tabular-nums">
                    {BUSINESS_INFO.hours.weekdays} · {BUSINESS_INFO.hours.sunday}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4">
                <Mail
                  className={`mt-0.5 h-5 w-5 shrink-0 ${
                    BUSINESS_INFO.email ? 'text-amber-700' : 'text-slate-400'
                  }`}
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    Business Email
                  </h3>
                  <p className="mt-0.5 text-sm text-slate-600">
                    {BUSINESS_INFO.email ? (
                      <a
                        href={`mailto:${BUSINESS_INFO.email}`}
                        className="font-medium text-slate-900 hover:text-amber-700"
                      >
                        {BUSINESS_INFO.email}
                      </a>
                    ) : (
                      'Placeholder: Add your business email address here'
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4">
                <Instagram
                  className={`mt-0.5 h-5 w-5 shrink-0 ${
                    instagramUrl ? 'text-amber-700' : 'text-slate-400'
                  }`}
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    Instagram
                  </h3>
                  <p className="mt-0.5 text-sm text-slate-600">
                    {instagramUrl ? (
                      <a
                        href={instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-medium text-slate-900 hover:text-amber-700"
                      >
                        <span>{instagramHandle || 'Follow on Instagram'}</span>
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    ) : (
                      'Share your Instagram @handle or profile link to connect here'
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
              <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
                <span className="text-xs font-semibold text-slate-700">
                  Google Maps Location · Kalal Toli, Lower Bazaar, Ranchi
                </span>
                <a
                  href={BUSINESS_INFO.mapsShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 hover:text-amber-800 whitespace-nowrap"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
              <iframe
                title="SIGN & SIGNAGE Ranchi Location on Google Maps"
                src={embedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-64 w-full border-0 sm:h-72"
              />
            </div>
          </div>

          {/* Right Column: Quote Request Form */}
          <div className="lg:col-span-6">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
              <h3 className="font-display text-2xl font-bold text-slate-900">
                Request a Signage Quote
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Share your signboard type and rough size. You can validate and
                prepare your inquiry here, then send it straight to our WhatsApp
                desk for a fast estimate.
              </p>

              {submittedQuote ? (
                <div
                  role="status"
                  className="mt-6 rounded-xl border border-emerald-200 bg-white p-6"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700"
                      aria-hidden="true"
                    />
                    <div>
                      <h4 className="font-display text-lg font-semibold text-slate-900">
                        Quote Request Prepared
                      </h4>
                      <p className="mt-1 text-sm text-slate-600">
                        Thank you, {submittedQuote.name}. Your inquiry for{' '}
                        <span className="font-semibold text-slate-900">
                          {submittedQuote.service}
                        </span>{' '}
                        is ready. Click below to send it directly on WhatsApp or
                        call us at {BUSINESS_INFO.phoneDisplay}.
                      </p>
                    </div>
                  </div>

                  <dl className="mt-5 grid grid-cols-1 gap-3 border-t border-slate-200 pt-4 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="text-xs text-slate-500">Customer Name</dt>
                      <dd className="font-medium text-slate-900">
                        {submittedQuote.name}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-slate-500">Phone Number</dt>
                      <dd className="font-medium text-slate-900 tabular-nums">
                        {submittedQuote.phone}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-slate-500">Service</dt>
                      <dd className="font-medium text-slate-900">
                        {submittedQuote.service}
                      </dd>
                    </div>
                    {submittedQuote.dimensions && (
                      <div>
                        <dt className="text-xs text-slate-500">Approx. Size</dt>
                        <dd className="font-medium text-slate-900">
                          {submittedQuote.dimensions}
                        </dd>
                      </div>
                    )}
                  </dl>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <a
                      href={buildWhatsAppQuoteUrl(
                        BUSINESS_INFO.whatsappDigits,
                        submittedQuote
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800 whitespace-nowrap"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      <span>Send via WhatsApp Now</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmittedQuote(null)}
                      className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      Edit Request
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="mt-6 space-y-5"
                >
                  <div>
                    <label
                      htmlFor="quote-name"
                      className="block text-sm font-medium text-slate-900"
                    >
                      Your Name
                    </label>
                    <input
                      id="quote-name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, name: e.target.value }));
                        if (errors.name) {
                          setErrors((prev) => ({ ...prev, name: undefined }));
                        }
                      }}
                      placeholder="Enter your full name"
                      className="mt-1.5 block min-h-[44px] w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600/20"
                    />
                    {errors.name && (
                      <p role="alert" className="mt-1.5 text-xs font-medium text-red-700">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="quote-phone"
                      className="block text-sm font-medium text-slate-900"
                    >
                      Phone / WhatsApp Number
                    </label>
                    <input
                      id="quote-phone"
                      name="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, phone: e.target.value }));
                        if (errors.phone) {
                          setErrors((prev) => ({ ...prev, phone: undefined }));
                        }
                      }}
                      placeholder="e.g. 98765 43210"
                      className="mt-1.5 block min-h-[44px] w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 tabular-nums focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600/20"
                    />
                    {errors.phone && (
                      <p role="alert" className="mt-1.5 text-xs font-medium text-red-700">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="quote-service"
                      className="block text-sm font-medium text-slate-900"
                    >
                      Signage Service Needed
                    </label>
                    <select
                      id="quote-service"
                      name="service"
                      value={form.service}
                      onChange={(e) => {
                        setForm((prev) => ({
                          ...prev,
                          service: e.target.value,
                        }));
                        if (errors.service) {
                          setErrors((prev) => ({
                            ...prev,
                            service: undefined,
                          }));
                        }
                      }}
                      className="mt-1.5 block min-h-[44px] w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600/20"
                    >
                      {CONFIRMED_SERVICES.map((item) => (
                        <option key={item.id} value={item.title}>
                          {item.title}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p role="alert" className="mt-1.5 text-xs font-medium text-red-700">
                        {errors.service}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="quote-dimensions"
                      className="block text-sm font-medium text-slate-900"
                    >
                      Approximate Size (Optional)
                    </label>
                    <input
                      id="quote-dimensions"
                      name="dimensions"
                      type="text"
                      value={form.dimensions}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          dimensions: e.target.value,
                        }))
                      }
                      placeholder="e.g. 12 ft x 3 ft storefront"
                      className="mt-1.5 block min-h-[44px] w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="quote-notes"
                      className="block text-sm font-medium text-slate-900"
                    >
                      Project Notes (Optional)
                    </label>
                    <textarea
                      id="quote-notes"
                      name="notes"
                      rows={3}
                      value={form.notes}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, notes: e.target.value }))
                      }
                      placeholder="Mention installation location (e.g. Ranchi / Jamshedpur), lighting preference, or deadline"
                      className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600/20"
                    />
                  </div>

                  <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
                    <button
                      type="submit"
                      className="inline-flex min-h-[46px] flex-1 items-center justify-center rounded-lg bg-amber-600 px-5 py-3 text-sm font-semibold text-white hover:bg-amber-700 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                    >
                      Prepare Quote Request
                    </button>

                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg border border-emerald-700 bg-white px-4 py-3 text-sm font-semibold text-emerald-800 hover:bg-emerald-50 transition-colors duration-150 whitespace-nowrap"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      <span>Direct WhatsApp</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
