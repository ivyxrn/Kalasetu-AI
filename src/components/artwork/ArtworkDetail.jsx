import React, { useState } from 'react';
import {
  X,
  Calendar,
  Sparkles,
  BookOpen,
  Edit3,
  Trash2,
  CheckCircle2,
  Clock,
  Layers,
  Palette,
  Info,
  Maximize2,
  Calculator,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../i18n';

function StatusBadge({ status }) {
  const { t } = useLanguage();
  const isPublished = status === 'Published';
  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-1 rounded-full text-xs font-sans font-medium tracking-wide
        ${isPublished
          ? 'bg-[#EAF3EC] text-[#295738] border border-[#C6DEC9]'
          : 'bg-[#FDF7E9] text-[#856322] border border-[#EDDCBA]'
        }
      `}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full mr-1.5 flex-shrink-0 ${
          isPublished ? 'bg-[#3A7B52]' : 'bg-[#C2963B]'
        }`}
      />
      {isPublished ? t('common.published', 'Published') : t('common.draft', 'Draft')}
    </span>
  );
}

export default function ArtworkDetail({
  artwork,
  onClose,
  onEdit,
  onDelete,
  onToggleStatus,
  onEstimateFairPrice,
}) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [toastMessage, setToastMessage] = useState(null);

  if (!artwork) return null;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateArtStory = () => {
    navigate('/artstory');
  };

  const handleCreateCatalogue = () => {
    navigate('/catalogue');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-brown/50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-60 bg-brown text-ivory text-xs px-4 py-2.5 rounded-xl shadow-lg border border-ochre/30 flex items-center gap-2 animate-slide-in">
          <Sparkles size={14} className="text-ochre" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Modal Card */}
      <div
        className="relative bg-beige-light border border-beige-dark/70 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 w-9 h-9 rounded-full bg-beige hover:bg-beige-dark/40 border border-beige-dark/50 flex items-center justify-center text-brown/60 hover:text-brown transition-colors z-20"
          aria-label={t('common.close', 'Close')}
        >
          <X size={18} />
        </button>

        {/* ── Two-Column Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Artwork Image Display */}
          <div className="lg:col-span-6 flex flex-col items-center">
            {/* Museum Exhibition Matting Frame */}
            <div
              className="w-full rounded-xl p-3 shadow-card-hover border"
              style={{
                backgroundColor: '#F5EFE4',
                borderColor: '#D5B77A',
              }}
            >
              <div
                className="relative overflow-hidden rounded-lg bg-beige-dark/30 shadow-inner"
                style={{ aspectRatio: '16/11' }}
              >
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            {/* Artwork Quick Caption */}
            <p className="text-[11px] font-sans text-brown/45 mt-3 text-center">
              {t('artwork.originalBy', { name: 'Ivy Maiti' }, 'Original traditional Indian creation by Ivy Maiti')}
            </p>
          </div>

          {/* Right Column: Metadata & Narrative */}
          <div className="lg:col-span-6 space-y-5">
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <StatusBadge status={artwork.status} />
                <span className="text-xs font-sans text-brown/50">
                  {artwork.artForm} · {artwork.type}
                </span>
              </div>

              <h2 className="font-serif font-bold text-brown text-2xl sm:text-3xl leading-tight">
                {artwork.title}
              </h2>

              <div className="flex items-center gap-1.5 text-xs text-brown/50 mt-1 font-sans">
                <Calendar size={13} className="opacity-70" />
                <span>{t('artwork.uploadedOn', 'Uploaded on')} {artwork.date}</span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-beige-dark/40" />

            {/* Cultural Description */}
            <div>
              <h3 className="text-xs font-sans font-semibold text-brown uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Info size={13} className="text-terracotta" />
                {t('artwork.aboutCreation', 'About This Creation')}
              </h3>
              <p className="text-xs sm:text-[13px] font-sans text-brown/75 leading-relaxed">
                {artwork.description}
              </p>
            </div>

            {/* Artist's Personal Interpretation */}
            {artwork.interpretation && (
              <div className="bg-beige/60 border border-ochre/25 rounded-xl p-3.5">
                <h3 className="text-xs font-serif font-semibold text-terracotta mb-1">
                  {t('artwork.artistInterpretation', "Artist's Interpretation")}
                </h3>
                <p className="text-xs font-serif italic text-brown/70 leading-relaxed">
                  &ldquo;{artwork.interpretation}&rdquo;
                </p>
              </div>
            )}

            {/* Materials & Techniques Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
              <div className="bg-ivory/80 border border-beige-dark/45 rounded-xl p-3">
                <p className="font-semibold text-brown mb-1 flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-brown/60">
                  <Palette size={12} className="text-forest" />
                  {t('artwork.materialsUsed', 'Materials Used')}
                </p>
                <p className="text-brown/75 leading-snug">
                  {artwork.materials || 'Traditional handmade pigments on canvas/paper'}
                </p>
              </div>

              <div className="bg-ivory/80 border border-beige-dark/45 rounded-xl p-3">
                <p className="font-semibold text-brown mb-1 flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-brown/60">
                  <Layers size={12} className="text-ochre-dark" />
                  {t('artwork.techniques', 'Techniques')}
                </p>
                <p className="text-brown/75 leading-snug">
                  {artwork.techniques || 'Indigenous folk drafting & natural wash'}
                </p>
              </div>
            </div>

            {/* ── Actions Row ── */}
            <div className="pt-2 flex flex-wrap gap-2.5">
              <button
                onClick={() => {
                  onClose();
                  if (onEstimateFairPrice) {
                    onEstimateFairPrice(artwork);
                  }
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-terracotta text-white hover:bg-terracotta-dark shadow-sm text-xs font-sans font-medium transition-colors"
                title="Calculate a fair price based on your time and materials"
              >
                <Calculator size={13} />
                {t('pricing.estimateFairPrice', 'Estimate Fair Price')}
              </button>

              <button
                onClick={() => onEdit(artwork)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-beige border border-beige-dark/70 text-xs font-sans font-medium text-brown hover:bg-beige-dark/40 transition-colors"
              >
                <Edit3 size={13} />
                {t('artwork.editArtwork', 'Edit Artwork')}
              </button>

              <button
                onClick={() => onToggleStatus(artwork.id)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-beige border border-beige-dark/70 text-xs font-sans font-medium text-brown hover:bg-beige-dark/40 transition-colors"
              >
                {artwork.status === 'Published' ? (
                  <>
                    <Clock size={13} className="text-ochre-dark" />
                    {t('artwork.moveToDrafts', 'Move to Drafts')}
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={13} className="text-forest" />
                    {t('artwork.publishToPortfolio', 'Publish to Portfolio')}
                  </>
                )}
              </button>

              <button
                onClick={handleCreateArtStory}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-forest/10 border border-forest/20 text-xs font-sans font-medium text-forest hover:bg-forest/15 transition-colors"
                title="Create AI ArtStory for this artwork"
              >
                <Sparkles size={13} />
                {t('artwork.createArtStory', 'Create ArtStory')}
              </button>

              <button
                onClick={handleCreateCatalogue}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-ochre/15 border border-ochre/30 text-xs font-sans font-medium text-brown hover:bg-ochre/25 transition-colors"
                title="Add to Exhibition Catalogue"
              >
                <BookOpen size={13} />
                {t('artwork.catalogueListing', 'Catalogue Listing')}
              </button>

              <button
                onClick={() => onDelete(artwork)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-terracotta/10 border border-terracotta/20 text-xs font-sans font-medium text-terracotta hover:bg-terracotta/15 transition-colors ml-auto"
                title="Delete this artwork"
              >
                <Trash2 size={13} />
                {t('common.delete', 'Delete')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

