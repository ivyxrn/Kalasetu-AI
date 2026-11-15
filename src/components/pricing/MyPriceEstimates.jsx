import React from 'react';
import {
  Calendar,
  Eye,
  Edit3,
  Trash2,
  Plus,
  Info,
  Layers,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { useLanguage } from '../../i18n';

export default function MyPriceEstimates({
  estimates,
  onViewEstimate,
  onEditEstimate,
  onDeleteEstimate,
  onStartEstimateForFirstArtwork,
}) {
  const { t } = useLanguage();

  return (
    <section id="my-price-estimates" className="mt-12 mb-8 scroll-mt-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-3 border-b border-beige-dark/60">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-terracotta/10 text-terracotta flex items-center justify-center font-serif font-bold text-sm">
              ₹
            </div>
            <h2 className="font-serif font-bold text-brown text-2xl">
              {t('pricing.myPriceEstimates', 'My Price Estimates')}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-sans font-semibold bg-terracotta/10 text-terracotta border border-terracotta/20">
              {estimates.length} {t('pricing.estimatesCount', { count: estimates.length }, `${estimates.length} Estimates`)}
            </span>
          </div>
          <p className="font-sans text-xs sm:text-sm text-brown/65 mt-1">
            {t('pricing.estimatesSubtitle', 'Fair price calculations based on your real materials, time, and craftsmanship.')}
          </p>
        </div>
      </div>

      {/* Estimates Grid */}
      {estimates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {estimates.map((est) => (
            <div
              key={est.id}
              className="group bg-ivory rounded-2xl border border-beige-dark/70 hover:border-ochre/80 hover:shadow-md transition-all p-5 flex flex-col justify-between"
            >
              <div>
                {/* Artwork Header */}
                <div className="flex items-start gap-3.5 mb-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-brown/10 border border-beige-dark/70 flex-shrink-0 shadow-sm">
                    <img
                      src={est.artworkImage}
                      alt={est.artworkTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-sans font-semibold text-terracotta uppercase tracking-wider block mb-0.5 truncate">
                      {est.artForm}
                    </span>
                    <h3
                      onClick={() => onViewEstimate(est)}
                      className="font-serif font-bold text-brown text-base hover:text-terracotta cursor-pointer transition-colors truncate"
                      title={est.artworkTitle}
                    >
                      {est.artworkTitle}
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] font-sans text-brown/50 mt-0.5">
                      <Calendar size={11} />
                      <span>{t('pricing.calculatedOn', { date: est.date }, `Calculated ${est.date}`)}</span>
                    </div>
                  </div>
                </div>

                {/* Price & Breakdown Highlight Box */}
                <div className="p-3.5 rounded-xl bg-beige/40 border border-beige-dark/50 mb-3 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-sans text-brown/65 font-medium">
                      {t('pricing.suggestedSellingPrice', 'Suggested Selling Price')}:
                    </span>
                    <span className="font-serif font-bold text-terracotta text-2xl leading-none">
                      ₹{est.suggestedSellingPrice?.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Micro Breakdown */}
                  <div className="flex items-center justify-between text-[11px] font-sans text-brown/60 pt-1.5 border-t border-beige-dark/40">
                    <span>
                      {t('pricing.costPerItem', 'Cost')}: <strong>₹{est.costPerItem?.toLocaleString('en-IN')}</strong>
                    </span>
                    <span>·</span>
                    <span className="text-forest font-semibold">
                      {t('pricing.estimatedProfit', 'Profit')}: +₹{est.estimatedProfit?.toLocaleString('en-IN')} ({est.profitMargin}%)
                    </span>
                  </div>
                </div>

                {/* Labour details pill */}
                <p className="text-[11px] font-sans text-brown/60 leading-snug line-clamp-1">
                  {t('pricing.basedOnSummary', {
                    hours: est.hoursSpent,
                    rate: est.hourlyRate,
                    expenses: est.totalExpenses,
                  }, `Based on ${est.hoursSpent} hrs of craft time @ ₹${est.hourlyRate}/hr and ₹${est.totalExpenses} materials.`)}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 mt-3 border-t border-beige-dark/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onViewEstimate(est)}
                    className="px-3 py-1.5 rounded-lg bg-ivory hover:bg-beige border border-beige-dark/60 text-xs font-sans font-medium text-brown transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <Eye size={13} className="text-terracotta" />
                    <span>{t('pricing.viewEstimate', 'View Breakdown')}</span>
                  </button>

                  <button
                    onClick={() => onEditEstimate(est)}
                    className="px-3 py-1.5 rounded-lg bg-ivory hover:bg-beige border border-beige-dark/60 text-xs font-sans font-medium text-brown transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <Edit3 size={13} className="text-forest" />
                    <span>{t('pricing.editEstimate', 'Edit')}</span>
                  </button>
                </div>

                <button
                  onClick={() => onDeleteEstimate(est)}
                  className="p-1.5 rounded-lg hover:bg-terracotta/10 text-brown/40 hover:text-terracotta transition-colors"
                  title={t('pricing.deleteEstimate', 'Delete estimate')}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-ivory border border-beige-dark/60 rounded-2xl p-10 text-center max-w-md mx-auto shadow-sm">
          <div className="w-14 h-14 rounded-full bg-beige border border-ochre/30 flex items-center justify-center mx-auto mb-3 text-terracotta font-serif font-bold text-2xl">
            ₹
          </div>
          <h3 className="font-serif font-bold text-brown text-lg mb-1">
            {t('pricing.noEstimatesYet', 'No Saved Price Estimates Yet')}
          </h3>
          <p className="font-sans text-xs text-brown/60 mb-5 leading-relaxed">
            {t('pricing.noEstimatesDesc', 'Your craft has real value. Open any artwork above and click "Estimate Fair Price" to calculate a fair starting price based on your time and materials.')}
          </p>
          <button
            onClick={onStartEstimateForFirstArtwork}
            className="btn-primary text-xs py-2 px-5 inline-flex items-center gap-1.5"
          >
            <span>{t('pricing.estimateFairPrice', 'Estimate Price for an Artwork')}</span>
            <ArrowRight size={13} />
          </button>
        </div>
      )}
    </section>
  );
}
