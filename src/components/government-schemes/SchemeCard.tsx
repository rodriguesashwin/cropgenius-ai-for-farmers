import { ArrowUpRight, FileText, MapPin, Sprout } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { SchemeMatch, GovernmentScheme } from "@/data/government-schemes";

export function SchemeCard({ scheme, onDetails, match }: {
  scheme: GovernmentScheme;
  onDetails: (scheme: GovernmentScheme) => void;
  match?: SchemeMatch;
}) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-[border-color,box-shadow] hover:border-primary/30 hover:shadow-[var(--shadow-lift)]">
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><Sprout className="size-5" aria-hidden="true" /></span>
        <Badge variant="secondary" className="max-w-[70%] whitespace-normal text-right">{scheme.category}</Badge>
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold leading-snug">{scheme.name}</h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{scheme.description}</p>
      {match ? <div className="mt-4 rounded-lg bg-secondary/70 p-3">
        <p className="text-xs font-semibold text-foreground">Why it may be relevant</p>
        <ul className="mt-1 space-y-1 text-sm text-muted-foreground">{match.reasons.map((reason) => <li key={reason}>{reason}</li>)}</ul>
      </div> : <div className="mt-4 space-y-2 text-sm">
        <p className="flex items-start gap-2 text-muted-foreground"><FileText className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" /><span><span className="font-medium text-foreground">Key benefit:</span> {scheme.benefits.length ? scheme.benefits.join(" · ") : "See the scheme details."}</span></p>
        <p className="flex items-start gap-2 text-muted-foreground"><MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" /><span>{scheme.state ?? "Coverage not specified"}</span></p>
      </div>}
      <div className="mt-auto pt-5"><Button variant="outline" className="min-h-10 w-full" onClick={() => onDetails(scheme)}>View details<ArrowUpRight aria-hidden="true" /></Button></div>
    </article>
  );
}