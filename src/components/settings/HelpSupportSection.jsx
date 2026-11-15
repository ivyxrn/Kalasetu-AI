import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HelpCircle,
  ChevronDown,
  MessageCircle,
  AlertTriangle,
  Mail,
  Send,
  CheckCircle2,
  BookOpen,
  Image,
  Sparkles,
  DollarSign,
  Share2,
  ArrowRight,
} from 'lucide-react';
import { faqList } from '../../data/settingsData';
import { useLanguage } from '../../i18n';

export default function HelpSupportSection() {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [openFaqId, setOpenFaqId] = useState('faq-1');
  const [supportCategory, setSupportCategory] = useState('general');
  const [supportMessage, setSupportMessage] = useState('');
  const [supportName, setSupportName] = useState('Ivy Maiti');
  const [supportContact, setSupportContact] = useState('+91 98765 43210');
  const [submittedModal, setSubmittedModal] = useState(false);

  const toggleFaq = (id) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    if (!supportMessage.trim()) return;
    setSubmittedModal(true);
    setSupportMessage('');
  };

  return (
    <div className="bg-ivory rounded-2xl border border-beige-dark/65 p-6 sm:p-8 shadow-sm space-y-10">
      {/* Header */}
      <div className="border-b border-beige-dark/50 pb-5">
        <div className="flex items-center gap-2 mb-1">
          <HelpCircle size={20} className="text-terracotta" />
          <h3 className="font-serif font-bold text-brown text-xl sm:text-2xl">
            {t('help.title')}
          </h3>
        </div>
        <p className="font-sans text-xs sm:text-sm text-brown/65 leading-relaxed">
          {t('help.intro')}
        </p>

        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-beige/50 border border-ochre/30">
          <p className="text-xs font-sans text-brown/75">
            {t('help.lookingForGuides')}
          </p>
          <button
            type="button"
            onClick={() => navigate('/help')}
            className="btn-primary text-xs py-1.5 px-3.5 flex-shrink-0 flex items-center gap-1.5 shadow-xs"
          >
            <span>{t('help.openHelpDesk')}</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* ── 1. How to Use KalaSetu AI – Quick Guide ── */}
      <div>
        <h4 className="font-serif font-bold text-brown text-base sm:text-lg mb-3">
          {t('help.howItHelps')}
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="p-4 rounded-xl bg-beige/40 border border-beige-dark/50 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-terracotta/10 text-terracotta flex items-center justify-center font-bold text-xs mb-2.5">
                1
              </div>
              <h5 className="font-serif font-semibold text-brown text-sm">
                Digitise Artwork
              </h5>
              <p className="text-xs font-sans text-brown/65 mt-1 leading-relaxed">
                Take a photo of your traditional painting and preserve its natural pigments and materials online.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-beige/40 border border-beige-dark/50 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-forest/10 text-forest flex items-center justify-center font-bold text-xs mb-2.5">
                2
              </div>
              <h5 className="font-serif font-semibold text-brown text-sm">
                AI ArtStory
              </h5>
              <p className="text-xs font-sans text-brown/65 mt-1 leading-relaxed">
                Turn your family folk memories and cultural lore into lyrical stories in English and Hindi.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-beige/40 border border-beige-dark/50 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-ochre/20 text-ochre-dark flex items-center justify-center font-bold text-xs mb-2.5">
                3
              </div>
              <h5 className="font-serif font-semibold text-brown text-sm">
                Fair Pricing
              </h5>
              <p className="text-xs font-sans text-brown/65 mt-1 leading-relaxed">
                Calculate honest pricing based on your real hours, material costs, and rightful artisan profit.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-beige/40 border border-beige-dark/50 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-brown/10 text-brown flex items-center justify-center font-bold text-xs mb-2.5">
                4
              </div>
              <h5 className="font-serif font-semibold text-brown text-sm">
                Share Portfolio
              </h5>
              <p className="text-xs font-sans text-brown/65 mt-1 leading-relaxed">
                Present your creations to art connoisseurs and exhibitions with your custom digital portfolio.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. Frequently Asked Questions Accordion ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-serif font-bold text-brown text-base sm:text-lg">
            Frequently Asked Questions
          </h4>
          <span className="text-xs font-sans text-brown/50">
            Click any question to view the answer
          </span>
        </div>

        <div className="space-y-3">
          {faqList.map((faq) => {
            const isOpen = openFaqId === faq.id;

            return (
              <div
                key={faq.id}
                className="border border-beige-dark/60 rounded-xl overflow-hidden bg-ivory transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-3 hover:bg-beige/30 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif font-semibold text-brown text-sm sm:text-base">
                    {faq.question}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-full bg-beige flex items-center justify-center text-brown/60 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-ochre/20 text-ochre-dark' : ''
                    }`}
                  >
                    <ChevronDown size={15} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-[13px] font-sans text-brown/75 leading-relaxed border-t border-beige-dark/30 bg-beige/20 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 3. Contact Support & Report a Problem ── */}
      <div className="p-6 rounded-2xl bg-beige/35 border border-beige-dark/60">
        <div className="flex items-center gap-2 mb-1">
          <MessageCircle size={18} className="text-terracotta" />
          <h4 className="font-serif font-bold text-brown text-base sm:text-lg">
            Ask a Question or Report an Issue
          </h4>
        </div>
        <p className="text-xs font-sans text-brown/65 mb-5 leading-relaxed">
          Need help with your artwork, uploading photos, or understanding a feature? Send a quick message to our artisan care team.
        </p>

        <form onSubmit={handleSupportSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={supportName}
                onChange={(e) => setSupportName(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-ivory border border-beige-dark/70 text-xs font-sans text-brown focus:outline-none focus:border-terracotta transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider mb-1">
                Phone or WhatsApp
              </label>
              <input
                type="text"
                value={supportContact}
                onChange={(e) => setSupportContact(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-ivory border border-beige-dark/70 text-xs font-sans text-brown focus:outline-none focus:border-terracotta transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider mb-1">
                Topic
              </label>
              <select
                value={supportCategory}
                onChange={(e) => setSupportCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-ivory border border-beige-dark/70 text-xs font-sans text-brown focus:outline-none focus:border-terracotta transition-all"
              >
                <option value="general">General Question</option>
                <option value="artwork">Help Uploading Artwork</option>
                <option value="pricing">Fair Pricing Question</option>
                <option value="story">AI ArtStory Question</option>
                <option value="bug">Report a Problem / Bug</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider mb-1">
              Your Message
            </label>
            <textarea
              rows={3}
              value={supportMessage}
              onChange={(e) => setSupportMessage(e.target.value)}
              required
              placeholder="Describe what you need help with in simple words..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-ivory border border-beige-dark/70 text-xs sm:text-sm font-sans text-brown placeholder-brown/40 focus:outline-none focus:border-terracotta transition-all resize-none leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] font-sans text-brown/50">
              Our support team typically responds within 24 hours.
            </span>

            <button
              type="submit"
              className="btn-primary text-xs py-2 px-5 flex items-center gap-1.5 shadow-sm"
            >
              <Send size={13} />
              <span>Send Message</span>
            </button>
          </div>
        </form>
      </div>

      {/* Reassuring Submission Modal */}
      {submittedModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-brown/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="relative w-full max-w-md bg-ivory rounded-3xl border border-beige-dark/70 shadow-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-forest/10 text-forest flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 size={24} />
            </div>

            <h4 className="font-serif font-bold text-brown text-lg mb-1">
              Message Received
            </h4>
            <p className="font-sans text-xs text-brown/70 mb-5 leading-relaxed">
              Thank you, <strong className="text-brown">{supportName}</strong>. Your question has been forwarded to our artisan care team. We will reach out to you via WhatsApp / phone at <strong>{supportContact}</strong> shortly.
            </p>

            <button
              type="button"
              onClick={() => setSubmittedModal(false)}
              className="btn-primary text-xs py-2 px-6 mx-auto"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
