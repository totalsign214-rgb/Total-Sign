import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { BUSINESS_INFO } from '../data/business';

interface NavbarProps {
  onRequestQuote: () => void;
}

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({ onRequestQuote }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 md:h-16">
        {/* Zone 1: Single-element Brand Wordmark */}
        <a
          href="#home"
          className="font-display text-lg font-bold tracking-wide text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600"
        >
          {BUSINESS_INFO.name}
        </a>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-amber-600 hover:text-slate-900 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action + mobile drawer trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onRequestQuote}
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          >
            Request Quote
          </button>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 md:hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-slate-200 bg-white px-4 py-4 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestQuote();
              }}
              className="mt-2 flex min-h-[44px] w-full items-center justify-center rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-amber-700 cursor-pointer"
            >
              Request Quote
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
