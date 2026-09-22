import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Building2, ChevronRight, ClipboardList, FlaskConical, RotateCcw } from "lucide-react";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Button } from "@/components/ui/button";
import {
  CooperativeDetails,
  CooperativeDirectory,
  CooperativeIntroCard,
  CategoryFilterGrid,
  DashboardSummary,
  MyRequests,
  RequestDetails,
  RequestServiceForm,
  ServiceCards,
  ServiceDetails,
  ServiceSearchFilters,
  filterServicesForView,
} from "@/components/cooperative/ServiceExplorer";
import {
  CooperativeErrorState,
  CooperativeLoadingState,
} from "@/components/cooperative/CooperativeShared";
import {
  emptyFilters,
  type Cooperative,
  type CooperativeFilters,
  type CooperativeService,
  type CooperativeStage,
  type CooperativeView,
  type ServiceRequest,
} from "@/data/cooperative";
import { loadCooperativeDashboard } from "@/lib/cooperative-service";
import { cn } from "@/lib/utils";

const title = "Cooperative Services | CropGenius";
const description =
  "Access agricultural cooperative services, support programs and farmer assistance in one place.";

export const Route = createFileRoute("/cooperative")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: FeatureRoute,
});

type Tab = "services" | "requests" | "societies";

function FeatureRoute() {
  const [stage, setStage] = useState<CooperativeStage>("loading");
  const [services, setServices] = useState<CooperativeService[]>([]);
  const [cooperatives, setCooperatives] = useState<Cooperative[]>([]);
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [filters, setFilters] = useState<CooperativeFilters>(emptyFilters);
  const [directoryLocation, setDirectoryLocation] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("services");
  const [view, setView] = useState<CooperativeView>({ name: "services" });

  const load = useCallback(async () => {
    setStage("loading");
    try {
      const payload = await loadCooperativeDashboard();
      setServices(payload.services);
      setCooperatives(payload.cooperatives);
      setRequests(payload.requests);
      setStage("ready");
    } catch {
      setStage("error");
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const visibleServices = useMemo(
    () => filterServicesForView(services, filters),
    [filters, services],
  );

  function selectTab(tab: Tab) {
    setActiveTab(tab);
    setView({ name: "services" });
  }

  function returnToServices() {
    setActiveTab("services");
    setView({ name: "services" });
  }

  const selectedService =
    view.name === "service-detail" || view.name === "request-form"
      ? services.find((service) => service.id === view.serviceId)
      : undefined;
  const selectedRequest =
    view.name === "request-detail"
      ? requests.find((request) => request.id === view.requestId)
      : undefined;
  const selectedCooperative =
    view.name === "cooperative-detail"
      ? cooperatives.find((cooperative) => cooperative.id === view.cooperativeId)
      : undefined;

  return (
    <DashboardShell title="Cooperative Services">
      <div className="animate-rise space-y-6">
        <header>
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link to="/dashboard" className="transition-colors hover:text-primary">
              Dashboard
            </Link>
            <ChevronRight className="size-4" aria-hidden="true" />
            <span className="text-foreground">Cooperative Services</span>
          </nav>
          <h1 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Cooperative Services
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
            {description}
          </p>
        </header>

        <CooperativeIntroCard />

        {stage === "loading" ? <CooperativeLoadingState /> : null}
        {stage === "error" ? <CooperativeErrorState onRetry={() => void load()} /> : null}

        {stage === "ready" ? (
          <>
            <DashboardSummary services={services} requests={requests} />

            <div className="flex flex-wrap gap-2 border-b border-border pb-3" role="tablist" aria-label="Cooperative services views">
              {([
                ["services", "Services", ClipboardList],
                ["requests", "My Requests", RotateCcw],
                ["societies", "Cooperative Societies", Building2],
              ] as const).map(([tab, label, Icon]) => (
                <Button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab}
                  variant={activeTab === tab ? "default" : "ghost"}
                  className="min-h-11"
                  onClick={() => selectTab(tab)}
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {label}
                </Button>
              ))}
            </div>

            {activeTab === "services" && view.name === "services" ? (
              <div className="space-y-6">
                <CategoryFilterGrid
                  activeCategory={filters.category}
                  onSelect={(category) => setFilters((current) => ({ ...current, category }))}
                />
                <ServiceSearchFilters
                  filters={filters}
                  onChange={setFilters}
                  onClear={() => setFilters(emptyFilters)}
                />
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    Cooperative Services
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    {visibleServices.length} found
                  </span>
                </div>
                <ServiceCards
                  services={visibleServices}
                  onViewDetails={(serviceId) => setView({ name: "service-detail", serviceId })}
                />
              </div>
            ) : null}

            {activeTab === "services" && view.name === "service-detail" && selectedService ? (
              <ServiceDetails
                service={selectedService}
                cooperatives={cooperatives}
                onRequest={() => setView({ name: "request-form", serviceId: selectedService.id })}
                onBack={returnToServices}
              />
            ) : null}

            {activeTab === "services" && view.name === "request-form" && selectedService ? (
              <RequestServiceForm
                service={selectedService}
                cooperatives={cooperatives}
                sequence={requests.length + 1}
                onSubmitRequest={(request) => setRequests((current) => [request, ...current])}
                onCancel={returnToServices}
              />
            ) : null}

            {activeTab === "requests" && view.name === "services" ? (
              <MyRequests
                requests={requests}
                onExplore={returnToServices}
                onView={(requestId) => setView({ name: "request-detail", requestId })}
              />
            ) : null}

            {activeTab === "requests" && view.name === "request-detail" && selectedRequest ? (
              <RequestDetails request={selectedRequest} onBack={() => setView({ name: "services" })} />
            ) : null}

            {activeTab === "societies" && view.name === "services" ? (
              <CooperativeDirectory
                cooperatives={cooperatives}
                location={directoryLocation}
                onLocationChange={setDirectoryLocation}
                onView={(cooperativeId) => setView({ name: "cooperative-detail", cooperativeId })}
              />
            ) : null}

            {activeTab === "societies" && view.name === "cooperative-detail" && selectedCooperative ? (
              <CooperativeDetails
                cooperative={selectedCooperative}
                services={services}
                onExploreService={(serviceId) => {
                  setActiveTab("services");
                  setView({ name: "service-detail", serviceId });
                }}
                onBack={() => setView({ name: "services" })}
              />
            ) : null}

            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                className={cn("text-xs text-muted-foreground", stage !== "ready" && "hidden")}
                onClick={() => setStage("error")}
              >
                <FlaskConical className="size-3.5" aria-hidden="true" />
                Preview error state
              </Button>
            </div>
          </>
        ) : null}
      </div>
    </DashboardShell>
  );
}
