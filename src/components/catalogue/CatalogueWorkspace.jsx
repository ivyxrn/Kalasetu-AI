import React, { useState, useMemo } from 'react';
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Search,
  CheckCircle2,
  BookOpen,
  Landmark,
  LayoutTemplate,
  Layers,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Info,
  Calendar,
  X,
  Eye,
  Save,
  Feather,
  Wand2,
} from 'lucide-react';
import { catalogueLayouts, coverStyles } from '../../data/catalogueData';
import { artFormOptions } from '../../data/artworkData';
import { LotusLogo, WarliDivider } from '../ui/DecorativeElements';
import { useLanguage } from '../../i18n';

export default function CatalogueWorkspace({
  availableArtworks,
  savedStories = [],
  editingCatalogue,
  onSaveCatalogue,
  onCancel,
}) {
  const { t } = useLanguage();
  // Current active step (1 to 5)
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [title, setTitle] = useState(
    editingCatalogue?.title || 'Heritage Masterpieces: Traditional Indian Creations'
  );
  const [subtitle, setSubtitle] = useState(
    editingCatalogue?.subtitle || 'A Curated Solo Collection by Ivy Maiti'
  );
  const [exhibitionName, setExhibitionName] = useState(
    editingCatalogue?.exhibitionName || 'KalaSetu Heritage Retrospective 2026'
  );
  const [introduction, setIntroduction] = useState(
    editingCatalogue?.introduction ||
      'This curated digital catalogue gathers authentic traditional Indian creations, capturing the timeless folklore, sacred geometry, and indigenous craft techniques handed down across generations of artisan guilds.'
  );
  const [coverImage, setCoverImage] = useState(
    editingCatalogue?.coverImage || availableArtworks[0]?.imageUrl || '/artworks/madhubani_harmony.jpg'
  );
  const [coverStyle, setCoverStyle] = useState(
    editingCatalogue?.coverStyle || 'framed'
  );
  const [layout, setLayout] = useState(
    editingCatalogue?.layout || 'heritage'
  );

  // Selected Artworks State (array of customized artwork items)
  const [selectedArtworkIds, setSelectedArtworkIds] = useState(() => {
    if (editingCatalogue?.artworkItems && editingCatalogue.artworkItems.length > 0) {
      return editingCatalogue.artworkItems.map((a) => a.id);
    }
    // Default to first 3 artworks if creating new
    return availableArtworks.slice(0, 3).map((a) => a.id);
  });

  // Customized artwork items (dimensions, custom notes, description)
  const [artworkItemsData, setArtworkItemsData] = useState(() => {
    if (editingCatalogue?.artworkItems && editingCatalogue.artworkItems.length > 0) {
      return editingCatalogue.artworkItems;
    }
    // Initialize defaults from available artworks
    return availableArtworks.slice(0, 3).map((art, idx) => ({
      ...art,
      dimensions: idx === 0 ? '24 × 18 inches' : idx === 1 ? '30 × 20 inches' : '28 × 22 inches',
      customNotes: art.interpretation || 'Authentic regional folk masterwork.',
      storyExcerpt: art.description ? art.description.slice(0, 180) + '...' : '',
    }));
  });

  // Search & Filter in Step 2
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArtForm, setSelectedArtForm] = useState('All');

  // Preview Page index in Step 5 (0: Cover, 1: Intro, 2..N+1: Plates, N+2: Colophon)
  const [previewPageIndex, setPreviewPageIndex] = useState(0);

  // Validation Error
  const [stepError, setStepError] = useState('');

  // ── Step 2 Filtering Logic ──
  const filteredAvailableArtworks = useMemo(() => {
    return availableArtworks.filter((art) => {
      if (selectedArtForm !== 'All' && art.artForm !== selectedArtForm) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = art.title.toLowerCase().includes(q);
        const matchForm = art.artForm.toLowerCase().includes(q);
        if (!matchTitle && !matchForm) return false;
      }
      return true;
    });
  }, [availableArtworks, searchQuery, selectedArtForm]);

  // Toggle artwork selection
  const handleToggleArtwork = (art) => {
    const isSelected = selectedArtworkIds.includes(art.id);
    if (isSelected) {
      setSelectedArtworkIds((prev) => prev.filter((id) => id !== art.id));
      setArtworkItemsData((prev) => prev.filter((item) => item.id !== art.id));
    } else {
      setSelectedArtworkIds((prev) => [...prev, art.id]);
      // Find matching saved story if available
      const matchingStory = savedStories.find((s) => s.artworkId === art.id);
      const newCustomItem = {
        ...art,
        dimensions: '24 × 18 inches',
        customNotes: art.interpretation || 'Original traditional folk composition.',
        storyExcerpt: matchingStory
          ? matchingStory.paragraphs[0]
          : art.description || '',
      };
      setArtworkItemsData((prev) => [...prev, newCustomItem]);
      // If cover image not set or matches default, set to this artwork
      if (!coverImage) {
        setCoverImage(art.imageUrl);
      }
    }
  };

  // Update item in Step 3
  const handleUpdateItemDetail = (id, field, value) => {
    setArtworkItemsData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  // Reordering in Step 4
  const handleMoveItem = (index, direction) => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= artworkItemsData.length) return;
    const updated = [...artworkItemsData];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setArtworkItemsData(updated);
    setSelectedArtworkIds(updated.map((u) => u.id));
  };

  // Navigation handlers with validation
  const goToNextStep = () => {
    setStepError('');
    if (currentStep === 1) {
      if (!title.trim()) {
        setStepError('Please provide a catalogue title to continue.');
        return;
      }
      if (!introduction.trim()) {
        setStepError('Please write a short introduction or curatorial statement.');
        return;
      }
    } else if (currentStep === 2) {
      if (selectedArtworkIds.length === 0) {
        setStepError('Please select at least one artwork to include in your catalogue.');
        return;
      }
    }
    setCurrentStep((prev) => Math.min(5, prev + 1));
  };

  const goToPrevStep = () => {
    setStepError('');
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  // Save Catalogue Action
  const handleSave = (publishStatus = 'Published') => {
    if (!title.trim() || artworkItemsData.length === 0) {
      setStepError('Catalogue must have a title and at least one artwork.');
      return;
    }

    const catalogueToSave = {
      id: editingCatalogue?.id || `cat-${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim(),
      exhibitionName: exhibitionName.trim(),
      introduction: introduction.trim(),
      coverImage: coverImage || artworkItemsData[0]?.imageUrl || '/artworks/madhubani_harmony.jpg',
      coverStyle,
      layout,
      status: publishStatus,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      rawDate: new Date().toISOString(),
      artistName: 'Ivy Maiti',
      artworkItems: artworkItemsData,
    };

    onSaveCatalogue(catalogueToSave);
  };

  // Step names
  const steps = [
    { num: 1, title: t('catalogue.steps.step1', 'Basic Information') },
    { num: 2, title: t('catalogue.steps.step2', 'Select Artwork') },
    { num: 3, title: t('catalogue.steps.step3', 'Artwork Details') },
    { num: 4, title: t('catalogue.steps.step4', 'Design & Layout') },
    { num: 5, title: t('catalogue.steps.step5', 'Publication Preview') },
  ];

  return (
    <div className="bg-ivory border border-beige-dark/70 rounded-2xl shadow-xl overflow-hidden mb-12 animate-fade-in">
      {/* ── Top Workspace Header & Cancel ── */}
      <div className="px-6 py-4 bg-beige/40 border-b border-beige-dark/50 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <LotusLogo size={22} />
          <div>
            <h2 className="font-serif font-bold text-brown text-base sm:text-lg">
              {editingCatalogue ? t('catalogue.editVolume', 'Edit Catalogue Volume') : t('catalogue.curateNew', 'Curate New Catalogue')}
            </h2>
            <p className="text-[11px] font-sans text-brown/60">
              {t('catalogue.stepIndicator', { step: currentStep, title: steps[currentStep - 1].title }, `Step ${currentStep} of 5: ${steps[currentStep - 1].title}`)}
            </p>
          </div>
        </div>

        <button
          onClick={onCancel}
          className="px-3 py-1.5 rounded-lg hover:bg-beige text-xs font-sans text-brown/70 hover:text-brown border border-beige-dark/50 transition-colors flex items-center gap-1.5"
        >
          <X size={14} />
          <span>{t('catalogue.exitWorkspace', 'Exit Workspace')}</span>
        </button>
      </div>

      {/* ── Progress Step Indicator ── */}
      <div className="px-6 py-3.5 bg-ivory border-b border-beige-dark/40 overflow-x-auto scrollbar-none">
        <div className="flex items-center justify-between min-w-[580px] max-w-4xl mx-auto">
          {steps.map((st, idx) => {
            const isCompleted = currentStep > st.num;
            const isCurrent = currentStep === st.num;

            return (
              <React.Fragment key={st.num}>
                <button
                  onClick={() => {
                    // Allow navigating to visited steps
                    if (st.num < currentStep) setCurrentStep(st.num);
                  }}
                  disabled={st.num > currentStep}
                  className={`flex items-center gap-2 text-xs font-sans transition-all ${
                    isCurrent
                      ? 'text-terracotta font-semibold'
                      : isCompleted
                      ? 'text-forest font-medium hover:text-forest-dark'
                      : 'text-brown/40 cursor-not-allowed'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-sans transition-all ${
                      isCurrent
                        ? 'bg-terracotta text-white shadow-sm ring-2 ring-terracotta/20'
                        : isCompleted
                        ? 'bg-forest text-white'
                        : 'bg-beige border border-beige-dark/70 text-brown/50'
                    }`}
                  >
                    {isCompleted ? <Check size={12} strokeWidth={2.5} /> : st.num}
                  </span>
                  <span className="hidden sm:inline">{st.title}</span>
                </button>

                {idx < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 transition-colors ${
                      currentStep > st.num ? 'bg-forest/50' : 'bg-beige-dark/50'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ── Validation Error Bar ── */}
      {stepError && (
        <div className="mx-6 mt-4 p-3 rounded-xl bg-terracotta/10 border border-terracotta/30 flex items-center gap-2 text-xs font-sans text-terracotta animate-fade-in">
          <Info size={14} className="flex-shrink-0" />
          <span>{stepError}</span>
        </div>
      )}

      {/* ── Step Content Panes ── */}
      <div className="p-6 sm:p-8">
        {/* ─────────────────────────────────────────────────────────────
            STEP 1: Basic Information
           ───────────────────────────────────────────────────────────── */}
        {currentStep === 1 && (
          <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
            <div>
              <h3 className="font-serif font-bold text-brown text-xl mb-1">
                {t('catalogue.step1Title', 'Step 1 — Basic Information')}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-brown/65">
                {t('catalogue.step1Subtitle', 'Establish the title, theme, and curatorial vision for your digital publication.')}
              </p>
            </div>

            {/* Catalogue Title */}
            <div>
              <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider mb-1.5">
                {t('catalogue.catalogueTitle', 'Catalogue Title')} <span className="text-terracotta">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Sacred Traditions: Folk Paintings of Mithila & Sahyadri"
                className="w-full px-4 py-2.5 bg-beige-light border border-beige-dark/70 rounded-xl text-sm font-serif font-bold text-brown placeholder-brown/40 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta/20"
              />
            </div>

            {/* Subtitle & Exhibition */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-sans font-medium text-brown mb-1">
                  {t('catalogue.catalogueSubtitle', 'Catalogue Subtitle (Optional)')}
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. A Curated Retrospective by Ivy Maiti"
                  className="w-full px-3.5 py-2 bg-beige-light border border-beige-dark/60 rounded-xl text-xs font-sans text-brown placeholder-brown/40 focus:outline-none focus:border-terracotta"
                />
              </div>

              <div>
                <label className="block text-xs font-sans font-medium text-brown mb-1">
                  {t('catalogue.exhibitionName', 'Exhibition or Collection Name (Optional)')}
                </label>
                <input
                  type="text"
                  value={exhibitionName}
                  onChange={(e) => setExhibitionName(e.target.value)}
                  placeholder="e.g. KalaSetu Heritage Exhibition 2026"
                  className="w-full px-3.5 py-2 bg-beige-light border border-beige-dark/60 rounded-xl text-xs font-sans text-brown placeholder-brown/40 focus:outline-none focus:border-terracotta"
                />
              </div>
            </div>

            {/* Introduction / Statement */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider">
                  {t('catalogue.curatorialStatementLabel', 'Curatorial Statement / Introduction')} <span className="text-terracotta">*</span>
                </label>
                <span className="text-[11px] font-sans text-brown/50">
                  {t('catalogue.wordsCount', { count: introduction.split(/\s+/).filter(Boolean).length }, `${introduction.split(/\s+/).filter(Boolean).length} words`)}
                </span>
              </div>
              <textarea
                rows={4}
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
                placeholder="Share the overarching story, artistic motivations, and cultural context of this catalogue..."
                className="w-full p-3.5 bg-beige-light border border-beige-dark/70 rounded-xl text-sm font-sans text-brown placeholder-brown/40 focus:outline-none focus:border-terracotta leading-relaxed"
              />
            </div>

            {/* Cover Image Selector */}
            <div>
              <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider mb-2">
                {t('catalogue.selectCover', 'Select Publication Cover Artwork')}
              </label>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-beige/50 border border-beige-dark/50">
                <div className="w-24 h-18 rounded-lg overflow-hidden border border-ochre/40 bg-brown/10 flex-shrink-0">
                  <img
                    src={coverImage}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-sans font-medium text-brown mb-2">
                    {t('catalogue.pickHero', 'Pick a hero image from your collection to grace the cover:')}
                  </div>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {availableArtworks.slice(0, 6).map((art) => (
                      <button
                        key={art.id}
                        type="button"
                        onClick={() => setCoverImage(art.imageUrl)}
                        className={`w-12 h-10 rounded-md overflow-hidden border-2 flex-shrink-0 transition-all ${
                          coverImage === art.imageUrl
                            ? 'border-terracotta scale-105 ring-1 ring-terracotta/40'
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                        title={art.title}
                      >
                        <img
                          src={art.imageUrl}
                          alt={art.title}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            STEP 2: Select Artwork
           ───────────────────────────────────────────────────────────── */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-beige-dark/50">
              <div>
                <h3 className="font-serif font-bold text-brown text-xl mb-1">
                  {t('catalogue.step2Title', 'Step 2 — Select Artwork')}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-brown/65">
                  {t('catalogue.step2Subtitle', 'Choose which creations from your collection to include in this publication.')}
                </p>
              </div>

              {/* Selected Count Indicator */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-terracotta/10 border border-terracotta/25 text-terracotta text-xs font-sans font-medium">
                <Layers size={14} />
                <span>
                  {t('catalogue.artworksSelected', { count: selectedArtworkIds.length }, `${selectedArtworkIds.length} Artworks Selected`)}
                </span>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-brown/40"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('catalogue.searchPlaceholder', 'Search by title or art form...')}
                  className="w-full pl-9 pr-3 py-1.5 bg-beige-light border border-beige-dark/60 rounded-xl text-xs font-sans text-brown placeholder-brown/40 focus:outline-none focus:border-terracotta/40"
                />
              </div>

              {/* Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {artFormOptions.map((form) => (
                  <button
                    key={form}
                    type="button"
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

            {/* Artworks Selection Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 max-h-[460px] overflow-y-auto pr-1">
              {filteredAvailableArtworks.map((art) => {
                const isSelected = selectedArtworkIds.includes(art.id);

                return (
                  <div
                    key={art.id}
                    onClick={() => handleToggleArtwork(art)}
                    className={`group text-left relative rounded-xl overflow-hidden border-2 transition-all p-2 bg-beige-light flex flex-col cursor-pointer select-none ${
                      isSelected
                        ? 'border-terracotta ring-2 ring-terracotta/30 shadow-md bg-ivory scale-[1.02]'
                        : 'border-beige-dark/60 hover:border-ochre hover:shadow-sm'
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-brown/5 mb-2">
                      <img
                        src={art.imageUrl}
                        alt={art.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />

                      {/* Checkbox overlay badge */}
                      <div
                        className={`absolute top-2 right-2 w-6 h-6 rounded-md flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-terracotta text-white shadow-md'
                            : 'bg-ivory/80 text-transparent border border-brown/30'
                        }`}
                      >
                        <Check size={14} strokeWidth={2.5} />
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="flex-1 flex flex-col justify-between">
                      <h4
                        className={`font-serif font-bold text-xs truncate transition-colors ${
                          isSelected ? 'text-terracotta' : 'text-brown'
                        }`}
                        title={art.title}
                      >
                        {art.title}
                      </h4>
                      <div className="flex items-center justify-between mt-1 text-[10px] font-sans text-brown/60">
                        <span>{art.artForm}</span>
                        <span className="font-mono text-terracotta font-semibold">
                          {isSelected ? t('catalogue.included', 'Included') : t('catalogue.add', '+ Add')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            STEP 3: Artwork Information
           ───────────────────────────────────────────────────────────── */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
            <div>
              <h3 className="font-serif font-bold text-brown text-xl mb-1">
                {t('catalogue.step3Title', 'Step 3 — Artwork Information & Curatorial Details')}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-brown/65">
                {t('catalogue.step3Subtitle', 'Refine catalogue-specific dimensions, notes, and narrative excerpts without altering the original artwork data.')}
              </p>
            </div>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
              {artworkItemsData.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-beige/40 border border-beige-dark/60 space-y-4"
                >
                  {/* Item Header */}
                  <div className="flex items-start gap-4 pb-3 border-b border-beige-dark/40">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-brown/10 border border-beige-dark/70 flex-shrink-0">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-terracotta/10 text-terracotta">
                          {t('catalogue.plateLabel', { num: idx + 1 }, `Plate ${idx + 1}`)}
                        </span>
                        <span className="text-xs font-sans text-brown/60">
                          {item.artForm} · {item.type}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-brown text-base truncate">
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  {/* Editable Fields Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-sans font-medium text-brown mb-1">
                        {t('catalogue.dimensionsLabel', 'Dimensions')}
                      </label>
                      <input
                        type="text"
                        value={item.dimensions || ''}
                        onChange={(e) =>
                          handleUpdateItemDetail(item.id, 'dimensions', e.target.value)
                        }
                        placeholder="e.g. 24 × 18 inches"
                        className="w-full px-3 py-1.5 bg-ivory border border-beige-dark/60 rounded-lg text-xs font-sans text-brown focus:outline-none focus:border-terracotta"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-sans font-medium text-brown mb-1">
                        {t('artwork.materialsUsed', 'Materials')}
                      </label>
                      <input
                        type="text"
                        value={item.materials || ''}
                        onChange={(e) =>
                          handleUpdateItemDetail(item.id, 'materials', e.target.value)
                        }
                        placeholder="e.g. Natural mineral dyes on handmade paper"
                        className="w-full px-3 py-1.5 bg-ivory border border-beige-dark/60 rounded-lg text-xs font-sans text-brown focus:outline-none focus:border-terracotta"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-sans font-medium text-brown mb-1">
                        {t('artwork.techniques', 'Techniques')}
                      </label>
                      <input
                        type="text"
                        value={item.techniques || ''}
                        onChange={(e) =>
                          handleUpdateItemDetail(item.id, 'techniques', e.target.value)
                        }
                        placeholder="e.g. Bamboo pen linework, kachni hatching"
                        className="w-full px-3 py-1.5 bg-ivory border border-beige-dark/60 rounded-lg text-xs font-sans text-brown focus:outline-none focus:border-terracotta"
                      />
                    </div>
                  </div>

                  {/* Description & Custom Notes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-sans font-medium text-brown mb-1">
                        {t('catalogue.catalogueDescLabel', 'Catalogue Description')}
                      </label>
                      <textarea
                        rows={2}
                        value={item.description || ''}
                        onChange={(e) =>
                          handleUpdateItemDetail(item.id, 'description', e.target.value)
                        }
                        className="w-full p-2.5 bg-ivory border border-beige-dark/60 rounded-lg text-xs font-sans text-brown focus:outline-none focus:border-terracotta leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-sans font-medium text-brown mb-1">
                        {t('catalogue.customNotesLabel', 'Associated Story Excerpt / Custom Curatorial Note')}
                      </label>
                      <textarea
                        rows={2}
                        value={item.customNotes || ''}
                        onChange={(e) =>
                          handleUpdateItemDetail(item.id, 'customNotes', e.target.value)
                        }
                        placeholder="e.g. In Mithila folklore, fish represent cosmic fertility and the unbroken stream of life..."
                        className="w-full p-2.5 bg-ivory border border-beige-dark/60 rounded-lg text-xs font-serif italic text-brown/85 focus:outline-none focus:border-terracotta leading-relaxed"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            STEP 4: Catalogue Design & Layout
           ───────────────────────────────────────────────────────────── */}
        {currentStep === 4 && (
          <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
            <div>
              <h3 className="font-serif font-bold text-brown text-xl mb-1">
                {t('catalogue.step4Title', 'Step 4 — Catalogue Design & Publication Layout')}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-brown/65">
                {t('catalogue.step4Subtitle', 'Select your editorial style, cover presentation, and curate the sequential ordering of your artwork plates.')}
              </p>
            </div>

            {/* 1. Layout Selection */}
            <div>
              <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider mb-3">
                {t('catalogue.chooseLayout', '1. Choose Publication Layout')}
              </label>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {catalogueLayouts.map((ly) => {
                  const isSelected = layout === ly.id;

                  return (
                    <button
                      key={ly.id}
                      type="button"
                      onClick={() => setLayout(ly.id)}
                      className={`p-5 rounded-2xl border-2 text-left transition-all flex flex-col justify-between relative ${
                        isSelected
                          ? 'border-terracotta bg-beige/60 ring-2 ring-terracotta/20 shadow-md scale-[1.01]'
                          : 'border-beige-dark/60 bg-beige-light hover:border-ochre'
                      }`}
                    >
                      {/* Visual Layout Mockup Box */}
                      <div className="w-full h-28 rounded-xl bg-ivory border border-beige-dark/60 p-3 mb-3 flex flex-col justify-between shadow-inner">
                        {ly.id === 'classic' && (
                          <div className="h-full flex flex-col justify-between">
                            <div className="w-2/3 h-2 bg-brown/40 rounded" />
                            <div className="flex gap-2 h-16">
                              <div className="w-1/2 h-full bg-brown/15 rounded flex items-center justify-center text-[9px] font-serif text-brown/50">
                                Image
                              </div>
                              <div className="w-1/2 space-y-1">
                                <div className="w-full h-1 bg-brown/25 rounded" />
                                <div className="w-4/5 h-1 bg-brown/20 rounded" />
                                <div className="w-full h-1 bg-brown/20 rounded" />
                              </div>
                            </div>
                          </div>
                        )}
                        {ly.id === 'heritage' && (
                          <div className="h-full flex flex-col justify-between border-2 border-ochre/40 p-1.5 rounded">
                            <div className="text-center font-serif text-[10px] text-terracotta font-bold">
                              HERITAGE
                            </div>
                            <div className="w-full h-10 bg-terracotta/10 rounded flex items-center justify-center text-[9px] font-sans text-terracotta">
                              Artisan Plate
                            </div>
                            <div className="w-full h-0.5 bg-ochre/40" />
                          </div>
                        )}
                        {ly.id === 'minimal' && (
                          <div className="h-full flex flex-col items-center justify-center p-2">
                            <div className="w-20 h-16 bg-brown/10 rounded mb-1 flex items-center justify-center text-[9px] font-sans text-brown/40">
                              Artwork
                            </div>
                            <div className="w-12 h-1 bg-brown/30 rounded" />
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h4
                            className={`font-serif font-bold text-base ${
                              isSelected ? 'text-terracotta' : 'text-brown'
                            }`}
                          >
                            {ly.title}
                          </h4>
                          {isSelected && (
                            <span className="w-5 h-5 rounded-full bg-terracotta text-white flex items-center justify-center shadow-sm">
                              <Check size={12} strokeWidth={2.5} />
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-sans text-brown/70 leading-relaxed">
                          {ly.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Cover Style Selection */}
            <div>
              <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider mb-3">
                {t('catalogue.chooseCoverStyle', '2. Choose Cover Presentation Style')}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {coverStyles.map((cs) => {
                  const isSelected = coverStyle === cs.id;

                  return (
                    <button
                      key={cs.id}
                      type="button"
                      onClick={() => setCoverStyle(cs.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-terracotta bg-terracotta/10 text-terracotta font-medium ring-1 ring-terracotta/30'
                          : 'border-beige-dark/60 bg-beige-light hover:border-beige-dark text-brown'
                      }`}
                    >
                      <div className="text-xs font-sans font-semibold mb-0.5">
                        {cs.name}
                      </div>
                      <div className="text-[11px] font-sans opacity-70 leading-relaxed">
                        {cs.description}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Artwork Reordering */}
            <div>
              <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider mb-2">
                {t('catalogue.curateSequence', '3. Curate Artwork Plate Sequence')}
              </label>
              <p className="text-xs font-sans text-brown/60 mb-3">
                {t('catalogue.sequenceHelp', 'Use the arrows to organize the order in which artworks will appear in the publication.')}
              </p>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {artworkItemsData.map((item, idx) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-beige/40 border border-beige-dark/60"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-md bg-beige border border-beige-dark/70 text-xs font-mono font-bold text-brown flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-10 h-10 object-cover rounded-md border border-beige-dark"
                      />
                      <div>
                        <div className="font-serif font-bold text-brown text-xs sm:text-sm">
                          {item.title}
                        </div>
                        <div className="text-[11px] font-sans text-brown/60">
                          {item.artForm} ({item.dimensions || 'Standard'})
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleMoveItem(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1 rounded-lg hover:bg-beige text-brown/60 hover:text-brown disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="Move Up"
                      >
                        <ArrowUp size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveItem(idx, 'down')}
                        disabled={idx === artworkItemsData.length - 1}
                        className="p-1 rounded-lg hover:bg-beige text-brown/60 hover:text-brown disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="Move Down"
                      >
                        <ArrowDown size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            STEP 5: Realistic Multi-Page Publication Preview
           ───────────────────────────────────────────────────────────── */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-beige-dark/50">
              <div>
                <h3 className="font-serif font-bold text-brown text-xl">
                  {t('catalogue.step5Title', 'Step 5 — Publication Reader & Final Review')}
                </h3>
                <p className="font-sans text-xs text-brown/65">
                  {t('catalogue.step5Subtitle', 'Flip through the generated digital catalogue before saving or publishing.')}
                </p>
              </div>

              {/* Page navigation pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                <button
                  type="button"
                  onClick={() => setPreviewPageIndex(0)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-sans transition-colors ${
                    previewPageIndex === 0
                      ? 'bg-terracotta text-white font-medium shadow-sm'
                      : 'bg-beige text-brown/70 hover:text-brown'
                  }`}
                >
                  {t('catalogue.cover', 'Cover')}
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewPageIndex(1)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-sans transition-colors ${
                    previewPageIndex === 1
                      ? 'bg-terracotta text-white font-medium shadow-sm'
                      : 'bg-beige text-brown/70 hover:text-brown'
                  }`}
                >
                  {t('catalogue.intro', 'Intro')}
                </button>
                {artworkItemsData.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setPreviewPageIndex(i + 2)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-sans transition-colors ${
                      previewPageIndex === i + 2
                        ? 'bg-terracotta text-white font-medium shadow-sm'
                        : 'bg-beige text-brown/70 hover:text-brown'
                    }`}
                  >
                    {t('catalogue.plateNum', { num: i + 1 }, `Plate ${i + 1}`)}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setPreviewPageIndex(artworkItemsData.length + 2)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-sans transition-colors ${
                    previewPageIndex === artworkItemsData.length + 2
                      ? 'bg-terracotta text-white font-medium shadow-sm'
                      : 'bg-beige text-brown/70 hover:text-brown'
                  }`}
                >
                  {t('catalogue.colophon', 'Colophon')}
                </button>
              </div>
            </div>

            {/* ── DIGITAL BOOK SPREAD VIEWPORT ── */}
            <div className="relative min-h-[520px] rounded-2xl overflow-hidden border-2 border-beige-dark/70 shadow-2xl bg-[#FAF6F0] p-6 sm:p-10 flex flex-col justify-between">
              {/* PAGE 0: COVER SPREAD */}
              {previewPageIndex === 0 && (
                <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-in py-4">
                  {exhibitionName && (
                    <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-terracotta mb-2">
                      {exhibitionName}
                    </div>
                  )}

                  <h1 className="font-serif font-bold text-brown text-2xl sm:text-4xl max-w-2xl leading-tight mb-2 tracking-tight">
                    {title}
                  </h1>

                  {subtitle && (
                    <p className="font-serif italic text-brown/70 text-base sm:text-lg mb-6">
                      {subtitle}
                    </p>
                  )}

                  {/* Cover Artwork In Selected Style */}
                  <div
                    className={`rounded-xl p-3 shadow-lg max-w-md w-full mb-6 ${
                      coverStyle === 'framed'
                        ? 'bg-[#2F1E15] border-2 border-[#C4A163]'
                        : 'bg-ivory border border-beige-dark/70'
                    }`}
                  >
                    <div className="aspect-[16/10] w-full rounded overflow-hidden bg-brown/10">
                      <img
                        src={coverImage}
                        alt="Catalogue Cover"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="text-xs font-sans text-brown/65">
                    {t('catalogue.traditionalMasterworksBy', 'Artist & Curated Works by')}{' '}
                    <strong className="text-brown">Ivy Maiti</strong>
                    <div className="text-[10px] text-brown/40 mt-0.5">
                      {t('catalogue.publishedVia', 'Published via KalaSetu AI Digital Archive · Autumn 2026')}
                    </div>
                  </div>
                </div>
              )}

              {/* PAGE 1: INTRODUCTION SPREAD */}
              {previewPageIndex === 1 && (
                <div className="flex-1 max-w-2xl mx-auto flex flex-col justify-center animate-fade-in py-4">
                  <div className="text-center mb-6">
                    <span className="text-[10px] font-sans font-semibold uppercase tracking-widest text-terracotta">
                      {t('catalogue.curatorialStatement', 'Curatorial Statement')}
                    </span>
                    <h2 className="font-serif font-bold text-brown text-2xl sm:text-3xl mt-1">
                      {t('catalogue.livingVoice', 'The Living Voice of Tradition')}
                    </h2>
                    <div className="w-12 h-0.5 bg-ochre/60 mx-auto mt-2" />
                  </div>

                  <div className="prose prose-brown text-justify font-serif text-brown/85 text-base sm:text-lg leading-relaxed space-y-4">
                    <p className="first-letter:text-3xl first-letter:font-bold first-letter:text-terracotta first-letter:float-left first-letter:mr-2">
                      {introduction}
                    </p>
                    <p>
                      In each work gathered here, materials are drawn from the sacred earth—natural stone pigments, river clays, and vegetable extracts. The artist does not separate art from prayer; every stroke is an offering to community memory and ancestral resilience.
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-beige-dark/60 flex items-center justify-between text-xs font-sans text-brown/60">
                    <span>West Bengal Traditional Studio</span>
                    <span>Ivy Maiti, {t('artwork.artistLabel', 'Artist')}</span>
                  </div>
                </div>
              )}

              {/* PAGE 2 to N+1: ARTWORK PLATES */}
              {previewPageIndex >= 2 && previewPageIndex <= artworkItemsData.length + 1 && (
                (() => {
                  const currentPlate = artworkItemsData[previewPageIndex - 2];
                  if (!currentPlate) return null;

                  return (
                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in py-2">
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

                        <div className="mt-3 text-center text-[11px] font-sans text-brown/50">
                          Plate {previewPageIndex - 1} · {currentPlate.title} by Ivy Maiti
                        </div>
                      </div>

                      {/* Right: Plate Placard & Cultural Lore */}
                      <div className="lg:col-span-5 space-y-4">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-terracotta font-semibold">
                            {t('catalogue.plateOf', { current: previewPageIndex - 1, total: artworkItemsData.length }, `Plate ${previewPageIndex - 1} of ${artworkItemsData.length}`)}
                          </span>
                          <h3 className="font-serif font-bold text-brown text-2xl sm:text-3xl leading-snug">
                            {currentPlate.title}
                          </h3>
                          <p className="text-xs font-sans text-brown/65 mt-0.5">
                            {currentPlate.artForm} · {currentPlate.type}
                          </p>
                        </div>

                        {/* Specifications Card */}
                        <div className="p-3.5 rounded-xl bg-ivory border border-beige-dark/60 text-xs font-sans space-y-1.5 text-brown/70 shadow-sm">
                          <p>
                            <strong className="text-brown">{t('catalogue.dimensions', 'Dimensions:')}</strong>{' '}
                            {currentPlate.dimensions || '24 × 18 inches'}
                          </p>
                          <p>
                            <strong className="text-brown">{t('artwork.materialsUsed', 'Materials:')}</strong>{' '}
                            {currentPlate.materials || 'Traditional mineral pigments'}
                          </p>
                          <p>
                            <strong className="text-brown">{t('artwork.techniques', 'Technique:')}</strong>{' '}
                            {currentPlate.techniques || 'Indigenous folk linework'}
                          </p>
                        </div>

                        {/* Curatorial Description */}
                        <p className="font-serif text-sm sm:text-base text-brown/85 leading-relaxed">
                          {currentPlate.description}
                        </p>

                        {/* Associated Story / Custom Remark */}
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

              {/* PAGE N+2: COLOPHON SPREAD */}
              {previewPageIndex === artworkItemsData.length + 2 && (
                <div className="flex-1 max-w-xl mx-auto flex flex-col justify-center text-center animate-fade-in py-4">
                  <LotusLogo size={32} className="mx-auto mb-3" />
                  <h3 className="font-serif font-bold text-brown text-2xl mb-2">
                    {t('catalogue.colophonTitle', 'Colophon & Artist Verification')}
                  </h3>
                  <div className="w-10 h-0.5 bg-ochre/50 mx-auto mb-4" />

                  <p className="font-sans text-xs sm:text-sm text-brown/70 leading-relaxed mb-6">
                    {t('catalogue.colophonDesc', 'This digital catalogue was assembled and authenticated via the KalaSetu AI platform, designed to empower traditional and independent Indian artists through ethical generative technologies.')}
                  </p>

                  <div className="p-4 rounded-xl bg-ivory border border-beige-dark/60 text-xs font-sans text-brown/75 space-y-1 mb-6 text-left">
                    <p>
                      <strong>{t('catalogue.masterArtist', 'Master Artist:')}</strong> Ivy Maiti
                    </p>
                    <p>
                      <strong>{t('catalogue.folkDisciplines', 'Folk Disciplines:')}</strong> Mithila Madhubani, Warli, Gond, Pattachitra
                    </p>
                    <p>
                      <strong>{t('catalogue.origin', 'Origin:')}</strong> West Bengal, India
                    </p>
                    <p>
                      <strong>{t('catalogue.totalDocumentedPlates', 'Total Documented Plates:')}</strong> {artworkItemsData.length}
                    </p>
                  </div>

                  <p className="text-[11px] font-serif italic text-brown/50">
                    &ldquo;Every stroke of colour is a word in the language of the soul.&rdquo;
                  </p>
                </div>
              )}

              {/* ── Bottom Page Turn Navigation Bar ── */}
              <div className="mt-6 pt-4 border-t border-beige-dark/50 flex items-center justify-between text-xs font-sans text-brown/65">
                <button
                  type="button"
                  onClick={() => setPreviewPageIndex((p) => Math.max(0, p - 1))}
                  disabled={previewPageIndex === 0}
                  className="px-3 py-1.5 rounded-lg bg-ivory border border-beige-dark/60 text-brown disabled:opacity-30 disabled:cursor-not-allowed hover:bg-beige transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <ChevronLeft size={14} />
                  <span>{t('catalogue.previousPage', 'Previous Page')}</span>
                </button>

                <span className="font-medium">
                  {t('catalogue.pageCount', { current: previewPageIndex + 1, total: artworkItemsData.length + 3 }, `Page ${previewPageIndex + 1} of ${artworkItemsData.length + 3}`)}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setPreviewPageIndex((p) =>
                      Math.min(artworkItemsData.length + 2, p + 1)
                    )
                  }
                  disabled={previewPageIndex === artworkItemsData.length + 2}
                  className="px-3 py-1.5 rounded-lg bg-ivory border border-beige-dark/60 text-brown disabled:opacity-30 disabled:cursor-not-allowed hover:bg-beige transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <span>{t('catalogue.nextPage', 'Next Page')}</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom Workflow Action Footer ── */}
      <div className="px-6 py-4 bg-beige/40 border-t border-beige-dark/50 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={goToPrevStep}
              className="px-4 py-2 rounded-xl bg-ivory border border-beige-dark/60 text-xs font-sans font-medium text-brown hover:bg-beige transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <ChevronLeft size={14} />
              <span>{t('catalogue.backToStep', { step: currentStep - 1 }, `Back to Step ${currentStep - 1}`)}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-xl bg-beige border border-beige-dark/50 text-xs font-sans text-brown/70 hover:text-brown transition-colors"
            >
              {t('common.cancel', 'Cancel')}
            </button>
          )}
        </div>

        <div className="flex items-center gap-2.5">
          {currentStep < 5 ? (
            <button
              type="button"
              onClick={goToNextStep}
              className="btn-primary text-xs py-2 px-5 flex items-center gap-1.5"
            >
              <span>{t('catalogue.continueToStep', { step: currentStep + 1 }, `Continue to Step ${currentStep + 1}`)}</span>
              <ChevronRight size={14} />
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="px-4 py-2 rounded-xl bg-ivory border border-beige-dark/60 text-xs font-sans font-medium text-brown hover:bg-beige transition-colors"
              >
                {t('catalogue.backToEdit', 'Back to Edit')}
              </button>

              <button
                type="button"
                onClick={() => handleSave('Draft')}
                className="px-4 py-2 rounded-xl bg-beige hover:bg-beige-dark/30 border border-beige-dark/70 text-xs font-sans font-medium text-brown transition-colors"
              >
                {t('artwork.saveAsDraft', 'Save as Draft')}
              </button>

              <button
                type="button"
                onClick={() => handleSave('Published')}
                className="btn-primary text-xs py-2 px-6 flex items-center gap-1.5 shadow-md"
              >
                <Save size={14} />
                <span>{t('catalogue.publishCatalogue', 'Publish Catalogue')}</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
