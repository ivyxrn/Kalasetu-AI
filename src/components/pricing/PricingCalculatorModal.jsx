import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Plus,
  Trash2,
  Clock,
  Sparkles,
  HelpCircle,
  Layers,
  Save,
  CheckCircle2,
  Info,
  Sliders,
  DollarSign,
  Palette,
  IndianRupee,
} from 'lucide-react';
import {
  calculateFairPrice,
  expenseSuggestions,
  profitPresets,
} from '../../data/pricingData';
import { LotusLogo } from '../ui/DecorativeElements';
import { useLanguage } from '../../i18n';

export default function PricingCalculatorModal({
  artwork,
  existingEstimate,
  isOpen,
  onClose,
  onSaveEstimate,
}) {
  const { t } = useLanguage();
  // If editing an existing estimate or starting fresh from artwork
  const [expenses, setExpenses] = useState(() => {
    if (existingEstimate?.expenses && existingEstimate.expenses.length > 0) {
      return existingEstimate.expenses;
    }
    // Generate intelligent default expenses based on artwork
    return [
      {
        id: 'e-1',
        name: artwork?.materials?.split(',')[0] || 'Handmade Paper / Surface',
        cost: 250,
      },
      {
        id: 'e-2',
        name: 'Natural Pigments & Natural Binders',
        cost: 380,
      },
      {
        id: 'e-3',
        name: 'Fine Brushes & Bamboo Pens',
        cost: 150,
      },
      {
        id: 'e-4',
        name: 'Protective Framing & Matting',
        cost: 750,
      },
      {
        id: 'e-5',
        name: 'Packaging & Safe Box',
        cost: 160,
      },
    ];
  });

  const [hoursSpent, setHoursSpent] = useState(
    existingEstimate?.hoursSpent || 10
  );
  const [hourlyRate, setHourlyRate] = useState(
    existingEstimate?.hourlyRate || 200
  );
  const [quantity, setQuantity] = useState(
    existingEstimate?.quantity || 1
  );
  const [profitMargin, setProfitMargin] = useState(
    existingEstimate?.profitMargin || 25
  );

  // Sync state when artwork or existingEstimate changes
  useEffect(() => {
    if (existingEstimate) {
      setExpenses(existingEstimate.expenses || []);
      setHoursSpent(existingEstimate.hoursSpent || 10);
      setHourlyRate(existingEstimate.hourlyRate || 200);
      setQuantity(existingEstimate.quantity || 1);
      setProfitMargin(existingEstimate.profitMargin || 25);
    } else if (artwork) {
      setExpenses([
        {
          id: 'e-1',
          name: artwork.materials?.split(',')[0] || 'Handmade Paper / Surface',
          cost: 250,
        },
        {
          id: 'e-2',
          name: 'Natural Pigments & Binders',
          cost: 380,
        },
        {
          id: 'e-3',
          name: 'Bamboo Twig Pens & Brushes',
          cost: 150,
        },
        {
          id: 'e-4',
          name: 'Protective Framing & Matting',
          cost: 750,
        },
        {
          id: 'e-5',
          name: 'Packaging & Courier Box',
          cost: 160,
        },
      ]);
      setHoursSpent(10);
      setHourlyRate(200);
      setQuantity(1);
      setProfitMargin(25);
    }
  }, [artwork, existingEstimate]);

  // Transparent Real-time Calculation
  const calculation = useMemo(() => {
    return calculateFairPrice({
      expenses,
      hoursSpent,
      hourlyRate,
      quantity,
      profitMargin,
    });
  }, [expenses, hoursSpent, hourlyRate, quantity, profitMargin]);

  if (!isOpen || !artwork) return null;

  // Add Dynamic Expense
  const handleAddExpense = (name = '', cost = 0) => {
    setExpenses((prev) => [
      ...prev,
      {
        id: `e-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        name,
        cost: Number(cost) || 0,
      },
    ]);
  };

  const handleUpdateExpense = (id, field, value) => {
    setExpenses((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: field === 'cost' ? Number(value) || 0 : value,
            }
          : item
      )
    );
  };

  const handleRemoveExpense = (id) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSave = () => {
    const estimateToSave = {
      id: existingEstimate?.id || `est-${Date.now()}`,
      artworkId: artwork.id,
      artworkTitle: artwork.title,
      artworkImage: artwork.imageUrl,
      artForm: artwork.artForm,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      rawDate: new Date().toISOString(),
      expenses,
      hoursSpent: Number(hoursSpent) || 1,
      hourlyRate: Number(hourlyRate) || 0,
      quantity: Math.max(1, Number(quantity) || 1),
      profitMargin: Number(profitMargin) || 0,
      totalExpenses: calculation.totalExpenses,
      totalLabourCost: calculation.totalLabourCost,
      totalBatchCost: calculation.totalBatchCost,
      costPerItem: calculation.costPerItem,
      suggestedSellingPrice: calculation.suggestedSellingPrice,
      estimatedProfit: calculation.estimatedProfit,
    };

    onSaveEstimate(estimateToSave);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-brown/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-ivory rounded-3xl border border-beige-dark/70 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* ── Modal Header ── */}
        <div className="px-6 py-4 bg-beige/40 border-b border-beige-dark/50 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-terracotta/10 text-terracotta flex items-center justify-center font-serif font-bold text-base">
              ₹
            </div>
            <div>
              <h2 className="font-serif font-bold text-brown text-lg sm:text-xl leading-none">
                {t('pricing.calculatorTitle', "Let's Find a Fair Price for Your Creation")}
              </h2>
              <p className="text-xs font-sans text-brown/65 mt-0.5">
                {t('pricing.calculatorSubtitle', "Your time, materials and craftsmanship all have value. Let's calculate a fair starting price.")}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-beige text-brown/60 hover:text-brown transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto space-y-8">
          {/* Artwork Context Card */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-2xl bg-beige/50 border border-beige-dark/60">
            <div className="w-20 h-16 rounded-xl overflow-hidden bg-brown/10 border border-ochre/40 flex-shrink-0 shadow-sm">
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 text-center sm:text-left min-w-0">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-terracotta px-2 py-0.5 rounded bg-terracotta/10">
                  {artwork.artForm}
                </span>
                <span className="text-xs font-sans text-brown/50">·</span>
                <span className="text-xs font-sans text-brown/60">
                  Artist: <strong>Ivy Maiti</strong>
                </span>
              </div>

              <h3 className="font-serif font-bold text-brown text-base sm:text-lg truncate">
                {artwork.title}
              </h3>

              <p className="text-xs font-sans text-brown/70 line-clamp-1 mt-0.5">
                {artwork.description || 'Traditional Indian folk creation'}
              </p>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              SECTION A: MATERIALS AND EXPENSES
             ───────────────────────────────────────────────────────────── */}
          <div className="bg-beige/30 rounded-2xl border border-beige-dark/60 p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-beige-dark/40">
              <div>
                <h4 className="font-serif font-bold text-brown text-base flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-terracotta text-white text-[11px] font-bold flex items-center justify-center">
                    A
                  </span>
                  <span>{t('pricing.sectionA', 'Section A: Materials and Additional Expenses')}</span>
                </h4>
                <p className="text-xs font-sans text-brown/60 ml-7">
                  {t('pricing.sectionADesc', 'List everything you purchased or used to create this work (paper, paints, brushes, framing, packing).')}
                </p>
              </div>

              <div className="text-right ml-7 sm:ml-0">
                <span className="text-xs font-sans text-brown/60">
                  {t('pricing.expensesTotal', 'Expenses Total:')}
                </span>
                <span className="font-serif font-bold text-brown text-base ml-1.5">
                  ₹{calculation.totalExpenses.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Quick Suggestion Chips */}
            <div>
              <span className="text-[11px] font-sans font-medium text-brown/65 block mb-1.5">
                {t('pricing.quickAddSuggestions', 'Quick-add common traditional supplies:')}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {expenseSuggestions.map((sug) => (
                  <button
                    key={sug.name}
                    type="button"
                    onClick={() => handleAddExpense(sug.name, sug.cost)}
                    className="px-2.5 py-1 rounded-lg bg-ivory hover:bg-beige border border-beige-dark/60 text-xs font-sans text-brown/80 transition-colors flex items-center gap-1 shadow-sm"
                  >
                    <Plus size={11} className="text-terracotta" />
                    <span>{sug.name} (+₹{sug.cost})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Items List */}
            <div className="space-y-2.5 pt-1">
              {expenses.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="flex items-center gap-2 p-2 rounded-xl bg-ivory border border-beige-dark/60 shadow-sm"
                >
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) =>
                      handleUpdateExpense(item.id, 'name', e.target.value)
                    }
                    placeholder="e.g. Handmade Paper, Parijat Dyes, Framing..."
                    className="flex-1 px-3 py-1.5 text-xs font-sans text-brown bg-transparent focus:outline-none"
                  />

                  <div className="flex items-center gap-1 pl-2 border-l border-beige-dark/50">
                    <span className="text-xs font-sans font-semibold text-brown/60">
                      ₹
                    </span>
                    <input
                      type="number"
                      min="0"
                      step="10"
                      value={item.cost}
                      onChange={(e) =>
                        handleUpdateExpense(item.id, 'cost', e.target.value)
                      }
                      className="w-24 px-2 py-1 text-xs font-sans font-bold text-brown bg-beige-light border border-beige-dark/50 rounded-lg focus:outline-none focus:border-terracotta text-right"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveExpense(item.id)}
                    className="p-1.5 rounded-lg hover:bg-terracotta/10 text-brown/40 hover:text-terracotta transition-colors ml-1"
                    title={t('common.delete', 'Delete')}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => handleAddExpense('', 100)}
                className="w-full py-2 rounded-xl border border-dashed border-beige-dark hover:border-terracotta/60 text-xs font-sans font-medium text-brown/70 hover:text-terracotta transition-colors flex items-center justify-center gap-1.5 bg-ivory/50"
              >
                <Plus size={13} />
                <span>{t('pricing.addAnotherExpense', 'Add Another Expense Item')}</span>
              </button>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              SECTION B: YOUR TIME AND EFFORT (LABOUR)
             ───────────────────────────────────────────────────────────── */}
          <div className="bg-beige/30 rounded-2xl border border-beige-dark/60 p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-beige-dark/40">
              <div>
                <h4 className="font-serif font-bold text-brown text-base flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-forest text-white text-[11px] font-bold flex items-center justify-center">
                    B
                  </span>
                  <span>{t('pricing.sectionB', 'Section B: Your Time and Effort')}</span>
                </h4>
                <p className="text-xs font-sans text-brown/60 ml-7">
                  {t('pricing.sectionBDesc', "The hours you spend creating are an essential part of your artwork's real value.")}
                </p>
              </div>

              <div className="text-right ml-7 sm:ml-0">
                <span className="text-xs font-sans text-brown/60">
                  {t('pricing.labourValue', 'Labour Value:')}
                </span>
                <span className="font-serif font-bold text-brown text-base ml-1.5">
                  ₹{calculation.totalLabourCost.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {/* Hours spent */}
              <div className="p-3.5 rounded-xl bg-ivory border border-beige-dark/60 shadow-sm space-y-1.5">
                <label className="block text-xs font-sans font-semibold text-brown">
                  {t('pricing.hoursSpentQuestion', 'How many hours did you spend making this?')}
                </label>
                <p className="text-[11px] font-sans text-brown/55">
                  {t('pricing.hoursSpentHelp', 'Include sketching, preparing dyes, painting, and drying time.')}
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={hoursSpent}
                    onChange={(e) => setHoursSpent(e.target.value)}
                    className="w-28 px-3 py-1.5 text-sm font-sans font-bold text-brown bg-beige-light border border-beige-dark/70 rounded-lg focus:outline-none focus:border-terracotta"
                  />
                  <span className="text-xs font-sans text-brown/60">{t('pricing.hoursUnit', 'Hours')}</span>
                </div>
              </div>

              {/* Hourly Rate */}
              <div className="p-3.5 rounded-xl bg-ivory border border-beige-dark/60 shadow-sm space-y-1.5">
                <label className="block text-xs font-sans font-semibold text-brown">
                  {t('pricing.hourlyRateQuestion', 'How much would you like to earn for each hour of work?')}
                </label>
                <p className="text-[11px] font-sans text-brown/55">
                  {t('pricing.hourlyRateHelp', 'A fair hourly rate for your craftsmanship and focus (e.g. ₹150 – ₹300).')}
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-sm font-sans font-bold text-brown/60">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="50"
                    step="25"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    className="w-28 px-3 py-1.5 text-sm font-sans font-bold text-brown bg-beige-light border border-beige-dark/70 rounded-lg focus:outline-none focus:border-terracotta"
                  />
                  <span className="text-xs font-sans text-brown/60">{t('pricing.perHourUnit', 'per Hour')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              SECTION C: QUANTITY / BATCH SIZE
             ───────────────────────────────────────────────────────────── */}
          <div className="bg-beige/30 rounded-2xl border border-beige-dark/60 p-5 space-y-3">
            <div className="pb-2 border-b border-beige-dark/40">
              <h4 className="font-serif font-bold text-brown text-base flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-ochre-dark text-white text-[11px] font-bold flex items-center justify-center">
                  C
                </span>
                <span>{t('pricing.sectionC', 'Section C: Quantity (Batch Size)')}</span>
              </h4>
              <p className="text-xs font-sans text-brown/60 ml-7">
                {t('pricing.sectionCDesc', 'How many identical pieces were made using the entered expenses and time?')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3.5 rounded-xl bg-ivory border border-beige-dark/60 shadow-sm">
              <div>
                <div className="text-xs font-sans font-semibold text-brown">
                  {t('pricing.batchCountLabel', 'Number of pieces in this batch')}
                </div>
                <div className="text-[11px] font-sans text-brown/60">
                  {t('pricing.batchCountHelp', 'For a solo one-of-a-kind painting, keep this at 1. For a batch of prints or clay items, enter the total count.')}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-20 px-3 py-1.5 text-sm font-sans font-bold text-brown bg-beige-light border border-beige-dark/70 rounded-lg focus:outline-none focus:border-terracotta text-center"
                />
                <span className="text-xs font-sans text-brown/60">
                  {quantity > 1 ? t('pricing.piecesUnit', 'Pieces') : t('pricing.pieceUnit', 'Piece')}
                </span>
              </div>
            </div>

            {quantity > 1 && (
              <p className="text-[11px] font-sans text-forest flex items-center gap-1.5">
                <Info size={13} />
                <span>
                  {t('pricing.batchSplitNotice', {
                    total: calculation.totalBatchCost,
                    qty: quantity,
                    each: calculation.costPerItem,
                  }, `Expenses and labour (Total ₹${calculation.totalBatchCost}) are divided evenly across ${quantity} pieces = ₹${calculation.costPerItem} per piece.`)}
                </span>
              </p>
            )}
          </div>

          {/* ─────────────────────────────────────────────────────────────
              SECTION D: YOUR DESIRED PROFIT
             ───────────────────────────────────────────────────────────── */}
          <div className="bg-beige/30 rounded-2xl border border-beige-dark/60 p-5 space-y-3">
            <div className="pb-2 border-b border-beige-dark/40">
              <h4 className="font-serif font-bold text-brown text-base flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brown text-white text-[11px] font-bold flex items-center justify-center">
                  D
                </span>
                <span>{t('pricing.sectionD', 'Section D: Your Desired Profit')}</span>
              </h4>
              <p className="text-xs font-sans text-brown/60 ml-7">
                {t('pricing.sectionDDesc', 'Profit is the extra money you earn beyond your costs. It helps you save for your family and invest in your craft.')}
              </p>
            </div>

            {/* Profit margin presets */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {profitPresets.map((preset) => {
                const isSelected = Number(profitMargin) === preset.value;

                return (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => setProfitMargin(preset.value)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-terracotta bg-terracotta/10 text-terracotta ring-1 ring-terracotta/30 font-medium'
                        : 'border-beige-dark/60 bg-ivory text-brown hover:bg-beige'
                    }`}
                  >
                    <div className="text-xs font-sans font-bold">
                      {preset.label}
                    </div>
                    <div className="text-[10px] font-sans opacity-70 mt-0.5 leading-snug">
                      {preset.description}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Slider & Custom Input */}
            <div className="p-3.5 rounded-xl bg-ivory border border-beige-dark/60 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1 pr-4">
                <div className="flex items-center justify-between text-xs font-sans font-medium text-brown mb-1.5">
                  <span>{t('pricing.fineTuneProfit', 'Fine-tune Profit Margin:')}</span>
                  <span className="font-bold text-terracotta">
                    {profitMargin}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={profitMargin}
                  onChange={(e) => setProfitMargin(e.target.value)}
                  className="w-full accent-terracotta cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-1.5 self-end sm:self-auto">
                <input
                  type="number"
                  min="0"
                  max="200"
                  value={profitMargin}
                  onChange={(e) => setProfitMargin(e.target.value)}
                  className="w-18 px-2.5 py-1 text-xs font-sans font-bold text-brown bg-beige-light border border-beige-dark/70 rounded-lg text-center"
                />
                <span className="text-xs font-sans text-brown/60">%</span>
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              SECTION E: RESULTS & CALCULATION SUMMARY
             ───────────────────────────────────────────────────────────── */}
          <div className="rounded-3xl p-6 sm:p-7 border-2 border-terracotta/30 shadow-lg bg-gradient-to-br from-ivory via-beige-light to-beige/60 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-beige-dark/50">
              <div>
                <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-terracotta">
                  {t('pricing.costBreakdown', 'Transparent Cost Breakdown')}
                </span>
                <h3 className="font-serif font-bold text-brown text-xl">
                  {t('pricing.suggestedEstimateTitle', 'Suggested Fair Price Estimate')}
                </h3>
              </div>

              {/* Big Highlighted Price Badge */}
              <div className="text-left sm:text-right">
                <div className="text-xs font-sans text-brown/60">
                  {t('pricing.suggestedSellingPriceLabel', 'Suggested Selling Price:')}
                </div>
                <div className="font-serif font-bold text-terracotta text-3xl sm:text-4xl leading-none mt-0.5">
                  ₹{calculation.suggestedSellingPrice.toLocaleString('en-IN')}
                </div>
                {quantity > 1 && (
                  <div className="text-[11px] font-sans text-brown/60 mt-0.5">
                    {t('pricing.perPieceBatch', {
                      total: (calculation.suggestedSellingPrice * quantity).toLocaleString('en-IN'),
                    }, `per piece (Total batch: ₹${(calculation.suggestedSellingPrice * quantity).toLocaleString('en-IN')})`)}
                  </div>
                )}
              </div>
            </div>

            {/* Formula Step-by-Step Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-sans">
              <div className="p-3 rounded-xl bg-ivory border border-beige-dark/50 shadow-sm">
                <div className="text-[11px] text-brown/60">{t('pricing.totalExpenses', 'Total Expenses:')}</div>
                <div className="font-bold text-brown text-sm mt-0.5">
                  ₹{calculation.totalExpenses.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-ivory border border-beige-dark/50 shadow-sm">
                <div className="text-[11px] text-brown/60">{t('pricing.labourCostLabel', 'Labour Cost:')}</div>
                <div className="font-bold text-brown text-sm mt-0.5">
                  ₹{calculation.totalLabourCost.toLocaleString('en-IN')}
                </div>
                <div className="text-[10px] text-brown/50 mt-0.5">
                  {t('pricing.labourCostBreakdown', { hours: hoursSpent, rate: hourlyRate }, `(${hoursSpent} hrs @ ₹${hourlyRate}/hr)`)}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-ivory border border-beige-dark/50 shadow-sm">
                <div className="text-[11px] text-brown/60">{t('pricing.productionCostPerItem', 'Production Cost / Item:')}</div>
                <div className="font-bold text-brown text-sm mt-0.5">
                  ₹{calculation.costPerItem.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-forest/10 border border-forest/25 shadow-sm text-forest">
                <div className="text-[11px] opacity-80">{t('pricing.estimatedProfitPerItem', 'Estimated Profit / Item:')}</div>
                <div className="font-bold text-forest text-sm mt-0.5">
                  +₹{calculation.estimatedProfit.toLocaleString('en-IN')}
                </div>
                <div className="text-[10px] opacity-80 mt-0.5">
                  {t('pricing.profitMarginNote', { margin: profitMargin }, `(${profitMargin}% margin)`)}
                </div>
              </div>
            </div>

            {/* Respectful Guidance Disclaimer */}
            <div className="p-3.5 rounded-xl bg-ochre/15 border border-ochre/30 flex items-start gap-2.5 text-xs font-sans text-brown/80 leading-relaxed">
              <Info size={15} className="text-terracotta flex-shrink-0 mt-0.5" />
              <span>
                <strong>{t('pricing.preliminaryDisclaimer', 'Preliminary Guidance Only:')}</strong> {t('pricing.guidanceDisclaimer', 'This calculation is a starting point to help you understand your real costs. You, the artist, always retain complete freedom to set the final selling price for your creations.')}
              </span>
            </div>
          </div>
        </div>

        {/* ── Modal Footer ── */}
        <div className="px-6 py-4 bg-beige/40 border-t border-beige-dark/50 flex items-center justify-between z-10">
          <span className="text-xs font-sans text-brown/60">
            {t('pricing.saveDirectNotice', 'Saves directly to your "My Price Estimates" records.')}
          </span>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-beige border border-beige-dark/60 text-xs font-sans font-medium text-brown hover:bg-beige-dark/30 transition-colors"
            >
              {t('common.cancel', 'Cancel')}
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="btn-primary text-xs py-2 px-6 flex items-center gap-1.5 shadow-md"
            >
              <Save size={14} />
              <span>{t('pricing.saveEstimate', 'Save Price Estimate')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
