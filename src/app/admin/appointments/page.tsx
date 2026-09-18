"use client";

import { useState } from "react";
import { DUMMY_ADMIN_APPOINTMENT_STATS, DUMMY_ADMIN_APPOINTMENTS } from "@/data/admin-appointment.data";
import { AdminAppointmentStats } from "@/components/admin/appointments/AdminAppointmentStats";
import { AdminAppointmentTable } from "@/components/admin/appointments/AdminAppointmentTable";

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState(DUMMY_ADMIN_APPOINTMENTS);

  return (
    <div className="space-y-8 max-w-full overflow-hidden p-2 md:p-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900">Appointment Management</h1>
        <p className="text-slate-500 text-sm">Manage consultation bookings, schedules, reports, and booking status.</p>
      </div>

      <AdminAppointmentStats stats={DUMMY_ADMIN_APPOINTMENT_STATS} />

      <AdminAppointmentTable appointments={appointments} />
    </div>
  );
}
