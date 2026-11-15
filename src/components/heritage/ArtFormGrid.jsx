import React from 'react';
import { MapPin, ArrowRight, BookOpen, Sparkles, RotateCcw } from 'lucide-react';
import { useLanguage } from '../../i18n';

export default function ArtFormGrid({
  artForms,
  onSelectArtForm,
  onResetFilters,
  searchQuery,
  selectedCategory,
}) {
  const { t } = useLanguage();

  return (
    <section className="mb-14">
      {/* Demonstration Notice */}
      <div className="mb-5 px-4 py-2 rounded-xl bg-ochre/15 border border-ochre/30 flex flex-wrap items-center justify-between gap-2 text-xs font-sans text-brown/75">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-forest animate-pulse" />
          <span className="font-semibold text-brown">{t('heritage.grid.curatedBadge', 'Curated Traditional Archive')}</span>
          <span>·</span>
          <span>
            {t('heritage.grid.curatedNotice', 'Demonstration entries. Cultural references and community knowledge ready for verified RAG integration.')}
          </span>
        </div>
        <span className="text-[11px] font-sans text-brown/50">
          {t('heritage.grid.formsListed', { count: artForms.length }, `${artForms.length} Art Forms Listed`)}
        </span>
      </div>

      {/* Grid of Cards */}
      {artForms.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {artForms.map((item) => (
            <div
              key={item.id}
              className="group bg-ivory rounded-2xl border border-beige-dark/70 hover:border-ochre/80 hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Artwork Thumbnail */}
                <div
                  onClick={() => onSelectArtForm(item)}
                  className="relative aspect-[16/11] w-full overflow-hidden bg-brown/10 cursor-pointer border-b border-beige-dark/50"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Category Badge (Top Right) */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-sans font-medium bg-ivory/95 text-brown border border-beige-dark/70 shadow-sm backdrop-blur-md">
                      {item.category}
                    </span>
                  </div>

                  {/* Hover Prompt */}
                  <div className="absolute inset-0 bg-brown/25 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="px-3.5 py-1.5 rounded-full bg-ivory text-brown text-xs font-sans font-medium flex items-center gap-1.5 shadow-lg">
                      <BookOpen size={13} className="text-terracotta" />
                      {t('heritage.grid.exploreHeritage', 'Explore Heritage')}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Regional Association */}
                  <div className="flex items-center gap-1 text-[11px] font-sans text-terracotta font-medium mb-1.5 truncate">
                    <MapPin size={12} className="flex-shrink-0" />
                    <span className="truncate">{item.region}</span>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => onSelectArtForm(item)}
                    className="font-serif font-bold text-brown text-lg hover:text-terracotta cursor-pointer transition-colors leading-snug mb-2 line-clamp-1"
                    title={item.name}
                  >
                    {item.name}
                  </h3>

                  {/* Short Introduction */}
                  <p className="text-xs font-sans text-brown/70 line-clamp-3 leading-relaxed mb-2">
                    {item.shortIntro}
                  </p>
                </div>
              </div>

              {/* Card Footer: Explore Button */}
              <div className="px-5 py-3.5 bg-beige/30 border-t border-beige-dark/40 flex items-center justify-between">
                <span className="text-[11px] font-sans text-brown/50">
                  {t('heritage.grid.culturalDoc', 'Cultural Documentation')}
                </span>

                <button
                  onClick={() => onSelectArtForm(item)}
                  className="px-3 py-1.5 rounded-lg bg-ivory hover:bg-beige border border-beige-dark/60 text-xs font-sans font-medium text-brown transition-colors flex items-center gap-1.5 shadow-sm group-hover:border-terracotta/40"
                >
                  <span>{t('heritage.grid.explore', 'Explore')}</span>
                  <ArrowRight
                    size={13}
                    className="text-terracotta group-hover:translate-x-0.5 transition-transform"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-ivory border border-beige-dark/60 rounded-2xl p-12 text-center max-w-md mx-auto shadow-sm">
          <div className="w-14 h-14 rounded-full bg-beige border border-ochre/30 flex items-center justify-center mx-auto mb-3 text-terracotta">
            <BookOpen size={24} />
          </div>
          <h3 className="font-serif font-bold text-brown text-lg mb-1">
            {t('heritage.grid.noTraditions', 'No Traditions Found')}
          </h3>
          <p className="font-sans text-xs text-brown/60 mb-5 leading-relaxed">
            {t('heritage.grid.noTraditionsDesc', { query: searchQuery || selectedCategory }, `No art forms matched your search "${searchQuery || selectedCategory}". Try another craft or clear your filters to view all traditions.`)}
          </p>
          <button
            onClick={onResetFilters}
            className="btn-primary text-xs py-2 px-5 inline-flex items-center gap-1.5"
          >
            <RotateCcw size={13} />
            <span>{t('heritage.grid.viewAll', 'View All Art Forms')}</span>
          </button>
        </div>
      )}
    </section>
  );
}
