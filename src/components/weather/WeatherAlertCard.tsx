import type { AlertTemplate } from "@/data/weather";

export function WeatherAlertCard({
  alert,
  active = false,
  delay = 0,
}: {
  alert: AlertTemplate;
  active?: boolean;
  delay?: number;
}) {
  const Icon = alert.icon;
  return (
    <article
      className="animate-rise flex gap-3 rounded-xl border border-border bg-muted/30 p-4 transition-colors duration-300 hover:border-primary/35"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <h4 className="flex flex-wrap items-center gap-2 font-display text-sm font-semibold text-foreground">
          <span aria-hidden="true">{alert.emoji}</span>
          {alert.title}
          <span className="rounded-full border border-border bg-card px-2 py-0.5 text-[0.65rem] font-medium text-muted-foreground">
            {active ? "Active" : "Template"}
          </span>
        </h4>
        <p className="mt-1 text-sm text-muted-foreground">{alert.message}</p>
      </div>
    </article>
  );
}
