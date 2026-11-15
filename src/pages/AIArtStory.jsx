import React, { useState, useEffect, useRef } from 'react';
import { initialArtworks } from '../data/artworkData';
import {
  storyStyles,
  languages,
  storyLengths,
  initialSavedStories,
  generateDemoStoryContent,
} from '../data/storyData';

import ArtStoryIntro from '../components/artstory/ArtStoryIntro';
import ArtworkSelector from '../components/artstory/ArtworkSelector';
import StoryFormInputs from '../components/artstory/StoryFormInputs';
import StoryStyleSelector from '../components/artstory/StoryStyleSelector';
import StoryPreferences from '../components/artstory/StoryPreferences';
import StoryGeneratedView from '../components/artstory/StoryGeneratedView';
import MyStoriesList from '../components/artstory/MyStoriesList';
import StoryViewModal from '../components/artstory/StoryViewModal';
import StoryEditModal from '../components/artstory/StoryEditModal';
import DeleteStoryConfirmModal from '../components/artstory/DeleteStoryConfirmModal';
import { WarliDivider } from '../components/ui/DecorativeElements';
import { CheckCircle2 } from 'lucide-react';

const STORAGE_KEY = 'kalasetu_saved_artstories';

export default function AIArtStory() {
  const workspaceRef = useRef(null);

  // Artwork list & selection
  const [artworks] = useState(initialArtworks);
  const [selectedArtwork, setSelectedArtwork] = useState(initialArtworks[0] || null);

  // Story inputs
  const [storyText, setStoryText] = useState(
    initialArtworks[0]?.interpretation || ''
  );
  const [inspiration, setInspiration] = useState(
    "Grandmother's courtyard in Mithila during the Chhath festival"
  );
  const [culturalSignificance, setCulturalSignificance] = useState(
    'Auspicious fertility, purity, and sacred cosmic harmony'
  );
  const [materials, setMaterials] = useState(
    initialArtworks[0]?.materials || ''
  );
  const [personalMemory, setPersonalMemory] = useState(
    'Learned the fine kachni hatching from my grandmother'
  );

  // Preferences
  const [selectedStyle, setSelectedStyle] = useState('traditional');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedLength, setSelectedLength] = useState('medium');

  // Generation status & generated result
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedStory, setGeneratedStory] = useState(null);
  const [validationError, setValidationError] = useState('');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState('');

  // Saved Stories Collection (persisted in localStorage)
  const [savedStories, setSavedStories] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      // Fallback
    }
    return initialSavedStories;
  });

  // Modal states
  const [viewingStory, setViewingStory] = useState(null);
  const [editingStory, setEditingStory] = useState(null);
  const [deletingStory, setDeletingStory] = useState(null);

  // Save to localStorage whenever savedStories changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedStories));
    } catch (e) {
      // ignore
    }
  }, [savedStories]);

  // Toast auto-clear
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(''), 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (msg) => {
    setToastMessage(msg);
  };

  // Switch selected artwork and update defaults
  const handleSelectArtwork = (art) => {
    setSelectedArtwork(art);
    setValidationError('');
    // Update materials and suggest details if text area is empty
    if (!storyText.trim()) {
      setStoryText(art.interpretation || art.description || '');
      setMaterials(art.materials || '');
    }
  };

  // Pre-fill inputs from current artwork
  const handlePrefillFromArtwork = () => {
    if (!selectedArtwork) return;
    setStoryText(selectedArtwork.interpretation || selectedArtwork.description || '');
    setInspiration(`Inspired by ${selectedArtwork.artForm} heritage traditions`);
    setCulturalSignificance(selectedArtwork.description || '');
    setMaterials(selectedArtwork.materials || '');
    setPersonalMemory(`Reflecting on the sacred symbolism of ${selectedArtwork.title}`);
    showToast('Story details pre-filled from artwork documentation');
  };

  // Scroll to creation workspace
  const handleStartCreation = () => {
    if (workspaceRef.current) {
      workspaceRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Generate Story Action
  const handleGenerate = () => {
    if (!selectedArtwork) {
      setValidationError('Please select an artwork from Step 1 before generating.');
      return;
    }
    if (!storyText.trim() && !inspiration.trim()) {
      setValidationError('Please share at least a few words about your artwork in Step 2.');
      return;
    }

    setValidationError('');
    setIsGenerating(true);

    // Simulate thoughtful synthesis
    setTimeout(() => {
      const result = generateDemoStoryContent({
        artwork: selectedArtwork,
        artistStory: storyText,
        inspiration,
        culturalSignificance,
        materials,
        personalMemory,
        style: selectedStyle,
        language: selectedLanguage,
        length: selectedLength,
      });

      const styleObj = storyStyles.find((s) => s.id === selectedStyle);
      const langObj = languages.find((l) => l.id === selectedLanguage);

      const newStoryObject = {
        id: `story-${Date.now()}`,
        artworkId: selectedArtwork.id,
        artworkTitle: selectedArtwork.title,
        artworkImage: selectedArtwork.imageUrl,
        artForm: selectedArtwork.artForm,
        title: result.title,
        paragraphs: result.paragraphs,
        style: selectedStyle,
        styleName: styleObj?.title || selectedStyle,
        language: selectedLanguage,
        languageName: langObj?.name || selectedLanguage,
        length: selectedLength,
        artistNotes: storyText,
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        rawDate: new Date().toISOString(),
      };

      setGeneratedStory(newStoryObject);
      setIsGenerating(false);

      // Scroll down to the generated story area
      setTimeout(() => {
        const genElem = document.getElementById('generated-story-view');
        if (genElem) {
          genElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);

      showToast('ArtStory generated successfully!');
    }, 750);
  };

  // Regenerate action
  const handleRegenerate = () => {
    handleGenerate();
  };

  // Save generated story to My ArtStories
  const handleSaveGeneratedStory = (storyToSave) => {
    setSavedStories((prev) => {
      const existingIdx = prev.findIndex((s) => s.id === storyToSave.id);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = storyToSave;
        return updated;
      }
      return [storyToSave, ...prev];
    });
    showToast(`"${storyToSave.title}" saved to My ArtStories!`);
  };

  // Update saved story from edit modal
  const handleUpdateSavedStory = (updatedStory) => {
    setSavedStories((prev) =>
      prev.map((s) => (s.id === updatedStory.id ? updatedStory : s))
    );
    if (generatedStory && generatedStory.id === updatedStory.id) {
      setGeneratedStory(updatedStory);
    }
    showToast('ArtStory updated successfully');
  };

  // Delete saved story
  const handleDeleteStory = (id) => {
    setSavedStories((prev) => prev.filter((s) => s.id !== id));
    showToast('Story removed from your collection');
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

      {/* ── 1. Page Introduction Banner ── */}
      <ArtStoryIntro
        onStartCreation={handleStartCreation}
        savedStoriesCount={savedStories.length}
      />

      {/* ── 2. Guided ArtStory Creation Studio ── */}
      <div ref={workspaceRef} className="space-y-6 mb-12 scroll-mt-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-terracotta" />
          <h2 className="font-serif font-bold text-brown text-2xl tracking-tight">
            Story Creation Studio
          </h2>
        </div>

        {/* Step 1: Choose Your Artwork */}
        <ArtworkSelector
          artworks={artworks}
          selectedArtwork={selectedArtwork}
          onSelectArtwork={handleSelectArtwork}
        />

        {/* Step 2: Tell Us Your Story */}
        <StoryFormInputs
          selectedArtwork={selectedArtwork}
          storyText={storyText}
          onStoryTextChange={setStoryText}
          inspiration={inspiration}
          onInspirationChange={setInspiration}
          culturalSignificance={culturalSignificance}
          onCulturalSignificanceChange={setCulturalSignificance}
          materials={materials}
          onMaterialsChange={setMaterials}
          personalMemory={personalMemory}
          onPersonalMemoryChange={setPersonalMemory}
          onPrefillFromArtwork={handlePrefillFromArtwork}
        />

        {/* Step 3: Choose Your Story Style */}
        <StoryStyleSelector
          selectedStyle={selectedStyle}
          onSelectStyle={setSelectedStyle}
        />

        {/* Step 4: Choose Language & Length */}
        <StoryPreferences
          selectedLanguage={selectedLanguage}
          onSelectLanguage={setSelectedLanguage}
          selectedLength={selectedLength}
          onSelectLength={setSelectedLength}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
          validationError={validationError}
        />
      </div>

      {/* ── 3. Generated ArtStory Experience View ── */}
      {generatedStory && (
        <StoryGeneratedView
          generatedStory={generatedStory}
          selectedArtwork={selectedArtwork}
          selectedStyle={selectedStyle}
          selectedLanguage={selectedLanguage}
          onSaveStory={handleSaveGeneratedStory}
          onRegenerate={handleRegenerate}
          isGenerating={isGenerating}
        />
      )}

      {/* ── 4. My ArtStories Collection ── */}
      <MyStoriesList
        stories={savedStories}
        onViewStory={setViewingStory}
        onEditStory={setEditingStory}
        onDeleteStory={setDeletingStory}
        onStartNewStory={handleStartCreation}
      />

      {/* ── 5. Bottom Warli Heritage Border ── */}
      <div className="mt-8 pb-4">
        <WarliDivider className="w-full opacity-60" />
      </div>

      {/* ── Modals ── */}
      {/* Story View Modal */}
      {viewingStory && (
        <StoryViewModal
          story={viewingStory}
          onClose={() => setViewingStory(null)}
          onEdit={(story) => {
            setViewingStory(null);
            setEditingStory(story);
          }}
        />
      )}

      {/* Story Edit Modal */}
      {editingStory && (
        <StoryEditModal
          story={editingStory}
          isOpen={!!editingStory}
          onClose={() => setEditingStory(null)}
          onSave={handleUpdateSavedStory}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deletingStory && (
        <DeleteStoryConfirmModal
          story={deletingStory}
          isOpen={!!deletingStory}
          onClose={() => setDeletingStory(null)}
          onConfirm={handleDeleteStory}
        />
      )}
    </div>
  );
}
