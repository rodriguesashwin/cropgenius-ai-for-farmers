import { ShieldCheck } from "lucide-react";

export function PreventionCard({ prevention }: { prevention: string }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5">
      <h4 className="flex items-center gap-2 font-display text-base font-semibold text-foreground">
        <span className="flex size-8 items-center justify-center rounded-lg bg-accent/15 text-accent-foreground">
          <ShieldCheck className="size-4" aria-hidden="true" />
        </span>
        Prevention Tips
      </h4>
      <p className="mt-3 text-sm leading-relaxed whitespace-pre-line text-muted-foreground">
        {prevention}
      </p>
    </section>
  );
}
