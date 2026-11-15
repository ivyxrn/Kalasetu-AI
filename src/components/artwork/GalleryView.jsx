import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Eye,
  Maximize2,
  Minimize2,
  Sun,
  Moon,
  Sparkles,
  BookOpen,
  Info,
  Calendar,
  X,
  Palette,
  Layers,
  RotateCcw,
  Upload,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LotusLogo } from '../ui/DecorativeElements';
import { useLanguage } from '../../i18n';

export default function GalleryView({
  artworks,
  onSelect,
  onBackToGrid,
  onOpenUpload,
  onResetFilters,
}) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const galleryRef = useRef(null);

  // Gallery Navigation State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInspectMode, setIsInspectMode] = useState(false);
  const [lightingMode, setLightingMode] = useState('spotlight'); // 'spotlight' | 'daylight'
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 3D Tilt State for center active painting
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHoveredCenter, setIsHoveredCenter] = useState(false);

  // Touch Swipe coordinates
  const touchStartX = useRef(null);

  // Fullscreen event listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isInspectMode) {
          setIsInspectMode(false);
        } else {
          onBackToGrid();
        }
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Enter' || e.key === ' ') {
        if (!isInspectMode && artworks.length > 0) {
          setIsInspectMode(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, artworks.length, isInspectMode]);

  // Clamp current index if artworks array shrinks
  useEffect(() => {
    if (currentIndex >= artworks.length && artworks.length > 0) {
      setCurrentIndex(artworks.length - 1);
    }
  }, [artworks.length, currentIndex]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  const handlePrev = () => {
    if (artworks.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? artworks.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (artworks.length === 0) return;
    setCurrentIndex((prev) => (prev === artworks.length - 1 ? 0 : prev + 1));
  };

  const toggleFullscreen = () => {
    if (!galleryRef.current) return;
    if (!document.fullscreenElement) {
      galleryRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Center painting interactive 3D tilt calculation
  const handleMouseMoveCenter = (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5.5;
    const rotateY = ((x - centerX) / centerX) * 5.5;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeaveCenter = () => {
    setIsHoveredCenter(false);
    setTilt({ x: 0, y: 0 });
  };

  // ─── EMPTY STATE: The Artist's Empty Exhibition Studio ─────────────────────────
  if (!artworks || artworks.length === 0) {
    return (
      <div
        ref={galleryRef}
        className="relative mb-8 rounded-2xl overflow-hidden border border-beige-dark/60 shadow-xl transition-all animate-fade-in"
        style={{
          background: 'linear-gradient(180deg, #F5EFE4 0%, #EFE7DA 70%, #E3D8C6 100%)',
          minHeight: '520px',
        }}
      >
        {/* Top Minimal Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-beige-dark/40 bg-ivory/60 backdrop-blur-sm">
          <button
            onClick={onBackToGrid}
            className="flex items-center gap-2 text-xs font-sans font-medium text-brown hover:text-terracotta transition-colors px-3 py-1.5 rounded-lg hover:bg-beige"
          >
            <LayoutGrid size={14} />
            <span>{t('artwork.returnToGridView', 'Return to Grid View')}</span>
          </button>
          <div className="flex items-center gap-2">
            <LotusLogo size={20} />
            <span className="font-serif font-semibold text-brown text-sm">
              {t('artwork.galleryTitle', 'My Art Gallery')}
            </span>
          </div>
        </div>

        {/* Empty Studio Room with Easel Illusion */}
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
          {/* Spotlight over empty easel */}
          <div
            className="w-48 h-48 rounded-full mb-6 flex items-center justify-center border-2 border-dashed border-ochre/40 shadow-inner"
            style={{
              background:
                'radial-gradient(circle, rgba(255,252,242,0.9) 0%, rgba(245,239,228,0.4) 70%, transparent 100%)',
            }}
          >
            <Palette size={48} className="text-ochre-dark opacity-70" strokeWidth={1.5} />
          </div>

          <h3 className="font-serif font-bold text-brown text-2xl mb-2">
            {t('artwork.emptyGalleryTitle', 'Your Exhibition Wall Awaits Its First Masterpiece')}
          </h3>
          <p className="font-sans text-brown/60 text-sm max-w-md mx-auto mb-6 leading-relaxed">
            {t('artwork.emptyGalleryDesc', 'No artworks currently match your gallery filters. Upload a traditional creation or reset your search to fill these gallery walls.')}
          </p>

          <div className="flex items-center gap-3">
            {onResetFilters && (
              <button
                onClick={onResetFilters}
                className="px-4 py-2 rounded-lg bg-beige border border-beige-dark/70 text-xs font-sans font-medium text-brown hover:bg-beige-dark/30 transition-colors flex items-center gap-1.5"
              >
                <RotateCcw size={13} />
                {t('artwork.resetFilters', 'Reset Filters')}
              </button>
            )}
            {onOpenUpload && (
              <button onClick={onOpenUpload} className="btn-primary text-xs">
                <Upload size={14} />
                {t('artwork.uploadNew', 'Upload New Artwork')}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const currentArtwork = artworks[currentIndex] || artworks[0];

  return (
    <div
      ref={galleryRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`relative mb-8 rounded-2xl overflow-hidden border border-beige-dark/70 shadow-2xl transition-all duration-300 animate-fade-in ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none mb-0 border-none h-screen' : ''
      }`}
      style={{
        backgroundColor: '#F5EFE4',
      }}
    >
      {/* ── 1. Floating Gallery Top Navigation HUD ── */}
      <div className="relative z-30 flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-ivory/85 backdrop-blur-md border-b border-beige-dark/45 shadow-sm">
        {/* Left: Return to Grid View Button */}
        <button
          onClick={onBackToGrid}
          className="flex items-center gap-2 text-xs font-sans font-medium text-brown hover:text-terracotta transition-colors px-3 py-1.5 rounded-lg hover:bg-beige/70 border border-beige-dark/40 shadow-sm bg-ivory"
          title={t('artwork.returnToGrid', 'Return to Grid')}
        >
          <LayoutGrid size={14} className="text-terracotta" />
          <span>{t('artwork.returnToGrid', 'Return to Grid')}</span>
        </button>

        {/* Center: Gallery Title & Curated Exhibition Status */}
        <div className="flex items-center gap-2.5">
          <LotusLogo size={22} />
          <div>
            <h2 className="font-serif font-bold text-brown text-sm sm:text-base leading-none tracking-tight">
              {t('artwork.galleryTitle', 'My Art Gallery')}
            </h2>
            <p className="text-[10.5px] font-sans text-brown/50 mt-0.5">
              {t('artwork.exhibitionPiece', {
                current: currentIndex + 1,
                total: artworks.length,
                artForm: currentArtwork.artForm,
              }, `Exhibition Piece ${currentIndex + 1} of ${artworks.length} · ${currentArtwork.artForm}`)}
            </p>
          </div>
        </div>

        {/* Right: Lighting Ambiance & Fullscreen Controls */}
        <div className="flex items-center gap-2">
          {/* Inspect Mode Toggle */}
          <button
            onClick={() => setIsInspectMode((v) => !v)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-medium border transition-all ${
              isInspectMode
                ? 'bg-terracotta text-white border-terracotta shadow-sm'
                : 'bg-ivory border-beige-dark/50 text-brown/70 hover:text-brown hover:bg-beige/60'
            }`}
            title={isInspectMode ? t('artwork.wallView', 'Wall View') : t('artwork.inspectDetails', 'Inspect Details')}
          >
            <Eye size={13} />
            <span className="hidden sm:inline">
              {isInspectMode ? t('artwork.wallView', 'Wall View') : t('artwork.inspectDetails', 'Inspect Details')}
            </span>
          </button>

          {/* Lighting Mode Toggle */}
          <button
            onClick={() =>
              setLightingMode((prev) =>
                prev === 'spotlight' ? 'daylight' : 'spotlight'
              )
            }
            className="w-8 h-8 rounded-lg bg-ivory border border-beige-dark/50 text-brown/65 hover:text-brown flex items-center justify-center transition-colors shadow-sm"
            title={
              lightingMode === 'spotlight'
                ? t('artwork.switchDaylight', 'Switch to Natural Gallery Daylight')
                : t('artwork.switchSpotlight', 'Switch to Focused Museum Spotlight')
            }
          >
            {lightingMode === 'spotlight' ? (
              <Sun size={14} className="text-ochre-dark" />
            ) : (
              <Moon size={14} className="text-brown/70" />
            )}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="w-8 h-8 rounded-lg bg-ivory border border-beige-dark/50 text-brown/65 hover:text-brown flex items-center justify-center transition-colors shadow-sm"
            title={isFullscreen ? t('artwork.exitFullscreen', 'Exit Fullscreen') : t('artwork.enterFullscreen', 'Enter Fullscreen Exhibition')}
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>
      </div>

      {/* ── 2. The 3D Virtual Gallery Room Stage ── */}
      <div
        className="relative overflow-hidden flex flex-col justify-between"
        style={{
          minHeight: isFullscreen ? 'calc(100vh - 120px)' : '620px',
          background:
            lightingMode === 'spotlight'
              ? 'radial-gradient(ellipse at 50% 28%, #FAF6EE 0%, #EDE4D3 55%, #DCD1BE 100%)'
              : 'linear-gradient(180deg, #FBF8F2 0%, #F3EDE0 60%, #E7DDCF 100%)',
        }}
      >
        {/* Architectural Overhead Picture Rail / Crown Molding */}
        <div
          className="absolute top-0 left-0 right-0 h-4 border-b pointer-events-none z-10"
          style={{
            backgroundColor: '#3E291C',
            borderColor: '#C4A163',
            boxShadow: '0 4px 10px rgba(0,0,0,0.18)',
          }}
        >
          {/* Subtle brass hanging hooks illusion along the rail */}
          <div className="w-full h-full flex justify-around opacity-40">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="w-1.5 h-full bg-[#D5B77A]" />
            ))}
          </div>
        </div>

        {/* Dynamic Gallery Lighting Spotlight Beam */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[480px] pointer-events-none transition-opacity duration-700"
          style={{
            opacity: lightingMode === 'spotlight' ? 0.75 : 0.25,
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(255, 255, 248, 0.95) 0%, rgba(255, 248, 230, 0.45) 50%, transparent 75%)',
          }}
        />

        {/* ── 3D Wall Perspective Promenade Stage ── */}
        <div
          className="relative flex-1 flex items-center justify-center px-4 py-8 overflow-hidden"
          style={{
            perspective: '1200px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Floating Navigation Controls (Left & Right) */}
          <button
            onClick={handlePrev}
            className="absolute left-3 sm:left-6 md:left-10 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-ivory/95 hover:bg-ivory border border-beige-dark/70 text-brown shadow-xl flex items-center justify-center transition-all duration-200 z-30 group hover:scale-105 active:scale-95"
            aria-label="Previous artwork"
            title="Previous painting (Left arrow key)"
          >
            <ChevronLeft
              size={22}
              className="text-brown group-hover:-translate-x-0.5 transition-transform"
            />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-3 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-ivory/95 hover:bg-ivory border border-beige-dark/70 text-brown shadow-xl flex items-center justify-center transition-all duration-200 z-30 group hover:scale-105 active:scale-95"
            aria-label="Next artwork"
            title="Next painting (Right arrow key)"
          >
            <ChevronRight
              size={22}
              className="text-brown group-hover:translate-x-0.5 transition-transform"
            />
          </button>

          {/* ── Wall Render: Inspect Mode vs Promenade Mode ── */}
          {isInspectMode ? (
            /* ── A. Close-Up Curator Inspection View ── */
            <div className="relative z-20 max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-ivory/90 backdrop-blur-md border border-beige-dark/70 rounded-2xl p-6 sm:p-8 shadow-2xl animate-fade-in">
              {/* Close Inspect Button */}
              <button
                onClick={() => setIsInspectMode(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-beige hover:bg-beige-dark/40 border border-beige-dark/50 flex items-center justify-center text-brown/60 hover:text-brown transition-colors z-20"
                title="Exit close-up inspect view (Esc)"
              >
                <X size={16} />
              </button>

              {/* Left Column: Framed Masterpiece */}
              <div className="lg:col-span-7 flex flex-col items-center">
                <div
                  className="relative rounded-xl p-3 sm:p-4 transition-transform duration-300"
                  style={{
                    backgroundColor: '#2F1E15',
                    backgroundImage: 'linear-gradient(135deg, #3E291C 0%, #25160E 100%)',
                    border: '3px solid #C4A163',
                    boxShadow:
                      '0 25px 45px -10px rgba(46, 33, 26, 0.45), 0 8px 18px -4px rgba(46, 33, 26, 0.22)',
                  }}
                >
                  <div
                    className="p-3 sm:p-4 rounded-sm border"
                    style={{
                      backgroundColor: '#F8F5EE',
                      borderColor: '#D5B77A',
                    }}
                  >
                    <div
                      className="relative overflow-hidden rounded-sm"
                      style={{ aspectRatio: '16/11', maxHeight: '380px' }}
                    >
                      <img
                        src={currentArtwork.imageUrl}
                        alt={currentArtwork.title}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  </div>
                </div>

                <p className="text-[11px] font-sans text-brown/50 mt-3 text-center">
                  {t('artwork.originalBy', { name: 'Ivy Maiti' }, 'Original traditional Indian creation by Ivy Maiti')}
                </p>
              </div>

              {/* Right Column: Exhibition Placard & Cultural Story */}
              <div className="lg:col-span-5 space-y-4">
                {/* Brass Plaque Header */}
                <div
                  className="p-4 rounded-lg border shadow-sm"
                  style={{
                    background: 'linear-gradient(180deg, #F2E3C6 0%, #E2C799 100%)',
                    borderColor: '#C4A163',
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-terracotta">
                      {currentArtwork.artForm} · {currentArtwork.type}
                    </span>
                    <span className="text-[10px] font-sans text-brown/50">
                      {currentArtwork.date}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-brown text-xl leading-snug">
                    {currentArtwork.title}
                  </h3>
                  <p className="text-xs font-sans text-brown/65 mt-0.5">
                    {t('artwork.artistLabel', 'Artist')}: <span className="font-semibold text-brown">Ivy Maiti</span>
                  </p>
                </div>

                {/* Cultural Narrative */}
                <div className="bg-ivory/80 border border-beige-dark/50 rounded-xl p-4">
                  <h4 className="text-xs font-sans font-semibold text-brown uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                    <Info size={13} className="text-terracotta" />
                    {t('artwork.culturalSignificance', 'Cultural Significance')}
                  </h4>
                  <p className="text-xs font-sans text-brown/75 leading-relaxed">
                    {currentArtwork.description}
                  </p>
                </div>

                {/* Personal Story Quote */}
                {currentArtwork.interpretation && (
                  <div className="bg-beige/60 border border-ochre/30 rounded-xl p-3.5">
                    <h4 className="text-xs font-serif font-semibold text-terracotta mb-1">
                      {t('artwork.artistVoice', "Artist's Voice")}
                    </h4>
                    <p className="text-xs font-serif italic text-brown/70 leading-relaxed">
                      &ldquo;{currentArtwork.interpretation}&rdquo;
                    </p>
                  </div>
                )}

                {/* Materials & Technique Badges */}
                <div className="text-[11px] font-sans space-y-1 text-brown/60">
                  <p>
                    <strong className="text-brown">{t('artwork.materialsUsed', 'Materials')}:</strong>{' '}
                    {currentArtwork.materials || 'Traditional natural dyes and pigments'}
                  </p>
                  <p>
                    <strong className="text-brown">{t('artwork.techniques', 'Technique')}:</strong>{' '}
                    {currentArtwork.techniques || 'Fine indigenous folk rendering'}
                  </p>
                </div>

                {/* Actions inside Inspect Mode */}
                <div className="pt-2 flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => onSelect(currentArtwork)}
                    className="btn-primary text-xs flex-1 justify-center"
                  >
                    <BookOpen size={13} />
                    {t('artwork.fullCuratorDetails', 'Full Curator Details')}
                  </button>
                  <button
                    onClick={() => navigate('/artstory')}
                    className="px-3.5 py-2 rounded-lg bg-forest/10 border border-forest/25 text-xs font-sans font-medium text-forest hover:bg-forest/15 transition-colors flex items-center gap-1.5"
                    title={t('artwork.createArtStory', 'Generate AI ArtStory for this painting')}
                  >
                    <Sparkles size={13} />
                    {t('artwork.exploreArtStory', 'Explore ArtStory')}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* ── B. 3D Wall Promenade View (Spatial physical arrangement) ── */
            <div className="relative w-full max-w-6xl h-[420px] flex items-center justify-center">
              {artworks.map((artwork, idx) => {
                const offset = idx - currentIndex;

                // Only render items within 2 steps of current focus to maximize 60fps performance
                if (Math.abs(offset) > 2) return null;

                const isCenter = offset === 0;
                const isLeft = offset < 0;
                const isRight = offset > 0;

                // 3D positioning transform matrix
                let transform = '';
                let zIndex = 10;
                let opacity = 1;

                if (isCenter) {
                  const tiltX = isHoveredCenter ? tilt.x.toFixed(2) : 0;
                  const tiltY = isHoveredCenter ? tilt.y.toFixed(2) : 0;
                  transform = `translateX(0px) translateZ(40px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1)`;
                  zIndex = 30;
                } else if (offset === -1) {
                  transform =
                    'translateX(-340px) translateZ(-80px) rotateY(24deg) scale(0.85)';
                  zIndex = 20;
                  opacity = 0.85;
                } else if (offset === 1) {
                  transform =
                    'translateX(340px) translateZ(-80px) rotateY(-24deg) scale(0.85)';
                  zIndex = 20;
                  opacity = 0.85;
                } else if (offset === -2) {
                  transform =
                    'translateX(-600px) translateZ(-200px) rotateY(38deg) scale(0.72)';
                  zIndex = 10;
                  opacity = 0.45;
                } else if (offset === 2) {
                  transform =
                    'translateX(600px) translateZ(-200px) rotateY(-38deg) scale(0.72)';
                  zIndex = 10;
                  opacity = 0.45;
                }

                return (
                  <div
                    key={artwork.id}
                    onClick={() => {
                      if (isCenter) {
                        setIsInspectMode(true);
                      } else {
                        setCurrentIndex(idx);
                      }
                    }}
                    onMouseMove={isCenter ? handleMouseMoveCenter : undefined}
                    onMouseEnter={isCenter ? () => setIsHoveredCenter(true) : undefined}
                    onMouseLeave={isCenter ? handleMouseLeaveCenter : undefined}
                    className="absolute cursor-pointer select-none transition-all duration-500 ease-out flex flex-col items-center"
                    style={{
                      transform,
                      zIndex,
                      opacity,
                      transformStyle: 'preserve-3d',
                      width: 'min(480px, 85vw)',
                    }}
                  >
                    {/* Hanging Wire from Rail */}
                    <div className="w-32 h-6 flex justify-between px-3 pointer-events-none opacity-40">
                      <div className="w-px h-full bg-[#5C402E]" />
                      <div className="w-px h-full bg-[#5C402E]" />
                    </div>

                    {/* Handcrafted Teak & Gilded Frame */}
                    <div
                      className="relative rounded-lg p-3 sm:p-4 group/frame transition-all duration-300"
                      style={{
                        backgroundColor: '#2F1E15',
                        backgroundImage:
                          'linear-gradient(135deg, #3E291C 0%, #25160E 100%)',
                        border: '3px solid #C4A163',
                        boxShadow: isCenter
                          ? '0 30px 60px -12px rgba(46, 33, 26, 0.45), 0 12px 24px -5px rgba(46, 33, 26, 0.25)'
                          : '0 16px 30px -8px rgba(46, 33, 26, 0.35)',
                      }}
                    >
                      {/* Linen Archival Matboard */}
                      <div
                        className="p-3 sm:p-4 rounded-sm border"
                        style={{
                          backgroundColor: '#F8F5EE',
                          borderColor: '#D5B77A',
                          boxShadow: 'inset 0 0 6px rgba(73, 55, 43, 0.15)',
                        }}
                      >
                        {/* Canvas Image Container */}
                        <div
                          className="relative overflow-hidden rounded-sm bg-brown/10"
                          style={{ aspectRatio: '16/10' }}
                        >
                          <img
                            src={artwork.imageUrl}
                            alt={artwork.title}
                            className={`w-full h-full object-cover object-center transition-transform duration-500 ${
                              isCenter ? 'group-hover/frame:scale-[1.03]' : ''
                            }`}
                            loading="lazy"
                          />

                          {/* Specular Museum Glass Glaze */}
                          <div
                            className="absolute inset-0 pointer-events-none opacity-30 transition-opacity"
                            style={{
                              background:
                                'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 45%)',
                            }}
                          />

                          {/* Hover Focus Prompt for Center Painting */}
                          {isCenter && (
                            <div className="absolute inset-0 bg-brown/20 opacity-0 group-hover/frame:opacity-100 flex items-center justify-center transition-opacity">
                              <span className="px-3 py-1.5 rounded-full bg-ivory text-brown text-xs font-sans font-medium flex items-center gap-1.5 shadow-lg">
                                <Eye size={13} className="text-terracotta" />
                                {t('artwork.clickToInspect', 'Click to Inspect')}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* ── Wall Mounted Brass Exhibition Placard ── */}
                    {isCenter && (
                      <div
                        className="mt-4 px-5 py-2.5 rounded-sm text-center shadow-md border animate-fade-in"
                        style={{
                          background:
                            'linear-gradient(180deg, #EAD4AA 0%, #CEAF75 100%)',
                          borderColor: '#B89658',
                          boxShadow: '0 4px 10px rgba(46, 33, 26, 0.18)',
                          minWidth: '240px',
                        }}
                      >
                        {/* Brass Screws in Placard Corners */}
                        <div className="flex items-center justify-between text-[#5C402E] opacity-50 text-[8px] -mb-1 px-1">
                          <span>+</span>
                          <span>+</span>
                        </div>

                        <h4
                          className="font-serif font-bold text-[#342215] text-sm sm:text-base leading-tight tracking-wide"
                          style={{ letterSpacing: '0.02em' }}
                        >
                          {artwork.title}
                        </h4>
                        <p className="text-[11px] font-sans text-[#523A29] font-medium mt-0.5">
                          Ivy Maiti · {artwork.artForm} ({artwork.type})
                        </p>

                        <div className="flex items-center justify-between text-[#5C402E] opacity-50 text-[8px] -mt-1 px-1">
                          <span>+</span>
                          <span>+</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── 3. Realistic Polished Gallery Hardwood Floor ── */}
        <div
          className="relative h-28 w-full border-t z-10 overflow-hidden pointer-events-none"
          style={{
            backgroundColor: '#2A1A10',
            borderColor: '#3D281C',
            backgroundImage: `
              linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 35%, rgba(0,0,0,0.65) 100%),
              repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 48px),
              linear-gradient(135deg, #2E1B10 0%, #1D1109 100%)
            `,
          }}
        >
          {/* Subtle Inverted Specular Reflection of Active Painting on Floor */}
          {!isInspectMode && currentArtwork && (
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-20 opacity-15 overflow-hidden blur-[3px]"
              style={{
                transform: 'scaleY(-1)',
                maskImage: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
              }}
            >
              <img
                src={currentArtwork.imageUrl}
                alt="Floor Reflection"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Perspective Floor Baseboard Trim */}
          <div
            className="w-full h-2 border-b"
            style={{
              backgroundColor: '#4A3020',
              borderColor: '#63422C',
            }}
          />
        </div>
      </div>

      {/* ── 4. Bottom Exhibition Thumbnail Filmstrip & Quick Navigation ── */}
      <div className="relative z-20 px-5 py-3.5 bg-ivory/95 border-t border-beige-dark/50 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-inner">
        {/* Quick Keyboard Navigation Tip */}
        <div className="flex items-center gap-2 text-[11px] font-sans text-brown/50">
          <span className="hidden md:inline px-1.5 py-0.5 rounded bg-beige border border-beige-dark/50 text-[10px] font-mono">
            &larr; &rarr;
          </span>
          <span className="hidden md:inline">{t('artwork.useArrowKeys', 'Use arrow keys to walk')}</span>
          <span className="hidden md:inline text-brown/30">&bull;</span>
          <span>{t('artwork.clickToFocus', 'Click to focus')}</span>
          <span className="text-brown/30">&bull;</span>
          <span>{t('artwork.escExits', 'Esc exits')}</span>
        </div>

        {/* Thumbnail Filmstrip */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 scrollbar-none">
          {artworks.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentIndex(idx);
                setIsInspectMode(false);
              }}
              className={`relative flex-shrink-0 w-14 h-9 rounded-md overflow-hidden border-2 transition-all ${
                idx === currentIndex
                  ? 'border-terracotta scale-105 shadow-md ring-1 ring-terracotta/40'
                  : 'border-transparent opacity-50 hover:opacity-90'
              }`}
              title={`${item.title} (${item.artForm})`}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Next / Previous Quick Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePrev}
            className="px-2.5 py-1 rounded bg-beige hover:bg-beige-dark/40 text-xs font-sans text-brown border border-beige-dark/50 transition-colors"
          >
            {t('artwork.previous', 'Previous')}
          </button>
          <button
            onClick={handleNext}
            className="px-2.5 py-1 rounded bg-terracotta text-white hover:bg-terracotta-dark text-xs font-sans transition-colors"
          >
            {t('artwork.next', 'Next')}
          </button>
        </div>
      </div>
    </div>
  );
}
