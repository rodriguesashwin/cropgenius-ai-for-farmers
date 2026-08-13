import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-farmer.jpg";

export function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[calc(100svh-4.5rem)] items-center overflow-hidden"
    >
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

      <div className="section-shell py-24 sm:py-28">
        <div className="max-w-3xl">
          <span
            className="animate-rise inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-3.5 py-1.5 text-xs font-semibold tracking-[0.08em] text-primary-foreground uppercase backdrop-blur"
            style={{ animationDelay: "80ms" }}
          >
            <Sparkles className="size-3.5" aria-hidden="true" />
            Smart Agriculture &amp; Farmer Welfare
          </span>
          <h1
            className="animate-rise mt-6 text-4xl leading-[1.05] font-semibold text-primary-foreground sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "200ms" }}
          >
            Empowering Farmers with{" "}
            <span className="highlight-word">Artificial Intelligence</span>
          </h1>
          <p
            className="animate-rise mt-7 max-w-xl text-base leading-relaxed text-primary-foreground/85 sm:text-lg"
            style={{ animationDelay: "340ms" }}
          >
            CropGenius brings intelligent agricultural guidance, crop health insights, weather
            information and market awareness together in one platform.
          </p>
          <div
            className="animate-rise mt-10 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "460ms" }}
          >
            <Button size="lg" asChild className="group">
              <a href="#features">
                Explore CropGenius
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/40 bg-primary-foreground/10 text-primary-foreground backdrop-blur hover:bg-primary-foreground/20 hover:text-primary-foreground"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}