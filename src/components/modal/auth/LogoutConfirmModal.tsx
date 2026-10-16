"use client";

import { LogOut, Laptop, Loader2, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface LogoutConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading?: boolean;
  isAllDevices?: boolean;
}

export default function LogoutConfirmModal({
  open,
  onOpenChange,
  onConfirm,
  isLoading = false,
  isAllDevices = false,
}: LogoutConfirmModalProps) {
  return (
    <Dialog open={open} onOpenChange={isLoading ? () => {} : onOpenChange}>
      <DialogContent
        showCloseButton={!isLoading}
        className="max-w-md p-6 bg-white rounded-2xl border border-slate-100 shadow-2xl"
      >
        <div className="flex flex-col items-center text-center space-y-4 pt-2">
          {/* Animated Warning / Logout Icon Badge */}
          <div className="relative flex items-center justify-center">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-transform ${
                isAllDevices
                  ? "bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-rose-500/25"
                  : "bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-red-500/25"
              }`}
            >
              {isAllDevices ? (
                <Laptop className="w-8 h-8 stroke-[2.2]" />
              ) : (
                <LogOut className="w-8 h-8 stroke-[2.2] ml-0.5" />
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center text-slate-900 shadow-xs">
              <AlertCircle className="w-3.5 h-3.5 fill-amber-400 text-white" />
            </div>
          </div>

          <DialogHeader className="space-y-2 items-center text-center">
            <DialogTitle className="text-xl font-bold tracking-tight text-slate-900">
              {isAllDevices ? "Logout from all devices?" : "Are you sure you want to log out?"}
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500 max-w-sm leading-relaxed">
              {isAllDevices
                ? "This will terminate all active admin sessions across all connected computers, phones, and browsers. You must sign in again."
                : "You will be signed out of your current session and redirected back to the login page."}
            </DialogDescription>
          </DialogHeader>
        </div>

        <DialogFooter className="mt-4 pt-4 border-t border-slate-100 flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5">
          <Button
            type="button"
            variant="outline"
            disabled={isLoading}
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto h-10 px-5 rounded-xl border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-all cursor-pointer"
          >
            No, Cancel
          </Button>

          <Button
            type="button"
            disabled={isLoading}
            onClick={onConfirm}
            className={`w-full sm:w-auto h-10 px-6 rounded-xl font-semibold text-white shadow-md transition-all cursor-pointer ${
              isAllDevices
                ? "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 shadow-red-500/20"
                : "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 shadow-red-500/20"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-white" />
                <span>Logging out...</span>
              </div>
            ) : (
              <span>{isAllDevices ? "Yes, Logout All" : "Yes, Logout"}</span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
