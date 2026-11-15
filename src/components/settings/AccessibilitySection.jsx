import React, { useState } from 'react';
import {
  Eye,
  Type,
  Volume2,
  Sparkles,
  Contrast,
  Sliders,
  Check,
  VolumeX,
  Play,
} from 'lucide-react';
import { textSizeOptions } from '../../data/settingsData';
import { useLanguage } from '../../i18n';

export default function AccessibilitySection({
  accessibility,
  onSaveAccessibility,
  currentLanguage = 'en',
}) {
  const { language, t } = useLanguage();
  const [textSize, setTextSize] = useState(accessibility.textSize || 'default');
  const [highContrast, setHighContrast] = useState(
    !!accessibility.highContrast
  );
  const [voiceAssistance, setVoiceAssistance] = useState(
    !!accessibility.voiceAssistance
  );
  const [reducedMotion, setReducedMotion] = useState(
    !!accessibility.reducedMotion
  );
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleTextSizeChange = (sizeId) => {
    setTextSize(sizeId);
    const updated = {
      ...accessibility,
      textSize: sizeId,
      highContrast,
      voiceAssistance,
      reducedMotion,
    };
    onSaveAccessibility(updated);
    showToast(`Text size set to ${sizeId}`);
  };

  const handleToggleContrast = () => {
    const nextVal = !highContrast;
    setHighContrast(nextVal);
    const updated = {
      ...accessibility,
      textSize,
      highContrast: nextVal,
      voiceAssistance,
      reducedMotion,
    };
    onSaveAccessibility(updated);
    showToast(nextVal ? 'High contrast enabled' : 'High contrast disabled');
  };

  const handleToggleVoice = () => {
    const nextVal = !voiceAssistance;
    setVoiceAssistance(nextVal);
    const updated = {
      ...accessibility,
      textSize,
      highContrast,
      voiceAssistance: nextVal,
      reducedMotion,
    };
    onSaveAccessibility(updated);
    showToast(nextVal ? 'Voice assistance enabled' : 'Voice assistance disabled');
  };

  const handleToggleMotion = () => {
    const nextVal = !reducedMotion;
    setReducedMotion(nextVal);
    const updated = {
      ...accessibility,
      textSize,
      highContrast,
      voiceAssistance,
      reducedMotion: nextVal,
    };
    onSaveAccessibility(updated);
    showToast(nextVal ? 'Reduced motion enabled' : 'Subtle animations restored');
  };

  const testVoiceSample = () => {
    if (!('speechSynthesis' in window)) {
      showToast('Voice playback is not supported on this device.');
      return;
    }

    window.speechSynthesis.cancel();
    setIsPlayingVoice(true);

    const textToSpeak =
      currentLanguage === 'hi'
        ? 'नमस्ते। कलासेतु एआई में आपका स्वागत है। आपकी हर रचना का एक अनमोल इतिहास है।'
        : 'Welcome to KalaSetu AI. Every creation has a story. Let yours be heard.';

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = currentLanguage === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.9; // Friendly, calm cadence

    utterance.onend = () => {
      setIsPlayingVoice(false);
    };

    utterance.onerror = () => {
      setIsPlayingVoice(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="bg-ivory rounded-2xl border border-beige-dark/65 p-6 sm:p-8 shadow-sm space-y-8">
      {/* Header */}
      <div className="border-b border-beige-dark/50 pb-5">
        <div className="flex items-center gap-2 mb-1">
          <Eye size={20} className="text-terracotta" />
          <h3 className="font-serif font-bold text-brown text-xl sm:text-2xl">
            {t('settings.accessibility')}
          </h3>
        </div>
        <p className="font-sans text-xs sm:text-sm text-brown/65 leading-relaxed">
          {t('settings.accessibilityDesc')}
        </p>
      </div>

      {toastMessage && (
        <div className="p-3 rounded-xl bg-beige border border-ochre/40 text-xs font-sans text-brown flex items-center gap-2 animate-fade-in">
          <Check size={14} className="text-forest" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── 1. Text Size ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-serif font-semibold text-brown text-base flex items-center gap-2">
              <Type size={16} className="text-forest" />
              {t('settings.textSize')}
            </h4>
            <p className="text-xs font-sans text-brown/65 mt-0.5">
              {t('settings.textSizeDesc')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {textSizeOptions.map((opt) => {
            const isSelected = textSize === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleTextSizeChange(opt.id)}
                className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-beige/70 border-terracotta shadow-sm ring-1 ring-terracotta/40'
                    : 'bg-ivory hover:bg-beige/30 border-beige-dark/70 hover:border-ochre'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="font-serif font-bold text-brown text-sm">
                    {opt.label}
                  </span>
                  {isSelected && (
                    <div className="w-4 h-4 rounded-full bg-terracotta text-white flex items-center justify-center">
                      <Check size={10} strokeWidth={3} />
                    </div>
                  )}
                </div>
                <p className="text-[11px] font-sans text-brown/60 leading-tight">
                  {opt.description}
                </p>
                <div
                  className="mt-3 pt-2 border-t border-beige-dark/40 font-serif text-brown/85 font-medium truncate"
                  style={{ fontSize: opt.scale }}
                >
                  Aa Sample
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 2. High Contrast ── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-beige/40 border border-beige-dark/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Contrast size={17} className="text-brown" />
            <h4 className="font-serif font-semibold text-brown text-base">
              {t('settings.highContrast')}
            </h4>
          </div>
          <p className="text-xs font-sans text-brown/65 max-w-lg leading-relaxed">
            {t('settings.highContrastDesc')}
          </p>
        </div>

        <button
          type="button"
          onClick={handleToggleContrast}
          className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            highContrast ? 'bg-forest' : 'bg-beige-dark/70'
          }`}
          role="switch"
          aria-checked={highContrast}
          aria-label="Toggle high contrast"
        >
          <span
            className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              highContrast ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* ── 3. Voice Assistance ── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-beige/40 border border-beige-dark/50 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Volume2 size={17} className="text-terracotta" />
              <h4 className="font-serif font-semibold text-brown text-base">
                {t('settings.voiceAssistance')}
              </h4>
            </div>
            <p className="text-xs font-sans text-brown/65 max-w-lg leading-relaxed">
              {t('settings.voiceDesc')}
            </p>
          </div>

          <button
            type="button"
            onClick={handleToggleVoice}
            className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              voiceAssistance ? 'bg-terracotta' : 'bg-beige-dark/70'
            }`}
            role="switch"
            aria-checked={voiceAssistance}
            aria-label="Toggle voice assistance"
          >
            <span
              className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                voiceAssistance ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {voiceAssistance && (
          <div className="pt-2 border-t border-beige-dark/40 flex items-center justify-between">
            <span className="text-xs font-sans text-forest font-medium flex items-center gap-1.5">
              <Check size={13} />
              {language === 'hi' ? 'ध्वनि सहायता सक्रिय है' : 'Voice assistance is active'}
            </span>

            <button
              type="button"
              onClick={testVoiceSample}
              disabled={isPlayingVoice}
              className="px-3 py-1.5 rounded-lg bg-beige border border-beige-dark/60 text-xs font-sans font-medium text-brown hover:bg-beige-dark/30 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Play size={12} className={isPlayingVoice ? 'animate-spin' : ''} />
              <span>{isPlayingVoice ? t('settings.playingSample') : t('settings.testVoiceSample')}</span>
            </button>
          </div>
        )}
      </div>

      {/* ── 4. Reduced Motion ── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-beige/40 border border-beige-dark/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sliders size={17} className="text-ochre-dark" />
            <h4 className="font-serif font-semibold text-brown text-base">
              {t('settings.reducedMotion')}
            </h4>
          </div>
          <p className="text-xs font-sans text-brown/65 max-w-lg leading-relaxed">
            {t('settings.reducedMotionDesc')}
          </p>
        </div>

        <button
          type="button"
          onClick={handleToggleMotion}
          className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            reducedMotion ? 'bg-forest' : 'bg-beige-dark/70'
          }`}
          role="switch"
          aria-checked={reducedMotion}
          aria-label="Toggle reduced motion"
        >
          <span
            className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              reducedMotion ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Live Preview Box */}
      <div className="p-4 rounded-xl bg-ivory border border-ochre/30">
        <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-ochre-dark block mb-1">
          {language === 'hi' ? 'सजीव टेक्स्ट और कंट्रास्ट पूर्वावलोकन' : 'Live Text & Contrast Preview'}
        </span>
        <p className="font-serif text-brown leading-relaxed">
          {language === 'hi'
            ? '“रंगों का हर स्पर्श हमारे पूर्वजों के आशीर्वाद और हमारी मिट्टी की लय को समेटे हुए है।”'
            : '“Every stroke of colour carries the blessings of our ancestors and the rhythm of our village earth.”'}
        </p>
      </div>
    </div>
  );
}
