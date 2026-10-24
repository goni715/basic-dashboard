"use client";

import { useState } from "react";
import {
  Eye,
  Star,
  Mail,
  Phone,
  MapPin,
  Award,
  Stethoscope,
  Briefcase,
  GraduationCap,
  Banknote,
  Calendar,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  Clock,
  XCircle,
  Hash,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { IDoctor } from "@/types/doctor.type";
import UpdateApprovalStatusModal from "./UpdateApprovalStatusModal";
import ChangeDoctorStatusModal from "./ChangeDoctorStatusModal";

interface DoctorDetailsModalProps {
  doctor: IDoctor;
  trigger?: React.ReactNode;
}

export default function DoctorDetailsModal({
  doctor,
  trigger,
}: DoctorDetailsModalProps) {
  const [open, setOpen] = useState(false);

  const getInitials = (name?: string) => {
    if (!name) return "DR";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch {
      return dateStr;
    }
  };

  const displayName = `${doctor.title ? `${doctor.title} ` : ""}${doctor.fullName || doctor.name || "Doctor"}`;

  return (
    <>
      {trigger ? (
        <span onClick={() => setOpen(true)} className="inline-flex cursor-pointer">
          {trigger}
        </span>
      ) : (
        <Button
          size="sm"
          variant="outline"
          onClick={() => setOpen(true)}
          className="h-8 w-8 p-0 border-blue-200 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg shadow-xs transition-colors cursor-pointer"
          title="View Doctor Details"
        >
          <Eye className="h-4 w-4" />
        </Button>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[720px] p-0 rounded-2xl gap-0 overflow-hidden max-h-[92vh] flex flex-col bg-white border-slate-100 shadow-xl">
          {/* Header */}
          <div className="p-6 pb-4 border-b border-slate-100 shrink-0 bg-slate-50/50">
            <DialogTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-blue-600" />
              Doctor Profile Details
            </DialogTitle>
            <DialogDescription className="text-slate-500 text-xs sm:text-sm mt-1">
              Complete professional credentials, contact information, and account details.
            </DialogDescription>
          </div>

          {/* Scrollable Body */}
          <div className="px-6 overflow-y-auto flex-1 custom-scrollbar py-4 space-y-5">
            {/* Top Profile Card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-6 text-white shadow-md">
              <div className="relative z-10 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                <Avatar className="h-20 w-20 rounded-2xl border-2 border-white/20 shadow-md shrink-0 bg-slate-800">
                  {doctor.profileImg ? (
                    <AvatarImage
                      src={doctor.profileImg}
                      alt={doctor.fullName}
                      className="object-cover"
                    />
                  ) : null}
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-teal-500 text-white text-xl font-bold rounded-2xl">
                    {getInitials(doctor.fullName || doctor.name)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-1.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-bold text-white tracking-tight truncate">
                      {displayName}
                    </h3>
                  </div>

                  <p className="text-blue-200 text-sm font-medium flex items-center gap-2">
                    <Award className="h-4 w-4 text-teal-400 shrink-0" />
                    <span>{doctor.specialization || doctor.specialty || "General Medicine"}</span>
                    {doctor.designation && (
                      <span className="text-slate-400">• {doctor.designation}</span>
                    )}
                  </p>

                  {doctor.hospital && (
                    <p className="text-xs text-slate-300 flex items-center gap-1.5">
                      <Briefcase className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span>{doctor.hospital}</span>
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    {/* Status badge */}
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        doctor.status === "published"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : doctor.status === "archive"
                          ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                          : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      Status: {doctor.status ? doctor.status.charAt(0).toUpperCase() + doctor.status.slice(1) : "Draft"}
                    </span>

                    {/* Approval Status badge */}
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        doctor.approvalStatus === "approved"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : doctor.approvalStatus === "rejected"
                          ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                          : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      Approval: {doctor.approvalStatus ? doctor.approvalStatus.charAt(0).toUpperCase() + doctor.approvalStatus.slice(1) : "Pending"}
                    </span>

                    {/* User Status badge */}
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        doctor.userStatus === "active"
                          ? "bg-teal-500/20 text-teal-300 border border-teal-500/30"
                          : "bg-slate-500/20 text-slate-300 border border-slate-500/30"
                      }`}
                    >
                      User: {doctor.userStatus ? doctor.userStatus.charAt(0).toUpperCase() + doctor.userStatus.slice(1) : "Active"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rejection Reason Alert if rejected */}
            {(doctor.approvalStatus === "rejected" || doctor.rejectionReason) && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800">
                <AlertTriangle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <span className="font-bold">Rejection Reason: </span>
                  <span>{doctor.rejectionReason || "No specific reason provided."}</span>
                </div>
              </div>
            )}

            {/* Two Column Grid for Key Data */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Professional Credentials Card */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-blue-600" />
                  Professional Credentials
                </h4>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500 text-xs">BMDC Number</span>
                    <span className="font-mono font-semibold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 text-xs">
                      {doctor.bmdcNumber || "Not Provided"}
                    </span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500 text-xs">Specialization</span>
                    <span className="font-semibold text-slate-900 text-right text-xs">
                      {doctor.specialization || "N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500 text-xs">Designation</span>
                    <span className="font-semibold text-slate-900 text-right text-xs">
                      {doctor.designation || "N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500 text-xs">Experience</span>
                    <span className="font-semibold text-emerald-600 text-xs">
                      {doctor.experience || "N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between py-1">
                    <span className="text-slate-500 text-xs">Consultation Fee</span>
                    <span className="font-bold text-blue-600 text-xs">
                      {doctor.consultationFee !== undefined && doctor.consultationFee !== null
                        ? `৳ ${Number(doctor.consultationFee).toLocaleString()}`
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Information Card */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Mail className="h-4 w-4 text-blue-600" />
                  Contact Information
                </h4>

                <div className="space-y-2 text-sm">
                  <div className="flex flex-col py-1 border-b border-slate-200/60 gap-0.5">
                    <span className="text-slate-500 text-xs flex items-center gap-1">
                      <Mail className="h-3 w-3 text-slate-400" /> Email
                    </span>
                    <a
                      href={`mailto:${doctor.email}`}
                      className="font-medium text-blue-600 hover:underline text-xs break-all"
                    >
                      {doctor.email || "N/A"}
                    </a>
                  </div>

                  <div className="flex flex-col py-1 border-b border-slate-200/60 gap-0.5">
                    <span className="text-slate-500 text-xs flex items-center gap-1">
                      <Phone className="h-3 w-3 text-slate-400" /> Phone Number
                    </span>
                    <a
                      href={`tel:${doctor.phone}`}
                      className="font-medium text-slate-800 text-xs"
                    >
                      {doctor.phone || "N/A"}
                    </a>
                  </div>

                  <div className="flex flex-col py-1 gap-0.5">
                    <span className="text-slate-500 text-xs flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-slate-400" /> Clinic / Chamber Address
                    </span>
                    <span className="text-slate-700 text-xs leading-relaxed">
                      {doctor.address || "No address provided"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Education & Qualifications */}
            <div className="rounded-xl border border-slate-100 bg-slate-50/30 p-4 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <GraduationCap className="h-4 w-4 text-blue-600" />
                Education & Qualifications
              </h4>

              <div className="space-y-2">
                <div>
                  <span className="text-xs font-semibold text-slate-600">Degrees & Education:</span>
                  <p className="text-xs text-slate-700 mt-0.5 bg-white p-2.5 rounded-lg border border-slate-100">
                    {Array.isArray(doctor.education)
                      ? doctor.education.join(", ")
                      : doctor.education || "No education details provided"}
                  </p>
                </div>

                {doctor.qualifications && (
                  <div>
                    <span className="text-xs font-semibold text-slate-600">Other Qualifications & Memberships:</span>
                    <p className="text-xs text-slate-700 mt-0.5 bg-white p-2.5 rounded-lg border border-slate-100">
                      {doctor.qualifications}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* About Doctor */}
            {doctor.about && (
              <div className="rounded-xl border border-slate-100 bg-slate-50/30 p-4 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  About the Doctor
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line bg-white p-3 rounded-lg border border-slate-100">
                  {doctor.about}
                </p>
              </div>
            )}

            {/* System & Audit Information */}
            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 space-y-2.5 text-xs text-slate-500">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Hash className="h-3.5 w-3.5 text-slate-400" />
                System & Audit Information
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 pt-1 font-mono text-[11px]">
                <div>
                  <span className="text-slate-400 font-sans">Doctor ID:</span>{" "}
                  <span className="text-slate-700">{doctor._id || doctor.id || "N/A"}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-sans">User ID:</span>{" "}
                  <span className="text-slate-700">{doctor.userId || "N/A"}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-sans">Source:</span>{" "}
                  <span className="text-slate-700 capitalize">
                    {doctor.registrationSource || "admin"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-sans">Rating:</span>{" "}
                  <span className="text-slate-700">
                    ⭐ {doctor.rating ?? 0} ({doctor.totalReviews ?? 0} reviews)
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-sans">Created At:</span>{" "}
                  <span className="text-slate-700">{formatDate(doctor.createdAt)}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-sans">Updated At:</span>{" "}
                  <span className="text-slate-700">{formatDate(doctor.updatedAt)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <DialogFooter className="p-4 border-t border-slate-100 bg-slate-50/50 shrink-0 flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <UpdateApprovalStatusModal
                doctor={doctor}
                trigger={
                  <Button
                    type="button"
                    size="sm"
                    className="rounded-xl h-9 px-3.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer flex items-center gap-1.5 shadow-xs w-full sm:w-auto"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    <span>Approval Status</span>
                  </Button>
                }
              />

              <ChangeDoctorStatusModal
                doctor={doctor}
                trigger={
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="rounded-xl h-9 px-3.5 text-xs font-bold border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer flex items-center gap-1.5 shadow-xs w-full sm:w-auto"
                  >
                    <Globe className="h-4 w-4 text-blue-600" />
                    <span>Publishing Status</span>
                  </Button>
                }
              />
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="rounded-xl h-9 px-5 border-slate-200 font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer w-full sm:w-auto"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
