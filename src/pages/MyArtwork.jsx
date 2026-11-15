import React, { useState, useMemo } from 'react';
import { Sparkles } from 'lucide-react';
import ArtworkHeader from '../components/artwork/ArtworkHeader';
import ArtworkStats from '../components/artwork/ArtworkStats';
import ArtworkToolbar from '../components/artwork/ArtworkToolbar';
import ArtworkGrid from '../components/artwork/ArtworkGrid';
import GalleryView from '../components/artwork/GalleryView';
import ArtworkDetail from '../components/artwork/ArtworkDetail';
import ArtworkUpload from '../components/artwork/ArtworkUpload';
import ArtworkEditModal from '../components/artwork/ArtworkEditModal';
import DeleteConfirmModal from '../components/artwork/DeleteConfirmModal';
import MyPriceEstimates from '../components/pricing/MyPriceEstimates';
import PricingCalculatorModal from '../components/pricing/PricingCalculatorModal';
import PriceEstimateDetailModal from '../components/pricing/PriceEstimateDetailModal';
import DeleteEstimateConfirmModal from '../components/pricing/DeleteEstimateConfirmModal';
import { WarliDivider } from '../components/ui/DecorativeElements';
import { initialArtworks } from '../data/artworkData';
import { initialSavedEstimates } from '../data/pricingData';
import { useLanguage } from '../i18n';

