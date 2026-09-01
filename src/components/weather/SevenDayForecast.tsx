import { CalendarDays, CloudRain } from "lucide-react";

import { WeatherConditionIcon } from "@/components/weather/WeatherConditionIcon";
import type { WeatherForecastDay } from "@/data/weather";

export function SevenDayForecast({ forecast }: { forecast?: WeatherForecastDay[] | undefined }) {
  const days = forecast ?? [];

  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] sm:p-6">
      <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
        <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <CalendarDays className="size-4" aria-hidden="true" />
        </span>
        7-Day Forecast
      </h3>

      {days.length === 0 ? (
        <p className="mt-4 rounded-xl border border-dashed border-border bg-muted/30 px-4 py-8 text-center text-sm text-muted-foreground">
          Weather forecast will appear here when the weather service is connected.
        </p>
      ) : (
        <ul className="mt-4 -mx-1 flex snap-x gap-3 overflow-x-auto px-1 pb-2 lg:grid lg:grid-cols-7 lg:overflow-visible">
          {days.slice(0, 7).map((d, i) => (
            <li
              key={d.date}
              className="animate-rise min-w-[8.5rem] shrink-0 snap-start rounded-xl border border-border bg-muted/30 p-3 text-center lg:min-w-0"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <p className="text-sm font-semibold text-foreground">{d.day ?? d.date}</p>
              <p className="text-xs text-muted-foreground">{d.date}</p>
              <span className="mt-3 flex justify-center text-primary">
                <WeatherConditionIcon condition={d.condition} className="size-7" />
              </span>
              <p className="mt-3 font-display text-lg font-semibold text-foreground">
                {d.temperature}°C
              </p>
              <p className="mt-1 flex items-center justify-center gap-1 text-xs text-muted-foreground">
                <CloudRain className="size-3.5" aria-hidden="true" />
                {d.rainProbability}%
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
