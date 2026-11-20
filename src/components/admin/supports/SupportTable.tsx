"use client";

import { useState } from "react";
import {
  LifeBuoy,
  Loader2,
  Inbox,
  Mail,
  Phone,
  Ticket,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ISupportItem, ISupportPaginationMeta } from "@/types/support.type";
import SupportDetailsModal from "@/components/modal/support/SupportDetailsModal";
import ChangeSupportStatusModal from "@/components/modal/support/ChangeSupportStatusModal";
import {
  SUPPORT_STATUS_OPTIONS,
  SUPPORT_STATUS_BADGE_CONFIG,
} from "@/constants/support.constant";
import { useUpdateSupportStatusMutation } from "@/redux/features/support/supportApi";
import { SuccessToast, ErrorToast } from "@/helpers/ValidationHelper";

interface SupportTableProps {
  supports: ISupportItem[];
  meta?: ISupportPaginationMeta;
  isLoading?: boolean;
  isFetching?: boolean;
  page: number;
  onPageChange: (page: number) => void;
  limit: number;
  onLimitChange: (limit: number) => void;
}

export default function SupportTable({
  supports = [],
  meta,
  isLoading = false,
  isFetching = false,
  page = 1,
  onPageChange,
  limit = 10,
  onLimitChange,
}: SupportTableProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [updateSupportStatus] = useUpdateSupportStatusMutation();

  const handleStatusChange = async (
    supportId: string,
    newStatus: "open" | "in_progress" | "closed"
  ) => {
    setUpdatingId(supportId);
    try {
      const res = await updateSupportStatus({ id: supportId, status: newStatus }).unwrap();
      SuccessToast(res?.message || `Status updated to ${newStatus}`);
    } catch (err: any) {
      ErrorToast(err?.data?.message || "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const totalItems = meta?.total ?? supports.length;
  const totalPages =
    meta?.totalPages || (totalItems > 0 ? Math.ceil(totalItems / limit) : 1);
  const startItem = totalItems === 0 ? 0 : (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, totalItems);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(d);
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
      {/* Table responsive scroll area */}
      <div className="overflow-x-auto relative">
        {(isLoading || isFetching) && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-md border border-slate-100 text-sm font-medium text-slate-700">
              <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
              <span>Updating list...</span>
            </div>
          </div>
        )}

        <Table className="w-full min-w-[780px]">
          <TableHeader>
            <TableRow className="bg-slate-50/70 hover:bg-slate-50/70 border-slate-100">
              <TableHead className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider w-[120px]">
                Ticket
              </TableHead>
              <TableHead className="py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider min-w-[190px]">
                User & Contact
              </TableHead>
              <TableHead className="py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider min-w-[240px]">
                Subject & Message
              </TableHead>
              <TableHead className="py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-[140px]">
                Created Date
              </TableHead>
              <TableHead className="py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-[150px]">
                Status
              </TableHead>
              <TableHead className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right w-[90px]">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {supports.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center">
                      <Inbox className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold text-slate-800 text-base">
                        No support tickets found
                      </p>
                      <p className="text-xs text-slate-500">
                        Try adjusting your search query or status filter.
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              supports.map((item) => {
                const statusKey = (item.status || "open").toLowerCase();
                const config = SUPPORT_STATUS_BADGE_CONFIG[statusKey] || {
                  label: item.status,
                  bg: "bg-slate-100",
                  text: "text-slate-700",
                  border: "border-slate-200",
                  dot: "bg-slate-400",
                };
                const isCurrentlyUpdating = updatingId === item._id;

                return (
                  <TableRow
                    key={item._id}
                    className="border-slate-100 hover:bg-slate-50/60 transition-colors"
                  >
                    {/* Ticket Code */}
                    <TableCell className="py-4 px-6 whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50/70 border border-blue-100 text-blue-700 font-mono font-bold text-xs">
                        <Ticket className="h-3 w-3 text-blue-500 shrink-0" />
                        <span>#{item.ticket || item._id.slice(-6)}</span>
                      </div>
                    </TableCell>

                    {/* User & Contact */}
                    <TableCell className="py-4 px-4">
                      <div className="flex flex-col gap-1 min-w-[180px]">
                        <span className="font-bold text-slate-900 text-sm">
                          {item.fullName || "Anonymous"}
                        </span>
                        <div className="flex flex-col gap-0.5 text-xs text-slate-500">
                          {item.email && (
                            <div className="flex items-center gap-1.5 truncate max-w-[220px]">
                              <Mail className="h-3 w-3 text-slate-400 shrink-0" />
                              <span className="truncate" title={item.email}>
                                {item.email}
                              </span>
                            </div>
                          )}
                          {item.phone && (
                            <div className="flex items-center gap-1.5">
                              <Phone className="h-3 w-3 text-slate-400 shrink-0" />
                              <span>{item.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>

                    {/* Subject & Message (Excluding replyMessage & replyAt) */}
                    <TableCell className="py-4 px-4">
                      <div className="flex flex-col gap-1 max-w-[280px] sm:max-w-[340px]">
                        <span className="font-semibold text-slate-900 text-xs sm:text-sm line-clamp-1">
                          {item.subject || "No Subject"}
                        </span>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {item.message || "No description provided."}
                        </p>
                      </div>
                    </TableCell>

                    {/* Created Date */}
                    <TableCell className="py-4 px-4 whitespace-nowrap text-xs text-slate-600 font-medium">
                      {formatDate(item.createdAt)}
                    </TableCell>

                    {/* Status Badge with Click to Change Modal (if not closed) */}
                    <TableCell className="py-4 px-4 whitespace-nowrap">
                      {statusKey === "closed" ? (
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border} select-none cursor-default`}
                          title="Closed ticket (Locked)"
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
                          <span className="capitalize">{config.label}</span>
                        </span>
                      ) : (
                        <ChangeSupportStatusModal
                          item={item}
                          trigger={
                            <button
                              type="button"
                              className={`group/status inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer border transition-all hover:opacity-85 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-2xs ${config.bg} ${config.text} ${config.border}`}
                              title="Click to change status"
                            >
                              <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
                              <span className="capitalize">{config.label}</span>
                            </button>
                          }
                        />
                      )}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="py-4 px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {statusKey !== "closed" && (
                          <ChangeSupportStatusModal
                            item={item}
                            trigger={
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 px-2.5 text-xs font-semibold border-slate-200 text-slate-700 hover:bg-slate-100 rounded-lg shadow-2xs transition-colors cursor-pointer"
                                title="Update Status"
                              >
                                Update Status
                              </Button>
                            }
                          />
                        )}
                        <SupportDetailsModal item={item} />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination & Limit Footer */}
      <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50 text-xs text-slate-600">
        <div className="flex items-center gap-3">
          <span>
            Showing <strong className="text-slate-900">{startItem}</strong> to{" "}
            <strong className="text-slate-900">{endItem}</strong> of{" "}
            <strong className="text-slate-900">{totalItems}</strong> tickets
          </span>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">|</span>
            <span className="text-slate-500">Rows:</span>
            <Select
              value={String(limit)}
              onValueChange={(val) => onLimitChange(Number(val))}
            >
              <SelectTrigger className="h-7 w-16 bg-white border-slate-200 rounded-lg text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl border border-slate-100 text-xs shadow-md">
                {[5, 10, 20, 50].map((opt) => (
                  <SelectItem key={opt} value={String(opt)} className="text-xs cursor-pointer">
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(Math.max(1, page - 1))}
              disabled={page <= 1 || isLoading || isFetching}
              className="h-8 px-2.5 border-slate-200 text-slate-600 hover:text-slate-900 rounded-lg text-xs font-semibold cursor-pointer disabled:opacity-40"
            >
              <ChevronLeft className="h-3.5 w-3.5 mr-1" />
              Prev
            </Button>

            <span className="text-xs font-semibold px-2 text-slate-700">
              Page {page} of {totalPages}
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(Math.min(totalPages, page + 1))}
              disabled={page >= totalPages || isLoading || isFetching}
              className="h-8 px-2.5 border-slate-200 text-slate-600 hover:text-slate-900 rounded-lg text-xs font-semibold cursor-pointer disabled:opacity-40"
            >
              Next
              <ChevronRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
