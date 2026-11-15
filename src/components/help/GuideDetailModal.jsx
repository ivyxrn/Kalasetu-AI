import React from 'react';
import {
  X,
  LayoutDashboard,
  Image,
  Sparkles,
  BookOpen,
  User,
  Landmark,
  Calculator,
  CheckCircle2,
  Lightbulb,
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

export default function GuideDetailModal({ guide, isOpen, onClose }) {
  const { t } = useLanguage();
  if (!isOpen || !guide) return null;

  const Icon = iconMap[guide.icon] || LayoutDashboard;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-brown/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-ivory rounded-3xl border border-beige-dark/70 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-beige/40 border-b border-beige-dark/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-terracotta/10 text-terracotta border border-terracotta/20 flex items-center justify-center">
              <Icon size={20} />
            </div>
            <div>
              <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-terracotta">
                {guide.category} {t('help.guide', 'Guide')}
              </span>
              <h2 className="font-serif font-bold text-brown text-xl">
                {guide.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-beige hover:bg-beige-dark/40 flex items-center justify-center text-brown/60 hover:text-brown transition-colors"
            aria-label="Close guide modal"
          >
            <X size={17} />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <p className="text-sm font-sans text-brown/75 leading-relaxed">
            {guide.shortDescription}
          </p>

          {/* Numbered Steps */}
          <div className="space-y-4">
            {guide.steps.map((step) => (
              <div
                key={step.step}
                className="flex items-start gap-4 p-4 rounded-2xl bg-beige/30 border border-beige-dark/50"
              >
                <div className="w-7 h-7 rounded-full bg-terracotta text-white flex items-center justify-center font-serif font-bold text-xs flex-shrink-0 mt-0.5 shadow-xs">
                  {step.step}
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif font-semibold text-brown text-base">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] font-sans text-brown/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pro Tip / Artisan Note */}
          {guide.proTip && (
            <div className="p-4 rounded-2xl bg-ochre/15 border border-ochre/35 flex items-start gap-3">
              <Lightbulb size={18} className="text-ochre-dark flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif font-semibold text-brown text-sm">
                  {t('help.artisanTip', 'Helpful Hint for Artisans')}
                </h4>
                <p className="text-xs font-sans text-brown/75 mt-0.5 leading-relaxed">
                  {guide.proTip}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-beige/30 border-t border-beige-dark/50 flex items-center justify-between">
          <span className="text-xs font-sans text-brown/50">
            {t('help.guidanceFooter', 'Step-by-step guidance for traditional creators')}
          </span>

          <button
            onClick={onClose}
            className="btn-primary text-xs py-2 px-5 shadow-sm"
          >
            {t('help.iUnderstand', 'I Understand')}
          </button>
        </div>
      </div>
    </div>
  );
}
