// KalaSetu AI – Fair Pricing Assistant Data Model & Calculation Formulas
// Designed with empathy, transparency, and simple language for traditional artisans.

export const expenseSuggestions = [
  { name: 'Handmade Paper / Cotton Cloth', cost: 250 },
  { name: 'Natural Mineral & Plant Dyes', cost: 400 },
  { name: 'Bamboo Twig Pens & Brushes', cost: 150 },
  { name: 'Terracotta Mud & Rice Binder', cost: 120 },
  { name: 'Wood Frame & Glass', cost: 750 },
  { name: 'Protective Packaging & Box', cost: 180 },
  { name: 'Local Transport & Travel', cost: 150 },
];

export const profitPresets = [
  {
    value: 15,
    label: '15% (Modest)',
    description: 'Good for craft melas and bulk community sales.',
  },
  {
    value: 25,
    label: '25% (Recommended)',
    description: 'Balanced margin for direct-to-buyer sales.',
  },
  {
    value: 35,
    label: '35% (Artisan Skill)',
    description: 'Accounts for fine linework and intricate craftsmanship.',
  },
  {
    value: 50,
    label: '50% (Masterpiece)',
    description: 'For rare, one-of-a-kind exhibition creations.',
  },
];

/**
 * Transparent Fair Pricing Calculation
 *
 * Formulas:
 * Total expenses = Sum of all material and additional expenses.
 * Total labour cost = Hours spent × Hourly labour rate.
 * Total batch production cost = Total expenses + Total labour cost.
 * Production cost per item = Total batch production cost ÷ Quantity.
 * Suggested selling price per item = Production cost per item × (1 + Profit margin / 100).
 * Estimated profit per item = Suggested selling price per item − Production cost per item.
 */
export function calculateFairPrice({
  expenses = [],
  hoursSpent = 1,
  hourlyRate = 200,
  quantity = 1,
  profitMargin = 25,
}) {
  const totalExpenses = expenses.reduce(
    (sum, item) => sum + (Number(item.cost) || 0),
    0
  );
  const hours = Math.max(0.5, Number(hoursSpent) || 0);
  const rate = Math.max(0, Number(hourlyRate) || 0);
  const totalLabourCost = hours * rate;

  const totalBatchCost = totalExpenses + totalLabourCost;
  const qty = Math.max(1, Number(quantity) || 1);
  const costPerItem = totalBatchCost / qty;

  const margin = Math.max(0, Number(profitMargin) || 0);
  const suggestedSellingPrice = Math.round(costPerItem * (1 + margin / 100));
  const estimatedProfit = Math.round(suggestedSellingPrice - costPerItem);

  return {
    totalExpenses: Math.round(totalExpenses),
    totalLabourCost: Math.round(totalLabourCost),
    totalBatchCost: Math.round(totalBatchCost),
    costPerItem: Math.round(costPerItem),
    suggestedSellingPrice,
    estimatedProfit,
    hoursSpent: hours,
    hourlyRate: rate,
    quantity: qty,
    profitMargin: margin,
  };
}

// Initial realistic pre-calculated estimates for Ivy Maiti
export const initialSavedEstimates = [
  {
    id: 'est-1',
    artworkId: 1,
    artworkTitle: "Nature's Harmony",
    artworkImage: '/artworks/madhubani_harmony.jpg',
    artForm: 'Madhubani',
    date: 'Nov 06, 2026',
    rawDate: '2026-11-06',
    expenses: [
      { id: 'e-1', name: 'Handmade Unbleached Paper', cost: 250 },
      { id: 'e-2', name: 'Natural Parijat & Indigo Dyes', cost: 450 },
      { id: 'e-3', name: 'Hand-whittled Bamboo Pens', cost: 120 },
      { id: 'e-4', name: 'Archival Teak Frame & Glass', cost: 850 },
      { id: 'e-5', name: 'Packaging Box & Courier Wrap', cost: 180 },
    ],
    hoursSpent: 14,
    hourlyRate: 200,
    quantity: 1,
    profitMargin: 25,
    totalExpenses: 1850,
    totalLabourCost: 2800,
    totalBatchCost: 4650,
    costPerItem: 4650,
    suggestedSellingPrice: 5800,
    estimatedProfit: 1150,
  },
  {
    id: 'est-2',
    artworkId: 2,
    artworkTitle: 'Village Celebrations',
    artworkImage: '/artworks/warli_celebrations.jpg',
    artForm: 'Warli',
    date: 'Oct 28, 2026',
    rawDate: '2026-10-28',
    expenses: [
      { id: 'e-1', name: 'Terracotta mud wash on canvas board', cost: 220 },
      { id: 'e-2', name: 'White rice paste & tree gum binder', cost: 100 },
      { id: 'e-3', name: 'Protective wooden framing', cost: 550 },
      { id: 'e-4', name: 'Packaging & transport', cost: 150 },
    ],
    hoursSpent: 9,
    hourlyRate: 180,
    quantity: 1,
    profitMargin: 25,
    totalExpenses: 1020,
    totalLabourCost: 1620,
    totalBatchCost: 2640,
    costPerItem: 2640,
    suggestedSellingPrice: 3300,
    estimatedProfit: 660,
  },
  {
    id: 'est-3',
    artworkId: 3,
    artworkTitle: 'Forest Companions',
    artworkImage: '/artworks/gond_companions.jpg',
    artForm: 'Gond',
    date: 'Oct 22, 2026',
    rawDate: '2026-10-22',
    expenses: [
      { id: 'e-1', name: 'Treated canvas with clay wash', cost: 350 },
      { id: 'e-2', name: 'Crushed stone minerals & binders', cost: 420 },
      { id: 'e-3', name: 'Fine sable stippling pens', cost: 200 },
      { id: 'e-4', name: 'Exhibition frame', cost: 750 },
    ],
    hoursSpent: 12,
    hourlyRate: 200,
    quantity: 1,
    profitMargin: 35,
    totalExpenses: 1720,
    totalLabourCost: 2400,
    totalBatchCost: 4120,
    costPerItem: 4120,
    suggestedSellingPrice: 5550,
    estimatedProfit: 1430,
  },
];
