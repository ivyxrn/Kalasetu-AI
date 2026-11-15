import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { initialArtworks } from '../data/artworkData';
import { initialSavedStories } from '../data/storyData';
import { initialCatalogues } from '../data/catalogueData';

import CatalogueHeader from '../components/catalogue/CatalogueHeader';
import CatalogueList from '../components/catalogue/CatalogueList';
import CatalogueWorkspace from '../components/catalogue/CatalogueWorkspace';
import CatalogueReaderModal from '../components/catalogue/CatalogueReaderModal';
import DeleteCatalogueModal from '../components/catalogue/DeleteCatalogueModal';
import { WarliDivider } from '../components/ui/DecorativeElements';
import { CheckCircle2 } from 'lucide-react';

const STORAGE_KEY = 'kalasetu_saved_catalogues';

export default function CataloguePage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Catalogues State (persisted in localStorage)
  const [catalogues, setCatalogues] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      // fallback
    }
    return initialCatalogues;
  });

  // Saved Stories for associations
  const [savedStories] = useState(() => {
    try {
      const stored = localStorage.getItem('kalasetu_saved_artstories');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {}
    return initialSavedStories;
  });

  // Workspace Mode (Create or Edit)
  const [isCreating, setIsCreating] = useState(
    location.pathname === '/catalogue/create'
  );
  const [editingCatalogue, setEditingCatalogue] = useState(null);

  // Modals
  const [viewingCatalogue, setViewingCatalogue] = useState(null);
  const [deletingCatalogue, setDeletingCatalogue] = useState(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState('');

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(catalogues));
    } catch (e) {}
  }, [catalogues]);

  // Handle route changes to /catalogue/create
  useEffect(() => {
    if (location.pathname === '/catalogue/create') {
      setIsCreating(true);
      setEditingCatalogue(null);
    }
  }, [location.pathname]);

  // Toast auto-clear
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(''), 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (msg) => setToastMessage(msg);

  // Handlers
  const handleStartCreate = () => {
    setEditingCatalogue(null);
    setIsCreating(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartEdit = (catalogue) => {
    setEditingCatalogue(catalogue);
    setIsCreating(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveCatalogue = (catalogueToSave) => {
    setCatalogues((prev) => {
      const existingIdx = prev.findIndex((c) => c.id === catalogueToSave.id);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = catalogueToSave;
        return updated;
      }
      return [catalogueToSave, ...prev];
    });

    setIsCreating(false);
    setEditingCatalogue(null);
    showToast(`"${catalogueToSave.title}" saved successfully!`);
    navigate('/catalogue');
  };

  const handleDuplicateCatalogue = (cat) => {
    const duplicated = {
      ...cat,
      id: `cat-${Date.now()}`,
      title: `${cat.title} (Curator Copy)`,
      status: 'Draft',
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      rawDate: new Date().toISOString(),
    };
    setCatalogues((prev) => [duplicated, ...prev]);
    showToast(`Duplicated volume "${duplicated.title}"`);
  };

  const handleToggleStatus = (id) => {
    setCatalogues((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const next = c.status === 'Published' ? 'Draft' : 'Published';
          showToast(`Catalogue marked as ${next}`);
          return { ...c, status: next };
        }
        return c;
      })
    );
  };

  const handleDeleteCatalogue = (id) => {
    setCatalogues((prev) => prev.filter((c) => c.id !== id));
    showToast('Catalogue volume deleted');
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

      {/* ── 1. Page Header & Summary Statistics ── */}
      <CatalogueHeader
        catalogues={catalogues}
        onCreateNew={handleStartCreate}
        isCreating={isCreating}
      />

      {/* ── 2. Create / Edit Guided Workspace Studio ── */}
      {isCreating ? (
        <CatalogueWorkspace
          availableArtworks={initialArtworks}
          savedStories={savedStories}
          editingCatalogue={editingCatalogue}
          onSaveCatalogue={handleSaveCatalogue}
          onCancel={() => {
            setIsCreating(false);
            setEditingCatalogue(null);
            navigate('/catalogue');
          }}
        />
      ) : (
        /* ── 3. Your Catalogues Grid & Management ── */
        <CatalogueList
          catalogues={catalogues}
          onViewCatalogue={setViewingCatalogue}
          onEditCatalogue={handleStartEdit}
          onDeleteCatalogue={setDeletingCatalogue}
          onDuplicateCatalogue={handleDuplicateCatalogue}
          onToggleStatus={handleToggleStatus}
          onCreateNew={handleStartCreate}
        />
      )}

      {/* ── 4. Bottom Warli Heritage Divider ── */}
      <div className="mt-8 pb-4">
        <WarliDivider className="w-full opacity-60" />
      </div>

      {/* ── Modals ── */}
      {/* Digital Publication Reader Modal */}
      {viewingCatalogue && (
        <CatalogueReaderModal
          catalogue={viewingCatalogue}
          onClose={() => setViewingCatalogue(null)}
          onEdit={handleStartEdit}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deletingCatalogue && (
        <DeleteCatalogueModal
          catalogue={deletingCatalogue}
          isOpen={!!deletingCatalogue}
          onClose={() => setDeletingCatalogue(null)}
          onConfirm={handleDeleteCatalogue}
        />
      )}
    </div>
  );
}
