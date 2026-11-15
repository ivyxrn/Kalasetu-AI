import React, { useState, useEffect, useMemo } from 'react';
import {
  heritageArtForms,
  heritageCategories,
  initialContributions,
} from '../data/heritageData';

import HeritageHeader from '../components/heritage/HeritageHeader';
import ArtFormGrid from '../components/heritage/ArtFormGrid';
import ArtFormDetailView from '../components/heritage/ArtFormDetailView';
import PreserveKnowledgeForm from '../components/heritage/PreserveKnowledgeForm';
import MyContributionsList from '../components/heritage/MyContributionsList';
import ContributionDetailModal from '../components/heritage/ContributionDetailModal';
import { WarliDivider } from '../components/ui/DecorativeElements';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../i18n';

const STORAGE_KEY = 'kalasetu_heritage_contributions';

export default function HeritageArchivePage() {
  const { t } = useLanguage();
  // Navigation & Search State
  const [selectedArtForm, setSelectedArtForm] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Pre-filled craft name for contribution form
  const [contributeCraftName, setContributeCraftName] = useState('');

  // Contributions State (persisted in localStorage)
  const [contributions, setContributions] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {}
    return initialContributions;
  });

  // Modal State
  const [viewingContribution, setViewingContribution] = useState(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState('');

  // Persist contributions
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contributions));
    } catch (e) {}
  }, [contributions]);

  // Toast auto-clear
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(''), 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (msg) => setToastMessage(msg);

  // Filtering art forms
  const filteredArtForms = useMemo(() => {
    return heritageArtForms.filter((item) => {
      // Category filter
      if (selectedCategory !== 'All') {
        const matchesCategory =
          item.category === selectedCategory ||
          (item.subCategories && item.subCategories.includes(selectedCategory));
        if (!matchesCategory) return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = item.name.toLowerCase().includes(q);
        const matchRegion = (item.region || '').toLowerCase().includes(q);
        const matchIntro = (item.shortIntro || '').toLowerCase().includes(q);
        if (!matchName && !matchRegion && !matchIntro) return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  const handleSelectArtForm = (art) => {
    setSelectedArtForm(art);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToGrid = () => {
    setSelectedArtForm(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToContribute = (craftName = '') => {
    if (craftName) {
      setContributeCraftName(craftName);
    }
    setSelectedArtForm(null); // return to main view to see form
    setTimeout(() => {
      const elem = document.getElementById('preserve-knowledge');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleSubmitContribution = (newContribution) => {
    setContributions((prev) => [newContribution, ...prev]);
    showToast(t('heritage.contributions.savedToast', { name: newContribution.craftName }, `Thank you! "${newContribution.craftName}" saved to your contributions.`));
    setTimeout(() => {
      const elem = document.getElementById('my-contributions');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
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

      {selectedArtForm ? (
        /* ── ART FORM DETAIL VIEW ── */
        <ArtFormDetailView
          artForm={selectedArtForm}
          onBack={handleBackToGrid}
          onSelectRelated={handleSelectArtForm}
          onContributeForThisCraft={handleScrollToContribute}
        />
      ) : (
        /* ── ARCHIVE LANDING VIEW ── */
        <>
          {/* 1. Header with Search & Category Pills */}
          <HeritageHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onScrollToContribute={() => handleScrollToContribute()}
          />

          {/* 2. Traditional Indian Art Forms Visual Grid */}
          <ArtFormGrid
            artForms={filteredArtForms}
            onSelectArtForm={handleSelectArtForm}
            onResetFilters={handleResetFilters}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
          />

          {/* 3. Share What You Know (Contribution Form) */}
          <PreserveKnowledgeForm
            initialCraftName={contributeCraftName}
            onSubmitContribution={handleSubmitContribution}
          />

          {/* 4. My Contributions */}
          <MyContributionsList
            contributions={contributions}
            onViewContribution={setViewingContribution}
            onScrollToContribute={() => handleScrollToContribute()}
          />
        </>
      )}

      {/* ── 5. Bottom Warli Heritage Divider ── */}
      <div className="mt-8 pb-4">
        <WarliDivider className="w-full opacity-60" />
      </div>

      {/* ── Contribution Details Modal ── */}
      {viewingContribution && (
        <ContributionDetailModal
          contribution={viewingContribution}
          isOpen={!!viewingContribution}
          onClose={() => setViewingContribution(null)}
        />
      )}
    </div>
  );
}
