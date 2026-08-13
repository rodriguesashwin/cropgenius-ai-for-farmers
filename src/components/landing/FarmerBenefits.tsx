import { Check } from "lucide-react";

import { benefits } from "@/data/landing";
import { useInView } from "@/hooks/use-in-view";
import benefitsImage from "@/assets/benefits-farmer.jpg";

export function FarmerBenefits() {
  const { ref, inView } = useInView<HTMLUListElement>(0.2);

  return (
    <section id="benefits" className="py-20 sm:py-24">
      <div className="section-shell grid items-center gap-12 lg:grid-cols-2">
        <img
          src={benefitsImage}
          alt="Indian farmer inspecting healthy crop leaves in a green field at golden hour"
          loading="lazy"
          width={1024}
          height={1280}
          className="aspect-4/5 w-full rounded-3xl object-cover shadow-[var(--shadow-lift)]"
        />

        <div>
          <span className="eyebrow">Farmer Benefits</span>
          <h2 className="mt-5 text-3xl font-semibold text-foreground sm:text-4xl">
            Make Better Decisions. Farm with Confidence.
          </h2>

          <ul ref={ref} className="mt-8 space-y-4">
            {benefits.map((benefit, index) => (
              <li
                key={benefit}
                className={
                  inView ? "animate-rise flex items-center gap-3" : "flex items-center gap-3 opacity-0"
                }
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="size-4" aria-hidden="true" />
                </span>
                <span className="text-base font-medium text-foreground">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}