"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Loader2, Building2, User, CheckCircle2, XCircle } from "lucide-react";
import { IAgentPatient } from "@/types/agent-patient.type";
import {
  useUpdateAgentPaymentStatusMutation,
  useUpdateSubAgentPaymentStatusMutation,
} from "@/redux/features/agent-patient/agentPatientApi";

interface ManagePaymentStatusModalProps {
  patientCase: IAgentPatient;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function ManagePaymentStatusModal({
  patientCase,
  trigger,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: ManagePaymentStatusModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? setControlledOpen! : setInternalOpen;

  const hasAgent = Boolean(
    patientCase.agentUserId || patientCase.agent?._id || patientCase.agent?.id
  );
  const hasSubAgent = Boolean(
    patientCase.subAgentId || patientCase.subAgent?._id || patientCase.subAgent?.id
  );

  const agentPaymentStatus = (patientCase.agentPaymentStatus || "unpaid").toLowerCase();
  const subAgentPaymentStatus = (
    patientCase.subAgentPaymentStatus || "unpaid"
  ).toLowerCase();

  const [updateAgentPaymentStatus, { isLoading: isUpdatingAgent }] =
    useUpdateAgentPaymentStatusMutation();
  const [updateSubAgentPaymentStatus, { isLoading: isUpdatingSubAgent }] =
    useUpdateSubAgentPaymentStatusMutation();

  const handleToggleAgentStatus = async (newStatus: "paid" | "unpaid") => {
    const patientId = patientCase._id || patientCase.id || "";
    if (!patientId) return;

    try {
      await updateAgentPaymentStatus({
        patientId,
        agentPaymentStatus: newStatus,
      }).unwrap();
    } catch {
      // toast is handled in RTK query
    }
  };

  const handleToggleSubAgentStatus = async (newStatus: "paid" | "unpaid") => {
    const patientId = patientCase._id || patientCase.id || "";
    const subAgentId =
      patientCase.subAgentId ||
      patientCase.subAgent?._id ||
      patientCase.subAgent?.id ||
      "";

    if (!patientId) return;

    try {
      await updateSubAgentPaymentStatus({
        patientId,
        subAgentId,
        subAgentPaymentStatus: newStatus,
      }).unwrap();
    } catch {
      // toast is handled in RTK query
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          trigger ? (
            (trigger as React.ReactElement)
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="h-8 px-2.5 text-xs font-semibold rounded-lg border-slate-200 text-slate-700 hover:text-blue-600 hover:bg-blue-50 cursor-pointer"
            >
              <CreditCard className="h-3.5 w-3.5 mr-1 text-blue-600" />
              Payment Status
            </Button>
          )
        }
      />

      <DialogContent className="sm:max-w-[480px] p-0 rounded-2xl gap-0 overflow-hidden bg-white border border-slate-100 shadow-2xl">
        <div className="p-6 pb-4 border-b border-slate-100 bg-gradient-to-r from-slate-50/80 to-blue-50/30">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center shrink-0">
              <CreditCard className="h-4 w-4" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-slate-900 tracking-tight">
                Update Payment Status
              </DialogTitle>
              <DialogDescription className="text-slate-500 text-xs mt-0.5">
                Case: <span className="font-mono font-semibold text-slate-800">{patientCase.caseId}</span> ({patientCase.fullName})
              </DialogDescription>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {!hasAgent && !hasSubAgent && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
              No Channel Partner or Referral Partner assigned to this case.
            </div>
          )}

          {/* 1. Main Channel Partner Payment Status (Shown only if agentUserId / agent exists) */}
          {hasAgent && (
            <div className="bg-blue-50/40 border border-blue-200/60 p-4 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-blue-600" />
                  <span className="text-xs font-bold text-slate-900">
                    Channel Partner Payment
                  </span>
                </div>
                <span className="text-[11px] font-mono text-blue-800 bg-blue-100/70 px-2 py-0.5 rounded font-medium">
                  Fee: ৳{patientCase.agentCommissionFee ?? 0}
                </span>
              </div>

              <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-blue-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600">Current Status:</span>
                  <Badge
                    variant="outline"
                    className={`text-xs font-semibold capitalize ${
                      agentPaymentStatus === "paid"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-rose-50 text-rose-700 border-rose-200"
                    }`}
                  >
                    {agentPaymentStatus}
                  </Badge>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  disabled={isUpdatingAgent}
                  onClick={() =>
                    handleToggleAgentStatus(
                      agentPaymentStatus === "paid" ? "unpaid" : "paid"
                    )
                  }
                  className={`h-8 px-3 text-xs font-semibold rounded-lg cursor-pointer transition-colors ${
                    agentPaymentStatus === "paid"
                      ? "border-rose-200 text-rose-700 hover:bg-rose-50"
                      : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                  }`}
                >
                  {isUpdatingAgent ? (
                    <Loader2 className="h-3 w-3 animate-spin mr-1" />
                  ) : agentPaymentStatus === "paid" ? (
                    <XCircle className="h-3.5 w-3.5 mr-1" />
                  ) : (
                    <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                  )}
                  Mark as {agentPaymentStatus === "paid" ? "Unpaid" : "Paid"}
                </Button>
              </div>
            </div>
          )}

          {/* 2. Referral Partner Payment Status (Below Channel Partner, shown if subAgent exists) */}
          {hasSubAgent && (
            <div className="bg-amber-50/40 border border-amber-200/60 p-4 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-amber-600" />
                  <span className="text-xs font-bold text-slate-900">
                    Referral Partner Payment
                  </span>
                </div>
                <span className="text-[11px] font-mono text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded font-medium">
                  Fee: ৳{patientCase.subAgentCommissionFee ?? patientCase.subAgentCommission ?? 0}
                </span>
              </div>

              <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-amber-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600">Current Status:</span>
                  <Badge
                    variant="outline"
                    className={`text-xs font-semibold capitalize ${
                      subAgentPaymentStatus === "paid"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-rose-50 text-rose-700 border-rose-200"
                    }`}
                  >
                    {subAgentPaymentStatus}
                  </Badge>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  disabled={isUpdatingSubAgent}
                  onClick={() =>
                    handleToggleSubAgentStatus(
                      subAgentPaymentStatus === "paid" ? "unpaid" : "paid"
                    )
                  }
                  className={`h-8 px-3 text-xs font-semibold rounded-lg cursor-pointer transition-colors ${
                    subAgentPaymentStatus === "paid"
                      ? "border-rose-200 text-rose-700 hover:bg-rose-50"
                      : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                  }`}
                >
                  {isUpdatingSubAgent ? (
                    <Loader2 className="h-3 w-3 animate-spin mr-1" />
                  ) : subAgentPaymentStatus === "paid" ? (
                    <XCircle className="h-3.5 w-3.5 mr-1" />
                  ) : (
                    <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                  )}
                  Mark as {subAgentPaymentStatus === "paid" ? "Unpaid" : "Paid"}
                </Button>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="p-4 border-t border-slate-100 bg-slate-50/50">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            className="rounded-xl border-slate-200 text-xs font-medium cursor-pointer"
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
