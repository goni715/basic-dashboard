"use client";

import { useState } from "react";
import { DUMMY_ADMIN_HOTEL_STATS, DUMMY_ADMIN_HOTELS } from "@/data/admin-hotel.data";
import { AdminHotelStats } from "@/components/admin/hotels/AdminHotelStats";
import { AdminHotelFilters } from "@/components/admin/hotels/AdminHotelFilters";
import { AdminHotelTable } from "@/components/admin/hotels/AdminHotelTable";

export default function AdminHotelsPage() {
  const [hotels, setHotels] = useState(DUMMY_ADMIN_HOTELS);

  return (
    <div className="space-y-8 max-w-full overflow-hidden p-2 md:p-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900">Hotel Management</h1>
        <p className="text-slate-500 text-sm">Add and manage hotel information shown in the patient app.</p>
      </div>

      <AdminHotelStats stats={DUMMY_ADMIN_HOTEL_STATS} />

      <AdminHotelFilters />

      <AdminHotelTable hotels={hotels} />
    </div>
  );
}
