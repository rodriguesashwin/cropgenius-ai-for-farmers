import { Bug, ImageUp, Sprout } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PreventionCard } from "@/components/disease-detection/PreventionCard";
import { TreatmentCard } from "@/components/disease-detection/TreatmentCard";
import type { AnalysisResultData } from "@/data/disease-detection";

export function AnalysisResult({
  result,
  previewUrl,
  onReset,
}: {
  result: AnalysisResultData;
  previewUrl?: string | undefined;
  onReset: () => void;
}) {
  const confidenceLabel =
    result.confidence === null ? "[Confidence value from API]" : `${result.confidence}%`;

  return (
    <div className="animate-rise space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-xl font-semibold text-foreground">Analysis Result</h3>
        {result.isExample && (
          <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[0.7rem] font-semibold tracking-wide text-accent-foreground uppercase">
            Example layout · no AI service connected
          </span>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-5">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Crop Identified
          </p>
          <p className="mt-2 flex items-center gap-2 font-display text-lg font-semibold text-foreground">
            <Sprout className="size-5 text-primary" aria-hidden="true" />
            {result.cropName}
          </p>
        </section>
        <section className="rounded-2xl border border-border bg-card p-5">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Possible Disease
          </p>
          <p className="mt-2 flex items-center gap-2 font-display text-lg font-semibold text-foreground">
            <Bug className="size-5 text-accent-foreground" aria-hidden="true" />
            {result.diseaseName}
          </p>
        </section>
      </div>

      <section className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Confidence
          </p>
          <p className="text-sm font-semibold text-foreground">{confidenceLabel}</p>
        </div>
        <Progress value={result.confidence ?? 0} className="mt-3" />
        {result.confidence === null && (
          <p className="mt-2 text-xs text-muted-foreground">
            The confidence indicator will fill once the model returns a value.
          </p>
        )}
      </section>

      {previewUrl && (
        <section className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-center bg-primary-deep/5 p-3">
            <img
              src={previewUrl}
              alt="Crop leaf image submitted for analysis"
              className="max-h-56 w-full rounded-xl object-contain"
            />
          </div>
        </section>
      )}

      <TreatmentCard treatment={result.treatment} />
      <PreventionCard prevention={result.prevention} />

      <Button variant="outline" size="lg" className="w-full" onClick={onReset}>
        <ImageUp className="size-4.5" aria-hidden="true" />
        Analyze Another Image
      </Button>
    </div>
  );
}
