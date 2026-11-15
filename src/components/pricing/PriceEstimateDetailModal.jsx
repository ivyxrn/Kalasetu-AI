import React, { useState } from 'react';
import {
  X,
  Edit3,
  Copy,
  Check,
  Calendar,
  Layers,
  Sparkles,
  Info,
  Printer,
  Calculator,
} from 'lucide-react';
import { LotusLogo } from '../ui/DecorativeElements';
import { useLanguage } from '../../i18n';

export default function PriceEstimateDetailModal({
  estimate,
  isOpen,
  onClose,
  onEdit,
}) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  if (!isOpen || !estimate) return null;

  const handleCopy = () => {
    const text = `Fair Price Estimate for "${estimate.artworkTitle}":
- Suggested Price: ₹${estimate.suggestedSellingPrice?.toLocaleString('en-IN')}
- Material Expenses: ₹${estimate.totalExpenses?.toLocaleString('en-IN')}
- Labour Cost: ₹${estimate.totalLabourCost?.toLocaleString('en-IN')} (${estimate.hoursSpent} hrs @ ₹${estimate.hourlyRate}/hr)
- Cost Per Item: ₹${estimate.costPerItem?.toLocaleString('en-IN')}
- Profit Margin: ${estimate.profitMargin}% (+₹${estimate.estimatedProfit?.toLocaleString('en-IN')})
— Calculated via KalaSetu AI Fair Pricing Assistant`;

    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-brown/70 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-ivory rounded-3xl border border-beige-dark/70 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-beige/40 border-b border-beige-dark/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-terracotta/10 text-terracotta flex items-center justify-center font-serif font-bold text-sm">
              ₹
            </div>
            <div>
              <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-terracotta">
                {t('pricing.calculatorTitle', 'Fair Price Estimate Record')}
              </span>
              <h3 className="font-serif font-bold text-brown text-base">
                {estimate.artworkTitle}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-2.5 py-1.5 rounded-lg bg-ivory hover:bg-beige border border-beige-dark/60 text-xs font-sans text-brown flex items-center gap-1.5 transition-colors shadow-sm"
              title={t('common.copy', 'Copy')}
            >
              {copied ? (
                <>
                  <Check size={13} className="text-forest" />
                  <span className="text-forest">{t('common.copied', 'Copied')}</span>
                </>
              ) : (
                <>
                  <Copy size={13} className="text-brown/60" />
                  <span>{t('common.copy', 'Copy')}</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="p-1.5 rounded-lg bg-ivory hover:bg-beige border border-beige-dark/60 text-brown/70 hover:text-brown transition-colors shadow-sm"
              title={t('common.print', 'Print')}
            >
              <Printer size={15} />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-beige text-brown/60 hover:text-brown transition-colors"
              aria-label={t('common.close', 'Close')}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Top Artwork Overview */}
          <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-beige/50 border border-beige-dark/60">
            <img
              src={estimate.artworkImage}
              alt={estimate.artworkTitle}
              className="w-16 h-14 rounded-xl object-cover border border-ochre/40 shadow-sm"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-serif font-bold text-brown text-base truncate">
                {estimate.artworkTitle}
              </h4>
              <div className="text-xs font-sans text-brown/60">
                {estimate.artForm} · {t('pricing.calculatedOn', { date: estimate.date }, `Calculated on ${estimate.date}`)}
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-sans text-brown/60 block">
                {t('pricing.suggestedSellingPriceLabel', 'Suggested Price:')}
              </span>
              <span className="font-serif font-bold text-terracotta text-2xl leading-none">
                ₹{estimate.suggestedSellingPrice?.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Itemized Materials Table */}
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-brown text-sm">
              {t('pricing.sectionA', 'Material & Additional Expenses')}
            </h4>
            <div className="rounded-xl border border-beige-dark/60 overflow-hidden text-xs font-sans">
              <table className="w-full text-left">
                <thead className="bg-beige/60 text-brown/60 text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="p-2.5 pl-3">{t('pricing.itemName', 'Item / Material')}</th>
                    <th className="p-2.5 pr-3 text-right">{t('pricing.cost', 'Cost')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-beige-dark/40 bg-ivory">
                  {(estimate.expenses || []).map((item, idx) => (
                    <tr key={idx}>
                      <td className="p-2.5 pl-3 text-brown">{item.name}</td>
                      <td className="p-2.5 pr-3 text-right font-medium text-brown">
                        ₹{Number(item.cost)?.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-beige/30 font-bold">
                    <td className="p-2.5 pl-3 text-brown">{t('pricing.expensesTotal', 'Total Expenses:')}</td>
                    <td className="p-2.5 pr-3 text-right text-brown">
                      ₹{estimate.totalExpenses?.toLocaleString('en-IN')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Labour & Batch Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
            <div className="p-3.5 rounded-xl bg-beige/40 border border-beige-dark/50 space-y-1">
              <div className="font-bold text-brown">{t('pricing.sectionB', 'Labour & Craft Time')}:</div>
              <div className="text-brown/75">
                {estimate.hoursSpent} {t('pricing.hoursUnit', 'hours')} @ ₹{estimate.hourlyRate}/{t('pricing.perHourUnit', 'hour')}
              </div>
              <div className="text-forest font-semibold pt-1">
                {t('pricing.totalLabourCost', 'Total Labour Value')}: ₹{estimate.totalLabourCost?.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-beige/40 border border-beige-dark/50 space-y-1">
              <div className="font-bold text-brown">{t('pricing.sectionC', 'Batch & Profit Margin')}:</div>
              <div className="text-brown/75">
                {t('pricing.quantityLabel', 'Batch Size')}: {estimate.quantity || 1} {estimate.quantity > 1 ? t('pricing.piecesUnit', 'pieces') : t('pricing.pieceUnit', 'piece')}
              </div>
              <div className="text-terracotta font-semibold pt-1">
                {t('pricing.profitMargin', 'Profit Margin')}: {estimate.profitMargin}% (+₹{estimate.estimatedProfit?.toLocaleString('en-IN')})
              </div>
            </div>
          </div>

          {/* Transparency Disclaimer */}
          <div className="p-3.5 rounded-xl bg-ochre/15 border border-ochre/30 flex items-start gap-2 text-xs font-sans text-brown/75">
            <Info size={14} className="text-terracotta flex-shrink-0 mt-0.5" />
            <span>
              {t('pricing.guidanceDisclaimer', 'This is a preliminary guide based on your entered costs and hours. As the artisan, you always have full freedom to adapt your price for loyal customers, bulk orders, or special galleries.')}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-beige/30 border-t border-beige-dark/50 flex items-center justify-between">
          <span className="text-[11px] font-sans text-brown/50">
            {t('pricing.saveDirectNotice', 'Recorded in KalaSetu AI Fair Pricing Assistant')}
          </span>

          <div className="flex items-center gap-2">
            {onEdit && (
              <button
                onClick={() => {
                  onClose();
                  onEdit(estimate);
                }}
                className="px-3.5 py-1.5 rounded-lg bg-beige hover:bg-beige-dark/30 text-xs font-sans font-medium text-brown border border-beige-dark/60 transition-colors flex items-center gap-1.5"
              >
                <Edit3 size={13} className="text-terracotta" />
                <span>{t('pricing.editEstimate', 'Edit Estimate')}</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="btn-primary text-xs py-1.5 px-4"
            >
              {t('common.close', 'Close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
