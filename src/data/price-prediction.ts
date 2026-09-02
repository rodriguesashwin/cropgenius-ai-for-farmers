/**
 * Price Prediction module — data contracts and pure helpers.
 *
 * The UI never computes a real prediction. Everything here describes the shape
 * of the future `POST /api/price-prediction` request/response so the Flask +
 * Random Forest service can be connected with minimal changes.
 */

export const predictionCrops = [
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

export type PredictionCrop = (typeof predictionCrops)[number];

export const seasons = ["Kharif", "Rabi", "Summer"] as const;
export type Season = (typeof seasons)[number];

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;
export type Month = (typeof months)[number];

/** Reference market list for the searchable location field (no default selection). */
export const marketOptions = [
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

/** Exact request body the future endpoint expects. */
export type PricePredictionRequest = {
  crop: string;
  location: string;
  season: string;
  month: string;
  historical_price: number;
  rainfall?: number;
};

/** Exact response body the future endpoint returns. */
export type PricePredictionResponse = {
  predicted_price: number;
  min_price: number;
  max_price: number;
  trend: string;
  confidence: number;
  recommendation: string;
};

export type PredictionTrend = "Increasing" | "Stable" | "Decreasing";

export type PredictionResultData = {
  crop: string;
  location: string;
  season: string;
  month: string;
  predictedPrice: number;
  minPrice: number;
  maxPrice: number;
  trend: PredictionTrend;
  movement: "Low" | "Moderate" | "High";
  confidence: number | null;
  recommendation: string;
  /** True whenever the values came from the UI demo path, not the model. */
  isSample: boolean;
};

export function mapPredictionResponse(
  res: PricePredictionResponse,
  req: PricePredictionRequest,
): PredictionResultData {
  const trend: PredictionTrend =
    res.trend === "Increasing" || res.trend === "Decreasing" ? res.trend : "Stable";
  const spread = res.predicted_price > 0 ? (res.max_price - res.min_price) / res.predicted_price : 0;

  return {
    crop: req.crop,
    location: req.location,
    season: req.season,
    month: req.month,
    predictedPrice: res.predicted_price,
    minPrice: res.min_price,
    maxPrice: res.max_price,
    trend,
    movement: spread > 0.2 ? "High" : spread > 0.1 ? "Moderate" : "Low",
    confidence: typeof res.confidence === "number" ? res.confidence : null,
    recommendation: res.recommendation,
    isSample: false,
  };
}

export type PredictionStage = "empty" | "loading" | "result" | "error";

export type PricePredictionFormValues = {
  crop: string;
  location: string;
  season: string;
  month: string;
  historicalPrice: string;
  rainfall: string;
};

export type PricePredictionFormErrors = Partial<Record<keyof PricePredictionFormValues, string>>;

export const emptyFormValues: PricePredictionFormValues = {
  crop: "",
  location: "",
  season: "",
  month: "",
  historicalPrice: "",
  rainfall: "",
};

export function validateForm(values: PricePredictionFormValues): PricePredictionFormErrors {
  const errors: PricePredictionFormErrors = {};

  if (!values.crop) errors.crop = "Please select a crop.";
  if (!values.location.trim()) errors.location = "Please enter a market or location.";
  if (!values.season) errors.season = "Please select a season.";
  if (!values.month) errors.month = "Please select a prediction month.";

  const price = Number(values.historicalPrice);
  if (!values.historicalPrice.trim()) {
    errors.historicalPrice = "Please enter a historical average price.";
  } else if (!Number.isFinite(price) || price <= 0) {
    errors.historicalPrice = "Enter a valid price greater than 0.";
  }

  if (values.rainfall.trim()) {
    const rain = Number(values.rainfall);
    if (!Number.isFinite(rain) || rain < 0) {
      errors.rainfall = "Rainfall must be a number of 0 or more.";
    }
  }

  return errors;
}

export function toRequestBody(values: PricePredictionFormValues): PricePredictionRequest {
  const body: PricePredictionRequest = {
    crop: values.crop,
    location: values.location.trim(),
    season: values.season,
    month: values.month,
    historical_price: Number(values.historicalPrice),
  };
  if (values.rainfall.trim()) body.rainfall = Number(values.rainfall);
  return body;
}

export function formatRupees(value: number): string {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

/**
 * Placeholder for the future service call. It is deliberately NOT wired to the
 * network yet; the route uses `buildSampleResult` so the layout can be
 * reviewed, and that output is always labelled as a sample.
 *
 *   export async function requestPricePrediction(body: PricePredictionRequest) {
 *     const res = await fetch("/api/price-prediction", {
 *       method: "POST",
 *       headers: { "Content-Type": "application/json" },
 *       body: JSON.stringify(body),
 *     });
 *     if (!res.ok) throw new Error("Prediction failed");
 *     return mapPredictionResponse((await res.json()) as PricePredictionResponse, body);
 *   }
 */
export function buildSampleResult(values: PricePredictionFormValues): PredictionResultData {
  const base = Number(values.historicalPrice);
  return {
    crop: values.crop,
    location: values.location.trim(),
    season: values.season,
    month: values.month,
    predictedPrice: base,
    minPrice: base * 0.92,
    maxPrice: base * 1.08,
    trend: "Stable",
    movement: "Moderate",
    confidence: null,
    recommendation:
      "Use this estimate together with current market conditions before making selling decisions.",
    isSample: true,
  };
}

/** Clearly-labelled demo series so the trend chart renders before the API exists. */
export type PriceTrendPoint = { month: string; price: number };

export const sampleTrend: PriceTrendPoint[] = [
  { month: "Jan", price: 2100 },
  { month: "Feb", price: 2180 },
  { month: "Mar", price: 2050 },
  { month: "Apr", price: 2240 },
  { month: "May", price: 2310 },
  { month: "Jun", price: 2260 },
  { month: "Jul", price: 2400 },
  { month: "Aug", price: 2350 },
];

export type RecentPrediction = {
  id: string;
  crop: string;
  market: string;
  month: string;
  predictedPrice: number;
  date: string;
};

/** Demo rows only — replaced by the saved predictions table later. */
export const sampleRecentPredictions: RecentPrediction[] = [
  {
    id: "sample-1",
    crop: "Rice",
    market: "Mysuru APMC",
    month: "October",
    predictedPrice: 2320,
    date: "12 Aug 2026",
  },
  {
    id: "sample-2",
    crop: "Onion",
    market: "Hubballi APMC",
    month: "November",
    predictedPrice: 1840,
    date: "09 Aug 2026",
  },
  {
    id: "sample-3",
    crop: "Groundnut",
    market: "Kalaburagi APMC",
    month: "December",
    predictedPrice: 6150,
    date: "04 Aug 2026",
  },
];
