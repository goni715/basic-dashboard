"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Eye,
  User,
  Phone,
  Mail,
  Calendar,
  Building2,
  ShieldCheck,
  Clock,
  IdCard,
} from "lucide-react";
import { IAgent } from "@/types/agent.type";

interface AgentDetailsModalProps {
  agent: IAgent;
  trigger?: React.ReactNode;
}

export default function AgentDetailsModal({
  agent,
  trigger,
}: AgentDetailsModalProps) {
  const [open, setOpen] = useState(false);

  const displayName = agent?.fullName || "Agent Profile";
  const agency = agent?.agencyName || "N/A";
  const status = (agent?.userStatus || agent?.status || "pending").toLowerCase();
  const approvalStatus = (agent?.approvalStatus || "pending").toLowerCase();

  const getInitials = (name?: string) => {
    if (!name) return "AG";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

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
              title="View agent details"
            />
          )
        }
      >
        {!trigger && <Eye className="h-4 w-4" />}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[540px] p-0 rounded-2xl gap-0 overflow-hidden bg-white border border-slate-100 shadow-2xl">
        <div className="p-6 pb-4 border-b border-slate-100 bg-gradient-to-r from-slate-50/80 to-blue-50/30">
          <DialogTitle className="text-xl font-bold text-slate-900 tracking-tight">
            Channel Partner Details
          </DialogTitle>
          <DialogDescription className="text-slate-500 text-xs mt-0.5">
            Complete channel partner profile and verification overview.
          </DialogDescription>
        </div>

        <div className="px-6 py-5 overflow-y-auto max-h-[75vh] space-y-6">
          {/* Header Profile Card */}
          <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-5 flex gap-4 items-center">
            <Avatar className="h-16 w-16 border-2 border-white shadow-sm shrink-0">
              {agent?.profileImg && (
                <AvatarImage
                  src={agent.profileImg}
                  alt={displayName}
                  className="object-cover"
                />
              )}
              <AvatarFallback className="bg-gradient-to-tr from-blue-600 to-indigo-500 text-white text-xl font-bold">
                {getInitials(displayName)}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col min-w-0 flex-1">
              <h3 className="text-lg font-bold text-slate-900 truncate">
                {displayName}
              </h3>
              <p className="text-xs text-blue-600 font-semibold truncate mt-0.5 flex items-center gap-1">
                <Building2 className="h-3.5 w-3.5" />
                {agency}
              </p>

              <div className="mt-2.5 flex flex-wrap items-center gap-2">
                {/* Status Badge */}
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    status === "active"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : status === "blocked"
                      ? "bg-rose-50 text-rose-700 border border-rose-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      status === "active"
                        ? "bg-emerald-500"
                        : status === "blocked"
                        ? "bg-rose-500"
                        : "bg-amber-500"
                    }`}
                  />
                  Status: {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>

                {/* Approval Status Badge */}
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    approvalStatus === "approved"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : approvalStatus === "rejected"
                      ? "bg-rose-50 text-rose-700 border border-rose-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  Approval:{" "}
                  {approvalStatus.charAt(0).toUpperCase() +
                    approvalStatus.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50/50 p-3.5 rounded-xl border border-slate-100 flex items-start gap-3">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg shrink-0 mt-0.5">
                <Mail className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Email Address
                </span>
                <span className="text-xs font-medium text-slate-800 break-all">
                  {agent?.email || "N/A"}
                </span>
              </div>
            </div>

            <div className="bg-slate-50/50 p-3.5 rounded-xl border border-slate-100 flex items-start gap-3">
              <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg shrink-0 mt-0.5">
                <Phone className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Phone Number
                </span>
                <span className="text-xs font-medium text-slate-800">
                  {agent?.phone || "N/A"}
                </span>
              </div>
            </div>

            <div className="bg-slate-50/50 p-3.5 rounded-xl border border-slate-100 flex items-start gap-3">
              <div className="p-2 bg-purple-100 text-purple-600 rounded-lg shrink-0 mt-0.5">
                <Building2 className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Agency Name
                </span>
                <span className="text-xs font-medium text-slate-800">
                  {agency}
                </span>
              </div>
            </div>

            <div className="bg-slate-50/50 p-3.5 rounded-xl border border-slate-100 flex items-start gap-3">
              <div className="p-2 bg-amber-100 text-amber-600 rounded-lg shrink-0 mt-0.5">
                <Clock className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  User Status
                </span>
                <span className="text-xs font-medium text-slate-800 capitalize">
                  {agent?.userStatus || "N/A"}
                </span>
              </div>
            </div>

            <div className="bg-slate-50/50 p-3.5 rounded-xl border border-slate-100 flex items-start gap-3">
              <div className="p-2 bg-slate-100 text-slate-600 rounded-lg shrink-0 mt-0.5">
                <Calendar className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Joined Date
                </span>
                <span className="text-xs font-medium text-slate-800">
                  {agent?.createdAt
                    ? new Date(agent.createdAt).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
            </div>

            <div className="bg-slate-50/50 p-3.5 rounded-xl border border-slate-100 flex items-start gap-3">
              <div className="p-2 bg-slate-100 text-slate-600 rounded-lg shrink-0 mt-0.5">
                <Clock className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Last Updated
                </span>
                <span className="text-xs font-medium text-slate-800">
                  {agent?.updatedAt
                    ? new Date(agent.updatedAt).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* IDs */}
          <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-100 space-y-1.5 text-xs text-slate-500">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Agent ID:</span>
              <span className="font-mono text-slate-700 font-medium">
                {agent?._id || agent?.id || "N/A"}
              </span>
            </div>
            {agent?.userId && (
              <div className="flex items-center justify-between">
                <span className="text-slate-400">User Account ID:</span>
                <span className="font-mono text-slate-700 font-medium">
                  {agent.userId}
                </span>
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

