import React from 'react';
import { Search, Landmark, Sparkles, BookOpen, Feather, ArrowDown } from 'lucide-react';
import { heritageCategories } from '../../data/heritageData';
import { LotusLogo } from '../ui/DecorativeElements';
import { useLanguage } from '../../i18n';

export default function HeritageHeader({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  onScrollToContribute,
}) {
  const { language, t } = useLanguage();

  return (
    <div className="relative mb-8 rounded-2xl overflow-hidden bg-ivory border border-beige-dark/70 shadow-sm p-6 sm:p-8 animate-fade-in">
      {/* Soft warm ochre background radiance */}
      <div
        className="absolute -right-20 -top-20 w-80 h-80 rounded-full pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle, #D5B77A 0%, rgba(247, 243, 234, 0) 70%)',
        }}
      />

      {/* Title & Introduction */}
      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest/10 text-forest text-xs font-sans font-medium border border-forest/25">
              <Landmark size={13} />
              {language === 'hi' ? 'जीवंत विरासत और पारंपरिक ज्ञान' : 'Living Heritage & Traditional Knowledge'}
            </span>
            <span className="text-xs font-sans text-brown/40">·</span>
            <span className="text-xs font-sans text-brown/65">
              {language === 'hi' ? 'भारतीय शिल्प परंपराओं का संरक्षण' : 'Preserving Indian Craft Traditions'}
            </span>
          </div>

          <h1 className="font-serif font-bold text-brown text-3xl sm:text-4xl tracking-tight leading-tight mb-2">
            {t('heritage.title')}
          </h1>

          <p className="font-serif italic text-terracotta text-lg sm:text-xl mb-3">
            {language === 'hi'
              ? '“उन परंपराओं, कहानियों और शिल्प कौशल को जानें जो हमारी विरासत को विशेष बनाते हैं।”'
              : '“Discover the traditions, stories and craftsmanship that make our heritage special.”'}
          </p>

          <p className="font-sans text-brown/75 text-sm sm:text-base leading-relaxed">
            {language === 'hi'
              ? 'कलासेतु धरोहर अभिलेखागार में आपका स्वागत है—एक आत्मीय मंच जो पारंपरिक भारतीय कला शैलियों, लोक प्रथाओं और पीढ़ियों से चले आ रहे पवित्र शिल्प ज्ञान के संरक्षण को समर्पित है।'
              : 'Welcome to the KalaSetu Heritage Archive—a warm, welcoming space dedicated to exploring, learning, and preserving traditional Indian art forms, folk practices, and sacred techniques passed down through generations of artisans.'}
          </p>
        </div>

        {/* CTA to Contribute Knowledge */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 w-full lg:w-auto flex-shrink-0">
          <button
            onClick={onScrollToContribute}
            className="btn-primary flex items-center justify-center gap-2 px-6 py-3 text-sm font-sans font-medium shadow-md hover:shadow-lg transition-all"
          >
            <Feather size={16} />
            <span>{t('heritage.contributeKnowledge')}</span>
          </button>

          <span className="text-[11px] font-sans text-brown/60 text-center lg:text-right">
            {language === 'hi'
              ? 'भावी पीढ़ियों के लिए अपनी कला को संरक्षित करने में मदद करें'
              : 'Help preserve your craft for future generations'}
          </span>
        </div>
      </div>

      {/* ── Search Bar & Category Filter Strip ── */}
      <div className="relative z-10 pt-4 border-t border-beige-dark/50 space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-xl">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-brown/45"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t('heritage.searchPlaceholder')}
            className="w-full pl-11 pr-4 py-3 bg-beige-light border border-beige-dark/70 rounded-xl text-sm font-sans text-brown placeholder-brown/45 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta/20 shadow-inner"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-sans text-brown/60 hidden sm:inline mr-1 font-medium">
            {language === 'hi' ? 'श्रेणियां:' : 'Categories:'}
          </span>
          {heritageCategories.map((cat) => {
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-medium whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? 'bg-terracotta text-white shadow-sm'
                    : 'bg-beige border border-beige-dark/60 text-brown/70 hover:text-brown hover:bg-beige-dark/30'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
