import React, { useState } from 'react';
import {
  X,
  Bug,
  Paperclip,
  CheckCircle2,
  AlertCircle,
  Info,
} from 'lucide-react';
import { useLanguage } from '../../i18n';

const featureOptions = [
  'Dashboard',
  'My Artwork (Upload or Grid)',
  '3D Gallery View',
  'Fair Pricing Assistant',
  'AI ArtStory Generator',
  'Catalogue Creation',
  'My Portfolio',
  'Heritage Archive',
  'Settings & Accessibility',
  'Other / Unsure',
];

export default function ReportProblemModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  const [feature, setFeature] = useState('My Artwork (Upload or Grid)');
  const [description, setDescription] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleScreenshotChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setScreenshot(file);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => setScreenshotPreview(reader.result);
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim() || description.trim().length < 10) {
      setError(t('help.errors.message', 'Please tell us what went wrong (at least 10 characters).'));
      return;
    }
    setError(null);
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setDescription('');
    setScreenshot(null);
    setScreenshotPreview(null);
    setError(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-brown/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-fade-in"
      onClick={handleResetAndClose}
    >
      <div
        className="relative w-full max-w-lg bg-ivory rounded-3xl border border-beige-dark/70 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-beige/40 border-b border-beige-dark/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center border border-terracotta/20">
              <Bug size={18} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-brown text-lg">
                {t('help.reportProblemTitle', 'Report a Technical Problem')}
              </h3>
              <p className="text-xs font-sans text-brown/60">
                {t('help.reportProblemSubtitle', "Let us know if something isn't working smoothly")}
              </p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="w-8 h-8 rounded-full bg-beige hover:bg-beige-dark/40 flex items-center justify-center text-brown/60 hover:text-brown transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Feature Dropdown */}
            <div className="space-y-1">
              <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider">
                {t('help.whichFeature', 'Which feature has an issue?')} <span className="text-terracotta">*</span>
              </label>
              <select
                value={feature}
                onChange={(e) => setFeature(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-beige-light border border-beige-dark/70 text-xs sm:text-sm font-sans text-brown focus:outline-none focus:border-terracotta"
              >
                {featureOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider">
                {t('help.whatWentWrong', 'What went wrong?')} <span className="text-terracotta">*</span>
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (error) setError(null);
                }}
                placeholder={t('help.whatWentWrongPlaceholder', 'For example: When I clicked on upload, the photo did not display, or the page took too long...')}
                className="w-full px-3.5 py-2.5 rounded-xl bg-beige-light border border-beige-dark/70 text-xs sm:text-sm font-sans text-brown placeholder-brown/40 focus:outline-none focus:border-terracotta resize-none leading-relaxed"
              />
              {error && (
                <p className="text-[11px] font-sans text-terracotta flex items-center gap-1 mt-1">
                  <AlertCircle size={11} />
                  <span>{error}</span>
                </p>
              )}
            </div>

            {/* Screenshot attachment */}
            <div className="space-y-1.5">
              <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider">
                {t('help.attachScreenshot', 'Attach Screenshot (Optional)')}
              </label>

              {!screenshot ? (
                <label
                  htmlFor="bug-screenshot-file"
                  className="px-3.5 py-2 rounded-xl bg-beige hover:bg-beige-dark/30 border border-beige-dark/60 text-xs font-sans font-medium text-brown cursor-pointer transition-colors inline-flex items-center gap-2"
                >
                  <Paperclip size={13} className="text-brown/50" />
                  <span>{t('help.chooseImage', 'Choose Image')}</span>
                  <input
                    id="bug-screenshot-file"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleScreenshotChange}
                  />
                </label>
              ) : (
                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-beige/40 border border-beige-dark/50 w-fit">
                  {screenshotPreview && (
                    <img
                      src={screenshotPreview}
                      alt="Bug preview"
                      className="w-8 h-8 object-cover rounded-md"
                    />
                  )}
                  <span className="text-xs font-sans text-brown truncate max-w-[180px]">
                    {screenshot.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setScreenshot(null);
                      setScreenshotPreview(null);
                    }}
                    className="p-1 text-brown/45 hover:text-brown"
                  >
                    <X size={12} />
                  </button>
                </div>
              )}
            </div>

            <div className="p-3 rounded-xl bg-ochre/15 border border-ochre/30 flex items-start gap-2 text-[11px] font-sans text-brown/75 leading-relaxed">
              <Info size={14} className="text-ochre-dark flex-shrink-0 mt-0.5" />
              <span>
                {t('help.demoEngineering', 'Frontend Demo Mode: This report will be catalogued in the browser demo and is ready to forward to engineering upon Supabase connection.')}
              </span>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-4 py-2 rounded-xl bg-beige border border-beige-dark/60 text-xs font-sans font-medium text-brown hover:bg-beige-dark/30 transition-colors"
              >
                {t('common.cancel', 'Cancel')}
              </button>
              <button
                type="submit"
                className="btn-primary text-xs py-2 px-5 shadow-sm"
              >
                {t('help.submitBugReport', 'Submit Bug Report')}
              </button>
            </div>
          </form>
        ) : (
          <div className="p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-forest/10 text-forest flex items-center justify-center mx-auto">
              <CheckCircle2 size={24} />
            </div>

            <h4 className="font-serif font-bold text-brown text-lg">
              {t('help.reportLoggedTitle', 'Problem Report Logged')}
            </h4>
            <p className="font-sans text-xs text-brown/70 leading-relaxed max-w-sm mx-auto">
              {t('help.reportLoggedDesc', { feature }, `Thank you for helping us polish KalaSetu AI. Your note regarding "${feature}" has been saved in the demo log.`)}
            </p>

            <button
              type="button"
              onClick={handleResetAndClose}
              className="btn-primary text-xs py-2 px-6 mx-auto"
            >
              {t('help.done', 'Done')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
