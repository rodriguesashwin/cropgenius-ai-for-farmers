import { MapPin } from "lucide-react";

import { WeatherConditionIcon } from "@/components/weather/WeatherConditionIcon";
import { WeatherStats } from "@/components/weather/WeatherStats";
import { PLACEHOLDER, type WeatherCurrent } from "@/data/weather";

export function CurrentWeatherCard({
  location,
  current,
}: {
  location: string | null;
  current?: WeatherCurrent | null | undefined;
}) {
  return (
    <section className="animate-rise rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground">Current Weather</h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-3.5" aria-hidden="true" />
            {location ?? "No location selected"}
          </p>
        </div>
        <span className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
          Values shown once the weather service is connected
        </span>
      </div>

      <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
        <span className="gradient-field flex size-20 shrink-0 items-center justify-center rounded-2xl text-primary-foreground">
          <WeatherConditionIcon condition={current?.condition} className="size-10" />
        </span>
        <div>
          <p className="font-display text-4xl leading-none font-semibold text-foreground sm:text-5xl">
            {current ? `${current.temperature}°C` : `${PLACEHOLDER}°C`}
          </p>
          <p className="mt-2 text-sm font-medium text-muted-foreground">
            {current?.condition ?? "[Condition from API]"}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <WeatherStats current={current} />
      </div>
    </section>
  );
}
