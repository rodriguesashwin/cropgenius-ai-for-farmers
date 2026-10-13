import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BellRing, ChevronRight, Sprout } from "lucide-react";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { CurrentWeatherCard } from "@/components/weather/CurrentWeatherCard";
import { FarmingRecommendationCard } from "@/components/weather/FarmingRecommendationCard";
import { RainfallOutlook } from "@/components/weather/RainfallOutlook";
import { SevenDayForecast } from "@/components/weather/SevenDayForecast";
import { TemperatureChart } from "@/components/weather/TemperatureChart";
import { WeatherAlertCard } from "@/components/weather/WeatherAlertCard";
import { WeatherEmptyState } from "@/components/weather/WeatherEmptyState";
import { WeatherErrorState } from "@/components/weather/WeatherErrorState";
import { WeatherLoadingState } from "@/components/weather/WeatherLoadingState";
import { WeatherLocationSearch } from "@/components/weather/WeatherLocationSearch";
import {
  alertTemplates,
  recommendationTemplates,
  type WeatherData,
  type WeatherStage,
} from "@/data/weather";

const title = "Smart Weather Forecast | CropGenius";
const description =
  "Stay informed about upcoming weather conditions and plan your farming activities with confidence.";

export const Route = createFileRoute("/weather")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WeatherPage,
});

function WeatherPage() {
  const [stage, setStage] = useState<WeatherStage>("empty");
  const [location, setLocation] = useState<string | null>(null);
  const [data, setData] = useState<WeatherData | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  /**
   * Future API integration point:
   *   GET /api/weather?location=... (or ?latitude=..&longitude=..)
   * No weather values are produced here. Until the API is connected, this flow reports that data is unavailable rather than displaying empty forecast cards as if they were real.
   */
  function requestWeather(next: string) {
    if (timer.current) clearTimeout(timer.current);
    setLocation(next);
    setData(null);
    setStage("loading");
    timer.current = setTimeout(() => setStage("error"), 300);
  }

  function changeLocation() {
    if (timer.current) clearTimeout(timer.current);
    setLocation(null);
    setData(null);
    setStage("empty");
  }

  const current = data?.current ?? null;
  const forecast = data?.forecast ?? [];
  const hasWeatherData = Boolean(data);

  return (
    <DashboardShell title="Weather Forecast">
      <div className="animate-rise space-y-6">
        <header className="space-y-2">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1 text-xs text-muted-foreground">
              <li>
                <Link to="/dashboard" className="transition-colors hover:text-primary">
                  Dashboard
                </Link>
              </li>
              <ChevronRight className="size-3.5" aria-hidden="true" />
              <li className="font-medium text-foreground">Weather Forecast</li>
            </ol>
          </nav>
          <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
            Smart Weather Forecast
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{description}</p>
        </header>

        <WeatherLocationSearch
          selectedLocation={location}
          onSearch={requestWeather}
          onUseMyLocation={() => requestWeather("My current location")}
          busy={stage === "loading"}
        />

        {stage === "empty" && <WeatherEmptyState />}
        {stage === "loading" && <WeatherLoadingState />}
        {stage === "error" && (
          <WeatherErrorState
            onRetry={() => location && requestWeather(location)}
            onChangeLocation={changeLocation}
          />
        )}

        {stage === "success" && (
          <div className="space-y-6">
            <CurrentWeatherCard location={location} current={current} />

            <div className="grid gap-6 lg:grid-cols-2">
              <TemperatureChart forecast={forecast} />
              <RainfallOutlook current={current} forecast={forecast} />
            </div>

            <SevenDayForecast forecast={forecast} />

            <section className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] sm:p-6">
              <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BellRing className="size-4" aria-hidden="true" />
                </span>
                Smart Farming Alerts
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {hasWeatherData
                  ? "Alerts relevant to the selected location."
                  : "No significant weather alerts for the selected location."}
              </p>
              <p className="mt-4 text-xs font-medium tracking-[0.08em] text-muted-foreground uppercase">
                Alert templates
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {alertTemplates.map((alert, i) => (
                  <WeatherAlertCard key={alert.id} alert={alert} delay={i * 70} />
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-muted/30 p-5 sm:p-6">
              <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Sprout className="size-4" aria-hidden="true" />
                </span>
                Weather-Based Farming Recommendations
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Guidance templates — specific recommendations appear once weather data is connected.
              </p>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {recommendationTemplates.map((r, i) => (
                  <FarmingRecommendationCard
                    key={r.id}
                    title={r.title}
                    text={r.text}
                    delay={i * 70}
                  />
                ))}
              </div>
            </section>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setStage("error")}
                className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                Preview error state
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
