"use client";

import { useState, useEffect } from "react";
import {
  LifeBuoy,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Lock,
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { ISupportItem, TSupportStatus } from "@/types/support.type";
import { useUpdateSupportStatusMutation } from "@/redux/features/support/supportApi";

interface ChangeSupportStatusModalProps {
  item: ISupportItem;
  trigger?: React.ReactElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function ChangeSupportStatusModal({
  item,
  trigger,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: ChangeSupportStatusModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? setControlledOpen! : setInternalOpen;

  const currentStatus = (item.status?.toLowerCase() || "open") as TSupportStatus;
  const isClosed = currentStatus === "closed";

  // State transitions:
  // - open -> in_progress, closed
  // - in_progress -> closed
  // - closed -> locked (cannot update)
  const allowedNextStatuses: Record<string, TSupportStatus[]> = {
    open: ["in_progress", "closed"],
    in_progress: ["closed"],
    closed: [],
  };

  const allowedValues = allowedNextStatuses[currentStatus] || [];
  const [selectedStatus, setSelectedStatus] = useState<TSupportStatus>(
    allowedValues[0] || currentStatus
  );

  const [updateSupportStatus, { isLoading }] = useUpdateSupportStatusMutation();

  useEffect(() => {
    if (open) {
      const allowed = allowedNextStatuses[item.status?.toLowerCase() || "open"] || [];
      setSelectedStatus(allowed[0] || (item.status?.toLowerCase() as TSupportStatus) || "open");
    }
  }, [open, item]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!item._id || isClosed) return;

    try {
      await updateSupportStatus({
        id: item._id,
        status: selectedStatus,
      }).unwrap();
      setOpen(false);
    } catch {
      // Handled in supportApi onQueryStarted
    }
  };

  const allStatusOptions = [
    {
      value: "open" as const,
      title: "Open",
      desc: "New inquiry waiting for support agent review and response.",
      icon: AlertCircle,
      activeColor:
        "border-amber-500 bg-amber-50/70 text-amber-950 ring-2 ring-amber-500/20",
      iconColor: "text-amber-600",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      value: "in_progress" as const,
      title: "In Progress",
      desc: "An agent is actively working on resolving this support ticket.",
      icon: Clock,
      activeColor:
        "border-blue-500 bg-blue-50/70 text-blue-950 ring-2 ring-blue-500/20",
      iconColor: "text-blue-600",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      value: "closed" as const,
      title: "Closed",
      desc: "The issue has been resolved or closed by administration. Once closed, this ticket cannot be updated.",
      icon: CheckCircle2,
      activeColor:
        "border-slate-500 bg-slate-50/90 text-slate-900 ring-2 ring-slate-500/20",
      iconColor: "text-slate-600",
      badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
    },
  ];

  const availableOptions = allStatusOptions.filter((opt) =>
    allowedValues.includes(opt.value)
  );

  const defaultTrigger = (
    <Button
      size="sm"
      variant="outline"
      disabled={isClosed}
      className="h-8 px-2.5 text-xs font-semibold rounded-lg border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer shadow-xs gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
    >
      <span>Change Status</span>
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger || defaultTrigger} />

      <DialogContent className="sm:max-w-[540px] p-0 rounded-2xl gap-0 overflow-hidden max-h-[92dvh] flex flex-col bg-white border border-slate-100 shadow-2xl">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 border-b border-slate-100 shrink-0 bg-gradient-to-r from-slate-50/80 to-blue-50/30">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-500 text-white flex items-center justify-center shadow-sm shadow-blue-500/20">
              <LifeBuoy className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-slate-900 tracking-tight">
                Update Support Status
              </DialogTitle>
              <DialogDescription className="text-slate-500 text-xs sm:text-sm mt-0.5">
                Change the lifecycle state for Ticket #{item.ticket || item._id.slice(-6)}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="px-6 py-5 overflow-y-auto flex-1 space-y-4 custom-scrollbar">
            {/* Ticket Info Card */}
            <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm truncate">
                    {item.fullName}
                  </span>
                  <span className="font-mono text-xs font-semibold text-blue-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                    #{item.ticket || item._id.slice(-6)}
                  </span>
                </div>
                <p className="text-xs text-slate-500 truncate mt-0.5">
                  {item.subject || item.email}
                </p>
              </div>

              <div className="shrink-0 text-right">
                <span className="text-[11px] text-slate-400 block">Current Status</span>
                <Badge
                  variant="outline"
                  className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize bg-white text-slate-700 border-slate-200"
                >
                  {currentStatus.replace("_", " ")}
                </Badge>
              </div>
            </div>

            {/* If Closed, Show locked notice */}
            {isClosed ? (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 space-y-1.5 flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Lock className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Ticket is Closed
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    This support ticket has been closed. Closed tickets cannot be updated or reopened.
                  </p>
                </div>
              </div>
            ) : (
              /* Status Options (Filtered to allowed next states) */
              <div className="space-y-2.5 pt-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Select Next Status
                </label>

                <div className="grid grid-cols-1 gap-2.5">
                  {availableOptions.map((opt) => {
                    const isSelected = selectedStatus === opt.value;
                    const Icon = opt.icon;

                    return (
                      <div
                        key={opt.value}
                        onClick={() => setSelectedStatus(opt.value)}
                        className={`relative flex items-start gap-3.5 p-3.5 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? opt.activeColor
                            : "border-slate-200/80 bg-white hover:bg-slate-50/80 hover:border-slate-300 text-slate-700"
                        }`}
                      >
                        <div
                          className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                            isSelected
                              ? "bg-white shadow-xs " + opt.iconColor
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>

                        <div className="flex-1 min-w-0 pr-6">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm tracking-tight">
                              {opt.title}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                            {opt.desc}
                          </p>
                        </div>

                        {/* Radio Indicator */}
                        <div className="absolute right-3.5 top-3.5">
                          <div
                            className={`h-4 w-4 rounded-full border flex items-center justify-center transition-all ${
                              isSelected
                                ? "border-blue-600 bg-blue-600"
                                : "border-slate-300 bg-white"
                            }`}
                          >
                            {isSelected && (
                              <span className="h-1.5 w-1.5 rounded-full bg-white" />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <DialogFooter className="m-0 p-4 border-t border-slate-100 bg-slate-50/60 flex flex-col sm:flex-row gap-2.5 sm:justify-between items-center w-full shrink-0">
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              onClick={() => setOpen(false)}
              className="rounded-xl h-10 px-5 border-slate-200 hover:bg-white text-slate-700 w-full sm:w-auto font-medium cursor-pointer"
            >
              {isClosed ? "Close" : "Cancel"}
            </Button>

            {!isClosed && (
              <Button
                type="submit"
                disabled={isLoading || !selectedStatus || selectedStatus === currentStatus}
                className="rounded-xl h-10 px-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-semibold shadow-sm shadow-blue-500/20 cursor-pointer flex items-center justify-center gap-2 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Update Status</span>
                  </>
                )}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
