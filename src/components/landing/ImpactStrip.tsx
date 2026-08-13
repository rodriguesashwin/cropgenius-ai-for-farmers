import { useEffect, useState } from "react";

import { impactStats } from "@/data/landing";
import { useInView } from "@/hooks/use-in-view";

function CountUp({ value, active }: { value: number; active: boolean }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const total = 48;
    const id = window.setInterval(() => {
      frame += 1;
      const progress = Math.min(frame / total, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress === 1) window.clearInterval(id);
    }, 16);
    return () => window.clearInterval(id);
  }, [active, value]);

  return <>{display}</>;
}

export function ImpactStrip() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);

  return (
    <section className="border-y border-border bg-secondary/50">
      <div
        ref={ref}
        className="section-shell grid grid-cols-2 gap-6 py-10 sm:py-12 lg:grid-cols-4"
      >
        {impactStats.map((stat, index) => (
          <div
            key={stat.label}
            className={inView ? "animate-rise text-center lg:text-left" : "text-center opacity-0 lg:text-left"}
            style={{ animationDelay: `${index * 110}ms` }}
          >
            <p className="font-display text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
              {stat.prefix}
              <CountUp value={stat.value} active={inView} />
              {stat.suffix}
            </p>
            <p className="mt-1.5 text-sm font-medium text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}