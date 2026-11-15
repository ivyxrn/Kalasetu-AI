import React from 'react';
import { X, CheckCircle2, Clock, MapPin, Calendar, Feather, User } from 'lucide-react';
import { LotusLogo } from '../ui/DecorativeElements';
import { useLanguage } from '../../i18n';

export default function ContributionDetailModal({ contribution, isOpen, onClose }) {
  const { t } = useLanguage();
  if (!isOpen || !contribution) return null;

  const isVerified = contribution.status === 'Verified';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-brown/70 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-ivory rounded-3xl border border-beige-dark/70 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-beige/40 border-b border-beige-dark/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LotusLogo size={20} />
            <div>
              <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-terracotta">
                {t('heritage.detail.communityRecord', 'Community Heritage Record')}
              </span>
              <h3 className="font-serif font-bold text-brown text-base">
                {contribution.craftName}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-beige text-brown/60 hover:text-brown transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Status banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-beige/40 border border-beige-dark/60 text-xs font-sans">
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                  isVerified
                    ? 'bg-forest/10 text-forest border border-forest/25'
                    : 'bg-ochre/20 text-ochre-dark border border-ochre/40'
                }`}
              >
                {isVerified ? (
                  <>
                    <CheckCircle2 size={13} />
                    <span>{t('heritage.detail.verifiedRecord', 'Verified Knowledge Record (Demo)')}</span>
                  </>
                ) : (
                  <>
                    <Clock size={13} />
                    <span>{t('heritage.detail.submittedVerification', 'Submitted for Community Verification')}</span>
                  </>
                )}
              </span>
            </div>

            <div className="flex items-center gap-2 text-brown/60 text-[11px]">
              <Calendar size={12} />
              <span>{t('heritage.detail.recorded', { date: contribution.submittedDate }, `Recorded: ${contribution.submittedDate}`)}</span>
            </div>
          </div>

          {/* Photo & Artisan Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            {contribution.imageUrl && (
              <div className="w-full sm:w-44 aspect-[4/3] rounded-2xl overflow-hidden bg-brown/10 border border-beige-dark/70 flex-shrink-0 shadow-sm">
                <img
                  src={contribution.imageUrl}
                  alt={contribution.craftName}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="space-y-1.5 text-center sm:text-left flex-1">
              <div className="flex items-center justify-center sm:justify-start gap-1 text-xs font-sans text-brown/60">
                <User size={13} className="text-terracotta" />
                <span>{t('heritage.detail.contributor', 'Contributor:')} <strong>{contribution.artisanName || t('heritage.detail.anonymous', 'Anonymous Artisan')}</strong></span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-1 text-xs font-sans text-brown/60">
                <MapPin size={13} className="text-terracotta" />
                <span>{t('heritage.detail.region', 'Region:')} <strong>{contribution.region || t('heritage.detail.traditionalVillage', 'Traditional Village')}</strong></span>
              </div>
            </div>
          </div>

          {/* Details Sections */}
          {contribution.aboutCraft && (
            <div className="space-y-1">
              <h4 className="text-xs font-sans font-semibold text-brown uppercase tracking-wider">
                {t('heritage.detail.aboutTradition', 'About this tradition')}
              </h4>
              <p className="font-serif text-sm text-brown/85 leading-relaxed bg-beige/30 p-3.5 rounded-xl border border-beige-dark/40">
                {contribution.aboutCraft}
              </p>
            </div>
          )}

          {contribution.howLearned && (
            <div className="space-y-1">
              <h4 className="text-xs font-sans font-semibold text-brown uppercase tracking-wider">
                {t('heritage.detail.howLearned', 'How it was learned & passed down')}
              </h4>
              <p className="font-serif text-sm text-brown/85 leading-relaxed bg-beige/30 p-3.5 rounded-xl border border-beige-dark/40">
                {contribution.howLearned}
              </p>
            </div>
          )}

          {contribution.materialsTechniques && (
            <div className="space-y-1">
              <h4 className="text-xs font-sans font-semibold text-brown uppercase tracking-wider">
                {t('heritage.detail.materialsTechniques', 'Natural materials & craft techniques')}
              </h4>
              <p className="font-sans text-xs text-brown/80 leading-relaxed bg-beige/30 p-3.5 rounded-xl border border-beige-dark/40">
                {contribution.materialsTechniques}
              </p>
            </div>
          )}

          {contribution.story && (
            <div className="space-y-1">
              <h4 className="text-xs font-sans font-semibold text-brown uppercase tracking-wider">
                {t('heritage.detail.ancestralLore', 'Ancestral lore, song or memory')}
              </h4>
              <p className="font-serif italic text-sm text-brown/85 leading-relaxed bg-ochre/15 p-3.5 rounded-xl border border-ochre/30">
                &ldquo;{contribution.story}&rdquo;
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-beige/30 border-t border-beige-dark/50 flex items-center justify-between">
          <span className="text-[11px] font-sans text-brown/50">
            {t('heritage.detail.storedLocally', 'Stored locally in demo state · Ready for Supabase sync')}
          </span>
          <button
            onClick={onClose}
            className="btn-primary text-xs py-1.5 px-4"
          >
            {t('common.close', 'Close')}
          </button>
        </div>
      </div>
    </div>
  );
}
