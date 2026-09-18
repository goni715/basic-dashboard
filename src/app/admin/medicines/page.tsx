"use client";

import { useState } from "react";
import { DUMMY_ADMIN_MEDICINE_STATS, DUMMY_ADMIN_MEDICINES } from "@/data/admin-medicine.data";
import { AdminMedicineStats } from "@/components/admin/medicines/AdminMedicineStats";
import { AdminMedicineFilters } from "@/components/admin/medicines/AdminMedicineFilters";
import { AdminMedicineTable } from "@/components/admin/medicines/AdminMedicineTable";

export default function AdminMedicinesPage() {
  const [medicines, setMedicines] = useState(DUMMY_ADMIN_MEDICINES);

  return (
    <div className="space-y-8 max-w-full overflow-hidden p-2 md:p-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900">Medicine Management</h1>
        <p className="text-slate-500 text-sm">Manage medicines shown in the patient app medicine list and details page.</p>
      </div>

      <AdminMedicineStats stats={DUMMY_ADMIN_MEDICINE_STATS} />

      <AdminMedicineFilters />

      <AdminMedicineTable medicines={medicines} />
    </div>
  );
}
