/**
 * Market Insights service layer — the only place that will talk to Flask.
 *
 * Future endpoints (NOT called yet):
 *   GET /api/market/prices?crop=&location=&start_date=&end_date=
 *   GET /api/market/trends?crop=&location=&start_date=&end_date=
 *   GET /api/market/comparison?crop=&location=
 *
 * Until the backend exists, `loadMarketInsights` resolves clearly-labelled
 * demo fixtures (`isDemo: true`) so the UI can be reviewed. The UI never
 * presents these values as live market data.
 */

import {
  formatRupees,
  marketCrops,
  marketLocations,
  periodDays,
  trendOf,
  type CropComparisonRow,
  type MarketComparisonRow,
  type MarketDataRow,
  type MarketFiltersValue,
  type MarketInsights,
  type MarketPricesResponse,
  type MarketQuery,
  type PriceMovementRow,
  type TrendPoint,
} from "@/data/market-insights";

/** Deterministic pseudo-random so the demo view is stable per filter set. */
function seeded(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    return ((h >>> 0) % 10000) / 10000;
  };
}

const basePrice: Record<string, number> = {
  Rice: 2300,
  Wheat: 2450,
  Maize: 2050,
  Tomato: 1450,
  Potato: 1300,
  Onion: 1850,
  Soybean: 4600,
  Groundnut: 6200,
  Coconut: 3400,
  Arecanut: 42000,
};

export function toQuery(values: MarketFiltersValue): MarketQuery {
  const end = new Date();
  const start = new Date(end.getTime() - periodDays(values.period) * 86_400_000);
  return {
    crop: values.crop,
    location: values.location.trim(),
    start_date: start.toISOString().slice(0, 10),
    end_date: end.toISOString().slice(0, 10),
  };
}

function formatDate(d: Date, compact: boolean): string {
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    ...(compact ? {} : { year: "numeric" }),
  });
}

function buildHistory(seed: string, base: number, days: number): TrendPoint[] {
  const rand = seeded(seed);
  const points = days <= 30 ? days : days <= 90 ? 12 : days <= 180 ? 12 : 12;
  const step = Math.max(1, Math.round(days / points));
  const out: TrendPoint[] = [];
  let price = base * 0.94;
  for (let i = points - 1; i >= 0; i -= 1) {
    price = price * (1 + (rand() - 0.45) * 0.05);
    const d = new Date(Date.now() - i * step * 86_400_000);
    out.push({ date: formatDate(d, days <= 90), price: Math.round(price) });
  }
  return out;
}

/** Demo builder — mirrors the future MarketPricesResponse shape. */
function demoPricesResponse(values: MarketFiltersValue): MarketPricesResponse {
  const base = basePrice[values.crop] ?? 2200;
  const history = buildHistory(
    `${values.crop}|${values.location}|${values.period}`,
    base,
    periodDays(values.period),
  );
  const prices = history.map((p) => p.price);
  const current = prices[prices.length - 1]!;
  const first = prices[0]!;
  const change = ((current - first) / first) * 100;
  return {
    crop: values.crop,
    location: values.location.trim(),
    current_price: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length),
    highest_price: Math.max(...prices),
    lowest_price: Math.min(...prices),
    price_change: Number(change.toFixed(1)),
    trend: trendOf(change),
    history,
  };
}

function demoCropComparison(seed: string): CropComparisonRow[] {
  const rand = seeded(`crops-${seed}`);
  return ["Rice", "Wheat", "Maize", "Tomato", "Potato", "Onion"].map((crop) => {
    const change = Number(((rand() - 0.5) * 9).toFixed(1));
    return {
      crop,
      price: Math.round((basePrice[crop] ?? 2200) * (1 + (rand() - 0.5) * 0.06)),
      change,
      trend: trendOf(change),
    };
  });
}

