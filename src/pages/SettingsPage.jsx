import React, { useState, useEffect } from 'react';
import {
  User,
  Globe,
  Eye,
  Bell,
  ShieldCheck,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  Sliders,
} from 'lucide-react';
import ProfileSection from '../components/settings/ProfileSection';
import LanguageSection from '../components/settings/LanguageSection';
import AccessibilitySection from '../components/settings/AccessibilitySection';
import NotificationsSection from '../components/settings/NotificationsSection';
import PrivacySection from '../components/settings/PrivacySection';
import HelpSupportSection from '../components/settings/HelpSupportSection';
import { defaultSettingsData } from '../data/settingsData';
import { WarliDivider } from '../components/ui/DecorativeElements';
import { useLanguage } from '../i18n';

const tabKeys = [
  { id: 'profile', key: 'settings.tabs.profile', icon: User },
  { id: 'language', key: 'settings.tabs.language', icon: Globe },
  { id: 'accessibility', key: 'settings.tabs.accessibility', icon: Eye },
  { id: 'notifications', key: 'settings.tabs.notifications', icon: Bell },
  { id: 'privacy', key: 'settings.tabs.privacy', icon: ShieldCheck },
  { id: 'help', key: 'settings.tabs.help', icon: HelpCircle },
];

export default function SettingsPage({ initialTab = 'profile' }) {
  const { language, setLanguage, t } = useLanguage();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [globalToast, setGlobalToast] = useState(null);

  // Settings State persisted in localStorage
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('kalasetu_settings_preferences');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultSettingsData,
          ...parsed,
          profile: { ...defaultSettingsData.profile, ...(parsed.profile || {}) },
          language: { ...defaultSettingsData.language, ...(parsed.language || {}) },
          accessibility: {
            ...defaultSettingsData.accessibility,
            ...(parsed.accessibility || {}),
          },
          notifications: {
            ...defaultSettingsData.notifications,
            ...(parsed.notifications || {}),
          },
          privacy: { ...defaultSettingsData.privacy, ...(parsed.privacy || {}) },
        };
      }
    } catch (e) {
      console.warn('Failed to load settings from localStorage:', e);
    }
    return defaultSettingsData;
  });

  const showGlobalToast = (message) => {
    setGlobalToast(message);
    setTimeout(() => setGlobalToast(null), 3000);
  };

  // Sync and persist settings
  const updateSettings = (sectionKey, updatedSectionData) => {
    setSettings((prev) => {
      const nextSettings = {
        ...prev,
        [sectionKey]: {
          ...prev[sectionKey],
          ...updatedSectionData,
        },
      };

      try {
        localStorage.setItem(
          'kalasetu_settings_preferences',
          JSON.stringify(nextSettings)
        );
      } catch (e) {
        console.warn('Failed to save settings:', e);
      }

      return nextSettings;
    });
  };

  // Apply Accessibility Preferences to document root
  useEffect(() => {
    const root = document.documentElement;
    const a11y = settings.accessibility;

    // 1. Text Size
    root.classList.remove('text-size-small', 'text-size-default', 'text-size-large', 'text-size-xl');
    if (a11y.textSize === 'small') {
      root.style.fontSize = '14.5px';
      root.classList.add('text-size-small');
    } else if (a11y.textSize === 'large') {
      root.style.fontSize = '18px';
      root.classList.add('text-size-large');
    } else if (a11y.textSize === 'xl') {
      root.style.fontSize = '20px';
      root.classList.add('text-size-xl');
    } else {
      root.style.fontSize = '16px';
      root.classList.add('text-size-default');
    }

    // 2. High Contrast
    if (a11y.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // 3. Reduced Motion
    if (a11y.reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }
  }, [settings.accessibility]);

  // Handle specific section saves
  const handleSaveProfile = (profileData) => {
    updateSettings('profile', profileData);
    showGlobalToast('Artisan profile updated successfully');
  };

  const handleSaveLanguage = (langData) => {
    updateSettings('language', langData);
    setLanguage(langData.interfaceLanguage);
    showGlobalToast(
      langData.interfaceLanguage === 'hi'
        ? 'भाषा हिन्दी पर सेट हो गई है'
        : 'Interface language set to English'
    );
  };

  const handleSaveAccessibility = (a11yData) => {
    updateSettings('accessibility', a11yData);
  };

  const handleSaveNotifications = (notifData) => {
    updateSettings('notifications', notifData);
  };

  const handleSavePrivacy = (privacyData) => {
    updateSettings('privacy', privacyData);
  };

  return (
    <div className="px-4 sm:px-8 py-6 max-w-7xl mx-auto animate-fade-in">
      {/* ── Global Toast ── */}
      {globalToast && (
        <div className="fixed bottom-6 right-6 z-60 bg-brown text-ivory text-xs px-4 py-2.5 rounded-xl shadow-lg border border-ochre/30 flex items-center gap-2 animate-slide-in">
          <Sparkles size={14} className="text-ochre" />
          <span>{globalToast}</span>
        </div>
      )}

      {/* ── Header ── */}
      <div className="mb-6 pb-4 border-b border-beige-dark/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif font-bold text-brown text-2xl sm:text-3xl tracking-tight">
              {t('settings.title')}
            </h1>
            <span className="w-2 h-2 rounded-full bg-terracotta" />
          </div>
          <p className="font-sans text-xs sm:text-sm text-brown/65 mt-1">
            {t('settings.subtitle')}
          </p>
        </div>

        {/* Current Active Language Pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-beige/60 border border-beige-dark/70 text-xs font-sans text-brown/70 self-start sm:self-auto">
          <Globe size={13} className="text-terracotta" />
          <span>{t('settings.languageLabel')}</span>
          <strong className="text-brown">
            {language === 'hi' ? 'हिन्दी (Hindi)' : 'English'}
          </strong>
        </div>
      </div>

      {/* ── Mobile Horizontal Tab Selector ── */}
      <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-thin">
        {tabKeys.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-sans font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-terracotta text-white shadow-sm'
                  : 'bg-beige/60 text-brown/70 hover:bg-beige border border-beige-dark/60'
              }`}
            >
              <Icon size={13} />
              <span>{t(tab.key)}</span>
            </button>
          );
        })}
      </div>

      {/* ── Main Two-Column Layout (Desktop) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Vertical Settings Navigation */}
        <div className="hidden lg:block lg:col-span-4 sticky top-6">
          <div className="bg-ivory rounded-2xl border border-beige-dark/65 p-3.5 shadow-sm space-y-1">
            <div className="px-3 py-2 text-[10px] font-sans font-semibold tracking-wider uppercase text-brown/40">
              {t('settings.preferencesControls')}
            </div>

            {tabKeys.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-sans font-medium text-left transition-all ${
                    isActive
                      ? 'bg-terracotta/10 text-terracotta font-semibold border border-terracotta/20 shadow-xs'
                      : 'text-brown/70 hover:text-brown hover:bg-beige/50'
                  }`}
                >
                  <Icon
                    size={16}
                    className={`flex-shrink-0 ${
                      isActive ? 'text-terracotta' : 'text-brown/45'
                    }`}
                  />
                  <span>{t(tab.key)}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Respectful Notice Box */}
          <div className="mt-4 p-4 rounded-2xl bg-beige/40 border border-beige-dark/50 text-xs font-sans text-brown/65 leading-relaxed">
            <p className="font-semibold text-brown mb-1">{t('settings.heritagePromise')}</p>
            {t('settings.heritagePromiseDesc')}
          </div>
        </div>

        {/* Right Column: Active Tab Content */}
        <div className="lg:col-span-8">
          {activeTab === 'profile' && (
            <ProfileSection
              profile={settings.profile}
              onSaveProfile={handleSaveProfile}
            />
          )}

          {activeTab === 'language' && (
            <LanguageSection
              language={settings.language}
              onSaveLanguage={handleSaveLanguage}
            />
          )}

          {activeTab === 'accessibility' && (
            <AccessibilitySection
              accessibility={settings.accessibility}
              onSaveAccessibility={handleSaveAccessibility}
              currentLanguage={settings.language.interfaceLanguage}
            />
          )}

          {activeTab === 'notifications' && (
            <NotificationsSection
              notifications={settings.notifications}
              onSaveNotifications={handleSaveNotifications}
            />
          )}

          {activeTab === 'privacy' && (
            <PrivacySection
              privacy={settings.privacy}
              onSavePrivacy={handleSavePrivacy}
            />
          )}

          {activeTab === 'help' && <HelpSupportSection />}
        </div>
      </div>

      {/* ── Bottom Decorative Warli Border ── */}
      <div className="mt-12 pb-4">
        <WarliDivider className="w-full opacity-60" />
      </div>
    </div>
  );
}
