import { Gauge } from "lucide-react";

import { formatRupees, type PredictionResultData } from "@/data/price-prediction";

export function PriceRange({ result }: { result: PredictionResultData }) {
  const span = Math.max(result.maxPrice - result.minPrice, 1);
  const position = Math.min(
    Math.max(((result.predictedPrice - result.minPrice) / span) * 100, 4),
    96,
  );

  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] sm:p-6">
      <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
        <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Gauge className="size-4" aria-hidden="true" />
        </span>
        Expected Price Range
      </h3>

      <div className="mt-6">
        <div className="relative h-2 rounded-full bg-muted">
          <div className="absolute inset-y-0 left-0 w-full rounded-full bg-primary/25" />
          <div
            className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-card bg-primary shadow-[var(--shadow-card)]"
            style={{ left: `${position}%` }}
            aria-hidden="true"
          />
        </div>
        <div className="mt-3 flex items-start justify-between gap-2 text-center">
          <div className="text-left">
            <p className="text-xs text-muted-foreground">Minimum</p>
            <p className="text-sm font-semibold text-foreground">
              {formatRupees(result.minPrice)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Estimated</p>
            <p className="text-sm font-semibold text-primary">
              {formatRupees(result.predictedPrice)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Maximum</p>
            <p className="text-sm font-semibold text-foreground">
              {formatRupees(result.maxPrice)}
            </p>
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">All values are ₹ per quintal.</p>
    </section>
  );
}
