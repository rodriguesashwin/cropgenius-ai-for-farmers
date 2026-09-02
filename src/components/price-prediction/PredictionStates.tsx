import { AlertTriangle, Loader2, RefreshCw, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";

export function PredictionLoadingState() {
  return (
    <section className="animate-rise rounded-2xl border border-border bg-card p-8 text-center shadow-[var(--shadow-card)]">
      <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Loader2 className="size-6 animate-spin" aria-hidden="true" />
      </span>
      <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
        Analyzing historical market data…
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Preparing your price estimate. This will only take a moment.
      </p>
    </section>
  );
}

export function PredictionEmptyState() {
  return (
    <section className="rounded-2xl border border-dashed border-border bg-muted/30 p-8 text-center">
      <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <TrendingUp className="size-6" aria-hidden="true" />
      </span>
      <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
        No prediction yet
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Enter crop and market details to generate a price estimate.
      </p>
    </section>
  );
}

export function PredictionErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <section
      role="alert"
      className="animate-rise rounded-2xl border border-destructive/30 bg-destructive/5 p-8 text-center"
    >
      <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertTriangle className="size-6" aria-hidden="true" />
      </span>
      <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
        Prediction unavailable
      </h3>
      <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
        Unable to generate the prediction. Please check your inputs and try again.
      </p>
      <Button variant="outline" className="mt-5 min-h-11" onClick={onRetry}>
        <RefreshCw className="size-4" aria-hidden="true" />
        Try again
      </Button>
    </section>
  );
}
