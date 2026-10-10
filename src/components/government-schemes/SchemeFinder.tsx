import { useState } from "react";
import { Check, ChevronDown, Search, Sparkles, UserRound } from "lucide-react";

import { SchemeCard } from "@/components/government-schemes/SchemeCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EmptyState } from "@/components/government-schemes/SchemeStates";
import {
  emptySchemeFinderValues,
  farmerTypes,
  farmingInterests,
  indianStates,
  schemeCrops,
  validateSchemeFinder,
  type GovernmentScheme,
  type SchemeFinderValues,
  type SchemeMatch,
} from "@/data/government-schemes";

export function SchemeFinder({
  results,
  busy,
  hasSearched,
  onSubmit,
  onDetails,
}: {
  results: SchemeMatch[];
  busy: boolean;
  hasSearched: boolean;
  onSubmit: (values: SchemeFinderValues) => void;
  onDetails: (scheme: GovernmentScheme) => void;
}) {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<SchemeFinderValues>(emptySchemeFinderValues);
  const [errors, setErrors] = useState<Partial<Record<keyof SchemeFinderValues, string>>>({});
  const update = (key: keyof SchemeFinderValues, value: string | string[]) => {
    setValues((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => ({ ...previous, [key]: undefined }));
  };

  function toggleList(key: "crops" | "interests", item: string, checked: boolean) {
    const next = checked ? [...values[key], item] : values[key].filter((value) => value !== item);
    update(key, next);
  }

  return <section id="find-schemes" className="scroll-mt-20 overflow-hidden rounded-2xl border border-primary/20 bg-secondary/50 shadow-[var(--shadow-card)]">
    <button type="button" className="flex min-h-20 w-full items-center justify-between gap-4 p-5 text-left sm:p-6" aria-expanded={open} aria-controls="scheme-finder-panel" onClick={() => setOpen((value) => !value)}>
      <span className="flex min-w-0 items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Sparkles className="size-5" aria-hidden="true" /></span>
        <span><span className="block font-display text-lg font-semibold">Find Schemes For Me</span><span className="mt-1 block text-sm leading-relaxed text-muted-foreground">Tell us a little about your farm to find schemes that may be relevant to you.</span></span>
      </span>
      <ChevronDown className={`size-5 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
    </button>
    {open ? <div id="scheme-finder-panel" className="border-t border-primary/15 bg-card p-5 sm:p-6">
      <form noValidate className="space-y-5" onSubmit={(event) => {
        event.preventDefault();
        const next = validateSchemeFinder(values);
        setErrors(next);
        if (Object.keys(next).length === 0) onSubmit(values);
      }}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <FinderField id="scheme-age" label="Age">
            <Input id="scheme-age" type="number" min="1" max="120" inputMode="numeric" value={values.age} onChange={(event) => update("age", event.target.value)} placeholder="Your age" aria-invalid={Boolean(errors.age)} aria-describedby={errors.age ? "scheme-age-error" : undefined} className="min-h-11" />
            <FieldError id="scheme-age-error" message={errors.age} />
          </FinderField>
          <FinderField id="scheme-finder-state" label="State">
            <Select value={values.state} onValueChange={(value) => update("state", value)}><SelectTrigger id="scheme-finder-state" className="min-h-11 w-full" aria-invalid={Boolean(errors.state)}><SelectValue placeholder="Select state" /></SelectTrigger><SelectContent>{indianStates.map((state) => <SelectItem key={state} value={state}>{state}</SelectItem>)}</SelectContent></Select>
            <FieldError id="scheme-finder-state-error" message={errors.state} />
          </FinderField>
          <FinderField id="scheme-farmer-type" label="Farmer type">
            <Select value={values.farmerType} onValueChange={(value) => update("farmerType", value)}><SelectTrigger id="scheme-farmer-type" className="min-h-11 w-full" aria-invalid={Boolean(errors.farmerType)}><SelectValue placeholder="Select type" /></SelectTrigger><SelectContent>{farmerTypes.map((type) => <SelectItem key={type} value={type}>{type}</SelectItem>)}</SelectContent></Select>
            <FieldError id="scheme-farmer-type-error" message={errors.farmerType} />
          </FinderField>
          <FinderField id="scheme-land-size" label="Land size (acres)">
            <Input id="scheme-land-size" type="number" min="0" step="any" inputMode="decimal" value={values.landSize} onChange={(event) => update("landSize", event.target.value)} placeholder="Enter acres" aria-invalid={Boolean(errors.landSize)} aria-describedby={errors.landSize ? "scheme-land-size-error" : undefined} className="min-h-11" />
            <FieldError id="scheme-land-size-error" message={errors.landSize} />
          </FinderField>
        </div>
        <CheckboxGroup title="Crops grown" description="Select all that apply." items={schemeCrops} selected={values.crops} onToggle={(item, checked) => toggleList("crops", item, checked)} error={errors.crops} />
        <CheckboxGroup title="Farming interests" description="Optional — choose topics you want to explore." items={farmingInterests} selected={values.interests} onToggle={(item, checked) => toggleList("interests", item, checked)} />
        <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"><UserRound className="mt-0.5 size-4 shrink-0" aria-hidden="true" />Your answers stay in this page preview and are not sent to a service.</p>
        <Button type="submit" disabled={busy} className="min-h-11 w-full sm:w-auto"><Search aria-hidden="true" />{busy ? "Finding schemes…" : "Find relevant schemes"}</Button>
      </form>
      {hasSearched ? <div className="mt-7 border-t border-border pt-6" aria-live="polite">
        <div><h3 className="font-display text-xl font-semibold">Potentially Relevant Schemes</h3><p className="mt-1 text-sm text-muted-foreground">These schemes may be relevant based on the information provided. This is not an eligibility decision.</p></div>
        {busy ? <p className="mt-5 text-sm text-muted-foreground">Finding potentially relevant schemes...</p> : results.length ? <div className="mt-5 grid gap-4 md:grid-cols-2">{results.map((match) => <SchemeCard key={match.scheme.id} scheme={match.scheme} match={match} onDetails={onDetails} />)}</div> : <EmptyState title="No matching schemes were found based on the information provided." description="This reflects the verified scheme records currently available here and does not mean that no government scheme exists." />}
      </div> : null}
    </div> : null}
  </section>;
}

function FinderField({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return <div className="space-y-2"><Label htmlFor={id}>{label}</Label>{children}</div>;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? <p id={id} role="alert" className="text-xs font-medium text-destructive">{message}</p> : null;
}

function CheckboxGroup({ title, description, items, selected, onToggle, error }: {
  title: string;
  description: string;
  items: readonly string[];
  selected: string[];
  onToggle: (item: string, checked: boolean) => void;
  error?: string;
}) {
  const id = title === "Crops grown" ? "scheme-crops" : "scheme-interests";
  return <fieldset className="space-y-3" aria-describedby={error ? `${id}-error` : undefined}>
    <legend className="text-sm font-medium">{title}</legend><p className="text-xs text-muted-foreground">{description}</p>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">{items.map((item) => {
      const checked = selected.includes(item);
      const inputId = `${id}-${item.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`;
      return <label key={item} htmlFor={inputId} className="flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-border px-3 text-sm transition-colors hover:bg-muted/50">
        <Checkbox id={inputId} checked={checked} onCheckedChange={(value) => onToggle(item, value === true)} />
        <span className="min-w-0 flex-1 leading-tight">{item}</span>{checked ? <Check className="size-3.5 text-primary" aria-hidden="true" /> : null}
      </label>;
    })}</div>
    {error ? <p id={`${id}-error`} role="alert" className="text-xs font-medium text-destructive">{error}</p> : null}
  </fieldset>;
}