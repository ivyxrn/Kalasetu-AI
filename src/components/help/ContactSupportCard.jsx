import React, { useState } from 'react';
import {
  Send,
  Paperclip,
  X,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Info,
  Bug,
} from 'lucide-react';
import { supportDropdownOptions } from '../../data/helpData';
import { useLanguage } from '../../i18n';

export default function ContactSupportCard({ onOpenReportProblem }) {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: 'Ivy Maiti',
    email: 'ivy.maiti.crafts@gmail.com',
    topic: 'Uploading Artwork',
    message: '',
  });

  const [attachment, setAttachment] = useState(null);
  const [attachmentPreview, setAttachmentPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          file: t('help.errors.fileSize', 'File must be under 5MB.'),
        }));
        return;
      }

      setAttachment(file);
      setErrors((prev) => ({ ...prev, file: null }));

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAttachmentPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setAttachmentPreview(null);
      }
    }
  };

  const removeAttachment = () => {
    setAttachment(null);
    setAttachmentPreview(null);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = t('help.errors.name', 'Please provide your name.');
    if (!formData.email.trim() || !formData.email.includes('@'))
      newErrors.email = t('help.errors.email', 'Please provide a valid email address.');
    if (!formData.message.trim() || formData.message.trim().length < 10)
      newErrors.message = t('help.errors.message', 'Please describe your question or problem (at least 10 characters).');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmittedData({
      ...formData,
      attachmentName: attachment ? attachment.name : null,
      submittedAt: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    });

    setShowDemoModal(true);
    setFormData((prev) => ({ ...prev, message: '' }));
    removeAttachment();
  };

  return (
    <div id="contact-support-section" className="bg-ivory rounded-3xl border border-beige-dark/70 p-6 sm:p-10 shadow-sm scroll-mt-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 pb-5 border-b border-beige-dark/50">
        <div>
          <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-terracotta block mb-1">
            {t('help.artisanCareBadge')}
          </span>
          <h2 className="font-serif font-bold text-brown text-2xl sm:text-3xl">
            {t('help.stillNeedHelp')}
          </h2>
          <p className="font-sans text-xs sm:text-sm text-brown/70 mt-1.5 leading-relaxed max-w-xl">
            {t('help.contactDesc')}
          </p>
        </div>

        {/* Quick Report a Bug Button */}
        <button
          type="button"
          onClick={onOpenReportProblem}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-beige hover:bg-beige-dark/30 border border-beige-dark/60 text-xs font-sans font-medium text-brown transition-colors self-start shadow-xs"
        >
          <Bug size={14} className="text-terracotta" />
          <span>{t('help.reportTechnicalProblem')}</span>
        </button>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Your Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider">
              {t('help.yourName')} <span className="text-terracotta">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g. Ivy Maiti"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-beige-light/70 border text-sm font-sans text-brown placeholder-brown/40 focus:outline-none focus:ring-1 transition-all ${
                errors.name
                  ? 'border-terracotta focus:ring-terracotta'
                  : 'border-beige-dark/70 focus:border-terracotta focus:ring-terracotta'
              }`}
            />
            {errors.name && (
              <p className="text-[11px] font-sans text-terracotta flex items-center gap-1 mt-1">
                <AlertCircle size={11} />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          {/* Email Address */}
          <div className="space-y-1.5">
            <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider">
              {t('help.emailAddress')} <span className="text-terracotta">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="e.g. ivy.maiti.crafts@gmail.com"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-beige-light/70 border text-sm font-sans text-brown placeholder-brown/40 focus:outline-none focus:ring-1 transition-all ${
                errors.email
                  ? 'border-terracotta focus:ring-terracotta'
                  : 'border-beige-dark/70 focus:border-terracotta focus:ring-terracotta'
              }`}
            />
            {errors.email && (
              <p className="text-[11px] font-sans text-terracotta flex items-center gap-1 mt-1">
                <AlertCircle size={11} />
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          {/* What do you need help with? Dropdown */}
          <div className="sm:col-span-2 space-y-1.5">
            <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider">
              {t('help.whatNeedHelpWith')} <span className="text-terracotta">*</span>
            </label>
            <select
              name="topic"
              value={formData.topic}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-beige-light/70 border border-beige-dark/70 text-sm font-sans text-brown focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-all"
            >
              {supportDropdownOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Describe your question or problem */}
          <div className="sm:col-span-2 space-y-1.5">
            <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider">
              {t('help.describeQuestion')} <span className="text-terracotta">*</span>
            </label>
            <textarea
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              placeholder={t('help.describeQuestionPlaceholder')}
              className={`w-full px-3.5 py-2.5 rounded-xl bg-beige-light/70 border text-sm font-sans text-brown placeholder-brown/40 focus:outline-none focus:ring-1 transition-all resize-none leading-relaxed ${
                errors.message
                  ? 'border-terracotta focus:ring-terracotta'
                  : 'border-beige-dark/70 focus:border-terracotta focus:ring-terracotta'
              }`}
            />
            {errors.message && (
              <p className="text-[11px] font-sans text-terracotta flex items-center gap-1 mt-1">
                <AlertCircle size={11} />
                <span>{errors.message}</span>
              </p>
            )}
          </div>

          {/* Optional Attachment */}
          <div className="sm:col-span-2 space-y-2">
            <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider">
              {t('help.optionalScreenshot', 'Optional Screenshot or Attachment')}
            </label>

            {!attachment ? (
              <div className="flex items-center gap-3">
                <label
                  htmlFor="support-file-input"
                  className="px-4 py-2 rounded-xl bg-beige hover:bg-beige-dark/30 border border-beige-dark/70 text-xs font-sans font-medium text-brown cursor-pointer transition-colors inline-flex items-center gap-2 shadow-xs"
                >
                  <Paperclip size={14} className="text-brown/60" />
                  <span>{t('help.attachImageOrFile', 'Attach Image or File')}</span>
                  <input
                    id="support-file-input"
                    type="file"
                    accept="image/*,.pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
                <span className="text-[11px] font-sans text-brown/45">
                  {t('help.screenshotHelp', 'Screenshots of your screen help us understand (up to 5MB)')}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-beige/50 border border-beige-dark/60 w-fit">
                {attachmentPreview ? (
                  <img
                    src={attachmentPreview}
                    alt="Preview"
                    className="w-10 h-10 object-cover rounded-lg border border-beige-dark/60"
                  />
                ) : (
                  <Paperclip size={18} className="text-terracotta" />
                )}
                <div className="text-left">
                  <p className="text-xs font-sans font-semibold text-brown truncate max-w-[200px]">
                    {attachment.name}
                  </p>
                  <p className="text-[10px] font-sans text-brown/50">
                    {(attachment.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={removeAttachment}
                  className="p-1 rounded-full hover:bg-beige text-brown/50 hover:text-brown transition-colors ml-2"
                  title="Remove attachment"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            {errors.file && (
              <p className="text-[11px] font-sans text-terracotta flex items-center gap-1">
                <AlertCircle size={11} />
                <span>{errors.file}</span>
              </p>
            )}
          </div>
        </div>

        {/* ── Demo Notice & Submit Button ── */}
        <div className="pt-4 border-t border-beige-dark/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-2 max-w-md text-xs font-sans text-brown/65 leading-snug">
            <Info size={14} className="text-ochre-dark flex-shrink-0 mt-0.5" />
            <span>
              {t('help.demoNotice')}
            </span>
          </div>

          <button
            type="submit"
            className="btn-primary text-xs py-2.5 px-6 shadow-md flex items-center gap-2 self-stretch sm:self-auto justify-center"
          >
            <Send size={14} />
            <span>{t('help.submitRequest')}</span>
          </button>
        </div>
      </form>

      {/* Confirmation State Modal */}
      {showDemoModal && submittedData && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-brown/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="relative w-full max-w-md bg-ivory rounded-3xl border border-beige-dark/70 shadow-2xl p-6 sm:p-7 text-center">
            <div className="w-14 h-14 rounded-full bg-forest/10 text-forest border border-forest/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={28} />
            </div>

            <h3 className="font-serif font-bold text-brown text-xl mb-1">
              {t('help.requestReceived')}
            </h3>
            <p className="font-sans text-xs text-brown/70 mb-5 leading-relaxed">
              {t('help.thankYouMessage', { name: submittedData.name })}
            </p>

            <div className="p-3.5 rounded-xl bg-beige/40 border border-beige-dark/50 text-left text-xs font-sans space-y-1.5 mb-6 text-brown/75">
              <div>
                <strong>{t('help.yourName')}:</strong> {submittedData.name}
              </div>
              <div>
                <strong>{t('help.emailAddress')}:</strong> {submittedData.email}
              </div>
              <div>
                <strong>{t('help.whatNeedHelpWith')}:</strong> {submittedData.topic}
              </div>
              {submittedData.attachmentName && (
                <div>
                  <strong>{t('help.optionalScreenshot')}:</strong> {submittedData.attachmentName}
                </div>
              )}
              <div className="text-[10px] text-brown/50 pt-1 border-t border-beige-dark/30">
                {t('help.responsePromise', { email: submittedData.email })}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowDemoModal(false)}
              className="btn-primary text-xs py-2 px-6 mx-auto"
            >
              {t('help.closeDialog')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
