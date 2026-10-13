import { Link } from "@tanstack/react-router";
import { Bell, ChevronDown, LogOut, Menu, PanelLeft, Settings, User } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useAppLanguage } from "@/lib/language";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type HeaderProps = {
  title: string;
  onToggleSidebar: () => void;
  onOpenDrawer: () => void;
};

export function DashboardHeader({ title, onToggleSidebar, onOpenDrawer }: HeaderProps) {
  const { t } = useAppLanguage();
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-card/85 px-4 backdrop-blur-md sm:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onOpenDrawer}
        aria-label={t("Open navigation menu")}
      >
        <Menu className="size-5" aria-hidden="true" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="max-lg:hidden"
        onClick={onToggleSidebar}
        aria-label={t("Toggle sidebar")}
      >
        <PanelLeft className="size-5" aria-hidden="true" />
      </Button>

      <h1 className="truncate font-display text-base font-semibold text-foreground sm:text-lg">
        {title}
      </h1>

      <div className="ml-auto flex items-center gap-1 sm:gap-2">
        <Button
          variant="ghost"
          size="icon"
          aria-label={t("Notifications")}
          onClick={() => toast.info("Notifications will appear here once connected.")}
        >
          <Bell className="size-5 transition-transform hover:scale-110" aria-hidden="true" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-2 rounded-full border border-border py-1 pr-2 pl-1 transition-colors hover:bg-muted"
            >
              <span className="gradient-field flex size-8 items-center justify-center rounded-full text-xs font-semibold text-primary-foreground">
                <User className="size-4" aria-hidden="true" />
              </span>
              <span className="text-sm font-medium text-foreground max-sm:hidden">{t("Farmer")}</span>
              <ChevronDown className="size-4 text-muted-foreground" aria-hidden="true" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem asChild>
              <Link to="/profile" className="flex items-center gap-2">
                <User className="size-4" aria-hidden="true" /> {t("Profile")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings" className="flex items-center gap-2">
                <Settings className="size-4" aria-hidden="true" /> {t("Settings")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                toast.info("Logout will be connected to the CropGenius backend later.")
              }
              className="flex items-center gap-2 text-destructive"
            >
              <LogOut className="size-4" aria-hidden="true" /> {t("Logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
