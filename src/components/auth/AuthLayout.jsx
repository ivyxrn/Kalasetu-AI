import React, { useState } from 'react';
import { Globe, Sparkles, ShieldCheck, Heart, Palette } from 'lucide-react';
import { LotusLogo, WarliDivider, BotanicalSprig } from '../ui/DecorativeElements';
import { useLanguage } from '../../i18n';

// Editorial showcase of traditional Indian craftsmanship
const artisanShowcase = {
  title: 'Behind Every Creation',
  subtitle: "There's a story worth sharing.",
  badge: 'Living Heritage',
  image: '/artworks/artisan_craftsmanship.jpg',
  description: 'An authentic master artisan engaged in the timeless practice of traditional Indian craftsmanship.',
};

export default function AuthLayout({ children }) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-ivory flex flex-col lg:flex-row">
      {/* ─────────────────────────────────────────────────────────────
          LEFT PANEL: HERITAGE & ARTISAN IDENTITY
         ───────────────────────────────────────────────────────────── */}
      <div
        className="lg:w-5/12 xl:w-1/2 relative p-8 sm:p-12 lg:p-16 flex flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r border-beige-dark/60 text-brown"
        style={{
          backgroundColor: '#EDE3D3',
          backgroundImage: `
            radial-gradient(circle at 10% 20%, rgba(213, 183, 122, 0.25) 0%, transparent 45%),
            radial-gradient(circle at 90% 80%, rgba(157, 73, 53, 0.15) 0%, transparent 50%),
            linear-gradient(145deg, #F5EDE0 0%, #E8DCC8 100%)
          `,
        }}
      >
        {/* Subtle decorative background aura */}
        <div
          className="absolute -right-24 -top-24 w-96 h-96 rounded-full pointer-events-none opacity-30"
          style={{
            background: 'radial-gradient(circle, #9D4935 0%, rgba(247, 243, 234, 0) 70%)',
          }}
        />

        {/* Top: Brand Header */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-2xl bg-ivory/80 backdrop-blur-sm border border-beige-dark/70 shadow-sm flex items-center justify-center">
              <LotusLogo size={34} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-brown text-xl tracking-tight">
                  KalaSetu AI
                </span>
                <span className="text-[10px] font-sans font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-terracotta/10 text-terracotta border border-terracotta/20">
                  {t('auth.heritageBadge', 'Traditional & Independent Artisans')}
                </span>
              </div>
              <p className="font-sans text-xs text-brown/60">
                {language === 'hi' ? 'कला और तकनीक का सेतु' : 'Bridging Art and Technology'}
              </p>
            </div>
          </div>
        </div>

        {/* Center: Main Identity & Curated Showcase */}
        <div className="relative z-10 my-8 lg:my-12 space-y-6 max-w-lg">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold uppercase tracking-wider text-terracotta mb-2">
              <BotanicalSprig className="w-4 h-4" />
              <span>{t('auth.heritageBadge', 'Traditional & Independent Artisans')}</span>
            </div>

            <h1 className="font-serif font-bold text-brown text-3xl sm:text-4xl lg:text-[40px] leading-tight tracking-tight">
              {t('auth.heroTitle', 'Your Craft. Your Story. Your World.')}
            </h1>

            <p className="font-sans text-sm sm:text-base text-brown/75 mt-3 leading-relaxed">
              {t(
                'auth.heroSubtitle',
                'Bring your creations to the world. Preserve your traditions and share your artistic journey.'
              )}
            </p>
          </div>

          {/* Featured Traditional Artisan Craftsmanship Frame */}
          <div className="rounded-2xl p-3.5 shadow-xl border border-ochre/40 bg-[#2E1D13] transition-all duration-300">
            <div className="p-2 rounded-sm border border-ochre/35 bg-[#FAF6EE]">
              <div className="relative aspect-[16/10] w-full rounded overflow-hidden bg-brown/10">
                <img
                  src={artisanShowcase.image}
                  alt="Traditional Indian artisan actively practising their craft in a sunlit workshop"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  loading="eager"
                />
                <div className="absolute top-2.5 right-2.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-sans font-medium bg-ivory/95 text-brown border border-beige-dark shadow-sm">
                    {t('auth.livingHeritage', 'Living Heritage')}
                  </span>
                </div>
              </div>
            </div>

            {/* Artwork / Artisan Process Metadata */}
            <div className="mt-3 px-1.5 flex items-center justify-between text-ivory text-xs font-sans">
              <div>
                <p className="font-serif font-bold text-ivory text-sm truncate tracking-wide">
                  {t('auth.behindEveryCreation', 'Behind Every Creation')}
                </p>
                <p className="text-[11.5px] text-ochre/90 font-serif italic mt-0.5">
                  {t('auth.storyWorthSharing', "There's a story worth sharing.")}
                </p>
              </div>
            </div>
          </div>

          {/* Artisan Heritage Promise */}
          <div className="p-3.5 rounded-xl bg-ivory/70 border border-beige-dark/70 backdrop-blur-xs flex items-center gap-3 text-xs font-sans text-brown/80">
            <ShieldCheck size={18} className="text-forest flex-shrink-0" />
            <span>
              {language === 'hi'
                ? 'कलाकारों के अधिकारों और सांस्कृतिक विरासत का पूर्ण संरक्षण।'
                : '100% Artisan Ownership & Heritage Preservation Guaranteed.'}
            </span>
          </div>
        </div>

        {/* Bottom: Heritage Border */}
        <div className="relative z-10 pt-4 border-t border-beige-dark/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans text-brown/60">
          <span>
            {language === 'hi'
              ? 'भारतीय लोक और जनजातीय कला मंच'
              : 'Indian Folk & Tribal Art Platform'}
          </span>
          <div className="flex items-center gap-1 text-terracotta">
            <Heart size={13} fill="currentColor" />
            <span>KalaSetu AI · 2026</span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          RIGHT PANEL: AUTHENTICATION FORM CONTAINER
         ───────────────────────────────────────────────────────────── */}
      <div className="lg:w-7/12 xl:w-1/2 flex flex-col justify-between p-6 sm:p-10 lg:p-14 relative bg-ivory">
        {/* Top Utility Bar (Language Toggle & Demo Flow Indicator) */}
        <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
          {/* Demo status pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ochre/20 border border-ochre/40 text-brown text-[11px] font-sans font-medium">
            <Sparkles size={12} className="text-terracotta" />
            <span>{t('auth.demoNoticeBadge', 'Frontend Demo Flow · Supabase Ready')}</span>
          </div>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-beige border border-beige-dark/70 hover:bg-beige-dark/30 text-xs font-sans font-medium text-brown transition-colors shadow-xs"
            title={language === 'hi' ? 'Switch to English' : 'हिन्दी में बदलें'}
            aria-label="Toggle language"
          >
            <Globe size={13} className="text-terracotta" />
            <span>{language === 'hi' ? 'English' : 'हिन्दी'}</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md mx-auto">
            {children}
          </div>
        </div>

        {/* Footer Note */}
        <div className="pt-8 mt-6 border-t border-beige-dark/40 text-center">
          <p className="text-[11px] font-sans text-brown/50">
            {t(
              'auth.demoNoticeText',
              'This is a frontend demonstration flow prepared for Supabase + PostgreSQL integration.'
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
