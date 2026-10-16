"use client";

import { useState } from "react";
import { DUMMY_DOCTORS } from "@/data/doctor.data";
import DoctorFilters from "@/components/admin/doctors/DoctorFilters";
import DoctorTable from "@/components/admin/doctors/DoctorTable";

export default function DoctorManagementPage() {
  const [doctors, setDoctors] = useState(DUMMY_DOCTORS);

  return (
    <div className="space-y-8 max-w-full overflow-hidden p-2 md:p-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900">Doctor Management</h1>
        <p className="text-slate-500 text-sm">Manage doctor profiles shown in the patient app.</p>
      </div>

      <DoctorFilters />

      <DoctorTable doctors={doctors} />
    </div>
  );
}
