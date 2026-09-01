import { MapPinOff } from "lucide-react";

export function WeatherEmptyState() {
  return (
    <div className="animate-rise flex flex-col items-center rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center">
      <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <MapPinOff className="size-6" aria-hidden="true" />
      </span>
      <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
        No location selected
      </h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Select a location to view weather information.
      </p>
    </div>
  );
}
