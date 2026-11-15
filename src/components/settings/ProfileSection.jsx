import React, { useState } from 'react';
import { User, MapPin, Mail, Phone, Camera, Save, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../i18n';

export default function ProfileSection({ profile, onSaveProfile }) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: profile.name || '',
    craftRole: profile.craftRole || '',
    location: profile.location || '',
    bio: profile.bio || '',
    email: profile.email || '',
    phone: profile.phone || '',
  });

  const [avatarPreview, setAvatarPreview] = useState(profile.avatar || null);
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsSaved(false);
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setIsSaved(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveProfile({
      ...formData,
      avatar: avatarPreview,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="bg-ivory rounded-2xl border border-beige-dark/65 p-6 sm:p-8 shadow-sm">
      <div className="border-b border-beige-dark/50 pb-5 mb-6">
        <h3 className="font-serif font-bold text-brown text-xl sm:text-2xl">
          {t('settings.profile')}
        </h3>
        <p className="font-sans text-xs sm:text-sm text-brown/65 mt-1 leading-relaxed">
          {t('settings.profileDesc')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar & Photo Upload */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-4 rounded-xl bg-beige/40 border border-beige-dark/50">
          <div className="relative group">
            <div className="w-20 h-20 rounded-full bg-beige border-2 border-terracotta/30 overflow-hidden flex items-center justify-center shadow-md">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt={formData.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg viewBox="0 0 32 32" className="w-16 h-16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" rx="16" fill="#F2E0C8" />
                  <circle cx="16" cy="13" r="6" fill="#9D4935" opacity="0.6" />
                  <ellipse cx="16" cy="26" rx="10" ry="8" fill="#9D4935" opacity="0.45" />
                  <circle cx="16" cy="9.5" r="1.4" fill="#D5B77A" opacity="0.8" />
                </svg>
              )}
            </div>

            <label
              htmlFor="avatar-upload"
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-terracotta hover:bg-terracotta-dark text-white flex items-center justify-center cursor-pointer shadow-sm transition-colors"
              title="Upload profile picture"
            >
              <Camera size={14} />
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
            </label>
          </div>

          <div className="text-center sm:text-left flex-1">
            <h4 className="font-serif font-semibold text-brown text-base">
              {t('settings.profilePhoto')}
            </h4>
            <p className="text-xs font-sans text-brown/60 mt-1 max-w-md leading-relaxed">
              {t('settings.profilePhotoDesc')}
            </p>
            <div className="mt-2.5 flex items-center gap-2 justify-center sm:justify-start">
              <label
                htmlFor="avatar-upload"
                className="px-3 py-1.5 rounded-lg bg-beige hover:bg-beige-dark/30 border border-beige-dark/60 text-xs font-sans font-medium text-brown cursor-pointer transition-colors"
              >
                {t('settings.choosePhoto')}
              </label>
              {avatarPreview && (
                <button
                  type="button"
                  onClick={() => {
                    setAvatarPreview(null);
                    setIsSaved(false);
                  }}
                  className="text-xs font-sans text-terracotta hover:underline"
                >
                  {t('settings.removePhoto')}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Input Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider">
              {t('settings.fullName')} <span className="text-terracotta">*</span>
            </label>
            <div className="relative">
              <User
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brown/40"
              />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g. Ivy Maiti"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-beige-light/60 border border-beige-dark/70 text-sm font-sans text-brown placeholder-brown/40 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-all"
              />
            </div>
          </div>

          {/* Craft Title */}
          <div className="space-y-1.5">
            <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider">
              {t('settings.craftRole')}
            </label>
            <input
              type="text"
              name="craftRole"
              value={formData.craftRole}
              onChange={handleChange}
              placeholder="e.g. Traditional Folk & Tribal Artisan"
              className="w-full px-3.5 py-2.5 rounded-xl bg-beige-light/60 border border-beige-dark/70 text-sm font-sans text-brown placeholder-brown/40 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-all"
            />
          </div>

          {/* Location */}
          <div className="space-y-1.5">
            <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider">
              {t('settings.location')} <span className="text-terracotta">*</span>
            </label>
            <div className="relative">
              <MapPin
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brown/40"
              />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="e.g. West Bengal, India"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-beige-light/60 border border-beige-dark/70 text-sm font-sans text-brown placeholder-brown/40 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-all"
              />
            </div>
          </div>

          {/* Contact Email (Optional) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider">
                {t('settings.contactEmail')}
              </label>
              <span className="text-[11px] font-sans text-brown/45">{t('common.optional')}</span>
            </div>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brown/40"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. ivy.maiti.crafts@gmail.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-beige-light/60 border border-beige-dark/70 text-sm font-sans text-brown placeholder-brown/40 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-all"
              />
            </div>
          </div>

          {/* Phone / WhatsApp (Optional) */}
          <div className="sm:col-span-2 space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider">
                {t('settings.phoneNumber')}
              </label>
              <span className="text-[11px] font-sans text-brown/45">{t('settings.phoneHelp')}</span>
            </div>
            <div className="relative">
              <Phone
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brown/40"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. +91 98765 43210"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-beige-light/60 border border-beige-dark/70 text-sm font-sans text-brown placeholder-brown/40 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-all"
              />
            </div>
          </div>

          {/* Bio / Short Introduction */}
          <div className="sm:col-span-2 space-y-1.5">
            <label className="block text-xs font-sans font-semibold text-brown uppercase tracking-wider">
              {t('settings.shortIntro')}
            </label>
            <textarea
              name="bio"
              rows={3}
              value={formData.bio}
              onChange={handleChange}
              placeholder={t('settings.shortIntroPlaceholder')}
              className="w-full px-3.5 py-2.5 rounded-xl bg-beige-light/60 border border-beige-dark/70 text-sm font-sans text-brown placeholder-brown/40 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-all resize-none leading-relaxed"
            />
          </div>
        </div>

        {/* Action Button & Confirmation */}
        <div className="pt-4 border-t border-beige-dark/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs font-sans text-brown/55">
            {t('settings.immediateSaveNotice')}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {isSaved && (
              <span className="text-xs font-sans text-forest font-medium flex items-center gap-1.5 animate-fade-in">
                <CheckCircle2 size={15} />
                {t('settings.profileSaved')}
              </span>
            )}

            <button
              type="submit"
              className="btn-primary text-xs py-2.5 px-6 shadow-sm flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <Save size={14} />
              <span>{t('settings.saveProfile')}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
