import { useCallback, useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertCircle, CalendarDays, ChevronRight, Database, MapPin, RefreshCw, Search } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { formatMarketPrice, formatObservationDate, type MarketPriceRecord } from "@/data/market-insights";
import { loadMarketPrices } from "@/lib/market-insights-service";

const title = "Agricultural Market Insights | CropGenius";
const description = "Compare available crop prices across markets and review the date and source of each record.";

export const Route = createFileRoute("/market")({
  head: () => ({ meta: [
    { title }, { name: "description", content: description },
    { property: "og:title", content: title }, { property: "og:description", content: description },
    { property: "og:type", content: "website" },
  ] }),
  component: MarketInsightsPage,
});

function MarketInsightsPage() {
  const [records, setRecords] = useState<MarketPriceRecord[]>([]);
  const [sourceLabel, setSourceLabel] = useState<string>();
  const [updatedAt, setUpdatedAt] = useState<string>();
  const [stage, setStage] = useState<"loading" | "ready" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [search, setSearch] = useState("");
  const [crop, setCrop] = useState("all");
  const [state, setState] = useState("all");
  const [market, setMarket] = useState("all");

  const refresh = useCallback(async (signal?: AbortSignal) => {
    setStage("loading");
    setErrorMessage("");
    try {
      const response = await loadMarketPrices(signal);
      if (signal?.aborted) return;
      setRecords(response.records);
      setSourceLabel(response.sourceLabel);
      setUpdatedAt(response.updatedAt);
      setStage("ready");
    } catch (error) {
      if (signal?.aborted) return;
      setRecords([]);
      setErrorMessage(error instanceof Error ? error.message : "Market data is temporarily unavailable.");
      setStage("error");
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void refresh(controller.signal);
    return () => controller.abort();
  }, [refresh]);

  const crops = useMemo(() => [...new Set(records.map((r) => r.crop))].sort(), [records]);
  const states = useMemo(() => [...new Set(records.map((r) => r.state).filter((v) => v !== "—"))].sort(), [records]);
  const markets = useMemo(() => [...new Set(records.map((r) => r.market))].sort(), [records]);
  const visible = useMemo(() => {
    const term = search.trim().toLowerCase();
    return records.filter((r) =>
      (!term || [r.crop, r.market, r.state, r.source].some((v) => v.toLowerCase().includes(term))) &&
      (crop === "all" || r.crop === crop) &&
      (state === "all" || r.state === state) &&
      (market === "all" || r.market === market)
    );
  }, [records, search, crop, state, market]);

  const latest = useMemo(() => {
    const dates = records.map((r) => r.observationDate).filter(Boolean).sort();
    return dates.length ? formatObservationDate(dates[dates.length - 1]) : "—";
  }, [records]);

  return (
    <DashboardShell title="Market Insights">
      <div className="animate-rise space-y-6">
        <header className="space-y-3">
          <nav aria-label="Breadcrumb"><ol className="flex items-center gap-1 text-xs text-muted-foreground">
            <li><Link to="/dashboard" className="hover:text-primary">Dashboard</Link></li>
            <ChevronRight className="size-3.5" aria-hidden="true" /><li className="font-medium text-foreground">Market Insights</li>
          </ol></nav>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="eyebrow">AGRICULTURAL MARKET DATA</p>
              <h1 className="mt-2 font-display text-2xl font-semibold text-foreground sm:text-3xl">Market Insights</h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{description}</p>
            </div>
            <button type="button" disabled={stage === "loading"} onClick={() => void refresh()}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted disabled:opacity-60">
              <RefreshCw className={`size-4 ${stage === "loading" ? "animate-spin" : ""}`} aria-hidden="true" />Refresh data
            </button>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-3" aria-label="Market summary">
          <Summary label="Available records" value={stage === "loading" ? "…" : String(records.length)} detail="Returned by the data service" />
          <Summary label="Crops covered" value={stage === "loading" ? "…" : String(crops.length)} detail="Distinct crops in available records" />
          <Summary label="Latest observation" value={stage === "loading" ? "…" : latest} detail="Based on supplied record dates" />
        </section>

        <section className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)] sm:p-5">
          <div className="mb-4 flex items-center gap-2"><Search className="size-4 text-primary" aria-hidden="true" /><h2 className="font-display font-semibold">Find market prices</h2></div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <label className="space-y-1.5 text-sm font-medium">Search
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Crop, market or state"
                className="min-h-10 w-full rounded-xl border border-input bg-background px-3 text-sm font-normal outline-none focus-visible:ring-2 focus-visible:ring-ring" />
            </label>
            <Filter label="Crop" value={crop} onChange={setCrop} options={crops} />
            <Filter label="State" value={state} onChange={setState} options={states} />
            <Filter label="Market" value={market} onChange={setMarket} options={markets} />
          </div>
          <div className="mt-3 flex items-center justify-between gap-3 text-xs text-muted-foreground">
            <span aria-live="polite">{stage === "loading" ? "Loading market records…" : `${visible.length} of ${records.length} records shown`}</span>
            <button type="button" className="font-medium text-primary hover:underline" onClick={() => { setSearch(""); setCrop("all"); setState("all"); setMarket("all"); }}>Clear filters</button>
          </div>
        </section>

        {stage === "loading" && <Status icon="loading" title="Loading market data" text="Fetching available records from the market data service." />}
        {stage === "error" && <section role="alert" className="rounded-2xl border border-destructive/25 bg-destructive/5 p-6">
          <AlertCircle className="size-6 text-destructive" aria-hidden="true" /><h2 className="mt-3 font-display text-lg font-semibold">Market data couldn't be loaded</h2>
          <p className="mt-2 text-sm text-muted-foreground">{errorMessage}</p>
          <button type="button" onClick={() => void refresh()} className="mt-4 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Try again</button>
        </section>}
        {stage === "ready" && records.length === 0 && <Status icon="empty" title="No market records available yet"
          text="The service returned no usable market price records. Connect or populate the market data source to display verified prices here. CropGenius will not create placeholder prices." />}
        {stage === "ready" && records.length > 0 && visible.length === 0 && <Status icon="empty" title="No matching records" text="Try another search term or clear your filters." />}
        {stage === "ready" && visible.length > 0 && <>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{visible.map((r) => <MarketCard key={r.id} record={r} />)}</div>
          <section className="rounded-xl border border-border bg-muted/30 p-4 text-xs leading-relaxed text-muted-foreground">
            <p><strong className="text-foreground">Data source:</strong> {sourceLabel || "Source is specified per record."}</p>
            <p className="mt-1"><strong className="text-foreground">Last updated:</strong> {updatedAt ? formatObservationDate(updatedAt) : "Not supplied by the service"}</p>
            <p className="mt-2">Prices can change. Confirm details with the relevant APMC or official market source before making selling decisions.</p>
          </section>
        </>}
      </div>
    </DashboardShell>
  );
}

