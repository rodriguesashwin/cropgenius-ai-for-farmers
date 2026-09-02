import { History } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatRupees, type RecentPrediction } from "@/data/price-prediction";

export function RecentPredictions({
  predictions,
  isSample = false,
}: {
  predictions: RecentPrediction[];
  isSample?: boolean;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] sm:p-6">
      <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
        <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <History className="size-4" aria-hidden="true" />
        </span>
        Recent Predictions
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {isSample
          ? "Sample entries — saved predictions will be loaded from your CropGenius account."
          : "Your most recent price estimates."}
      </p>

      {predictions.length === 0 ? (
        <p className="mt-4 rounded-xl border border-dashed border-border bg-muted/30 px-4 py-8 text-center text-sm text-muted-foreground">
          No predictions yet.
        </p>
      ) : (
        <div className="mt-4 -mx-1 overflow-x-auto px-1">
          <Table className="min-w-[38rem]">
            <TableHeader>
              <TableRow>
                <TableHead>Crop</TableHead>
                <TableHead>Market</TableHead>
                <TableHead>Prediction Month</TableHead>
                <TableHead className="text-right">Predicted Price</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {predictions.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium text-foreground">{p.crop}</TableCell>
                  <TableCell className="text-muted-foreground">{p.market}</TableCell>
                  <TableCell className="text-muted-foreground">{p.month}</TableCell>
                  <TableCell className="text-right font-semibold text-foreground">
                    {formatRupees(p.predictedPrice)}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">{p.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </section>
  );
}
