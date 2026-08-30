import { useRef, useState } from "react";
import { ImageUp, Leaf } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ImageUploader({ onSelect }: { onSelect: (file: File) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) onSelect(file);
      }}
      className={cn(
        "animate-rise relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-all duration-300 sm:py-14",
        dragging
          ? "border-primary bg-primary/10 scale-[1.01]"
          : "border-border bg-muted/40 hover:border-primary/50 hover:bg-primary/5",
      )}
    >
      <span className="gradient-field flex size-16 items-center justify-center rounded-2xl text-primary-foreground shadow-[var(--shadow-card)]">
        <Leaf className="size-8" aria-hidden="true" />
      </span>
      <p className="mt-5 font-display text-lg font-semibold text-foreground">
        Drag &amp; drop your image here
      </p>
      <p className="mt-1 text-xs tracking-wide text-muted-foreground uppercase">or</p>
      <Button className="mt-3 transition-transform hover:scale-[1.03]" onClick={() => inputRef.current?.click()}>
        <ImageUp className="size-4" aria-hidden="true" />
        Browse Image
      </Button>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onSelect(file);
          e.target.value = "";
        }}
      />
      <p className="mt-6 text-xs text-muted-foreground">Supported formats: JPG, JPEG, PNG</p>
      <p className="text-xs text-muted-foreground">Maximum file size: 10 MB</p>
    </div>
  );
}
