import React from 'react';
import { User, Share2, Edit3, Eye, Heart, Sparkles, CheckCircle2, ShieldCheck, PhoneCall } from 'lucide-react';
import { LotusLogo } from '../ui/DecorativeElements';
import { useLanguage } from '../../i18n';

export default function PortfolioHeader({
  portfolio,
  onOpenEdit,
  onOpenShare,
  onTogglePublish,
  onScrollToPreview,
}) {
  const { language, t } = useLanguage();

  return (
    <div className="relative mb-8 rounded-2xl overflow-hidden bg-ivory border border-beige-dark/70 shadow-sm p-6 sm:p-8 animate-fade-in">
      {/* Soft warm ochre background radiance */}
      <div
        className="absolute -right-20 -top-20 w-80 h-80 rounded-full pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle, #D5B77A 0%, rgba(247, 243, 234, 0) 70%)',
        }}
      />

      {/* Top Banner Row */}
      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest/10 text-forest text-xs font-sans font-medium border border-forest/25">
              <ShieldCheck size={14} />
              {language === 'hi' ? 'शिल्पकार प्रोफ़ाइल और डिजिटल आवास' : 'Artisan Profile & Digital Home'}
            </span>
            <span className="text-xs font-sans text-brown/40">·</span>
            <span className="text-xs font-sans text-brown/65">
              {language === 'hi' ? 'खरीदारों और संरक्षकों के साथ साझा करने के लिए तैयार' : 'Ready to Share with Buyers & Patrons'}
            </span>
          </div>

          <h1 className="font-serif font-bold text-brown text-3xl sm:text-4xl tracking-tight leading-tight mb-2">
            {t('portfolio.title', 'My Portfolio')}
          </h1>

          <p className="font-serif italic text-terracotta text-lg sm:text-xl mb-3">
            &ldquo;{t('portfolio.subtitle', 'A warm, simple space to share your craft and story with the world.')}&rdquo;
          </p>

          <p className="font-sans text-brown/75 text-sm sm:text-base leading-relaxed">
            {language === 'hi'
              ? 'आपका पोर्टफोलियो कला प्रेमियों, खरीदारों और सांस्कृतिक संगठनों को आपसे, आपकी हस्तनिर्मित कृतियों और आपकी पैतृक परंपराओं से परिचित कराता है। औपचारिक प्रमाण पत्र या पुरस्कारों की आवश्यकता नहीं है—आपका सच्चा शिल्प और व्यक्तिगत यात्रा ही आपकी सबसे बड़ी पहचान है।'
              : "Your portfolio introduces you, your handmade creations, and your ancestral traditions to art lovers, buyers, and cultural organizations. You don't need formal qualifications or awards—your authentic craft and personal journey are your greatest strength."}
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 w-full lg:w-auto flex-shrink-0">
          <button
            onClick={onOpenShare}
            className="btn-primary flex items-center justify-center gap-2 px-6 py-3 text-sm font-sans font-medium shadow-md hover:shadow-lg transition-all"
          >
            <Share2 size={16} />
            <span>{language === 'hi' ? 'पोर्टफोलियो साझा करें' : 'Share My Portfolio'}</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onOpenEdit}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-ivory hover:bg-beige border border-beige-dark/70 text-xs font-sans font-medium text-brown transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Edit3 size={14} className="text-terracotta" />
              <span>{language === 'hi' ? 'मेरी कहानी संपादित करें' : 'Edit My Story'}</span>
            </button>

            <button
              onClick={onScrollToPreview}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-ivory hover:bg-beige border border-beige-dark/70 text-xs font-sans font-medium text-brown transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Eye size={14} className="text-forest" />
              <span>{language === 'hi' ? 'सार्वजनिक दृश्य' : 'Public View'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Status & Inclusivity Callout Strip ── */}
      <div className="relative z-10 pt-4 border-t border-beige-dark/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Publication Status Pill */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-forest/10 border border-forest/25 text-forest text-xs font-sans font-medium">
            <span className="w-2 h-2 rounded-full bg-forest animate-pulse" />
            <span>
              {portfolio.isPublished
                ? (language === 'hi' ? 'आपका पोर्टफोलियो लाइव और साझा करने योग्य है' : 'Your Portfolio is Live & Shareable')
                : (language === 'hi' ? 'पोर्टफोलियो निजी ड्राफ़्ट के रूप में सहेजा गया है' : 'Portfolio Saved as Private Draft')}
            </span>
          </div>

          <button
            onClick={onTogglePublish}
            className="text-xs font-sans text-brown/65 hover:text-terracotta underline transition-colors"
          >
            {portfolio.isPublished
              ? (language === 'hi' ? 'निजी बनाएं' : 'Make Private')
              : (language === 'hi' ? 'सार्वजनिक बनाएं' : 'Make Public')}
          </button>
        </div>

        {/* Guiding Principle Note */}
        <div className="text-xs font-sans text-brown/60 flex items-center gap-1.5">
          <Heart size={13} className="text-terracotta flex-shrink-0" />
          <span>
            Anyone with your link can view your artwork, read your story, and contact you directly.
          </span>
        </div>
      </div>
    </div>
  );
}
