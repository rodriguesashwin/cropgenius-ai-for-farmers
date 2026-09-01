import {
  CloudRain,
  Droplets,
  Sun,
  Wind,
  type LucideIcon,
} from "lucide-react";

/**
 * Shape the future `GET /api/weather` (params: location | latitude & longitude)
 * response must match. Nothing here is real weather data.
 */
export type WeatherCurrent = {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  rainfall: number;
  feelsLike: number;
};

export type WeatherForecastDay = {
  date: string;
  day?: string;
  condition: string;
  temperature: number;
  rainProbability: number;
};

export type WeatherResponse = {
  success: boolean;
  location: string;
  current: WeatherCurrent;
  forecast: WeatherForecastDay[];
};

export type WeatherData = {
  location: string;
  current: WeatherCurrent;
  forecast: WeatherForecastDay[];
};

export function mapWeatherResponse(res: WeatherResponse): WeatherData {
  return {
    location: res.location,
    current: res.current,
    forecast: res.forecast ?? [],
  };
}

export type WeatherStage = "empty" | "loading" | "success" | "error";

export const PLACEHOLDER = "--";

export type AlertTemplate = {
  id: string;
  emoji: string;
  title: string;
  message: string;
  icon: LucideIcon;
};

/** UI templates only — never shown as active alerts without real weather data. */
export const alertTemplates: AlertTemplate[] = [
  {
    id: "rain",
    emoji: "🌧️",
    title: "Heavy Rain Alert",
    message: "Heavy rainfall may affect field activities.",
    icon: CloudRain,
  },
  {
    id: "heat",
    emoji: "☀️",
    title: "High Temperature Alert",
    message: "High temperatures may increase crop water requirements.",
    icon: Sun,
  },
  {
    id: "wind",
    emoji: "💨",
    title: "Strong Wind Alert",
    message: "Strong winds may affect crops and agricultural operations.",
    icon: Wind,
  },
  {
    id: "humidity",
    emoji: "💧",
    title: "Humidity Alert",
    message: "High humidity may increase the risk of certain crop diseases.",
    icon: Droplets,
  },
];

export const recommendationTemplates = [
  {
    id: "irrigation",
    title: "Irrigation planning",
    text: "Consider irrigation based on rainfall conditions.",
  },
  {
    id: "humidity",
    title: "Crop monitoring",
    text: "Monitor crops during periods of high humidity.",
  },
  {
    id: "spraying",
    title: "Spraying window",
    text: "Avoid spraying during heavy rainfall or strong winds.",
  },
];
