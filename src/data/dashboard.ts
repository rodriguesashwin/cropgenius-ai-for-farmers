import {
  Bot,
  CloudSun,
  Handshake,
  LayoutDashboard,
  Leaf,
  LineChart,
  Landmark,
  Settings,
  TrendingUp,
  User,
  type LucideIcon,
} from "lucide-react";

export type DashboardRoute =
  | "/dashboard"
  | "/disease-detection"
  | "/price-prediction"
  | "/weather"
  | "/market"
  | "/schemes"
  | "/cooperative"
  | "/assistant"
  | "/profile"
  | "/settings";

export type DashboardNavItem = {
  label: string;
  to: DashboardRoute;
  icon: LucideIcon;
};

export const primaryNav: DashboardNavItem[] = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Disease Detection", to: "/disease-detection", icon: Leaf },
  { label: "Price Prediction", to: "/price-prediction", icon: TrendingUp },
  { label: "Weather", to: "/weather", icon: CloudSun },
  { label: "Market Insights", to: "/market", icon: LineChart },
  { label: "Government Schemes", to: "/schemes", icon: Landmark },
  { label: "Cooperative Services", to: "/cooperative", icon: Handshake },
  { label: "AI Farmer Assistant", to: "/assistant", icon: Bot },
];

export const secondaryNav: DashboardNavItem[] = [
  { label: "Profile", to: "/profile", icon: User },
  { label: "Settings", to: "/settings", icon: Settings },
];

export const quickAccess: {
  title: string;
  description: string;
  to: DashboardRoute;
  icon: LucideIcon;
}[] = [
  {
    title: "Disease Detection",
    description: "Analyze crop health from leaf images.",
    to: "/disease-detection",
    icon: Leaf,
  },
  {
    title: "Price Prediction",
    description: "Estimate future crop prices.",
    to: "/price-prediction",
    icon: TrendingUp,
  },
  {
    title: "Weather",
    description: "Check weather conditions and forecasts.",
    to: "/weather",
    icon: CloudSun,
  },
  {
    title: "Market Insights",
    description: "Explore agricultural market information.",
    to: "/market",
    icon: LineChart,
  },
  {
    title: "Government Schemes",
    description: "Find agricultural schemes and subsidies.",
    to: "/schemes",
    icon: Landmark,
  },
  {
    title: "AI Farmer Assistant",
    description: "Get agricultural guidance and answers.",
    to: "/assistant",
    icon: Bot,
  },
];

export const featurePages: Record<
  string,
  { title: string; description: string; icon: LucideIcon }
> = {
  "/disease-detection": {
    title: "Disease Detection",
    description: "Upload a leaf image to analyze crop health and identify possible diseases.",
    icon: Leaf,
  },
  "/price-prediction": {
    title: "Price Prediction",
    description: "Estimate future crop prices to plan your selling decisions.",
    icon: TrendingUp,
  },
  "/weather": {
    title: "Weather",
    description: "Check local weather conditions and forecasts for your farm.",
    icon: CloudSun,
  },
  "/market": {
    title: "Market Insights",
    description: "Explore agricultural market information and demand trends.",
    icon: LineChart,
  },
  "/schemes": {
    title: "Government Schemes",
    description: "Find agricultural schemes, subsidies and eligibility details.",
    icon: Landmark,
  },
  "/cooperative": {
    title: "Cooperative Services",
    description: "Discover cooperative societies and shared farming services.",
    icon: Handshake,
  },
  "/assistant": {
    title: "AI Farmer Assistant",
    description: "Ask questions about crops, diseases, weather and agricultural services.",
    icon: Bot,
  },
};
