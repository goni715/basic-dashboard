"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Users,
  Stethoscope,
  KeyRound,
  Calendar,
  FileText,
  Link2,
  Hotel,
  Lightbulb,
  PlaySquare,
  Settings,
  Globe,
  Bell,
  BookOpen,
  HelpCircle,
  ChevronDown,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { clearSession } from "@/helpers/SessionHelper";

interface SubNavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: SubNavItem[];
}

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Hospitals", href: "/hospitals", icon: Building2 },
  { name: "Patients", href: "/patients", icon: Users },
  { name: "Doctors", href: "/doctors", icon: Stethoscope },
  { name: "Doctor Access", href: "/doctor-access", icon: KeyRound },
  { name: "Appointments", href: "/appointments", icon: Calendar },
  { name: "Medical Reports", href: "/reports", icon: FileText },
  { name: "Medicines", href: "/medicines", icon: Link2 },
  { name: "Hotels", href: "/hotels", icon: Hotel },
  { name: "Health Tips", href: "/health-tips", icon: Lightbulb },
  { name: "Tutorials", href: "/tutorials", icon: PlaySquare },
  {
    name: "Settings",
    href: "/settings/general",
    icon: Settings,
    children: [
      { name: "General", href: "/settings/general", icon: Settings },
      { name: "Countries & Languages", href: "/settings/countries-languages", icon: Globe },
      { name: "Notifications", href: "/settings/notifications", icon: Bell },
      { name: "Legal & Support", href: "/settings/legal-support", icon: BookOpen },
      { name: "FAQs", href: "/settings/faqs", icon: HelpCircle },
    ],
  },
];

export default function Sidebar({
  hideMobile,
  hideDesktop,
}: {
  hideMobile?: boolean;
  hideDesktop?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [settingsExpanded, setSettingsExpanded] = useState(false);

  // Auto-expand Settings whenever the user is on any /settings route
  useEffect(() => {
    if (pathname.startsWith("/settings")) {
      setSettingsExpanded(true);
    }
  }, [pathname]);

  const handleLogout = () => {
    clearSession();
    router.push("/login");
  };

  const NavContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex h-[88px] items-center gap-3 px-6 border-b border-slate-100 shrink-0 justify-center">
        <img src="/logo.jpeg" alt="3S Medicare Logo" className="h-14 w-auto object-contain" />
      </div>

      <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-1 px-4 scrollbar-hide">
        {navItems.map((item) => {
          const hasChildren = Boolean(item.children && item.children.length > 0);
          const isSectionActive =
            pathname === item.href ||
            (item.href === "/" && pathname === "/") ||
            (hasChildren && pathname.startsWith("/settings"));

          const Icon = item.icon;

          if (hasChildren) {
            return (
              <div key={item.name} className="flex flex-col">
                <button
                  type="button"
                  onClick={() => setSettingsExpanded((prev) => !prev)}
                  className={cn(
                    "w-full flex items-center justify-between rounded-xl px-4 py-[13px] text-[15px] font-medium transition-all text-left",
                    isSectionActive
                      ? "bg-slate-100 text-slate-900 font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn("h-[20px] w-[20px]", isSectionActive ? "text-blue-600" : "text-slate-500")} />
                    <span>{item.name}</span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-slate-400 transition-transform duration-200",
                      settingsExpanded && "rotate-180 text-slate-700"
                    )}
                  />
                </button>

                {/* Submenu items */}
                {settingsExpanded && (
                  <div className="mt-1 ml-5 pl-3 border-l-2 border-slate-200/80 flex flex-col gap-1 py-1">
                    {item.children?.map((subItem) => {
                      const isSubActive =
                        pathname === subItem.href ||
                        (subItem.href === "/settings/general" && pathname === "/settings");
                      const SubIcon = subItem.icon;

                      return (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] transition-all",
                            isSubActive
                              ? "bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold shadow-xs shadow-blue-500/20"
                              : "text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium"
                          )}
                        >
                          <SubIcon className={cn("h-4 w-4 shrink-0", isSubActive ? "text-white" : "text-slate-400")} />
                          <span className="truncate">{subItem.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          const isActive = pathname === item.href || (pathname === "/" && item.name === "Dashboard");

          return (
            <Link key={item.name} href={item.href} onClick={() => setOpen(false)}>
              <div
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-[14px] text-[15px] font-medium transition-colors",
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-teal-400 text-white shadow-sm shadow-blue-500/20"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <Icon className="h-[20px] w-[20px]" />
                {item.name}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {!hideDesktop && (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-white flex-col hidden md:flex">
          <NavContent />
        </aside>
      )}

      {!hideMobile && (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden shrink-0" />}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <NavContent />
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
