import { RefreshCw, ScanSearch, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatFileSize } from "@/data/disease-detection";

export function ImagePreview({
  file,
  previewUrl,
  onRemove,
  onChange,
  onAnalyze,
}: {
  file: File;
  previewUrl: string;
  onRemove: () => void;
  onChange: () => void;
  onAnalyze: () => void;
}) {
  return (
    <div className="animate-rise space-y-4">
      <div className="overflow-hidden rounded-2xl border border-border bg-muted/40">
        <div className="flex items-center justify-center bg-primary-deep/5 p-3">
          <img
            src={previewUrl}
            alt={`Selected crop leaf image: ${file.name}`}
            className="max-h-72 w-full rounded-xl object-contain"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3 border-t border-border px-4 py-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
            <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onChange}>
              <RefreshCw className="size-4" aria-hidden="true" />
              Change Image
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onRemove}
              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="size-4" aria-hidden="true" />
              Remove
            </Button>
          </div>
        </div>
      </div>

      <Button
        size="lg"
        className="w-full transition-transform hover:scale-[1.01]"
        onClick={onAnalyze}
      >
        <ScanSearch className="size-4.5" aria-hidden="true" />
        Analyze Leaf
      </Button>
    </div>
  );
}
