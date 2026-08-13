import { challenges } from "@/data/landing";
import { SectionHeading } from "./SectionHeading";

export function WhyCropGenius() {
  return (
    <section id="about" className="py-20 sm:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Why CropGenius"
          title="Smart Decisions. Better Farming."
          description="Indian farmers manage several uncertainties at once. CropGenius aims to bring the information behind those decisions into one place."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {challenges.map((item) => (
            <article key={item.title} className="surface-card p-6">
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <item.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}