import { createFileRoute } from "@tanstack/react-router";

import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { ImpactStrip } from "@/components/landing/ImpactStrip";
import { Features } from "@/components/landing/Features";
import { FarmerBenefits } from "@/components/landing/FarmerBenefits";
import { SupportedCrops } from "@/components/landing/SupportedCrops";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

const title = "CropGenius | AI-Powered Smart Agriculture for Indian Farmers";
const description =
  "CropGenius brings agricultural guidance, crop health insights, weather information and market awareness together in one premium platform for Indian farmers.";

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
        <ImpactStrip />
        <Features />
        <FarmerBenefits />
        <SupportedCrops />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
