import React, { useState, useRef } from 'react';
import { X, Upload, Image as ImageIcon, AlertCircle, Sparkles, Check } from 'lucide-react';
import { artFormOptions } from '../../data/artworkData';
import { useLanguage } from '../../i18n';

export default function ArtworkUpload({ isOpen, onClose, onSave }) {
  const { t } = useLanguage();
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState('');
  const [artForm, setArtForm] = useState('Madhubani');
  const [category, setCategory] = useState('Painting');
  const [materials, setMaterials] = useState('');
  const [techniques, setTechniques] = useState('');
  const [description, setDescription] = useState('');
  const [interpretation, setInterpretation] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  if (!isOpen) return null;

  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];

  const processFile = (file) => {
    setImageError(null);
    if (!validTypes.includes(file.type)) {
      setImageError(t('artwork.supportsFormats', 'Unsupported file format. Please upload JPG, PNG, or WEBP images.'));
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  // Sample presets for quick testing if no file at hand
  const samplePresets = [
    { name: 'Mithila Fish', url: '/artworks/madhubani_harmony.jpg', form: 'Madhubani' },
    { name: 'Tarpa Dance', url: '/artworks/warli_celebrations.jpg', form: 'Warli' },
    { name: 'Sacred Deer', url: '/artworks/gond_companions.jpg', form: 'Gond' },
    { name: 'Jagannath Rath', url: '/artworks/pattachitra_rathyatra.jpg', form: 'Pattachitra' },
  ];

  const handleSave = (status) => {
    if (!title.trim()) {
      alert(t('artwork.titleRequired', 'Please provide an artwork title.'));
      return;
    }

    const today = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formattedDate = `${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
    const rawDate = today.toISOString().split('T')[0];

    const newArtwork = {
      id: Date.now(),
      title: title.trim(),
      artForm,
      type: category.trim() || 'Painting',
      status,
      date: formattedDate,
      rawDate,
      imageUrl: imagePreview || '/artworks/madhubani_harmony.jpg',
      materials: materials.trim() || 'Traditional handmade pigments on canvas/paper',
      techniques: techniques.trim() || 'Traditional Indian folk art rendering',
      description: description.trim() || 'Original traditional folk art creation.',
      interpretation: interpretation.trim() || '',
    };

    onSave(newArtwork);
    handleReset();
    onClose();
  };

  const handleReset = () => {
    setTitle('');
    setArtForm('Madhubani');
    setCategory('Painting');
    setMaterials('');
    setTechniques('');
    setDescription('');
    setInterpretation('');
    setImagePreview(null);
    setImageError(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-brown/50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-beige-light border border-beige-dark/70 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-beige-dark/40 mb-6">
          <div>
            <h2 className="font-serif font-bold text-brown text-xl sm:text-2xl leading-tight">
              {t('artwork.uploadModalTitle', 'Upload New Artwork')}
            </h2>
            <p className="text-xs font-sans text-brown/55 mt-0.5">
              {t('artwork.uploadModalSubtitle', 'Digitise your traditional creation and preserve its cultural story.')}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-beige hover:bg-beige-dark/40 border border-beige-dark/50 flex items-center justify-center text-brown/60 hover:text-brown transition-colors"
            aria-label={t('common.close', 'Close')}
          >
            <X size={16} />
          </button>
        </div>

        {/* ── Image Upload Section ── */}
        <div className="mb-6">
          <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider mb-2">
            {t('artwork.artworkImage', 'Artwork Image')} *
          </label>

          {imagePreview ? (
            <div className="relative rounded-xl overflow-hidden border border-beige-dark/70 bg-beige/40 p-2 flex items-center gap-4">
              <div className="w-28 h-20 rounded-lg overflow-hidden bg-brown/10 flex-shrink-0">
                <img
                  src={imagePreview}
                  alt="Upload preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-sans font-medium text-brown">
                  {t('artwork.imageSelected', 'Image selected')}
                </p>
                <p className="text-[11px] text-forest flex items-center gap-1 mt-0.5 font-medium">
                  <Check size={12} /> {t('artwork.readyDigitisation', 'Ready for digitisation')}
                </p>
                <button
                  type="button"
                  onClick={() => setImagePreview(null)}
                  className="text-[11px] text-terracotta hover:underline mt-1 inline-block"
                >
                  {t('artwork.changeImage', 'Change image')}
                </button>
              </div>
            </div>
          ) : (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-terracotta bg-terracotta/5'
                  : 'border-beige-dark/70 hover:border-ochre/60 bg-ivory/60'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/jpg"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="w-12 h-12 mx-auto rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center mb-3">
                <Upload size={20} strokeWidth={2} />
              </div>
              <p className="font-sans font-medium text-xs sm:text-sm text-brown">
                {t('artwork.dragDropPhoto', 'Drag and drop your artwork image here')},{' '}
                <span className="text-terracotta font-semibold">{t('artwork.orBrowseFiles', 'or click to browse from device')}</span>
              </p>
              <p className="font-sans text-[11px] text-brown/45 mt-1">
                {t('artwork.supportsFormats', 'Supports JPG, PNG, WEBP up to 25MB')}
              </p>

              {/* Quick sample pickers */}
              <div className="mt-4 pt-3 border-t border-beige-dark/40 flex items-center justify-center gap-2 flex-wrap text-[11px]">
                <span className="text-brown/40">{t('artwork.testSample', 'Or test with traditional sample:')}</span>
                {samplePresets.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImagePreview(preset.url);
                      setArtForm(preset.form);
                    }}
                    className="px-2 py-0.5 rounded bg-beige border border-beige-dark/50 text-brown/70 hover:text-terracotta hover:border-terracotta/40 transition-colors"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {imageError && (
            <p className="text-xs text-terracotta mt-2 flex items-center gap-1">
              <AlertCircle size={13} />
              {imageError}
            </p>
          )}
        </div>

        {/* ── Form Fields ── */}
        <div className="space-y-4">
          {/* Row 1: Title & Art Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-sans font-semibold text-brown mb-1.5">
                {t('artwork.artworkTitle', 'Artwork Title')} *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t('artwork.titlePlaceholder', "e.g. Nature's Harmony")}
                className="w-full px-3.5 py-2 bg-ivory border border-beige-dark/70 rounded-xl text-xs font-sans text-brown placeholder-brown/35 focus:outline-none focus:border-terracotta/50"
              />
            </div>

            <div>
              <label className="block text-xs font-sans font-semibold text-brown mb-1.5">
                {t('artwork.artFormLabel', 'Art Form')} *
              </label>
              <select
                value={artForm}
                onChange={(e) => setArtForm(e.target.value)}
                className="w-full px-3.5 py-2 bg-ivory border border-beige-dark/70 rounded-xl text-xs font-sans text-brown focus:outline-none focus:border-terracotta/50"
              >
                {artFormOptions.filter((f) => f !== 'All').map((form) => (
                  <option key={form} value={form}>
                    {form}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Category & Materials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-sans font-semibold text-brown mb-1.5">
                {t('artwork.categoryLabel', 'Category')}
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder={t('artwork.categoryPlaceholder', 'e.g. Painting, Scroll Art, Mural, Textile')}
                className="w-full px-3.5 py-2 bg-ivory border border-beige-dark/70 rounded-xl text-xs font-sans text-brown placeholder-brown/35 focus:outline-none focus:border-terracotta/50"
              />
            </div>

            <div>
              <label className="block text-xs font-sans font-semibold text-brown mb-1.5">
                {t('artwork.materialsUsed', 'Materials Used')}
              </label>
              <input
                type="text"
                value={materials}
                onChange={(e) => setMaterials(e.target.value)}
                placeholder={t('artwork.materialsPlaceholder', 'e.g. Natural stone pigments, bamboo twig pen, handmade paper')}
                className="w-full px-3.5 py-2 bg-ivory border border-beige-dark/70 rounded-xl text-xs font-sans text-brown placeholder-brown/35 focus:outline-none focus:border-terracotta/50"
              />
            </div>
          </div>

          {/* Techniques */}
          <div>
            <label className="block text-xs font-sans font-semibold text-brown mb-1.5">
              {t('artwork.techniques', 'Techniques')}
            </label>
            <input
              type="text"
              value={techniques}
              onChange={(e) => setTechniques(e.target.value)}
              placeholder={t('artwork.techniquesPlaceholder', 'e.g. Kachni fine line hatching, cow dung wash preparation')}
              className="w-full px-3.5 py-2 bg-ivory border border-beige-dark/70 rounded-xl text-xs font-sans text-brown placeholder-brown/35 focus:outline-none focus:border-terracotta/50"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-sans font-semibold text-brown mb-1.5">
              {t('artwork.descriptionLabel', 'Artwork Description & Cultural Significance')}
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t('artwork.descriptionPlaceholder', 'Describe the motifs, folklore, or cultural symbolism behind this artwork...')}
              className="w-full px-3.5 py-2 bg-ivory border border-beige-dark/70 rounded-xl text-xs font-sans text-brown placeholder-brown/35 focus:outline-none focus:border-terracotta/50 resize-none"
            />
          </div>

          {/* Personal Story */}
          <div>
            <label className="block text-xs font-sans font-semibold text-brown mb-1.5">
              {t('artwork.interpretationLabel', 'Personal Interpretation or Story')}
            </label>
            <textarea
              rows={2}
              value={interpretation}
              onChange={(e) => setInterpretation(e.target.value)}
              placeholder={t('artwork.interpretationPlaceholder', 'What inspired you while creating this piece? Share your personal artistic memory...')}
              className="w-full px-3.5 py-2 bg-ivory border border-beige-dark/70 rounded-xl text-xs font-sans text-brown placeholder-brown/35 focus:outline-none focus:border-terracotta/50 resize-none"
            />
          </div>
        </div>

        {/* ── Action Buttons ── */}
        <div className="mt-8 pt-4 border-t border-beige-dark/50 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-beige border border-beige-dark/60 text-xs font-sans font-medium text-brown hover:bg-beige-dark/30 transition-colors"
          >
            {t('common.cancel', 'Cancel')}
          </button>

          <button
            type="button"
            onClick={() => handleSave('Draft')}
            className="px-4 py-2 rounded-lg bg-beige border border-ochre/40 text-xs font-sans font-medium text-ochre-dark hover:bg-ochre/15 transition-colors"
          >
            {t('artwork.saveAsDraft', 'Save as Draft')}
          </button>

          <button
            type="button"
            onClick={() => handleSave('Published')}
            className="btn-primary"
          >
            {t('artwork.saveAndPublish', 'Save & Publish')}
          </button>
        </div>
      </div>
    </div>
  );
}
