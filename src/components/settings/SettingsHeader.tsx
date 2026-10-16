"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Settings,
  Globe,
  Bell,
  BookOpen,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const settingsNavItems = [
  { name: "General", href: "/settings/general", icon: Settings },
  { name: "Countries & Languages", href: "/settings/countries-languages", icon: Globe },
  { name: "Notifications", href: "/settings/notifications", icon: Bell },
  { name: "Legal & Support", href: "/settings/legal-support", icon: BookOpen },
  { name: "FAQs", href: "/settings/faqs", icon: HelpCircle },
];

export default function SettingsHeader({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) {
  const pathname = usePathname();

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900">{title || "Settings"}</h1>
        <p className="text-slate-500 text-sm">
          {description || "Manage platform preferences, security, notifications, payment methods, and legal information."}
        </p>
      </div>

      <div className="flex items-center gap-2 border-b border-slate-200/80 overflow-x-auto scrollbar-hide pb-2 pt-1">
        {settingsNavItems.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon;

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={cn(
                "flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap",
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-sm shadow-blue-500/20 font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              )}
            >
              <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-white" : "text-slate-400")} />
              <span>{tab.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
