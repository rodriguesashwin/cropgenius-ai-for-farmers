import { createFileRoute } from "@tanstack/react-router";
import { User } from "lucide-react";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { FeaturePlaceholder } from "@/components/dashboard/FeaturePlaceholder";

const title = "Profile | CropGenius";
const description = "Manage your CropGenius farmer profile and farm details.";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <DashboardShell title="Profile">
      <FeaturePlaceholder icon={User} title="Profile" description={description} />
    </DashboardShell>
  );
}
