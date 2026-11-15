import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Edit3,
  Save,
  RotateCw,
  Copy,
  Check,
  CheckCircle2,
  BookOpen,
  Info,
  Calendar,
  Globe,
  Tag,
  X,
} from 'lucide-react';
import { storyStyles, languages } from '../../data/storyData';
import { useLanguage } from '../../i18n';

export default function StoryGeneratedView({
  generatedStory,
  selectedArtwork,
  selectedStyle,
  selectedLanguage,
  onSaveStory,
  onRegenerate,
  isGenerating,
}) {
  const { t, language } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedParagraphs, setEditedParagraphs] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Sync state when generatedStory updates
  useEffect(() => {
    if (generatedStory) {
      setEditedTitle(generatedStory.title || '');
      setEditedParagraphs(
        Array.isArray(generatedStory.paragraphs)
          ? generatedStory.paragraphs.join('\n\n')
          : generatedStory.paragraphs || ''
      );
      setIsSaved(false);
      setIsEditing(false);
    }
  }, [generatedStory]);

  if (!generatedStory) return null;

  const currentStyleObj = storyStyles.find((s) => s.id === selectedStyle) || storyStyles[0];
  const currentLangObj = languages.find((l) => l.id === selectedLanguage) || languages[0];

  const paragraphsList = editedParagraphs
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const wordCount = editedParagraphs.split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 180));

  const handleCopy = () => {
    const fullText = `${editedTitle}\n\n${editedParagraphs}\n\n— Artwork: ${selectedArtwork?.title} (${selectedArtwork?.artForm})\n— Artist: Ivy Maiti`;
    navigator.clipboard.writeText(fullText).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSave = () => {
    const storyToSave = {
      ...generatedStory,
      title: editedTitle.trim() || generatedStory.title,
      paragraphs: paragraphsList,
      savedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      rawDate: new Date().toISOString(),
    };
    onSaveStory(storyToSave);
    setIsSaved(true);
    setIsEditing(false);
  };

  return (
    <div
      id="generated-story-view"
      className="relative mb-10 rounded-2xl overflow-hidden bg-ivory border-2 border-terracotta/40 shadow-xl animate-fade-in"
    >
      {/* ── Demo Notice & Transparent Disclaimer Banner ── */}
      <div className="px-5 py-2.5 bg-ochre/15 border-b border-ochre/30 flex flex-wrap items-center justify-between gap-2 text-xs font-sans text-brown/75">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-forest animate-pulse" />
          <span className="font-semibold text-brown">
            {t('artstory.demonstrationMode', 'Demonstration Mode')}
          </span>
          <span>·</span>
          <span>
            {t('artstory.demoBannerText', 'Story generated from your inputs & authentic cultural lore. Ready for backend AI model integration.')}
          </span>
        </div>

        <span className="text-[11px] font-sans text-brown/55 italic">
          {t('artstory.fullyEditable', 'Fully editable before saving')}
        </span>
      </div>

      {/* ── Story Header HUD ── */}
      <div className="p-6 sm:p-7 border-b border-beige-dark/50 bg-beige/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-sans font-medium bg-terracotta/10 text-terracotta border border-terracotta/25">
              <Tag size={12} />
              {t(`artstory.styles.${currentStyleObj.id}`, currentStyleObj.title)}
            </span>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-sans font-medium bg-forest/10 text-forest border border-forest/25">
              <Globe size={12} />
              {currentLangObj.name} ({currentLangObj.native})
            </span>

            <span className="text-xs font-sans text-brown/50">
              {t('artstory.wordsCount', { count: wordCount }, `${wordCount} words`)} · {t('artstory.readTime', { time: readTime }, `~${readTime} min read`)}
            </span>
          </div>

          {/* Story Title */}
          {isEditing ? (
            <div className="mt-1">
              <label className="block text-[11px] font-sans font-medium text-brown/60 mb-1">
                {t('artstory.storyTitle', 'Story Title')}
              </label>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full text-lg sm:text-2xl font-serif font-bold text-brown bg-ivory border border-terracotta/40 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-terracotta"
              />
            </div>
          ) : (
            <h2 className="font-serif font-bold text-brown text-xl sm:text-2xl tracking-tight leading-snug">
              {editedTitle || generatedStory.title}
            </h2>
          )}

          <p className="text-xs font-sans text-brown/60 mt-1">
            {t('artstory.associatedArtwork', 'Associated Artwork:')}{' '}
            <strong className="text-brown">{selectedArtwork?.title}</strong> ·{' '}
            {selectedArtwork?.artForm} · {t('artwork.artistLabel', 'Artist')}: <strong>Ivy Maiti</strong>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            className="px-3 py-2 rounded-xl bg-ivory hover:bg-beige border border-beige-dark/70 text-brown text-xs font-sans font-medium transition-colors flex items-center gap-1.5 shadow-sm"
            title={t('artstory.copyStory', 'Copy story text to clipboard')}
          >
            {copied ? (
              <>
                <Check size={14} className="text-forest" />
                <span className="text-forest">{t('common.copied', 'Copied!')}</span>
              </>
            ) : (
              <>
                <Copy size={14} className="text-brown/60" />
                <span>{t('common.copy', 'Copy')}</span>
              </>
            )}
          </button>

          {/* Regenerate Button */}
          <button
            type="button"
            onClick={onRegenerate}
            disabled={isGenerating}
            className="px-3.5 py-2 rounded-xl bg-ivory hover:bg-beige border border-beige-dark/70 text-brown text-xs font-sans font-medium transition-colors flex items-center gap-1.5 shadow-sm disabled:opacity-50"
            title={t('artstory.regenerate', 'Regenerate')}
          >
            <RotateCw
              size={14}
              className={`text-terracotta ${isGenerating ? 'animate-spin' : ''}`}
            />
            <span>{t('artstory.regenerate', 'Regenerate')}</span>
          </button>

          {/* Edit / View Toggle */}
          <button
            type="button"
            onClick={() => setIsEditing((prev) => !prev)}
            className={`px-3.5 py-2 rounded-xl border text-xs font-sans font-medium transition-colors flex items-center gap-1.5 shadow-sm ${
              isEditing
                ? 'bg-beige-dark/40 border-beige-dark text-brown'
                : 'bg-ivory hover:bg-beige border-beige-dark/70 text-brown'
            }`}
          >
            <Edit3 size={14} className="text-terracotta" />
            <span>{isEditing ? t('artstory.previewMode', 'Preview Mode') : t('artstory.editStory', 'Edit Story')}</span>
          </button>

          {/* Save Story Button */}
          <button
            type="button"
            onClick={handleSave}
            className={`px-4 py-2 rounded-xl text-xs font-sans font-medium transition-all flex items-center gap-1.5 shadow-md ${
              isSaved
                ? 'bg-forest text-white'
                : 'bg-terracotta text-white hover:bg-terracotta-dark active:scale-95'
            }`}
          >
            {isSaved ? (
              <>
                <CheckCircle2 size={15} />
                <span>{t('artstory.savedToArtStories', 'Saved to My ArtStories!')}</span>
              </>
            ) : (
              <>
                <Save size={15} />
                <span>{t('artstory.saveArtStory', 'Save ArtStory')}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Story Content Body ── */}
      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Framed Artwork Card */}
        <div className="lg:col-span-4 flex flex-col items-center">
          <div
            className="w-full rounded-xl p-3 border shadow-md"
            style={{
              backgroundColor: '#2F1E15',
              borderColor: '#C4A163',
            }}
          >
            <div
              className="p-2.5 rounded-sm border"
              style={{
                backgroundColor: '#F8F5EE',
                borderColor: '#D5B77A',
              }}
            >
              <div className="aspect-[4/3] w-full rounded overflow-hidden bg-brown/10 mb-2">
                <img
                  src={selectedArtwork?.imageUrl}
                  alt={selectedArtwork?.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="text-center pt-1 pb-0.5">
                <h4 className="font-serif font-bold text-brown text-sm">
                  {selectedArtwork?.title}
                </h4>
                <p className="text-[11px] font-sans text-brown/65">
                  {selectedArtwork?.artForm} · {selectedArtwork?.type}
                </p>
                <p className="text-[10px] font-sans text-terracotta mt-0.5">
                  {t('artwork.artistLabel', 'Artist')}: Ivy Maiti
                </p>
              </div>
            </div>
          </div>

          {/* Materials & Technique Quick Card */}
          <div className="w-full mt-4 p-3.5 rounded-xl bg-beige/60 border border-beige-dark/50 text-[11px] font-sans text-brown/70 space-y-1.5">
            <p>
              <strong className="text-brown">{t('artwork.materialsUsed', 'Materials')}:</strong>{' '}
              {selectedArtwork?.materials || 'Natural mineral dyes on handmade paper'}
            </p>
            <p>
              <strong className="text-brown">{t('artwork.techniques', 'Technique')}:</strong>{' '}
              {selectedArtwork?.techniques || 'Traditional regional fine linework'}
            </p>
          </div>
        </div>

        {/* Right Column: Story Text / Editor */}
        <div className="lg:col-span-8">
          {isEditing ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-sans text-brown/60">
                <span>{t('artstory.editParagraphsPrompt', 'Edit your narrative paragraphs (separate with double enters):')}</span>
                <span>{t('artstory.wordsCount', { count: wordCount }, `${wordCount} words`)}</span>
              </div>

              <textarea
                rows={11}
                value={editedParagraphs}
                onChange={(e) => setEditedParagraphs(e.target.value)}
                className="w-full p-4 bg-beige-light border border-terracotta/40 rounded-xl text-sm font-serif text-brown leading-relaxed focus:outline-none focus:ring-1 focus:ring-terracotta shadow-inner"
              />

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3.5 py-1.5 rounded-lg bg-beige border border-beige-dark/60 text-xs font-sans text-brown hover:bg-beige-dark/30 transition-colors"
                >
                  {t('artstory.doneEditing', 'Done Editing')}
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="btn-primary text-xs py-1.5 px-4"
                >
                  {t('artwork.saveChanges', 'Save Changes')}
                </button>
              </div>
            </div>
          ) : (
            <div className="prose prose-brown max-w-none space-y-4">
              {paragraphsList.map((para, idx) => (
                <p
                  key={idx}
                  className="font-serif text-brown/90 text-base sm:text-lg leading-relaxed text-justify first-letter:text-3xl first-letter:font-bold first-letter:text-terracotta first-letter:mr-1 first-letter:float-left first-letter:leading-none"
                >
                  {para}
                </p>
              ))}

              {/* Cultural Quote Footer Accent */}
              <div className="mt-6 pt-4 border-t border-beige-dark/50 flex items-center justify-between text-xs font-sans text-brown/50 italic">
                <span>{t('artstory.archivePreserved', 'Preserved in the KalaSetu Heritage Archive')}</span>
                <span>{t('artstory.storytellerLabel', 'Storyteller:')} Ivy Maiti</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
