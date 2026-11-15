import React, { useState, useRef } from 'react';
import { MoreHorizontal, Calendar, Eye, Edit3, Trash2, CheckCircle2, Clock, Calculator } from 'lucide-react';
import { useLanguage } from '../../i18n';

function StatusBadge({ status }) {
  const { t } = useLanguage();
  const isPublished = status === 'Published';
  return (
    <span
      className={`
        inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-sans font-medium tracking-wide
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

export default function ArtworkCard({
  artwork,
  onSelect,
  onEdit,
  onDelete,
  onToggleStatus,
  onEstimateFairPrice,
}) {
  const { t } = useLanguage();
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Subtle 3D Tilt calculation
  const handleMouseMove = (e) => {
    // Check for touch / reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Gentle maximum tilt of ~4.5 degrees
    const rotateX = ((y - centerY) / centerY) * -4.5;
    const rotateY = ((x - centerX) / centerX) * 4.5;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(artwork)}
      className="artwork-card group cursor-pointer relative rounded-xl overflow-hidden bg-beige-light border border-beige-dark/55"
      style={{
        transform: isHovered
          ? `perspective(900px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) translateY(-4px) scale3d(1.015, 1.015, 1.015)`
          : 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)',
        transition: isHovered
          ? 'transform 0.1s ease-out, box-shadow 0.25s ease-out'
          : 'transform 0.35s ease-out, box-shadow 0.35s ease-out',
        boxShadow: isHovered
          ? '0 16px 30px -8px rgba(73, 55, 43, 0.16), 0 4px 10px -2px rgba(73, 55, 43, 0.08)'
          : '0 1px 4px rgba(73, 55, 43, 0.08), 0 0 0 1px rgba(73, 55, 43, 0.04)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* ── Artwork Image Container (16:10 aspect ratio) ── */}
      <div
        className="relative w-full overflow-hidden bg-beige-dark/20"
        style={{ aspectRatio: '16/10' }}
      >
        <img
          src={artwork.imageUrl}
          alt={artwork.title}
          className="w-full h-full object-cover object-center group-hover:scale-[1.04] transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Ambient Subtle Reflection Overlay */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: isHovered
              ? 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 60%)'
              : 'none',
          }}
        />
      </div>

      {/* ── Artwork Metadata Content ── */}
      <div className="p-3.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="font-serif font-semibold text-brown text-sm sm:text-[15px] leading-tight truncate">
              {artwork.title}
            </h3>
            <p className="text-brown/55 text-[11.5px] mt-0.5 font-sans truncate">
              {artwork.artForm} · {artwork.type}
            </p>
          </div>

          {/* Three-Dot Options Menu */}
          <div className="relative flex-shrink-0 -mt-1 -mr-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(!menuOpen);
              }}
              className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-beige-dark/50 text-brown/45 hover:text-brown transition-colors"
              aria-label="Options"
              title="More options"
            >
              <MoreHorizontal size={15} />
            </button>

            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(false);
                  }}
                />
                <div className="absolute right-0 top-8 w-44 bg-beige-light border border-beige-dark/65 rounded-xl shadow-card-hover z-40 p-1 animate-fade-in">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpen(false);
                      onSelect(artwork);
                    }}
                    className="w-full flex items-center gap-2 text-left px-3 py-1.5 text-xs text-brown/75 hover:text-brown hover:bg-beige rounded-lg transition-colors"
                  >
                    <Eye size={13} className="text-brown/50" />
                    {t('artwork.viewDetails', 'View Details')}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpen(false);
                      onEdit(artwork);
                    }}
                    className="w-full flex items-center gap-2 text-left px-3 py-1.5 text-xs text-brown/75 hover:text-brown hover:bg-beige rounded-lg transition-colors"
                  >
                    <Edit3 size={13} className="text-brown/50" />
                    {t('artwork.editArtwork', 'Edit Artwork')}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpen(false);
                      if (onEstimateFairPrice) {
                        onEstimateFairPrice(artwork);
                      }
                    }}
                    className="w-full flex items-center gap-2 text-left px-3 py-1.5 text-xs text-brown/75 hover:text-brown hover:bg-beige rounded-lg transition-colors"
                  >
                    <Calculator size={13} className="text-terracotta" />
                    {t('pricing.estimateFairPrice', 'Estimate Fair Price')}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpen(false);
                      onToggleStatus(artwork.id);
                    }}
                    className="w-full flex items-center gap-2 text-left px-3 py-1.5 text-xs text-brown/75 hover:text-brown hover:bg-beige rounded-lg transition-colors"
                  >
                    {artwork.status === 'Published' ? (
                      <>
                        <Clock size={13} className="text-ochre-dark" />
                        {t('artwork.revertToDraft', 'Revert to Draft')}
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={13} className="text-forest" />
                        {t('artwork.publishArtwork', 'Publish Artwork')}
                      </>
                    )}
                  </button>

                  <div className="my-1 h-px bg-beige-dark/40 mx-2" />

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpen(false);
                      onDelete(artwork);
                    }}
                    className="w-full flex items-center gap-2 text-left px-3 py-1.5 text-xs text-terracotta hover:bg-terracotta/8 rounded-lg transition-colors"
                  >
                    <Trash2 size={13} />
                    {t('artwork.deleteArtwork', 'Delete Artwork')}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ── Bottom Meta Row (Status & Date) ── */}
        <div className="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-beige-dark/35">
          <StatusBadge status={artwork.status} />

          <div className="flex items-center gap-1 text-[11px] text-brown/45 font-sans">
            <Calendar size={12} className="opacity-70 flex-shrink-0" />
            <span>{artwork.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

