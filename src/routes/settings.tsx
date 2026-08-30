import { createFileRoute } from "@tanstack/react-router";
import { Settings } from "lucide-react";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { FeaturePlaceholder } from "@/components/dashboard/FeaturePlaceholder";

const title = "Settings | CropGenius";
const description = "Adjust your CropGenius preferences, language and notification settings.";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <DashboardShell title="Settings">
      <FeaturePlaceholder icon={Settings} title="Settings" description={description} />
    </DashboardShell>
  );
}
