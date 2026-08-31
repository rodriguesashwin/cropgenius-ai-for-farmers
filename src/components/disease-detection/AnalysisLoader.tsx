import { Check, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const steps = [
  "Image uploaded",
  "Processing image",
  "Detecting possible disease",
  "Preparing recommendations",
];

export function AnalysisLoader({ activeStep = 1 }: { activeStep?: number }) {
  return (
    <div className="animate-rise flex flex-col items-center rounded-2xl border border-border bg-muted/30 px-6 py-10 text-center">
      <span className="relative flex size-16 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
        <span className="gradient-field relative flex size-14 items-center justify-center rounded-full text-primary-foreground">
          <Loader2 className="size-7 animate-spin" aria-hidden="true" />
        </span>
      </span>
      <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
        Analyzing Your Crop...
      </h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Please wait while CropGenius processes the uploaded image.
      </p>

      <ol className="mt-7 w-full max-w-xs space-y-3 text-left" aria-live="polite">
        {steps.map((step, i) => {
          const done = i < activeStep;
          const active = i === activeStep;
          return (
            <li key={step} className="flex items-center gap-3 text-sm">
              <span
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-full border text-[0.65rem] transition-colors duration-300",
                  done && "border-primary bg-primary text-primary-foreground",
                  active && "border-primary text-primary",
                  !done && !active && "border-border text-muted-foreground",
                )}
              >
                {done ? (
                  <Check className="size-3.5" aria-hidden="true" />
                ) : active ? (
                  <span className="size-2 animate-pulse rounded-full bg-primary" />
                ) : (
                  <span className="size-1.5 rounded-full bg-muted-foreground/50" />
                )}
              </span>
              <span
                className={cn(
                  "transition-colors",
                  done || active ? "font-medium text-foreground" : "text-muted-foreground",
                )}
              >
                {step}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
