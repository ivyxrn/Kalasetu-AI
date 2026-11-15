import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { PeacockIllustration } from '../ui/DecorativeElements';
import { useLanguage } from '../../i18n';

export default function WelcomeBanner() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  return (
    <div
      className="relative rounded-2xl overflow-hidden mb-6"
      style={{
        backgroundColor: '#EDE4D4',
        backgroundImage: `
          radial-gradient(circle at 100% 50%, rgba(213, 183, 122, 0.12) 0%, transparent 50%),
          linear-gradient(135deg, #F2EADA 0%, #EADDCB 100%)
        `,
        border: '1px solid rgba(213, 183, 122, 0.35)',
        boxShadow: '0 2px 12px rgba(73, 55, 43, 0.05)',
      }}
    >
      {/* Subtle handmade paper grain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.3,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23paper)' opacity='0.035'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative flex items-center justify-between px-8 py-6">
        {/* Text Content */}
        <div className="flex-1 max-w-lg">
          <h2
            className="font-serif font-bold text-brown leading-tight mb-2.5"
            style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', letterSpacing: '-0.01em' }}
          >
            {t('dashboard.welcomeBannerTitle', 'Your art deserves to be seen.')}
          </h2>
          <p
            className="font-sans text-brown/65 leading-relaxed mb-5"
            style={{ fontSize: '0.875rem' }}
          >
            {t(
              'dashboard.welcomeBannerSubtitle',
              'Preserve your stories. Showcase your creations. Build your digital identity.'
            )}
          </p>
          <button onClick={() => navigate('/artwork')} className="btn-primary">
            <Plus size={15} strokeWidth={2.5} />
            {t('dashboard.quickActions.uploadArtwork', 'Upload Artwork')}
          </button>
        </div>

        {/* Peacock Illustration – refined, elegant, modest scale */}
        <div
          className="flex-shrink-0 pointer-events-none select-none ml-4"
          style={{ width: '9rem', height: '11rem' }}
        >
          <PeacockIllustration className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}
