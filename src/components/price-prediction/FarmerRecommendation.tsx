import { Lightbulb } from "lucide-react";

import type { PredictionResultData } from "@/data/price-prediction";

export function FarmerRecommendation({ result }: { result: PredictionResultData }) {
  return (
    <section className="rounded-2xl border border-border bg-muted/30 p-5 sm:p-6">
      <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
        <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Lightbulb className="size-4" aria-hidden="true" />
        </span>
        Farmer Recommendation
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-foreground">{result.recommendation}</p>

      <ul className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-3">
        <li className="rounded-xl border border-border bg-card px-4 py-3">
          Selling now may be considered
        </li>
        <li className="rounded-xl border border-border bg-card px-4 py-3">
          Waiting may be beneficial
        </li>
        <li className="rounded-xl border border-border bg-card px-4 py-3">
          Continue monitoring market prices
        </li>
      </ul>

      <p className="mt-4 text-xs text-muted-foreground">
        Guidance placeholders — the CropGenius model will select the relevant advice. Use this
        estimate together with current market conditions before making selling decisions.
      </p>
    </section>
  );
}
