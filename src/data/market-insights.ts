/**
 * Market Insights module — data contracts, demo fixtures and pure helpers.
 *
 * No live market data is used here. Every value exported below is clearly
 * labelled demo data for UI rendering, shaped exactly like the future Flask
 * responses so the service layer can be swapped without touching the UI.
 */

export const marketCrops = [
  "Rice",
  "Wheat",
  "Maize",
  "Tomato",
  "Potato",
  "Onion",
  "Soybean",
  "Groundnut",
  "Coconut",
  "Arecanut",
] as const;
export type MarketCrop = (typeof marketCrops)[number];

export const marketLocations = [
  "Bengaluru APMC",
  "Mysuru APMC",
  "Hubballi APMC",
  "Belagavi APMC",
  "Mangaluru APMC",
  "Shivamogga APMC",
  "Kalaburagi APMC",
  "Davanagere APMC",
  "Tumakuru APMC",
  "Ballari APMC",
];

export const timePeriods = [
  { value: "7d", label: "7 Days", days: 7 },
  { value: "30d", label: "30 Days", days: 30 },
  { value: "3m", label: "3 Months", days: 90 },
  { value: "6m", label: "6 Months", days: 180 },
  { value: "1y", label: "1 Year", days: 365 },
] as const;
export type TimePeriodValue = (typeof timePeriods)[number]["value"];

export type MarketTrend = "Increasing" | "Stable" | "Decreasing";

/** Query parameters the future endpoints accept. */
export type MarketQuery = {
  crop: string;
  location: string;
  start_date: string;
  end_date: string;
};

/** Exact response shape of GET /api/market/prices. */
export type MarketPricesResponse = {
  crop: string;
  location: string;
  current_price: number;
  highest_price: number;
  lowest_price: number;
  price_change: number;
  trend: MarketTrend;
  history: { date: string; price: number }[];
};

export type MarketFiltersValue = {
  crop: string;
  location: string;
  period: TimePeriodValue;
};

export const emptyFilters: MarketFiltersValue = {
  crop: "",
  location: "",
  period: "30d",
};

export type MarketFiltersErrors = Partial<Record<keyof MarketFiltersValue, string>>;

export function validateFilters(values: MarketFiltersValue): MarketFiltersErrors {
  const errors: MarketFiltersErrors = {};
  if (!values.crop) errors.crop = "Please select a crop.";
  if (!values.location.trim()) errors.location = "Please select a market or location.";
  return errors;
}

export type TrendPoint = { date: string; price: number };

export type CropComparisonRow = {
  crop: string;
  price: number;
  change: number;
  trend: MarketTrend;
};

export type MarketComparisonRow = {
  market: string;
  price: number;
  change: number;
  trend: MarketTrend;
};

export type PriceMovementRow = {
  crop: string;
  previousPrice: number;
  currentPrice: number;
  change: number;
  trend: MarketTrend;
};

export type MarketDataRow = {
  id: string;
  date: string;
  crop: string;
  market: string;
  price: number;
  change: number;
  trend: MarketTrend;
};

export type MarketInsights = {
  crop: string;
  location: string;
  period: TimePeriodValue;
  averagePrice: number;
  highestPrice: number;
  lowestPrice: number;
  priceChange: number;
  trend: MarketTrend;
  movement: "Low" | "Moderate" | "High";
  condition: "Favorable" | "Neutral" | "Unfavorable";
  history: TrendPoint[];
  cropComparison: CropComparisonRow[];
  marketComparison: MarketComparisonRow[];
  priceMovements: PriceMovementRow[];
  dataRows: MarketDataRow[];
  /** True whenever the numbers came from the demo fixtures, not a backend. */
  isDemo: boolean;
};

export function formatRupees(value: number): string {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

export function formatChange(value: number): string {
  const sign = value > 0 ? "+" : value < 0 ? "−" : "";
  return `${sign}${Math.abs(value).toFixed(1)}%`;
}

export function trendOf(change: number): MarketTrend {
  if (change > 1) return "Increasing";
  if (change < -1) return "Decreasing";
  return "Stable";
}

/** Trend word for screen readers / non-colour cues. */
export function trendLabel(trend: MarketTrend): string {
  return trend;
}

export function periodDays(period: TimePeriodValue): number {
  return timePeriods.find((p) => p.value === period)?.days ?? 30;
}

export function mapPricesResponse(
  res: MarketPricesResponse,
  period: TimePeriodValue,
): Pick<
  MarketInsights,
  | "crop"
  | "location"
  | "period"
  | "averagePrice"
  | "highestPrice"
  | "lowestPrice"
  | "priceChange"
  | "trend"
  | "history"
> {
  return {
    crop: res.crop,
    location: res.location,
    period,
    averagePrice: res.current_price,
    highestPrice: res.highest_price,
    lowestPrice: res.lowest_price,
    priceChange: res.price_change,
    trend: res.trend,
    history: res.history,
  };
}
