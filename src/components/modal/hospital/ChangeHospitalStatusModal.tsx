"use client";

import { useState, useEffect } from "react";
import {
  Globe,
  FileEdit,
  Archive,
  Loader2,
  Building2,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IHospital, THospitalStatus } from "@/types/hospital.type";
import { useChangeHospitalStatusMutation } from "@/redux/features/hospital/hospitalApi";

interface ChangeHospitalStatusModalProps {
  hospital: IHospital;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function ChangeHospitalStatusModal({
  hospital,
  trigger,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: ChangeHospitalStatusModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? setControlledOpen! : setInternalOpen;

  const currentStatus = (hospital.status?.toLowerCase() || "draft") as THospitalStatus;
  const [selectedStatus, setSelectedStatus] = useState<THospitalStatus>(currentStatus);

  const [changeStatus, { isLoading }] = useChangeHospitalStatusMutation();

  useEffect(() => {
    if (open) {
      setSelectedStatus((hospital.status?.toLowerCase() || "draft") as THospitalStatus);
    }
  }, [open, hospital]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const hospitalId = hospital._id || hospital.id;
    if (!hospitalId) return;

    try {
      await changeStatus({
        hospitalId,
        status: selectedStatus,
      }).unwrap();
      setOpen(false);
    } catch {
      // Error handled by onQueryStarted in hospitalApi
    }
  };

  const statusOptions = [
    {
      value: "published" as const,
      title: "Published",
      desc: "Hospital is active and publicly visible to patients in the mobile app.",
      icon: Globe,
      activeColor: "border-emerald-500 bg-emerald-50/70 text-emerald-900 ring-2 ring-emerald-500/20",
      iconColor: "text-emerald-600",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      value: "draft" as const,
      title: "Draft",
      desc: "Hospital is hidden from patients and saved as draft for administrative review.",
      icon: FileEdit,
      activeColor: "border-amber-500 bg-amber-50/70 text-amber-900 ring-2 ring-amber-500/20",
      iconColor: "text-amber-600",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      value: "archive" as const,
      title: "Archive",
      desc: "Hospital is deactivated and archived from active directory listings.",
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
        <DialogContent className="sm:max-w-[540px] p-0 rounded-2xl gap-0 overflow-hidden bg-white border border-slate-100 shadow-2xl">
          {/* Header */}
          <DialogHeader className="p-6 pb-4 border-b border-slate-100 bg-gradient-to-r from-slate-50/80 to-blue-50/30">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-500 text-white flex items-center justify-center shadow-sm shadow-blue-500/20 shrink-0">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold text-slate-900 tracking-tight">
                  Change Hospital Status
                </DialogTitle>
                <DialogDescription className="text-slate-500 text-xs mt-0.5">
                  Update publishing status for patient app visibility.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="p-6 space-y-5">
              {/* Hospital Summary Card */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  {hospital.image ? (
                    <img
                      src={hospital.image}
                      alt={hospital.name}
                      className="size-10 rounded-lg object-cover border border-slate-200 shrink-0"
                    />
                  ) : (
                    <div className="size-10 rounded-lg bg-teal-500 text-white flex items-center justify-center font-bold text-sm shrink-0">
                      <Building2 className="h-5 w-5" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">
                      {hospital.name}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {hospital.address || hospital.location || "Hospital Profile"}
                    </p>
                  </div>
                </div>

                <Badge
                  variant="outline"
                  className="capitalize font-semibold text-xs shrink-0 px-2.5 py-0.5"
                >
                  {currentStatus}
                </Badge>
              </div>

              {/* Status Radio / Selectable Cards */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Select New Status
                </label>

                <div className="grid gap-2.5">
                  {statusOptions.map((opt) => {
                    const isSelected = selectedStatus === opt.value;
                    const Icon = opt.icon;

                    return (
                      <div
                        key={opt.value}
                        onClick={() => setSelectedStatus(opt.value)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 text-left ${
                          isSelected
                            ? opt.activeColor
                            : "border-slate-200/80 bg-white hover:bg-slate-50/70 hover:border-slate-300"
                        }`}
                      >
                        <div
                          className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                            isSelected ? "bg-white shadow-xs" : "bg-slate-100"
                          }`}
                        >
                          <Icon className={`size-4 ${opt.iconColor}`} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-bold tracking-tight">
                              {opt.title}
                            </span>
                            {isSelected && (
                              <CheckCircle2 className={`size-4 shrink-0 ${opt.iconColor}`} />
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                            {opt.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <DialogFooter className="m-0 p-4 border-t border-slate-100 bg-slate-50/60 flex flex-col sm:flex-row gap-2.5 sm:justify-end items-center">
              <Button
                type="button"
                variant="outline"
                disabled={isLoading}
                onClick={() => setOpen(false)}
                className="rounded-xl h-10 px-5 border-slate-200 text-slate-700 w-full sm:w-auto font-medium cursor-pointer"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isLoading || selectedStatus === currentStatus}
                className="rounded-xl h-10 px-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500 hover:from-blue-700 hover:via-cyan-700 hover:to-teal-600 text-white font-semibold w-full sm:w-auto cursor-pointer flex items-center justify-center gap-2 shadow-xs transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Sparkles className="size-4" />
                )}
                <span>Update Status</span>
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
