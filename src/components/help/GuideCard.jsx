import React from 'react';
import {
  LayoutDashboard,
  Image,
  Sparkles,
  BookOpen,
  User,
  Landmark,
  Calculator,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { useLanguage } from '../../i18n';

const iconMap = {
  LayoutDashboard,
  Image,
  Sparkles,
  BookOpen,
  User,
  Landmark,
  Calculator,
};

export default function GuideCard({ guide, onSelect }) {
  const { t } = useLanguage();
  const Icon = iconMap[guide.icon] || LayoutDashboard;

  const colorStyles = {
    terracotta: 'bg-terracotta/10 text-terracotta border-terracotta/20',
    forest: 'bg-forest/10 text-forest border-forest/20',
    ochre: 'bg-ochre/20 text-ochre-dark border-ochre/30',
  };

  const pillClass = colorStyles[guide.color] || colorStyles.terracotta;

  return (
    <div
      onClick={() => onSelect(guide)}
      className="group cursor-pointer rounded-2xl bg-ivory border border-beige-dark/70 hover:border-ochre hover:shadow-md transition-all duration-200 p-5 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center border shadow-xs transition-transform group-hover:scale-105 ${pillClass}`}
          >
            <Icon size={20} />
          </div>
          <span className="text-[10px] font-sans font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-beige border border-beige-dark/50 text-brown/60">
            {guide.category}
          </span>
        </div>

        <h3 className="font-serif font-bold text-brown text-base group-hover:text-terracotta transition-colors mb-1.5">
          {guide.title}
        </h3>

        <p className="text-xs font-sans text-brown/65 leading-relaxed">
          {guide.shortDescription}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-beige-dark/40 flex items-center justify-between text-xs font-sans font-medium text-terracotta group-hover:text-terracotta-dark">
        <span>{t('help.readGuide', 'Read Step-by-Step Guide')}</span>
        <ArrowRight
          size={14}
          className="transform group-hover:translate-x-1 transition-transform"
        />
      </div>
    </div>
  );
}
