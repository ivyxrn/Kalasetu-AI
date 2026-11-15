import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreHorizontal, ArrowRight } from 'lucide-react';
import { recentArtworks } from '../../data/sampleData';
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

function ArtworkCard({ artwork }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="artwork-card group">
      {/* Artwork Image Container – 16:10 aspect ratio */}
      <div className="relative w-full overflow-hidden bg-beige-dark/20" style={{ aspectRatio: '16/10' }}>
        <img
          src={artwork.imageUrl}
          alt={artwork.title}
          className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-300 ease-out"
          loading="lazy"
        />
        {/* Subtle hover overlay */}
        <div className="absolute inset-0 bg-brown/0 group-hover:bg-brown/5 transition-colors duration-250 pointer-events-none" />
      </div>

      {/* Info Content */}
      <div className="px-3.5 pt-3 pb-3.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h4 className="font-serif font-semibold text-brown text-[14px] leading-snug truncate">
              {artwork.title}
            </h4>
            <p className="text-brown/55 text-[11.5px] mt-0.5 font-sans truncate">
              {artwork.artForm} · {artwork.type}
            </p>
            <div className="mt-2">
              <StatusBadge status={artwork.status} />
            </div>
          </div>

          {/* Three-dot action menu */}
          <div className="relative flex-shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(!menuOpen);
              }}
              className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-beige-dark/50 transition-colors"
              aria-label="More options"
            >
              <MoreHorizontal size={15} className="text-brown/45" />
            </button>

            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 top-8 w-40 bg-beige-light border border-beige-dark/55 rounded-xl shadow-card-hover z-20 p-1 animate-fade-in">
                  {[
                    { label: t('common.edit', 'Edit'), action: () => navigate('/artwork') },
                    { label: t('common.details', 'View Details'), action: () => navigate('/artwork') },
                    { label: t('dashboard.quickActions.createArtStory', 'Create ArtStory'), action: () => navigate('/artstory') },
                    { label: t('common.delete', 'Delete'), action: () => navigate('/artwork'), isDanger: true },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen(false);
                        item.action();
                      }}
                      className={`
                        w-full text-left px-3 py-1.5 rounded-lg transition-colors
                        ${item.isDanger
                          ? 'text-terracotta hover:bg-terracotta/8'
                          : 'text-brown/70 hover:text-brown hover:bg-beige'
                        }
                      `}
                      style={{ fontSize: '0.75rem' }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RecentArtworks() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <section className="mb-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3.5">
        <h3 className="font-serif font-semibold text-brown text-base tracking-tight">
          {t('dashboard.recentCreations', 'Recently Added Artworks')}
        </h3>

        <button
          onClick={() => navigate('/artwork')}
          className="flex items-center gap-1.5 text-terracotta font-sans font-medium text-xs hover:gap-2 transition-all duration-200"
        >
          {t('dashboard.viewAllArtworks', 'View All')}
          <ArrowRight size={13} strokeWidth={2} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recentArtworks.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </div>
    </section>
  );
}
