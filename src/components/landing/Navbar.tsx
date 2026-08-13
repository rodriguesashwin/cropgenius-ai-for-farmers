import { useEffect, useState } from "react";
import { Menu, Sprout, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { navItems } from "@/data/landing";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-border bg-background/90 backdrop-blur-md shadow-[0_8px_24px_-20px_oklch(0.3_0.05_152/0.5)]"
          : "border-transparent bg-background/70 backdrop-blur-sm",
      )}
    >
      <nav className="section-shell flex h-18 items-center justify-between gap-4 py-3">
        <a href="#home" className="flex items-center gap-3">
          <span className="gradient-field flex size-10 items-center justify-center rounded-xl text-primary-foreground">
            <Sprout className="size-5" aria-hidden="true" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg font-semibold text-foreground">CropGenius</span>
            <span className="text-[11px] font-medium tracking-wide text-muted-foreground">
              AI-Powered Smart Agriculture
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="ghost" className="text-foreground">
            Login
          </Button>
          <Button>Get Started</Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-foreground lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="section-shell flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <Button variant="outline">Login</Button>
              <Button>Get Started</Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}