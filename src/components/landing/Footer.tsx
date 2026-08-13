import { Sprout } from "lucide-react";

import { footerNav, footerServices } from "@/data/landing";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="section-shell grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <span className="gradient-field flex size-10 items-center justify-center rounded-xl text-primary-foreground">
              <Sprout className="size-5" aria-hidden="true" />
            </span>
            <span className="font-display text-lg font-semibold text-foreground">CropGenius</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            AI-Powered Smart Agriculture and Farmer Welfare System.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="text-sm font-semibold text-foreground">Navigation</h2>
          <ul className="mt-4 space-y-2.5">
            {footerNav.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold text-foreground">Services</h2>
          <ul className="mt-4 space-y-2.5">
            {footerServices.map((service) => (
              <li key={service} className="text-sm text-muted-foreground">
                {service}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="section-shell py-6">
          <p className="text-xs text-muted-foreground">© 2026 CropGenius</p>
        </div>
      </div>
    </footer>
  );
}