"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DUMMY_APPOINTMENT_STATS as stats, DUMMY_APPOINTMENTS } from "@/data/appointment.data";
import AppointmentStats from "@/components/doctor/appointments/AppointmentStats";
import AppointmentFilters from "@/components/doctor/appointments/AppointmentFilters";
import AppointmentTable from "@/components/doctor/appointments/AppointmentTable";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState(DUMMY_APPOINTMENTS);

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <AppointmentStats stats={stats} />

      <Card className="border-0 shadow-sm rounded-2xl overflow-hidden">
        <AppointmentFilters />
        <CardContent className="p-0">
          <AppointmentTable appointments={appointments} />
        </CardContent>
      </Card>

      <div className="h-4"></div>
    </div>
  );
}
