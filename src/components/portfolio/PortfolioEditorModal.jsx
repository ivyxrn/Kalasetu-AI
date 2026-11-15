import React, { useState } from 'react';
import {
  X,
  Save,
  Mic,
  MicOff,
  Sparkles,
  Check,
  CheckCircle2,
  Info,
  Layers,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Calendar,
  Volume2,
} from 'lucide-react';
import { guidedPortfolioQuestions } from '../../data/portfolioData';
import { useLanguage } from '../../i18n';

export default function PortfolioEditorModal({
  portfolio,
  availableArtworks,
  isOpen,
  onClose,
  onSave,
}) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ ...portfolio });
  const [activeTab, setActiveTab] = useState('about'); // 'about' | 'story' | 'artworks' | 'contact' | 'optional'

  // Voice Input Simulation State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingField, setRecordingField] = useState(null);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleToggleFeaturedArtwork = (id) => {
    setFormData((prev) => {
      const current = prev.featuredArtworkIds || [];
      const updated = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];
      return { ...prev, featuredArtworkIds: updated };
    });
  };

  // Simulate Speech-to-Text Voice Input
  const handleStartVoiceInput = (field, promptText) => {
    setIsRecording(true);
    setRecordingField(field);

    setTimeout(() => {
      // Simulate real spoken transcript
      let simulatedTranscript = '';
      if (field === 'learningStory') {
        simulatedTranscript =
          'I learned by sitting beside my grandmother in our courtyard during festivals. She showed me how to grind dried parijat flowers into water and hold a thin bamboo pen to draw the sacred fish.';
      } else if (field === 'inspirationStory') {
        simulatedTranscript =
          'I am inspired by our morning pond, the birds in the Mahua branches, and our village harvest celebrations under the autumn full moon.';
      } else if (field === 'whatMakesItSpecial') {
        simulatedTranscript =
          'In our traditional craft, every line is a prayer of gratitude to the earth. It is not just decoration, it carries our ancestral blessings.';
      } else if (field === 'materialsUsed') {
        simulatedTranscript =
          'Natural stone pigments, river clay, handmade paper, and bamboo twigs.';
      } else {
        simulatedTranscript =
          'My creations are inspired by the ancient folklore and living traditions of our ancestors.';
      }

      setFormData((prev) => ({
        ...prev,
        [field]: prev[field]
          ? `${prev[field]} ${simulatedTranscript}`
          : simulatedTranscript,
      }));
      setIsRecording(false);
      setRecordingField(null);
    }, 2400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const tabs = [
    { id: 'about', label: t('portfolio.tabs.about', '1. Tell People About Yourself') },
    { id: 'story', label: t('portfolio.tabs.story', '2. My Story (Guided Questions)') },
    { id: 'artworks', label: t('portfolio.tabs.artworks', '3. Featured Artworks') },
    { id: 'contact', label: t('portfolio.tabs.contact', '4. Contact & Spoken Languages') },
    { id: 'optional', label: t('portfolio.tabs.optional', '5. Journey & Achievements (Optional)') },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-brown/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-ivory rounded-3xl border border-beige-dark/70 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* ── Modal Header ── */}
        <div className="px-6 py-4 bg-beige/40 border-b border-beige-dark/50 flex items-center justify-between">
          <div>
            <h2 className="font-serif font-bold text-brown text-lg sm:text-xl">
              {t('portfolio.editTitle', 'Edit My Portfolio & Story')}
            </h2>
            <p className="text-xs font-sans text-brown/65">
              {t('portfolio.editSubtitle', 'Simple, conversational details introducing your handmade craft to the world')}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label={t('common.close', 'Close')}
            className="p-1.5 rounded-lg hover:bg-beige text-brown/60 hover:text-brown transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Friendly Accessible Tab Bar ── */}
        <div className="px-6 py-2.5 bg-ivory border-b border-beige-dark/40 overflow-x-auto scrollbar-none flex items-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-sans font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-terracotta text-white shadow-sm'
                  : 'bg-beige/60 text-brown/70 hover:bg-beige hover:text-brown'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Voice Input Simulation Banner ── */}
        {isRecording && (
          <div className="mx-6 mt-4 p-3.5 rounded-2xl bg-terracotta/10 border border-terracotta/30 flex items-center justify-between text-xs font-sans text-terracotta animate-pulse">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-terracotta animate-ping" />
              <span className="font-semibold">
                {t('portfolio.listeningVoice', 'Listening to your voice... Speak naturally in your own language.')}
              </span>
            </div>
            <span className="text-[11px] opacity-80">
              {t('portfolio.speechToText', 'Speech-to-Text Transcription in Progress')}
            </span>
          </div>
        )}

        {/* ── Modal Form Body ── */}
        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-8 flex-1 overflow-y-auto space-y-6"
        >
          {/* ─────────────────────────────────────────────────────────────
              TAB 1: ABOUT YOU & YOUR CRAFT
             ───────────────────────────────────────────────────────────── */}
          {activeTab === 'about' && (
            <div className="space-y-5 animate-fade-in max-w-2xl mx-auto">
              <div>
                <h3 className="font-serif font-bold text-brown text-xl mb-1">
                  {t('portfolio.tellAboutYourself', 'Tell People About Yourself')}
                </h3>
                <p className="font-sans text-xs text-brown/65">
                  {t('portfolio.aboutSubtitle', 'Your name, your home region, and your primary traditional craft.')}
                </p>
              </div>

              <div>
                <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider mb-1.5">
                  {t('settings.fullName', 'Your Full Name')} <span className="text-terracotta">*</span>
                </label>
                <input
                  type="text"
                  value={formData.artisanName}
                  onChange={(e) => handleChange('artisanName', e.target.value)}
                  required
                  placeholder="e.g. Ivy Maiti"
                  className="w-full px-4 py-2.5 bg-beige-light border border-beige-dark/70 rounded-xl text-sm font-serif font-bold text-brown focus:outline-none focus:border-terracotta"
                />
              </div>

              <div>
                <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider mb-1.5">
                  {t('portfolio.whatCraft', 'What craft do you practise?')}
                </label>
                <input
                  type="text"
                  value={formData.craftTitle}
                  onChange={(e) => handleChange('craftTitle', e.target.value)}
                  placeholder={t('portfolio.craftPlaceholder', 'e.g. Traditional Indian Folk & Tribal Artisan')}
                  className="w-full px-4 py-2.5 bg-beige-light border border-beige-dark/70 rounded-xl text-xs font-sans text-brown focus:outline-none focus:border-terracotta"
                />
              </div>

              <div>
                <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider mb-1.5">
                  {t('portfolio.homeRegion', 'Your Home State / Village / Region')}
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder={t('portfolio.homeRegionPlaceholder', 'e.g. West Bengal, India')}
                  className="w-full px-4 py-2.5 bg-beige-light border border-beige-dark/70 rounded-xl text-xs font-sans text-brown focus:outline-none focus:border-terracotta"
                />
              </div>

              <div>
                <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider mb-1.5">
                  {t('portfolio.personalThought', 'A Personal Thought or Motto (Optional)')}
                </label>
                <textarea
                  rows={2}
                  value={formData.personalQuote}
                  onChange={(e) => handleChange('personalQuote', e.target.value)}
                  placeholder="e.g. Every stroke of colour carries the blessings of my grandmother and the rhythm of our village earth."
                  className="w-full p-3.5 bg-beige-light border border-beige-dark/70 rounded-xl text-xs font-serif italic text-brown leading-relaxed focus:outline-none focus:border-terracotta"
                />
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              TAB 2: MY STORY (GUIDED QUESTIONS WITH VOICE PROMPTS)
             ───────────────────────────────────────────────────────────── */}
          {activeTab === 'story' && (
            <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
              <div className="p-4 rounded-2xl bg-ochre/15 border border-ochre/30 flex items-start gap-3">
                <Sparkles size={18} className="text-terracotta flex-shrink-0 mt-0.5" />
                <div className="text-xs font-sans text-brown/80 leading-relaxed">
                  <strong>{t('portfolio.guidedStorytellingTitle', 'Guided Storytelling:')}</strong> {t('portfolio.guidedStorytellingDesc', 'Answer these simple questions in your own natural words. You can type them, or click the microphone to speak your answer in Hindi, Bengali, or English!')}
                </div>
              </div>

              {guidedPortfolioQuestions.map((q) => (
                <div
                  key={q.id}
                  className="p-5 rounded-2xl bg-beige/40 border border-beige-dark/60 space-y-2.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="font-serif font-bold text-brown text-base">
                        {t(`portfolio.questions.${q.id}`, q.label)}
                      </h4>
                      <p className="text-[11px] font-sans text-brown/60">
                        {t(`portfolio.questions.${q.id}Sub`, q.subtitle)}
                      </p>
                    </div>

                    {/* Microphone Voice Input Helper Button */}
                    <button
                      type="button"
                      onClick={() => handleStartVoiceInput(q.id, q.voicePrompt)}
                      disabled={isRecording}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-ivory hover:bg-beige border border-ochre/40 text-terracotta text-xs font-sans font-medium transition-all shadow-sm flex-shrink-0 self-start sm:self-auto"
                      title={t('portfolio.speakAnswerTitle', 'Speak your answer instead of typing')}
                    >
                      <Mic size={14} className="text-terracotta" />
                      <span>{t('portfolio.speakAnswer', 'Speak Answer (Voice)')}</span>
                    </button>
                  </div>

                  <textarea
                    rows={3}
                    value={formData[q.id] || ''}
                    onChange={(e) => handleChange(q.id, e.target.value)}
                    placeholder={t(`portfolio.questions.${q.id}Ph`, q.placeholder)}
                    className="w-full p-3.5 bg-ivory border border-beige-dark/70 rounded-xl text-xs font-serif text-brown leading-relaxed focus:outline-none focus:border-terracotta"
                  />
                </div>
              ))}
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              TAB 3: FEATURED ARTWORKS
             ───────────────────────────────────────────────────────────── */}
          {activeTab === 'artworks' && (
            <div className="space-y-5 animate-fade-in max-w-3xl mx-auto">
              <div>
                <h3 className="font-serif font-bold text-brown text-xl mb-1">
                  {t('portfolio.chooseShowcase', 'Choose Artworks to Showcase')}
                </h3>
                <p className="font-sans text-xs text-brown/65">
                  {t('portfolio.showcaseSubtitle', 'Select which creations from your collection to highlight on your public portfolio page.')}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 max-h-[440px] overflow-y-auto pr-1">
                {availableArtworks.map((art) => {
                  const isFeatured = (formData.featuredArtworkIds || []).includes(
                    art.id
                  );

                  return (
                    <div
                      key={art.id}
                      onClick={() => handleToggleFeaturedArtwork(art.id)}
                      className={`group p-2 rounded-xl border-2 transition-all cursor-pointer bg-beige-light flex flex-col justify-between select-none ${
                        isFeatured
                          ? 'border-terracotta ring-2 ring-terracotta/30 bg-ivory shadow-md scale-[1.02]'
                          : 'border-beige-dark/60 hover:border-ochre'
                      }`}
                    >
                      <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-brown/10 mb-2">
                        <img
                          src={art.imageUrl}
                          alt={art.title}
                          className="w-full h-full object-cover"
                        />
                        <div
                          className={`absolute top-1.5 right-1.5 w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                            isFeatured
                              ? 'bg-terracotta text-white shadow-md'
                              : 'bg-ivory/80 text-transparent border border-brown/30'
                          }`}
                        >
                          <Check size={12} strokeWidth={2.5} />
                        </div>
                      </div>

                      <div>
                        <div
                          className={`font-serif font-bold text-xs truncate ${
                            isFeatured ? 'text-terracotta' : 'text-brown'
                          }`}
                        >
                          {art.title}
                        </div>
                        <div className="text-[10px] font-sans text-brown/50">
                          {art.artForm}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              TAB 4: CONTACT & SPOKEN LANGUAGES
             ───────────────────────────────────────────────────────────── */}
          {activeTab === 'contact' && (
            <div className="space-y-5 animate-fade-in max-w-2xl mx-auto">
              <div>
                <h3 className="font-serif font-bold text-brown text-xl mb-1">
                  {t('portfolio.reachYou', 'How People Can Reach You')}
                </h3>
                <p className="font-sans text-xs text-brown/65">
                  {t('portfolio.reachSubtitle', 'Make it easy for buyers, customers, and cultural organizations to message or call you.')}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <MessageCircle size={13} className="text-forest" />
                    <span>{t('portfolio.whatsappNumber', 'WhatsApp Number')}</span>
                  </label>
                  <input
                    type="text"
                    value={formData.whatsappNumber}
                    onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-3.5 py-2.5 bg-beige-light border border-beige-dark/70 rounded-xl text-xs font-sans text-brown focus:outline-none focus:border-terracotta"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Phone size={13} className="text-terracotta" />
                    <span>{t('portfolio.phoneNumber', 'Phone Number')}</span>
                  </label>
                  <input
                    type="text"
                    value={formData.contactNumber}
                    onChange={(e) => handleChange('contactNumber', e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-3.5 py-2.5 bg-beige-light border border-beige-dark/70 rounded-xl text-xs font-sans text-brown focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Mail size={13} className="text-ochre-dark" />
                  <span>{t('portfolio.emailAddress', 'Email Address (Optional)')}</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="e.g. ivy.maiti.crafts@gmail.com"
                  className="w-full px-3.5 py-2.5 bg-beige-light border border-beige-dark/70 rounded-xl text-xs font-sans text-brown focus:outline-none focus:border-terracotta"
                />
              </div>

              {/* Commission Availability Toggle */}
              <div className="p-4 rounded-xl bg-beige/50 border border-beige-dark/50 flex items-center justify-between">
                <div>
                  <div className="text-xs font-sans font-semibold text-brown">
                    {t('portfolio.customCommission', 'Available for Custom Commission Orders')}
                  </div>
                  <div className="text-[11px] font-sans text-brown/60">
                    {t('portfolio.commissionSubtitle', 'Let buyers know you can paint custom artwork for their homes.')}
                  </div>
                </div>

                <input
                  type="checkbox"
                  checked={formData.isAvailableForOrders}
                  onChange={(e) =>
                    handleChange('isAvailableForOrders', e.target.checked)
                  }
                  className="w-5 h-5 rounded text-terracotta focus:ring-terracotta cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              TAB 5: JOURNEY & ACHIEVEMENTS (COMPLETELY OPTIONAL)
             ───────────────────────────────────────────────────────────── */}
          {activeTab === 'optional' && (
            <div className="space-y-5 animate-fade-in max-w-2xl mx-auto">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-forest/10 text-forest text-[11px] font-sans font-medium mb-1">
                  {t('portfolio.optionalSectionBadge', 'Completely Optional Section')}
                </div>
                <h3 className="font-serif font-bold text-brown text-xl mb-1">
                  {t('portfolio.journeyTitle', 'My Journey & Community Gatherings')}
                </h3>
                <p className="font-sans text-xs text-brown/65">
                  {t('portfolio.journeySubtitle', 'You do not need formal awards or degrees! If you have participated in village craft melas, exhibitions, or workshops, you can list them here. Otherwise, leave this section blank.')}
                </p>
              </div>

              {/* Years of Practice (Optional) */}
              <div>
                <label className="block text-xs font-sans font-medium text-brown mb-1">
                  {t('portfolio.howLongArt', 'How long have you been making art? (Optional)')}
                </label>
                <input
                  type="text"
                  value={formData.howLongPracticing || ''}
                  onChange={(e) => handleChange('howLongPracticing', e.target.value)}
                  placeholder={t('portfolio.howLongPlaceholder', 'e.g. Practicing since childhood (over 15 years)')}
                  className="w-full px-3.5 py-2 bg-beige-light border border-beige-dark/60 rounded-xl text-xs font-sans text-brown focus:outline-none focus:border-terracotta"
                />
              </div>

              {/* Milestones list */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider">
                  {t('portfolio.communityGatherings', 'Community Gatherings & Melas')}
                </label>

                {(formData.journeyMilestones || []).map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-beige/40 border border-beige-dark/50 space-y-2"
                  >
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={m.year}
                        onChange={(e) => {
                          const updated = [...formData.journeyMilestones];
                          updated[idx].year = e.target.value;
                          handleChange('journeyMilestones', updated);
                        }}
                        placeholder={t('portfolio.gatheringYearPlaceholder', 'Year')}
                        className="w-20 px-2.5 py-1.5 bg-ivory border border-beige-dark/60 rounded-lg text-xs font-sans text-brown"
                      />
                      <input
                        type="text"
                        value={m.title}
                        onChange={(e) => {
                          const updated = [...formData.journeyMilestones];
                          updated[idx].title = e.target.value;
                          handleChange('journeyMilestones', updated);
                        }}
                        placeholder={t('portfolio.gatheringTitlePlaceholder', 'Gathering or mela name')}
                        className="flex-1 px-2.5 py-1.5 bg-ivory border border-beige-dark/60 rounded-lg text-xs font-sans text-brown font-medium"
                      />
                    </div>
                    <input
                      type="text"
                      value={m.description}
                      onChange={(e) => {
                        const updated = [...formData.journeyMilestones];
                        updated[idx].description = e.target.value;
                        handleChange('journeyMilestones', updated);
                      }}
                      placeholder={t('portfolio.gatheringDescPlaceholder', 'Short description of what you shared')}
                      className="w-full px-2.5 py-1.5 bg-ivory border border-beige-dark/60 rounded-lg text-xs font-sans text-brown/80"
                    />
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    const current = formData.journeyMilestones || [];
                    handleChange('journeyMilestones', [
                      ...current,
                      { year: '2026', title: '', description: '' },
                    ]);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-beige hover:bg-beige-dark/30 border border-beige-dark/60 text-xs font-sans text-brown transition-colors"
                >
                  {t('portfolio.addGathering', '+ Add Another Gathering or Memory')}
                </button>
              </div>
            </div>
          )}

          {/* ── Action Footer ── */}
          <div className="pt-4 border-t border-beige-dark/50 flex items-center justify-between">
            <span className="text-xs font-sans text-brown/50">
              {t('portfolio.liveUpdateNotice', 'Changes update your live public portfolio immediately upon saving.')}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-beige border border-beige-dark/60 text-xs font-sans font-medium text-brown hover:bg-beige-dark/30 transition-colors"
              >
                {t('common.cancel', 'Cancel')}
              </button>
              <button
                type="submit"
                className="btn-primary text-xs py-2 px-6 flex items-center gap-1.5 shadow-md"
              >
                <Save size={14} />
                <span>{t('portfolio.savePortfolio', 'Save My Portfolio')}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
