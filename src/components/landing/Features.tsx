import { ArrowRight } from "lucide-react";

import { features } from "@/data/landing";
import { SectionHeading } from "./SectionHeading";

export function Features() {
  return (
    <section id="features" className="bg-secondary/40 py-20 sm:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Core Features"
          title="One Platform for Agricultural Intelligence"
          description="Modular services planned for CropGenius, each designed to support a specific farming decision."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="group surface-card flex flex-col p-6">
              <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Learn More
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}