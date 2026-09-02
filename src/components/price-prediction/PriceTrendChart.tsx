import { LineChart as LineChartIcon } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { formatRupees, type PriceTrendPoint } from "@/data/price-prediction";

export function PriceTrendChart({
  data,
  isSample = false,
}: {
  data: PriceTrendPoint[];
  isSample?: boolean;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] sm:p-6">
      <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
        <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <LineChartIcon className="size-4" aria-hidden="true" />
        </span>
        Historical Price Trend
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Price (₹/quintal) across months{isSample ? " — sample series for layout review." : "."}
      </p>

      {data.length === 0 ? (
        <p className="mt-4 rounded-xl border border-dashed border-border bg-muted/30 px-4 py-10 text-center text-sm text-muted-foreground">
          The historical price trend will be plotted here once market data is available.
        </p>
      ) : (
        <div className="mt-5 h-60 w-full sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8, right: 12, bottom: 4, left: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
              />
              <YAxis
                width={56}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                tickFormatter={(v: number) => `₹${v}`}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "0.75rem",
                  border: "1px solid var(--color-border)",
                  backgroundColor: "var(--color-card)",
                  color: "var(--color-foreground)",
                }}
                formatter={(value) => [`${formatRupees(Number(value))} / quintal`, "Price"]}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="var(--color-primary)"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "var(--color-primary)" }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        Historical trends are for analysis. Actual prediction will be provided by the CropGenius
        prediction model.
      </p>
    </section>
  );
}
