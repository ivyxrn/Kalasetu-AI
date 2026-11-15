import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { useLanguage } from '../../i18n';

export default function DeleteConfirmModal({
  artwork,
  isOpen,
  onClose,
  onConfirm,
}) {
  const { t } = useLanguage();
  if (!isOpen || !artwork) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brown/50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-beige-light border border-beige-dark/70 rounded-2xl w-full max-w-md p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-12 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center mx-auto mb-4 border border-terracotta/20">
          <AlertTriangle size={22} strokeWidth={2} />
        </div>

        <h3 className="font-serif font-bold text-brown text-lg text-center mb-1.5">
          {t('artwork.deleteConfirmTitle', 'Delete Artwork?')}
        </h3>

        <p className="font-sans text-xs text-brown/65 text-center leading-relaxed mb-6">
          {t('artwork.deleteConfirmDesc', { title: artwork.title }, `Are you sure you want to delete "${artwork.title}"? This action cannot be undone.`)}
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-beige border border-beige-dark/60 text-xs font-sans font-medium text-brown hover:bg-beige-dark/30 transition-colors"
          >
            {t('common.cancel', 'Cancel')}
          </button>
          <button
            onClick={() => {
              onConfirm(artwork.id);
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-terracotta text-white text-xs font-sans font-medium hover:bg-terracotta-dark transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Trash2 size={13} />
            {t('common.delete', 'Delete')}
          </button>
        </div>
      </div>
    </div>
  );
}

