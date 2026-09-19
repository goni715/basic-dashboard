"use client";

import { useState } from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  KeyRound,
  Stethoscope,
  Building2,
  Users,
  Calendar,
  FileText,
  Link2,
  Hotel,
  Lightbulb,
  PlaySquare,
  Settings,
  LogOut,
  HeartPulse,
  ClipboardList,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard, roles: ["admin"] },
  { name: "Dashboard", href: "/doctor", icon: LayoutDashboard, roles: ["doctor"] },
  { name: "Doctor Access", href: "/admin/doctor-access", icon: KeyRound, roles: ["admin"] },
  { name: "Doctors", href: "/admin/doctors", icon: Stethoscope, roles: ["admin"] },
  { name: "Hospitals", href: "/admin/hospitals", icon: Building2, roles: ["admin"] },
  { name: "Patients", href: "/admin/patients", icon: Users, roles: ["admin"] },
  { name: "Patients", href: "/doctor/patients", icon: Users, roles: ["doctor"] },
  { name: "Appointments", href: "/admin/appointments", icon: Calendar, roles: ["admin"] },
  { name: "Appointments", href: "/doctor/appointments", icon: Calendar, roles: ["doctor"] },
  { name: "Medical Reports", href: "/admin/reports", icon: FileText, roles: ["admin"] },
  { name: "Reports", href: "/doctor/reports", icon: FileText, roles: ["doctor"] },
  { name: "Consultation Notes", href: "/doctor/notes", icon: ClipboardList, roles: ["doctor"] },
  { name: "Medicines", href: "/admin/medicines", icon: Link2, roles: ["admin"] },
  { name: "Hotels", href: "/admin/hotels", icon: Hotel, roles: ["admin"] },
  { name: "Health Tips", href: "/admin/health-tips", icon: Lightbulb, roles: ["admin"] },
  { name: "Tutorials", href: "/admin/tutorials", icon: PlaySquare, roles: ["admin"] },
  { name: "Settings", href: "/admin/settings", icon: Settings, roles: ["admin"] },
];

export default function Sidebar({ role, hideMobile, hideDesktop }: { role?: string | null, hideMobile?: boolean, hideDesktop?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    router.push("/login");
  };

  // Filter items based on role
  const filteredNavItems = navItems.filter(item => {
    if (!role) return false;
    return item.roles.includes(role);
  });

  const NavContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex h-[88px] items-center gap-3 px-6 border-b border-slate-100 shrink-0">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500 text-white">
          <HeartPulse className="h-6 w-6" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-[17px] tracking-tight leading-tight text-slate-800">3S Medicare</span>
          <span className="text-[13px] text-slate-500 font-medium">{role === 'doctor' ? 'Doctor Panel' : 'Admin Panel'}</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-1 px-4 scrollbar-hide">
        {filteredNavItems.map((item) => {
          const isActive = pathname === item.href || (pathname === '/' && item.name === 'Dashboard');
          const Icon = item.icon;
          
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
