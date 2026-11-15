import React from 'react';
import { BookOpen, Layers, CheckCircle2, Plus, Sparkles } from 'lucide-react';
import { LotusLogo } from '../ui/DecorativeElements';
import { useLanguage } from '../../i18n';

export default function CatalogueHeader({
  catalogues,
  onCreateNew,
  isCreating,
}) {
  const { t } = useLanguage();
  const totalCatalogues = catalogues.length;
  const publishedCatalogues = catalogues.filter((c) => c.status === 'Published').length;
  const totalArtworksIncluded = catalogues.reduce(
    (sum, c) => sum + (c.artworkItems ? c.artworkItems.length : 0),
    0
  );

  return (
    <div className="relative mb-8 rounded-2xl overflow-hidden bg-ivory border border-beige-dark/70 shadow-sm p-6 sm:p-8 animate-fade-in">
      {/* Subtle ochre radial ambient highlight */}
      <div
        className="absolute -right-16 -top-16 w-72 h-72 rounded-full pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle, #D5B77A 0%, rgba(247, 243, 234, 0) 70%)',
        }}
      />

      {/* Top Banner Row */}
      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-ochre/15 text-brown text-xs font-sans font-medium border border-ochre/30">
              <BookOpen size={13} className="text-terracotta" />
              Digital Art Publication Studio
            </span>
            <span className="text-xs font-sans text-brown/40">·</span>
            <span className="text-xs font-sans text-brown/60">
              Portfolio & Exhibition Catalogues
            </span>
          </div>

          <h1 className="font-serif font-bold text-brown text-3xl sm:text-4xl tracking-tight leading-tight mb-2">
            {t('catalogue.title', 'Exhibition Catalogue')}
          </h1>

          <p className="font-serif italic text-terracotta text-lg sm:text-xl mb-3">
            &ldquo;{t('catalogue.subtitle', 'Curate, publish and present your artworks in museum-grade exhibition catalogues.')}&rdquo;
          </p>

          <p className="font-sans text-brown/75 text-sm sm:text-base leading-relaxed">
            Create professional, museum-quality digital catalogues for exhibitions, gallery presentations, art collectors, and cultural archives. Assemble your artworks into curated volumes complete with cultural narratives, dimensions, and artisan documentation.
          </p>
        </div>

        {/* CTA Button */}
        {!isCreating && (
          <button
            onClick={onCreateNew}
            className="btn-primary flex items-center justify-center gap-2 px-6 py-3 text-sm font-sans font-medium shadow-md hover:shadow-lg transition-all flex-shrink-0"
          >
            <Plus size={16} />
            <span>{t('catalogue.createNew', '+ Create New Catalogue')}</span>
          </button>
        )}
      </div>

      {/* ── Summary Statistics Cards ── */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-beige-dark/50">
        {/* Total Catalogues */}
        <div className="p-4 rounded-xl bg-beige/50 border border-beige-dark/50 flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-lg bg-ivory border border-beige-dark/70 flex items-center justify-center text-brown shadow-sm flex-shrink-0">
            <BookOpen size={20} className="text-terracotta" />
          </div>
          <div>
            <div className="font-serif font-bold text-brown text-2xl leading-none">
              {totalCatalogues}
            </div>
            <div className="text-xs font-sans text-brown/60 mt-1 font-medium">
              {t('catalogue.totalCatalogues', 'Total Catalogues')}
            </div>
          </div>
        </div>

        {/* Total Artworks Included */}
        <div className="p-4 rounded-xl bg-beige/50 border border-beige-dark/50 flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-lg bg-ivory border border-beige-dark/70 flex items-center justify-center text-brown shadow-sm flex-shrink-0">
            <Layers size={20} className="text-forest" />
          </div>
          <div>
            <div className="font-serif font-bold text-brown text-2xl leading-none">
              {totalArtworksIncluded}
            </div>
            <div className="text-xs font-sans text-brown/60 mt-1 font-medium">
              {t('catalogue.artworksIncluded', 'Total Artworks Included')}
            </div>
          </div>
        </div>

        {/* Published Catalogues */}
        <div className="p-4 rounded-xl bg-beige/50 border border-beige-dark/50 flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-lg bg-ivory border border-beige-dark/70 flex items-center justify-center text-brown shadow-sm flex-shrink-0">
            <CheckCircle2 size={20} className="text-ochre-dark" />
          </div>
          <div>
            <div className="font-serif font-bold text-brown text-2xl leading-none">
              {publishedCatalogues}
            </div>
            <div className="text-xs font-sans text-brown/60 mt-1 font-medium">
              {t('common.published', 'Published')} {t('catalogue.myCatalogues', 'Catalogues')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
