import React, { useState } from 'react';
import {
  Feather,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Info,
  Wand2,
  FileText,
} from 'lucide-react';
import { useLanguage } from '../../i18n';

export default function StoryFormInputs({
  selectedArtwork,
  storyText,
  onStoryTextChange,
  inspiration,
  onInspirationChange,
  culturalSignificance,
  onCulturalSignificanceChange,
  materials,
  onMaterialsChange,
  personalMemory,
  onPersonalMemoryChange,
  onPrefillFromArtwork,
}) {
  const { t } = useLanguage();
  const [showOptionalFields, setShowOptionalFields] = useState(false);

  return (
    <div className="bg-ivory border border-beige-dark/70 rounded-2xl p-6 sm:p-7 shadow-sm">
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-beige-dark/50">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-terracotta text-white text-xs font-serif font-bold flex items-center justify-center">
              2
            </span>
            <h2 className="font-serif font-bold text-brown text-lg sm:text-xl">
              {t('artstory.tellStoryTitle', 'Tell Us Your Story')}
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-brown/65 mt-0.5 ml-8">
            {t('artstory.tellStorySubtitle', 'Your authentic memories and indigenous knowledge are the sacred foundation of this ArtStory.')}
          </p>
        </div>

        {selectedArtwork && (
          <button
            type="button"
            onClick={onPrefillFromArtwork}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ochre/15 hover:bg-ochre/25 text-brown border border-ochre/40 text-xs font-sans font-medium transition-colors"
            title={t('artstory.prefillFromArtwork', 'Pre-fill from Artwork')}
          >
            <Wand2 size={13} className="text-terracotta" />
            <span>{t('artstory.prefillFromArtwork', 'Pre-fill from Artwork')}</span>
          </button>
        )}
      </div>

      {/* Main Text Area */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider">
            {t('artstory.storyQuestion', "What's the story behind your artwork?")}{' '}
            <span className="text-terracotta">*</span>
          </label>
          <span className="text-[11px] font-sans text-brown/50">
            {storyText.length > 0
              ? t('artstory.wordsCount', { count: storyText.split(/\s+/).filter(Boolean).length }, `${storyText.split(/\s+/).filter(Boolean).length} words`)
              : t('common.required', 'Required')}
          </span>
        </div>

        <textarea
          rows={5}
          value={storyText}
          onChange={(e) => onStoryTextChange(e.target.value)}
          placeholder={t('artstory.storyPlaceholder', 'Tell us what inspired this creation. Share the memories, traditions, emotions, techniques or cultural significance behind it...')}
          className="w-full p-4 bg-beige-light border border-beige-dark/70 rounded-xl text-sm font-sans text-brown placeholder-brown/40 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta/20 transition-all leading-relaxed"
        />

        <div className="flex items-start gap-1.5 text-[11px] font-sans text-brown/60 pt-0.5">
          <Info size={13} className="text-terracotta flex-shrink-0 mt-0.5" />
          <span>
            {t('artstory.storyGuidance', "You don't need to worry about perfect grammar or formal phrasing. Simply write from the heart—the AI will shape your thoughts into an eloquent narrative while preserving your authentic voice.")}
          </span>
        </div>
      </div>

      {/* Optional Details Accordion Toggle */}
      <div className="pt-2 border-t border-beige-dark/40">
        <button
          type="button"
          onClick={() => setShowOptionalFields((prev) => !prev)}
          className="flex items-center justify-between w-full py-2 text-xs font-sans font-semibold text-brown/75 hover:text-terracotta transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <Feather size={14} className="text-terracotta" />
            <span>{t('artstory.optionalDetailsToggle', 'Optional Story Details (Enrich the narrative)')}</span>
          </span>
          {showOptionalFields ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>

        {showOptionalFields && (
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-beige/50 border border-beige-dark/40 animate-fade-in">
            {/* Inspiration */}
            <div>
              <label className="block text-xs font-sans font-medium text-brown mb-1">
                {t('artstory.inspirationLabel', 'Inspiration behind the artwork')}
              </label>
              <input
                type="text"
                value={inspiration}
                onChange={(e) => onInspirationChange(e.target.value)}
                placeholder={t('artstory.inspirationPlaceholder', 'e.g. Village harvest festival, morning rituals, folklore...')}
                className="w-full px-3 py-2 bg-ivory border border-beige-dark/60 rounded-lg text-xs font-sans text-brown placeholder-brown/40 focus:outline-none focus:border-terracotta"
              />
            </div>

            {/* Cultural Significance */}
            <div>
              <label className="block text-xs font-sans font-medium text-brown mb-1">
                {t('artstory.culturalLabel', 'Cultural or traditional significance')}
              </label>
              <input
                type="text"
                value={culturalSignificance}
                onChange={(e) => onCulturalSignificanceChange(e.target.value)}
                placeholder={t('artstory.culturalPlaceholder', 'e.g. Symbolizes prosperity, fertility, sacred harmony...')}
                className="w-full px-3 py-2 bg-ivory border border-beige-dark/60 rounded-lg text-xs font-sans text-brown placeholder-brown/40 focus:outline-none focus:border-terracotta"
              />
            </div>

            {/* Materials and Techniques */}
            <div>
              <label className="block text-xs font-sans font-medium text-brown mb-1">
                {t('artstory.materialsLabel', 'Materials & techniques used')}
              </label>
              <input
                type="text"
                value={materials}
                onChange={(e) => onMaterialsChange(e.target.value)}
                placeholder={t('artstory.materialsPlaceholder', 'e.g. Natural vegetable dyes, handmade paper, bamboo pen...')}
                className="w-full px-3 py-2 bg-ivory border border-beige-dark/60 rounded-lg text-xs font-sans text-brown placeholder-brown/40 focus:outline-none focus:border-terracotta"
              />
            </div>

            {/* Personal Memory */}
            <div>
              <label className="block text-xs font-sans font-medium text-brown mb-1">
                {t('artstory.personalMemoryLabel', 'Personal memory or message')}
              </label>
              <input
                type="text"
                value={personalMemory}
                onChange={(e) => onPersonalMemoryChange(e.target.value)}
                placeholder={t('artstory.personalMemoryPlaceholder', 'e.g. Taught by my grandmother during monsoon rains...')}
                className="w-full px-3 py-2 bg-ivory border border-beige-dark/60 rounded-lg text-xs font-sans text-brown placeholder-brown/40 focus:outline-none focus:border-terracotta"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
