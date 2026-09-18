"use client";

import { useState } from "react";
import { DUMMY_DOCTOR_ACCESS } from "@/data/doctor-access.data";
import DoctorAccessFilters from "@/components/admin/doctor-access/DoctorAccessFilters";
import DoctorAccessTable from "@/components/admin/doctor-access/DoctorAccessTable";

export default function DoctorAccessPage() {
  const [doctors, setDoctors] = useState(DUMMY_DOCTOR_ACCESS);

  return (
    <div className="space-y-8 max-w-full overflow-hidden p-2 md:p-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900">Doctor Access Management</h1>
        <p className="text-slate-500 text-sm">Invite doctors by Gmail and control dashboard access.</p>
      </div>

      <DoctorAccessFilters />

      <DoctorAccessTable doctors={doctors} />
    </div>
  );
}
