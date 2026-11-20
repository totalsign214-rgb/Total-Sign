import { useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { GalleryAndReviewsSection } from './components/GalleryAndReviewsSection';
import { HeroSection } from './components/HeroSection';
import { MobileQuickBar } from './components/MobileQuickBar';
import { Navbar } from './components/Navbar';
import { ServicesSection } from './components/ServicesSection';

export default function App() {
  const [selectedQuoteService, setSelectedQuoteService] = useState<string>('');

  function scrollToQuoteSection(serviceTitle?: string) {
    if (serviceTitle) {
      setSelectedQuoteService(serviceTitle);
    }
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar onRequestQuote={() => scrollToQuoteSection()} />
      <main>
        <HeroSection onRequestQuote={() => scrollToQuoteSection()} />
        <AboutSection />
        <ServicesSection
          onSelectServiceForQuote={(serviceTitle) =>
            scrollToQuoteSection(serviceTitle)
          }
        />
        <GalleryAndReviewsSection
          onSelectServiceForQuote={(serviceTitle) =>
            scrollToQuoteSection(serviceTitle)
          }
        />
        <FaqSection onRequestQuote={() => scrollToQuoteSection()} />
        <ContactSection preselectedService={selectedQuoteService} />
      </main>
      <Footer />
      <MobileQuickBar />
    </div>
  );
}
