"use client";

import { useState } from "react";
import {
  Eye,
  LifeBuoy,
  User,
  Mail,
  Phone,
  Ticket,
  Calendar,
  Clock,
  MessageSquare,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ISupportItem } from "@/types/support.type";
import { SUPPORT_STATUS_BADGE_CONFIG } from "@/constants/support.constant";

interface SupportDetailsModalProps {
  item: ISupportItem;
  trigger?: React.ReactElement;
}

export default function SupportDetailsModal({
  item,
  trigger,
}: SupportDetailsModalProps) {
  const [open, setOpen] = useState(false);

  const statusConfig = SUPPORT_STATUS_BADGE_CONFIG[item.status?.toLowerCase()] || {
    label: item.status || "Unknown",
    bg: "bg-slate-100",
    text: "text-slate-700",
    border: "border-slate-200",
    dot: "bg-slate-400",
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).format(d);
    } catch {
      return dateStr;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          trigger || (
            <Button
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0 border-slate-200 text-slate-600 hover:bg-slate-100 rounded-lg shadow-xs transition-colors cursor-pointer"
              title="View Details"
            >
              <Eye className="h-3.5 w-3.5" />
            </Button>
          )
        }
      />

      <DialogContent className="sm:max-w-[620px] p-0 rounded-2xl gap-0 overflow-hidden max-h-[92dvh] flex flex-col bg-white border border-slate-100 shadow-2xl">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 border-b border-slate-100 shrink-0 bg-gradient-to-r from-slate-50/80 to-blue-50/30">
          <div className="flex items-center justify-between gap-3 pr-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-500 text-white flex items-center justify-center shadow-sm shadow-blue-500/20">
                <LifeBuoy className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <DialogTitle className="text-lg font-bold text-slate-900 tracking-tight">
                    Support Ticket Details
                  </DialogTitle>
                </div>
                <DialogDescription className="text-slate-500 text-xs sm:text-sm mt-0.5">
                  Ticket #{item.ticket || item._id.slice(-6)}
                </DialogDescription>
              </div>
            </div>

            <Badge
              variant="outline"
              className={`rounded-full px-3 py-1 text-xs font-semibold shrink-0 capitalize ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full mr-1.5 ${statusConfig.dot}`} />
              {statusConfig.label}
            </Badge>
          </div>
        </DialogHeader>

        {/* Content Body */}
        <div className="px-6 py-5 overflow-y-auto flex-1 space-y-5 custom-scrollbar text-xs sm:text-sm">
          {/* User Contact Card */}
          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-blue-600" />
              Requester Information
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex flex-col gap-0.5">
                <span className="text-slate-400">Full Name</span>
                <span className="font-semibold text-slate-900 text-sm">
                  {item.fullName || "N/A"}
                </span>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-slate-400">Ticket Number</span>
                <span className="font-mono font-bold text-blue-600 text-sm">
                  #{item.ticket || "N/A"}
                </span>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-slate-400 flex items-center gap-1">
                  <Mail className="h-3 w-3 text-slate-400" /> Email Address
                </span>
                <a
                  href={`mailto:${item.email}`}
                  className="font-medium text-blue-600 hover:underline break-all"
                >
                  {item.email || "N/A"}
                </a>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-slate-400 flex items-center gap-1">
                  <Phone className="h-3 w-3 text-slate-400" /> Phone Number
                </span>
                <a
                  href={`tel:${item.phone}`}
                  className="font-medium text-slate-800 hover:text-blue-600"
                >
                  {item.phone || "N/A"}
                </a>
              </div>
            </div>
          </div>

          {/* Subject & Message Card */}
          <div className="rounded-xl border border-slate-100 bg-white p-4 space-y-3 shadow-xs">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-teal-600" />
                Subject
              </span>
              <p className="font-semibold text-slate-900 text-sm sm:text-base">
                {item.subject || "No subject provided"}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <MessageSquare className="h-3.5 w-3.5 text-purple-600" />
                Inquiry Message
              </span>
              <div className="p-3.5 rounded-xl bg-slate-50/70 text-slate-700 leading-relaxed whitespace-pre-wrap font-sans text-xs sm:text-sm border border-slate-100">
                {item.message || "No message content."}
              </div>
            </div>
          </div>

          {/* Meta Details */}
          <div className="rounded-xl border border-slate-100 bg-slate-50/40 p-3.5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              <span>Created: {formatDate(item.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              <span>Updated: {formatDate(item.updatedAt)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="p-4 border-t border-slate-100 bg-slate-50/50 shrink-0 flex justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            className="rounded-xl h-10 px-6 border-slate-200 font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
