import { LineChart as LineChartIcon } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { WeatherForecastDay } from "@/data/weather";

export function TemperatureChart({ forecast }: { forecast?: WeatherForecastDay[] | undefined }) {
  const data = (forecast ?? []).map((d) => ({
    label: d.day ?? d.date,
    temperature: d.temperature,
  }));

  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] sm:p-6">
      <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
        <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <LineChartIcon className="size-4" aria-hidden="true" />
        </span>
        Temperature Trend
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Daily temperature (°C) across the forecast period.
      </p>

      {data.length === 0 ? (
        <p className="mt-4 rounded-xl border border-dashed border-border bg-muted/30 px-4 py-10 text-center text-sm text-muted-foreground">
          The temperature trend will be plotted here once weather data is available.
        </p>
      ) : (
        <div className="animate-rise mt-5 h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8, right: 12, bottom: 4, left: -12 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
              />
              <YAxis
                unit="°"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "0.75rem",
                  border: "1px solid var(--color-border)",
                  backgroundColor: "var(--color-card)",
                  color: "var(--color-foreground)",
                }}
                formatter={(value) => [`${value}°C`, "Temperature"]}
              />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="var(--color-primary)"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "var(--color-primary)" }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}
