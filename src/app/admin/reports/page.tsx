"use client";

import { useState } from "react";
import { DUMMY_ADMIN_REPORT_STATS, DUMMY_ADMIN_REPORTS } from "@/data/admin-report.data";
import { AdminReportStats } from "@/components/admin/reports/AdminReportStats";
import { AdminReportTable } from "@/components/admin/reports/AdminReportTable";

export default function AdminReportsPage() {
  const [reports, setReports] = useState(DUMMY_ADMIN_REPORTS);

  return (
    <div className="space-y-8 max-w-full overflow-hidden p-2 md:p-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900">Medical Reports Management</h1>
        <p className="text-slate-500 text-sm">Review uploaded reports, verify documents, and assign reports to doctors.</p>
      </div>

      <AdminReportStats stats={DUMMY_ADMIN_REPORT_STATS} />

      <AdminReportTable reports={reports} />
    </div>
  );
}
