"use client";

import { Suspense, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import AgentStats from "@/components/admin/agents/AgentStats";
import AgentFilters from "@/components/admin/agents/AgentFilters";
import AgentTable from "@/components/admin/agents/AgentTable";
import { useGetAgentsQuery } from "@/redux/features/agent/agentApi";

function AgentManagementContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read all filter and pagination values directly from URL
  const searchTerm = searchParams.get("searchTerm") || "";
  const status = searchParams.get("status") || "all";
  const approvalStatus = searchParams.get("approvalStatus") || "all";
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

  const handleApprovalStatusChange = (val: string) => {
    updateQuery({ approvalStatus: val, page: null });
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
  if (approvalStatus && approvalStatus !== "all") {
    queryArgs.approvalStatus = approvalStatus;
  }

  // Fetch agents with RTK Query
  const { data, isLoading, isFetching } = useGetAgentsQuery(queryArgs);

  const agents = data?.data || [];
  const meta = data?.meta;

  const totalCount = meta?.total ?? agents.length;
  const activeCount = agents.filter(
    (a) => (a.status || "").toLowerCase() === "active"
  ).length;
  const pendingApprovalCount = agents.filter(
    (a) => (a.approvalStatus || "").toLowerCase() === "pending"
  ).length;
  const approvedCount = agents.filter(
    (a) => (a.approvalStatus || "").toLowerCase() === "approved"
  ).length;

  return (
    <div className="space-y-6 max-w-full overflow-hidden p-2 md:p-4">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Agent Management
        </h1>
        <p className="text-slate-500 text-sm">
          Browse, search, review, and manage registered agencies and agents.
        </p>
      </div>

      {/* Dynamic Agent Stats */}
      <AgentStats
        total={totalCount}
        active={activeCount}
        pending={pendingApprovalCount}
        approved={approvedCount}
      />

      {/* Filters (Search, Status, Approval Status) */}
      <AgentFilters
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        status={status}
        onStatusChange={handleStatusChange}
        approvalStatus={approvalStatus}
        onApprovalStatusChange={handleApprovalStatusChange}
        onReset={handleResetFilters}
      />

      {/* Agents Data Table */}
      <AgentTable
        agents={agents}
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

export default function AgentsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-6 text-slate-500 text-sm flex items-center justify-center">
          Loading agent management...
        </div>
      }
    >
      <AgentManagementContent />
    </Suspense>
  );
}

