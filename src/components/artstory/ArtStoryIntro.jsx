import React from 'react';
import { Sparkles, BookOpen, Feather, ArrowDown } from 'lucide-react';
import { LotusLogo } from '../ui/DecorativeElements';
import { useLanguage } from '../../i18n';

export default function ArtStoryIntro({ onStartCreation, savedStoriesCount = 0 }) {
  const { t } = useLanguage();

  return (
    <div className="relative mb-8 rounded-2xl overflow-hidden bg-ivory border border-beige-dark/70 shadow-sm p-6 sm:p-8 animate-fade-in">
      {/* Subtle ochre radial radiance in corner */}
      <div
        className="absolute -right-20 -top-20 w-80 h-80 rounded-full pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle, #D5B77A 0%, rgba(247, 243, 234, 0) 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="max-w-2xl">
          {/* Badge & Title */}
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-sans font-medium border border-terracotta/20">
              <Sparkles size={13} />
              Cultural Storytelling Studio
            </span>
            <span className="text-xs font-sans text-brown/40">·</span>
            <span className="text-xs font-sans text-brown/60">
              Preserving Indian Folklore & Artisan Voice
            </span>
          </div>

          <h1 className="font-serif font-bold text-brown text-3xl sm:text-4xl tracking-tight leading-tight mb-2">
            {t('artstory.title', 'AI ArtStory')}
          </h1>

          <p className="font-serif italic text-terracotta text-lg sm:text-xl mb-3">
            &ldquo;{t('artstory.subtitle', 'Every artwork has a story. Let yours be heard.')}&rdquo;
          </p>

          <p className="font-sans text-brown/75 text-sm sm:text-base leading-relaxed">
            {t(
              'artstory.intro',
              'Transform your creative inspiration, ancestral memories, and indigenous techniques into meaningful, professionally written narratives that accompany your creations. Preserve the cultural soul of your art and share it with collectors, galleries, and art lovers worldwide.'
            )}
          </p>

          {/* Quick value props */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-sans text-brown/70">
            <span className="flex items-center gap-1.5">
              <Feather size={14} className="text-terracotta" />
              Artist-Guided Narration
            </span>
            <span className="text-brown/30">&bull;</span>
            <span className="flex items-center gap-1.5">
              <BookOpen size={14} className="text-forest" />
              Bilingual (English & Hindi)
            </span>
            <span className="text-brown/30">&bull;</span>
            <span className="flex items-center gap-1.5">
              <Sparkles size={14} className="text-ochre-dark" />
              Ready for Exhibition Portfolios
            </span>
          </div>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 w-full lg:w-auto">
          <button
            onClick={onStartCreation}
            className="btn-primary flex items-center justify-center gap-2 px-6 py-3 text-sm font-sans font-medium shadow-md hover:shadow-lg transition-all"
          >
            <Sparkles size={16} />
            <span>Create New ArtStory</span>
          </button>

          {savedStoriesCount > 0 && (
            <a
              href="#my-artstories"
              className="text-xs font-sans text-brown/65 hover:text-terracotta flex items-center justify-center gap-1.5 py-1 transition-colors"
            >
              <span>View Saved Stories ({savedStoriesCount})</span>
              <ArrowDown size={13} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
