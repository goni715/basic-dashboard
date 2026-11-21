"use client";

import { Suspense, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import AgentPatientStats from "@/components/admin/agent-patients/AgentPatientStats";
import AgentPatientFilters from "@/components/admin/agent-patients/AgentPatientFilters";
import AgentPatientTable from "@/components/admin/agent-patients/AgentPatientTable";
import { useGetAgentPatientsQuery } from "@/redux/features/agent-patient/agentPatientApi";

function AgentPatientsManagementContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read all filter and pagination values directly from URL
  const searchTerm = searchParams.get("searchTerm") || "";
  const status = searchParams.get("status") || "all";
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

  // Fetch agent patient cases with RTK Query
  const { data, isLoading, isFetching } = useGetAgentPatientsQuery(queryArgs);

  const patientCases = data?.data || [];
  const meta = data?.meta;
  const statusCounts = data?.statusCounts;

  const totalCount = statusCounts?.all ?? meta?.total ?? patientCases.length;
  const submittedCount = statusCounts?.submitted ?? patientCases.filter(
    (c) => (c.status || "").toLowerCase() === "submitted"
  ).length;
  const underReviewCount = statusCounts?.under_review ?? patientCases.filter(
    (c) => (c.status || "").toLowerCase() === "under_review"
  ).length;
  const confirmedCount = statusCounts?.confirmed ?? patientCases.filter(
    (c) => (c.status || "").toLowerCase() === "confirmed"
  ).length;
  const ongoingCount = statusCounts?.ongoing ?? patientCases.filter(
    (c) => (c.status || "").toLowerCase() === "ongoing"
  ).length;
  const completedCount = statusCounts?.completed ?? patientCases.filter(
    (c) => (c.status || "").toLowerCase() === "completed"
  ).length;

  return (
    <div className="space-y-6 max-w-full overflow-hidden p-2 md:p-4">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Partner Patients
        </h1>
        <p className="text-slate-500 text-sm">
          Track and manage medical cases referred by channel partners and referral partners.
        </p>
      </div>

      {/* Dynamic Case Stats */}
      <AgentPatientStats
        total={totalCount}
        submitted={submittedCount}
        underReview={underReviewCount}
        confirmed={confirmedCount}
        ongoing={ongoingCount}
        completed={completedCount}
      />

      {/* Filters (Search & Status) */}
      <AgentPatientFilters
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        status={status}
        onStatusChange={handleStatusChange}
        onReset={handleResetFilters}
      />

      {/* Patient Cases Data Table */}
      <AgentPatientTable
        patientCases={patientCases}
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

export default function AgentPatientsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-6 text-slate-500 text-sm flex items-center justify-center">
          Loading agent patients...
        </div>
      }
    >
      <AgentPatientsManagementContent />
    </Suspense>
  );
}

