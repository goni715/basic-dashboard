"use client";

import { useState } from "react";
import { DUMMY_HOSPITALS } from "@/data/hospital.data";
import { HospitalStats } from "@/components/admin/hospitals/HospitalStats";
import { HospitalFilters } from "@/components/admin/hospitals/HospitalFilters";
import { HospitalTable } from "@/components/admin/hospitals/HospitalTable";

export default function HospitalManagementPage() {
  const [hospitals, setHospitals] = useState(DUMMY_HOSPITALS);

  return (
    <div className="space-y-8 max-w-full overflow-hidden p-2 md:p-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900">Hospital Management</h1>
        <p className="text-slate-500 text-sm">Manage hospitals shown in the patient app.</p>
      </div>

      <HospitalStats />
      
      <HospitalFilters />

      <HospitalTable hospitals={hospitals} />
    </div>
  );
}
