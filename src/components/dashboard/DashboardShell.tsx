import { useState, type ReactNode } from "react";

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { cn } from "@/lib/utils";

export function DashboardShell({ title, children }: { title: string; children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside
        className={cn(
          "sticky top-0 h-screen shrink-0 border-r border-border transition-[width] duration-300 ease-out max-lg:hidden",
          collapsed ? "w-[4.5rem]" : "w-64",
        )}
      >
        <DashboardSidebar collapsed={collapsed} />
      </aside>

      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <SheetTitle className="sr-only">CropGenius navigation</SheetTitle>
          <DashboardSidebar onNavigate={() => setDrawerOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader
          title={title}
          onToggleSidebar={() => setCollapsed((v) => !v)}
          onOpenDrawer={() => setDrawerOpen(true)}
        />
        <main className="animate-rise flex-1 px-4 py-6 sm:px-6 sm:py-8">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
