import React, { useState } from 'react';
import { Globe, Check, Info, Sparkles, BookOpen } from 'lucide-react';
import { supportedLanguages } from '../../data/settingsData';
import { useLanguage } from '../../i18n';

export default function LanguageSection({ language, onSaveLanguage }) {
  const { language: currentLang, setLanguage, t } = useLanguage();
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSelect = (code) => {
    setLanguage(code);
    if (onSaveLanguage) {
      onSaveLanguage({ interfaceLanguage: code });
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="bg-ivory rounded-2xl border border-beige-dark/65 p-6 sm:p-8 shadow-sm">
      <div className="border-b border-beige-dark/50 pb-5 mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Globe size={20} className="text-terracotta" />
          <h3 className="font-serif font-bold text-brown text-xl sm:text-2xl">
            {t('settings.languagePreferences')}
          </h3>
        </div>
        <p className="font-sans text-xs sm:text-sm text-brown/65 leading-relaxed">
          {t('settings.languageSubtitle')}
        </p>
      </div>

      {/* Language Selection Cards */}
      <div className="space-y-4 mb-8">
        <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider mb-2">
          {t('settings.interfaceLanguage')}
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {supportedLanguages.map((lang) => {
            const isSelected = currentLang === lang.code;

            return (
              <div
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`cursor-pointer rounded-2xl p-5 border transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-beige/60 border-terracotta shadow-sm ring-1 ring-terracotta/40'
                    : 'bg-ivory hover:bg-beige/30 border-beige-dark/70 hover:border-ochre'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="font-serif font-bold text-lg text-brown">
                        {lang.name}
                      </span>
                      <span className="text-xs font-sans px-2 py-0.5 rounded-full bg-ochre/15 text-brown/70 border border-ochre/25">
                        {lang.nativeName}
                      </span>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-terracotta text-white'
                          : 'border border-beige-dark text-transparent'
                      }`}
                    >
                      <Check size={12} strokeWidth={3} />
                    </div>
                  </div>

                  <p className="text-xs font-sans text-brown/65 leading-relaxed mt-1">
                    {lang.code === 'hi'
                      ? 'सभी मेनू, बटन और मार्गदर्शक निर्देश सरल और स्पष्ट हिन्दी में दिखाए जाएंगे।'
                      : 'All menus, buttons, and guided instructions will be shown in clear English.'}
                  </p>
                </div>

                {lang.isDefault && (
                  <div className="mt-4 pt-2.5 border-t border-beige-dark/40 flex items-center gap-1.5 text-[11px] font-sans text-brown/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-forest" />
                    {t('settings.defaultLanguage')}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {savedSuccess && (
          <div className="text-xs font-sans text-forest font-medium flex items-center gap-1.5 pt-1 animate-fade-in">
            <Check size={14} className="text-forest" />
            {t('settings.languageSaved')}
          </div>
        )}
      </div>

      {/* ── Clear Distinction Callout ── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-beige/50 border border-ochre/30 flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-xl bg-ochre/20 text-ochre-dark flex items-center justify-center flex-shrink-0 mt-0.5">
          <BookOpen size={18} />
        </div>
        <div>
          <h4 className="font-serif font-semibold text-brown text-sm sm:text-base">
            {t('settings.langDistinctionTitle')}
          </h4>
          <p className="font-sans text-xs text-brown/75 mt-1 leading-relaxed">
            {t('settings.langDistinctionP1')}
          </p>
          <p className="font-sans text-xs text-brown/75 mt-1.5 leading-relaxed">
            {t('settings.langDistinctionP2')}
          </p>
        </div>
      </div>
    </div>
  );
}
