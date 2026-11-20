"use client";

import { Suspense, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { LifeBuoy, AlertCircle, Clock, CheckCircle2, MessageSquare } from "lucide-react";
import SupportFilters from "@/components/admin/supports/SupportFilters";
import SupportTable from "@/components/admin/supports/SupportTable";
import { useGetSupportsQuery } from "@/redux/features/support/supportApi";

function SupportsPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read URL search params
  const searchTerm = searchParams.get("searchTerm") || "";
  const status = searchParams.get("status") || "all";
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  // Helper to update query params
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

  // Build query arguments for RTK Query
  const queryArgs: Record<string, any> = {
    page,
    limit,
  };
  if (searchTerm) {
    queryArgs.searchTerm = searchTerm;
  }
  if (status && status !== "all") {
    queryArgs.status = status;
  }

  const { data, isLoading, isFetching } = useGetSupportsQuery(queryArgs);

  const supports = data?.data || [];
  const meta = data?.meta;

  return (
    <div className="space-y-6 max-w-full overflow-hidden p-2 md:p-4 animate-in fade-in duration-300">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-500 text-white flex items-center justify-center shadow-sm shadow-blue-500/20">
              <LifeBuoy className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Support Management
            </h1>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Track user inquiries, patient support tickets, and update resolution statuses.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <SupportFilters
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        status={status}
        onStatusChange={handleStatusChange}
        onReset={handleResetFilters}
      />

      {/* Support Tickets Data Table */}
      <SupportTable
        supports={supports}
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

export default function SupportsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-slate-500 text-sm">
          Loading support tickets...
        </div>
      }
    >
      <SupportsPageContent />
    </Suspense>
  );
}
