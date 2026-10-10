import { AlertTriangle, FileSearch, Loader2, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

export function SchemeLoadingState({ label = "Loading government schemes..." }: { label?: string }) {
  return <div role="status" aria-live="polite" className="rounded-xl border border-border bg-card px-5 py-8 text-center shadow-[var(--shadow-card)]">
    <Loader2 className="mx-auto size-6 animate-spin text-primary" aria-hidden="true" />
    <p className="mt-3 font-medium">{label}</p>
  </div>;
}

export function SchemeErrorState({ onRetry }: { onRetry: () => void }) {
  return <div role="alert" className="rounded-xl border border-destructive/30 bg-destructive/5 px-5 py-8 text-center">
    <AlertTriangle className="mx-auto size-6 text-destructive" aria-hidden="true" />
    <p className="mt-3 font-medium">We couldn&apos;t load the schemes. Please try again.</p>
    <Button type="button" variant="outline" onClick={onRetry} className="mt-4 min-h-10"><RefreshCw aria-hidden="true" />Try again</Button>
  </div>;
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return <div className="rounded-xl border border-dashed border-border bg-muted/20 px-5 py-9 text-center">
    <span className="mx-auto flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary"><FileSearch className="size-5" aria-hidden="true" /></span>
    <h3 className="mt-3 font-display font-semibold">{title}</h3>
    <p className="mx-auto mt-1 max-w-lg text-sm leading-relaxed text-muted-foreground">{description}</p>
  </div>;
}