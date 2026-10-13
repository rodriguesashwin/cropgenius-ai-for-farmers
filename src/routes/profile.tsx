import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ChevronRight, MapPin, Save, Sprout, UserRound } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

const title = "Farmer Profile | CropGenius";
const description = "Manage your farmer profile and farm details on this device.";

type FarmerProfile = { fullName: string; phone: string; email: string; village: string; district: string; state: string; farmSize: string; farmUnit: string; crops: string; language: string };
const initial: FarmerProfile = { fullName: "", phone: "", email: "", village: "", district: "", state: "Karnataka", farmSize: "", farmUnit: "acres", crops: "", language: "English" };
const storageKey = "cropgenius-profile-v1";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [
    { title }, { name: "description", content: description },
    { property: "og:title", content: title }, { property: "og:description", content: description },
  ] }),
  component: ProfilePage,
});

function ProfilePage() {
  const [profile, setProfile] = useState<FarmerProfile>(initial);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) setProfile({ ...initial, ...JSON.parse(stored) as Partial<FarmerProfile> });
    } catch { /* Keep the blank form if browser storage is unavailable. */ }
  }, []);

  function update<K extends keyof FarmerProfile>(key: K, value: FarmerProfile[K]) {
    setProfile((current) => ({ ...current, [key]: value }));
    setSaved(false);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(profile));
      setSaved(true);
    } catch {
      setSaved(false);
    }
  }

  const initials = profile.fullName.trim().split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0].toUpperCase()).join("") || "F";

  return (
    <DashboardShell title="Farmer Profile">
      <div className="animate-rise space-y-6">
        <header className="space-y-3"><nav aria-label="Breadcrumb"><ol className="flex items-center gap-1 text-xs text-muted-foreground">
          <li><Link to="/dashboard" className="hover:text-primary">Dashboard</Link></li><ChevronRight className="size-3.5" aria-hidden="true" /><li className="font-medium text-foreground">Profile</li>
        </ol></nav><p className="eyebrow">YOUR ACCOUNT DETAILS</p><h1 className="font-display text-2xl font-semibold sm:text-3xl">Farmer Profile</h1><p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{description}</p></header>

        <section className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:p-6">
          <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 font-display text-xl font-semibold text-primary">{initials}</span>
          <div className="min-w-0 flex-1"><h2 className="font-display text-xl font-semibold">{profile.fullName.trim() || "Your name"}</h2><p className="mt-1 text-sm text-muted-foreground">{profile.email || "Add your email address"} </p><p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="size-3.5" aria-hidden="true" />{[profile.village, profile.district, profile.state].filter(Boolean).join(", ") || "Farm location not set"}</p></div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs text-muted-foreground"><UserRound className="size-3.5" aria-hidden="true" />Local profile</span>
        </section>

        <form onSubmit={submit} className="space-y-6">
          <section className="rounded-2xl border border-border bg-card p-5 sm:p-6"><div className="mb-5 flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><UserRound className="size-5" aria-hidden="true" /></span><div><h2 className="font-display font-semibold">Personal information</h2><p className="text-xs text-muted-foreground">Basic contact details</p></div></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name"><input value={profile.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Enter your full name" autoComplete="name" className={inputClass} /></Field>
              <Field label="Phone number"><input value={profile.phone} onChange={(e) => update("phone", e.target.value)} placeholder="Enter phone number" inputMode="tel" autoComplete="tel" className={inputClass} /></Field>
              <Field label="Email address"><input type="email" value={profile.email} onChange={(e) => update("email", e.target.value)} placeholder="name@example.com" autoComplete="email" className={inputClass} /></Field>
              <Field label="Preferred language"><select value={profile.language} onChange={(e) => update("language", e.target.value)} className={inputClass}><option>English</option><option>ಕನ್ನಡ (Kannada)</option><option>हिन्दी (Hindi)</option></select></Field>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-5 sm:p-6"><div className="mb-5 flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><Sprout className="size-5" aria-hidden="true" /></span><div><h2 className="font-display font-semibold">Farm details</h2><p className="text-xs text-muted-foreground">Help personalize future farming features</p></div></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Village / town"><input value={profile.village} onChange={(e) => update("village", e.target.value)} placeholder="Village or town" className={inputClass} /></Field>
              <Field label="District"><input value={profile.district} onChange={(e) => update("district", e.target.value)} placeholder="District" className={inputClass} /></Field>
              <Field label="State"><select value={profile.state} onChange={(e) => update("state", e.target.value)} className={inputClass}><option>Karnataka</option><option>Kerala</option><option>Goa</option><option>Tamil Nadu</option><option>Maharashtra</option><option>Andhra Pradesh</option><option>Telangana</option><option>Other</option></select></Field>
              <Field label="Farm size"><div className="flex gap-2"><input type="number" min="0" step="0.01" value={profile.farmSize} onChange={(e) => update("farmSize", e.target.value)} placeholder="e.g. 2.5" className={inputClass} /><select aria-label="Farm size unit" value={profile.farmUnit} onChange={(e) => update("farmUnit", e.target.value)} className="w-28 rounded-xl border border-input bg-background px-3 text-sm"><option value="acres">Acres</option><option value="hectares">Hectares</option></select></div></Field>
              <div className="sm:col-span-2"><Field label="Crops grown"><textarea value={profile.crops} onChange={(e) => update("crops", e.target.value)} rows={3} placeholder="List crops you grow, separated by commas" className={inputClass} /></Field></div>
            </div>
          </section>

          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-muted/30 p-4 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-xl text-xs leading-relaxed text-muted-foreground">Preview: profile details are saved in this browser only. They are not sent to a server or synced to another device.</p><div className="flex items-center gap-3">{saved && <span role="status" className="inline-flex items-center gap-1 text-xs font-medium text-primary"><Check className="size-4" aria-hidden="true" />Saved on this device</span>}<button type="submit" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2 text-sm font-medium text-primary-foreground"><Save className="size-4" aria-hidden="true" />Save profile</button></div></div>
        </form>
      </div>
    </DashboardShell>
  );
}

const inputClass = "min-h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring";
function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="block space-y-1.5 text-sm font-medium text-foreground"><span>{label}</span>{children}</label>;
}