export default function MyArtwork() {
  const { t } = useLanguage();
  const [artworks, setArtworks] = useState(initialArtworks);
  const [searchQuery, setSearchQuery] = useState('');
  const [artFormFilter, setArtFormFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'gallery'

  // Modals state
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState(null);
  const [deletingArtwork, setDeletingArtwork] = useState(null);

  // Fair Pricing Assistant state
  const [estimates, setEstimates] = useState(() => {
    try {
      const saved = localStorage.getItem('kalasetu_saved_price_estimates');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to load saved estimates from localStorage:', e);
    }
    return initialSavedEstimates;
  });

  const [estimatingArtwork, setEstimatingArtwork] = useState(null);
  const [editingEstimate, setEditingEstimate] = useState(null);
  const [viewingEstimate, setViewingEstimate] = useState(null);
  const [deletingEstimate, setDeletingEstimate] = useState(null);
  const [pricingToast, setPricingToast] = useState(null);

  // Filter and Sort Pipeline
  const filteredArtworks = useMemo(() => {
    return artworks
      .filter((artwork) => {
        // Search query filter (matches title, art form, description)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchTitle = artwork.title.toLowerCase().includes(q);
          const matchForm = artwork.artForm.toLowerCase().includes(q);
          const matchDesc = (artwork.description || '').toLowerCase().includes(q);
          if (!matchTitle && !matchForm && !matchDesc) return false;
        }

        // Art form filter
        if (artFormFilter !== 'All') {
          if (artwork.artForm !== artFormFilter) return false;
        }

        // Publication status filter
        if (statusFilter !== 'All') {
          if (artwork.status !== statusFilter) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.rawDate) - new Date(a.rawDate);
        }
        if (sortBy === 'oldest') {
          return new Date(a.rawDate) - new Date(b.rawDate);
        }
        if (sortBy === 'title_asc') {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === 'title_desc') {
          return b.title.localeCompare(a.title);
        }
        return 0;
      });
  }, [artworks, searchQuery, artFormFilter, statusFilter, sortBy]);

  // CRUD Handlers
  const handleAddArtwork = (newArtwork) => {
    setArtworks((prev) => [newArtwork, ...prev]);
  };

  const handleUpdateArtwork = (updatedArtwork) => {
    setArtworks((prev) =>
      prev.map((a) => (a.id === updatedArtwork.id ? updatedArtwork : a))
    );
    if (selectedArtwork && selectedArtwork.id === updatedArtwork.id) {
      setSelectedArtwork(updatedArtwork);
    }
  };

  const handleDeleteArtwork = (id) => {
    setArtworks((prev) => prev.filter((a) => a.id !== id));
    if (selectedArtwork && selectedArtwork.id === id) {
      setSelectedArtwork(null);
    }
  };

  const handleToggleStatus = (id) => {
    setArtworks((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const newStatus = a.status === 'Published' ? 'Draft' : 'Published';
          return { ...a, status: newStatus };
        }
        return a;
      })
    );
    if (selectedArtwork && selectedArtwork.id === id) {
      setSelectedArtwork((prev) => ({
        ...prev,
        status: prev.status === 'Published' ? 'Draft' : 'Published',
      }));
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setArtFormFilter('All');
    setStatusFilter('All');
    setSortBy('newest');
  };

  // Fair Pricing Handlers
  const showPricingToast = (msg) => {
    setPricingToast(msg);
    setTimeout(() => setPricingToast(null), 3000);
  };

  const handleSaveEstimate = (savedEstimate) => {
    setEstimates((prev) => {
      const exists = prev.some((e) => e.id === savedEstimate.id);
      const updated = exists
        ? prev.map((e) => (e.id === savedEstimate.id ? savedEstimate : e))
        : [savedEstimate, ...prev];
      try {
        localStorage.setItem(
          'kalasetu_saved_price_estimates',
          JSON.stringify(updated)
        );
      } catch (e) {
        console.warn('Failed to persist estimates:', e);
      }
      return updated;
    });
    setEstimatingArtwork(null);
    setEditingEstimate(null);
    showPricingToast(t('pricing.savedToast', 'Fair price estimate saved to your collection!'));
  };

  const handleDeleteEstimate = (estimateId) => {
    setEstimates((prev) => {
      const updated = prev.filter((e) => e.id !== estimateId);
      try {
        localStorage.setItem(
          'kalasetu_saved_price_estimates',
          JSON.stringify(updated)
        );
      } catch (e) {
        console.warn('Failed to persist estimates:', e);
      }
      return updated;
    });
    setDeletingEstimate(null);
    showPricingToast(t('pricing.deletedToast', 'Estimate deleted.'));
  };

  const handleStartEstimate = (artwork) => {
    setEditingEstimate(null);
    setEstimatingArtwork(artwork);
  };

  const handleEditEstimate = (estimate) => {
    const matched = artworks.find((a) => a.id === estimate.artworkId) || {
      id: estimate.artworkId,
      title: estimate.artworkTitle,
      imageUrl: estimate.artworkImage,
      artForm: estimate.artForm,
      materials: '',
    };
    setEditingEstimate(estimate);
    setEstimatingArtwork(matched);
  };

  return (
    <div className="px-6 py-6 max-w-7xl mx-auto animate-fade-in">
      {/* ── 1. Page Header ── */}
      <ArtworkHeader onOpenUpload={() => setIsUploadOpen(true)} />

      {/* ── 2. Dynamic Statistics ── */}
      <ArtworkStats artworks={artworks} />

      {/* ── 3. Search, Filters & View Toggle Toolbar ── */}
      <ArtworkToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        artFormFilter={artFormFilter}
        onArtFormChange={setArtFormFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        artworks={artworks}
      />

      {/* ── 4. Main Gallery / Grid View ── */}
      {viewMode === 'grid' ? (
        <ArtworkGrid
          artworks={filteredArtworks}
          onSelect={setSelectedArtwork}
          onEdit={setEditingArtwork}
          onDelete={setDeletingArtwork}
          onToggleStatus={handleToggleStatus}
          onResetFilters={handleResetFilters}
          onEstimateFairPrice={handleStartEstimate}
        />
      ) : (
        <GalleryView
          artworks={filteredArtworks}
          onSelect={setSelectedArtwork}
          onBackToGrid={() => setViewMode('grid')}
          onOpenUpload={() => setIsUploadOpen(true)}
          onResetFilters={handleResetFilters}
        />
      )}

      {/* ── 5. Fair Pricing Assistant – My Price Estimates Section ── */}
      <MyPriceEstimates
        estimates={estimates}
        onViewEstimate={setViewingEstimate}
        onEditEstimate={handleEditEstimate}
        onDeleteEstimate={setDeletingEstimate}
        onStartEstimateForFirstArtwork={() => {
          if (artworks.length > 0) {
            handleStartEstimate(artworks[0]);
          }
        }}
      />

      {/* ── 6. Bottom Decorative Heritage Warli Border ── */}
      <div className="mt-8 pb-4">
        <WarliDivider className="w-full opacity-60" />
      </div>

      {/* ── Modals & Drawers ── */}
      {/* Detail Modal */}
      {selectedArtwork && (
        <ArtworkDetail
          artwork={selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
          onEdit={(art) => {
            setSelectedArtwork(null);
            setEditingArtwork(art);
          }}
          onDelete={(art) => {
            setSelectedArtwork(null);
            setDeletingArtwork(art);
          }}
          onToggleStatus={handleToggleStatus}
          onEstimateFairPrice={handleStartEstimate}
        />
      )}

      {/* Upload Modal */}
      <ArtworkUpload
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSave={handleAddArtwork}
      />

      {/* Edit Modal */}
      <ArtworkEditModal
        artwork={editingArtwork}
        isOpen={!!editingArtwork}
        onClose={() => setEditingArtwork(null)}
        onSave={handleUpdateArtwork}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        artwork={deletingArtwork}
        isOpen={!!deletingArtwork}
        onClose={() => setDeletingArtwork(null)}
        onConfirm={handleDeleteArtwork}
      />

      {/* Fair Pricing Calculator Modal */}
      {estimatingArtwork && (
        <PricingCalculatorModal
          artwork={estimatingArtwork}
          existingEstimate={editingEstimate}
          isOpen={!!estimatingArtwork}
          onClose={() => {
            setEstimatingArtwork(null);
            setEditingEstimate(null);
          }}
          onSaveEstimate={handleSaveEstimate}
        />
      )}

      {/* View Saved Price Estimate Modal */}
      {viewingEstimate && (
        <PriceEstimateDetailModal
          estimate={viewingEstimate}
          isOpen={!!viewingEstimate}
          onClose={() => setViewingEstimate(null)}
          onEdit={(est) => {
            setViewingEstimate(null);
            handleEditEstimate(est);
          }}
        />
      )}

      {/* Delete Estimate Confirmation Modal */}
      {deletingEstimate && (
        <DeleteEstimateConfirmModal
          estimate={deletingEstimate}
          isOpen={!!deletingEstimate}
          onClose={() => setDeletingEstimate(null)}
          onConfirm={handleDeleteEstimate}
        />
      )}

      {/* Pricing Toast Notification */}
      {pricingToast && (
        <div className="fixed bottom-6 right-6 z-60 bg-brown text-ivory text-xs px-4 py-2.5 rounded-xl shadow-lg border border-ochre/30 flex items-center gap-2 animate-slide-in">
          <Sparkles size={14} className="text-ochre" />
          <span>{pricingToast}</span>
        </div>
      )}
    </div>
  );
}

