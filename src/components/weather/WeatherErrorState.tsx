import { AlertTriangle, MapPin, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

export function WeatherErrorState({
  onRetry,
  onChangeLocation,
}: {
  onRetry: () => void;
  onChangeLocation: () => void;
}) {
  return (
    <div
      role="alert"
      className="animate-rise flex flex-col items-center rounded-2xl border border-destructive/30 bg-destructive/5 px-6 py-12 text-center"
    >
      <span className="flex size-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
        <AlertTriangle className="size-7" aria-hidden="true" />
      </span>
      <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
        Unable to fetch weather data
      </h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        We couldn&apos;t retrieve weather information right now. Please try again.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button onClick={onRetry} className="min-h-11">
          <RotateCcw className="size-4" aria-hidden="true" />
          Try Again
        </Button>
        <Button variant="outline" onClick={onChangeLocation} className="min-h-11">
          <MapPin className="size-4" aria-hidden="true" />
          Change Location
        </Button>
      </div>
    </div>
  );
}
