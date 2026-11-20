import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import {
  CONFIRMED_SERVICES,
  SERVICE_CATEGORIES,
  type ServiceCategory,
} from '../data/business';
import { filterServicesByCategory } from '../utils/signage';

interface ServicesSectionProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export function ServicesSection({
  onSelectServiceForQuote,
}: ServicesSectionProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<ServiceCategory>('All');

  const visibleServices = filterServicesByCategory(
    CONFIRMED_SERVICES,
    selectedCategory
  );

  return (
    <section id="services" className="border-b border-slate-200 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-amber-700">Confirmed Services</p>
            <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl text-balance">
              Signboards, LED Displays, ACP Cladding &amp; Printing Services
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Every service listed below is fabricated and supplied by our shop.
              Select a category to narrow your requirement or request a direct
              estimate.
            </p>
          </div>

          {/* Interactive Category Filter Controls */}
          <div
            role="tablist"
            aria-label="Filter signage services by category"
            className="flex flex-wrap items-center gap-1.5 rounded-lg bg-slate-100 p-1"
          >
            {SERVICE_CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(category)}
                  className={`min-h-[38px] rounded-md px-3 py-1.5 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Service Cards Grid */}
        <div
          data-testid="services-grid"
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {visibleServices.map((service) => (
            <article
              key={service.id}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 transition-colors duration-150 hover:border-slate-300"
            >
              <div>
                <div className="flex items-center justify-between gap-4 text-xs text-slate-500">
                  <span className="font-display font-bold text-amber-700 tabular-nums">
                    {service.index}.
                  </span>
                  <span>{service.category}</span>
                </div>

                <h3 className="font-display mt-3 text-xl font-semibold text-slate-900">
                  {service.title}
                </h3>

                <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                  {service.summary}
                </p>

                {/* Zero-pill unboxed metadata with typographic separators */}
                <p className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-500">
                  {service.materials.join(' · ')}
                </p>
              </div>

              <div className="mt-5">
                <button
                  type="button"
                  onClick={() => onSelectServiceForQuote(service.title)}
                  className="inline-flex min-h-[40px] items-center gap-1.5 text-sm font-semibold text-amber-700 hover:text-amber-800 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                >
                  <span>Get Quote for {service.title}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
