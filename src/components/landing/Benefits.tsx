import { Check } from "lucide-react";

import { benefits } from "@/data/landing";
import { SectionHeading } from "./SectionHeading";

export function Benefits() {
  return (
    <section id="schemes" className="bg-secondary/40 py-20 sm:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Farmer Benefits &amp; Welfare"
          title="What Farmers Gain from CropGenius"
          description="Alongside crop intelligence, CropGenius is planned to surface government scheme, subsidy and cooperative welfare information in one place."
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <li key={benefit} className="surface-card flex items-center gap-3 p-5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Check className="size-4" aria-hidden="true" />
              </span>
              <span className="text-sm font-medium text-foreground">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}