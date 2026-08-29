import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Sprout } from "lucide-react";

type AuthLayoutProps = {
  image: string;
  imageAlt: string;
  panelTitle: string;
  panelSubtitle: string;
  children: ReactNode;
};

export function AuthLayout({
  image,
  imageAlt,
  panelTitle,
  panelSubtitle,
  children,
}: AuthLayoutProps) {
  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-2">
      {/* Visual panel */}
      <div className="animate-reveal relative isolate overflow-hidden max-lg:h-52 sm:max-lg:h-64">
        <img
          src={image}
          alt={imageAlt}
          className="absolute inset-0 -z-20 size-full object-cover"
        />
        <div
          className="absolute inset-0 -z-10"
          style={{ background: "var(--overlay-auth)" }}
          aria-hidden="true"
        />
        <div className="flex h-full flex-col justify-between p-6 sm:p-10">
          <Link to="/" className="flex w-fit items-center gap-2.5">
            <span className="gradient-field flex size-9 items-center justify-center rounded-xl text-primary-foreground">
              <Sprout className="size-4.5" aria-hidden="true" />
            </span>
            <span className="font-display text-lg font-semibold text-primary-foreground">
              CropGenius
            </span>
          </Link>
          <div className="max-lg:hidden">
            <h2 className="font-display text-3xl leading-tight font-semibold text-primary-foreground xl:text-4xl">
              {panelTitle}
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-primary-foreground/85">
              {panelSubtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex flex-col px-6 py-8 sm:px-12 sm:py-10 lg:justify-center">
        <div className="mx-auto w-full max-w-md">
          <Link
            to="/"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft
              className="size-4 transition-transform group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
            Back to Home
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
}
