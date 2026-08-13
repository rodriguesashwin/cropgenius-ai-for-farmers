import { workflowSteps } from "@/data/landing";
import { SectionHeading } from "./SectionHeading";

export function HowItWorks() {
  return (
    <section className="bg-secondary/40 py-20 sm:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="How It Works"
          title="How CropGenius Works"
          description="A straightforward flow from farmer input to an informed farming decision."
        />

        <ol className="relative mt-14 grid gap-8 lg:grid-cols-4 lg:gap-6">
          <span
            className="absolute top-6 right-6 left-6 hidden h-px bg-border lg:block"
            aria-hidden="true"
          />
          {workflowSteps.map((step) => (
            <li key={step.step} className="relative">
              <span className="gradient-field relative z-10 flex size-12 items-center justify-center rounded-2xl font-display text-sm font-semibold text-primary-foreground">
                {step.step}
              </span>
              <h3 className="mt-5 text-base font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}