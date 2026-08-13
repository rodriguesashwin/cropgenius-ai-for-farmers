import { trustPoints } from "@/data/landing";

export function TrustStrip() {
  return (
    <section className="border-y border-border bg-secondary/60">
      <div className="section-shell grid grid-cols-2 gap-4 py-8 sm:py-10 lg:grid-cols-4">
        {trustPoints.map((point) => (
          <div key={point.title} className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <point.icon className="size-5" aria-hidden="true" />
            </span>
            <p className="text-sm font-semibold text-foreground sm:text-base">{point.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}