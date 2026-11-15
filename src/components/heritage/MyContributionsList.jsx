import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  MapPin,
  CheckCircle2,
  Clock,
  Eye,
  Feather,
  Plus,
} from 'lucide-react';
import { useLanguage } from '../../i18n';

export default function MyContributionsList({
  contributions,
  onViewContribution,
  onScrollToContribute,
}) {
  const { t } = useLanguage();

  return (
    <section id="my-contributions" className="mb-12">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-3 border-b border-beige-dark/60">
        <div>
          <div className="flex items-center gap-2">
            <Feather size={20} className="text-terracotta" />
            <h2 className="font-serif font-bold text-brown text-2xl">
              {t('heritage.myContributions', 'My Contributions')}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-sans font-semibold bg-terracotta/10 text-terracotta border border-terracotta/20">
              {t(
                contributions.length === 1
                  ? 'heritage.contributions.recordCount'
                  : 'heritage.contributions.recordsCount',
                { count: contributions.length },
                `${contributions.length} ${contributions.length === 1 ? 'Record' : 'Records'}`
              )}
            </span>
          </div>
          <p className="font-sans text-xs sm:text-sm text-brown/65 mt-1">
            {t('heritage.contributions.subtitle', 'Traditional craft lore, natural recipes, and memories you have preserved for future generations.')}
          </p>
        </div>

        <button
          onClick={onScrollToContribute}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-beige border border-beige-dark/70 text-xs font-sans font-medium text-brown hover:bg-beige-dark/30 transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <Plus size={14} className="text-terracotta" />
          <span>{t('heritage.contributions.addNew', 'Add New Knowledge')}</span>
        </button>
      </div>

      {/* Contributions Grid */}
      {contributions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contributions.map((c) => {
            const isVerified = c.status === 'Verified';

            return (
              <div
                key={c.id}
                className="group bg-ivory rounded-2xl border border-beige-dark/70 hover:border-ochre/80 hover:shadow-md transition-all p-5 flex flex-col justify-between"
              >
                <div>
                  {/* Top Image + Badges */}
                  <div className="flex items-start gap-3.5 mb-3">
                    {c.imageUrl && (
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-brown/10 border border-beige-dark/60 flex-shrink-0 shadow-sm">
                        <img
                          src={c.imageUrl}
                          alt={c.craftName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      {/* Review Status Pill */}
                      <div className="flex items-center gap-1.5 mb-1">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-sans font-semibold ${
                            isVerified
                              ? 'bg-forest/10 text-forest border border-forest/25'
                              : 'bg-ochre/20 text-ochre-dark border border-ochre/40'
                          }`}
                        >
                          {isVerified ? (
                            <>
                              <CheckCircle2 size={11} />
                              <span>{t('heritage.contributions.verified', 'Verified (Demo)')}</span>
                            </>
                          ) : (
                            <>
                              <Clock size={11} />
                              <span>{t('heritage.contributions.submittedReview', 'Submitted for Review')}</span>
                            </>
                          )}
                        </span>
                      </div>

                      <h3
                        onClick={() => onViewContribution(c)}
                        className="font-serif font-bold text-brown text-base hover:text-terracotta cursor-pointer transition-colors truncate"
                      >
                        {c.craftName}
                      </h3>

                      <div className="text-[11px] font-sans text-brown/60 flex items-center gap-1 mt-0.5">
                        <MapPin size={11} className="text-terracotta" />
                        <span>{c.region || 'India'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Excerpt */}
                  <p className="font-serif text-xs text-brown/75 line-clamp-3 leading-relaxed mb-4">
                    {c.story || c.aboutCraft || c.materialsUsed}
                  </p>
                </div>

                {/* Footer: Date & View Action */}
                <div className="pt-3 border-t border-beige-dark/40 flex items-center justify-between text-xs font-sans text-brown/60">
                  <span className="flex items-center gap-1 text-[11px] text-brown/50">
                    <Calendar size={12} />
                    {c.submittedDate}
                  </span>

                  <button
                    onClick={() => onViewContribution(c)}
                    className="px-3 py-1.5 rounded-lg bg-ivory hover:bg-beige border border-beige-dark/60 text-xs font-sans font-medium text-brown transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <Eye size={13} className="text-terracotta" />
                    <span>{t('heritage.contributions.viewRecord', 'View Record')}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-ivory border border-beige-dark/60 rounded-2xl p-10 text-center max-w-md mx-auto shadow-sm">
          <div className="w-14 h-14 rounded-full bg-beige border border-ochre/30 flex items-center justify-center mx-auto mb-3 text-terracotta">
            <Feather size={24} />
          </div>
          <h3 className="font-serif font-bold text-brown text-lg mb-1">
            {t('heritage.contributions.noContributions', 'No Contributions Recorded Yet')}
          </h3>
          <p className="font-sans text-xs text-brown/60 mb-5 leading-relaxed">
            {t('heritage.contributions.noContributionsDesc', 'Your personal memories, dye recipes, and ancestral techniques are precious. Share your knowledge in the form above to preserve it for future generations.')}
          </p>
          <button
            onClick={onScrollToContribute}
            className="btn-primary text-xs py-2 px-5 inline-flex items-center gap-1.5"
          >
            <Plus size={14} />
            <span>{t('heritage.contributions.preserveKnowledge', 'Preserve Your Knowledge')}</span>
          </button>
        </div>
      )}
    </section>
  );
}
