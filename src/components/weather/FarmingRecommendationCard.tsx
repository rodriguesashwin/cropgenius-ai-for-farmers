import { Sprout } from "lucide-react";

export function FarmingRecommendationCard({
  title,
  text,
  delay = 0,
}: {
  title: string;
  text: string;
  delay?: number;
}) {
  return (
    <article
      className="animate-rise rounded-xl border border-border bg-card p-4 transition-colors duration-300 hover:border-primary/35"
      style={{ animationDelay: `${delay}ms` }}
    >
      <h4 className="flex items-center gap-2 font-display text-sm font-semibold text-foreground">
        <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Sprout className="size-4" aria-hidden="true" />
        </span>
        {title}
      </h4>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
    </article>
  );
}
