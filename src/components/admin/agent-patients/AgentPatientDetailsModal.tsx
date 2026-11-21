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
  User,
  Phone,
  Calendar,
  Building2,
  FileText,
  Clock,
  Globe,
  Activity,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import TakaIcon from "@/components/icons/TakaIcon";
import { IAgentPatient } from "@/types/agent-patient.type";

interface AgentPatientDetailsModalProps {
  patientCase: IAgentPatient;
  trigger?: React.ReactNode;
}

export default function AgentPatientDetailsModal({
  patientCase,
  trigger,
}: AgentPatientDetailsModalProps) {
  const [open, setOpen] = useState(false);

  const displayName = patientCase?.fullName || "Patient Case";
  const initials =
    displayName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "PT";

  const getStatusBadge = (status?: string) => {
    const s = (status || "").toLowerCase();
    switch (s) {
      case "submitted":
        return "bg-sky-50 text-sky-700 border-sky-200";
      case "under_review":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "confirmed":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "ongoing":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "cancelled":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const formatStatus = (s?: string) => {
    if (!s) return "N/A";
    return s
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
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
              title="View case details"
            />
          )
        }
      >
        {!trigger && <Eye className="h-4 w-4" />}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[620px] p-0 rounded-2xl gap-0 overflow-hidden bg-white border border-slate-100 shadow-2xl">
        <div className="p-6 pb-4 border-b border-slate-100 bg-gradient-to-r from-slate-50/80 to-blue-50/30">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-slate-900 tracking-tight">
              Patient Case Details
            </DialogTitle>
            <span className="font-mono text-xs font-bold px-2.5 py-1 bg-blue-100 text-blue-700 rounded-md">
              {patientCase.caseId}
            </span>
          </div>
          <DialogDescription className="text-slate-500 text-xs mt-1">
            Referred by agent/sub-agent medical case summary.
          </DialogDescription>
        </div>

        <div className="px-6 py-5 overflow-y-auto max-h-[75vh] space-y-5">
          {/* Patient Overview */}
          <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-4 flex gap-4 items-center">
            <Avatar className="h-14 w-14 border-2 border-white shadow-xs shrink-0">
              <AvatarFallback className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white text-lg font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 truncate">
                  {displayName}
                </h3>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${getStatusBadge(
                    patientCase.status
                  )}`}
                >
                  {formatStatus(patientCase.status)}
                </span>
              </div>
              <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-3">
                {patientCase.age && <span>Age: <strong className="text-slate-800">{patientCase.age} yrs</strong></span>}
                {patientCase.gender && <span className="capitalize">Gender: <strong className="text-slate-800">{patientCase.gender}</strong></span>}
                {patientCase.phone && <span>Phone: <strong className="text-slate-800">{patientCase.phone}</strong></span>}
              </div>
            </div>
          </div>

          {/* Treatment & Preference Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-50/60 p-3 rounded-xl border border-slate-100">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Treatment Type
              </span>
              <span className="text-xs font-bold text-slate-900 mt-1 block">
                {patientCase.treatmentType || "N/A"}
              </span>
            </div>

            <div className="bg-slate-50/60 p-3 rounded-xl border border-slate-100">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Preferred Country
              </span>
              <span className="text-xs font-bold text-slate-900 mt-1 flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-blue-500" />
                {patientCase.preferredCountry || "N/A"}
              </span>
            </div>

            <div className="bg-slate-50/60 p-3 rounded-xl border border-slate-100">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Budget Range
              </span>
              <span className="text-xs font-bold text-slate-900 mt-1 flex items-center gap-1.5">
                <TakaIcon className="h-3.5 w-3.5 text-emerald-500" />
                {patientCase.budgetRange || "N/A"}
              </span>
            </div>

            <div className="bg-slate-50/60 p-3 rounded-xl border border-slate-100">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Treatment Revenue
              </span>
              <span className="text-xs font-bold text-emerald-600 mt-1 flex items-center gap-1">
                <TakaIcon className="h-3.5 w-3.5" />
                {patientCase.revenue ?? 0}
              </span>
            </div>

            <div className="bg-slate-50/60 p-3 rounded-xl border border-slate-100">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Created At
              </span>
              <span className="text-xs font-bold text-slate-900 mt-1 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                {patientCase.createdAt
                  ? new Date(patientCase.createdAt).toLocaleString()
                  : "N/A"}
              </span>
            </div>
          </div>

          {/* Symptoms */}
          {patientCase.symptoms && (
            <div className="bg-blue-50/40 p-3.5 rounded-xl border border-blue-100/70">
              <span className="text-xs font-bold text-blue-950 block mb-1">
                Symptoms / Chief Complaints:
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                {patientCase.symptoms}
              </p>
            </div>
          )}

          {/* Referring Channel & Referral Partners Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            {/* Channel Partner */}
            <div className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/40">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Channel Partner
              </span>
              {patientCase.agent ? (
                <div className="space-y-1 text-xs">
                  <div className="font-bold text-slate-900">
                    {patientCase.agent.fullName}
                  </div>
                  <div className="text-slate-500 truncate">{patientCase.agent.email}</div>
                  <div className="text-slate-500">{patientCase.agent.phone}</div>
                </div>
              ) : (
                <span className="text-xs text-slate-400 italic">No channel partner assigned</span>
              )}
            </div>

            {/* Referral Partner */}
            <div className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/40">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Referral Partner
              </span>
              {patientCase.subAgent ? (
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900">{patientCase.subAgent.fullName}</span>
                    {patientCase.subAgent.refCode && (
                      <span className="font-mono text-[10px] px-1.5 py-0.2 bg-blue-100 text-blue-700 rounded font-semibold">
                        {patientCase.subAgent.refCode}
                      </span>
                    )}
                  </div>
                  <div className="text-blue-600 font-medium">{patientCase.subAgent.agencyName}</div>
                  <div className="text-slate-500">{patientCase.subAgent.phone}</div>
                </div>
              ) : (
                <span className="text-xs text-slate-400 italic">Direct channel referral</span>
              )}
            </div>
          </div>

          {/* Medical Reports */}
          <div>
            <span className="text-xs font-bold text-slate-800 block mb-2">
              Attached Medical Reports ({patientCase.reports?.length || 0})
            </span>
            {patientCase.reports && patientCase.reports.length > 0 ? (
              <div className="space-y-2">
                {patientCase.reports.map((reportUrl, idx) => (
                  <a
                    key={idx}
                    href={reportUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-colors text-xs text-slate-800 group"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileText className="h-4 w-4 text-blue-600 shrink-0" />
                      <span className="font-medium truncate">
                        Medical Report Document #{idx + 1}
                      </span>
                    </div>
                    <span className="text-blue-600 group-hover:underline flex items-center gap-1 text-[11px] shrink-0 font-semibold">
                      Open PDF <ExternalLink className="h-3 w-3" />
                    </span>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No reports attached.</p>
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

