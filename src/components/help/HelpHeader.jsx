import React from 'react';
import { Search, X, HelpCircle, Sparkles } from 'lucide-react';
import { useLanguage } from '../../i18n';

export default function HelpHeader({ searchQuery, onSearchChange, onClearSearch }) {
  const { t } = useLanguage();

  return (
    <div className="mb-10 text-center max-w-3xl mx-auto">
      {/* Decorative Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-terracotta/10 border border-terracotta/20 text-terracotta text-xs font-sans font-medium mb-3">
        <Sparkles size={13} />
        <span>{t('help.artisanCareBadge')}</span>
      </div>

      {/* Main Title & Subtitle */}
      <h1 className="font-serif font-bold text-brown text-3xl sm:text-4xl tracking-tight mb-2">
        {t('help.title')}
      </h1>
      <p className="font-serif italic text-base sm:text-lg text-terracotta mb-2">
        {t('help.subtitle')}
      </p>

      {/* Friendly Introductory Message */}
      <p className="font-sans text-xs sm:text-sm text-brown/70 leading-relaxed max-w-xl mx-auto mb-6">
        {t('help.intro')}
      </p>

      {/* Prominent Search Bar */}
      <div className="relative max-w-xl mx-auto">
        <div className="relative flex items-center">
          <Search
            size={18}
            className="absolute left-4 text-brown/40 pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t('help.searchPlaceholder')}
            className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-ivory border-2 border-beige-dark/70 hover:border-ochre focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 text-sm font-sans text-brown placeholder-brown/45 shadow-sm transition-all"
            aria-label="Search help guides and questions"
          />
          {searchQuery && (
            <button
              onClick={onClearSearch}
              className="absolute right-3.5 p-1 rounded-full text-brown/40 hover:text-brown hover:bg-beige transition-colors"
              title="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {searchQuery && (
          <p className="text-left text-xs font-sans text-brown/60 mt-2 px-1">
            {t('help.showingResultsFor', { query: searchQuery })}
          </p>
        )}
      </div>
    </div>
  );
}
