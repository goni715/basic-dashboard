"use client"

import * as React from "react"
import { usePathname } from "next/navigation"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sidebar } from "@/components/dashboard/sidebar"

const pageTitles: Record<string, { title: string, subtitle: string }> = {
  "/doctor": { title: "Doctor Dashboard", subtitle: "Today's assigned appointments, patients, and pending clinical tasks." },
  "/doctor/appointments": { title: "My Appointments", subtitle: "View assigned consultations and join upcoming sessions." },
  "/doctor/patients": { title: "Patient Details", subtitle: "View assigned patient medical history, reports, and consultations." },
  "/doctor/reports": { title: "Medical Report Viewer", subtitle: "Review patient uploaded medical reports before or during consultation." },
}

export function Header() {
  const pathname = usePathname()
  
  // Basic matching for titles
  let currentHeader = pageTitles["/doctor"]
  if (pathname.includes("/doctor/appointments")) {
    currentHeader = pathname.split("/").length > 3 
      ? { title: "Appointment Details", subtitle: "Review patient booking information before consultation." }
      : pageTitles["/doctor/appointments"]
  } else if (pathname.includes("/doctor/patients")) {
    currentHeader = pageTitles["/doctor/patients"]
  } else if (pathname.includes("/doctor/reports")) {
    currentHeader = pageTitles["/doctor/reports"]
  }

  // Format date like "Sun, Jun 14, 2026"
  const today = new Date("2026-06-14") // Hardcoded to match screenshot, or use new Date()
  const dateStr = today.toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center gap-4 border-b border-slate-100 bg-white/95 px-4 md:px-6 backdrop-blur">
      <div className="lg:hidden flex items-center">
        <Sidebar className="hidden" /> {/* This just renders the mobile trigger */}
      </div>
      
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-lg font-bold text-slate-900 leading-tight">{currentHeader.title}</h1>
        <p className="text-xs font-medium text-slate-500 hidden sm:block">{currentHeader.subtitle}</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 border border-slate-100">
          {dateStr}
        </div>
        
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-blue-100 ring-2 ring-white">
            <AvatarImage src="" alt="Dr. Arjun Mehta" />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-teal-500 text-white font-bold text-xs">AM</AvatarFallback>
          </Avatar>
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-sm font-bold text-slate-900 leading-none">Dr. Arjun Mehta</span>
            <span className="text-[11px] font-medium text-blue-600 mt-1">Cardiology</span>
          </div>
        </div>
      </div>
    </header>
  )
}
