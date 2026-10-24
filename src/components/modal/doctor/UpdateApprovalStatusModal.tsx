"use client";

import { useState, useEffect } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
  Stethoscope,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IDoctor } from "@/types/doctor.type";
import { useUpdateDoctorApprovalStatusMutation } from "@/redux/features/doctor/doctorApi";

interface UpdateApprovalStatusModalProps {
  doctor: IDoctor;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function UpdateApprovalStatusModal({
  doctor,
  trigger,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: UpdateApprovalStatusModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? setControlledOpen! : setInternalOpen;

  const [approvalStatus, setApprovalStatus] = useState<"approved" | "rejected">(
    doctor.approvalStatus === "rejected" ? "rejected" : "approved"
  );
  const [rejectionReason, setRejectionReason] = useState(
    doctor.rejectionReason || ""
  );
  const [validationError, setValidationError] = useState<string | null>(null);

  const [updateApprovalStatus, { isLoading }] =
    useUpdateDoctorApprovalStatusMutation();

  // Reset local form states whenever doctor changes or modal opens
  useEffect(() => {
    if (open) {
      setApprovalStatus(
        doctor.approvalStatus === "rejected" ? "rejected" : "approved"
      );
      setRejectionReason(doctor.rejectionReason || "");
      setValidationError(null);
    }
  }, [open, doctor]);

  const getInitials = (name?: string) => {
    if (!name) return "DR";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const displayName = `${doctor.title ? `${doctor.title} ` : ""}${
    doctor.fullName || doctor.name || "Doctor"
  }`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation: rejectionReason is mandatory when approvalStatus is rejected
    if (approvalStatus === "rejected" && !rejectionReason.trim()) {
      setValidationError("Rejection reason is required when rejecting a doctor.");
      return;
    }

    setValidationError(null);

    const doctorId = doctor._id || doctor.id;
    if (!doctorId) return;

    try {
      const payload: {
        doctorId: string;
        approvalStatus: "approved" | "rejected";
        rejectionReason?: string;
      } = {
        doctorId,
        approvalStatus,
      };

      if (approvalStatus === "rejected") {
        payload.rejectionReason = rejectionReason.trim();
      }

      await updateApprovalStatus(payload).unwrap();
      setOpen(false);
    } catch {
      // Error is automatically toasted in doctorApi onQueryStarted
    }
  };

  return (
    <>
      {trigger ? (
        <span
          onClick={() => setOpen(true)}
          className="inline-flex cursor-pointer"
        >
          {trigger}
        </span>
      ) : null}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px] p-0 rounded-2xl gap-0 overflow-hidden bg-white border-slate-100 shadow-xl">
          {/* Header */}
          <div className="p-6 pb-4 border-b border-slate-100 bg-slate-50/50">
            <DialogTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-blue-600" />
              Update Doctor Approval Status
            </DialogTitle>
            <DialogDescription className="text-slate-500 text-xs sm:text-sm mt-1">
              Approve or reject this doctor&apos;s registration and credentials.
            </DialogDescription>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Doctor Info Summary Card */}
            <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/70">
              <Avatar className="h-11 w-11 border border-slate-200 shrink-0 bg-blue-50">
                {doctor.profileImg ? (
                  <AvatarImage
                    src={doctor.profileImg}
                    alt={displayName}
                    className="object-cover"
                  />
                ) : null}
                <AvatarFallback className="bg-gradient-to-br from-blue-600 to-teal-500 text-white font-bold text-xs">
                  {getInitials(doctor.fullName || doctor.name)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-900 text-sm truncate">
                  {displayName}
                </h4>
                <p className="text-xs text-slate-500 flex items-center gap-1.5 truncate">
                  <Stethoscope className="h-3 w-3 text-slate-400 shrink-0" />
                  <span>{doctor.specialization || "General Medicine"}</span>
                  {doctor.bmdcNumber && (
                    <span className="font-mono text-slate-400">
                      • BMDC: {doctor.bmdcNumber}
                    </span>
                  )}
                </p>
              </div>

              <div className="shrink-0 text-right">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Current
                </span>
                <Badge
                  variant="outline"
                  className={`text-[11px] font-bold capitalize mt-0.5 ${
                    doctor.approvalStatus === "approved"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : doctor.approvalStatus === "rejected"
                      ? "bg-rose-50 text-rose-700 border-rose-200"
                      : "bg-amber-50 text-amber-700 border-amber-200"
                  }`}
                >
                  {doctor.approvalStatus || "Pending"}
                </Badge>
              </div>
            </div>

            {/* Approval Decision Options */}
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Decision <span className="text-rose-500">*</span>
              </Label>

              <div className="grid grid-cols-2 gap-3">
                {/* Approve Button */}
                <button
                  type="button"
                  onClick={() => {
                    setApprovalStatus("approved");
                    setValidationError(null);
                  }}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                    approvalStatus === "approved"
                      ? "border-emerald-500 bg-emerald-50/70 text-emerald-800 ring-2 ring-emerald-500/20 shadow-xs font-semibold"
                      : "border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <CheckCircle2
                    className={`h-5 w-5 mb-1.5 ${
                      approvalStatus === "approved"
                        ? "text-emerald-600"
                        : "text-slate-400"
                    }`}
                  />
                  <span className="text-sm font-bold">Approve</span>
                  <span className="text-[11px] text-slate-500 mt-0.5">
                    Activate doctor profile
                  </span>
                </button>

                {/* Reject Button */}
                <button
                  type="button"
                  onClick={() => {
                    setApprovalStatus("rejected");
                  }}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                    approvalStatus === "rejected"
                      ? "border-rose-500 bg-rose-50/70 text-rose-800 ring-2 ring-rose-500/20 shadow-xs font-semibold"
                      : "border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <XCircle
                    className={`h-5 w-5 mb-1.5 ${
                      approvalStatus === "rejected"
                        ? "text-rose-600"
                        : "text-slate-400"
                    }`}
                  />
                  <span className="text-sm font-bold">Reject</span>
                  <span className="text-[11px] text-slate-500 mt-0.5">
                    Requires reason
                  </span>
                </button>
              </div>
            </div>

            {/* Rejection Reason (Mandatory if rejected) */}
            {approvalStatus === "rejected" && (
              <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex justify-between items-center">
                  <Label
                    htmlFor="rejectionReason"
                    className="text-xs font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1"
                  >
                    Rejection Reason <span className="text-rose-500">*</span>
                  </Label>
                  <span className="text-[11px] text-slate-400">
                    Mandatory for rejection
                  </span>
                </div>

                <Textarea
                  id="rejectionReason"
                  value={rejectionReason}
                  onChange={(e) => {
                    setRejectionReason(e.target.value);
                    if (validationError && e.target.value.trim()) {
                      setValidationError(null);
                    }
                  }}
                  placeholder="e.g. Invalid BMDC registration number, credentials could not be verified, or incomplete clinical background..."
                  className={`min-h-[100px] text-xs sm:text-sm rounded-xl resize-none ${
                    validationError
                      ? "border-rose-300 focus-visible:ring-rose-500/30 bg-rose-50/20"
                      : "border-slate-200 focus-visible:ring-blue-500/20"
                  }`}
                />

                {validationError && (
                  <p className="text-xs font-semibold text-rose-600 flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{validationError}</span>
                  </p>
                )}
              </div>
            )}

            {/* Note banner when approving */}
            {approvalStatus === "approved" && (
              <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>
                  Approving will verify this doctor and mark their account as active.
                </span>
              </div>
            )}

            <DialogFooter className="pt-2 gap-2 flex-col sm:flex-row">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isLoading}
                className="rounded-xl h-10 px-4 text-xs font-semibold border-slate-200 hover:bg-slate-50 flex-1 cursor-pointer"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isLoading}
                className={`rounded-xl h-10 px-5 text-xs font-bold text-white flex-1 cursor-pointer flex items-center justify-center gap-1.5 shadow-sm transition-all ${
                  approvalStatus === "approved"
                    ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20"
                    : "bg-rose-600 hover:bg-rose-700 shadow-rose-500/20"
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                    <span>Updating...</span>
                  </>
                ) : approvalStatus === "approved" ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Confirm Approval</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4" />
                    <span>Confirm Rejection</span>
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
