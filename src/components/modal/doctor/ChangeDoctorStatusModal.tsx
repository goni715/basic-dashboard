"use client";

import { useState, useEffect } from "react";
import {
  Globe,
  FileEdit,
  Archive,
  Loader2,
  Stethoscope,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IDoctor, TDoctorStatus } from "@/types/doctor.type";
import { useChangeDoctorStatusMutation } from "@/redux/features/doctor/doctorApi";

interface ChangeDoctorStatusModalProps {
  doctor: IDoctor;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function ChangeDoctorStatusModal({
  doctor,
  trigger,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: ChangeDoctorStatusModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? setControlledOpen! : setInternalOpen;

  const currentStatus = (doctor.status?.toLowerCase() || "draft") as TDoctorStatus;
  const [selectedStatus, setSelectedStatus] = useState<TDoctorStatus>(currentStatus);

  const [changeStatus, { isLoading }] = useChangeDoctorStatusMutation();

  useEffect(() => {
    if (open) {
      setSelectedStatus((doctor.status?.toLowerCase() || "draft") as TDoctorStatus);
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

    const doctorId = doctor._id || doctor.id;
    if (!doctorId) return;

    try {
      await changeStatus({
        doctorId,
        status: selectedStatus as "published" | "draft" | "archive",
      }).unwrap();
      setOpen(false);
    } catch {
      // Error handled by onQueryStarted in doctorApi
    }
  };

  const statusOptions = [
    {
      value: "published" as const,
      title: "Published",
      desc: "Profile is active and publicly visible to patients in the mobile app.",
      icon: Globe,
      activeColor: "border-emerald-500 bg-emerald-50/70 text-emerald-900 ring-2 ring-emerald-500/20",
      iconColor: "text-emerald-600",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      value: "draft" as const,
      title: "Draft",
      desc: "Profile is hidden from patients and saved as draft for administrative review.",
      icon: FileEdit,
      activeColor: "border-amber-500 bg-amber-50/70 text-amber-900 ring-2 ring-amber-500/20",
      iconColor: "text-amber-600",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      value: "archive" as const,
      title: "Archive",
      desc: "Profile is deactivated and archived from active directory listings.",
      icon: Archive,
      activeColor: "border-purple-500 bg-purple-50/70 text-purple-900 ring-2 ring-purple-500/20",
      iconColor: "text-purple-600",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    },
  ];

  return (
    <>
      {trigger ? (
        <span onClick={() => setOpen(true)} className="inline-flex cursor-pointer">
          {trigger}
        </span>
      ) : null}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[480px] p-0 rounded-2xl gap-0 overflow-hidden bg-white border-slate-100 shadow-xl">
          {/* Header */}
          <div className="p-6 pb-4 border-b border-slate-100 bg-slate-50/50">
            <DialogTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-600" />
              Change Doctor Status
            </DialogTitle>
            <DialogDescription className="text-slate-500 text-xs sm:text-sm mt-1">
              Select the visibility and publishing status for this doctor profile.
            </DialogDescription>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Doctor Info Card */}
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
                </p>
              </div>

              <div className="shrink-0 text-right">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Current Status
                </span>
                <Badge
                  variant="outline"
                  className={`text-[11px] font-bold capitalize mt-0.5 ${
                    doctor.status === "published"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : doctor.status === "archive"
                      ? "bg-purple-50 text-purple-700 border-purple-200"
                      : "bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  {doctor.status || "Draft"}
                </Badge>
              </div>
            </div>

            {/* Status Options List */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                Select New Status
              </span>

              <div className="space-y-2">
                {statusOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = selectedStatus === opt.value;

                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setSelectedStatus(opt.value)}
                      className={`w-full flex items-start gap-3.5 p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? opt.activeColor
                          : "border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <div
                        className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected
                            ? "bg-white shadow-xs"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <Icon className={`h-4.5 w-4.5 ${isSelected ? opt.iconColor : ""}`} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm tracking-tight">
                            {opt.title}
                          </span>
                          {isSelected && (
                            <CheckCircle2 className="h-4 w-4 text-current shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                          {opt.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer Buttons */}
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
                disabled={isLoading || selectedStatus === currentStatus}
                className="rounded-xl h-10 px-5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-500/20 flex-1 cursor-pointer flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                    <span>Updating...</span>
                  </>
                ) : (
                  <span>Update Status</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
