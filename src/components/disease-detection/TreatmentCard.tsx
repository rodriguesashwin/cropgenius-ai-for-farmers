import { Stethoscope } from "lucide-react";

export function TreatmentCard({ treatment }: { treatment: string }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5">
      <h4 className="flex items-center gap-2 font-display text-base font-semibold text-foreground">
        <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Stethoscope className="size-4" aria-hidden="true" />
        </span>
        Recommended Treatment
      </h4>
      <p className="mt-3 text-sm leading-relaxed whitespace-pre-line text-muted-foreground">
        {treatment}
      </p>
    </section>
  );
}
