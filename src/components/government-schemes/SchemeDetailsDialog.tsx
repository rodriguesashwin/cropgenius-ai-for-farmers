import { ExternalLink, FileCheck2, FileText, Info, Landmark, ListChecks, MapPin, Sprout, UsersRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { GovernmentScheme } from "@/data/government-schemes";

export function SchemeDetailsDialog({ scheme, onClose }: {
  scheme: GovernmentScheme | null;
  onClose: () => void;
}) {
  return <Dialog open={Boolean(scheme)} onOpenChange={(open) => { if (!open) onClose(); }}>
    <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
      {scheme ? <>
        <DialogHeader className="pr-7 text-left">
          <div className="flex flex-wrap items-center gap-2 text-sm text-primary"><Landmark className="size-4" aria-hidden="true" />{scheme.category}<span aria-hidden="true">·</span>{scheme.state ?? "Coverage not specified"}</div>
          <DialogTitle className="font-display text-2xl leading-tight">{scheme.name}</DialogTitle>
          <DialogDescription>{scheme.description}</DialogDescription>
        </DialogHeader>
        <div className="mt-2 space-y-5">
          <DetailSection icon={Sprout} title="About the scheme"><p>{scheme.description}</p></DetailSection>
          <DetailSection icon={FileCheck2} title="Benefits"><BulletList items={scheme.benefits} empty="Verified benefit details are not available." /></DetailSection>
          <DetailSection icon={UsersRound} title="Eligibility"><BulletList items={scheme.eligibility} empty="Please check the official source for eligibility requirements." /></DetailSection>
          <DetailSection icon={UsersRound} title="Who can apply"><BulletList items={scheme.whoCanApply} empty="Applicant details have not been verified." /></DetailSection>
          <DetailSection icon={FileText} title="Required documents"><BulletList items={scheme.documents} empty="Document requirements have not been verified." /></DetailSection>
          <DetailSection icon={ListChecks} title="Application process"><BulletList items={scheme.applicationProcess} empty="Application steps have not been verified." /></DetailSection>
          <DetailSection icon={Info} title="Important notes"><BulletList items={scheme.importantNotes} empty="No additional notes are available." /></DetailSection>
          <DetailSection icon={MapPin} title="Official source"><p>{scheme.sourceName ?? "Official source not provided."}</p></DetailSection>
          <p className="text-xs text-muted-foreground">Last updated: {scheme.lastUpdated ?? "Not available"}</p>
          {scheme.officialUrl ? <Button asChild className="min-h-11 w-full sm:w-auto"><a href={scheme.officialUrl} target="_blank" rel="noreferrer">Apply / Visit official portal<ExternalLink aria-hidden="true" /></a></Button> : <Button disabled className="min-h-11 w-full sm:w-auto">Official application link unavailable</Button>}
          <Button type="button" variant="outline" className="min-h-11 w-full sm:ml-2 sm:w-auto" onClick={onClose}>Back to schemes</Button>
        </div>
      </> : null}
    </DialogContent>
  </Dialog>;
}

function DetailSection({ icon: Icon, title, children }: {
  icon: typeof Sprout;
  title: string;
  children: React.ReactNode;
}) {
  return <section className="border-t border-border pt-4">
    <h3 className="flex items-center gap-2 font-display font-semibold"><Icon className="size-4 text-primary" aria-hidden="true" />{title}</h3>
    <div className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</div>
  </section>;
}

function BulletList({ items, empty }: { items: string[]; empty: string }) {
  return items.length ? <ul className="list-disc space-y-1 pl-5">{items.map((item) => <li key={item}>{item}</li>)}</ul> : <p>{empty}</p>;
}