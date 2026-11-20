import { ChevronDown, MessageCircle, Phone } from 'lucide-react';
import { useState } from 'react';
import {
  BUSINESS_INFO,
  FAQ_ITEMS,
  FAQ_TOPICS,
  type FaqTopic,
} from '../data/business';
import { buildWhatsAppQuoteUrl, filterFaqsByTopic } from '../utils/signage';

interface FaqSectionProps {
  onRequestQuote: () => void;
}

export function FaqSection({ onRequestQuote }: FaqSectionProps) {
  const [selectedTopic, setSelectedTopic] = useState<FaqTopic>('All');
  const [openFaqId, setOpenFaqId] = useState<string>(
    FAQ_ITEMS[0]?.id ?? 'faq-production-timelines'
  );

  const visibleFaqs = filterFaqsByTopic(FAQ_ITEMS, selectedTopic);

  function handleTopicChange(topic: FaqTopic) {
    setSelectedTopic(topic);
    const nextVisible = filterFaqsByTopic(FAQ_ITEMS, topic);
    if (
      nextVisible.length > 0 &&
      !nextVisible.some((item) => item.id === openFaqId)
    ) {
      setOpenFaqId(nextVisible[0].id);
    }
  }

  return (
    <section
      id="faq"
      className="border-b border-slate-200 bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Sticky Editorial Intro & Quick Assistance */}
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold text-amber-700">
              Common Questions
            </p>
            <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl text-balance">
              Production Timelines, Warranty &amp; Material Durability
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Clear answers about how we schedule signage production, how
              component warranties are confirmed on quotes, and which materials
              perform best outdoors.
            </p>

            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-900">
                Have a specific board size or deadline?
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                Call our Ranchi workshop or send your storefront photo on
                WhatsApp for exact lead times and component details.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-900 hover:bg-slate-100 transition-colors whitespace-nowrap"
                >
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Call Shop</span>
                </a>
                <a
                  href={buildWhatsAppQuoteUrl(BUSINESS_INFO.whatsappDigits, {
                    notes: 'Question regarding timeline / warranty / material options',
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={onRequestQuote}
                  className="inline-flex min-h-[40px] items-center rounded-lg bg-amber-600 px-3 py-2 text-xs font-semibold text-white hover:bg-amber-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Request Quote
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Topic Filter + Accessible Accordion */}
          <div className="lg:col-span-7">
            <div
              role="tablist"
              aria-label="Filter FAQ by topic"
              className="flex flex-wrap items-center gap-1.5 rounded-lg bg-slate-100 p-1"
            >
              {FAQ_TOPICS.map((topic) => {
                const isActive = selectedTopic === topic;
                return (
                  <button
                    key={topic}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleTopicChange(topic)}
                    className={`min-h-[38px] rounded-md px-3 py-1.5 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
                      isActive
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {topic}
                  </button>
                );
              })}
            </div>

            <div
              data-testid="faq-list"
              className="mt-4 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-slate-50"
            >
              {visibleFaqs.map((item) => {
                const isOpen = openFaqId === item.id;
                const panelId = `${item.id}-panel`;
                return (
                  <div key={item.id} className="bg-white first:rounded-t-xl last:rounded-b-xl">
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() =>
                          setOpenFaqId((prev) =>
                            prev === item.id ? '' : item.id
                          )
                        }
                        className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-slate-50 sm:px-6 sm:py-5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-amber-600"
                      >
                        <div className="min-w-0">
                          <span className="block text-[11px] font-semibold uppercase tracking-wider text-amber-700">
                            {item.topic}
                          </span>
                          <span className="font-display mt-1 block text-base font-semibold text-slate-900 sm:text-lg">
                            {item.question}
                          </span>
                        </div>
                        <ChevronDown
                          className={`mt-1 h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-amber-700' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    </h3>
                    {isOpen && (
                      <div
                        id={panelId}
                        className="px-5 pb-5 pt-0 text-sm leading-relaxed text-slate-600 sm:px-6 sm:pb-6 sm:text-base"
                      >
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
