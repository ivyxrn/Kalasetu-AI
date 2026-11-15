import React from 'react';
import { Globe, Clock, Sparkles, AlertCircle } from 'lucide-react';
import { languages, storyLengths } from '../../data/storyData';
import { useLanguage } from '../../i18n';

export default function StoryPreferences({
  selectedLanguage,
  onSelectLanguage,
  selectedLength,
  onSelectLength,
  onGenerate,
  isGenerating,
  canGenerate,
  validationError,
}) {
  const { language, t } = useLanguage();

  return (
    <div className="bg-ivory border border-beige-dark/70 rounded-2xl p-6 sm:p-7 shadow-sm">
      {/* Step Header */}
      <div className="mb-4 pb-3 border-b border-beige-dark/50">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-terracotta text-white text-xs font-serif font-bold flex items-center justify-center">
            4
          </span>
          <h2 className="font-serif font-bold text-brown text-lg sm:text-xl">
            {t('artstory.step3', 'Choose Language & Length')}
          </h2>
        </div>
        <p className="font-sans text-xs sm:text-sm text-brown/65 mt-0.5 ml-8">
          {t('artstory.storyLanguageNote', 'Present your story in your regional language with the appropriate length for your audience.')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Languages Selection (7 columns) */}
        <div className="lg:col-span-7 space-y-2">
          <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider flex items-center gap-1.5">
            <Globe size={13} className="text-terracotta" />
            <span>{t('artstory.storyLanguage', 'Storytelling Language')}</span>
          </label>

          <div className="grid grid-cols-2 gap-3">
            {languages.map((lang) => {
              const isSelected = selectedLanguage === lang.id;

              return (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() => onSelectLanguage(lang.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'border-terracotta bg-terracotta/10 text-terracotta font-medium ring-1 ring-terracotta/30'
                      : 'border-beige-dark/60 bg-beige-light hover:border-beige-dark text-brown'
                  }`}
                >
                  <div className="text-xs font-sans font-semibold">
                    {lang.name}
                  </div>
                  <div className="text-[11px] font-sans opacity-70 mt-0.5">
                    {lang.native}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Story Length Selection (5 columns) */}
        <div className="lg:col-span-5 space-y-2">
          <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider flex items-center gap-1.5">
            <Clock size={13} className="text-forest" />
            <span>{t('artstory.storyLength', 'Story Length')}</span>
          </label>

          <div className="space-y-2">
            {storyLengths.map((len) => {
              const isSelected = selectedLength === len.id;

              return (
                <button
                  key={len.id}
                  type="button"
                  onClick={() => onSelectLength(len.id)}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-terracotta bg-terracotta/10 text-terracotta font-medium ring-1 ring-terracotta/30'
                      : 'border-beige-dark/60 bg-beige-light hover:border-beige-dark text-brown'
                  }`}
                >
                  <div>
                    <div className="text-xs font-sans font-semibold">
                      {t(`artstory.lengths.${len.id}`, len.label)}
                    </div>
                    <div className="text-[10.5px] font-sans text-brown/60">
                      {t(`artstory.lengths.${len.id}Desc`, len.description)}
                    </div>
                  </div>
                  <span className="text-[11px] font-sans px-2 py-0.5 rounded bg-beige-dark/25 text-brown/65 flex-shrink-0 ml-2">
                    {len.subtitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Validation Warning Alert (if any) */}
      {validationError && (
        <div className="mt-4 p-3 rounded-xl bg-terracotta/10 border border-terracotta/30 flex items-center gap-2 text-xs font-sans text-terracotta animate-fade-in">
          <AlertCircle size={15} className="flex-shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Primary Action Button */}
      <div className="mt-6 pt-4 border-t border-beige-dark/50 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs font-sans text-brown/55 text-center sm:text-left">
          {language === 'hi'
            ? 'आपकी स्मृतियों और सांस्कृतिक ज्ञान को एक प्रामाणिक कहानी में पिरोने के लिए तैयार।'
            : 'Ready to weave your memories and cultural knowledge into an authentic story.'}
        </p>

        <button
          type="button"
          onClick={onGenerate}
          disabled={isGenerating}
          className={`btn-primary w-full sm:w-auto px-8 py-3 text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
            isGenerating ? 'opacity-85 cursor-wait' : ''
          }`}
        >
          {isGenerating ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>{t('artstory.generating', 'Weaving Your ArtStory...')}</span>
            </>
          ) : (
            <>
              <Sparkles size={16} />
              <span>{t('artstory.generateButton', 'Generate ArtStory')}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
