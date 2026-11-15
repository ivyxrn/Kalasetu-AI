import React, { useState } from 'react';
import { ChevronDown, SearchX, RotateCcw, HelpCircle } from 'lucide-react';
import { useLanguage } from '../../i18n';

export default function FaqAccordion({ faqs, searchQuery, onClearSearch }) {
  const { t } = useLanguage();
  const [openId, setOpenId] = useState(faqs.length > 0 ? faqs[0].id : null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    'Getting Started',
    'Artwork',
    'ArtStory',
    'Catalogue',
    'Portfolio',
    'Pricing',
    'Settings',
  ];

  // Filter FAQs based on active category and search query
  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      activeCategory === 'All' || faq.category === activeCategory;
    if (!matchesCategory) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchQ = faq.question.toLowerCase().includes(q);
      const matchA = faq.answer.toLowerCase().includes(q);
      return matchQ || matchA;
    }

    return true;
  });

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6">
      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-sans font-medium whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-terracotta text-white shadow-xs'
                : 'bg-beige/70 text-brown/70 hover:bg-beige border border-beige-dark/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      {filteredFaqs.length > 0 ? (
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-beige-dark/65 overflow-hidden bg-ivory transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-beige/30 transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-terracotta flex-shrink-0" />
                    <span className="font-serif font-semibold text-brown text-sm sm:text-base">
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`w-6 h-6 rounded-full bg-beige flex items-center justify-center text-brown/60 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-ochre/25 text-ochre-dark' : ''
                    }`}
                  >
                    <ChevronDown size={14} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-[13px] font-sans text-brown/75 leading-relaxed border-t border-beige-dark/30 bg-beige/15 animate-fade-in">
                    <p>{faq.answer}</p>
                    <div className="mt-2.5 flex items-center gap-2 text-[11px] font-sans text-brown/45">
                      <span className="px-2 py-0.5 rounded-md bg-beige border border-beige-dark/50">
                        {t('help.topic', 'Topic:')} {faq.category}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 px-4 rounded-2xl bg-beige/30 border border-beige-dark/50">
          <div className="w-12 h-12 rounded-full bg-ochre/15 text-ochre-dark flex items-center justify-center mx-auto mb-3">
            <SearchX size={22} />
          </div>
          <h4 className="font-serif font-bold text-brown text-base mb-1">
            {t('help.noFaqsFound', 'No matching questions found')}
          </h4>
          <p className="font-sans text-xs text-brown/60 max-w-sm mx-auto mb-4 leading-relaxed">
            {t('help.noFaqsDesc', { query: searchQuery }, `We couldn't find any FAQs matching "${searchQuery}". Try using different words or clear your search.`)}
          </p>
          <button
            onClick={onClearSearch}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-beige border border-beige-dark/60 text-xs font-sans font-medium text-brown hover:bg-beige-dark/30 transition-colors"
          >
            <RotateCcw size={12} />
            <span>{t('help.resetFilters', 'Reset Search & Filters')}</span>
          </button>
        </div>
      )}
    </div>
  );
}
