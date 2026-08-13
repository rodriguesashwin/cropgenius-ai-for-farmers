import { MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { crops } from "@/data/landing";
import { SectionHeading } from "./SectionHeading";

export function SupportedCrops() {
  return (
    <section id="crops" className="py-20 sm:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Supported Crops"
          title="Supporting India's Major Crops"
          description="Cereals, vegetables, oilseeds and plantation crops, including crops of regional importance to Karnataka."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {crops.map((crop) => (
            <article key={crop.name} className="surface-card flex flex-col overflow-hidden">
              <div className="relative aspect-4/3 overflow-hidden">
                <img
                  src={crop.image}
                  alt={`${crop.name} crop`}
                  loading="lazy"
                  width={640}
                  height={512}
                  className="size-full object-cover transition-transform duration-500 hover:scale-105"
                />
                {crop.regional ? (
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-accent/95 px-2.5 py-1 text-[11px] font-semibold text-accent-foreground">
                    <MapPin className="size-3" aria-hidden="true" />
                    Karnataka focus
                  </span>
                ) : null}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-base font-semibold text-foreground">{crop.name}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {crop.description}
                </p>
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  Explore
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}