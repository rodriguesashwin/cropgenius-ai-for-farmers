import { Check, Lightbulb } from "lucide-react";

import { uploadTips } from "@/data/disease-detection";

export function UploadTips() {
  return (
    <section className="rounded-2xl border border-border bg-card p-5">
      <h3 className="flex items-center gap-2 font-display text-base font-semibold text-foreground">
        <span className="flex size-8 items-center justify-center rounded-lg bg-accent/15 text-accent-foreground">
          <Lightbulb className="size-4" aria-hidden="true" />
        </span>
        Tips for a Better Analysis
      </h3>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {uploadTips.map((tip) => (
          <li key={tip} className="flex items-start gap-2 text-sm text-muted-foreground">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            {tip}
          </li>
        ))}
      </ul>
    </section>
  );
}
