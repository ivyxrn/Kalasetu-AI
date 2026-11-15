import React, { useState, useMemo } from 'react';
import { Search, CheckCircle2, Image as ImageIcon, Sparkles } from 'lucide-react';
import { artFormOptions } from '../../data/artworkData';
import { useLanguage } from '../../i18n';

export default function ArtworkSelector({
  artworks,
  selectedArtwork,
  onSelectArtwork,
}) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArtForm, setSelectedArtForm] = useState('All');

  // Filter artworks based on search and selected art form
  const filteredList = useMemo(() => {
    return artworks.filter((item) => {
      if (selectedArtForm !== 'All' && item.artForm !== selectedArtForm) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchForm = item.artForm.toLowerCase().includes(q);
        if (!matchTitle && !matchForm) return false;
      }
      return true;
    });
  }, [artworks, searchQuery, selectedArtForm]);

  return (
    <div className="bg-ivory border border-beige-dark/70 rounded-2xl p-6 sm:p-7 shadow-sm">
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-beige-dark/50">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-terracotta text-white text-xs font-serif font-bold flex items-center justify-center">
              1
            </span>
            <h2 className="font-serif font-bold text-brown text-lg sm:text-xl">
              {t('artstory.chooseArtworkTitle', 'Choose Your Artwork')}
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-brown/65 mt-0.5 ml-8">
            {t('artstory.chooseArtworkSubtitle', 'Select a piece from your collection to give it an authentic voice.')}
          </p>
        </div>

        {selectedArtwork && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-terracotta/10 border border-terracotta/25 text-terracotta text-xs font-sans font-medium">
            <CheckCircle2 size={14} />
            <span>{t('artstory.selectedBadge', { title: selectedArtwork.title }, `Selected: "${selectedArtwork.title}"`)}</span>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-brown/40"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('artstory.searchPlaceholder', 'Search by title or art form...')}
            className="w-full pl-9 pr-3 py-1.5 bg-beige-light border border-beige-dark/60 rounded-xl text-xs font-sans text-brown placeholder-brown/40 focus:outline-none focus:border-terracotta/40"
          />
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {artFormOptions.map((form) => (
            <button
              key={form}
              onClick={() => setSelectedArtForm(form)}
              className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-sans font-medium transition-colors ${
                selectedArtForm === form
                  ? 'bg-terracotta text-white shadow-sm'
                  : 'bg-beige border border-beige-dark/60 text-brown/70 hover:text-brown'
              }`}
            >
              {form === 'All' ? t('common.all', 'All') : form}
            </button>
          ))}
        </div>
      </div>

      {/* Artwork Grid List */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 max-h-[380px] overflow-y-auto pr-1">
        {filteredList.map((art) => {
          const isSelected = selectedArtwork?.id === art.id;

          return (
            <button
              key={art.id}
              onClick={() => onSelectArtwork(art)}
              className={`group text-left relative rounded-xl overflow-hidden border-2 transition-all p-2 bg-beige-light flex flex-col ${
                isSelected
                  ? 'border-terracotta ring-2 ring-terracotta/30 shadow-md bg-ivory scale-[1.02]'
                  : 'border-beige-dark/60 hover:border-ochre hover:shadow-sm'
              }`}
            >
              {/* Artwork Thumbnail */}
              <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-brown/5 mb-2">
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />

                {isSelected && (
                  <div className="absolute inset-0 bg-terracotta/20 flex items-center justify-center backdrop-blur-[1px]">
                    <div className="w-7 h-7 rounded-full bg-terracotta text-white flex items-center justify-center shadow-lg">
                      <CheckCircle2 size={16} />
                    </div>
                  </div>
                )}
              </div>

              {/* Title & Info */}
              <div className="flex-1 flex flex-col justify-between">
                <h3
                  className={`font-serif font-bold text-xs truncate transition-colors ${
                    isSelected ? 'text-terracotta' : 'text-brown'
                  }`}
                  title={art.title}
                >
                  {art.title}
                </h3>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] font-sans text-brown/60">
                    {art.artForm}
                  </span>
                  <span
                    className={`text-[9.5px] px-1.5 py-0.5 rounded font-sans font-medium ${
                      art.status === 'Published'
                        ? 'bg-forest/10 text-forest'
                        : 'bg-ochre/20 text-ochre-dark'
                    }`}
                  >
                    {art.status === 'Published' ? t('common.published', 'Published') : t('common.draft', 'Draft')}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {filteredList.length === 0 && (
        <div className="py-8 text-center text-brown/50 text-xs font-sans">
          {t('artstory.noArtworksMatch', 'No artworks found matching your filter.')}
        </div>
      )}
    </div>
  );
}
