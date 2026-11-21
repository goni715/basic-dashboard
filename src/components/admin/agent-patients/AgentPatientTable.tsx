"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  User,
  Loader2,
  Phone,
  FileText,
  Calendar,
  Globe,
  Building2,
  Paperclip,
  CreditCard,
  MoreVertical,
  Banknote,
  Coins,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  IAgentPatient,
  IAgentPatientPaginationMeta,
} from "@/types/agent-patient.type";
import TakaIcon from "@/components/icons/TakaIcon";
import AgentPatientDetailsModal from "./AgentPatientDetailsModal";
import ManageCommissionModal from "./ManageCommissionModal";
import ManagePaymentStatusModal from "./ManagePaymentStatusModal";
import ManageRevenueModal from "./ManageRevenueModal";

interface AgentPatientTableProps {
  patientCases?: IAgentPatient[];
  meta?: IAgentPatientPaginationMeta;
  isLoading?: boolean;
  isFetching?: boolean;
  page?: number;
  onPageChange?: (page: number) => void;
  limit?: number;
  onLimitChange?: (limit: number) => void;
}

export default function AgentPatientTable({
  patientCases = [],
  meta,
  isLoading = false,
  isFetching = false,
  page = 1,
  onPageChange,
  limit = 10,
  onLimitChange,
}: AgentPatientTableProps) {
  const [activeRevenueCase, setActiveRevenueCase] = useState<IAgentPatient | null>(null);
  const [activeCommissionCase, setActiveCommissionCase] = useState<IAgentPatient | null>(null);
  const [activePaymentStatusCase, setActivePaymentStatusCase] = useState<IAgentPatient | null>(null);

  const getInitials = (name?: string) => {
    if (!name) return "PT";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const renderStatusBadge = (status?: string) => {
    const s = (status || "").toLowerCase();
    switch (s) {
      case "submitted":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
            Submitted
          </span>
        );
      case "under_review":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Under Review
          </span>
        );
      case "confirmed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
            Confirmed
          </span>
        );
      case "ongoing":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
            Ongoing
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Completed
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            {status || "Pending"}
          </span>
        );
    }
  };

  const renderPaymentBadge = (status?: string) => {
    const s = (status || "unpaid").toLowerCase();
    if (s === "paid") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          Paid
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
        Unpaid
      </span>
    );
  };

  const totalPages =
    meta?.totalPages || (meta?.total ? Math.ceil(meta.total / limit) : 1);
  const totalCount =
    meta?.total !== undefined ? meta.total : patientCases.length;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Table Header Section */}
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between sm:items-center gap-3 bg-gradient-to-r from-white to-slate-50/50">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Partner Patients List
            </h2>
            
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Patients referred and managed by channel partners and referral partners.
          </p>
        </div>

        {meta?.total !== undefined && (
          <div className="text-xs font-semibold text-slate-500 bg-slate-100/70 px-3 py-1.5 rounded-lg w-fit">
            Total: <span className="text-slate-900 font-bold">{meta.total}</span>{" "}
            Cases
          </div>
        )}
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/60">
            <TableRow className="border-slate-100 hover:bg-transparent">
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap py-3.5 px-6 text-xs uppercase tracking-wider">
                Case & Patient
              </TableHead>
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-xs uppercase tracking-wider">
                Phone
              </TableHead>
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-xs uppercase tracking-wider">
                Treatment & Country
              </TableHead>
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-xs uppercase tracking-wider">
                Referred By
              </TableHead>
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-xs uppercase tracking-wider">
                Revenue
              </TableHead>
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-xs uppercase tracking-wider">
                Channel Partner Commission
              </TableHead>
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-xs uppercase tracking-wider">
                Referral Partner Commission
              </TableHead>
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-xs uppercase tracking-wider">
                Status
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
                        <div className="h-3.5 w-24 bg-slate-200 rounded" />
                        <div className="h-2.5 w-16 bg-slate-100 rounded" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="h-3 w-24 bg-slate-200 rounded" />
                  </TableCell>
                  <TableCell>
                    <div className="h-3 w-32 bg-slate-200 rounded" />
                  </TableCell>
                  <TableCell>
                    <div className="h-3 w-28 bg-slate-200 rounded" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-20 bg-slate-200 rounded" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-20 bg-slate-200 rounded" />
                  </TableCell>
                  <TableCell>
                    <div className="h-5 w-20 bg-slate-200 rounded-full" />
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <div className="h-8 w-16 bg-slate-200 rounded-lg ml-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : patientCases.length === 0 ? (
              // Empty State
              <TableRow>
                <TableCell colSpan={8} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center gap-2 max-w-sm mx-auto text-slate-500">
                    <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-1">
                      <User className="h-6 w-6" />
                    </div>
                    <p className="text-base font-semibold text-slate-800">
                      No Agent Patients Found
                    </p>
                    <p className="text-xs text-slate-400">
                      No patient cases match your search or filter criteria.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              // Data Rows
              patientCases.map((patientCase) => {
                const id = patientCase._id || patientCase.id || "";
                const displayName = patientCase.fullName || "Patient";
                const hasSubAgent = Boolean(
                  patientCase.subAgentId || patientCase.subAgent?._id
                );

                return (
                  <TableRow
                    key={id}
                    className="border-slate-100 hover:bg-slate-50/60 transition-colors group"
                  >
                    {/* Case ID & Patient */}
                    <TableCell className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 rounded-xl border border-slate-200 shrink-0 shadow-xs">
                          <AvatarFallback className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs">
                            {getInitials(displayName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-900 text-sm truncate max-w-[170px]">
                              {displayName}
                            </span>
                            {patientCase.age && (
                              <span className="text-[11px] text-slate-400">
                                ({patientCase.age}y
                                {patientCase.gender
                                  ? `, ${patientCase.gender[0].toUpperCase()}`
                                  : ""}
                                )
                              </span>
                            )}
                          </div>
                          <span className="font-mono text-xs text-blue-600 font-semibold flex items-center gap-1 mt-0.5">
                            {patientCase.caseId}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Phone */}
                    <TableCell>
                      {patientCase.phone ? (
                        <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                          <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          <span>{patientCase.phone}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 italic">N/A</span>
                      )}
                    </TableCell>

                    {/* Treatment & Country */}
                    <TableCell>
                      <div className="flex flex-col min-w-0 max-w-[170px]">
                        <span className="text-xs font-semibold text-slate-800 truncate">
                          {patientCase.treatmentType || "General Care"}
                        </span>
                        <span className="text-[11px] text-slate-500 flex items-center gap-1">
                          <Globe className="h-3 w-3 text-slate-400" />
                          {patientCase.preferredCountry || "Any country"}
                        </span>
                      </div>
                    </TableCell>

                    {/* Referred By (Agent / SubAgent) */}
                    <TableCell>
                      <div className="flex flex-col min-w-0 max-w-[160px]">
                        {patientCase.agent && (
                          <span className="text-xs font-semibold text-slate-900 truncate">
                            {patientCase.agent.fullName}
                          </span>
                        )}
                        {hasSubAgent ? (
                          <span className="text-[11px] text-blue-600 font-medium truncate flex items-center gap-1">
                            <Building2 className="h-3 w-3" />
                            {patientCase.subAgent?.agencyName ||
                              patientCase.subAgent?.fullName ||
                              "Referral Partner"}
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-400">
                            Channel Partner Direct
                          </span>
                        )}
                      </div>
                    </TableCell>

                    {/* Revenue */}
                    <TableCell>
                      <div className="flex flex-col gap-0.5 items-start">
                        <span className="text-xs font-bold text-emerald-600">
                          ৳{patientCase.revenue ?? 0}
                        </span>
                      </div>
                    </TableCell>

                    {/* Agent Commission & Payment */}
                    <TableCell>
                      {patientCase.agentUserId || patientCase.agent?._id ? (
                        <div className="flex flex-col gap-1 items-start">
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-bold text-slate-900">
                              ৳{patientCase.agentCommissionFee ?? 0}
                            </span>
                            {patientCase.agentCommissionPercentage !== undefined &&
                              patientCase.agentCommissionPercentage !== null && (
                                <span className="text-[10px] text-slate-400 font-medium">
                                  ({patientCase.agentCommissionPercentage}%)
                                </span>
                              )}
                          </div>
                          {renderPaymentBadge(patientCase.agentPaymentStatus)}
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 italic">
                          No Channel Partner
                        </span>
                      )}
                    </TableCell>

                    {/* Sub-Agent Commission & Payment */}
                    <TableCell>
                      {hasSubAgent ? (
                        <div className="flex flex-col gap-1 items-start">
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-bold text-slate-900">
                              ৳
                              {patientCase.subAgentCommissionFee ??
                                patientCase.subAgentCommission ??
                                0}
                            </span>
                            {patientCase.subAgentCommissionPercentage !== undefined &&
                              patientCase.subAgentCommissionPercentage !== null && (
                                <span className="text-[10px] text-slate-400 font-medium">
                                  ({patientCase.subAgentCommissionPercentage}%)
                                </span>
                              )}
                          </div>
                          {renderPaymentBadge(
                            patientCase.subAgentPaymentStatus
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 italic">
                          No Referral Partner
                        </span>
                      )}
                    </TableCell>

                    {/* Status */}
                    <TableCell className="whitespace-nowrap">
                      {renderStatusBadge(patientCase.status)}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right px-6">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* 3-Dot Dropdown for Revenue, Commission, Payment Status */}
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            render={
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg shadow-2xs transition-colors cursor-pointer"
                                title="Manage Patient Actions"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            }
                          />
                          <DropdownMenuContent
                            align="end"
                            sideOffset={4}
                            className="w-48 p-1.5 rounded-xl border border-slate-100 bg-white shadow-xl text-xs space-y-0.5"
                          >
                            {/* Revenue Action */}
                            <DropdownMenuItem
                              onClick={() => setActiveRevenueCase(patientCase)}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-700 hover:text-blue-600 hover:bg-blue-50 cursor-pointer font-medium transition-colors"
                            >
                              <TakaIcon className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                              <span>Update Revenue</span>
                            </DropdownMenuItem>

                            {/* Commission Action */}
                            <DropdownMenuItem
                              onClick={() => setActiveCommissionCase(patientCase)}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 cursor-pointer font-medium transition-colors"
                            >
                              <Coins className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                              <span>Manage Commission</span>
                            </DropdownMenuItem>

                            {/* Payment Status Action */}
                            <DropdownMenuItem
                              onClick={() => setActivePaymentStatusCase(patientCase)}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-700 hover:text-purple-600 hover:bg-purple-50 cursor-pointer font-medium transition-colors"
                            >
                              <CreditCard className="h-3.5 w-3.5 text-purple-600 shrink-0" />
                              <span>Payment Status</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        {/* View Details */}
                        <AgentPatientDetailsModal patientCase={patientCase} />
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
      {/* Modals rendered when selected from 3-dot dropdown */}
      {activeRevenueCase && (
        <ManageRevenueModal
          patientCase={activeRevenueCase}
          open={Boolean(activeRevenueCase)}
          onOpenChange={(open) => !open && setActiveRevenueCase(null)}
        />
      )}

      {activeCommissionCase && (
        <ManageCommissionModal
          patientCase={activeCommissionCase}
          open={Boolean(activeCommissionCase)}
          onOpenChange={(open) => !open && setActiveCommissionCase(null)}
        />
      )}

      {activePaymentStatusCase && (
        <ManagePaymentStatusModal
          patientCase={activePaymentStatusCase}
          open={Boolean(activePaymentStatusCase)}
          onOpenChange={(open) => !open && setActivePaymentStatusCase(null)}
        />
      )}
    </div>
  );
}
