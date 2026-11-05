"use client";

import { Suspense, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import AdminAppointmentStats from "@/components/admin/appointments/AdminAppointmentStats";
import AppointmentFilters from "@/components/admin/appointments/AppointmentFilters";
import AdminAppointmentTable from "@/components/admin/appointments/AdminAppointmentTable";
import {
  useGetAppointmentsQuery,
  useGetAppointmentStatsQuery,
} from "@/redux/features/appointment/appointmentApi";

function AppointmentsManagementContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read all filter and pagination values directly from URL
  const searchTerm = searchParams.get("searchTerm") || "";
  const status = searchParams.get("status") || "all";
  const appointmentDate = searchParams.get("appointmentDate") || "";
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  // Helper to update URL query params
  const updateQuery = useCallback(
    (updates: Record<string, string | number | null | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (
          value === null ||
          value === undefined ||
          value === "" ||
          value === "all" ||
          (key === "page" && Number(value) <= 1) ||
          (key === "limit" && Number(value) === 10)
        ) {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      const queryString = params.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams]
  );

  const handleSearchChange = useDebouncedCallback((val: string) => {
    updateQuery({ searchTerm: val.trim() || null, page: null });
  }, 400);

  const handleStatusChange = (val: string) => {
    updateQuery({ status: val, page: null });
  };

  const handleDateChange = (val: string) => {
    updateQuery({ appointmentDate: val || null, page: null });
  };

  const handlePageChange = (newPage: number) => {
    updateQuery({ page: newPage });
  };

  const handleLimitChange = (newLimit: number) => {
    updateQuery({ limit: newLimit, page: null });
  };

  const handleResetFilters = () => {
    router.replace(pathname, { scroll: false });
  };

  // Construct query arguments object for RTK Query
  const queryArgs: Record<string, unknown> = {
    page,
    limit,
  };

  if (searchTerm) {
    queryArgs.searchTerm = searchTerm;
  }
  if (status && status !== "all") {
    queryArgs.status = status;
  }
  if (appointmentDate) {
    queryArgs.appointmentDate = appointmentDate;
  }

  // Fetch appointments with RTK Query
  const { data, isLoading, isFetching } = useGetAppointmentsQuery(queryArgs);

  // Fetch dedicated appointment stats
  const { data: statsResponse } = useGetAppointmentStatsQuery();
  const apiStats = statsResponse?.data;

  const appointments = data?.data || [];
  const meta = data?.meta;

  const totalCount = apiStats?.total ?? meta?.total ?? appointments.length;
  const pendingCount =
    apiStats?.pending ??
    appointments.filter((apt) => (apt.status || "").toLowerCase() === "pending")
      .length;
  const confirmedCount =
    apiStats?.confirmed ??
    appointments.filter(
      (apt) => (apt.status || "").toLowerCase() === "confirmed"
    ).length;
  const completedCount =
    apiStats?.completed ??
    appointments.filter(
      (apt) => (apt.status || "").toLowerCase() === "completed"
    ).length;
  const cancelledCount =
    apiStats?.cancelled ??
    appointments.filter(
      (apt) => (apt.status || "").toLowerCase() === "cancelled"
    ).length;

  return (
    <div className="space-y-6 max-w-full overflow-hidden p-2 md:p-4">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Appointment Management
        </h1>
        <p className="text-slate-500 text-sm">
          Track patient consultation bookings, schedules, serials, and doctor assignments.
        </p>
      </div>

      {/* Dynamic Appointment Stats from /appointment/stats */}
      <AdminAppointmentStats
        total={totalCount}
        pending={pendingCount}
        confirmed={confirmedCount}
        completed={completedCount}
        cancelled={cancelledCount}
      />

      {/* Filters (Search, Date & Status) */}
      <AppointmentFilters
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        status={status}
        onStatusChange={handleStatusChange}
        appointmentDate={appointmentDate}
        onDateChange={handleDateChange}
        onReset={handleResetFilters}
      />

      {/* Appointments Data Table */}
      <AdminAppointmentTable
        appointments={appointments}
        meta={meta}
        isLoading={isLoading}
        isFetching={isFetching}
        page={page}
        onPageChange={handlePageChange}
        limit={limit}
        onLimitChange={handleLimitChange}
      />
    </div>
  );
}

export default function AppointmentsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-6 text-slate-500 text-sm flex items-center justify-center">
          Loading appointments...
        </div>
      }
    >
      <AppointmentsManagementContent />
    </Suspense>
  );
}
