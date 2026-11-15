import React, { useState } from 'react';
import {
  Bell,
  Sparkles,
  Image,
  BookOpen,
  Landmark,
  Radio,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useLanguage } from '../../i18n';

export default function NotificationsSection({
  notifications,
  onSaveNotifications,
}) {
  const { language, t } = useLanguage();
  const [prefs, setPrefs] = useState({
    artworkUpdates: !!notifications.artworkUpdates,
    artStoryUpdates: !!notifications.artStoryUpdates,
    catalogueUpdates: !!notifications.catalogueUpdates,
    heritageUpdates: !!notifications.heritageUpdates,
    announcements: !!notifications.announcements,
    browserAlerts: !!notifications.browserAlerts,
  });

  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleToggle = (key) => {
    const nextVal = !prefs[key];
    const updated = { ...prefs, [key]: nextVal };
    setPrefs(updated);
    onSaveNotifications(updated);
    showToast('Notification preference updated');
  };

  const handleRequestBrowserPermission = async () => {
    if (!('Notification' in window)) {
      showToast('Browser notifications are not supported by this device.');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const updated = { ...prefs, browserAlerts: true };
        setPrefs(updated);
        onSaveNotifications(updated);
        showToast('Browser notifications enabled successfully!');
      } else {
        showToast('Notification permission was declined in your browser settings.');
      }
    } catch (err) {
      showToast('Could not request notification permission.');
    }
  };

  return (
    <div className="bg-ivory rounded-2xl border border-beige-dark/65 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="border-b border-beige-dark/50 pb-5">
        <div className="flex items-center gap-2 mb-1">
          <Bell size={20} className="text-terracotta" />
          <h3 className="font-serif font-bold text-brown text-xl sm:text-2xl">
            {t('settings.notifications')}
          </h3>
        </div>
        <p className="font-sans text-xs sm:text-sm text-brown/65 leading-relaxed">
          {t('settings.notificationsDesc')}
        </p>
      </div>

      {toastMessage && (
        <div className="p-3 rounded-xl bg-beige border border-ochre/40 text-xs font-sans text-brown flex items-center gap-2 animate-fade-in">
          <CheckCircle2 size={14} className="text-forest" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Notifications List */}
      <div className="space-y-4">
        {/* 1. Artwork Updates */}
        <div className="p-4 rounded-xl bg-beige/40 border border-beige-dark/50 flex items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-terracotta/10 text-terracotta flex items-center justify-center flex-shrink-0 mt-0.5">
              <Image size={16} />
            </div>
            <div>
              <h4 className="font-serif font-semibold text-brown text-sm">
                {t('settings.artworkUpdates')}
              </h4>
              <p className="text-xs font-sans text-brown/65 mt-0.5 leading-relaxed">
                {t('settings.artworkUpdatesDesc')}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleToggle('artworkUpdates')}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              prefs.artworkUpdates ? 'bg-forest' : 'bg-beige-dark/70'
            }`}
            role="switch"
            aria-checked={prefs.artworkUpdates}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                prefs.artworkUpdates ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* 2. ArtStory Updates */}
        <div className="p-4 rounded-xl bg-beige/40 border border-beige-dark/50 flex items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-forest/10 text-forest flex items-center justify-center flex-shrink-0 mt-0.5">
              <Sparkles size={16} />
            </div>
            <div>
              <h4 className="font-serif font-semibold text-brown text-sm">
                {t('settings.artStoryUpdates')}
              </h4>
              <p className="text-xs font-sans text-brown/65 mt-0.5 leading-relaxed">
                {t('settings.artStoryUpdatesDesc')}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleToggle('artStoryUpdates')}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              prefs.artStoryUpdates ? 'bg-forest' : 'bg-beige-dark/70'
            }`}
            role="switch"
            aria-checked={prefs.artStoryUpdates}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                prefs.artStoryUpdates ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* 3. Catalogue & Portfolio Updates */}
        <div className="p-4 rounded-xl bg-beige/40 border border-beige-dark/50 flex items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-ochre/20 text-ochre-dark flex items-center justify-center flex-shrink-0 mt-0.5">
              <BookOpen size={16} />
            </div>
            <div>
              <h4 className="font-serif font-semibold text-brown text-sm">
                {t('settings.catalogueUpdates')}
              </h4>
              <p className="text-xs font-sans text-brown/65 mt-0.5 leading-relaxed">
                {t('settings.catalogueUpdatesDesc')}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleToggle('catalogueUpdates')}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              prefs.catalogueUpdates ? 'bg-forest' : 'bg-beige-dark/70'
            }`}
            role="switch"
            aria-checked={prefs.catalogueUpdates}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                prefs.catalogueUpdates ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* 4. Heritage Archive Contribution Updates */}
        <div className="p-4 rounded-xl bg-beige/40 border border-beige-dark/50 flex items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-brown/10 text-brown flex items-center justify-center flex-shrink-0 mt-0.5">
              <Landmark size={16} />
            </div>
            <div>
              <h4 className="font-serif font-semibold text-brown text-sm">
                {t('settings.heritageUpdates')}
              </h4>
              <p className="text-xs font-sans text-brown/65 mt-0.5 leading-relaxed">
                {t('settings.heritageUpdatesDesc')}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleToggle('heritageUpdates')}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              prefs.heritageUpdates ? 'bg-forest' : 'bg-beige-dark/70'
            }`}
            role="switch"
            aria-checked={prefs.heritageUpdates}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                prefs.heritageUpdates ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* 5. General Platform Announcements */}
        <div className="p-4 rounded-xl bg-beige/40 border border-beige-dark/50 flex items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-terracotta/10 text-terracotta flex items-center justify-center flex-shrink-0 mt-0.5">
              <Radio size={16} />
            </div>
            <div>
              <h4 className="font-serif font-semibold text-brown text-sm">
                {language === 'hi' ? 'शिल्पकार कार्यशालाएं और मेले' : 'Artisan Workshops & Community Melas'}
              </h4>
              <p className="text-xs font-sans text-brown/65 mt-0.5 leading-relaxed">
                {language === 'hi'
                  ? 'क्षेत्रीय लोक शिल्प मेलों, प्रदर्शनियों और पारंपरिक कलाकारों के लिए बनाई गई नई सुविधाओं के निमंत्रण।'
                  : 'Invitations to regional folk craft melas, exhibitions, and new features built for traditional artists.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleToggle('announcements')}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              prefs.announcements ? 'bg-forest' : 'bg-beige-dark/70'
            }`}
            role="switch"
            aria-checked={prefs.announcements}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                prefs.announcements ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* ── Browser Alert Permission (Explicit Opt-In Only) ── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-beige/40 border border-ochre/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h4 className="font-serif font-semibold text-brown text-sm">
            {t('settings.browserAlerts')}
          </h4>
          <p className="text-xs font-sans text-brown/65 mt-0.5 max-w-md leading-relaxed">
            {t('settings.browserAlertsDesc')}
          </p>
        </div>

        <button
          type="button"
          onClick={handleRequestBrowserPermission}
          className="px-4 py-2 rounded-xl bg-beige hover:bg-beige-dark/30 border border-beige-dark/60 text-xs font-sans font-medium text-brown transition-colors shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Bell size={13} className="text-terracotta" />
          <span>{t('settings.enableBrowserAlerts')}</span>
        </button>
      </div>
    </div>
  );
}
