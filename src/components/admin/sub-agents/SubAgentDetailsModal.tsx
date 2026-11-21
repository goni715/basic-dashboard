"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Eye,
  Phone,
  Mail,
  Calendar,
  Building2,
  Briefcase,
  Hash,
  Activity,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { ISubAgent } from "@/types/sub-agent.type";

interface SubAgentDetailsModalProps {
  subAgent: ISubAgent;
  trigger?: React.ReactNode;
}

export default function SubAgentDetailsModal({
  subAgent,
  trigger,
}: SubAgentDetailsModalProps) {
  const [open, setOpen] = useState(false);

  const displayName = subAgent?.fullName || "Sub-Agent";
  const initials =
    subAgent?.initials ||
    (displayName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "SA");
  const status = (subAgent?.status || "pending").toLowerCase();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          trigger ? (
            (trigger as React.ReactElement)
          ) : (
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors"
              title="View sub-agent details"
            />
          )
        }
      >
        {!trigger && <Eye className="h-4 w-4" />}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[560px] p-0 rounded-2xl gap-0 overflow-hidden bg-white border border-slate-100 shadow-2xl">
        <div className="p-6 pb-4 border-b border-slate-100 bg-gradient-to-r from-slate-50/80 to-blue-50/30">
          <DialogTitle className="text-xl font-bold text-slate-900 tracking-tight">
            Referral Partner Details
          </DialogTitle>
          <DialogDescription className="text-slate-500 text-xs mt-0.5">
            Full profile, referral metrics, and performance summary.
          </DialogDescription>
        </div>

        <div className="px-6 py-5 overflow-y-auto max-h-[75vh] space-y-6">
          {/* Header Card */}
          <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-5 flex gap-4 items-center">
            <Avatar className="h-16 w-16 border-2 border-white shadow-sm shrink-0">
              {subAgent?.profileImg && (
                <AvatarImage
                  src={subAgent.profileImg}
                  alt={displayName}
                  className="object-cover"
                />
              )}
              <AvatarFallback className="bg-gradient-to-tr from-cyan-600 to-blue-600 text-white text-xl font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 truncate">
                  {displayName}
                </h3>
                {subAgent?.refCode && (
                  <span className="font-mono text-xs px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-md font-semibold">
                    {subAgent.refCode}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-500 font-medium truncate mt-0.5 flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-blue-500" />
                {subAgent?.agencyName || "Personal Partner"}
              </p>

              <div className="mt-2.5 flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    status === "active"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-slate-100 text-slate-600 border border-slate-200"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      status === "active" ? "bg-emerald-500" : "bg-slate-400"
                    }`}
                  />
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Cases & Earnings Highlights */}
          <div className="grid grid-cols-4 gap-2.5 bg-slate-50/60 p-3.5 rounded-2xl border border-slate-100 text-center">
            <div className="bg-white p-2.5 rounded-xl border border-slate-100 shadow-2xs">
              <span className="text-[11px] font-semibold text-slate-400 block">Total Cases</span>
              <span className="text-base font-bold text-slate-900 mt-0.5 block">
                {subAgent?.cases ?? 0}
              </span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-slate-100 shadow-2xs">
              <span className="text-[11px] font-semibold text-amber-600 block">Ongoing</span>
              <span className="text-base font-bold text-amber-700 mt-0.5 block">
                {subAgent?.ongoing ?? 0}
              </span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-slate-100 shadow-2xs">
              <span className="text-[11px] font-semibold text-emerald-600 block">Done</span>
              <span className="text-base font-bold text-emerald-700 mt-0.5 block">
                {subAgent?.done ?? 0}
              </span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-slate-100 shadow-2xs">
              <span className="text-[11px] font-semibold text-blue-600 block">Earnings</span>
              <span className="text-base font-bold text-blue-700 mt-0.5 block">
                ৳{subAgent?.earnings ?? 0}
              </span>
            </div>
          </div>

          {/* Contact & Meta Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100 flex items-start gap-3">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg shrink-0 mt-0.5">
                <Mail className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Email
                </span>
                <span className="text-xs font-medium text-slate-800 break-all">
                  {subAgent?.email || "N/A"}
                </span>
              </div>
            </div>

            <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100 flex items-start gap-3">
              <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg shrink-0 mt-0.5">
                <Phone className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Phone
                </span>
                <span className="text-xs font-medium text-slate-800">
                  {subAgent?.phone || "N/A"}
                </span>
              </div>
            </div>

            <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100 flex items-start gap-3">
              <div className="p-2 bg-purple-100 text-purple-600 rounded-lg shrink-0 mt-0.5">
                <Calendar className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Joined Date
                </span>
                <span className="text-xs font-medium text-slate-800">
                  {subAgent?.joinedDate
                    ? new Date(subAgent.joinedDate).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
            </div>

            <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100 flex items-start gap-3">
              <div className="p-2 bg-slate-100 text-slate-600 rounded-lg shrink-0 mt-0.5">
                <Activity className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Last Active
                </span>
                <span className="text-xs font-medium text-slate-800">
                  {subAgent?.lastActiveAt
                    ? new Date(subAgent.lastActiveAt).toLocaleString()
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Notes (if any) */}
          {subAgent?.notes && (
            <div className="bg-amber-50/50 p-3.5 rounded-xl border border-amber-100 text-xs">
              <span className="font-semibold text-amber-900 block mb-1">Notes:</span>
              <p className="text-amber-800 leading-relaxed">{subAgent.notes}</p>
            </div>
          )}

          {/* Technical IDs */}
          <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100 space-y-1.5 text-xs text-slate-500 font-mono">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-sans">Partner ID:</span>
              <span className="text-slate-700">{subAgent?._id || subAgent?.id || "N/A"}</span>
            </div>
            {subAgent?.agentUserId && (
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-sans">Parent Agent User ID:</span>
                <span className="text-slate-700">{subAgent.agentUserId}</span>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            className="rounded-xl border-slate-200 text-xs font-medium cursor-pointer"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

