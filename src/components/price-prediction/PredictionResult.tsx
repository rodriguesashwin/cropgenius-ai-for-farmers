import { BadgeInfo, CalendarDays, MapPin, Sprout } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { formatRupees, type PredictionResultData } from "@/data/price-prediction";

function Meta({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-background/70 p-3">
      <p className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
        <Icon className="size-4 text-primary" aria-hidden="true" />
        {label}
      </p>
      <p className="mt-1.5 text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}

export function PredictionResult({ result }: { result: PredictionResultData }) {
  return (
    <section className="animate-rise rounded-2xl border border-primary/25 bg-card p-5 shadow-[var(--shadow-card)] sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground">
            Predicted Market Price
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Prediction estimate — not a guaranteed market price.
          </p>
        </div>
        <Badge variant="secondary" className="gap-1.5">
          <BadgeInfo className="size-3.5" aria-hidden="true" />
          {result.isSample ? "Sample Result" : "Prediction estimate"}
        </Badge>
      </div>

      <div className="mt-5 rounded-xl border border-border bg-muted/30 p-5 text-center">
        <p className="text-xs font-medium tracking-[0.08em] text-muted-foreground uppercase">
          Estimated price
        </p>
        <p className="mt-2 font-display text-4xl font-semibold text-primary sm:text-5xl">
          {formatRupees(result.predictedPrice)}
          <span className="ml-1 align-middle text-base font-medium text-muted-foreground">
            / quintal
          </span>
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Expected range {formatRupees(result.minPrice)} – {formatRupees(result.maxPrice)} / quintal
        </p>
        {result.confidence !== null && (
          <p className="mt-1 text-xs text-muted-foreground">
            Model confidence {Math.round(result.confidence)}%
          </p>
        )}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Meta icon={Sprout} label="Crop" value={result.crop} />
        <Meta icon={MapPin} label="Market / location" value={result.location} />
        <Meta icon={CalendarDays} label="Prediction month" value={result.month} />
      </div>

      {result.isSample && (
        <p className="mt-4 rounded-xl border border-dashed border-border bg-muted/30 px-4 py-3 text-xs text-muted-foreground">
          This is a sample result used to review the layout. Real values will come from the
          CropGenius prediction model once it is connected.
        </p>
      )}
    </section>
  );
}
