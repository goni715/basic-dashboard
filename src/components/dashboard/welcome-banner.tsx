import * as React from "react"
import Link from "next/link"
import { ChevronRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface WelcomeBannerProps {
  doctorName: string
  specialty: string
  hospital: string
}

export function WelcomeBanner({ doctorName, specialty, hospital }: WelcomeBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-teal-500 p-6 md:p-8 text-white shadow-lg">
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md text-2xl font-bold border border-white/30 shadow-inner">
            {doctorName.split(' ').map(n => n[0]).join('').substring(0, 2)}
          </div>
          <div className="space-y-1.5">
            <p className="text-blue-100 font-medium text-sm">Welcome back</p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Good Morning, {doctorName}</h2>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm">
                {specialty}
              </Badge>
              <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm">
                {hospital}
              </Badge>
              <div className="flex items-center gap-1.5 text-xs font-medium text-teal-100 ml-2">
                <CheckCircle2 className="h-4 w-4" />
                Admin Approved
              </div>
            </div>
          </div>
        </div>
        
        <div className="shrink-0">
          <Button asChild variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50 font-bold border-0 shadow-sm rounded-xl px-6 h-12">
            <Link href="/doctor/appointments">
              View Today's Appointments
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-32 right-32 h-64 w-64 rounded-full bg-teal-400/20 blur-3xl" />
    </div>
  )
}
