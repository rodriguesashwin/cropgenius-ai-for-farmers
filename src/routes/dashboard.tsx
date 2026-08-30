import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bot,
  CalendarDays,
  CloudSun,
  Inbox,
  Leaf,
  LineChart,
  MapPin,
  Sprout,
} from "lucide-react";
import { toast } from "sonner";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Button } from "@/components/ui/button";
import { quickAccess } from "@/data/dashboard";
import benefitsFarmer from "@/assets/benefits-farmer.jpg";

const title = "Farmer Dashboard | CropGenius";
const description =
  "Your CropGenius dashboard: disease detection, price prediction, weather, market insights, government schemes and the AI farmer assistant in one place.";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
    ],
  }),
  component: DashboardPage,
});

const farmCards = [
  { icon: Sprout, label: "Selected Crop", value: "Not selected yet" },
  { icon: MapPin, label: "Location", value: "Not set yet" },
  { icon: CalendarDays, label: "Farming Season", value: "Not selected yet" },
];

const insightCards = [
  { icon: CloudSun, label: "Weather Insight", value: "Weather information will appear here." },
  { icon: LineChart, label: "Market Insight", value: "Market information will appear here." },
  { icon: Leaf, label: "Crop Health", value: "Crop health information will appear here." },
];

function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="font-display text-lg font-semibold text-foreground sm:text-xl">{children}</h2>
  );
}

function DashboardPage() {
  return (
    <DashboardShell title="Farmer Dashboard">
      <div className="space-y-8">
        {/* Welcome */}
        <section className="relative isolate overflow-hidden rounded-2xl border border-border">
          <img
            src={benefitsFarmer}
            alt="Indian farmer standing in a healthy green field"
            className="absolute inset-0 -z-20 size-full object-cover"
            loading="lazy"
          />
          <div
            className="absolute inset-0 -z-10"
            style={{ background: "var(--overlay-cta)" }}
            aria-hidden="true"
          />
          <div className="px-6 py-8 sm:px-8">
            <h2 className="font-display text-2xl font-semibold text-primary-foreground sm:text-3xl">
              Welcome to CropGenius 👋
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-primary-foreground/85">
              Your intelligent companion for smarter agricultural decisions.
            </p>
          </div>
        </section>

        {/* Quick Access */}
        <section>
          <SectionTitle>Quick Access</SectionTitle>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quickAccess.map((item, index) => (
              <Link
                key={item.to}
                to={item.to}
                className="surface-card animate-rise group flex items-start gap-3 p-5"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-110">
                  <item.icon className="size-5" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-foreground">{item.title}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                    {item.description}
                  </span>
                </span>
                <ArrowRight
                  className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </section>

        {/* My Farm */}
        <section>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <SectionTitle>My Farm</SectionTitle>
            <Button
              size="sm"
              onClick={() => toast.info("Farm setup will be saved once the backend is connected.")}
            >
              Set Up My Farm
            </Button>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {farmCards.map((card) => (
              <div key={card.label} className="surface-card flex items-center gap-3 p-5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                  <card.icon className="size-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    {card.label}
                  </span>
                  <span className="mt-0.5 block text-sm font-semibold text-foreground">
                    {card.value}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Insights */}
        <section>
          <SectionTitle>Today's Agricultural Insights</SectionTitle>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {insightCards.map((card) => (
              <div key={card.label} className="surface-card p-5">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <card.icon className="size-4.5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold text-foreground">{card.label}</span>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{card.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <SectionTitle>Recent Activity</SectionTitle>
          <div className="surface-card mt-4 flex flex-col items-center px-6 py-10 text-center">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
              <Inbox className="size-6" aria-hidden="true" />
            </span>
            <p className="mt-3 text-sm text-muted-foreground">No recent activity yet.</p>
          </div>
        </section>

        {/* Assistant CTA */}
        <section className="gradient-field flex flex-col items-start gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-start gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-foreground/15 text-primary-foreground">
              <Bot className="size-5.5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-display text-lg font-semibold text-primary-foreground sm:text-xl">
                Need help with your farm?
              </h2>
              <p className="mt-1 max-w-lg text-sm leading-relaxed text-primary-foreground/85">
                Ask CropGenius about crops, diseases, weather or agricultural services.
              </p>
            </div>
          </div>
          <Button asChild variant="secondary" className="group shrink-0">
            <Link to="/assistant">
              Ask CropGenius
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </Button>
        </section>
      </div>
    </DashboardShell>
  );
}
