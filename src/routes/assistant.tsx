import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Bot, ChevronRight, CloudSun, Leaf, MessageCircle, Send, ShieldCheck, Sprout, TrendingUp, UserRound } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

const title = "AI Farmer Assistant | CropGenius";
const description = "Ask agriculture-related questions through the CropGenius farmer assistant interface.";

export const Route = createFileRoute("/assistant")({
  head: () => ({ meta: [
    { title }, { name: "description", content: description },
    { property: "og:title", content: title }, { property: "og:description", content: description },
  ] }),
  component: AssistantPage,
});

const prompts = [
  { icon: Leaf, title: "Crop health", prompt: "What should I check when my crop leaves start turning yellow?" },
  { icon: CloudSun, title: "Weather planning", prompt: "How can I plan farm work around a weather forecast?" },
  { icon: TrendingUp, title: "Market prices", prompt: "What should I check before selling my crop at a market?" },
  { icon: Sprout, title: "Crop care", prompt: "What details should I consider before choosing a crop?" },
];

function AssistantPage() {
  const [question, setQuestion] = useState("");
  const [submitted, setSubmitted] = useState<string[]>([]);
  const [notice, setNotice] = useState("");

  function submitQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = question.trim();
    if (!text) return;
    setSubmitted((items) => [...items, text]);
    setQuestion("");
    setNotice("Your question is displayed in this preview. The AI service is not connected yet, so CropGenius has not generated an answer.");
  }

  return (
    <DashboardShell title="AI Farmer Assistant">
      <div className="animate-rise space-y-6">
        <header className="space-y-3">
          <nav aria-label="Breadcrumb"><ol className="flex items-center gap-1 text-xs text-muted-foreground">
            <li><Link to="/dashboard" className="hover:text-primary">Dashboard</Link></li><ChevronRight className="size-3.5" aria-hidden="true" /><li className="font-medium text-foreground">AI Farmer Assistant</li>
          </ol></nav>
          <div className="flex items-start gap-3">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Bot className="size-6" aria-hidden="true" /></span>
            <div><p className="eyebrow">YOUR FARMING COMPANION</p><h1 className="mt-1 font-display text-2xl font-semibold sm:text-3xl">AI Farmer Assistant</h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">Prepare a question about crops, plant health, weather or agricultural services.</p></div>
          </div>
        </header>

        <div className="rounded-xl border border-amber-500/25 bg-amber-500/5 p-4">
          <div className="flex items-start gap-3"><ShieldCheck className="mt-0.5 size-5 shrink-0 text-amber-600" aria-hidden="true" />
            <div><p className="text-sm font-semibold">Preview mode — AI not connected</p><p className="mt-1 text-sm leading-relaxed text-muted-foreground">The chat interface is ready for integration, but no AI model or API is configured yet. Questions submitted here are not sent to an AI service.</p></div>
          </div>
        </div>

        <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-3 border-b border-border p-4 sm:p-5">
            <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary"><Bot className="size-5" aria-hidden="true" /></span>
            <div className="flex-1"><h2 className="font-display font-semibold">CropGenius Assistant</h2><p className="text-xs text-muted-foreground">Agricultural help desk interface</p></div>
            <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">Preview</span>
          </div>
          <div className="space-y-5 p-4 sm:p-6">
            <div className="flex items-start gap-3"><span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><Bot className="size-4" aria-hidden="true" /></span>
              <div className="max-w-2xl rounded-2xl rounded-tl-sm bg-muted/70 p-4"><p className="text-sm leading-relaxed">Namaskara! You can prepare questions about crop health, weather planning, market information and farmer services. When the AI service is connected, this chat will return responses.</p></div>
            </div>
            {submitted.map((text, index) => <div key={index} className="space-y-3">
              <div className="flex justify-end gap-3"><div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-4 py-3 text-sm text-primary-foreground">{text}</div><span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground"><UserRound className="size-4" aria-hidden="true" /></span></div>
              <div className="flex items-start gap-3"><span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><Bot className="size-4" aria-hidden="true" /></span><div className="max-w-2xl rounded-2xl rounded-tl-sm border border-border p-4 text-sm leading-relaxed text-muted-foreground">AI response unavailable in preview mode. Connect the configured AI backend to receive an answer to this question.</div></div>
            </div>)}
            <form onSubmit={submitQuestion} className="flex flex-col gap-2 border-t border-border pt-4 sm:flex-row">
              <label className="sr-only" htmlFor="farmer-question">Your farming question</label>
              <input id="farmer-question" value={question} onChange={(event) => { setQuestion(event.target.value); setNotice(""); }} placeholder="Type your farming question…" maxLength={1000}
                className="min-h-11 min-w-0 flex-1 rounded-xl border border-input bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" />
              <button type="submit" disabled={!question.trim()} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"><Send className="size-4" aria-hidden="true" />Send question</button>
            </form>
            {notice && <p role="status" className="text-xs leading-relaxed text-muted-foreground">{notice}</p>}
            <p className="text-xs text-muted-foreground">For urgent crop disease concerns, consult a local agricultural officer or qualified agronomist.</p>
          </div>
        </section>

        <section className="space-y-3"><div><h2 className="font-display text-lg font-semibold">Start with a topic</h2><p className="mt-1 text-sm text-muted-foreground">Choose a prompt to place it in the message box.</p></div>
          <div className="grid gap-3 sm:grid-cols-2">
            {prompts.map(({ icon: Icon, title: promptTitle, prompt }) => <button key={promptTitle} type="button" onClick={() => { setQuestion(prompt); setNotice(""); }} className="group flex items-start gap-3 rounded-2xl border border-border bg-card p-4 text-left transition-colors hover:border-primary/40 hover:bg-primary/5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon className="size-5" aria-hidden="true" /></span><span><span className="block text-sm font-semibold">{promptTitle}</span><span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{prompt}</span></span><MessageCircle className="ml-auto size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
            </button>)}
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
