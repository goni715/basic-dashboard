import * as React from "react"
import AppointmentHeader from "@/components/doctor/appointments/AppointmentHeader"
import AppointmentLeftColumn from "@/components/doctor/appointments/AppointmentLeftColumn"
import AppointmentRightColumn from "@/components/doctor/appointments/AppointmentRightColumn"

export default function AppointmentDetailsPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch data based on params.id
  const id = params.id || "BK-3SM-2026-001234"

  return (
    <div className="space-y-6 pb-12">
      <AppointmentHeader id={id} />

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <AppointmentLeftColumn />
        <AppointmentRightColumn />
      </div>
    </div>
  )
}
