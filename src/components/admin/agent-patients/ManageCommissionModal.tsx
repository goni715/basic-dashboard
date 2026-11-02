"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Building2, User, Wallet, AlertCircle } from "lucide-react";
import { IAgentPatient } from "@/types/agent-patient.type";
import {
  useUpdateAgentCommissionMutation,
  useUpdateSubAgentCommissionMutation,
} from "@/redux/features/agent-patient/agentPatientApi";
import TakaIcon from "@/components/icons/TakaIcon";

interface ManageCommissionModalProps {
  patientCase: IAgentPatient;
  trigger?: React.ReactNode;
}

export default function ManageCommissionModal({
  patientCase,
  trigger,
}: ManageCommissionModalProps) {
  const [open, setOpen] = useState(false);

  const hasSubAgent = Boolean(
    patientCase.subAgentId || patientCase.subAgent?._id
  );

  // Initialize: if 0 or empty, keep it empty string "" so placeholder="0" shows cleanly
  const getInitialFee = (val?: number) => {
    if (val && val > 0) return String(val);
    return "";
  };

  const [agentFee, setAgentFee] = useState<string>(
    getInitialFee(patientCase.agentCommissionFee)
  );
  const [subAgentFee, setSubAgentFee] = useState<string>(
    getInitialFee(
      patientCase.subAgentCommissionFee ?? patientCase.subAgentCommission
    )
  );

  const [agentError, setAgentError] = useState<string | null>(null);
  const [subAgentError, setSubAgentError] = useState<string | null>(null);

  const [updateAgentCommission, { isLoading: isUpdatingAgent }] =
    useUpdateAgentCommissionMutation();
  const [updateSubAgentCommission, { isLoading: isUpdatingSubAgent }] =
    useUpdateSubAgentCommissionMutation();

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setAgentFee(getInitialFee(patientCase.agentCommissionFee));
      setSubAgentFee(
        getInitialFee(
          patientCase.subAgentCommissionFee ?? patientCase.subAgentCommission
        )
      );
      setAgentError(null);
      setSubAgentError(null);
    }
    setOpen(isOpen);
  };

  const handleSaveAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    setAgentError(null);

    const numValue = Number(agentFee);
    if (!agentFee || isNaN(numValue) || numValue <= 0) {
      setAgentError("Commission amount must be greater than 0");
      return;
    }

    const patientId = patientCase._id || patientCase.id || "";
    const agentUserId =
      patientCase.agentUserId ||
      patientCase.agent?._id ||
      patientCase.agent?.id ||
      "";

    if (!patientId || !agentUserId) return;

    try {
      await updateAgentCommission({
        patientId,
        agentUserId,
        agentCommissionFee: numValue,
      }).unwrap();
    } catch {
      // toast is handled in RTK query
    }
  };

  const handleSaveSubAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubAgentError(null);

    const numValue = Number(subAgentFee);
    if (!subAgentFee || isNaN(numValue) || numValue <= 0) {
      setSubAgentError("Commission amount must be greater than 0");
      return;
    }

    const patientId = patientCase._id || patientCase.id || "";
    if (!patientId) return;

    try {
      await updateSubAgentCommission({
        patientId,
        subAgentCommissionFee: numValue,
      }).unwrap();
    } catch {
      // toast is handled in RTK query
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
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
              <TakaIcon className="h-3.5 w-3.5 mr-1 text-emerald-600" />
              Commission
            </Button>
          )
        }
      />

      <DialogContent className="sm:max-w-[480px] p-0 rounded-2xl gap-0 overflow-hidden bg-white border border-slate-100 shadow-2xl">
        <div className="p-6 pb-4 border-b border-slate-100 bg-gradient-to-r from-slate-50/80 to-blue-50/30">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center shrink-0">
              <Wallet className="h-4 w-4" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-slate-900 tracking-tight">
                Manage Commission Fees
              </DialogTitle>
              <DialogDescription className="text-slate-500 text-xs mt-0.5">
                Case: <span className="font-mono font-semibold text-slate-800">{patientCase.caseId}</span> ({patientCase.fullName})
              </DialogDescription>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* 1. Agent Commission (Always on Top) */}
          <form onSubmit={handleSaveAgent} className="space-y-3 bg-blue-50/40 border border-blue-200/60 p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-blue-600" />
                <span className="text-xs font-bold text-slate-900">
                  Agent Commission
                </span>
              </div>
              <span className="text-[11px] font-medium text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                {patientCase.agent?.fullName || "Main Agent"}
              </span>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="agentFee" className="text-xs text-slate-600 font-medium">
                Commission Amount (৳)
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-bold flex items-center">
                  ৳
                </span>
                <Input
                  id="agentFee"
                  type="number"
                  min="1"
                  step="any"
                  value={agentFee}
                  onChange={(e) => {
                    setAgentFee(e.target.value);
                    if (agentError) setAgentError(null);
                  }}
                  className={`pl-7 h-9 text-xs bg-white rounded-lg border-slate-200 ${
                    agentError ? "border-rose-400 focus-visible:ring-rose-200" : ""
                  }`}
                  placeholder="0"
                />
              </div>
              {agentError && (
                <div className="flex items-center gap-1 text-[11px] text-rose-600 font-medium mt-1">
                  <AlertCircle className="h-3 w-3 shrink-0" />
                  <span>{agentError}</span>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-1">
              <Button
                type="submit"
                size="sm"
                disabled={isUpdatingAgent}
                className="h-8 px-3 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold cursor-pointer"
              >
                {isUpdatingAgent && <Loader2 className="h-3 w-3 animate-spin mr-1.5" />}
                Update Agent Fee
              </Button>
            </div>
          </form>

          {/* 2. Sub-Agent Commission (Below Agent Commission, shown when subAgent exists) */}
          {hasSubAgent && (
            <form onSubmit={handleSaveSubAgent} className="space-y-3 bg-amber-50/40 border border-amber-200/60 p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-amber-600" />
                  <span className="text-xs font-bold text-slate-900">
                    Sub-Agent Commission
                  </span>
                </div>
                <span className="text-[11px] font-mono font-medium text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded">
                  {patientCase.subAgent?.agencyName || patientCase.subAgent?.fullName || "Sub-Agent"}
                </span>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="subAgentFee" className="text-xs text-slate-600 font-medium">
                  Commission Amount (৳)
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-bold flex items-center">
                    ৳
                  </span>
                  <Input
                    id="subAgentFee"
                    type="number"
                    min="1"
                    step="any"
                    value={subAgentFee}
                    onChange={(e) => {
                      setSubAgentFee(e.target.value);
                      if (subAgentError) setSubAgentError(null);
                    }}
                    className={`pl-7 h-9 text-xs bg-white rounded-lg border-slate-200 ${
                      subAgentError ? "border-rose-400 focus-visible:ring-rose-200" : ""
                    }`}
                    placeholder="0"
                  />
                </div>
                {subAgentError && (
                  <div className="flex items-center gap-1 text-[11px] text-rose-600 font-medium mt-1">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    <span>{subAgentError}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-1">
                <Button
                  type="submit"
                  size="sm"
                  disabled={isUpdatingSubAgent}
                  className="h-8 px-3 text-xs bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold cursor-pointer"
                >
                  {isUpdatingSubAgent && <Loader2 className="h-3 w-3 animate-spin mr-1.5" />}
                  Update Sub-Agent Fee
                </Button>
              </div>
            </form>
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
