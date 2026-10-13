import { mapMarketPricesResponse, type MarketPricesResponse } from "@/data/market-insights";

/**
 * Reads the market records API. Configure VITE_API_BASE_URL when Flask runs
 * on a different origin, for example http://127.0.0.1:5000.
 */
export async function loadMarketPrices(signal?: AbortSignal): Promise<MarketPricesResponse> {
  const baseUrl = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");
  const response = await fetch(`${baseUrl}/api/market/prices`, {
    method: "GET",
    headers: { Accept: "application/json" },
    signal,
  });

  if (!response.ok) {
    throw new Error(
      response.status === 404
        ? "The market prices endpoint was not found. Start the backend or check its API route."
        : `Market data could not be loaded (HTTP ${response.status}).`,
    );
  }

  const payload: unknown = await response.json();
  return mapMarketPricesResponse(payload);
}
