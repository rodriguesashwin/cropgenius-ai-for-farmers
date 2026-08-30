import { createFileRoute } from "@tanstack/react-router";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { FeaturePlaceholder } from "@/components/dashboard/FeaturePlaceholder";
import { featurePages } from "@/data/dashboard";

const page = featurePages["/market"]!;
const title = `${page.title} | CropGenius`;

export const Route = createFileRoute("/market")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: page.description },
      { property: "og:title", content: title },
      { property: "og:description", content: page.description },
      { property: "og:type", content: "website" },
    ],
  }),
  component: FeatureRoute,
});

function FeatureRoute() {
  return (
    <DashboardShell title={page.title}>
      <FeaturePlaceholder icon={page.icon} title={page.title} description={page.description} />
    </DashboardShell>
  );
}
