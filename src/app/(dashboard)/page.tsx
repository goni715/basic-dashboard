"use client";

import { useEffect, useState } from "react";
import WelcomeBanner from "@/components/admin/welcome-banner";
import StatsGrid from "@/components/admin/stats-grid";
import ActivityChart from "@/components/admin/activity-chart";
import ModuleOverview from "@/components/admin/module-overview";
import RecentActivities from "@/components/admin/recent-activities";
import PendingActions from "@/components/admin/pending-actions";
import QuickActions from "@/components/admin/quick-actions";

export default function Home() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  return (
    <div className="flex flex-col gap-6 max-w-[1400px] mx-auto">
      <WelcomeBanner role={role} />

      {/* Conditional rendering based on role */}
      {role === "admin" && (
        <>
          <StatsGrid />
          <ActivityChart />
          <ModuleOverview />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentActivities />
            <PendingActions />
          </div>

          <QuickActions />
        </>
      )}

      {role === "doctor" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-2xl shadow-sm">
            <h3 className="text-xl font-bold mb-4">Doctor specific content</h3>
            <p className="text-slate-500">Welcome to the doctor's dashboard. This is a simplified view.</p>
          </div>
          <RecentActivities />
        </div>
      )}
    </div>
  );
}