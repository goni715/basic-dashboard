"use client";

import { useState } from "react";
import { DUMMY_ADMIN_HEALTH_TIP_STATS, DUMMY_ADMIN_HEALTH_TIPS } from "@/data/admin-health-tip.data";
import HealthTipStats from "@/components/admin/health-tips/HealthTipStats";
import HealthTipFilters from "@/components/admin/health-tips/HealthTipFilters";
import HealthTipTable from "@/components/admin/health-tips/HealthTipTable";

export default function AdminHealthTipsPage() {
  const [tips, setTips] = useState(DUMMY_ADMIN_HEALTH_TIPS);

  return (
    <div className="space-y-8 max-w-full overflow-hidden p-2 md:p-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900">Health Tips Management</h1>
        <p className="text-slate-500 text-sm">Create and manage health tips shown in the patient app.</p>
      </div>

      <HealthTipStats stats={DUMMY_ADMIN_HEALTH_TIP_STATS} />

      <HealthTipFilters />

      <HealthTipTable tips={tips} />
    </div>
  );
}
