import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileText,
  Loader2,
  Minus,
  RefreshCw,
  Search,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { ServiceAvailability, ServiceRequestStatus } from "@/data/cooperative";

export function FieldError({ id, message }: { id: string; message?: string | undefined }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="text-xs font-medium text-destructive">
      {message}
    </p>
  );
}

export function AvailabilityBadge({ availability }: { availability: ServiceAvailability }) {
  const icon =
    availability === "Available" ? CheckCircle2 : availability === "Limited" ? Clock3 : XCircle;
  const Icon = icon;
  return (
    <Badge
      variant="secondary"
      className={cn(
        "gap-1.5",
        availability === "Available" && "bg-primary/10 text-primary",
        availability === "Limited" && "bg-accent/60 text-accent-foreground",
        availability === "Not Available" && "bg-muted text-muted-foreground",
      )}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {availability}
    </Badge>
  );
}

export function StatusBadge({ status }: { status: ServiceRequestStatus }) {
  const isComplete = status === "Completed" || status === "Approved";
  const isNeedsAction = status === "Additional Information Required";
  const isRejected = status === "Rejected";
  return (
    <Badge
      variant="secondary"
      className={cn(
        "gap-1.5",
        isComplete && "bg-primary/10 text-primary",
        isNeedsAction && "bg-accent/70 text-accent-foreground",
        isRejected && "bg-destructive/10 text-destructive",
      )}
    >
      {isComplete ? (
        <CheckCircle2 className="size-3.5" aria-hidden="true" />
      ) : isRejected ? (
        <XCircle className="size-3.5" aria-hidden="true" />
      ) : isNeedsAction ? (
        <AlertTriangle className="size-3.5" aria-hidden="true" />
      ) : (
        <Clock3 className="size-3.5" aria-hidden="true" />
      )}
      {status}
    </Badge>
  );
}

export function SectionHeading({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof FileText;
  title: string;
  description?: string;
}) {
  return (
    <div>
      <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
        <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-4" aria-hidden="true" />
        </span>
        {title}
      </h3>
      {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-muted/30 px-5 py-10 text-center">
      <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Search className="size-6" aria-hidden="true" />
      </span>
      <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{title}</h3>
      <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

export function CooperativeLoadingState() {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] sm:p-6">
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Loader2 className="size-5 animate-spin" aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground">
            Loading cooperative services...
          </h3>
          <p className="text-sm text-muted-foreground">Preparing service cards and request tools.</p>
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border bg-muted/20 p-4">
            <Skeleton className="size-9 rounded-lg" />
            <Skeleton className="mt-4 h-4 w-2/3" />
            <Skeleton className="mt-3 h-3 w-full" />
            <Skeleton className="mt-2 h-3 w-4/5" />
          </div>
        ))}
      </div>
    </section>
  );
}

export function CooperativeErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <section
      role="alert"
      className="rounded-2xl border border-destructive/30 bg-destructive/5 p-8 text-center"
    >
      <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertTriangle className="size-6" aria-hidden="true" />
      </span>
      <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
        We couldn&apos;t load cooperative services. Please try again.
      </h3>
      <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
        Service records will load here once the connection is available.
      </p>
      <Button onClick={onRetry} className="mt-5 min-h-11">
        <RefreshCw className="size-4" aria-hidden="true" />
        Retry
      </Button>
    </section>
  );
}

export function ProgressTimeline({ status }: { status: ServiceRequestStatus }) {
  const steps = ["Submitted", "Under Review", "Decision", "Completed"];
  const activeIndex =
    status === "Submitted"
      ? 0
      : status === "Under Review" || status === "Additional Information Required"
        ? 1
        : status === "Completed"
          ? 3
          : 2;

  return (
    <ol className="space-y-3">
      {steps.map((step, index) => {
        const active = index <= activeIndex;
        return (
          <li key={step} className="flex gap-3">
            <span
              className={cn(
                "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-muted text-muted-foreground",
              )}
            >
              {active ? <CheckCircle2 className="size-3.5" aria-hidden="true" /> : <Minus className="size-3.5" aria-hidden="true" />}
            </span>
            <div className="min-w-0">
              <p className={cn("text-sm font-semibold", active ? "text-foreground" : "text-muted-foreground")}>{step}</p>
              {index < steps.length - 1 ? <ChevronDown className="mt-1 size-4 text-muted-foreground" aria-hidden="true" /> : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
