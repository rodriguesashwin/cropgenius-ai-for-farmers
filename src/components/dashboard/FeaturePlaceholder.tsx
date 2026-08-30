import { Link } from "@tanstack/react-router";
import { ArrowLeft, type LucideIcon } from "lucide-react";

export function FeaturePlaceholder({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center py-10 text-center sm:py-16">
      <span className="gradient-field flex size-14 items-center justify-center rounded-2xl text-primary-foreground">
        <Icon className="size-7" aria-hidden="true" />
      </span>
      <h2 className="mt-5 font-display text-2xl font-semibold text-foreground sm:text-3xl">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
      <span className="eyebrow mt-6">Module coming next</span>
      <Link
        to="/dashboard"
        className="group mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
      >
        <ArrowLeft
          className="size-4 transition-transform group-hover:-translate-x-0.5"
          aria-hidden="true"
        />
        Back to Dashboard
      </Link>
    </section>
  );
}
