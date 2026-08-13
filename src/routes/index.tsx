import { createFileRoute } from "@tanstack/react-router";

import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { TrustStrip } from "@/components/landing/TrustStrip";
import { WhyCropGenius } from "@/components/landing/WhyCropGenius";
import { Features } from "@/components/landing/Features";
import { SupportedCrops } from "@/components/landing/SupportedCrops";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { TechnologySection } from "@/components/landing/TechnologySection";
import { Benefits } from "@/components/landing/Benefits";
import { CallToAction } from "@/components/landing/CallToAction";
import { Footer } from "@/components/landing/Footer";

const title = "CropGenius | AI-Powered Smart Agriculture for Indian Farmers";
const description =
  "CropGenius unites crop disease detection, price prediction, weather insights, market analysis and government scheme information for Indian farmers.";

export const Route = createFileRoute("/")({
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
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <WhyCropGenius />
        <Features />
        <SupportedCrops />
        <HowItWorks />
        <TechnologySection />
        <Benefits />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
