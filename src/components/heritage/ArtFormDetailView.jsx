import React, { useState } from 'react';
import {
  ChevronLeft,
  MapPin,
  Sparkles,
  BookOpen,
  Feather,
  Palette,
  Layers,
  ArrowRight,
  ShieldCheck,
  Compass,
} from 'lucide-react';
import { heritageArtForms } from '../../data/heritageData';
import { LotusLogo } from '../ui/DecorativeElements';
import { useLanguage } from '../../i18n';

export default function ArtFormDetailView({
  artForm,
  onBack,
  onSelectRelated,
  onContributeForThisCraft,
}) {
  const { t } = useLanguage();
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(0);

  if (!artForm) return null;

  // Find related craft objects
  const relatedCrafts = (artForm.relatedCraftIds || [])
    .map((id) => heritageArtForms.find((item) => item.id === id))
    .filter(Boolean);

  const activePlate =
    artForm.galleryPlates?.[selectedGalleryIndex] || artForm.galleryPlates?.[0];

  return (
    <div className="space-y-10 animate-fade-in mb-14">
      {/* ── Top Navigation Bar ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-beige-dark/50">
        <button
          onClick={onBack}
          className="px-3.5 py-1.5 rounded-xl bg-ivory hover:bg-beige border border-beige-dark/60 text-xs font-sans font-medium text-brown transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <ChevronLeft size={15} />
          <span>{t('heritage.backToAll', 'Back to All Art Forms')}</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-sans text-brown/50">
            {t('heritage.title', 'Heritage Archive')} ·
          </span>
          <span className="text-xs font-sans font-semibold text-terracotta">
            {artForm.category}
          </span>
        </div>
      </div>

      {/* ── 1. HERO HEADER ── */}
      <div className="relative rounded-3xl overflow-hidden bg-ivory border-2 border-beige-dark/70 shadow-md p-6 sm:p-10">
        {/* Ochre background aura */}
        <div
          className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full pointer-events-none opacity-25"
          style={{
            background:
              'radial-gradient(circle, #D5B77A 0%, rgba(247, 243, 234, 0) 70%)',
          }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row items-start gap-8">
          {/* Framed Hero Artwork */}
          <div className="w-full lg:w-96 flex-shrink-0">
            <div
              className="rounded-2xl p-3.5 shadow-xl border"
              style={{
                backgroundColor: '#2F1E15',
                borderColor: '#C4A163',
              }}
            >
              <div
                className="p-2.5 rounded-sm border"
                style={{
                  backgroundColor: '#F8F5EE',
                  borderColor: '#D5B77A',
                }}
              >
                <div className="aspect-[16/11] w-full rounded overflow-hidden bg-brown/10">
                  <img
                    src={artForm.imageUrl}
                    alt={artForm.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="text-center text-[11px] font-sans text-brown/50 mt-2">
              {t('heritage.representativeMasterwork', { name: artForm.name }, `Representative Masterwork of ${artForm.name}`)}
            </div>
          </div>

          {/* Title & Introduction */}
          <div className="flex-1">
            {/* Region Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest/10 border border-forest/25 text-forest text-xs font-sans font-medium mb-3">
              <MapPin size={13} className="text-terracotta" />
              <span>{artForm.region}</span>
            </div>

            <h1 className="font-serif font-bold text-brown text-3xl sm:text-4xl md:text-5xl leading-tight mb-4">
              {artForm.name}
            </h1>

            {/* About this art form */}
            <div className="mb-6">
              <h2 className="text-xs font-sans font-semibold uppercase tracking-wider text-brown/60 mb-2">
                {t('heritage.aboutTradition', 'About this tradition')}
              </h2>
              <p className="font-serif text-brown/90 text-base sm:text-lg leading-relaxed">
                {artForm.shortIntro}
              </p>
            </div>

            {/* Quick Specs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="px-3 py-1 rounded-lg bg-beige/60 border border-beige-dark/60 text-xs font-sans text-brown">
                <strong>{t('heritage.primaryMedium', 'Primary Medium:')}</strong> {artForm.category}
              </span>
              <span className="px-3 py-1 rounded-lg bg-beige/60 border border-beige-dark/60 text-xs font-sans text-brown">
                <strong>{t('heritage.documentation', 'Documentation:')}</strong> {t('heritage.livingTradition', 'Living Folk Tradition')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Demonstration Notice Bar ── */}
      <div className="px-4 py-2.5 rounded-xl bg-ochre/15 border border-ochre/30 flex items-center justify-between text-xs font-sans text-brown/75">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-terracotta flex-shrink-0" />
          <span>
            {t('heritage.grid.curatedNotice', 'Demonstration entries. Cultural references and community knowledge ready for verified RAG integration.')}
          </span>
        </div>
        <span className="text-[11px] font-sans text-brown/50 hidden sm:inline">
          {t('heritage.title', 'Heritage Archive')}
        </span>
      </div>

      {/* ── 2. WHERE IT COMES FROM & ITS STORY ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Where it comes from */}
        <div className="bg-ivory rounded-3xl border border-beige-dark/70 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2.5 mb-4 pb-2 border-b border-beige-dark/50">
            <Compass size={20} className="text-terracotta" />
            <h3 className="font-serif font-bold text-brown text-xl">
              {t('heritage.whereFrom', 'Where It Comes From')}
            </h3>
          </div>
          <p className="font-serif text-brown/85 text-sm sm:text-base leading-relaxed text-justify">
            {artForm.originStory}
          </p>
        </div>

        {/* Its story and significance */}
        <div className="bg-ivory rounded-3xl border border-beige-dark/70 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2.5 mb-4 pb-2 border-b border-beige-dark/50">
            <BookOpen size={20} className="text-forest" />
            <h3 className="font-serif font-bold text-brown text-xl">
              {t('heritage.storySignificance', 'Its Story & Significance')}
            </h3>
          </div>
          <p className="font-serif text-brown/85 text-sm sm:text-base leading-relaxed text-justify">
            {artForm.culturalSignificance}
          </p>
        </div>
      </div>

      {/* ── 3. MATERIALS AND TECHNIQUES ── */}
      <div className="bg-ivory rounded-3xl border border-beige-dark/70 p-6 sm:p-10 shadow-sm">
        <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-beige-dark/50">
          <Palette size={22} className="text-terracotta" />
          <div>
            <h3 className="font-serif font-bold text-brown text-2xl">
              {t('heritage.materialsAndTechniques', 'Traditional Materials & Techniques')}
            </h3>
            <p className="text-xs font-sans text-brown/60">
              {t('heritage.materialsAndTechniques', 'Traditional Materials & Techniques')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Surfaces */}
          <div className="p-4 rounded-2xl bg-beige/40 border border-beige-dark/50">
            <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-terracotta">
              {t('heritage.surfacesAndBase', 'Surfaces & Base')}
            </span>
            <p className="font-sans text-xs text-brown/80 mt-1.5 leading-relaxed">
              {artForm.materialsAndTechniques.surfaces}
            </p>
          </div>

          {/* Colors & Pigments */}
          <div className="p-4 rounded-2xl bg-beige/40 border border-beige-dark/50">
            <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-forest">
              {t('heritage.naturalPigments', 'Natural Pigments')}
            </span>
            <p className="font-sans text-xs text-brown/80 mt-1.5 leading-relaxed">
              {artForm.materialsAndTechniques.colors}
            </p>
          </div>

          {/* Tools */}
          <div className="p-4 rounded-2xl bg-beige/40 border border-beige-dark/50">
            <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-ochre-dark">
              {t('heritage.handTools', 'Hand Tools')}
            </span>
            <p className="font-sans text-xs text-brown/80 mt-1.5 leading-relaxed">
              {artForm.materialsAndTechniques.tools}
            </p>
          </div>

          {/* Methods */}
          <div className="p-4 rounded-2xl bg-beige/40 border border-beige-dark/50">
            <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-brown">
              {t('heritage.traditionalMethods', 'Traditional Methods')}
            </span>
            <p className="font-sans text-xs text-brown/80 mt-1.5 leading-relaxed">
              {artForm.materialsAndTechniques.methods}
            </p>
          </div>
        </div>
      </div>

      {/* ── 4. VISUAL GALLERY ── */}
      {artForm.galleryPlates && artForm.galleryPlates.length > 0 && (
        <div className="bg-ivory rounded-3xl border border-beige-dark/70 p-6 sm:p-10 shadow-sm">
          <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-beige-dark/50">
            <Layers size={22} className="text-terracotta" />
            <div>
              <h3 className="font-serif font-bold text-brown text-2xl">
                {t('heritage.visualGallery', 'Visual Gallery')}
              </h3>
              <p className="text-xs font-sans text-brown/60">
                {t('heritage.visualGalleryDesc', 'Representative examples documenting this folk tradition')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Active Plate */}
            <div className="lg:col-span-8 flex flex-col items-center">
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
                      src={activePlate.imageUrl}
                      alt={activePlate.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-3 text-center">
                <h4 className="font-serif font-bold text-brown text-base">
                  {activePlate.title}
                </h4>
                <p className="text-xs font-sans text-brown/65 mt-0.5">
                  {activePlate.caption}
                </p>
              </div>
            </div>

            {/* Right: Plate Selection Thumbnails */}
            <div className="lg:col-span-4 space-y-3">
              <span className="text-xs font-sans font-semibold text-brown uppercase tracking-wider block mb-2">
                {t('heritage.exhibitionPlates', 'Exhibition Plates')}
              </span>
              {artForm.galleryPlates.map((plate, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedGalleryIndex(idx)}
                  className={`w-full p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                    selectedGalleryIndex === idx
                      ? 'border-terracotta bg-terracotta/10 ring-1 ring-terracotta/30'
                      : 'border-beige-dark/60 bg-beige/40 hover:bg-beige'
                  }`}
                >
                  <img
                    src={plate.imageUrl}
                    alt={plate.title}
                    className="w-14 h-12 object-cover rounded-lg border border-beige-dark flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="font-serif font-bold text-brown text-xs truncate">
                      {plate.title}
                    </div>
                    <div className="text-[11px] font-sans text-brown/50 truncate">
                      {plate.caption}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── 5. RELATED CRAFTS ── */}
      {relatedCrafts.length > 0 && (
        <div className="bg-ivory rounded-3xl border border-beige-dark/70 p-6 sm:p-10 shadow-sm">
          <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-beige-dark/50">
            <Compass size={22} className="text-terracotta" />
            <div>
              <h3 className="font-serif font-bold text-brown text-2xl">
                {t('heritage.relatedTraditions', 'Related Traditions & Crafts')}
              </h3>
              <p className="text-xs font-sans text-brown/60">
                {t('heritage.relatedTraditionsDesc', 'Explore parallel Indian heritage practices with shared folk roots')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedCrafts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectRelated(rel)}
                className="group p-4 rounded-2xl bg-beige/30 border border-beige-dark/60 hover:border-ochre hover:shadow-md cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] w-full rounded-xl overflow-hidden bg-brown/10 mb-3">
                    <img
                      src={rel.imageUrl}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="text-[11px] font-sans text-terracotta font-medium mb-1">
                    {rel.region}
                  </div>
                  <h4 className="font-serif font-bold text-brown text-base mb-1 group-hover:text-terracotta transition-colors">
                    {rel.name}
                  </h4>
                  <p className="text-xs font-sans text-brown/65 line-clamp-2 leading-relaxed">
                    {rel.shortIntro}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-beige-dark/40 flex items-center justify-between text-xs font-sans text-terracotta font-medium">
                  <span>{t('heritage.exploreArtForm', 'Explore Tradition')}</span>
                  <ArrowRight
                    size={13}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 6. CONTRIBUTOR CALLOUT CARD ── */}
      <div className="p-6 sm:p-8 rounded-3xl bg-ochre/15 border border-ochre/35 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-serif font-bold text-brown text-lg">
            {t('heritage.doYouPractise', { name: artForm.name }, `Do you practise ${artForm.name}?`)}
          </h4>
          <p className="font-sans text-xs text-brown/75 mt-1 max-w-xl leading-relaxed">
            {t('heritage.contributeCallout')}
          </p>
        </div>

        <button
          onClick={() => onContributeForThisCraft(artForm.name)}
          className="btn-primary text-xs py-2.5 px-5 flex items-center gap-1.5 flex-shrink-0"
        >
          <Feather size={14} />
          <span>{t('heritage.contributeMyKnowledge', 'Contribute My Knowledge')}</span>
        </button>
      </div>
    </div>
  );
}
