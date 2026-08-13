import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CallToAction() {
  return (
    <section className="py-20 sm:py-24">
      <div className="section-shell">
        <div className="gradient-field relative overflow-hidden rounded-3xl px-6 py-16 text-center sm:px-12 sm:py-20">
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold text-primary-foreground sm:text-4xl">
            Build a Smarter Future for Agriculture
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-primary-foreground/85">
            Bring agricultural intelligence, market information and farmer welfare services
            together with CropGenius.
          </p>
          <div className="mt-9 flex justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="group bg-card text-primary hover:bg-card/90"
            >
              Get Started with CropGenius
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}