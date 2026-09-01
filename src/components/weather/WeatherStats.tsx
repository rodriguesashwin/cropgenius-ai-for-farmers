import { Droplets, Gauge, Thermometer, Wind } from "lucide-react";

import { PLACEHOLDER, type WeatherCurrent } from "@/data/weather";

export function WeatherStats({ current }: { current?: WeatherCurrent | null }) {
  const stats = [
    {
      label: "Humidity",
      value: current ? `${current.humidity}%` : `${PLACEHOLDER}%`,
      icon: Droplets,
    },
    {
      label: "Wind Speed",
      value: current ? `${current.windSpeed} km/h` : `${PLACEHOLDER} km/h`,
      icon: Wind,
    },
    {
      label: "Rainfall",
      value: current ? `${current.rainfall} mm` : `${PLACEHOLDER} mm`,
      icon: Gauge,
    },
    {
      label: "Feels Like",
      value: current ? `${current.feelsLike}°C` : `${PLACEHOLDER}°C`,
      icon: Thermometer,
    },
  ];

  return (
    <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map(({ label, value, icon: Icon }) => (
        <div key={label} className="rounded-xl border border-border bg-muted/30 p-3">
          <dt className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Icon className="size-4 text-primary" aria-hidden="true" />
            {label}
          </dt>
          <dd className="mt-1.5 font-display text-lg font-semibold text-foreground">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
