import React from 'react';
import { Search, LayoutGrid, Landmark, ChevronDown } from 'lucide-react';
import { artFormOptions, statusOptions, sortOptions } from '../../data/artworkData';
import { useLanguage } from '../../i18n';

export default function ArtworkToolbar({
  searchQuery,
  onSearchChange,
  artFormFilter,
  onArtFormChange,
  statusFilter,
  onStatusChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  artworks,
}) {
  const { t } = useLanguage();

  // Dynamic counts for category chips
  const totalCount = artworks.length;
  const getCategoryCount = (form) => {
    if (form === 'All') return totalCount;
    return artworks.filter((a) => a.artForm === form).length;
  };

  const getSortLabel = (val) => {
    switch (val) {
      case 'newest':
        return t('artwork.newest', 'Sort by: Newest');
      case 'oldest':
        return t('artwork.oldest', 'Sort by: Oldest');
      case 'title_asc':
        return t('artwork.titleAsc', 'Sort by: Title A-Z');
      case 'title_desc':
        return t('artwork.titleDesc', 'Sort by: Title Z-A');
      default:
        return val;
    }
  };

  const getStatusOptionLabel = (opt) => {
    if (opt === 'All') return t('artwork.allStatus', 'Status: All');
    if (opt === 'Published') return `${t('common.status', 'Status')}: ${t('common.published', 'Published')}`;
    if (opt === 'Draft') return `${t('common.status', 'Status')}: ${t('common.draft', 'Draft')}`;
    return opt;
  };

  return (
    <div className="mb-6 space-y-3">
      {/* ── Top Controls Row ── */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brown/40"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t('artwork.searchPlaceholder', 'Search your artwork...')}
            className="w-full pl-9 pr-4 py-2 bg-beige-light border border-beige-dark/60 rounded-xl text-sm font-sans text-brown placeholder-brown/40 focus:outline-none focus:border-terracotta/40 focus:ring-1 focus:ring-terracotta/20 transition-all"
          />
        </div>

        {/* Filter & Sort Dropdowns + View Mode Toggle */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Art Form Filter */}
          <div className="relative">
            <select
              value={artFormFilter}
              onChange={(e) => onArtFormChange(e.target.value)}
              className="appearance-none bg-beige-light border border-beige-dark/60 rounded-xl px-3.5 py-2 pr-8 text-xs font-sans text-brown/80 font-medium focus:outline-none focus:border-terracotta/40 cursor-pointer shadow-sm hover:border-beige-dark"
            >
              {artFormOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt === 'All' ? t('artwork.allArtForms', 'Art Form: All') : `${t('artwork.artForm', 'Art Form')}: ${opt}`}
                </option>
              ))}
            </select>
            <ChevronDown
              size={13}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-brown/45 pointer-events-none"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => onStatusChange(e.target.value)}
              className="appearance-none bg-beige-light border border-beige-dark/60 rounded-xl px-3.5 py-2 pr-8 text-xs font-sans text-brown/80 font-medium focus:outline-none focus:border-terracotta/40 cursor-pointer shadow-sm hover:border-beige-dark"
            >
              {statusOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {getStatusOptionLabel(opt)}
                </option>
              ))}
            </select>
            <ChevronDown
              size={13}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-brown/45 pointer-events-none"
            />
          </div>

          {/* Sort By */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none bg-beige-light border border-beige-dark/60 rounded-xl px-3.5 py-2 pr-8 text-xs font-sans text-brown/80 font-medium focus:outline-none focus:border-terracotta/40 cursor-pointer shadow-sm hover:border-beige-dark"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {getSortLabel(opt.value)}
                </option>
              ))}
            </select>
            <ChevronDown
              size={13}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-brown/45 pointer-events-none"
            />
          </div>

          {/* View Toggle (Grid / Gallery View) */}
          <div className="flex items-center bg-beige-light border border-beige-dark/60 rounded-xl p-0.5 shadow-sm">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-terracotta text-white shadow-sm'
                  : 'text-brown/65 hover:text-brown'
              }`}
              title="Grid View"
            >
              <LayoutGrid size={13} strokeWidth={2} />
              <span>{t('artwork.grid', 'Grid')}</span>
            </button>
            <button
              onClick={() => onViewModeChange('gallery')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all ${
                viewMode === 'gallery'
                  ? 'bg-terracotta text-white shadow-sm'
                  : 'text-brown/65 hover:text-brown'
              }`}
              title="Virtual Gallery View"
            >
              <Landmark size={13} strokeWidth={2} />
              <span>{t('artwork.galleryView', 'Gallery View')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Category Chips Row ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {artFormOptions.map((form) => {
          const count = getCategoryCount(form);
          const isActive = artFormFilter === form;

          return (
            <button
              key={form}
              onClick={() => onArtFormChange(form)}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-sans font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-terracotta text-white shadow-sm'
                  : 'bg-beige-light border border-beige-dark/60 text-brown/70 hover:text-brown hover:bg-beige hover:border-beige-dark'
              }`}
            >
              {form === 'All' ? t('common.all', 'All') : form} ({count})
            </button>
          );
        })}
      </div>
    </div>
  );
}

