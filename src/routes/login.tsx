import type { FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Sprout } from "lucide-react";
import { toast } from "sonner";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { PasswordField } from "@/components/auth/PasswordField";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import loginImage from "@/assets/cta-field.jpg";

const title = "Sign In | CropGenius";
const description =
  "Sign in to CropGenius to access AI-powered crop guidance, weather insights and market awareness.";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.info("Authentication will be connected to the CropGenius backend in the next phase.");
  };

  return (
    <AuthLayout
      image={loginImage}
      imageAlt="Indian farmer walking through green crop fields at sunset"
      panelTitle="Welcome Back to CropGenius"
      panelSubtitle="Smart agricultural guidance, right at your fingertips."
    >
      <div className="mt-8">
        <div className="animate-rise flex items-center gap-2.5">
          <span className="gradient-field flex size-10 items-center justify-center rounded-xl text-primary-foreground">
            <Sprout className="size-5" aria-hidden="true" />
          </span>
          <span className="font-display text-xl font-semibold text-foreground">CropGenius</span>
        </div>

        <h1
          className="animate-rise mt-7 text-3xl font-semibold text-foreground"
          style={{ animationDelay: "100ms" }}
        >
          Welcome Back
        </h1>
        <p
          className="animate-rise mt-2 text-sm leading-relaxed text-muted-foreground"
          style={{ animationDelay: "180ms" }}
        >
          Sign in to continue to your CropGenius dashboard.
        </p>

        <form onSubmit={onSubmit} className="auth-form mt-8 space-y-5">
          <div className="auth-stagger space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="group relative">
              <Mail
                className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
                aria-hidden="true"
              />
              <Input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="farmer@example.com"
                required
                className="h-11 rounded-xl pl-10 transition-shadow focus-visible:ring-2"
              />
            </div>
          </div>

          <PasswordField id="password" label="Password" name="password" autoComplete="current-password" required placeholder="Enter your password" />

          <div className="auth-stagger flex items-center justify-between gap-3">
            <label
              htmlFor="remember"
              className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Checkbox id="remember" name="remember" />
              Remember me
            </label>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                toast.info("Password reset will be available once the backend is connected.");
              }}
              className="text-sm font-medium text-primary transition-colors hover:text-primary-deep"
            >
              Forgot Password?
            </a>
          </div>

          <Button type="submit" size="lg" className="auth-stagger w-full">
            Sign In
          </Button>
        </form>

        <p
          className="animate-rise mt-7 text-center text-sm text-muted-foreground"
          style={{ animationDelay: "560ms" }}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-primary transition-colors hover:text-primary-deep"
          >
            Create Account
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
