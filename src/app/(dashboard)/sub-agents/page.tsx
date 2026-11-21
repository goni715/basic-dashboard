"use client";

import { Suspense, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import SubAgentStats from "@/components/admin/sub-agents/SubAgentStats";
import SubAgentFilters from "@/components/admin/sub-agents/SubAgentFilters";
import SubAgentTable from "@/components/admin/sub-agents/SubAgentTable";
import { useGetSubAgentsQuery } from "@/redux/features/sub-agent/subAgentApi";

function SubAgentManagementContent() {
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

  // Fetch sub-agents with RTK Query
  const { data, isLoading, isFetching } = useGetSubAgentsQuery(queryArgs);

  const subAgents = data?.data || [];
  const meta = data?.meta;

  const totalCount = meta?.total ?? subAgents.length;
  const activeCount = subAgents.filter(
    (s) => (s.status || "").toLowerCase() === "active"
  ).length;
  const totalCases = subAgents.reduce((acc, curr) => acc + (curr.cases || 0), 0);
  const totalEarnings = subAgents.reduce((acc, curr) => acc + (curr.earnings || 0), 0);

  return (
    <div className="space-y-6 max-w-full overflow-hidden p-2 md:p-4">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Referral Partner Management
        </h1>
        <p className="text-slate-500 text-sm">
          Browse, track performance, and manage referral partners.
        </p>
      </div>

      {/* Dynamic Sub-Agent Stats */}
      <SubAgentStats
        total={totalCount}
        active={activeCount}
        totalCases={totalCases}
        totalEarnings={totalEarnings}
      />

      {/* Filters (Search & Status) */}
      <SubAgentFilters
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        status={status}
        onStatusChange={handleStatusChange}
        onReset={handleResetFilters}
      />

      {/* Sub-Agents Data Table */}
      <SubAgentTable
        subAgents={subAgents}
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

export default function SubAgentsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-6 text-slate-500 text-sm flex items-center justify-center">
          Loading sub-agents...
        </div>
      }
    >
      <SubAgentManagementContent />
    </Suspense>
  );
}

