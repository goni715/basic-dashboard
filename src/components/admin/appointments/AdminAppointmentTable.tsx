"use client";

import {
  ChevronLeft,
  ChevronRight,
  User,
  Loader2,
  Calendar,
  Clock,
  Phone,
  Building2,
  Stethoscope,
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
import {
  IAdminAppointment,
  IAppointmentPaginationMeta,
} from "@/types/admin-appointment.type";
import AdminAppointmentDetailsModal from "@/components/modal/appointment/AdminAppointmentDetailsModal";

interface AdminAppointmentTableProps {
  appointments?: IAdminAppointment[];
  meta?: IAppointmentPaginationMeta;
  isLoading?: boolean;
  isFetching?: boolean;
  page?: number;
  onPageChange?: (page: number) => void;
  limit?: number;
  onLimitChange?: (limit: number) => void;
}

export default function AdminAppointmentTable({
  appointments = [],
  meta,
  isLoading = false,
  isFetching = false,
  page = 1,
  onPageChange,
  limit = 10,
  onLimitChange,
}: AdminAppointmentTableProps) {
  const getInitials = (name?: string) => {
    if (!name) return "PT";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const renderStatusBadge = (status?: string) => {
    const s = (status || "").toLowerCase();
    switch (s) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Pending
          </span>
        );
      case "confirmed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
            Confirmed
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

  const totalPages =
    meta?.totalPages || (meta?.total ? Math.ceil(meta.total / limit) : 1);
  const totalCount =
    meta?.total !== undefined ? meta.total : appointments.length;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Table Header Section */}
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between sm:items-center gap-3 bg-gradient-to-r from-white to-slate-50/50">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Appointment List
            </h2>
            
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Patient consultation bookings and scheduled doctor sessions.
          </p>
        </div>

        {meta?.total !== undefined && (
          <div className="text-xs font-semibold text-slate-500 bg-slate-100/70 px-3 py-1.5 rounded-lg w-fit">
            Total: <span className="text-slate-900 font-bold">{meta.total}</span>{" "}
            Appointments
          </div>
        )}
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/60">
            <TableRow className="border-slate-100 hover:bg-transparent">
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap py-3.5 px-6 text-xs uppercase tracking-wider">
                Appointment Code & Patient
              </TableHead>
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-xs uppercase tracking-wider">
                Doctor
              </TableHead>
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-xs uppercase tracking-wider">
                Schedule & Date
              </TableHead>
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-xs uppercase tracking-wider text-center">
                Serial
              </TableHead>
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-xs uppercase tracking-wider">
                Problem / Symptoms
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
                        <div className="h-3.5 w-28 bg-slate-200 rounded" />
                        <div className="h-2.5 w-20 bg-slate-100 rounded" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="h-3 w-32 bg-slate-200 rounded" />
                  </TableCell>
                  <TableCell>
                    <div className="h-3 w-32 bg-slate-200 rounded" />
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="h-4 w-10 bg-slate-200 rounded mx-auto" />
                  </TableCell>
                  <TableCell>
                    <div className="h-3 w-40 bg-slate-200 rounded" />
                  </TableCell>
                  <TableCell>
                    <div className="h-5 w-20 bg-slate-200 rounded-full" />
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <div className="h-8 w-8 bg-slate-200 rounded-lg ml-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : appointments.length === 0 ? (
              // Empty State
              <TableRow>
                <TableCell colSpan={7} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center gap-2 max-w-sm mx-auto text-slate-500">
                    <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-1">
                      <User className="h-6 w-6" />
                    </div>
                    <p className="text-base font-semibold text-slate-800">
                      No Appointments Found
                    </p>
                    <p className="text-xs text-slate-400">
                      No consultation bookings match your search or filter criteria.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              // Data Rows
              appointments.map((apt) => {
                const id = apt._id || apt.id || "";
                const aptCode = apt.appointmentCode || apt.bookingId || "APT";
                const patientDisplayName =
                  apt.patientName || apt.patient || "Patient";
                const doctorDisplayName =
                  (apt.doctorTitle ? `${apt.doctorTitle} ` : "") +
                  (apt.doctorName || apt.doctor || "Doctor");

                return (
                  <TableRow
                    key={id}
                    className="border-slate-100 hover:bg-slate-50/60 transition-colors group"
                  >
                    {/* Patient & Code */}
                    <TableCell className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 rounded-xl border border-slate-200 shrink-0 shadow-xs">
                          <AvatarFallback className="bg-gradient-to-tr from-emerald-600 to-teal-600 text-white font-bold text-xs">
                            {getInitials(patientDisplayName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col min-w-0">
                          <span className="font-bold text-slate-900 text-sm truncate max-w-[170px]">
                            {patientDisplayName}
                          </span>
                          <span className="font-mono text-xs text-blue-600 font-semibold mt-0.5">
                            {aptCode}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Doctor Info */}
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-8 w-8 rounded-lg border border-slate-200 shrink-0">
                          {apt.doctorProfileImg && (
                            <AvatarImage
                              src={apt.doctorProfileImg}
                              alt={doctorDisplayName}
                              className="object-cover"
                            />
                          )}
                          <AvatarFallback className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-[10px]">
                            {getInitials(doctorDisplayName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col min-w-0 max-w-[170px]">
                          <span className="text-xs font-bold text-slate-900 truncate">
                            {doctorDisplayName}
                          </span>
                          <span className="text-[11px] text-slate-500 truncate">
                            {apt.doctorSpecialization || "Specialist"}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Schedule & Date */}
                    <TableCell>
                      <div className="flex flex-col min-w-0 max-w-[180px]">
                        <span className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                          <Calendar className="h-3 w-3 text-slate-400 shrink-0" />
                          {apt.appointmentDate
                            ? new Date(apt.appointmentDate).toLocaleDateString()
                            : apt.date || "N/A"}
                        </span>
                        <span className="text-[11px] text-blue-600 font-medium flex items-center gap-1.5 mt-0.5">
                          <Clock className="h-3 w-3 text-blue-400 shrink-0" />
                          {apt.schedule || apt.time || "TBD"}
                        </span>
                      </div>
                    </TableCell>

                    {/* Serial */}
                    <TableCell className="text-center">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        #{apt.serialNumber ?? "—"}
                      </span>
                    </TableCell>

                    {/* Problem / Reason */}
                    <TableCell>
                      <p className="text-xs text-slate-600 max-w-[200px] truncate" title={apt.problem || ""}>
                        {apt.problem || "No problem noted"}
                      </p>
                    </TableCell>

                    {/* Status */}
                    <TableCell className="whitespace-nowrap">
                      {renderStatusBadge(apt.status)}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right px-6">
                      <div className="flex items-center justify-end gap-1.5">
                        <AdminAppointmentDetailsModal appointment={apt} />
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
