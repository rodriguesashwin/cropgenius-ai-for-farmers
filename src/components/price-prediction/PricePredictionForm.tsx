import { useState } from "react";
import { CloudRain, IndianRupee, MapPin, Sprout, TrendingUp } from "lucide-react";

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
  emptyFormValues,
  marketOptions,
  months,
  predictionCrops,
  seasons,
  validateForm,
  type PricePredictionFormErrors,
  type PricePredictionFormValues,
} from "@/data/price-prediction";

function FieldError({ id, message }: { id: string; message?: string | undefined }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="text-xs font-medium text-destructive">
      {message}
    </p>
  );
}

export function PricePredictionForm({
  busy = false,
  onSubmit,
}: {
  busy?: boolean;
  onSubmit: (values: PricePredictionFormValues) => void;
}) {
  const [values, setValues] = useState<PricePredictionFormValues>(emptyFormValues);
  const [errors, setErrors] = useState<PricePredictionFormErrors>({});

  function set<K extends keyof PricePredictionFormValues>(
    key: K,
    value: PricePredictionFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] sm:p-6">
      <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
        <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Sprout className="size-4" aria-hidden="true" />
        </span>
        Enter Crop &amp; Market Details
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        These inputs match the features the CropGenius prediction model will use.
      </p>

      <form
        noValidate
        className="mt-5 space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          const next = validateForm(values);
          setErrors(next);
          if (Object.keys(next).length === 0) onSubmit(values);
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="pp-crop">Crop</Label>
            <Select value={values.crop} onValueChange={(v) => set("crop", v)}>
              <SelectTrigger id="pp-crop" className="min-h-11 w-full" aria-invalid={!!errors.crop}>
                <SelectValue placeholder="Select a crop" />
              </SelectTrigger>
              <SelectContent>
                {predictionCrops.map((crop) => (
                  <SelectItem key={crop} value={crop}>
                    {crop}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError id="pp-crop-error" message={errors.crop} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pp-location">Market / Location</Label>
            <div className="relative">
              <MapPin
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="pp-location"
                list="pp-market-options"
                autoComplete="off"
                value={values.location}
                onChange={(e) => set("location", e.target.value)}
                placeholder="Select market or location"
                aria-invalid={!!errors.location}
                aria-describedby={errors.location ? "pp-location-error" : undefined}
                className="min-h-11 pl-9"
              />
              <datalist id="pp-market-options">
                {marketOptions.map((m) => (
                  <option key={m} value={m} />
                ))}
              </datalist>
            </div>
            <FieldError id="pp-location-error" message={errors.location} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pp-season">Season</Label>
            <Select value={values.season} onValueChange={(v) => set("season", v)}>
              <SelectTrigger
                id="pp-season"
                className="min-h-11 w-full"
                aria-invalid={!!errors.season}
              >
                <SelectValue placeholder="Select season" />
              </SelectTrigger>
              <SelectContent>
                {seasons.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError id="pp-season-error" message={errors.season} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pp-month">Prediction Month</Label>
            <Select value={values.month} onValueChange={(v) => set("month", v)}>
              <SelectTrigger id="pp-month" className="min-h-11 w-full" aria-invalid={!!errors.month}>
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError id="pp-month-error" message={errors.month} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pp-price">Historical average price (₹/quintal)</Label>
            <div className="relative">
              <IndianRupee
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="pp-price"
                type="number"
                inputMode="decimal"
                min={0}
                step="1"
                value={values.historicalPrice}
                onChange={(e) => set("historicalPrice", e.target.value)}
                placeholder="Enter historical average price"
                aria-invalid={!!errors.historicalPrice}
                aria-describedby={errors.historicalPrice ? "pp-price-error" : undefined}
                className="min-h-11 pl-9"
              />
            </div>
            <FieldError id="pp-price-error" message={errors.historicalPrice} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pp-rainfall">
              Rainfall (mm){" "}
              <span className="font-normal text-muted-foreground">— optional feature</span>
            </Label>
            <div className="relative">
              <CloudRain
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="pp-rainfall"
                type="number"
                inputMode="decimal"
                min={0}
                step="1"
                value={values.rainfall}
                onChange={(e) => set("rainfall", e.target.value)}
                placeholder="Enter rainfall in mm"
                aria-invalid={!!errors.rainfall}
                aria-describedby={errors.rainfall ? "pp-rainfall-error" : undefined}
                className="min-h-11 pl-9"
              />
            </div>
            <FieldError id="pp-rainfall-error" message={errors.rainfall} />
          </div>
        </div>

        <Button type="submit" disabled={busy} className="min-h-11 w-full sm:w-auto">
          <TrendingUp className="size-4" aria-hidden="true" />
          {busy ? "Analyzing…" : "Predict Price"}
        </Button>
      </form>
    </section>
  );
}
