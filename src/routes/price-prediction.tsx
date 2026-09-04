import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { FarmerRecommendation } from "@/components/price-prediction/FarmerRecommendation";
import { PredictionInsight } from "@/components/price-prediction/PredictionInsight";
import { PredictionResult } from "@/components/price-prediction/PredictionResult";
import {
  PredictionEmptyState,
  PredictionErrorState,
  PredictionLoadingState,
} from "@/components/price-prediction/PredictionStates";
import { PriceRange } from "@/components/price-prediction/PriceRange";
import { PriceTrendChart } from "@/components/price-prediction/PriceTrendChart";
import { PricePredictionForm } from "@/components/price-prediction/PricePredictionForm";
import { RecentPredictions } from "@/components/price-prediction/RecentPredictions";
import {
  buildSampleResult,
  sampleRecentPredictions,
  sampleTrend,
  type PredictionResultData,
  type PredictionStage,
  type PricePredictionFormValues,
} from "@/data/price-prediction";

const title = "Crop Price Prediction | CropGenius";
const description = "Estimate future crop prices using historical market trends.";

export const Route = createFileRoute("/price-prediction")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PricePredictionPage,
});

function PricePredictionPage() {
  const [stage, setStage] = useState<PredictionStage>("empty");
  const [result, setResult] = useState<PredictionResultData | null>(null);
  const lastValues = useRef<PricePredictionFormValues | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  /**
   * Frontend-only placeholder for the future call:
   *   POST /api/price-prediction
   * No model runs here — the sample result is clearly labelled in the UI.
   */
  function predict(values: PricePredictionFormValues) {
    if (timer.current) clearTimeout(timer.current);
    lastValues.current = values;
    setResult(null);
    setStage("loading");
    timer.current = setTimeout(() => {
      setResult(buildSampleResult(values));
      setStage("result");
    }, 1200);
  }

  return (
    <DashboardShell title="Price Prediction">
      <div className="animate-rise space-y-6">
        <header className="space-y-2">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1 text-xs text-muted-foreground">
              <li>
                <Link to="/dashboard" className="transition-colors hover:text-primary">
                  Dashboard
                </Link>
              </li>
              <ChevronRight className="size-3.5" aria-hidden="true" />
              <li className="font-medium text-foreground">Price Prediction</li>
            </ol>
          </nav>
          <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
            Crop Price Prediction
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{description}</p>
        </header>

        <PricePredictionForm busy={stage === "loading"} onSubmit={predict} />

        {stage === "empty" && <PredictionEmptyState />}
        {stage === "loading" && <PredictionLoadingState />}
        {stage === "error" && (
          <PredictionErrorState
            onRetry={() => (lastValues.current ? predict(lastValues.current) : setStage("empty"))}
          />
        )}

        {stage === "result" && result && (
          <div className="space-y-6">
            <PredictionResult result={result} />

            <div className="grid gap-6 lg:grid-cols-2">
              <PriceRange result={result} />
              <PredictionInsight result={result} />
            </div>

            <PriceTrendChart data={sampleTrend} isSample />

            <FarmerRecommendation result={result} />

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setStage("error")}
                className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                Preview error state
              </button>
            </div>
          </div>
        )}

        <RecentPredictions predictions={sampleRecentPredictions} isSample />
      </div>
    </DashboardShell>
  );
}
