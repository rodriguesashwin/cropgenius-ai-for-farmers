import { Activity, Minus, TrendingDown, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { PredictionResultData } from "@/data/price-prediction";

const trendIcon = {
  Increasing: TrendingUp,
  Stable: Minus,
  Decreasing: TrendingDown,
} as const;

export function PredictionInsight({ result }: { result: PredictionResultData }) {
  const Icon = trendIcon[result.trend];

  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] sm:p-6">
      <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
        <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Activity className="size-4" aria-hidden="true" />
        </span>
        Prediction Insight
      </h3>

      <dl className="mt-4 space-y-3">
        <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-muted/30 px-4 py-3">
          <dt className="text-sm text-muted-foreground">Trend</dt>
          <dd>
            <Badge variant="secondary" className="gap-1.5">
              <Icon className="size-3.5" aria-hidden="true" />
              {result.trend}
            </Badge>
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-muted/30 px-4 py-3">
          <dt className="text-sm text-muted-foreground">Expected movement</dt>
          <dd className="text-sm font-semibold text-foreground">{result.movement}</dd>
        </div>
        <div className="rounded-xl border border-border bg-muted/30 px-4 py-3">
          <dt className="text-sm text-muted-foreground">Historical trend summary</dt>
          <dd className="mt-1.5 text-sm text-foreground">
            {result.isSample
              ? "A summary of past price movement for this crop and market will appear here from the prediction model."
              : `Based on past price movement for ${result.crop} in ${result.location}.`}
          </dd>
        </div>
      </dl>
    </section>
  );
}