function demoMarketComparison(values: MarketFiltersValue): MarketComparisonRow[] {
  const rand = seeded(`markets-${values.crop}-${values.location}`);
  const base = basePrice[values.crop] ?? 2200;
  const markets = [
    values.location.trim(),
    ...marketLocations.filter((m) => m !== values.location.trim()).slice(0, 5),
  ];
  return markets.map((market) => {
    const change = Number(((rand() - 0.5) * 8).toFixed(1));
    return {
      market,
      price: Math.round(base * (1 + (rand() - 0.5) * 0.1)),
      change,
      trend: trendOf(change),
    };
  });
}

function demoPriceMovements(seed: string): PriceMovementRow[] {
  const rand = seeded(`moves-${seed}`);
  return ["Onion", "Tomato", "Rice", "Groundnut", "Potato"].map((crop) => {
    const previous = Math.round((basePrice[crop] ?? 2200) * (1 + (rand() - 0.5) * 0.05));
    const current = Math.round(previous * (1 + (rand() - 0.45) * 0.12));
    const change = Number((((current - previous) / previous) * 100).toFixed(1));
    return { crop, previousPrice: previous, currentPrice: current, change, trend: trendOf(change) };
  });
}

function demoDataRows(values: MarketFiltersValue): MarketDataRow[] {
  const rand = seeded(`rows-${values.crop}-${values.location}-${values.period}`);
  const crops = [values.crop, ...marketCrops.filter((c) => c !== values.crop).slice(0, 3)];
  const markets = [
    values.location.trim(),
    ...marketLocations.filter((m) => m !== values.location.trim()).slice(0, 2),
  ];
  const rows: MarketDataRow[] = [];
  for (let i = 0; i < 10; i += 1) {
    const crop = crops[i % crops.length]!;
    const market = markets[i % markets.length]!;
    const change = Number(((rand() - 0.5) * 7).toFixed(1));
    rows.push({
      id: `demo-${i}`,
      date: formatDate(new Date(Date.now() - i * 86_400_000), false),
      crop,
      market,
      price: Math.round((basePrice[crop] ?? 2200) * (1 + (rand() - 0.5) * 0.08)),
      change,
      trend: trendOf(change),
    });
  }
  return rows;
}

function movementOf(history: TrendPoint[]): MarketInsights["movement"] {
  if (history.length < 2) return "Low";
  const prices = history.map((p) => p.price);
  const spread = (Math.max(...prices) - Math.min(...prices)) / Math.max(...prices);
  return spread > 0.15 ? "High" : spread > 0.07 ? "Moderate" : "Low";
}

function conditionOf(change: number): MarketInsights["condition"] {
  if (change > 2) return "Favorable";
  if (change < -2) return "Unfavorable";
  return "Neutral";
}

/**
 * Future implementation (kept here so only this file changes later):
 *
 *   const params = new URLSearchParams(toQuery(values) as Record<string, string>);
 *   const res = await fetch(`/api/market/prices?${params}`);
 *   if (!res.ok) throw new Error("Unable to load market data");
 *   const data = (await res.json()) as MarketPricesResponse;
 *   return { ...mapPricesResponse(data, values.period), isDemo: false, ... };
 */
export async function loadMarketInsights(
  values: MarketFiltersValue,
  options: { delayMs?: number } = {},
): Promise<MarketInsights> {
  await new Promise((resolve) => setTimeout(resolve, options.delayMs ?? 900));

  const res = demoPricesResponse(values);
  const seed = `${values.crop}-${values.location}-${values.period}`;

  return {
    crop: res.crop,
    location: res.location,
    period: values.period,
    averagePrice: res.current_price,
    highestPrice: res.highest_price,
    lowestPrice: res.lowest_price,
    priceChange: res.price_change,
    trend: res.trend,
    movement: movementOf(res.history),
    condition: conditionOf(res.price_change),
    history: res.history,
    cropComparison: demoCropComparison(seed),
    marketComparison: demoMarketComparison(values),
    priceMovements: demoPriceMovements(seed),
    dataRows: demoDataRows(values),
    isDemo: true,
  };
}

export { formatRupees };
