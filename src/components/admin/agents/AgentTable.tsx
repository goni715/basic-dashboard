"use client";

import {
  ChevronLeft,
  ChevronRight,
  User,
  Loader2,
  Mail,
  Phone,
  Building2,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IAgent, IAgentPaginationMeta } from "@/types/agent.type";
import AgentDetailsModal from "./AgentDetailsModal";

interface AgentTableProps {
  agents?: IAgent[];
  meta?: IAgentPaginationMeta;
  isLoading?: boolean;
  isFetching?: boolean;
  page?: number;
  onPageChange?: (page: number) => void;
  limit?: number;
  onLimitChange?: (limit: number) => void;
}

export default function AgentTable({
  agents = [],
  meta,
  isLoading = false,
  isFetching = false,
  page = 1,
  onPageChange,
  limit = 10,
  onLimitChange,
}: AgentTableProps) {
  const getInitials = (name?: string) => {
    if (!name) return "AG";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const renderStatusBadge = (status?: string) => {
    const s = (status || "pending").toLowerCase();
    if (s === "active") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Active
        </span>
      );
    }
    if (s === "blocked") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
          Blocked
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
        Pending
      </span>
    );
  };

  const renderApprovalBadge = (approval?: string) => {
    const a = (approval || "pending").toLowerCase();
    if (a === "approved") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          Approved
        </span>
      );
    }
    if (a === "rejected") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
          Rejected
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
        Pending
      </span>
    );
  };

  const totalPages =
    meta?.totalPages || (meta?.total ? Math.ceil(meta.total / limit) : 1);
  const totalCount = meta?.total !== undefined ? meta.total : agents.length;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Table Header Section */}
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between sm:items-center gap-3 bg-gradient-to-r from-white to-slate-50/50">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Agent List
            </h2>
            
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Registered agency representatives and agents on the platform.
          </p>
        </div>

        {meta?.total !== undefined && (
          <div className="text-xs font-semibold text-slate-500 bg-slate-100/70 px-3 py-1.5 rounded-lg w-fit">
            Total: <span className="text-slate-900 font-bold">{meta.total}</span>{" "}
            Agents
          </div>
        )}
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/60">
            <TableRow className="border-slate-100 hover:bg-transparent">
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap py-3.5 px-6 text-xs uppercase tracking-wider">
                Agent Info
              </TableHead>
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-xs uppercase tracking-wider">
                Agency Name
              </TableHead>
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-xs uppercase tracking-wider">
                Phone
              </TableHead>
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-xs uppercase tracking-wider">
                Email Address
              </TableHead>
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-xs uppercase tracking-wider">
                Status
              </TableHead>
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-xs uppercase tracking-wider">
                Approval
              </TableHead>
              <TableHead className="font-semibold text-slate-500 text-right whitespace-nowrap px-6 text-xs uppercase tracking-wider">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Loading Skeleton Rows
              Array.from({ length: 5 }).map((_, idx) => (
                <TableRow key={idx} className="border-slate-100 animate-pulse">
                  <TableCell className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-slate-200 shrink-0" />
                      <div className="space-y-2">
                        <div className="h-3.5 w-32 bg-slate-200 rounded" />
                        <div className="h-2.5 w-20 bg-slate-100 rounded" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="h-3 w-28 bg-slate-200 rounded" />
                  </TableCell>
                  <TableCell>
                    <div className="h-3 w-28 bg-slate-200 rounded" />
                  </TableCell>
                  <TableCell>
                    <div className="h-3 w-36 bg-slate-200 rounded" />
                  </TableCell>
                  <TableCell>
                    <div className="h-5 w-16 bg-slate-200 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <div className="h-5 w-20 bg-slate-200 rounded-full" />
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <div className="h-8 w-8 bg-slate-200 rounded-lg ml-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : agents.length === 0 ? (
              // Empty State
              <TableRow>
                <TableCell colSpan={7} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center gap-2 max-w-sm mx-auto text-slate-500">
                    <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-1">
                      <User className="h-6 w-6" />
                    </div>
                    <p className="text-base font-semibold text-slate-800">
                      No Agents Found
                    </p>
                    <p className="text-xs text-slate-400">
                      No agents match your selected search or filter criteria.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              // Data Rows
              agents.map((agent) => {
                const id = agent._id || agent.id || "";
                const displayName = agent.fullName || "Agent";

                return (
                  <TableRow
                    key={id}
                    className="border-slate-100 hover:bg-slate-50/60 transition-colors group"
                  >
                    {/* Agent Info & Avatar */}
                    <TableCell className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 rounded-xl border border-slate-200 shrink-0 shadow-xs">
                          {agent.profileImg && (
                            <AvatarImage
                              src={agent.profileImg}
                              alt={displayName}
                              className="object-cover"
                            />
                          )}
                          <AvatarFallback className="bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-bold text-xs">
                            {getInitials(displayName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col min-w-0">
                          <span className="font-bold text-slate-900 text-sm truncate max-w-[200px]">
                            {displayName}
                          </span>
                          <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {agent.createdAt
                              ? new Date(agent.createdAt).toLocaleDateString()
                              : "Recently"}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Agency Name */}
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-xs text-slate-800 font-medium">
                        <Building2 className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                        <span className="truncate max-w-[180px]">
                          {agent.agencyName || "N/A"}
                        </span>
                      </div>
                    </TableCell>

                    {/* Phone */}
                    <TableCell>
                      {agent.phone ? (
                        <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                          <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          <span>{agent.phone}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 italic">N/A</span>
                      )}
                    </TableCell>

                    {/* Email */}
                    <TableCell>
                      {agent.email ? (
                        <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                          <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          <span className="truncate max-w-[200px]">
                            {agent.email}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 italic">N/A</span>
                      )}
                    </TableCell>

                    {/* Status */}
                    <TableCell className="whitespace-nowrap">
                      {renderStatusBadge(agent.userStatus || agent.status)}
                    </TableCell>

                    {/* Approval Status */}
                    <TableCell className="whitespace-nowrap">
                      {renderApprovalBadge(agent.approvalStatus)}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right px-6">
                      <div className="flex items-center justify-end gap-1.5">
                        <AgentDetailsModal agent={agent} />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Bar */}
      {!isLoading && totalCount > 0 && (
        <div className="p-4 border-t border-slate-100 bg-slate-50/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Showing{" "}
            <span className="font-bold text-slate-800">
              {Math.min((page - 1) * limit + 1, totalCount)}
            </span>{" "}
            to{" "}
            <span className="font-bold text-slate-800">
              {Math.min(page * limit, totalCount)}
            </span>{" "}
            of <span className="font-bold text-slate-800">{totalCount}</span>{" "}
            entries
          </div>

          <div className="flex items-center gap-2">
            {onLimitChange && (
              <select
                value={limit}
                onChange={(e) => onLimitChange(Number(e.target.value))}
                className="h-8 px-2.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
              >
                <option value={5}>5 / page</option>
                <option value={10}>10 / page</option>
                <option value={20}>20 / page</option>
                <option value={50}>50 / page</option>
              </select>
            )}

            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => onPageChange && onPageChange(page - 1)}
                className="h-8 w-8 p-0 rounded-lg border-slate-200 cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <span className="px-2 font-semibold text-slate-700">
                {page} / {Math.max(1, totalPages)}
              </span>

              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => onPageChange && onPageChange(page + 1)}
                className="h-8 w-8 p-0 rounded-lg border-slate-200 cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

