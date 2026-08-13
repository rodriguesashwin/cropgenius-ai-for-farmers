import { Brain, Cpu, Database } from "lucide-react";

import { technologies } from "@/data/landing";
import techImage from "@/assets/ai-tech.jpg";

const pillars = [
  {
    icon: Cpu,
    title: "Computer Vision",
    description:
      "Leaf images are processed with OpenCV and deep learning models built using TensorFlow.",
  },
  {
    icon: Brain,
    title: "Machine Learning",
    description:
      "Scikit-learn models are planned for price estimation from historical market data.",
  },
  {
    icon: Database,
    title: "Live Data Sources",
    description:
      "Weather APIs and agricultural market data feed the platform's insights and alerts.",
  },
];

export function TechnologySection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="section-shell grid items-center gap-12 lg:grid-cols-2">
        <div className="relative">
          <img
            src={techImage}
            alt="Crop leaf being analysed with agricultural technology in a field"
            loading="lazy"
            width={1280}
            height={960}
            className="w-full rounded-3xl border border-border object-cover shadow-[var(--shadow-lift)]"
          />
        </div>

        <div>
          <span className="eyebrow">Technology</span>
          <h2 className="mt-4 text-3xl font-semibold text-foreground sm:text-4xl">
            The Technology Behind CropGenius
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            CropGenius is designed as a modular system where a web frontend communicates with a
            Python backend that hosts the machine learning and data services.
          </p>

          <div className="mt-8 space-y-5">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <pillar.icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-foreground">{pillar.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <ul className="mt-8 flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-secondary-foreground"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}