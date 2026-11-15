import React, { useState, useEffect } from 'react';
import { X, Save, Edit3, Globe, Tag } from 'lucide-react';
import { storyStyles, languages } from '../../data/storyData';
import { useLanguage } from '../../i18n';

export default function StoryEditModal({ story, isOpen, onClose, onSave }) {
  const { t } = useLanguage();
  const [title, setTitle] = useState('');
  const [paragraphsText, setParagraphsText] = useState('');
  const [style, setStyle] = useState('traditional');
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    if (story) {
      setTitle(story.title || '');
      setParagraphsText(
        Array.isArray(story.paragraphs)
          ? story.paragraphs.join('\n\n')
          : story.paragraphs || ''
      );
      setStyle(story.style || 'traditional');
      setLanguage(story.language || 'en');
    }
  }, [story]);

  if (!isOpen || !story) return null;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const paragraphs = paragraphsText
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);

    const styleObj = storyStyles.find((s) => s.id === style);
    const langObj = languages.find((l) => l.id === language);

    const updated = {
      ...story,
      title: title.trim() || story.title,
      paragraphs,
      style,
      styleName: styleObj?.title || story.styleName,
      language,
      languageName: langObj?.name || story.languageName,
      updatedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-brown/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-ivory rounded-2xl border border-beige-dark/70 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-beige-dark/50 bg-beige/40">
          <div className="flex items-center gap-2">
            <Edit3 size={17} className="text-terracotta" />
            <h3 className="font-serif font-bold text-brown text-base">
              {t('artstory.editSavedStoryTitle', 'Edit Saved ArtStory')}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label={t('common.close', 'Close')}
            className="p-1 rounded-lg hover:bg-beige text-brown/60 hover:text-brown"
          >
            <X size={17} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleFormSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Associated Artwork Banner */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-beige/50 border border-beige-dark/60 text-xs font-sans text-brown">
            <img
              src={story.artworkImage}
              alt={story.artworkTitle}
              className="w-12 h-12 object-cover rounded-md flex-shrink-0"
            />
            <div>
              <div className="font-semibold">{story.artworkTitle}</div>
              <div className="text-brown/60">{story.artForm} · {t('artwork.artistLabel', 'Artist')}: Ivy Maiti</div>
            </div>
          </div>

          {/* Title Input */}
          <div>
            <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider mb-1">
              {t('artstory.storyTitle', 'Story Title')} <span className="text-terracotta">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3.5 py-2 bg-beige-light border border-beige-dark/70 rounded-xl text-sm font-serif font-bold text-brown focus:outline-none focus:border-terracotta"
            />
          </div>

          {/* Style & Language selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-sans font-medium text-brown mb-1">
                {t('artstory.chooseStyleTitle', 'Story Style')}
              </label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full px-3 py-2 bg-beige-light border border-beige-dark/60 rounded-xl text-xs font-sans text-brown focus:outline-none focus:border-terracotta cursor-pointer"
              >
                {storyStyles.map((s) => (
                  <option key={s.id} value={s.id}>
                    {t(`artstory.styles.${s.id}`, s.title)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-sans font-medium text-brown mb-1">
                {t('artstory.storyLanguage', 'Language')}
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 bg-beige-light border border-beige-dark/60 rounded-xl text-xs font-sans text-brown focus:outline-none focus:border-terracotta cursor-pointer"
              >
                {languages.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name} ({l.native})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Paragraphs Area */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider">
                {t('artstory.paragraphsLabel', 'Story Paragraphs')} <span className="text-terracotta">*</span>
              </label>
              <span className="text-[11px] font-sans text-brown/50">
                {t('artstory.paragraphsHelp', 'Double Enter separates paragraphs')}
              </span>
            </div>
            <textarea
              rows={9}
              value={paragraphsText}
              onChange={(e) => setParagraphsText(e.target.value)}
              required
              className="w-full p-3.5 bg-beige-light border border-beige-dark/70 rounded-xl text-sm font-serif text-brown leading-relaxed focus:outline-none focus:border-terracotta"
            />
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-beige-dark/50 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-beige border border-beige-dark/60 text-xs font-sans font-medium text-brown hover:bg-beige-dark/30 transition-colors"
            >
              {t('common.cancel', 'Cancel')}
            </button>
            <button
              type="submit"
              className="btn-primary text-xs py-2 px-5 flex items-center gap-1.5"
            >
              <Save size={14} />
              <span>{t('artwork.saveChanges', 'Save Changes')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
