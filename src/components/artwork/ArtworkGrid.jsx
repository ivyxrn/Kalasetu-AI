import React from 'react';
import ArtworkCard from './ArtworkCard';
import { SearchX, RotateCcw } from 'lucide-react';
import { useLanguage } from '../../i18n';

export default function ArtworkGrid({
  artworks,
  onSelect,
  onEdit,
  onDelete,
  onToggleStatus,
  onResetFilters,
  onEstimateFairPrice,
}) {
  const { t } = useLanguage();

  if (artworks.length === 0) {
    return (
      <div className="py-16 text-center bg-beige-light border border-beige-dark/50 rounded-2xl p-8 mb-6 shadow-sm">
        <div className="w-14 h-14 mx-auto rounded-full bg-ochre/15 border border-ochre/30 flex items-center justify-center mb-4 text-ochre-dark">
          <SearchX size={26} strokeWidth={1.8} />
        </div>
        <h3 className="font-serif font-semibold text-brown text-lg mb-1">
          {t('artwork.noArtworksFound', 'No artworks found')}
        </h3>
        <p className="font-sans text-brown/55 text-sm max-w-sm mx-auto mb-5 leading-relaxed">
          {t('artwork.noArtworksDesc', "We couldn't find any artworks matching your search or filter criteria. Try adjusting your search term or filters.")}
        </p>
        <button
          onClick={onResetFilters}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-beige border border-beige-dark/60 text-xs font-sans font-medium text-brown hover:bg-beige-dark/30 transition-colors"
        >
          <RotateCcw size={13} />
          {t('artwork.resetFilters', 'Reset All Filters')}
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
      {artworks.map((artwork) => (
        <ArtworkCard
          key={artwork.id}
          artwork={artwork}
          onSelect={onSelect}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
          onEstimateFairPrice={onEstimateFairPrice}
        />
      ))}
    </div>
  );
}

