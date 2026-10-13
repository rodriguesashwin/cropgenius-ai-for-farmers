import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, Check, ChevronRight, Globe2, RotateCcw, Save, ShieldCheck, SunMoon } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { readAppLanguage, setAppLanguage, type AppLanguage } from "@/lib/language";

const title = "Settings | CropGenius";
const description = "Adjust CropGenius display, language and notification preferences.";
type Preferences = { language: string; temperature: string; notifications: boolean; weatherAlerts: boolean; marketUpdates: boolean; compactCards: boolean };
const defaults: Preferences = { language: "English", temperature: "celsius", notifications: true, weatherAlerts: true, marketUpdates: false, compactCards: false };
const storageKey = "cropgenius-settings-v1";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const [preferences, setPreferences] = useState<Preferences>(defaults);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) {
        const parsed = { ...defaults, ...JSON.parse(stored) as Partial<Preferences> };
        setPreferences(parsed);
        const language: AppLanguage = parsed.language.includes("Kannada") ? "Kannada" : parsed.language.includes("Hindi") ? "Hindi" : readAppLanguage();
        setAppLanguage(language);
        return;
      }
    } catch { /* Keep defaults if browser storage is unavailable. */ }
    const sharedLanguage = readAppLanguage();
    const label = sharedLanguage === "Kannada" ? "ಕನ್ನಡ (Kannada)" : sharedLanguage === "Hindi" ? "हिन्दी (Hindi)" : "English";
    setPreferences((current) => ({ ...current, language: label }));
  }, []);
  function update<K extends keyof Preferences>(key: K, value: Preferences[K]) {
    setPreferences((current) => ({ ...current, [key]: value }));
    setSaved(false);
  }
  function save() {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(preferences));
      const language: AppLanguage = preferences.language.includes("Kannada") ? "Kannada" : preferences.language.includes("Hindi") ? "Hindi" : "English";
      setAppLanguage(language);
      setSaved(true);
    } catch { setSaved(false); }
  }
  function reset() { setPreferences(defaults); setSaved(false); setAppLanguage("English"); try { window.localStorage.setItem(storageKey, JSON.stringify(defaults)); } catch { /* Defaults remain active for this page. */ } }
  return (
    <DashboardShell title="Settings">
      <div className="animate-rise space-y-6">
        <header className="space-y-3"><nav aria-label="Breadcrumb"><ol className="flex items-center gap-1 text-xs text-muted-foreground"><li><Link to="/dashboard" className="hover:text-primary">Dashboard</Link></li><ChevronRight className="size-3.5" aria-hidden="true" /><li className="font-medium text-foreground">Settings</li></ol></nav><p className="eyebrow">PERSONALIZE YOUR EXPERIENCE</p><h1 className="font-display text-2xl font-semibold sm:text-3xl">Settings</h1><p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{description}</p></header>
        <div className="rounded-xl border border-amber-500/25 bg-amber-500/5 p-4"><div className="flex items-start gap-3"><ShieldCheck className="mt-0.5 size-5 shrink-0 text-amber-600" aria-hidden="true" /><div><p className="text-sm font-semibold">Local preference preview</p><p className="mt-1 text-sm leading-relaxed text-muted-foreground">Settings are saved in this browser only. Language selection updates shared navigation and the page language metadata. Other page content is still being translated, and notification options do not send alerts until those services are connected.</p></div></div></div>
        <section className="rounded-2xl border border-border bg-card p-5 sm:p-6"><div className="mb-5 flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><Globe2 className="size-5" aria-hidden="true" /></span><div><h2 className="font-display font-semibold">Language and display</h2><p className="text-xs text-muted-foreground">Choose your preferred information format</p></div></div>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-1.5 text-sm font-medium"><span>Preferred language</span><select value={preferences.language} onChange={(e) => update("language", e.target.value)} className={selectClass}><option>English</option><option>ಕನ್ನಡ (Kannada)</option><option>हिन्दी (Hindi)</option></select><span className="block text-xs font-normal text-muted-foreground">Shared navigation is translated now; remaining page content is still in progress.</span></label>
            <label className="space-y-1.5 text-sm font-medium"><span className="flex items-center gap-2"><SunMoon className="size-4 text-muted-foreground" aria-hidden="true" />Temperature units</span><select value={preferences.temperature} onChange={(e) => update("temperature", e.target.value)} className={selectClass}><option value="celsius">Celsius (°C)</option><option value="fahrenheit">Fahrenheit (°F)</option></select><span className="block text-xs font-normal text-muted-foreground">Applies when weather data integration is available.</span></label>
            <Toggle label="Compact information cards" detail="Prefer a more compact card layout where supported." checked={preferences.compactCards} onChange={(v) => update("compactCards", v)} />
          </div>
        </section>
        <section className="rounded-2xl border border-border bg-card p-5 sm:p-6"><div className="mb-5 flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><Bell className="size-5" aria-hidden="true" /></span><div><h2 className="font-display font-semibold">Notifications</h2><p className="text-xs text-muted-foreground">Choose the updates you may want to receive later</p></div></div>
          <div className="space-y-4"><Toggle label="Enable notifications" detail="Master preference for future CropGenius notifications." checked={preferences.notifications} onChange={(v) => setPreferences((p) => ({ ...p, notifications: v, weatherAlerts: v && p.weatherAlerts, marketUpdates: v && p.marketUpdates }))} />
            <div className="ml-1 space-y-4 border-l-2 border-border pl-4"><Toggle label="Weather alerts" detail="Future alerts for relevant weather conditions." checked={preferences.weatherAlerts} disabled={!preferences.notifications} onChange={(v) => update("weatherAlerts", v)} /><Toggle label="Market updates" detail="Future updates when market records change." checked={preferences.marketUpdates} disabled={!preferences.notifications} onChange={(v) => update("marketUpdates", v)} /></div>
          </div>
        </section>
        <section className="flex flex-col gap-3 rounded-2xl border border-border bg-muted/30 p-4 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs leading-relaxed text-muted-foreground">Your preferences stay on this device until browser data is cleared.</p><div className="flex flex-wrap items-center gap-2">{saved && <span role="status" className="inline-flex items-center gap-1 text-xs font-medium text-primary"><Check className="size-4" aria-hidden="true" />Saved</span>}<button type="button" onClick={reset} className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-medium"><RotateCcw className="size-4" aria-hidden="true" />Reset</button><button type="button" onClick={save} className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground"><Save className="size-4" aria-hidden="true" />Save settings</button></div></section>
      </div>
    </DashboardShell>
  );
}

const selectClass = "min-h-10 w-full rounded-xl border border-input bg-background px-3 text-sm font-normal outline-none focus-visible:ring-2 focus-visible:ring-ring";
function Toggle({ label, detail, checked, onChange, disabled = false }: { label: string; detail: string; checked: boolean; onChange: (value: boolean) => void; disabled?: boolean }) {
  return <label className={`flex items-start justify-between gap-4 ${disabled ? "opacity-50" : "cursor-pointer"}`}><span><span className="block text-sm font-medium">{label}</span><span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{detail}</span></span><input type="checkbox" checked={checked} disabled={disabled} onChange={(e) => onChange(e.target.checked)} className="mt-1 size-4 shrink-0 accent-primary" /></label>;
}
