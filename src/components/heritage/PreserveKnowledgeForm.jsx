import React, { useState } from 'react';
import {
  Feather,
  Mic,
  Camera,
  Check,
  Send,
  Sparkles,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { LotusLogo } from '../ui/DecorativeElements';
import { useLanguage } from '../../i18n';

export default function PreserveKnowledgeForm({
  initialCraftName = '',
  onSubmitContribution,
}) {
  const { t } = useLanguage();
  const [artisanName, setArtisanName] = useState('Ivy Maiti');
  const [craftName, setCraftName] = useState(initialCraftName || '');
  const [region, setRegion] = useState('West Bengal');
  const [aboutCraft, setAboutCraft] = useState('');
  const [howLearned, setHowLearned] = useState('');
  const [materialsTechniques, setMaterialsTechniques] = useState('');
  const [specialStory, setSpecialStory] = useState('');
  const [selectedImage, setSelectedImage] = useState('/artworks/madhubani_harmony.jpg');

  // Voice Input Simulation
  const [isRecording, setIsRecording] = useState(false);
  const [recordingField, setRecordingField] = useState(null);

  const handleStartVoice = (field) => {
    setIsRecording(true);
    setRecordingField(field);

    setTimeout(() => {
      let sampleSpokenText = '';
      if (field === 'howLearned') {
        sampleSpokenText =
          'I learned by sitting on our village courtyard floor with my grandmother, grinding parijat flowers into brass bowls to make natural dye.';
      } else if (field === 'materialsTechniques') {
        sampleSpokenText =
          'We use freshly whittled bamboo sticks wrapped in raw cotton and natural earth minerals mixed with tamarind water.';
      } else if (field === 'specialStory') {
        sampleSpokenText =
          'Before we begin painting, we offer prayers to the earth goddess so that our hands do not tremble and our lines flow with grace.';
      } else {
        sampleSpokenText =
          'This craft has been preserved in our village for over six generations, celebrating the bond between women and nature.';
      }

      if (field === 'howLearned') setHowLearned(sampleSpokenText);
      else if (field === 'materialsTechniques') setMaterialsTechniques(sampleSpokenText);
      else if (field === 'specialStory') setSpecialStory(sampleSpokenText);
      else setAboutCraft(sampleSpokenText);

      setIsRecording(false);
      setRecordingField(null);
    }, 2200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!craftName.trim()) return;

    const newContribution = {
      id: `contrib-${Date.now()}`,
      artisanName: artisanName.trim() || 'Anonymous Artisan',
      craftName: craftName.trim(),
      region: region.trim() || 'India',
      aboutCraft,
      howLearned,
      materialsTechniques,
      story: specialStory || aboutCraft || 'Traditional indigenous folk method.',
      submittedDate: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      status: 'Submitted', // 'Draft' | 'Submitted' | 'Verified'
      imageUrl: selectedImage || '/artworks/madhubani_harmony.jpg',
    };

    onSubmitContribution(newContribution);

    // Reset fields
    setCraftName('');
    setAboutCraft('');
    setHowLearned('');
    setMaterialsTechniques('');
    setSpecialStory('');
  };

  // Image presets
  const presetPhotos = [
    { label: 'Madhubani Linework', url: '/artworks/madhubani_harmony.jpg' },
    { label: 'Warli Rice Paste', url: '/artworks/warli_celebrations.jpg' },
    { label: 'Gond Dot Texture', url: '/artworks/gond_companions.jpg' },
    { label: 'Pattachitra Scroll', url: '/artworks/pattachitra_rathyatra.jpg' },
  ];

  return (
    <section id="preserve-knowledge" className="mb-14 scroll-mt-6">
      <div className="bg-ivory rounded-3xl border-2 border-terracotta/30 p-6 sm:p-10 shadow-lg relative overflow-hidden">
        {/* Soft background glow */}
        <div
          className="absolute -right-20 -top-20 w-80 h-80 rounded-full pointer-events-none opacity-30"
          style={{
            background:
              'radial-gradient(circle, #9D4935 0%, rgba(247, 243, 234, 0) 70%)',
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-sans font-medium border border-terracotta/25 mb-2">
              <Feather size={13} />
              <span>{t('heritage.form.badge', 'Community Knowledge Preservation')}</span>
            </div>

            <h2 className="font-serif font-bold text-brown text-2xl sm:text-3xl">
              {t('heritage.form.title', 'Share What You Know')}
            </h2>

            <p className="font-sans text-xs sm:text-sm text-brown/75 mt-1 leading-relaxed">
              {t('heritage.form.subtitle', 'Every artisan carries knowledge worth preserving. Share your craft, techniques and stories with future generations. No formal documentation or academic background required.')}
            </p>
          </div>

          {/* Voice Recording Notification */}
          {isRecording && (
            <div className="p-3.5 rounded-2xl bg-terracotta/10 border border-terracotta/30 flex items-center justify-between text-xs font-sans text-terracotta animate-pulse">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-terracotta animate-ping" />
                <span>
                  {t('heritage.form.listeningVoice', 'Listening to your voice... Speak naturally in Hindi, Bengali, or English.')}
                </span>
              </div>
              <span className="text-[11px] opacity-80">
                {t('heritage.form.speechActive', 'Speech-to-Text Active')}
              </span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name & Craft */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider mb-1">
                  {t('heritage.form.yourName', 'Your Name (Optional)')}
                </label>
                <input
                  type="text"
                  value={artisanName}
                  onChange={(e) => setArtisanName(e.target.value)}
                  placeholder="e.g. Ivy Maiti"
                  className="w-full px-3.5 py-2.5 bg-beige-light border border-beige-dark/70 rounded-xl text-xs font-sans text-brown focus:outline-none focus:border-terracotta"
                />
              </div>

              <div>
                <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider mb-1">
                  {t('heritage.form.craftName', 'Name of Your Craft or Tradition')} <span className="text-terracotta">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={craftName}
                  onChange={(e) => setCraftName(e.target.value)}
                  placeholder={t('heritage.form.craftPlaceholder', 'e.g. Mithila Natural Linework, Dokra Casting...')}
                  className="w-full px-3.5 py-2.5 bg-beige-light border border-beige-dark/70 rounded-xl text-xs font-sans text-brown focus:outline-none focus:border-terracotta"
                />
              </div>
            </div>

            {/* Region */}
            <div>
              <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider mb-1">
                {t('heritage.form.villageRegion', 'Your Village, Town or Region')}
              </label>
              <input
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder={t('heritage.form.villagePlaceholder', 'e.g. Bankura / Madhubani / Bastar / Raghurajpur')}
                className="w-full px-3.5 py-2.5 bg-beige-light border border-beige-dark/70 rounded-xl text-xs font-sans text-brown focus:outline-none focus:border-terracotta"
              />
            </div>

            {/* What do you know about this craft? */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider">
                  {t('heritage.form.whatKnow', 'What do you know about this craft?')}
                </label>
                <button
                  type="button"
                  onClick={() => handleStartVoice('aboutCraft')}
                  className="inline-flex items-center gap-1 text-[11px] font-sans font-medium text-terracotta hover:underline"
                >
                  <Mic size={12} />
                  <span>{t('heritage.form.speakAnswer', 'Speak Answer')}</span>
                </button>
              </div>
              <textarea
                rows={2}
                value={aboutCraft}
                onChange={(e) => setAboutCraft(e.target.value)}
                placeholder={t('heritage.form.whatKnowPlaceholder', 'Share the history, purpose, or cultural meaning of your craft...')}
                className="w-full p-3 bg-beige-light border border-beige-dark/70 rounded-xl text-xs font-sans text-brown leading-relaxed focus:outline-none focus:border-terracotta"
              />
            </div>

            {/* How did you learn it? */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider">
                  {t('heritage.form.howLearnedQ', 'How did you learn it, and who taught you?')}
                </label>
                <button
                  type="button"
                  onClick={() => handleStartVoice('howLearned')}
                  className="inline-flex items-center gap-1 text-[11px] font-sans font-medium text-terracotta hover:underline"
                >
                  <Mic size={12} />
                  <span>{t('heritage.form.speakAnswer', 'Speak Answer')}</span>
                </button>
              </div>
              <textarea
                rows={2}
                value={howLearned}
                onChange={(e) => setHowLearned(e.target.value)}
                placeholder={t('heritage.form.howLearnedPlaceholder', 'e.g. I learned from my grandmother while sitting in the courtyard on festival mornings...')}
                className="w-full p-3 bg-beige-light border border-beige-dark/70 rounded-xl text-xs font-sans text-brown leading-relaxed focus:outline-none focus:border-terracotta"
              />
            </div>

            {/* What materials and techniques do you use? */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider">
                  {t('heritage.form.materialsQ', 'What natural materials and techniques do you use?')}
                </label>
                <button
                  type="button"
                  onClick={() => handleStartVoice('materialsTechniques')}
                  className="inline-flex items-center gap-1 text-[11px] font-sans font-medium text-terracotta hover:underline"
                >
                  <Mic size={12} />
                  <span>{t('heritage.form.speakAnswer', 'Speak Answer')}</span>
                </button>
              </div>
              <textarea
                rows={2}
                value={materialsTechniques}
                onChange={(e) => setMaterialsTechniques(e.target.value)}
                placeholder={t('heritage.form.materialsPlaceholder', 'e.g. Natural plant extracts, river clay, handmade paper, bamboo pen...')}
                className="w-full p-3 bg-beige-light border border-beige-dark/70 rounded-xl text-xs font-sans text-brown leading-relaxed focus:outline-none focus:border-terracotta"
              />
            </div>

            {/* Special story or tradition */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider">
                  {t('heritage.form.specialStoryQ', 'Is there a special story, song, or memory with it? (Optional)')}
                </label>
                <button
                  type="button"
                  onClick={() => handleStartVoice('specialStory')}
                  className="inline-flex items-center gap-1 text-[11px] font-sans font-medium text-terracotta hover:underline"
                >
                  <Mic size={12} />
                  <span>{t('heritage.form.speakAnswer', 'Speak Answer')}</span>
                </button>
              </div>
              <textarea
                rows={2}
                value={specialStory}
                onChange={(e) => setSpecialStory(e.target.value)}
                placeholder={t('heritage.form.specialStoryPlaceholder', 'e.g. We sing a special song to the river when collecting the fine clay...')}
                className="w-full p-3 bg-beige-light border border-beige-dark/70 rounded-xl text-xs font-serif italic text-brown leading-relaxed focus:outline-none focus:border-terracotta"
              />
            </div>

            {/* Add Photograph / Preset */}
            <div>
              <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider mb-2">
                {t('heritage.form.addPhoto', 'Add a Photograph of Your Craft or Process')}
              </label>

              <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
                {presetPhotos.map((photo) => (
                  <button
                    key={photo.label}
                    type="button"
                    onClick={() => setSelectedImage(photo.url)}
                    className={`p-1.5 rounded-xl border-2 transition-all flex items-center gap-2 flex-shrink-0 ${
                      selectedImage === photo.url
                        ? 'border-terracotta bg-ivory shadow-sm ring-1 ring-terracotta/30'
                        : 'border-beige-dark/60 bg-beige/40 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={photo.url}
                      alt={photo.label}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <span className="text-xs font-sans text-brown pr-1">
                      {photo.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Disclaimer & Submit */}
            <div className="pt-3 border-t border-beige-dark/40 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-[11px] font-sans text-brown/55 text-center sm:text-left">
                {t('heritage.form.demoNotice', 'Demo submission saved to your archive · Ready for community and backend verification.')}
              </p>

              <button
                type="submit"
                className="btn-primary text-xs py-2.5 px-6 flex items-center gap-2 shadow-md w-full sm:w-auto justify-center"
              >
                <Send size={14} />
                <span>{t('heritage.form.submit', 'Submit Contribution')}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
