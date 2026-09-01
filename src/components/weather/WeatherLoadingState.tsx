import { Loader2 } from "lucide-react";

export function WeatherLoadingState() {
  return (
    <div
      aria-live="polite"
      className="animate-rise flex flex-col items-center rounded-2xl border border-border bg-muted/30 px-6 py-12 text-center"
    >
      <span className="relative flex size-16 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
        <span className="gradient-field relative flex size-14 items-center justify-center rounded-full text-primary-foreground">
          <Loader2 className="size-7 animate-spin" aria-hidden="true" />
        </span>
      </span>
      <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
        Fetching weather information...
      </h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        CropGenius is preparing weather insights for the selected location.
      </p>
    </div>
  );
}
