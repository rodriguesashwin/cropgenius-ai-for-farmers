import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Info, Leaf, ShieldQuestion } from "lucide-react";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { AnalysisLoader } from "@/components/disease-detection/AnalysisLoader";
import { AnalysisResult } from "@/components/disease-detection/AnalysisResult";
import { ErrorState } from "@/components/disease-detection/ErrorState";
import { ImagePreview } from "@/components/disease-detection/ImagePreview";
import { ImageUploader } from "@/components/disease-detection/ImageUploader";
import { UploadTips } from "@/components/disease-detection/UploadTips";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  exampleResult,
  supportedCrops,
  supportedDiseases,
  validateImage,
  type AnalysisResultData,
  type AnalysisStage,
} from "@/data/disease-detection";

const title = "Crop Disease Detection | CropGenius";
const description =
  "Upload a clear image of a crop leaf to identify possible diseases and get helpful treatment and prevention guidance.";

export const Route = createFileRoute("/disease-detection")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DiseaseDetectionPage,
});

function DiseaseDetectionPage() {
  const [stage, setStage] = useState<AnalysisStage>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [crop, setCrop] = useState<string>("auto");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResultData | null>(null);
  const [step, setStep] = useState(1);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => {
      timers.current.forEach(clearTimeout);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function selectFile(next: File) {
    const message = validateImage(next);
    if (message) {
      setError(message);
      return;
    }
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setError(null);
    setFile(next);
    setPreviewUrl(URL.createObjectURL(next));
    setResult(null);
    setStage("preview");
  }

  function reset() {
    timers.current.forEach(clearTimeout);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    setStep(1);
    setStage("idle");
  }

  /**
   * Frontend-only placeholder for the future call:
   *   POST /api/disease-detection  (multipart/form-data: image, crop?)
   * It only advances the loading UI — no prediction is produced here.
   */
  function analyze() {
    if (!file) {
      setError("Please select an image before continuing.");
      return;
    }
    timers.current.forEach(clearTimeout);
    setError(null);
    setResult(null);
    setStep(1);
    setStage("loading");
    timers.current = [
      setTimeout(() => setStep(2), 1100),
      setTimeout(() => setStep(3), 2200),
    ];
  }

  return (
    <DashboardShell title="Disease Detection">
      <div className="animate-rise space-y-6">
        <header className="space-y-2">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1 text-xs text-muted-foreground">
              <li>
                <Link to="/dashboard" className="transition-colors hover:text-primary">
                  Dashboard
                </Link>
              </li>
              <ChevronRight className="size-3.5" aria-hidden="true" />
              <li className="font-medium text-foreground">Disease Detection</li>
            </ol>
          </nav>
          <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
            Crop Disease Detection
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{description}</p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
          <div className="space-y-6">
            <section className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Upload Crop Leaf Image
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Upload a clear photo of the affected leaf for analysis.
                  </p>
                </div>
                {stage === "loading" && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        timers.current.forEach(clearTimeout);
                        setResult(exampleResult);
                        setStage("result");
                      }}
                    >
                      Preview result layout
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        timers.current.forEach(clearTimeout);
                        setStage("error");
                      }}
                    >
                      Preview error state
                    </Button>
                  </div>
                )}
              </div>

              <div className="mt-5 space-y-5">
                {(stage === "idle" || stage === "preview") && (
                  <div className="space-y-2">
                    <Label htmlFor="crop-select">Select Crop (Optional)</Label>
                    <Select value={crop} onValueChange={setCrop}>
                      <SelectTrigger id="crop-select" className="w-full sm:max-w-xs">
                        <SelectValue placeholder="Select a crop">
                          {crop === "auto" ? "Not sure? Let CropGenius identify it" : crop}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">
                          Not sure? Let CropGenius identify it from the image.
                        </SelectItem>
                        {supportedCrops.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {error && (
                  <p
                    role="alert"
                    className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm font-medium text-destructive"
                  >
                    {error}
                  </p>
                )}

                {stage === "idle" && <ImageUploader onSelect={selectFile} />}

                {stage === "preview" && file && previewUrl && (
                  <ImagePreview
                    file={file}
                    previewUrl={previewUrl}
                    onRemove={reset}
                    onChange={reset}
                    onAnalyze={analyze}
                  />
                )}

                {stage === "loading" && <AnalysisLoader activeStep={step} />}

                {stage === "error" && (
                  <ErrorState onRetry={analyze} onUploadAnother={reset} />
                )}

                {stage === "result" && result && (
                  <AnalysisResult
                    result={result}
                    previewUrl={previewUrl ?? undefined}
                    onReset={reset}
                  />
                )}
              </div>
            </section>

            <UploadTips />
          </div>

          <aside className="space-y-6">
            {stage === "idle" && (
              <section className="flex flex-col items-center rounded-2xl border border-border bg-muted/30 px-5 py-8 text-center">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Leaf className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-foreground">
                  Start by uploading a crop leaf image
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  CropGenius will analyze the image when the AI service is connected.
                </p>
              </section>
            )}

            <section className="rounded-2xl border border-border bg-card p-5">
              <h3 className="flex items-center gap-2 font-display text-base font-semibold text-foreground">
                <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <ShieldQuestion className="size-4" aria-hidden="true" />
                </span>
                Coverage in this project scope
              </h3>
              <ul className="mt-3 space-y-2 text-sm">
                {supportedCrops.map((c) => (
                  <li key={c} className="flex flex-wrap items-baseline gap-x-2">
                    <span className="font-medium text-foreground">{c}</span>
                    <span className="text-muted-foreground">
                      {supportedDiseases[c].join(", ")}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
              <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
              Only upload crop images that you are comfortable processing through the CropGenius
              service.
            </p>
          </aside>
        </div>
      </div>
    </DashboardShell>
  );
}
