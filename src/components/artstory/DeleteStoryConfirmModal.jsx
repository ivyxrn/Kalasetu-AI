import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { useLanguage } from '../../i18n';

export default function DeleteStoryConfirmModal({ story, isOpen, onClose, onConfirm }) {
  const { t } = useLanguage();

  if (!isOpen || !story) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-brown/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-md bg-ivory rounded-2xl border border-beige-dark/70 shadow-2xl p-6 text-center">
        <button
          onClick={onClose}
          aria-label={t('common.close', 'Close')}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-beige text-brown/50 hover:text-brown"
        >
          <X size={16} />
        </button>

        <div className="w-12 h-12 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center mx-auto mb-3">
          <Trash2 size={22} />
        </div>

        <h3 className="font-serif font-bold text-brown text-lg mb-1">
          {t('artstory.deleteStoryTitle', 'Delete ArtStory?')}
        </h3>
        <p className="font-sans text-xs text-brown/65 mb-4 leading-relaxed">
          {t('artstory.deleteStoryDesc', { title: story.title }, `Are you sure you want to remove "${story.title}"? This will remove this preserved narrative from your collection.`)}
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-beige border border-beige-dark/60 text-xs font-sans font-medium text-brown hover:bg-beige-dark/30 transition-colors"
          >
            {t('common.cancel', 'Cancel')}
          </button>
          <button
            onClick={() => {
              onConfirm(story.id);
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-terracotta hover:bg-terracotta-dark text-white text-xs font-sans font-medium shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Trash2 size={13} />
            <span>{t('artstory.deleteStory', 'Delete Story')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
