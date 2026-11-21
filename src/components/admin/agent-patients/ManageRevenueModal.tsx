"use client";

import { useEffect, useState } from "react";
import {
  Banknote,
  Loader2,
  Sparkles,
  User,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TakaIcon from "@/components/icons/TakaIcon";
import { IAgentPatient } from "@/types/agent-patient.type";
import { useUpdateRevenueMutation } from "@/redux/features/agent-patient/agentPatientApi";
import { ErrorToast } from "@/helpers/ValidationHelper";

interface ManageRevenueModalProps {
  patientCase: IAgentPatient;
  trigger?: React.ReactElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function ManageRevenueModal({
  patientCase,
  trigger,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: ManageRevenueModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? setControlledOpen! : setInternalOpen;

  const currentRevenue = patientCase.revenue ?? 0;
  const [revenueInput, setRevenueInput] = useState<string>(String(currentRevenue));

  const [updateRevenue, { isLoading }] = useUpdateRevenueMutation();

  useEffect(() => {
    if (open) {
      setRevenueInput(String(patientCase.revenue ?? 0));
    }
  }, [open, patientCase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const patientId = patientCase._id || patientCase.id;
    if (!patientId) {
      ErrorToast("Patient Case ID missing");
      return;
    }

    const numRevenue = Number(revenueInput);
    if (isNaN(numRevenue) || numRevenue < 0) {
      ErrorToast("Please enter a valid revenue amount");
      return;
    }

    try {
      const res: any = await updateRevenue({
        patientId,
        revenue: numRevenue,
      }).unwrap();
      if (res?.success || res?.acknowledged || res?.data?.acknowledged) {
        setOpen(false);
      }
    } catch {
      // Handled via onQueryStarted
    }
  };

  const defaultTrigger = (
    <Button
      size="sm"
      variant="outline"
      className="h-8 px-2.5 text-xs font-semibold rounded-lg border-blue-200 text-blue-600 hover:bg-blue-50 cursor-pointer shadow-2xs gap-1.5"
      title="Update Revenue"
    >
      <TakaIcon className="h-3.5 w-3.5" />
      <span>Revenue</span>
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger || defaultTrigger} />

      <DialogContent className="sm:max-w-[480px] p-0 rounded-2xl gap-0 overflow-hidden max-h-[92dvh] flex flex-col bg-white border border-slate-100 shadow-2xl">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 border-b border-slate-100 shrink-0 bg-gradient-to-r from-slate-50/80 to-blue-50/30">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-500 text-white flex items-center justify-center shadow-sm shadow-blue-500/20">
              <Banknote className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-slate-900 tracking-tight">
                Update Case Revenue
              </DialogTitle>
              <DialogDescription className="text-slate-500 text-xs sm:text-sm mt-0.5">
                Case: <span className="font-mono font-semibold text-blue-600">{patientCase.caseId}</span> ({patientCase.fullName})
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="px-6 py-5 overflow-y-auto flex-1 space-y-4 custom-scrollbar">
            {/* Case Info Summary */}
            <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Patient Name</span>
                <span className="font-bold text-slate-800 text-sm">{patientCase.fullName}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[11px]">Current Revenue</span>
                <span className="font-bold text-emerald-600 text-sm">৳{currentRevenue}</span>
              </div>
            </div>

            {/* Revenue Input Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                Total Treatment Revenue (৳) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none flex items-center">
                  <TakaIcon className="h-4 w-4" />
                </div>
                <Input
                  type="number"
                  min="0"
                  step="any"
                  value={revenueInput}
                  onChange={(e) => setRevenueInput(e.target.value)}
                  placeholder="Enter revenue amount..."
                  className="pl-9 h-11 rounded-xl border-slate-200 text-sm font-semibold focus-visible:ring-2 focus-visible:ring-blue-500/20 shadow-xs"
                  required
                />
              </div>
              <p className="text-[11px] text-slate-400">
                Updating the total revenue calculates the commission fee based on agreed percentages.
              </p>
            </div>
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
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isLoading}
              className="rounded-xl h-10 px-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-semibold shadow-sm shadow-blue-500/20 cursor-pointer flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Update Revenue</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
