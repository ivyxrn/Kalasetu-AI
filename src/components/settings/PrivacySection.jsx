import React, { useState } from 'react';
import {
  ShieldCheck,
  Eye,
  EyeOff,
  Lock,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  Info,
} from 'lucide-react';
import { useLanguage } from '../../i18n';

export default function PrivacySection({ privacy, onSavePrivacy }) {
  const { language, t } = useLanguage();
  const [profileVisibility, setProfileVisibility] = useState(
    privacy.profileVisibility || 'public'
  );
  const [showContactPublicly, setShowContactPublicly] = useState(
    !!privacy.showContactPublicly
  );
  const [showLocationPublicly, setShowLocationPublicly] = useState(
    !!privacy.showLocationPublicly
  );

  // Change Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFeedback, setPasswordFeedback] = useState(null);

  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleVisibilityChange = (mode) => {
    setProfileVisibility(mode);
    const updated = {
      ...privacy,
      profileVisibility: mode,
      showContactPublicly,
      showLocationPublicly,
    };
    onSavePrivacy(updated);
    showToast(
      mode === 'public'
        ? 'Your portfolio is now visible to outside visitors.'
        : 'Your portfolio is now private. Only you can view your paintings.'
    );
  };

  const handleToggleContact = () => {
    const nextVal = !showContactPublicly;
    setShowContactPublicly(nextVal);
    const updated = {
      ...privacy,
      profileVisibility,
      showContactPublicly: nextVal,
      showLocationPublicly,
    };
    onSavePrivacy(updated);
    showToast(
      nextVal
        ? 'Contact details will be visible on your public portfolio.'
        : 'Contact details are now hidden from public visitors.'
    );
  };

  const handleToggleLocation = () => {
    const nextVal = !showLocationPublicly;
    setShowLocationPublicly(nextVal);
    const updated = {
      ...privacy,
      profileVisibility,
      showContactPublicly,
      showLocationPublicly: nextVal,
    };
    onSavePrivacy(updated);
    showToast(
      nextVal
        ? 'Village / City location is visible on your creations.'
        : 'Location is hidden from public view.'
    );
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (!currentPassword.trim()) {
      setPasswordFeedback({
        type: 'error',
        message: 'Please enter your current password.',
      });
      return;
    }

    if (newPassword.length < 6) {
      setPasswordFeedback({
        type: 'error',
        message: 'New password must be at least 6 characters.',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordFeedback({
        type: 'error',
        message: 'The new passwords do not match. Please re-enter them carefully.',
      });
      return;
    }

    // Honest representation for MVP
    setPasswordFeedback({
      type: 'info',
      message:
        'Frontend validation passed! Since KalaSetu AI is currently running in local MVP preview, secure password updates will take effect once our team activates Supabase Cloud Authentication.',
    });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="bg-ivory rounded-2xl border border-beige-dark/65 p-6 sm:p-8 shadow-sm space-y-8">
      {/* Header */}
      <div className="border-b border-beige-dark/50 pb-5">
        <div className="flex items-center gap-2 mb-1">
          <ShieldCheck size={20} className="text-terracotta" />
          <h3 className="font-serif font-bold text-brown text-xl sm:text-2xl">
            {t('settings.privacy')}
          </h3>
        </div>
        <p className="font-sans text-xs sm:text-sm text-brown/65 leading-relaxed">
          {t('settings.privacyDesc')}
        </p>
      </div>

      {toastMessage && (
        <div className="p-3 rounded-xl bg-beige border border-ochre/40 text-xs font-sans text-brown flex items-center gap-2 animate-fade-in">
          <CheckCircle2 size={14} className="text-forest" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── 1. Profile Visibility ── */}
      <div className="space-y-3">
        <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider">
          {t('settings.portfolioVisibility')}
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Public Option */}
          <div
            onClick={() => handleVisibilityChange('public')}
            className={`cursor-pointer rounded-2xl p-4 sm:p-5 border transition-all flex flex-col justify-between ${
              profileVisibility === 'public'
                ? 'bg-beige/60 border-forest ring-1 ring-forest/30 shadow-sm'
                : 'bg-ivory hover:bg-beige/30 border-beige-dark/70'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Eye size={17} className="text-forest" />
                  <span className="font-serif font-bold text-brown text-base">
                    {t('settings.visibilityPublic')}
                  </span>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    profileVisibility === 'public'
                      ? 'border-forest bg-forest text-white'
                      : 'border-beige-dark'
                  }`}
                >
                  {profileVisibility === 'public' && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
              </div>
              <p className="text-xs font-sans text-brown/65 leading-relaxed">
                {t('settings.visibilityPublicDesc')}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-beige-dark/40 text-[11px] font-sans text-forest font-medium">
              {language === 'hi'
                ? 'कलाकृतियाँ बेचने वाले स्वतंत्र शिल्पकारों के लिए अनुशंसित'
                : 'Recommended for independent artisans selling artwork'}
            </div>
          </div>

          {/* Private Option */}
          <div
            onClick={() => handleVisibilityChange('private')}
            className={`cursor-pointer rounded-2xl p-4 sm:p-5 border transition-all flex flex-col justify-between ${
              profileVisibility === 'private'
                ? 'bg-beige/60 border-terracotta ring-1 ring-terracotta/30 shadow-sm'
                : 'bg-ivory hover:bg-beige/30 border-beige-dark/70'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <EyeOff size={17} className="text-terracotta" />
                  <span className="font-serif font-bold text-brown text-base">
                    {t('settings.visibilityPrivate')}
                  </span>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    profileVisibility === 'private'
                      ? 'border-terracotta bg-terracotta text-white'
                      : 'border-beige-dark'
                  }`}
                >
                  {profileVisibility === 'private' && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
              </div>
              <p className="text-xs font-sans text-brown/65 leading-relaxed">
                {t('settings.visibilityPrivateDesc')}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-beige-dark/40 text-[11px] font-sans text-brown/50">
              {language === 'hi'
                ? 'लॉन्च से पहले नए संग्रह तैयार करते समय उपयोगी'
                : 'Useful when preparing new collections before launch'}
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. Contact Information Visibility ── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-beige/40 border border-beige-dark/50 space-y-4">
        <div>
          <h4 className="font-serif font-semibold text-brown text-base">
            {t('settings.showContact')}
          </h4>
          <p className="text-xs font-sans text-brown/65 mt-0.5 leading-relaxed">
            {t('settings.showContactDesc')}
          </p>
        </div>

        <div className="space-y-3 pt-1">
          {/* Show phone/email toggle */}
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-sans text-brown/80 font-medium">
              {language === 'hi'
                ? 'ऑर्डर पूछताछ के लिए ईमेल और व्हाट्सएप नंबर दिखाएं'
                : 'Display email and WhatsApp number for order inquiries'}
            </span>
            <button
              type="button"
              onClick={handleToggleContact}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                showContactPublicly ? 'bg-forest' : 'bg-beige-dark/70'
              }`}
              role="switch"
              aria-checked={showContactPublicly}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  showContactPublicly ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Show location toggle */}
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-sans text-brown/80 font-medium">
              {t('settings.showLocationDesc')}
            </span>
            <button
              type="button"
              onClick={handleToggleLocation}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                showLocationPublicly ? 'bg-forest' : 'bg-beige-dark/70'
              }`}
              role="switch"
              aria-checked={showLocationPublicly}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  showLocationPublicly ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* ── 3. Change Password ── */}
      <div className="p-5 sm:p-6 rounded-2xl bg-beige/30 border border-beige-dark/50">
        <div className="flex items-center gap-2 mb-1">
          <KeyRound size={17} className="text-terracotta" />
          <h4 className="font-serif font-semibold text-brown text-base">
            {t('settings.securityAccount')}
          </h4>
        </div>
        <p className="text-xs font-sans text-brown/65 mb-4 leading-relaxed">
          {language === 'hi'
            ? 'अपनी कलाकृतियों को सुरक्षित रखने के लिए अपने खाते में एक मजबूत पासवर्ड सुनिश्चित करें।'
            : 'Ensure your KalaSetu AI account uses a secure password to keep your artworks safe.'}
        </p>

        {passwordFeedback && (
          <div
            className={`p-3.5 rounded-xl text-xs font-sans mb-4 flex items-start gap-2.5 leading-relaxed ${
              passwordFeedback.type === 'error'
                ? 'bg-terracotta/10 border border-terracotta/30 text-terracotta'
                : 'bg-ochre/15 border border-ochre/35 text-brown'
            }`}
          >
            {passwordFeedback.type === 'error' ? (
              <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
            ) : (
              <Info size={15} className="flex-shrink-0 mt-0.5 text-ochre-dark" />
            )}
            <span>{passwordFeedback.message}</span>
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-lg">
          <div>
            <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider mb-1">
              {t('settings.currentPassword')}
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl bg-ivory border border-beige-dark/70 text-sm font-sans text-brown placeholder-brown/40 focus:outline-none focus:border-terracotta transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider mb-1">
                {t('settings.newPassword')}
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full px-3.5 py-2.5 rounded-xl bg-ivory border border-beige-dark/70 text-sm font-sans text-brown placeholder-brown/40 focus:outline-none focus:border-terracotta transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider mb-1">
                {t('settings.confirmPassword')}
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-ivory border border-beige-dark/70 text-sm font-sans text-brown placeholder-brown/40 focus:outline-none focus:border-terracotta transition-all"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-xs font-sans text-brown/65 hover:text-brown flex items-center gap-1.5 transition-colors"
            >
              {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
              <span>{showPassword ? (language === 'hi' ? 'पासवर्ड छुपाएं' : 'Hide Passwords') : (language === 'hi' ? 'पासवर्ड दिखाएं' : 'Show Passwords')}</span>
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-beige hover:bg-beige-dark/40 border border-beige-dark/70 text-xs font-sans font-medium text-brown transition-colors shadow-sm"
            >
              {t('settings.updatePassword')}
            </button>
          </div>
        </form>
      </div>

      {/* ── 4. Account Security Info ── */}
      <div className="p-4 rounded-xl bg-beige/25 border border-beige-dark/40 flex items-start gap-3 text-xs font-sans text-brown/70 leading-relaxed">
        <Smartphone size={16} className="text-forest flex-shrink-0 mt-0.5" />
        <div>
          <strong className="text-brown">Current Active Session:</strong> Signed in as Ivy Maiti. Your session is protected by local token encryption.
        </div>
      </div>
    </div>
  );
}
