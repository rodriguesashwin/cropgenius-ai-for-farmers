import {
  Bug,
  CloudSun,
  LineChart,
  Landmark,
  MessageSquareText,
  TrendingUp,
  Leaf,
  Droplets,
  IndianRupee,
  FileQuestion,
  HelpCircle,
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
  { label: "Crops", href: "#crops" },
  { label: "Government Schemes", href: "#schemes" },
  { label: "About", href: "#about" },
];

export const trustPoints = [
  { title: "AI-Powered", icon: Leaf },
  { title: "Smart Farming", icon: TrendingUp },
  { title: "Farmer Welfare", icon: Landmark },
  { title: "Data-Driven Decisions", icon: LineChart },
] satisfies { title: string; icon: LucideIcon }[];

export const challenges = [
  {
    title: "Crop Diseases",
    description:
      "Diseases are often noticed late, which makes treatment harder and reduces yield.",
    icon: Bug,
  },
  {
    title: "Changing Weather",
    description:
      "Unpredictable rainfall and temperature shifts make planning sowing and irrigation difficult.",
    icon: Droplets,
  },
  {
    title: "Fluctuating Prices",
    description:
      "Market rates change frequently, making it hard to decide when and where to sell.",
    icon: IndianRupee,
  },
  {
    title: "Scheme Awareness",
    description:
      "Many agricultural schemes and subsidies remain unknown to the farmers they are meant for.",
    icon: FileQuestion,
  },
  {
    title: "Access to Guidance",
    description:
      "Reliable agronomic advice is not always available when a farming decision has to be made.",
    icon: HelpCircle,
  },
] satisfies { title: string; description: string; icon: LucideIcon }[];

export const features = [
  {
    title: "AI Crop Disease Detection",
    description:
      "Upload a crop leaf image and receive disease identification, treatment recommendations and prevention guidance.",
    icon: Bug,
  },
  {
    title: "AI Crop Price Prediction",
    description:
      "Use agricultural market data and machine learning to estimate future crop prices.",
    icon: TrendingUp,
  },
  {
    title: "Smart Weather Forecasting",
    description:
      "Access current weather information, forecasts and farming-related alerts.",
    icon: CloudSun,
  },
  {
    title: "Agricultural Market Analysis",
    description: "Monitor crop prices, historical trends and market information.",
    icon: LineChart,
  },
  {
    title: "Government Schemes",
    description:
      "Discover agricultural schemes, subsidies, eligibility information and farmer welfare support.",
    icon: Landmark,
  },
  {
    title: "AI Farmer Assistant",
    description:
      "Get agricultural guidance and answers to farming-related questions through an AI-powered assistant.",
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

export const workflowSteps = [
  {
    step: "01",
    title: "Farmer Provides Information",
    description: "Crop details, location and a leaf image or question are submitted.",
  },
  {
    step: "02",
    title: "CropGenius Analyzes Data",
    description: "Inputs are combined with weather, market and scheme data sources.",
  },
  {
    step: "03",
    title: "AI and Agricultural Services Generate Insights",
    description: "Models and services process the data into clear agricultural guidance.",
  },
  {
    step: "04",
    title: "Farmer Makes Better Decisions",
    description: "Recommendations support decisions on treatment, timing and selling.",
  },
];

export const technologies = [
  "TensorFlow",
  "OpenCV",
  "Scikit-learn",
  "Machine Learning",
  "Deep Learning",
  "Weather APIs",
  "Agricultural Market Data",
];

export const benefits = [
  "Early disease identification",
  "Better agricultural decision-making",
  "Market awareness",
  "Weather awareness",
  "Access to welfare information",
  "Improved farming guidance",
];

export const footerNav = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Crops", href: "#crops" },
  { label: "Schemes", href: "#schemes" },
  { label: "About", href: "#about" },
];

export const footerServices = [
  "Disease Detection",
  "Price Prediction",
  "Weather",
  "Market",
  "AI Assistant",
];