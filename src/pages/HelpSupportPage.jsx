import React, { useState, useMemo } from 'react';
import HelpHeader from '../components/help/HelpHeader';
import GuideCard from '../components/help/GuideCard';
import GuideDetailModal from '../components/help/GuideDetailModal';
import FaqAccordion from '../components/help/FaqAccordion';
import ContactSupportCard from '../components/help/ContactSupportCard';
import ReportProblemModal from '../components/help/ReportProblemModal';
import { helpGuides, helpFaqs } from '../data/helpData';
import { WarliDivider } from '../components/ui/DecorativeElements';
import { BookOpen, HelpCircle, MessageCircleQuestion } from 'lucide-react';
import { useLanguage } from '../i18n';

export default function HelpSupportPage() {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [isReportProblemOpen, setIsReportProblemOpen] = useState(false);

  // Search filtering for Guides
  const filteredGuides = useMemo(() => {
    if (!searchQuery.trim()) return helpGuides;
    const q = searchQuery.toLowerCase().trim();

    return helpGuides.filter((guide) => {
      const matchTitle = guide.title.toLowerCase().includes(q);
      const matchDesc = guide.shortDescription.toLowerCase().includes(q);
      const matchCategory = guide.category.toLowerCase().includes(q);
      const matchSteps = guide.steps.some(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
      );
      return matchTitle || matchDesc || matchCategory || matchSteps;
    });
  }, [searchQuery]);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="px-4 sm:px-8 py-8 max-w-7xl mx-auto animate-fade-in space-y-14">
      {/* ── 1. Welcome Section & Prominent Search ── */}
      <HelpHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClearSearch={handleClearSearch}
      />

      {/* ── 2. Getting Started with KalaSetu AI ── */}
      <section id="getting-started-section" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-beige-dark/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-terracotta/10 text-terracotta flex items-center justify-center font-bold text-sm">
              <BookOpen size={17} />
            </div>
            <div>
              <h2 className="font-serif font-bold text-brown text-2xl">
                {t('help.gettingStarted')}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-brown/65 mt-0.5">
                {t('help.gettingStartedDesc')}
              </p>
            </div>
          </div>

          <span className="text-xs font-sans text-brown/50">
            {t('help.guidesAvailable', { count: filteredGuides.length })}
          </span>
        </div>

        {filteredGuides.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredGuides.map((guide) => (
              <GuideCard
                key={guide.id}
                guide={guide}
                onSelect={setSelectedGuide}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 px-4 rounded-2xl bg-beige/30 border border-beige-dark/50 text-xs font-sans text-brown/60">
            {t('help.noGuidesFound', { query: searchQuery })}
          </div>
        )}
      </section>

      {/* ── 3. Frequently Asked Questions ── */}
      <section id="faq-section" className="space-y-6">
        <div className="flex items-center gap-2.5 pb-3 border-b border-beige-dark/50">
          <div className="w-8 h-8 rounded-lg bg-forest/10 text-forest flex items-center justify-center font-bold text-sm">
            <MessageCircleQuestion size={18} />
          </div>
          <div>
            <h2 className="font-serif font-bold text-brown text-2xl">
              {t('help.faq')}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-brown/65 mt-0.5">
              {t('help.faqDesc')}
            </p>
          </div>
        </div>

        <FaqAccordion
          faqs={helpFaqs}
          searchQuery={searchQuery}
          onClearSearch={handleClearSearch}
        />
      </section>

      {/* ── 4. Contact Support Section (Still Need Help?) ── */}
      <section id="contact-section">
        <ContactSupportCard
          onOpenReportProblem={() => setIsReportProblemOpen(true)}
        />
      </section>

      {/* ── 5. Bottom Decorative Heritage Warli Border ── */}
      <div className="pt-6 pb-2">
        <WarliDivider className="w-full opacity-60" />
      </div>

      {/* ── Modals ── */}
      {/* Guide Detail Modal */}
      {selectedGuide && (
        <GuideDetailModal
          guide={selectedGuide}
          isOpen={!!selectedGuide}
          onClose={() => setSelectedGuide(null)}
        />
      )}

      {/* Report Technical Problem Modal */}
      <ReportProblemModal
        isOpen={isReportProblemOpen}
        onClose={() => setIsReportProblemOpen(false)}
      />
    </div>
  );
}
