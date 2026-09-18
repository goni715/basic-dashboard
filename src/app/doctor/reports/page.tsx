"use client";

import { DUMMY_DOCTOR_REPORTS as reports } from "@/data/report.data";
import ReportLeftPane from "@/components/doctor/reports/ReportLeftPane";
import ReportRightPane from "@/components/doctor/reports/ReportRightPane";

export default function ReportsPage() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 pb-12 h-[calc(100vh-8rem)]">
      <ReportLeftPane reports={reports} />
      <ReportRightPane />
    </div>
  );
}
