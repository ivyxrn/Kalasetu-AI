import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Calendar,
  Globe,
  Tag,
  BookOpen,
  Printer,
  Sparkles,
} from 'lucide-react';
import { LotusLogo } from '../ui/DecorativeElements';
import { useLanguage } from '../../i18n';

export default function StoryViewModal({ story, onClose, onEdit }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  if (!story) return null;

  const handleCopy = () => {
    const text = `${story.title}\n\n${story.paragraphs.join('\n\n')}\n\n— Artwork: ${story.artworkTitle} (${story.artForm})\n— Artist: Ivy Maiti`;
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-brown/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-3xl bg-ivory rounded-2xl border border-beige-dark/70 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-beige-dark/50 bg-beige/40">
          <div className="flex items-center gap-2">
            <LotusLogo size={22} />
            <div>
              <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-terracotta">
                {t('artstory.archiveHeader', 'KalaSetu ArtStory Archive')}
              </span>
              <p className="text-xs font-sans text-brown/60">
                {t('artstory.storyFor', { title: story.artworkTitle }, `Story for "${story.artworkTitle}"`)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-2.5 py-1.5 rounded-lg bg-ivory hover:bg-beige border border-beige-dark/60 text-xs font-sans text-brown flex items-center gap-1.5 transition-colors"
              title={t('artstory.copyStory', 'Copy Story')}
            >
              {copied ? (
                <>
                  <Check size={13} className="text-forest" />
                  <span className="text-forest">{t('common.copied', 'Copied')}</span>
                </>
              ) : (
                <>
                  <Copy size={13} className="text-brown/60" />
                  <span>{t('common.copy', 'Copy')}</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="p-1.5 rounded-lg bg-ivory hover:bg-beige border border-beige-dark/60 text-brown/70 hover:text-brown transition-colors"
              title={t('artstory.printStory', 'Print ArtStory')}
            >
              <Printer size={15} />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-beige hover:bg-beige-dark/40 text-brown/60 hover:text-brown transition-colors"
              aria-label={t('common.close', 'Close')}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Header Banner */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-sans font-medium bg-terracotta/10 text-terracotta border border-terracotta/20">
                <Tag size={11} />
                {story.styleName || story.style}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-sans font-medium bg-forest/10 text-forest border border-forest/20">
                <Globe size={11} />
                {story.languageName || story.language}
              </span>
              <span className="text-[11px] font-sans text-brown/50 flex items-center gap-1">
                <Calendar size={11} />
                {story.date}
              </span>
            </div>

            <h2 className="font-serif font-bold text-brown text-2xl sm:text-3xl leading-snug">
              {story.title}
            </h2>

            <p className="text-xs font-sans text-brown/65 mt-1">
              {t('nav.artwork', 'Artwork')}: <strong className="text-brown">{story.artworkTitle}</strong> ({story.artForm}) · {t('artwork.artistLabel', 'Artist')}: <strong>Ivy Maiti</strong>
            </p>
          </div>

          {/* Framed Artwork Thumbnail preview banner */}
          <div className="flex items-center gap-4 p-3 rounded-xl bg-beige/50 border border-beige-dark/60">
            <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-brown/10 border border-ochre/40">
              <img
                src={story.artworkImage}
                alt={story.artworkTitle}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-xs font-sans">
              <div className="font-semibold text-brown">{story.artworkTitle}</div>
              <div className="text-brown/60 text-[11px]">{story.artForm}</div>
              {story.artistNotes && (
                <div className="text-[11px] font-serif italic text-terracotta mt-0.5 line-clamp-1">
                  &ldquo;{story.artistNotes}&rdquo;
                </div>
              )}
            </div>
          </div>

          {/* Paragraphs */}
          <div className="space-y-4">
            {story.paragraphs.map((para, i) => (
              <p
                key={i}
                className="font-serif text-brown/90 text-base leading-relaxed text-justify first-letter:text-2xl first-letter:font-bold first-letter:text-terracotta first-letter:float-left first-letter:mr-1 first-letter:leading-none"
              >
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-beige-dark/50 bg-beige/30 flex items-center justify-between">
          <span className="text-xs font-serif italic text-brown/50">
            {t('artstory.archivePreserved', 'Preserved in KalaSetu AI Digital Portfolio')}
          </span>

          <div className="flex items-center gap-2">
            {onEdit && (
              <button
                onClick={() => {
                  onClose();
                  onEdit(story);
                }}
                className="px-4 py-1.5 rounded-lg bg-beige hover:bg-beige-dark/30 text-xs font-sans font-medium text-brown border border-beige-dark/60 transition-colors"
              >
                {t('artstory.editStory', 'Edit Story')}
              </button>
            )}
            <button
              onClick={onClose}
              className="btn-primary text-xs py-1.5 px-4"
            >
              {t('common.close', 'Close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