function Summary({ label, value, detail }: { label: string; value: string; detail: string }) {
  return <article className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
    <p className="text-sm text-muted-foreground">{label}</p><p className="mt-2 font-display text-2xl font-semibold tabular-nums">{value}</p><p className="mt-2 text-xs text-muted-foreground">{detail}</p>
  </article>;
}

function Filter({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return <label className="space-y-1.5 text-sm font-medium">{label}
    <select value={value} onChange={(e) => onChange(e.target.value)} className="min-h-10 w-full rounded-xl border border-input bg-background px-3 text-sm font-normal outline-none focus-visible:ring-2 focus-visible:ring-ring">
      <option value="all">All {label.toLowerCase()}s</option>{options.map((v) => <option key={v} value={v}>{v}</option>)}
    </select>
  </label>;
}

function Status({ icon, title, text }: { icon: "loading" | "empty"; title: string; text: string }) {
  return <section className="rounded-2xl border border-border bg-card p-8 text-center sm:p-12">
    {icon === "loading" ? <RefreshCw className="mx-auto size-7 animate-spin text-primary" aria-hidden="true" /> : <Database className="mx-auto size-7 text-primary" aria-hidden="true" />}
    <h2 className="mt-4 font-display text-xl font-semibold">{title}</h2><p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{text}</p>
    {icon === "empty" && <p className="mt-4 text-xs text-muted-foreground">Expected endpoint: GET /api/market/prices</p>}
  </section>;
}

function MarketCard({ record: r }: { record: MarketPriceRecord }) {
  return <article className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-shadow hover:shadow-md">
    <div className="flex items-start justify-between gap-3"><div className="min-w-0">
      <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">{r.crop}</span>
      <h2 className="mt-3 font-display text-lg font-semibold">{r.market}</h2>
      <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="size-3.5" aria-hidden="true" />{r.state}</p>
    </div><Database className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" /></div>
    <div className="mt-5 grid grid-cols-3 gap-2 border-y border-border py-4">
      <Price label="Min price" value={formatMarketPrice(r.minPrice)} />
      <Price label="Modal price" value={formatMarketPrice(r.modalPrice)} prominent />
      <Price label="Max price" value={formatMarketPrice(r.maxPrice)} />
    </div>
    <div className="mt-4 flex items-start justify-between gap-3 text-xs text-muted-foreground">
      <span className="flex items-start gap-1.5"><CalendarDays className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />Observed {formatObservationDate(r.observationDate)}</span>
      <span className="text-right">{r.unit}</span>
    </div>
    <p className="mt-3 border-t border-border pt-3 text-xs text-muted-foreground">Source: <span className="font-medium text-foreground">{r.source}</span></p>
  </article>;
}

function Price({ label, value, prominent = false }: { label: string; value: string; prominent?: boolean }) {
  return <div className="min-w-0"><p className="text-[10px] leading-4 text-muted-foreground sm:text-xs">{label}</p>
    <p className={`mt-1 break-words text-sm font-semibold tabular-nums ${prominent ? "text-primary" : "text-foreground"}`}>{value}</p></div>;
}
