import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { artFormOptions, statusOptions } from '../../data/artworkData';
import { useLanguage } from '../../i18n';

export default function ArtworkEditModal({ artwork, isOpen, onClose, onSave }) {
  const { t } = useLanguage();
  const [title, setTitle] = useState('');
  const [artForm, setArtForm] = useState('Madhubani');
  const [category, setCategory] = useState('Painting');
  const [status, setStatus] = useState('Published');
  const [materials, setMaterials] = useState('');
  const [techniques, setTechniques] = useState('');
  const [description, setDescription] = useState('');
  const [interpretation, setInterpretation] = useState('');

  useEffect(() => {
    if (artwork) {
      setTitle(artwork.title || '');
      setArtForm(artwork.artForm || 'Madhubani');
      setCategory(artwork.type || 'Painting');
      setStatus(artwork.status || 'Published');
      setMaterials(artwork.materials || '');
      setTechniques(artwork.techniques || '');
      setDescription(artwork.description || '');
      setInterpretation(artwork.interpretation || '');
    }
  }, [artwork]);

  if (!isOpen || !artwork) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert(t('artwork.titleRequired', 'Title is required.'));
      return;
    }

    const updated = {
      ...artwork,
      title: title.trim(),
      artForm,
      type: category.trim() || 'Painting',
      status,
      materials: materials.trim(),
      techniques: techniques.trim(),
      description: description.trim(),
      interpretation: interpretation.trim(),
    };

    onSave(updated);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-brown/50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-beige-light border border-beige-dark/70 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-beige-dark/40 mb-5">
          <h2 className="font-serif font-bold text-brown text-xl leading-tight">
            {t('artwork.editModalTitle', 'Edit Artwork Details')}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-beige hover:bg-beige-dark/40 border border-beige-dark/50 flex items-center justify-center text-brown/60 hover:text-brown transition-colors"
            aria-label={t('common.close', 'Close')}
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
          {/* Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block font-semibold text-brown mb-1.5">
                {t('artwork.artworkTitle', 'Artwork Title')} *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2 bg-ivory border border-beige-dark/70 rounded-xl text-brown focus:outline-none focus:border-terracotta/50"
              />
            </div>

            <div>
              <label className="block font-semibold text-brown mb-1.5">
                {t('artwork.artFormLabel', 'Art Form')}
              </label>
              <select
                value={artForm}
                onChange={(e) => setArtForm(e.target.value)}
                className="w-full px-3.5 py-2 bg-ivory border border-beige-dark/70 rounded-xl text-brown focus:outline-none focus:border-terracotta/50"
              >
                {artFormOptions.filter((f) => f !== 'All').map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block font-semibold text-brown mb-1.5">
                {t('artwork.categoryLabel', 'Category')}
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2 bg-ivory border border-beige-dark/70 rounded-xl text-brown focus:outline-none focus:border-terracotta/50"
              />
            </div>

            <div>
              <label className="block font-semibold text-brown mb-1.5">
                {t('artwork.chooseStatus', 'Publication Status')}
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3.5 py-2 bg-ivory border border-beige-dark/70 rounded-xl text-brown focus:outline-none focus:border-terracotta/50"
              >
                {statusOptions.filter((s) => s !== 'All').map((s) => (
                  <option key={s} value={s}>
                    {s === 'Published' ? t('common.published', 'Published') : t('common.draft', 'Draft')}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Materials */}
          <div>
            <label className="block font-semibold text-brown mb-1.5">
              {t('artwork.materialsUsed', 'Materials Used')}
            </label>
            <input
              type="text"
              value={materials}
              onChange={(e) => setMaterials(e.target.value)}
              className="w-full px-3.5 py-2 bg-ivory border border-beige-dark/70 rounded-xl text-brown focus:outline-none focus:border-terracotta/50"
            />
          </div>

          {/* Techniques */}
          <div>
            <label className="block font-semibold text-brown mb-1.5">
              {t('artwork.techniques', 'Techniques')}
            </label>
            <input
              type="text"
              value={techniques}
              onChange={(e) => setTechniques(e.target.value)}
              className="w-full px-3.5 py-2 bg-ivory border border-beige-dark/70 rounded-xl text-brown focus:outline-none focus:border-terracotta/50"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-brown mb-1.5">
              {t('artwork.descriptionLabel', 'Artwork Description')}
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 bg-ivory border border-beige-dark/70 rounded-xl text-brown focus:outline-none focus:border-terracotta/50 resize-none"
            />
          </div>

          {/* Interpretation */}
          <div>
            <label className="block font-semibold text-brown mb-1.5">
              {t('artwork.artistInterpretation', "Artist's Personal Interpretation")}
            </label>
            <textarea
              rows={2}
              value={interpretation}
              onChange={(e) => setInterpretation(e.target.value)}
              className="w-full px-3.5 py-2 bg-ivory border border-beige-dark/70 rounded-xl text-brown focus:outline-none focus:border-terracotta/50 resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="pt-4 border-t border-beige-dark/40 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-beige border border-beige-dark/60 text-xs text-brown hover:bg-beige-dark/30 transition-colors"
            >
              {t('common.cancel', 'Cancel')}
            </button>
            <button type="submit" className="btn-primary">
              <Check size={14} />
              {t('artwork.saveChanges', 'Save Changes')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
