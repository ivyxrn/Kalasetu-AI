import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageCircle, Phone, User, Mail } from 'lucide-react';
import { useLanguage } from '../../i18n';

export default function InquiryModal({ selectedArtwork, artisanName, isOpen, onClose, onSent }) {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState(
    selectedArtwork
      ? `Namaste! I would like to inquire about "${selectedArtwork.title}" (${selectedArtwork.artForm} Painting). Is this piece or a custom commission available?`
      : 'Namaste! I love your traditional creations and would like to inquire about purchasing or commissioning artwork.'
  );
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onSent();
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-brown/70 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-lg bg-ivory rounded-3xl border border-beige-dark/70 shadow-2xl p-6 sm:p-8">
        <button
          onClick={onClose}
          aria-label={t('common.close', 'Close')}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-beige text-brown/50 hover:text-brown"
        >
          <X size={16} />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3 animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-forest/10 text-forest flex items-center justify-center mx-auto">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="font-serif font-bold text-brown text-xl">
              {t('portfolio.inquirySent', { name: artisanName }, `Inquiry Sent to ${artisanName}!`)}
            </h3>
            <p className="font-sans text-xs text-brown/65 max-w-xs mx-auto">
              {t('portfolio.inquirySentDesc', 'The artisan will receive your message and respond directly via phone or WhatsApp.')}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-terracotta">
                {t('portfolio.directInquiry', 'Direct Artisan Inquiry')}
              </span>
              <h3 className="font-serif font-bold text-brown text-xl mt-0.5">
                {t('portfolio.messageArtisan', { name: artisanName }, `Message ${artisanName}`)}
              </h3>
              <p className="font-sans text-xs text-brown/60">
                {t('portfolio.inquirySubtitle', 'Inquire about authentic handmade creations, pricing, or custom pieces.')}
              </p>
            </div>

            {selectedArtwork && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-beige/50 border border-beige-dark/60 text-xs font-sans">
                <img
                  src={selectedArtwork.imageUrl}
                  alt={selectedArtwork.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <div className="font-bold text-brown">{selectedArtwork.title}</div>
                  <div className="text-brown/60">{selectedArtwork.artForm}</div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider mb-1">
                {t('settings.fullName', 'Your Name')} <span className="text-terracotta">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Kumar / Ananya Sen"
                className="w-full px-3.5 py-2 bg-beige-light border border-beige-dark/70 rounded-xl text-xs font-sans text-brown focus:outline-none focus:border-terracotta"
              />
            </div>

            <div>
              <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider mb-1">
                {t('portfolio.yourPhone', 'Your Phone Number / WhatsApp')} <span className="text-terracotta">*</span>
              </label>
              <input
                type="text"
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="e.g. +91 98300 12345"
                className="w-full px-3.5 py-2 bg-beige-light border border-beige-dark/70 rounded-xl text-xs font-sans text-brown focus:outline-none focus:border-terracotta"
              />
            </div>

            <div>
              <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider mb-1">
                {t('portfolio.yourMessage', 'Your Message')}
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 bg-beige-light border border-beige-dark/70 rounded-xl text-xs font-sans text-brown leading-relaxed focus:outline-none focus:border-terracotta"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-beige border border-beige-dark/60 text-xs font-sans font-medium text-brown hover:bg-beige-dark/30 transition-colors"
              >
                {t('common.cancel', 'Cancel')}
              </button>
              <button
                type="submit"
                className="btn-primary text-xs py-2 px-5 flex items-center gap-1.5 shadow-md"
              >
                <Send size={13} />
                <span>{t('portfolio.sendMessage', 'Send Message')}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
