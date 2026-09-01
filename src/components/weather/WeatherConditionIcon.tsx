import {
  Cloud,
  CloudDrizzle,
  CloudLightning,
  CloudRain,
  CloudSun,
  Sun,
  Wind,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

export function iconForCondition(condition?: string | null): LucideIcon {
  const c = (condition ?? "").toLowerCase();
  if (!c) return CloudSun;
  if (c.includes("thunder") || c.includes("storm")) return CloudLightning;
  if (c.includes("drizzle")) return CloudDrizzle;
  if (c.includes("rain") || c.includes("shower")) return CloudRain;
  if (c.includes("wind")) return Wind;
  if (c.includes("cloud") || c.includes("overcast")) return Cloud;
  if (c.includes("clear") || c.includes("sun")) return Sun;
  return CloudSun;
}

export function WeatherConditionIcon({
  condition,
  className,
}: {
  condition?: string | null;
  className?: string;
}) {
  const Icon = iconForCondition(condition);
  return <Icon className={cn("size-6", className)} aria-hidden="true" />;
}
