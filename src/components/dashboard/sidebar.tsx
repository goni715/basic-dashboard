"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  HeartPulse, 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  FileText, 
  ClipboardList, 
  LogOut,
  Menu
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"

const navItems = [
  { name: "Dashboard", href: "/doctor", icon: LayoutDashboard },
  { name: "Appointments", href: "/doctor/appointments", icon: CalendarDays },
  { name: "Patients", href: "/doctor/patients", icon: Users },
  { name: "Reports", href: "/doctor/reports", icon: FileText },
  { name: "Consultation Notes", href: "/doctor/notes", icon: ClipboardList },
]

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname()

  const NavContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-slate-100">
        <Link href="/doctor" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-teal-500 text-white">
            <HeartPulse className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-none text-slate-900">3S Medicare</span>
            <span className="text-[10px] text-slate-500 font-medium">Doctor Panel</span>
          </div>
        </Link>
      </div>
      
      <div className="flex-1 overflow-auto py-6 flex flex-col gap-1 px-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/') && item.href !== '/doctor'
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                isActive 
                  ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-sm" 
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <item.icon className={cn("h-4 w-4", isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600")} />
              {item.name}
            </Link>
          )
        })}
      </div>
      
      <div className="p-4 mt-auto border-t border-slate-100">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-red-500 hover:bg-red-50 hover:text-red-600"
          
         render={<Link href="/login" />}>
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={cn("hidden lg:flex w-64 flex-col fixed inset-y-0 z-50 bg-white border-r border-slate-100", className)}>
        <NavContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger render={<Button variant="ghost" size="icon" className="lg:hidden shrink-0" />}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <NavContent />
        </SheetContent>
      </Sheet>
    </>
  )
}
