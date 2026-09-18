"use client";

import { useState } from "react";
import { DUMMY_PATIENTS } from "@/data/patient.data";
import { PatientStats } from "@/components/admin/patients/PatientStats";
import { PatientTable } from "@/components/admin/patients/PatientTable";

export default function PatientManagementPage() {
  const [patients, setPatients] = useState(DUMMY_PATIENTS);

  return (
    <div className="space-y-8 max-w-full overflow-hidden p-2 md:p-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900">Patient Management</h1>
        <p className="text-slate-500 text-sm">View patient profiles, medical info, reports, appointments, and requests.</p>
      </div>

      <PatientStats />

      <PatientTable patients={patients} />
    </div>
  );
}
