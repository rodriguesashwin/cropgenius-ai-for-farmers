export type MarketPriceRecord = {
  id: string;
  crop: string;
  market: string;
  state: string;
  minPrice: number | null;
  maxPrice: number | null;
  modalPrice: number | null;
  unit: string;
  observationDate: string;
  source: string;
};

export type MarketPricesResponse = {
  records: MarketPriceRecord[];
  sourceLabel?: string;
  updatedAt?: string;
};

function asText(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value.trim() : value == null ? fallback : String(value).trim();
}

function asPrice(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

/** Maps only fields provided by the API/database. It never generates market rows. */
export function mapMarketPriceRecord(value: unknown, index: number): MarketPriceRecord | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const row = value as Record<string, unknown>;
  const crop = asText(row.crop ?? row.commodity);
  const market = asText(row.market ?? row.market_name ?? row.mandi);
  if (!crop || !market) return null;

  return {
    id: asText(row.id ?? row.record_id, `${crop}-${market}-${index}`),
    crop,
    market,
    state: asText(row.state ?? row.state_name, "—"),
    minPrice: asPrice(row.min_price ?? row.minPrice),
    maxPrice: asPrice(row.max_price ?? row.maxPrice),
    modalPrice: asPrice(row.modal_price ?? row.modalPrice ?? row.modal),
    unit: asText(row.unit, "₹/quintal"),
    observationDate: asText(row.observation_date ?? row.observationDate ?? row.date, ""),
    source: asText(row.source ?? row.data_source, "Source not specified"),
  };
}

export function mapMarketPricesResponse(payload: unknown): MarketPricesResponse {
  const root = payload && typeof payload === "object" && !Array.isArray(payload)
    ? payload as Record<string, unknown>
    : {};
  const rawRows = Array.isArray(payload)
    ? payload
    : Array.isArray(root.records)
      ? root.records
      : Array.isArray(root.prices)
        ? root.prices
        : Array.isArray(root.data)
          ? root.data
          : [];
  return {
    records: rawRows.map(mapMarketPriceRecord).filter((row): row is MarketPriceRecord => row !== null),
    sourceLabel: asText(root.source ?? root.source_label) || undefined,
    updatedAt: asText(root.updated_at ?? root.updatedAt) || undefined,
  };
}

export function formatMarketPrice(value: number | null): string {
  return value === null ? "—" : `₹${Math.round(value).toLocaleString("en-IN")}`;
}

export function formatObservationDate(value: string): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}
