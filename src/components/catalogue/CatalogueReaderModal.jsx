import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Printer,
  Calendar,
  Layers,
  Sparkles,
  BookOpen,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { LotusLogo } from '../ui/DecorativeElements';
import { useLanguage } from '../../i18n';

export default function CatalogueReaderModal({ catalogue, onClose, onEdit }) {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        setCurrentPage((p) => Math.max(0, p - 1));
      } else if (e.key === 'ArrowRight') {
        if (catalogue?.artworkItems) {
          setCurrentPage((p) =>
            Math.min(catalogue.artworkItems.length + 2, p + 1)
          );
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [catalogue, onClose]);

  if (!catalogue) return null;

  const artworkItems = catalogue.artworkItems || [];
  const totalPages = artworkItems.length + 3; // Cover (0), Intro (1), Plates (2..N+1), Colophon (N+2)

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-brown/75 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fade-in">
      <div
        className={`relative w-full max-w-5xl bg-[#FAF6F0] rounded-2xl border border-beige-dark/70 shadow-2xl overflow-hidden flex flex-col ${
          isFullscreen ? 'fixed inset-0 rounded-none max-w-none h-screen' : 'max-h-[92vh]'
        }`}
      >
        {/* ── Top Bar HUD ── */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-beige-dark/50 bg-ivory/90 backdrop-blur-sm z-20">
          <div className="flex items-center gap-2.5">
            <LotusLogo size={22} />
            <div>
              <div className="text-[10px] font-sans font-semibold uppercase tracking-wider text-terracotta">
                {t('catalogue.readerBadge', 'KalaSetu Publication Reader')}
              </div>
              <h2 className="font-serif font-bold text-brown text-sm sm:text-base truncate max-w-md">
                {catalogue.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-sans text-brown/60 hidden sm:inline mr-2">
              {t('catalogue.pageCount', { current: currentPage + 1, total: totalPages }, `Page ${currentPage + 1} of ${totalPages}`)}
            </span>

            <button
              onClick={handlePrint}
              className="p-1.5 rounded-lg bg-ivory hover:bg-beige border border-beige-dark/60 text-brown/70 hover:text-brown transition-colors"
              title={t('catalogue.printCatalogue', 'Download / Print')}
            >
              <Printer size={15} />
            </button>

            <button
              onClick={() => setIsFullscreen((prev) => !prev)}
              className="p-1.5 rounded-lg bg-ivory hover:bg-beige border border-beige-dark/60 text-brown/70 hover:text-brown transition-colors"
              title={t('catalogue.toggleFullscreen', 'Toggle Fullscreen')}
            >
              {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
            </button>

            {onEdit && (
              <button
                onClick={() => {
                  onClose();
                  onEdit(catalogue);
                }}
                className="px-3 py-1.5 rounded-lg bg-beige hover:bg-beige-dark/30 text-xs font-sans font-medium text-brown border border-beige-dark/60 transition-colors"
              >
                {t('common.edit', 'Edit')}
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-beige hover:bg-beige-dark/40 text-brown/70 hover:text-brown transition-colors"
              title={t('catalogue.closeReader', 'Close Reader (Esc)')}
              aria-label={t('common.close', 'Close')}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ── Scrollable Publication Body ── */}
        <div className="p-6 sm:p-10 flex-1 overflow-y-auto flex flex-col justify-between">
          {/* PAGE 0: COVER SPREAD */}
          {currentPage === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-in py-6">
              {catalogue.exhibitionName && (
                <div className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-terracotta mb-3">
                  {catalogue.exhibitionName}
                </div>
              )}

              <h1 className="font-serif font-bold text-brown text-3xl sm:text-5xl max-w-2xl leading-tight mb-3 tracking-tight">
                {catalogue.title}
              </h1>

              {catalogue.subtitle && (
                <p className="font-serif italic text-brown/75 text-lg sm:text-xl mb-8">
                  {catalogue.subtitle}
                </p>
              )}

              <div className="rounded-2xl p-4 shadow-xl max-w-md w-full mb-8 bg-[#2F1E15] border-2 border-[#C4A163]">
                <div className="p-3 rounded bg-[#F8F5EE] border border-[#D5B77A]">
                  <div className="aspect-[16/10] w-full rounded overflow-hidden">
                    <img
                      src={catalogue.coverImage}
                      alt={catalogue.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="text-sm font-sans text-brown/70">
                {t('catalogue.traditionalMasterworksBy', 'Traditional Masterworks by')}{' '}
                <strong className="text-brown">Ivy Maiti</strong>
                <div className="text-xs text-brown/45 mt-1">
                  {t('catalogue.archivePublished', { date: catalogue.date }, `KalaSetu Heritage Archive · Published ${catalogue.date}`)}
                </div>
              </div>
            </div>
          )}

          {/* PAGE 1: INTRODUCTION SPREAD */}
          {currentPage === 1 && (
            <div className="flex-1 max-w-2xl mx-auto flex flex-col justify-center animate-fade-in py-6">
              <div className="text-center mb-8">
                <span className="text-xs font-sans font-semibold uppercase tracking-widest text-terracotta">
                  {t('catalogue.curatorialStatement', 'Curatorial Statement')}
                </span>
                <h2 className="font-serif font-bold text-brown text-3xl sm:text-4xl mt-1">
                  The Living Voice of Tradition
                </h2>
                <div className="w-16 h-0.5 bg-ochre/60 mx-auto mt-3" />
              </div>

              <div className="prose prose-brown text-justify font-serif text-brown/85 text-base sm:text-lg leading-relaxed space-y-4">
                <p className="first-letter:text-4xl first-letter:font-bold first-letter:text-terracotta first-letter:float-left first-letter:mr-2">
                  {catalogue.introduction}
                </p>
                <p>
                  In traditional Indian art, the artist is not an isolated creator, but a custodian of community dreams and sacred lore. Through natural earth clays, bamboo pens, and vegetable dyes, these works invite us into a dialogue of reverence for our planet and ancestors.
                </p>
              </div>

              <div className="mt-10 pt-4 border-t border-beige-dark/60 flex items-center justify-between text-xs font-sans text-brown/60">
                <span>{t('catalogue.archiveTitle', 'Traditional Indian Art Archive')}</span>
                <span>Ivy Maiti, {t('catalogue.artistStoryteller', 'Artist & Storyteller')}</span>
              </div>
            </div>
          )}

          {/* PAGES 2..N+1: ARTWORK PLATES */}
          {currentPage >= 2 && currentPage <= artworkItems.length + 1 && (
            (() => {
              const currentPlate = artworkItems[currentPage - 2];
              if (!currentPlate) return null;

              return (
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in py-4">
                  {/* Left: Big Framed Artwork */}
                  <div className="lg:col-span-7 flex flex-col items-center">
                    <div
                      className="w-full rounded-2xl p-4 shadow-xl border"
                      style={{
                        backgroundColor: '#2F1E15',
                        borderColor: '#C4A163',
                      }}
                    >
                      <div
                        className="p-3 rounded-sm border"
                        style={{
                          backgroundColor: '#F8F5EE',
                          borderColor: '#D5B77A',
                        }}
                      >
                        <div className="aspect-[16/11] w-full rounded overflow-hidden bg-brown/10">
                          <img
                            src={currentPlate.imageUrl}
                            alt={currentPlate.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 text-center text-xs font-sans text-brown/50">
                      Plate {currentPage - 1} · {currentPlate.title} by Ivy Maiti
                    </div>
                  </div>

                  {/* Right: Plate Placard & Story */}
                  <div className="lg:col-span-5 space-y-4">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-terracotta font-semibold">
                        {t('catalogue.plateOf', { current: currentPage - 1, total: artworkItems.length }, `Plate ${currentPage - 1} of ${artworkItems.length}`)}
                      </span>
                      <h3 className="font-serif font-bold text-brown text-2xl sm:text-3xl leading-snug">
                        {currentPlate.title}
                      </h3>
                      <p className="text-xs font-sans text-brown/65 mt-0.5">
                        {currentPlate.artForm} · {currentPlate.type}
                      </p>
                    </div>

                    {/* Specifications Card */}
                    <div className="p-3.5 rounded-xl bg-ivory border border-beige-dark/60 text-xs font-sans space-y-1.5 text-brown/75 shadow-sm">
                      <p>
                        <strong className="text-brown">{t('catalogue.dimensions', 'Dimensions:')}</strong>{' '}
                        {currentPlate.dimensions || '24 × 18 inches'}
                      </p>
                      <p>
                        <strong className="text-brown">{t('artwork.materialsUsed', 'Materials:')}</strong>{' '}
                        {currentPlate.materials || 'Natural mineral pigments on handmade paper'}
                      </p>
                      <p>
                        <strong className="text-brown">{t('artwork.techniques', 'Technique:')}</strong>{' '}
                        {currentPlate.techniques || 'Indigenous traditional linework'}
                      </p>
                    </div>

                    {/* Curatorial Description */}
                    <p className="font-serif text-sm sm:text-base text-brown/85 leading-relaxed">
                      {currentPlate.description}
                    </p>

                    {/* Associated Custom Notes / Story Excerpt */}
                    {currentPlate.customNotes && (
                      <div className="p-3.5 rounded-xl bg-ochre/15 border border-ochre/35 text-xs font-serif italic text-brown/80 leading-relaxed">
                        &ldquo;{currentPlate.customNotes}&rdquo;
                      </div>
                    )}
                  </div>
                </div>
              );
            })()
          )}

          {/* PAGE N+2: COLOPHON */}
          {currentPage === artworkItems.length + 2 && (
            <div className="flex-1 max-w-xl mx-auto flex flex-col justify-center text-center animate-fade-in py-6">
              <LotusLogo size={36} className="mx-auto mb-3" />
              <h3 className="font-serif font-bold text-brown text-3xl mb-2">
                {t('catalogue.colophonTitle', 'Colophon & Verification')}
              </h3>
              <div className="w-12 h-0.5 bg-ochre/50 mx-auto mb-4" />

              <p className="font-sans text-xs sm:text-sm text-brown/70 leading-relaxed mb-6">
                {t('catalogue.colophonDesc', 'This digital art catalogue was created and preserved using KalaSetu AI, empowering traditional Indian artists to document, present, and safeguard their cultural legacy.')}
              </p>

              <div className="p-5 rounded-2xl bg-ivory border border-beige-dark/60 text-xs font-sans text-brown/75 space-y-1.5 mb-6 text-left">
                <p>
                  <strong>{t('artwork.artistLabel', 'Artist')}:</strong> Ivy Maiti
                </p>
                <p>
                  <strong>{t('catalogue.exhibitionLabel', 'Exhibition:')}</strong> {catalogue.exhibitionName || 'Solo Collection Archive'}
                </p>
                <p>
                  <strong>{t('catalogue.totalWorksIncluded', 'Total Works Included:')}</strong> {artworkItems.length} Plates
                </p>
                <p>
                  <strong>{t('catalogue.publicationDate', 'Publication Date:')}</strong> {catalogue.date}
                </p>
                <p>
                  <strong>{t('common.status', 'Status')}:</strong> {catalogue.status}
                </p>
              </div>

              <p className="text-xs font-serif italic text-brown/50">
                &ldquo;Every stroke of colour is a word in the language of the soul.&rdquo;
              </p>
            </div>
          )}

          {/* ── Bottom Page Turn Navigation ── */}
          <div className="mt-6 pt-4 border-t border-beige-dark/50 flex items-center justify-between text-xs font-sans text-brown/65">
            <button
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="px-3.5 py-1.5 rounded-lg bg-ivory border border-beige-dark/60 text-brown disabled:opacity-30 disabled:cursor-not-allowed hover:bg-beige transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <ChevronLeft size={14} />
              <span>{t('catalogue.previousPage', 'Previous Page')}</span>
            </button>

            {/* Quick Page Jump Pills */}
            <div className="hidden sm:flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-6 h-6 rounded-md text-[10px] font-mono transition-colors ${
                    currentPage === i
                      ? 'bg-terracotta text-white font-bold'
                      : 'bg-beige/60 text-brown/60 hover:bg-beige'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage === totalPages - 1}
              className="px-3.5 py-1.5 rounded-lg bg-ivory border border-beige-dark/60 text-brown disabled:opacity-30 disabled:cursor-not-allowed hover:bg-beige transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span>{t('catalogue.nextPage', 'Next Page')}</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
