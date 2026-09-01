import { CloudRain, Droplets, TrendingUp } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { PLACEHOLDER, type WeatherCurrent, type WeatherForecastDay } from "@/data/weather";

export function RainfallOutlook({
  current,
  forecast,
}: {
  current?: WeatherCurrent | null | undefined;
  forecast?: WeatherForecastDay[] | undefined;
}) {
  const days = forecast ?? [];
  const probability = days.length > 0 ? Math.round(days[0]!.rainProbability) : null;
  const expected = current ? `${current.rainfall} mm` : `${PLACEHOLDER} mm`;

  const trend =
    days.length > 1
      ? days[days.length - 1]!.rainProbability > days[0]!.rainProbability
        ? "Increasing chance of rain later in the period"
        : "Decreasing chance of rain later in the period"
      : null;

  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] sm:p-6">
      <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
        <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <CloudRain className="size-4" aria-hidden="true" />
        </span>
        Rainfall Outlook
      </h3>

      <div className="mt-4 space-y-4">
        <div>
          <div className="flex items-baseline justify-between text-sm">
            <span className="text-muted-foreground">Rain probability</span>
            <span className="font-display font-semibold text-foreground">
              {probability === null ? `${PLACEHOLDER}%` : `${probability}%`}
            </span>
          </div>
          <Progress value={probability ?? 0} className="mt-2 h-2" />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-muted/30 p-3">
            <p className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Droplets className="size-4 text-primary" aria-hidden="true" />
              Expected rainfall
            </p>
            <p className="mt-1.5 font-display text-lg font-semibold text-foreground">{expected}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted/30 p-3">
            <p className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <TrendingUp className="size-4 text-primary" aria-hidden="true" />
              Rainfall trend
            </p>
            <p className="mt-1.5 text-sm font-medium text-foreground">
              {trend ?? "Trend will appear with forecast data"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
