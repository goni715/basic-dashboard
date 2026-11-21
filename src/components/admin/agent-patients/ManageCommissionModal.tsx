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
import { Loader2, Building2, User, Wallet, AlertCircle, Percent } from "lucide-react";
import { IAgentPatient } from "@/types/agent-patient.type";
import {
  useUpdateAgentCommissionMutation,
  useUpdateSubAgentCommissionMutation,
} from "@/redux/features/agent-patient/agentPatientApi";
import TakaIcon from "@/components/icons/TakaIcon";

interface ManageCommissionModalProps {
  patientCase: IAgentPatient;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function ManageCommissionModal({
  patientCase,
  trigger,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: ManageCommissionModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? setControlledOpen! : setInternalOpen;

  // Check presence of Channel Partner and Referral Partner
  const hasAgent = Boolean(
    patientCase.agentUserId || patientCase.agent?._id || patientCase.agent?.id
  );
  const hasSubAgent = Boolean(
    patientCase.subAgentId || patientCase.subAgent?._id || patientCase.subAgent?.id
  );

  // Initialize percentage values
  const getInitialPercent = (val?: number) => {
    if (val !== undefined && val !== null && val > 0) return String(val);
    return "";
  };

  const [agentPercent, setAgentPercent] = useState<string>(
    getInitialPercent(patientCase.agentCommissionPercentage)
  );
  const [subAgentPercent, setSubAgentPercent] = useState<string>(
    getInitialPercent(patientCase.subAgentCommissionPercentage)
  );

  const [agentError, setAgentError] = useState<string | null>(null);
  const [subAgentError, setSubAgentError] = useState<string | null>(null);

  const [updateAgentCommission, { isLoading: isUpdatingAgent }] =
    useUpdateAgentCommissionMutation();
  const [updateSubAgentCommission, { isLoading: isUpdatingSubAgent }] =
    useUpdateSubAgentCommissionMutation();

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setAgentPercent(getInitialPercent(patientCase.agentCommissionPercentage));
      setSubAgentPercent(
        getInitialPercent(patientCase.subAgentCommissionPercentage)
      );
      setAgentError(null);
      setSubAgentError(null);
    }
    setOpen(isOpen);
  };

  const handleSaveAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    setAgentError(null);

    const numValue = Number(agentPercent);
    if (!agentPercent || isNaN(numValue) || numValue < 0 || numValue > 100) {
      setAgentError("Please enter a valid percentage between 0 and 100");
      return;
    }

    const patientId = patientCase._id || patientCase.id || "";
    if (!patientId) return;

