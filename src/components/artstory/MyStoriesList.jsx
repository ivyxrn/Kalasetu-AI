import React, { useState } from 'react';
import {
  BookOpen,
  Eye,
  Edit3,
  Trash2,
  Calendar,
  Globe,
  Tag,
  Sparkles,
  Plus,
} from 'lucide-react';
import { LotusLogo } from '../ui/DecorativeElements';
import { useLanguage } from '../../i18n';

export default function MyStoriesList({
  stories,
  onViewStory,
  onEditStory,
  onDeleteStory,
  onStartNewStory,
}) {
  const { t } = useLanguage();
  const [filterLang, setFilterLang] = useState('All');

  // Distinct languages in stories
  const availableLangs = ['All', ...new Set(stories.map((s) => s.languageName || s.language))];

  const filteredStories = stories.filter((story) => {
    if (filterLang === 'All') return true;
    return (story.languageName || story.language) === filterLang;
  });

  return (
    <section id="my-artstories" className="mb-12 scroll-mt-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-3 border-b border-beige-dark/60">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen size={20} className="text-terracotta" />
            <h2 className="font-serif font-bold text-brown text-2xl">
              {t('artstory.myArtStories', 'My ArtStories')}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-sans font-semibold bg-terracotta/10 text-terracotta border border-terracotta/20">
              {t('artstory.storiesCount', { count: stories.length }, `${stories.length} Stories`)}
            </span>
          </div>
          <p className="font-sans text-xs sm:text-sm text-brown/65 mt-1">
            {t('artstory.myStoriesSubtitle', 'Preserved narratives, memories, and cultural folklore accompanying your artwork collection.')}
          </p>
        </div>

        {/* Filter by Language if stories exist */}
        {stories.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-sans text-brown/60 hidden sm:inline">
              {t('artstory.storyLanguage', 'Language')}:
            </span>
            <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
              {availableLangs.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setFilterLang(lang)}
                  className={`px-2.5 py-1 rounded-full text-xs font-sans font-medium transition-colors ${
                    filterLang === lang
                      ? 'bg-terracotta text-white shadow-sm'
                      : 'bg-beige border border-beige-dark/60 text-brown/70 hover:text-brown'
                  }`}
                >
                  {lang === 'All' ? t('common.all', 'All') : lang}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Stories Grid */}
      {filteredStories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              className="group bg-ivory rounded-2xl border border-beige-dark/70 hover:border-ochre/80 hover:shadow-md transition-all duration-300 p-5 flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Artwork Thumbnail + Badges */}
                <div className="flex items-start gap-3.5 mb-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-brown/10 border border-beige-dark/70 shadow-sm group-hover:scale-105 transition-transform">
                    <img
                      src={story.artworkImage}
                      alt={story.artworkTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap mb-1">
                      <span className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded bg-terracotta/10 text-terracotta">
                        {story.styleName || story.style}
                      </span>
                      <span className="text-[10px] font-sans font-medium px-2 py-0.5 rounded bg-forest/10 text-forest">
                        {story.languageName || story.language}
                      </span>
                    </div>

                    <div className="text-xs font-sans font-semibold text-brown truncate">
                      {story.artworkTitle}
                    </div>
                    <div className="text-[11px] font-sans text-brown/50">
                      {story.artForm} Painting
                    </div>
                  </div>
                </div>

                {/* Story Title */}
                <h3
                  onClick={() => onViewStory(story)}
                  className="font-serif font-bold text-brown text-base hover:text-terracotta cursor-pointer transition-colors line-clamp-2 leading-snug mb-2"
                  title={story.title}
                >
                  {story.title}
                </h3>

                {/* Excerpt */}
                <p className="font-serif text-xs text-brown/75 line-clamp-3 leading-relaxed mb-3">
                  {Array.isArray(story.paragraphs)
                    ? story.paragraphs[0]
                    : story.paragraphs}
                </p>
              </div>

              {/* Card Footer: Date & Actions */}
              <div className="pt-3 border-t border-beige-dark/40 flex items-center justify-between text-xs font-sans">
                <span className="text-[11px] text-brown/50 flex items-center gap-1">
                  <Calendar size={12} />
                  {story.date || 'Saved'}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onViewStory(story)}
                    className="p-1.5 rounded-lg hover:bg-beige text-brown/70 hover:text-brown transition-colors"
                    title={t('artstory.readFullStory', 'Read full story')}
                  >
                    <Eye size={15} />
                  </button>
                  <button
                    onClick={() => onEditStory(story)}
                    className="p-1.5 rounded-lg hover:bg-beige text-brown/70 hover:text-brown transition-colors"
                    title={t('artstory.editStory', 'Edit story')}
                  >
                    <Edit3 size={15} />
                  </button>
                  <button
                    onClick={() => onDeleteStory(story)}
                    className="p-1.5 rounded-lg hover:bg-terracotta/10 text-brown/50 hover:text-terracotta transition-colors"
                    title={t('artstory.deleteStory', 'Delete story')}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-ivory border border-beige-dark/60 rounded-2xl p-10 text-center max-w-md mx-auto shadow-sm">
          <div className="w-14 h-14 rounded-full bg-beige border border-ochre/30 flex items-center justify-center mx-auto mb-3 text-terracotta">
            <BookOpen size={24} />
          </div>
          <h3 className="font-serif font-bold text-brown text-lg mb-1">
            {t('artstory.noStoriesPreserved', 'No Stories Preserved Yet')}
          </h3>
          <p className="font-sans text-xs text-brown/60 mb-5 leading-relaxed">
            {t('artstory.noStoriesDesc', 'Your creations carry generations of wisdom and personal inspiration. Select an artwork above and weave your first ArtStory.')}
          </p>
          <button
            onClick={onStartNewStory}
            className="btn-primary text-xs py-2 px-4 inline-flex items-center gap-1.5"
          >
            <Plus size={14} />
            <span>{t('artstory.createFirstStory', 'Create Your First ArtStory')}</span>
          </button>
        </div>
      )}
    </section>
  );
}
