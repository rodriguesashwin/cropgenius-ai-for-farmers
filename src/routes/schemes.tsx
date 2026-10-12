import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertCircle, ChevronRight, Info, Landmark, ShieldCheck } from "lucide-react";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { SchemeCard } from "@/components/government-schemes/SchemeCard";
import { SchemeDetailsDialog } from "@/components/government-schemes/SchemeDetailsDialog";
import { SchemeFilters } from "@/components/government-schemes/SchemeFilters";
import { SchemeFinder } from "@/components/government-schemes/SchemeFinder";
import { EmptyState, SchemeErrorState, SchemeLoadingState } from "@/components/government-schemes/SchemeStates";
import {
  emptySchemeFilters,
  type GovernmentScheme,
  type SchemeFilters as SchemeFilterValues,
  type SchemeFinderValues,
  type SchemeMatch,
} from "@/data/government-schemes";
import { loadGovernmentSchemes, recommendGovernmentSchemes } from "@/lib/government-schemes-service";

const title = "Government Schemes & Benefits | CropGenius";
const description = "Discover government schemes, subsidies, insurance and agricultural support relevant to farmers.";

export const Route = createFileRoute("/schemes")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: page.description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FeatureRoute,
});

function FeatureRoute() {
  const [schemes, setSchemes] = useState<GovernmentScheme[]>([]);
  const [filters, setFilters] = useState<SchemeFilterValues>(emptySchemeFilters);
  const [stage, setStage] = useState<"loading" | "success" | "error">("loading");
  const [selectedScheme, setSelectedScheme] = useState<GovernmentScheme | null>(null);
  const [matches, setMatches] = useState<SchemeMatch[]>([]);
  const [finderBusy, setFinderBusy] = useState(false);
  const [finderSearched, setFinderSearched] = useState(false);

  async function refreshSchemes(nextFilters = filters) {
    setStage("loading");
    setFilters(nextFilters);
    try {
      const records = await loadGovernmentSchemes(nextFilters);
      setSchemes(records);
      setStage("success");
    } catch {
      setStage("error");
    }
  }

  useEffect(() => {
    void refreshSchemes(emptySchemeFilters);
  }, []);

  async function findSchemes(values: SchemeFinderValues) {
    setFinderBusy(true);
    setFinderSearched(true);
    try {
      setMatches(await recommendGovernmentSchemes(values));
    } catch {
      setMatches([]);
    } finally {
      setFinderBusy(false);
    }
  }

  const featured = schemes.filter((scheme) => scheme.featured);

  return (
    <DashboardShell title="Government Schemes">
      <div className="animate-rise space-y-7">
        <header className="space-y-3">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1 text-xs text-muted-foreground">
              <li><Link to="/dashboard" className="transition-colors hover:text-primary">Dashboard</Link></li>
              <ChevronRight className="size-3.5" aria-hidden="true" />
              <li className="font-medium text-foreground">Government Schemes</li>
            </ol>
          </nav>
          <div className="flex items-start gap-3">
            <span className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><Landmark className="size-5" aria-hidden="true" /></span>
            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">Government Schemes &amp; Benefits</h2>
              <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted-foreground">{description}</p>
            </div>
          </div>
        </header>

        <div className="flex items-start gap-3 rounded-xl border border-primary/15 bg-primary/5 p-4 sm:p-5">
          <Info className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-foreground">Browse scheme information and verify every requirement through the official source before applying.</p>
        </div>

        <SchemeFilters onSearch={refreshSchemes} busy={stage === "loading"} />

        {featured.length ? <section aria-labelledby="featured-schemes-heading" className="space-y-4">
          <div><h3 id="featured-schemes-heading" className="font-display text-xl font-semibold">Featured schemes</h3><p className="mt-1 text-sm text-muted-foreground">Selected schemes with verified information.</p></div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{featured.map((scheme) => <SchemeCard key={scheme.id} scheme={scheme} onDetails={setSelectedScheme} />)}</div>
        </section> : null}

        <section aria-labelledby="all-schemes-heading" className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div><h3 id="all-schemes-heading" className="font-display text-xl font-semibold">Browse all schemes</h3><p className="mt-1 text-sm text-muted-foreground">Explore verified scheme details, requirements and application sources.</p></div>
            {stage === "success" ? <span className="text-sm text-muted-foreground" aria-live="polite">{schemes.length} {schemes.length === 1 ? "scheme" : "schemes"}</span> : null}
          </div>
          {stage === "loading" ? <SchemeLoadingState /> : stage === "error" ? <SchemeErrorState onRetry={() => void refreshSchemes()} /> : schemes.length ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{schemes.map((scheme) => <SchemeCard key={scheme.id} scheme={scheme} onDetails={setSelectedScheme} />)}</div> : <EmptyState title="No schemes found matching your filters." description="No verified government scheme records are available to show in the current catalogue yet. This does not mean that no government schemes exist." />}
        </section>

        <SchemeFinder results={matches} busy={finderBusy} hasSearched={finderSearched} onSubmit={findSchemes} onDetails={setSelectedScheme} />

        <aside className="rounded-xl border border-border bg-card p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
            <div><h3 className="font-display font-semibold">Important information</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">Government scheme information can change. Please verify eligibility, benefits, deadlines and application requirements on the official government portal before applying.</p></div>
          </div>
          <div className="mt-4 flex items-start gap-2 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground"><AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />Potential matches are based only on listed scheme details and do not confirm eligibility, approval or benefit entitlement.</div>
        </aside>
      </div>
      <SchemeDetailsDialog scheme={selectedScheme} onClose={() => setSelectedScheme(null)} />
    </DashboardShell>
  );
}
