import { useState } from "react";
import { ListFilter, Search, SlidersHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  emptySchemeFilters,
  farmerTypes,
  indianStates,
  schemeCategories,
  schemeCrops,
  type SchemeFilters as SchemeFilterValues,
} from "@/data/government-schemes";

export function SchemeFilters({ onSearch, busy = false }: {
  onSearch: (values: SchemeFilterValues) => void;
  busy?: boolean;
}) {
  const [values, setValues] = useState<SchemeFilterValues>(emptySchemeFilters);
  const update = (key: keyof SchemeFilterValues, value: string) =>
    setValues((previous) => ({ ...previous, [key]: value }));

  return (
    <section aria-labelledby="scheme-filter-heading" className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <SlidersHorizontal className="size-4" aria-hidden="true" />
        </span>
        <div>
          <h3 id="scheme-filter-heading" className="font-display text-lg font-semibold">Search and filter schemes</h3>
          <p className="text-sm text-muted-foreground">Narrow results by topic and location.</p>
        </div>
      </div>
      <form className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" onSubmit={(event) => {
        event.preventDefault();
        onSearch(values);
      }}>
        <div className="space-y-2 sm:col-span-2 lg:col-span-3">
          <Label htmlFor="scheme-search">Search schemes</Label>
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input id="scheme-search" value={values.query} onChange={(event) => update("query", event.target.value)} placeholder="Search schemes..." className="min-h-11 pl-9" />
          </div>
        </div>
        <FilterSelect id="scheme-category" label="Category" value={values.category} placeholder="All categories" onChange={(value) => update("category", value)} options={schemeCategories} />
        <FilterSelect id="scheme-state" label="State" value={values.state} placeholder="All states" onChange={(value) => update("state", value)} options={indianStates} />
        <FilterSelect id="scheme-crop" label="Crop" value={values.crop} placeholder="All crops" onChange={(value) => update("crop", value)} options={schemeCrops} />
        <FilterSelect id="scheme-farmer-type" label="Farmer type" value={values.farmerType} placeholder="All farmer types" onChange={(value) => update("farmerType", value)} options={farmerTypes} />
        <div className="flex flex-col gap-2 sm:col-span-2 sm:flex-row sm:items-end lg:col-span-2">
          <Button type="submit" disabled={busy} className="min-h-11 sm:flex-1"><ListFilter aria-hidden="true" />Search</Button>
          <Button type="button" variant="outline" className="min-h-11" onClick={() => {
            setValues(emptySchemeFilters);
            onSearch(emptySchemeFilters);
          }}><X aria-hidden="true" />Clear filters</Button>
        </div>
      </form>
    </section>
  );
}

function FilterSelect({ id, label, value, placeholder, onChange, options }: {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  options: readonly string[];
}) {
  return <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Select value={value || "all"} onValueChange={(next) => onChange(next === "all" ? "" : next)}>
      <SelectTrigger id={id} className="min-h-11 w-full"><SelectValue placeholder={placeholder} /></SelectTrigger>
      <SelectContent>
        <SelectItem value="all">{placeholder}</SelectItem>
        {options.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}
      </SelectContent>
    </Select>
  </div>;
}