import { AlertTriangle, ImageUp, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ErrorState({
  onRetry,
  onUploadAnother,
}: {
  onRetry: () => void;
  onUploadAnother: () => void;
}) {
  return (
    <div
      role="alert"
      className="animate-rise flex flex-col items-center rounded-2xl border border-destructive/30 bg-destructive/5 px-6 py-10 text-center"
    >
      <span className="flex size-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
        <AlertTriangle className="size-7" aria-hidden="true" />
      </span>
      <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
        Analysis Unavailable
      </h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        We couldn&apos;t analyze this image right now. Please try again.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button onClick={onRetry}>
          <RotateCcw className="size-4" aria-hidden="true" />
          Try Again
        </Button>
        <Button variant="outline" onClick={onUploadAnother}>
          <ImageUp className="size-4" aria-hidden="true" />
          Upload Another Image
        </Button>
      </div>
    </div>
  );
}
