import { ArrowRight, CloudSun, ScanLine, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-farmer.jpg";

const floatingCards = [
  { icon: ScanLine, label: "Disease Detection", hint: "Leaf image analysis" },
  { icon: CloudSun, label: "Weather Insights", hint: "Field-level forecasts" },
];

export function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden">
      <img
        src={heroImage}
        alt="Indian farmer reviewing crop data on a tablet in a green paddy field"
        width={1920}
        height={1088}
        className="absolute inset-0 -z-20 size-full object-cover"
      />
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-hero)" }}
        aria-hidden="true"
      />

      <div className="section-shell grid gap-12 py-24 sm:py-32 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-40">
        <div className="animate-rise max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-3.5 py-1.5 text-xs font-semibold tracking-[0.08em] text-primary-foreground uppercase backdrop-blur">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Smart Agriculture &amp; Farmer Welfare
          </span>
          <h1 className="mt-6 text-4xl leading-[1.08] font-semibold text-primary-foreground sm:text-5xl lg:text-6xl">
            Empowering Farmers with Artificial Intelligence
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/85 sm:text-lg">
            CropGenius brings intelligent crop guidance, disease detection, market insights,
            weather information and farmer welfare services together in one platform.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button size="lg" className="group">
              Get Started
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-primary-foreground/40 bg-primary-foreground/10 text-primary-foreground backdrop-blur hover:bg-primary-foreground/20 hover:text-primary-foreground"
            >
              <a href="#features">Explore Features</a>
            </Button>
          </div>
        </div>

        <div className="hidden lg:flex lg:justify-end">
          <div className="flex w-full max-w-sm flex-col gap-4">
            {floatingCards.map((card, index) => (
              <div
                key={card.label}
                className="animate-rise rounded-2xl border border-primary-foreground/25 bg-primary-foreground/10 p-5 backdrop-blur-md"
                style={{ animationDelay: `${200 + index * 140}ms` }}
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-primary-foreground/15 text-primary-foreground">
                    <card.icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-primary-foreground">{card.label}</p>
                    <p className="text-xs text-primary-foreground/75">{card.hint}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}