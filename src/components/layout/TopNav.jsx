import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, ChevronDown, User, Settings, LogOut, Globe } from 'lucide-react';
import { artistProfile } from '../../data/sampleData';
import { useLanguage } from '../../i18n';
import { useAuth } from '../../context/AuthContext';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function getGreetingEmoji() {
  const hour = new Date().getHours();
  if (hour < 12) return '☀️';
  if (hour < 17) return '🌤️';
  return '🌙';
}

// Minimal inline avatar reused from sidebar for consistency
function AvatarIcon({ size = 28 }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="16" fill="#F2E0C8" />
      <circle cx="16" cy="13" r="6" fill="#9D4935" opacity="0.55" />
      <ellipse cx="16" cy="26" rx="10" ry="8" fill="#9D4935" opacity="0.4" />
      <circle cx="16" cy="9.5" r="1.4" fill="#D5B77A" opacity="0.75" />
    </svg>
  );
}

export default function TopNav() {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();
  const { user, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen]   = useState(false);

  const displayName = user?.name || artistProfile.name;
  const firstName = displayName.split(' ')[0];

  const getGreetingText = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('header.goodMorning', 'Good morning');
    if (hour < 17) return t('header.goodAfternoon', 'Good afternoon');
    return t('header.goodEvening', 'Good evening');
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-ivory border-b border-beige-dark/40 flex-shrink-0">
      {/* ── Greeting ── */}
      <div>
        <h2
          className="font-serif font-semibold text-brown leading-tight flex items-center gap-2"
          style={{ fontSize: '1.2rem', letterSpacing: '-0.01em' }}
        >
          {getGreetingText()}, {firstName}!
          <span className="text-base" aria-hidden="true">{getGreetingEmoji()}</span>
        </h2>
        <p className="font-sans text-brown/50 mt-0.5" style={{ fontSize: '0.8125rem' }}>
          {t('header.subGreeting', "Let's bring your creativity to the world.")}
        </p>
      </div>

      {/* ── Right controls ── */}
      <div className="flex items-center gap-2">
        {/* Quick Language Toggle */}
        <button
          onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-beige/60 hover:bg-beige border border-beige-dark/60 text-xs font-sans font-medium text-brown transition-colors shadow-xs"
          title={language === 'hi' ? 'Switch to English' : 'हिन्दी में बदलें'}
          aria-label="Toggle language"
        >
          <Globe size={13} className="text-terracotta" />
          <span>{language === 'hi' ? 'English' : 'हिन्दी'}</span>
        </button>

        {/* Notification bell */}
        <div className="relative">
          <button
            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
            className="relative w-9 h-9 rounded-lg flex items-center justify-center hover:bg-beige transition-colors duration-200"
            aria-label="Notifications"
          >
            <Bell size={17} className="text-brown/55" strokeWidth={1.8} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-terracotta rounded-full border border-ivory" />
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-11 w-72 bg-beige-light border border-beige-dark/55 rounded-xl shadow-card-hover z-50 p-4 animate-fade-in">
              <p className="font-sans font-semibold text-brown text-sm mb-3">
                {t('header.notifications', 'Notifications')}
              </p>
              <div className="space-y-1.5">
                {[
                  { text: t('header.notif1', 'Your artwork "Nature\'s Harmony" is now published.'), time: t('header.notif1Time', '2h ago') },
                  { text: t('header.notif2', 'ArtStory generation complete for "Rath Yatra".'), time: t('header.notif2Time', '1d ago') },
                ].map((n, i) => (
                  <div key={i} className="flex gap-3 p-2 rounded-lg hover:bg-beige cursor-pointer transition-colors">
                    <div className="w-1.5 h-1.5 mt-2 rounded-full bg-terracotta flex-shrink-0" />
                    <div>
                      <p className="text-xs text-brown/75 leading-snug">{n.text}</p>
                      <p className="text-[10px] text-brown/38 mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-beige-dark/50 mx-1" />

        {/* Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-beige transition-colors duration-200"
            aria-label="Profile menu"
          >
            <div className="w-7 h-7 rounded-full border border-terracotta/25 overflow-hidden">
              <AvatarIcon size={28} />
            </div>
            <ChevronDown
              size={13}
              strokeWidth={2}
              className={`text-brown/45 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-11 w-52 bg-beige-light border border-beige-dark/55 rounded-xl shadow-card-hover z-50 overflow-hidden animate-fade-in">
              {/* Header */}
              <div className="px-4 py-3 border-b border-beige-dark/40 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-terracotta/20 overflow-hidden flex-shrink-0">
                  <AvatarIcon size={32} />
                </div>
                <div className="min-w-0">
                  <p className="font-sans font-semibold text-brown text-sm truncate">{displayName}</p>
                  <p className="text-[10.5px] text-brown/45 truncate mt-0.5">{artistProfile.artForm}</p>
                </div>
              </div>
              {/* Menu items */}
              <div className="p-1.5">
                {[
                  { icon: User, label: t('nav.viewProfile', 'View Profile'), route: '/portfolio' },
                  { icon: Settings, label: t('nav.settings', 'Settings'), route: '/settings' },
                ].map(({ icon: Icon, label, route }) => (
                  <button
                    key={route}
                    onClick={() => {
                      setProfileOpen(false);
                      navigate(route);
                    }}
                    className="flex items-center gap-2.5 w-full px-3 py-2 text-[13px] text-brown/65 hover:text-brown hover:bg-beige rounded-lg transition-colors"
                  >
                    <Icon size={13} className="text-brown/45" />
                    {label}
                  </button>
                ))}
                <div className="my-1 h-px bg-beige-dark/40 mx-2" />
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    logout();
                    navigate('/login');
                  }}
                  className="flex items-center gap-2.5 w-full px-3 py-2 text-[13px] text-terracotta/80 hover:text-terracotta hover:bg-terracotta/5 rounded-lg transition-colors"
                >
                  <LogOut size={13} />
                  {t('nav.signOut', 'Sign Out')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Click-outside overlay */}
      {(profileOpen || notifOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => { setProfileOpen(false); setNotifOpen(false); }}
        />
      )}
    </header>
  );
}