    try {
      await updateAgentCommission({
        patientId,
        agentCommissionPercentage: numValue,
      }).unwrap();
    } catch {
      // toast is handled in RTK query
    }
  };

  const handleSaveSubAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubAgentError(null);

    const numValue = Number(subAgentPercent);
    if (!subAgentPercent || isNaN(numValue) || numValue < 0 || numValue > 100) {
      setSubAgentError("Please enter a valid percentage between 0 and 100");
      return;
    }

    const patientId = patientCase._id || patientCase.id || "";
    if (!patientId) return;

    try {
      await updateSubAgentCommission({
        patientId,
        subAgentCommissionPercentage: numValue,
      }).unwrap();
    } catch {
      // toast is handled in RTK query
    }
  };

  // Calculated preview amounts if revenue exists
  const revenue = patientCase.revenue || 0;
  const agentCalculatedFee =
    agentPercent && !isNaN(Number(agentPercent))
      ? Math.round((revenue * Number(agentPercent)) / 100)
      : patientCase.agentCommissionFee || 0;
  const subAgentCalculatedFee =
    subAgentPercent && !isNaN(Number(subAgentPercent))
      ? Math.round((revenue * Number(subAgentPercent)) / 100)
      : patientCase.subAgentCommissionFee || patientCase.subAgentCommission || 0;

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

      <DialogContent className="sm:max-w-[490px] p-0 rounded-2xl gap-0 overflow-hidden bg-white border border-slate-100 shadow-2xl">
        <div className="p-6 pb-4 border-b border-slate-100 bg-gradient-to-r from-slate-50/80 to-blue-50/30">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center shrink-0">
              <Wallet className="h-4 w-4" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-slate-900 tracking-tight">
                Manage Commission (%)
              </DialogTitle>
              <DialogDescription className="text-slate-500 text-xs mt-0.5">
                Case: <span className="font-mono font-semibold text-slate-800">{patientCase.caseId}</span> ({patientCase.fullName})
                {revenue > 0 && (
                  <span className="ml-2 font-semibold text-emerald-600">
                    • Revenue: ৳{revenue}
                  </span>
                )}
              </DialogDescription>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {!hasAgent && !hasSubAgent && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
              No Channel Partner or Referral Partner assigned to this case.
            </div>
          )}

          {/* 1. Channel Partner Commission (Shown only when agentUserId / agent exists) */}
          {hasAgent && (
            <form onSubmit={handleSaveAgent} className="space-y-3 bg-blue-50/40 border border-blue-200/60 p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-blue-600" />
                  <span className="text-xs font-bold text-slate-900">
                    Channel Partner Commission
                  </span>
                </div>
                <span className="text-[11px] font-medium text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                  {patientCase.agent?.fullName || "Channel Partner"}
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs text-slate-600">
                  <Label htmlFor="agentPercent" className="font-medium text-xs">
                    Commission Percentage (%)
                  </Label>
                  {revenue > 0 && (
                    <span className="text-[11px] text-slate-500">
                      Est. Fee: <span className="font-bold text-slate-800">৳{agentCalculatedFee}</span>
                    </span>
                  )}
                </div>

                <div className="relative">
                  <Input
                    id="agentPercent"
                    type="number"
                    min="0"
                    max="100"
                    step="any"
                    value={agentPercent}
                    onChange={(e) => {
                      setAgentPercent(e.target.value);
                      if (agentError) setAgentError(null);
                    }}
                    className={`pr-8 h-9 text-xs bg-white rounded-lg border-slate-200 ${
                      agentError ? "border-rose-400 focus-visible:ring-rose-200" : ""
                    }`}
                    placeholder="e.g. 4"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <Percent className="h-3.5 w-3.5" />
                  </span>
                </div>

                {agentError && (
                  <div className="flex items-center gap-1 text-[11px] text-rose-600 font-medium mt-1">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    <span>{agentError}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="text-[11px] text-slate-500">
                  Current: <span className="font-bold text-slate-700">{patientCase.agentCommissionPercentage ?? 0}%</span> (৳{patientCase.agentCommissionFee ?? 0})
                </div>
                <Button
                  type="submit"
                  size="sm"
                  disabled={isUpdatingAgent}
                  className="h-8 px-3 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold cursor-pointer"
                >
                  {isUpdatingAgent && <Loader2 className="h-3 w-3 animate-spin mr-1.5" />}
                  Update Percentage
                </Button>
              </div>
            </form>
          )}

          {/* 2. Referral Partner Commission (Shown only when subAgent exists) */}
          {hasSubAgent && (
            <form onSubmit={handleSaveSubAgent} className="space-y-3 bg-amber-50/40 border border-amber-200/60 p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-amber-600" />
                  <span className="text-xs font-bold text-slate-900">
                    Referral Partner Commission
                  </span>
                </div>
                <span className="text-[11px] font-mono font-medium text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded">
                  {patientCase.subAgent?.agencyName || patientCase.subAgent?.fullName || "Referral Partner"}
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs text-slate-600">
                  <Label htmlFor="subAgentPercent" className="font-medium text-xs">
                    Commission Percentage (%)
                  </Label>
                  {revenue > 0 && (
                    <span className="text-[11px] text-slate-500">
                      Est. Fee: <span className="font-bold text-slate-800">৳{subAgentCalculatedFee}</span>
                    </span>
                  )}
                </div>

                <div className="relative">
                  <Input
                    id="subAgentPercent"
                    type="number"
                    min="0"
                    max="100"
                    step="any"
                    value={subAgentPercent}
                    onChange={(e) => {
                      setSubAgentPercent(e.target.value);
                      if (subAgentError) setSubAgentError(null);
                    }}
                    className={`pr-8 h-9 text-xs bg-white rounded-lg border-slate-200 ${
                      subAgentError ? "border-rose-400 focus-visible:ring-rose-200" : ""
                    }`}
                    placeholder="e.g. 4"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <Percent className="h-3.5 w-3.5" />
                  </span>
                </div>

                {subAgentError && (
                  <div className="flex items-center gap-1 text-[11px] text-rose-600 font-medium mt-1">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    <span>{subAgentError}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="text-[11px] text-slate-500">
                  Current: <span className="font-bold text-slate-700">{patientCase.subAgentCommissionPercentage ?? 0}%</span> (৳{patientCase.subAgentCommissionFee ?? patientCase.subAgentCommission ?? 0})
                </div>
                <Button
                  type="submit"
                  size="sm"
                  disabled={isUpdatingSubAgent}
                  className="h-8 px-3 text-xs bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold cursor-pointer"
                >
                  {isUpdatingSubAgent && <Loader2 className="h-3 w-3 animate-spin mr-1.5" />}
                  Update Percentage
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
