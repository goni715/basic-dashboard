"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Eye,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Stethoscope,
  Building2,
  AlertCircle,
  FileText,
  Hash,
  Activity,
  HeartPulse,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { IAdminAppointment } from "@/types/admin-appointment.type";

interface AdminAppointmentDetailsModalProps {
  appointment: IAdminAppointment;
  trigger?: React.ReactNode;
}

export default function AdminAppointmentDetailsModal({
  appointment,
  trigger,
}: AdminAppointmentDetailsModalProps) {
  const [open, setOpen] = useState(false);

  const aptCode = appointment.appointmentCode || appointment.bookingId || "N/A";
  const patientDisplayName =
    appointment.patientName || appointment.patient || "Patient";
  const doctorDisplayName =
    (appointment.doctorTitle ? `${appointment.doctorTitle} ` : "") +
    (appointment.doctorName || appointment.doctor || "Doctor");

  const getInitials = (name?: string) => {
    if (!name) return "PT";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const getStatusBadge = (status?: string) => {
    const s = (status || "").toLowerCase();
    switch (s) {
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "confirmed":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "cancelled":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const formatStatus = (s?: string) => {
    if (!s) return "N/A";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          trigger ? (
            (trigger as React.ReactElement)
          ) : (
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors"
              title="View appointment details"
            />
          )
        }
      >
        {!trigger && <Eye className="h-4 w-4" />}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[620px] p-0 rounded-2xl gap-0 overflow-hidden bg-white border border-slate-100 shadow-2xl">
        <div className="p-6 pb-4 border-b border-slate-100 bg-gradient-to-r from-slate-50/80 to-blue-50/30">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-slate-900 tracking-tight">
              Appointment Details
            </DialogTitle>
            <span className="font-mono text-xs font-bold px-2.5 py-1 bg-blue-100 text-blue-700 rounded-md">
              {aptCode}
            </span>
          </div>
          <DialogDescription className="text-slate-500 text-xs mt-1">
            Complete booking schedule, doctor assignment, and clinical notes.
          </DialogDescription>
        </div>

        <div className="px-6 py-5 overflow-y-auto max-h-[75vh] space-y-5">
          {/* Appointment Header Info Card */}
          <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-base shrink-0">
                <Calendar className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-900">
                  {appointment.appointmentDate
                    ? new Date(appointment.appointmentDate).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )
                    : appointment.date || "N/A"}
                </span>
                <span className="text-xs text-blue-600 font-medium flex items-center gap-1.5 mt-0.5">
                  <Clock className="h-3.5 w-3.5" />
                  {appointment.schedule || appointment.time || "Schedule TBD"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              {appointment.serialNumber !== undefined && (
                <span className="text-xs font-mono font-bold px-2.5 py-1 bg-slate-200/70 text-slate-800 rounded-lg">
                  Serial: #{appointment.serialNumber}
                </span>
              )}
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(
                  appointment.status
                )}`}
              >
                {formatStatus(appointment.status)}
              </span>
            </div>
          </div>

          {/* Doctor & Patient Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Doctor Card */}
            <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/40 space-y-3">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Doctor Profile
              </span>
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 rounded-xl border border-slate-200 shrink-0">
                  {appointment.doctorProfileImg && (
                    <AvatarImage
                      src={appointment.doctorProfileImg}
                      alt={doctorDisplayName}
                      className="object-cover"
                    />
                  )}
                  <AvatarFallback className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs">
                    {getInitials(doctorDisplayName)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-slate-900 truncate">
                    {doctorDisplayName}
                  </span>
                  <span className="text-xs text-blue-600 font-medium truncate">
                    {appointment.doctorSpecialization || "General Physician"}
                  </span>
                  {appointment.doctorHospital && (
                    <span className="text-[11px] text-slate-400 truncate flex items-center gap-1">
                      <Building2 className="h-3 w-3" />
                      {appointment.doctorHospital}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-1 text-xs text-slate-600">
                {appointment.doctorPhone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>{appointment.doctorPhone}</span>
                  </div>
                )}
                {appointment.doctorEmail && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{appointment.doctorEmail}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Patient Card */}
            <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/40 space-y-3">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Patient Details
              </span>
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 rounded-xl border border-slate-200 shrink-0">
                  <AvatarFallback className="bg-gradient-to-tr from-emerald-600 to-teal-600 text-white font-bold text-xs">
                    {getInitials(patientDisplayName)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-slate-900 truncate">
                    {patientDisplayName}
                  </span>
                  {appointment.bloodGroup && (
                    <span className="text-xs text-rose-600 font-semibold flex items-center gap-1">
                      <HeartPulse className="h-3 w-3" /> Blood Group: {appointment.bloodGroup}
                    </span>
                  )}
                  {appointment.dateOfBirth && (
                    <span className="text-[11px] text-slate-400">
                      DOB: {new Date(appointment.dateOfBirth).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-1 text-xs text-slate-600">
                {appointment.patientPhone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>{appointment.patientPhone}</span>
                  </div>
                )}
                {appointment.patientEmail && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{appointment.patientEmail}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Problem / Reason */}
          {appointment.problem && (
            <div className="bg-blue-50/40 p-4 rounded-xl border border-blue-100/70">
              <span className="text-xs font-bold text-blue-950 block mb-1">
                Patient Problem / Symptoms:
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                {appointment.problem}
              </p>
            </div>
          )}

          {/* Doctor Notes (if any) */}
          {appointment.doctorNotes && (
            <div className="bg-amber-50/40 p-4 rounded-xl border border-amber-100/70">
              <span className="text-xs font-bold text-amber-950 block mb-1">
                Doctor Notes:
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                {appointment.doctorNotes}
              </p>
            </div>
          )}

          {/* Cancel Reason (if cancelled) */}
          {appointment.cancelReason && (
            <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-100">
              <span className="text-xs font-bold text-rose-900 block mb-1">
                Cancellation Reason:
              </span>
              <p className="text-xs text-rose-700 leading-relaxed">
                {appointment.cancelReason}
              </p>
            </div>
          )}

          {/* Meta timestamps */}
          <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>
              Booked:{" "}
              {appointment.createdAt
                ? new Date(appointment.createdAt).toLocaleString()
                : "N/A"}
            </span>
            <span>
              Updated:{" "}
              {appointment.updatedAt
                ? new Date(appointment.updatedAt).toLocaleString()
                : "N/A"}
            </span>
          </div>
        </div>

        <DialogFooter className="p-4 border-t border-slate-100 bg-slate-50/50">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            className="rounded-xl border-slate-200 text-xs font-medium cursor-pointer"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
