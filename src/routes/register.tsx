import { useMemo, useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Sprout, User } from "lucide-react";
import { toast } from "sonner";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { PasswordField } from "@/components/auth/PasswordField";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import registerImage from "@/assets/auth-register.jpg";

const title = "Create Account | CropGenius";
const description =
  "Create a CropGenius account to get AI-powered crop guidance, weather insights and farmer welfare support.";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
    ],
  }),
  component: RegisterPage,
});

function passwordStrength(password: string): { score: 0 | 1 | 2 | 3; label: string } {
  if (!password) return { score: 0, label: "" };
  let points = 0;
  if (password.length >= 8) points += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) points += 1;
  if (/\d/.test(password) || /[^A-Za-z0-9]/.test(password)) points += 1;
  if (password.length >= 12) points += 1;
  if (points <= 1) return { score: 1, label: "Weak" };
  if (points === 2) return { score: 2, label: "Fair" };
  return { score: 3, label: "Strong" };
}

const strengthColors = ["bg-border", "bg-destructive", "bg-accent", "bg-primary"];

function Field({
  id,
  label,
  icon: Icon,
  ...props
}: {
  id: string;
  label: string;
  icon: typeof Mail;
} & React.ComponentProps<typeof Input>) {
  return (
    <div className="auth-stagger space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="group relative">
        <Icon
          className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
          aria-hidden="true"
        />
        <Input id={id} required className="h-11 rounded-xl pl-10 transition-shadow focus-visible:ring-2" {...props} />
      </div>
    </div>
  );
}

function RegisterPage() {
  const [password, setPassword] = useState("");
  const strength = useMemo(() => passwordStrength(password), [password]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.info("Registration will be connected to the CropGenius backend in the next phase.");
  };

  return (
    <AuthLayout
      image={registerImage}
      imageAlt="Indian farmers working in a misty green vegetable field"
      panelTitle="Join CropGenius"
      panelSubtitle="A smarter way of making agricultural decisions."
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
          Create Your CropGenius Account
        </h1>
        <p
          className="animate-rise mt-2 text-sm leading-relaxed text-muted-foreground"
          style={{ animationDelay: "180ms" }}
        >
          Join a smarter way of making agricultural decisions.
        </p>

        <form onSubmit={onSubmit} className="auth-form mt-8 space-y-5">
          <Field id="name" label="Full Name" icon={User} name="name" autoComplete="name" placeholder="Your full name" />
          <Field id="email" label="Email Address" icon={Mail} type="email" name="email" autoComplete="email" placeholder="farmer@example.com" />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="phone" label="Phone Number" icon={Phone} type="tel" name="phone" autoComplete="tel" placeholder="+91 98765 43210" />
            <Field id="location" label="Location" icon={MapPin} name="location" autoComplete="address-level2" placeholder="District, State" />
          </div>

          <div className="space-y-2">
            <PasswordField
              id="password"
              label="Password"
              name="password"
              autoComplete="new-password"
              required
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="space-y-0"
            />
            {strength.score > 0 ? (
              <div className="flex items-center gap-3 px-1 pb-1" aria-live="polite">
                <div className="flex flex-1 gap-1.5">
                  {[1, 2, 3].map((step) => (
                    <span
                      key={step}
                      className={cn(
                        "h-1.5 flex-1 rounded-full transition-colors duration-300",
                        step <= strength.score ? strengthColors[strength.score] : "bg-border",
                      )}
                    />
                  ))}
                </div>
                <span className="text-xs font-medium text-muted-foreground">{strength.label}</span>
              </div>
            ) : null}
          </div>

          <PasswordField
            id="confirm-password"
            label="Confirm Password"
            name="confirmPassword"
            autoComplete="new-password"
            required
            placeholder="Re-enter your password"
          />

          <div className="auth-stagger flex items-start gap-2.5">
            <Checkbox id="terms" name="terms" required className="mt-0.5" />
            <label htmlFor="terms" className="text-sm leading-relaxed text-muted-foreground">
              I agree to the{" "}
              <a href="#" onClick={(e) => e.preventDefault()} className="font-medium text-primary transition-colors hover:text-primary-deep">
                Terms and Conditions
              </a>
            </label>
          </div>

          <Button type="submit" size="lg" className="auth-stagger w-full">
            Create Account
          </Button>
        </form>

        <p
          className="animate-rise mt-7 text-center text-sm text-muted-foreground"
          style={{ animationDelay: "720ms" }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-primary transition-colors hover:text-primary-deep"
          >
            Sign In
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
