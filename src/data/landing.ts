import {
  Bug,
  CloudSun,
  LineChart,
  Landmark,
  MessageSquareText,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

import rice from "@/assets/crops/rice.jpg";
import wheat from "@/assets/crops/wheat.jpg";
import maize from "@/assets/crops/maize.jpg";
import tomato from "@/assets/crops/tomato.jpg";
import potato from "@/assets/crops/potato.jpg";
import onion from "@/assets/crops/onion.jpg";
import soybean from "@/assets/crops/soybean.jpg";
import groundnut from "@/assets/crops/groundnut.jpg";
import coconut from "@/assets/crops/coconut.jpg";
import arecanut from "@/assets/crops/arecanut.jpg";

export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Benefits", href: "#benefits" },
  { label: "Crops", href: "#crops" },
];

export const impactStats = [
  { value: 10, label: "Major Crops", prefix: "", suffix: "" },
  { value: 12, label: "Targeted Diseases", prefix: "", suffix: "" },
  { value: 7, label: "Weather Forecast", prefix: "", suffix: "-Day" },
  { value: 1, label: "Unified Platform", prefix: "", suffix: "" },
] satisfies { value: number; label: string; prefix: string; suffix: string }[];

export const features = [
  {
    title: "Disease Detection",
    description: "Identify crop disease from a leaf image.",
    icon: Bug,
  },
  {
    title: "Price Prediction",
    description: "Estimate upcoming crop prices.",
    icon: TrendingUp,
  },
  {
    title: "Weather Forecast",
    description: "Field-level forecasts and alerts.",
    icon: CloudSun,
  },
  {
    title: "Market Insights",
    description: "Track mandi rates and trends.",
    icon: LineChart,
  },
  {
    title: "Government Schemes",
    description: "Find subsidies and welfare support.",
    icon: Landmark,
  },
  {
    title: "AI Farmer Assistant",
    description: "Ask farming questions, get answers.",
    icon: MessageSquareText,
  },
] satisfies { title: string; description: string; icon: LucideIcon }[];

export type Crop = {
  name: string;
  description: string;
  image: string;
  regional?: boolean;
};

export const crops: Crop[] = [
  { name: "Rice", description: "Kharif staple grown across irrigated and rain-fed regions.", image: rice },
  { name: "Wheat", description: "Major rabi cereal sensitive to late-season heat.", image: wheat },
  { name: "Maize", description: "Versatile crop used for food, feed and industry.", image: maize },
  { name: "Tomato", description: "High-value vegetable with volatile market rates.", image: tomato },
  { name: "Potato", description: "Tuber crop needing careful storage and blight watch.", image: potato },
  { name: "Onion", description: "Key commercial crop with sharp seasonal price swings.", image: onion },
  { name: "Soybean", description: "Important oilseed and protein crop of central India.", image: soybean },
  { name: "Groundnut", description: "Oilseed crop grown widely in dryland areas.", image: groundnut },
  {
    name: "Coconut",
    description: "Perennial plantation crop with year-round harvesting cycles.",
    image: coconut,
    regional: true,
  },
  {
    name: "Arecanut",
    description: "Plantation crop central to many Karnataka farming households.",
    image: arecanut,
    regional: true,
  },
];

export const benefits = [
  "Early disease awareness",
  "Better market awareness",
  "Weather awareness",
  "Government welfare access",
  "Agricultural guidance",
];

export const footerNav = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Benefits", href: "#benefits" },
  { label: "Crops", href: "#crops" },
];

export const footerServices = [
  "Disease Detection",
  "Price Prediction",
  "Weather",
  "Market",
  "AI Assistant",
];