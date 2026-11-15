import React, { useState } from 'react';
import { X, Copy, Check, Share2, MessageCircle, QrCode, Download, ExternalLink } from 'lucide-react';
import { LotusLogo } from '../ui/DecorativeElements';
import { useLanguage } from '../../i18n';

export default function PortfolioShareModal({ portfolio, isOpen, onClose }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const portfolioUrl = 'https://kalasetu.ai/ivy-maiti';
  const whatsappShareText = `Namaste! Explore my traditional Indian handmade artwork and craft story on KalaSetu AI: ${portfolioUrl}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(portfolioUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-brown/70 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-md bg-ivory rounded-3xl border border-beige-dark/70 shadow-2xl p-6 sm:p-8 text-center">
        <button
          onClick={onClose}
          aria-label={t('common.close', 'Close')}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-beige text-brown/50 hover:text-brown"
        >
          <X size={16} />
        </button>

        <div className="w-14 h-14 rounded-full bg-forest/10 text-forest flex items-center justify-center mx-auto mb-3">
          <Share2 size={24} />
        </div>

        <h3 className="font-serif font-bold text-brown text-xl mb-1">
          {t('portfolio.shareTitle', 'Share Your Portfolio')}
        </h3>
        <p className="font-sans text-xs text-brown/65 mb-6 leading-relaxed">
          {t('portfolio.shareDesc', 'Share your handmade creations and story directly with art collectors, exhibition curators, family, and customers on WhatsApp.')}
        </p>

        {/* QR Code Presentation Box */}
        <div className="p-5 rounded-2xl bg-ivory border-2 border-dashed border-ochre/50 mb-6 max-w-[220px] mx-auto shadow-sm">
          {/* Authentic Stylized QR Code SVG */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-auto text-brown"
            fill="currentColor"
          >
            {/* Corner position markers */}
            <rect x="5" y="5" width="25" height="25" fill="#49372B" />
            <rect x="8" y="8" width="19" height="19" fill="#F7F3EA" />
            <rect x="12" y="12" width="11" height="11" fill="#49372B" />

            <rect x="70" y="5" width="25" height="25" fill="#49372B" />
            <rect x="73" y="8" width="19" height="19" fill="#F7F3EA" />
            <rect x="77" y="12" width="11" height="11" fill="#49372B" />

            <rect x="5" y="70" width="25" height="25" fill="#49372B" />
            <rect x="8" y="73" width="19" height="19" fill="#F7F3EA" />
            <rect x="12" y="77" width="11" height="11" fill="#49372B" />

            {/* Simulated QR data grid dots */}
            <rect x="35" y="8" width="6" height="6" fill="#9D4935" />
            <rect x="45" y="16" width="8" height="6" fill="#49372B" />
            <rect x="57" y="8" width="6" height="8" fill="#49372B" />
            <rect x="35" y="24" width="8" height="6" fill="#49372B" />

            <rect x="10" y="38" width="8" height="8" fill="#49372B" />
            <rect x="25" y="42" width="6" height="6" fill="#9D4935" />
            <rect x="38" y="38" width="24" height="24" fill="#354B3D" rx="2" />
            <circle cx="50" cy="50" r="6" fill="#F7F3EA" />
            <rect x="72" y="38" width="8" height="8" fill="#49372B" />
            <rect x="85" y="45" width="6" height="8" fill="#49372B" />

            <rect x="35" y="70" width="8" height="8" fill="#49372B" />
            <rect x="48" y="76" width="6" height="8" fill="#9D4935" />
            <rect x="60" y="70" width="12" height="6" fill="#49372B" />
            <rect x="76" y="74" width="8" height="8" fill="#49372B" />
            <rect x="88" y="82" width="6" height="10" fill="#49372B" />
          </svg>

          <p className="text-[10px] font-sans text-brown/60 mt-2 font-medium">
            {t('portfolio.scanQrCode', { name: portfolio?.name || 'Ivy Maiti' }, `Scan to view ${portfolio?.name || 'Ivy Maiti'}'s Portfolio`)}
          </p>
        </div>

        {/* Share on WhatsApp Button */}
        <a
          href={`https://wa.me/?text=${encodeURIComponent(whatsappShareText)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full mb-3 py-3 rounded-xl bg-forest hover:bg-forest-light text-white text-xs font-sans font-medium shadow-md transition-all flex items-center justify-center gap-2"
        >
          <MessageCircle size={16} />
          <span>{t('portfolio.shareOnWhatsApp', 'Share directly on WhatsApp')}</span>
        </a>

        {/* Copy Link Input */}
        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-beige-light border border-beige-dark/70">
          <input
            type="text"
            readOnly
            value={portfolioUrl}
            className="flex-1 px-2 text-xs font-sans text-brown/75 bg-transparent focus:outline-none truncate"
          />
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg bg-ivory hover:bg-beige border border-beige-dark/60 text-xs font-sans font-medium text-brown transition-colors flex items-center gap-1 shadow-sm"
          >
            {copied ? (
              <>
                <Check size={13} className="text-forest" />
                <span className="text-forest">{t('common.copied', 'Copied')}</span>
              </>
            ) : (
              <>
                <Copy size={13} className="text-brown/60" />
                <span>{t('common.copy', 'Copy Link')}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
