import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import ctaImage from "@/assets/cta-field.jpg";

export function FinalCTA() {
  return (
    <section className="pb-20 sm:pb-24">
      <div className="section-shell">
        <div className="relative isolate overflow-hidden rounded-4xl px-6 py-20 text-center sm:px-12 sm:py-24">
          <img
            src={ctaImage}
            alt="Green Indian farmland at sunset"
            loading="lazy"
            width={1920}
            height={1088}
            className="absolute inset-0 -z-20 size-full object-cover"
          />
          <div
            className="absolute inset-0 -z-10"
            style={{ background: "var(--overlay-cta)" }}
            aria-hidden="true"
          />
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold text-primary-foreground sm:text-5xl">
            Smarter Farming Starts Here.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/85">
            Bring agricultural intelligence and farmer welfare services together with CropGenius.
          </p>
          <div className="mt-9 flex justify-center">
            <Button size="lg" variant="secondary" className="group bg-card text-primary hover:bg-card/90">
              Get Started
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}