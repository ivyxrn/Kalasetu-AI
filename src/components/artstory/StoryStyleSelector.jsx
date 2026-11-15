import React from 'react';
import { Landmark, Heart, Sparkles, BookOpen, Check } from 'lucide-react';
import { storyStyles } from '../../data/storyData';
import { useLanguage } from '../../i18n';

const iconMap = {
  Landmark,
  Heart,
  Sparkles,
  BookOpen,
};

export default function StoryStyleSelector({ selectedStyle, onSelectStyle }) {
  const { t } = useLanguage();

  const getStyleTitle = (style) => {
    return t(`artstory.styles.${style.id}`, style.title);
  };

  const getStyleDesc = (style) => {
    return t(`artstory.styles.${style.id}Desc`, style.description);
  };

  return (
    <div className="bg-ivory border border-beige-dark/70 rounded-2xl p-6 sm:p-7 shadow-sm">
      {/* Step Header */}
      <div className="mb-4 pb-3 border-b border-beige-dark/50">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-terracotta text-white text-xs font-serif font-bold flex items-center justify-center">
            3
          </span>
          <h2 className="font-serif font-bold text-brown text-lg sm:text-xl">
            {t('artstory.chooseStyleTitle', 'Choose Your Story Style')}
          </h2>
        </div>
        <p className="font-sans text-xs sm:text-sm text-brown/65 mt-0.5 ml-8">
          {t('artstory.chooseStyleSubtitle', 'Select the narrative voice that best expresses the soul and purpose of your creation.')}
        </p>
      </div>

      {/* Style Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {storyStyles.map((style) => {
          const Icon = iconMap[style.icon] || Sparkles;
          const isSelected = selectedStyle === style.id;

          return (
            <button
              key={style.id}
              type="button"
              onClick={() => onSelectStyle(style.id)}
              className={`text-left p-4 rounded-xl border-2 transition-all flex flex-col justify-between relative ${
                isSelected
                  ? 'border-terracotta bg-beige/60 ring-2 ring-terracotta/20 shadow-md scale-[1.01]'
                  : 'border-beige-dark/60 bg-beige-light hover:border-ochre hover:bg-beige/30'
              }`}
            >
              {/* Top Row: Icon & Active Checkmark */}
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'bg-terracotta text-white'
                      : 'bg-beige border border-beige-dark/70 text-brown/70'
                  }`}
                >
                  <Icon size={18} />
                </div>

                {isSelected ? (
                  <span className="w-5 h-5 rounded-full bg-terracotta text-white flex items-center justify-center shadow-sm">
                    <Check size={12} strokeWidth={2.5} />
                  </span>
                ) : (
                  <span className="text-[10px] font-sans px-2 py-0.5 rounded bg-beige-dark/30 text-brown/50">
                    {style.tag}
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <div>
                <h3
                  className={`font-serif font-bold text-sm sm:text-base leading-snug mb-1.5 ${
                    isSelected ? 'text-terracotta' : 'text-brown'
                  }`}
                >
                  {getStyleTitle(style)}
                </h3>
                <p className="text-xs font-sans text-brown/70 leading-relaxed">
                  {getStyleDesc(style)}
                </p>
              </div>

              {/* Bottom selection indicator accent */}
              <div className="mt-3 pt-2.5 border-t border-beige-dark/40 flex items-center justify-between">
                <span
                  className={`text-[10px] font-sans font-medium uppercase tracking-wider ${
                    isSelected ? 'text-terracotta' : 'text-brown/40'
                  }`}
                >
                  {isSelected ? t('artstory.selectedVoice', 'Selected Voice') : t('artstory.clickToSelect', 'Click to Select')}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
