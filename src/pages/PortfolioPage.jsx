import React, { useState, useEffect } from 'react';
import { initialArtworks } from '../data/artworkData';
import { defaultPortfolioData } from '../data/portfolioData';

import PortfolioHeader from '../components/portfolio/PortfolioHeader';
import PortfolioPublicView from '../components/portfolio/PortfolioPublicView';
import PortfolioEditorModal from '../components/portfolio/PortfolioEditorModal';
import PortfolioShareModal from '../components/portfolio/PortfolioShareModal';
import InquiryModal from '../components/portfolio/InquiryModal';
import { WarliDivider } from '../components/ui/DecorativeElements';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../i18n';

const STORAGE_KEY = 'kalasetu_artisan_portfolio';

export default function PortfolioPage() {
  const { t } = useLanguage();
  // Artisan Portfolio State
  const [portfolio, setPortfolio] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.artisanName) {
          return parsed;
        }
      }
    } catch (e) {}
    return defaultPortfolioData;
  });

  // Artworks collection
  const [artworks] = useState(initialArtworks);

  // Modal States
  const [isEditing, setIsEditing] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [inquiryTargetArtwork, setInquiryTargetArtwork] = useState(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState('');

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolio));
    } catch (e) {}
  }, [portfolio]);

  // Toast auto-clear
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(''), 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (msg) => setToastMessage(msg);

  // Handlers
  const handleSavePortfolio = (updatedPortfolio) => {
    setPortfolio(updatedPortfolio);
    showToast(t('portfolio.savedToast', 'Your portfolio has been saved and updated!'));
  };

  const handleTogglePublish = () => {
    setPortfolio((prev) => {
      const nextStatus = !prev.isPublished;
      showToast(
        nextStatus
          ? t('portfolio.publishedToast', 'Portfolio is now live and shareable!')
          : t('portfolio.draftToast', 'Portfolio set to private draft mode')
      );
      return { ...prev, isPublished: nextStatus };
    });
  };

  const handleOpenInquiry = (art = null) => {
    setInquiryTargetArtwork(art);
    setIsInquiryOpen(true);
  };

  const handleScrollToPreview = () => {
    const elem = document.getElementById('public-portfolio-view');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="px-6 py-6 max-w-7xl mx-auto animate-fade-in relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-forest text-white shadow-xl text-xs font-sans font-medium animate-fade-in border border-forest-light">
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── 1. Portfolio Hub Header ── */}
      <PortfolioHeader
        portfolio={portfolio}
        onOpenEdit={() => setIsEditing(true)}
        onOpenShare={() => setIsSharing(true)}
        onTogglePublish={handleTogglePublish}
        onScrollToPreview={handleScrollToPreview}
      />

      {/* ── 2. Live Public Portfolio View ── */}
      <PortfolioPublicView
        portfolio={portfolio}
        artworks={artworks}
        onOpenInquiry={handleOpenInquiry}
        onOpenEdit={() => setIsEditing(true)}
      />

      {/* ── 3. Bottom Warli Heritage Divider ── */}
      <div className="mt-12 pb-4">
        <WarliDivider className="w-full opacity-60" />
      </div>

      {/* ── Modals & Drawers ── */}
      {/* Guided Portfolio Editor */}
      <PortfolioEditorModal
        portfolio={portfolio}
        availableArtworks={artworks}
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSave={handleSavePortfolio}
      />

      {/* Share Portfolio Modal */}
      <PortfolioShareModal
        portfolio={portfolio}
        isOpen={isSharing}
        onClose={() => setIsSharing(false)}
      />

      {/* Direct Buyer / Patron Inquiry Modal */}
      <InquiryModal
        selectedArtwork={inquiryTargetArtwork}
        artisanName={portfolio.artisanName}
        isOpen={isInquiryOpen}
        onClose={() => {
          setIsInquiryOpen(false);
          setInquiryTargetArtwork(null);
        }}
        onSent={() => showToast('Inquiry sent directly to Ivy Maiti!')}
      />
    </div>
  );
}
