import { useState } from "react";
import { LocateFixed, MapPin, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function WeatherLocationSearch({
  selectedLocation,
  onSearch,
  onUseMyLocation,
  busy = false,
}: {
  selectedLocation: string | null;
  onSearch: (location: string) => void;
  onUseMyLocation: () => void;
  busy?: boolean;
}) {
  const [value, setValue] = useState("");

  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] sm:p-6">
      <h3 className="font-display text-lg font-semibold text-foreground">Check Weather</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Choose a location to view agricultural weather guidance for your farm.
      </p>

      <form
        className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end"
        onSubmit={(e) => {
          e.preventDefault();
          const next = value.trim();
          if (next) onSearch(next);
        }}
      >
        <div className="flex-1 space-y-2">
          <Label htmlFor="weather-location">Location</Label>
          <div className="relative">
            <MapPin
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="weather-location"
              name="location"
              autoComplete="off"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter city, village or location"
              className="pl-9 transition-shadow focus-visible:shadow-[var(--shadow-card)]"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="submit" disabled={busy || !value.trim()} className="min-h-11 flex-1 sm:flex-none">
            <Search className="size-4" aria-hidden="true" />
            Search
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={busy}
            onClick={onUseMyLocation}
            className="min-h-11 flex-1 sm:flex-none"
          >
            <LocateFixed className="size-4" aria-hidden="true" />
            Use My Location
          </Button>
        </div>
      </form>

      <div className="animate-rise mt-4 flex items-center gap-2 rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm">
        <MapPin className="size-4 shrink-0 text-primary" aria-hidden="true" />
        <span className="text-muted-foreground">
          Weather for:{" "}
          <span className="font-medium text-foreground">
            {selectedLocation ?? "No location selected"}
          </span>
        </span>
      </div>
    </section>
  );
}
