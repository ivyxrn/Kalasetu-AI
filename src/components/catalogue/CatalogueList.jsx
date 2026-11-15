import React, { useState } from 'react';
import {
  BookOpen,
  Eye,
  Edit3,
  MoreVertical,
  Calendar,
  Layers,
  Sparkles,
  Trash2,
  Copy,
  Printer,
  CheckCircle2,
  Clock,
  Plus,
} from 'lucide-react';
import { catalogueLayouts } from '../../data/catalogueData';
import { useLanguage } from '../../i18n';

export default function CatalogueList({
  catalogues,
  onViewCatalogue,
  onEditCatalogue,
  onDeleteCatalogue,
  onDuplicateCatalogue,
  onToggleStatus,
  onCreateNew,
}) {
  const { t } = useLanguage();
  const [activeMenuId, setActiveMenuId] = useState(null);

  const toggleMenu = (id, e) => {
    e.stopPropagation();
    setActiveMenuId((prev) => (prev === id ? null : id));
  };

  // Close menu on outside click
  React.useEffect(() => {
    const handleOutside = () => setActiveMenuId(null);
    window.addEventListener('click', handleOutside);
    return () => window.removeEventListener('click', handleOutside);
  }, []);

  return (
    <section id="your-catalogues" className="mb-12">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-3 border-b border-beige-dark/60">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen size={20} className="text-terracotta" />
            <h2 className="font-serif font-bold text-brown text-2xl">
              {t('catalogue.yourCatalogues', 'Your Catalogues')}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-sans font-semibold bg-terracotta/10 text-terracotta border border-terracotta/20">
              {t('catalogue.volumesCount', { count: catalogues.length }, `${catalogues.length} Volumes`)}
            </span>
          </div>
          <p className="font-sans text-xs sm:text-sm text-brown/65 mt-1">
            {t('catalogue.cataloguesSubtitle', 'Curated publications ready for collectors, gallery exhibitions, and archival preservation.')}
          </p>
        </div>

        <button
          onClick={onCreateNew}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-beige border border-beige-dark/70 text-xs font-sans font-medium text-brown hover:bg-beige-dark/30 transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <Plus size={14} className="text-terracotta" />
          <span>{t('catalogue.newCatalogue', 'New Catalogue')}</span>
        </button>
      </div>

      {/* Catalogues Cards Grid */}
      {catalogues.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {catalogues.map((cat) => {
            const layoutObj =
              catalogueLayouts.find((l) => l.id === cat.layout) || catalogueLayouts[0];
            const isMenuOpen = activeMenuId === cat.id;
            const artworkCount = cat.artworkItems ? cat.artworkItems.length : 0;

            return (
              <div
                key={cat.id}
                className="group relative bg-ivory rounded-2xl border border-beige-dark/70 hover:border-ochre/80 hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Publication Cover Container */}
                  <div
                    onClick={() => onViewCatalogue(cat)}
                    className="relative aspect-[16/10] w-full overflow-hidden bg-brown/10 cursor-pointer border-b border-beige-dark/50"
                  >
                    <img
                      src={cat.coverImage}
                      alt={cat.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Book spine shadow overlay on left side */}
                    <div
                      className="absolute inset-y-0 left-0 w-8 pointer-events-none opacity-40"
                      style={{
                        background:
                          'linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)',
                      }}
                    />

                    {/* Status Badge (Top Left) */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10.5px] font-sans font-semibold shadow-sm backdrop-blur-md ${
                          cat.status === 'Published'
                            ? 'bg-forest/90 text-white'
                            : 'bg-ochre-dark/90 text-white'
                        }`}
                      >
                        {cat.status === 'Published' ? `● ${t('common.published', 'Published')}` : `○ ${t('common.draft', 'Draft')}`}
                      </span>
                    </div>

                    {/* Layout Tag (Top Right) */}
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-sans font-medium bg-ivory/90 text-brown border border-beige-dark/70 shadow-sm backdrop-blur-md">
                        {layoutObj.title}
                      </span>
                    </div>

                    {/* Hover Prompt Overlay */}
                    <div className="absolute inset-0 bg-brown/25 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <span className="px-3.5 py-1.5 rounded-full bg-ivory text-brown text-xs font-sans font-medium flex items-center gap-1.5 shadow-lg">
                        <Eye size={14} className="text-terracotta" />
                        {t('catalogue.openReader', 'Open Publication Reader')}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    {/* Exhibition Subtitle */}
                    {cat.exhibitionName && (
                      <p className="text-[10px] font-sans font-semibold uppercase tracking-wider text-terracotta mb-1 truncate">
                        {cat.exhibitionName}
                      </p>
                    )}

                    {/* Title */}
                    <h3
                      onClick={() => onViewCatalogue(cat)}
                      className="font-serif font-bold text-brown text-lg hover:text-terracotta cursor-pointer transition-colors leading-snug line-clamp-2 mb-2"
                      title={cat.title}
                    >
                      {cat.title}
                    </h3>

                    {/* Introduction excerpt */}
                    <p className="text-xs font-sans text-brown/70 line-clamp-2 leading-relaxed mb-4">
                      {cat.introduction}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-xs font-sans text-brown/60 pt-2 border-t border-beige-dark/40">
                      <span className="flex items-center gap-1.5">
                        <Layers size={13} className="text-terracotta" />
                        <strong>{artworkCount}</strong> {artworkCount === 1 ? t('artwork.artworkSingle', 'Artwork') : t('artwork.artworkPlural', 'Artworks')}
                      </span>

                      <span className="flex items-center gap-1 text-[11px] text-brown/50">
                        <Calendar size={12} />
                        {cat.date}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="px-5 py-3 bg-beige/30 border-t border-beige-dark/40 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onViewCatalogue(cat)}
                      className="px-3 py-1.5 rounded-lg bg-ivory hover:bg-beige border border-beige-dark/60 text-xs font-sans font-medium text-brown transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <Eye size={13} className="text-terracotta" />
                      <span>{t('common.view', 'View')}</span>
                    </button>
                    <button
                      onClick={() => onEditCatalogue(cat)}
                      className="px-3 py-1.5 rounded-lg bg-ivory hover:bg-beige border border-beige-dark/60 text-xs font-sans font-medium text-brown transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <Edit3 size={13} className="text-forest" />
                      <span>{t('common.edit', 'Edit')}</span>
                    </button>
                  </div>

                  {/* Three-Dot Dropdown Menu */}
                  <div className="relative">
                    <button
                      onClick={(e) => toggleMenu(cat.id, e)}
                      className="p-1.5 rounded-lg hover:bg-beige text-brown/60 hover:text-brown transition-colors"
                      title="More options"
                    >
                      <MoreVertical size={16} />
                    </button>

                    {isMenuOpen && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute right-0 bottom-full mb-1 w-48 bg-ivory rounded-xl border border-beige-dark/70 shadow-xl py-1.5 z-30 animate-fade-in text-xs font-sans text-brown"
                      >
                        <button
                          onClick={() => {
                            setActiveMenuId(null);
                            onToggleStatus(cat.id);
                          }}
                          className="w-full px-3 py-2 text-left hover:bg-beige flex items-center gap-2"
                        >
                          <CheckCircle2 size={13} className="text-forest" />
                          <span>
                            {cat.status === 'Published'
                              ? t('catalogue.switchToDraft', 'Switch to Draft')
                              : t('catalogue.publishCatalogue', 'Publish Catalogue')}
                          </span>
                        </button>

                        <button
                          onClick={() => {
                            setActiveMenuId(null);
                            onDuplicateCatalogue(cat);
                          }}
                          className="w-full px-3 py-2 text-left hover:bg-beige flex items-center gap-2"
                        >
                          <Copy size={13} className="text-ochre-dark" />
                          <span>{t('catalogue.duplicateVolume', 'Duplicate Volume')}</span>
                        </button>

                        <button
                          onClick={() => {
                            setActiveMenuId(null);
                            onViewCatalogue(cat);
                          }}
                          className="w-full px-3 py-2 text-left hover:bg-beige flex items-center gap-2"
                        >
                          <Printer size={13} className="text-brown/70" />
                          <span>{t('catalogue.printExportPdf', 'Print / Export PDF')}</span>
                        </button>

                        <div className="my-1 border-t border-beige-dark/40" />

                        <button
                          onClick={() => {
                            setActiveMenuId(null);
                            onDeleteCatalogue(cat);
                          }}
                          className="w-full px-3 py-2 text-left hover:bg-terracotta/10 text-terracotta flex items-center gap-2"
                        >
                          <Trash2 size={13} />
                          <span>{t('catalogue.deleteCatalogue', 'Delete Catalogue')}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-ivory border border-beige-dark/60 rounded-2xl p-12 text-center max-w-md mx-auto shadow-sm">
          <div className="w-14 h-14 rounded-full bg-beige border border-ochre/30 flex items-center justify-center mx-auto mb-3 text-terracotta">
            <BookOpen size={24} />
          </div>
          <h3 className="font-serif font-bold text-brown text-lg mb-1">
            {t('catalogue.noCataloguesYet', 'No Catalogues Created Yet')}
          </h3>
          <p className="font-sans text-xs text-brown/60 mb-5 leading-relaxed">
            {t('catalogue.noCataloguesDesc', 'Curate your traditional creations into an elegant digital art publication. Share it with galleries, collectors, and patrons.')}
          </p>
          <button
            onClick={onCreateNew}
            className="btn-primary text-xs py-2 px-5 inline-flex items-center gap-1.5"
          >
            <Plus size={14} />
            <span>{t('catalogue.createFirstCatalogue', 'Create Your First Catalogue')}</span>
          </button>
        </div>
      )}
    </section>
  );
}
