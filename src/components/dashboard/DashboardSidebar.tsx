import { Link, useRouterState } from "@tanstack/react-router";
import { LogOut, Sprout } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { primaryNav, secondaryNav, type DashboardNavItem } from "@/data/dashboard";

type SidebarProps = {
  collapsed?: boolean;
  onNavigate?: (() => void) | undefined;
};

function NavLink({
  item,
  collapsed,
  active,
  onNavigate,
}: {
  item: DashboardNavItem;
  collapsed: boolean;
  active: boolean;
  onNavigate?: (() => void) | undefined;
}) {
  const Icon = item.icon;
  return (
    <Link
      to={item.to}
      onClick={onNavigate}
      title={collapsed ? item.label : undefined}
      className={cn(
        "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200",
        collapsed && "justify-center px-0",
        active
          ? "bg-primary/10 text-primary shadow-[inset_2px_0_0_0_var(--primary)]"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      <Icon
        className={cn(
          "size-4.5 shrink-0 transition-transform duration-200 group-hover:scale-110",
          active && "text-primary",
        )}
        aria-hidden="true"
      />
      {!collapsed && <span className="truncate">{item.label}</span>}
    </Link>
  );
}

export function DashboardSidebar({ collapsed = false, onNavigate }: SidebarProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex h-full flex-col bg-card">
      <div
        className={cn(
          "flex items-center gap-2.5 border-b border-border px-4 py-4",
          collapsed && "justify-center px-0",
        )}
      >
        <span className="gradient-field flex size-9 shrink-0 items-center justify-center rounded-xl text-primary-foreground">
          <Sprout className="size-4.5" aria-hidden="true" />
        </span>
        {!collapsed && (
          <span className="min-w-0">
            <span className="block font-display text-base leading-tight font-semibold text-foreground">
              CropGenius
            </span>
            <span className="block truncate text-[0.7rem] tracking-wide text-muted-foreground">
              Smart Agriculture Platform
            </span>
          </span>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {primaryNav.map((item) => (
          <NavLink
            key={item.to}
            item={item}
            collapsed={collapsed}
            active={pathname === item.to}
            onNavigate={onNavigate}
          />
        ))}
      </nav>

      <div className="space-y-1 border-t border-border p-3">
        {secondaryNav.map((item) => (
          <NavLink
            key={item.to}
            item={item}
            collapsed={collapsed}
            active={pathname === item.to}
            onNavigate={onNavigate}
          />
        ))}
        <button
          type="button"
          onClick={() => toast.info("Logout will be connected to the CropGenius backend later.")}
          title={collapsed ? "Logout" : undefined}
          className={cn(
            "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive",
            collapsed && "justify-center px-0",
          )}
        >
          <LogOut
            className="size-4.5 shrink-0 transition-transform duration-200 group-hover:scale-110"
            aria-hidden="true"
          />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}
