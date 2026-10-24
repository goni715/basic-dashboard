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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, User, Phone, Mail, Calendar, ShieldCheck } from "lucide-react";
import { IPatient } from "@/types/patient.type";

interface PatientDetailsModalProps {
  patient: IPatient;
  trigger?: React.ReactNode;
}

const PatientDetailsModal = ({ patient, trigger }: PatientDetailsModalProps) => {
  const [open, setOpen] = useState(false);

  const displayName = patient?.fullName || patient?.name || "Patient Profile";
  const status = (patient?.status || "pending").toLowerCase();

  const getInitials = (name?: string) => {
    if (!name) return "PT";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <>
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
                title="View patient details"
              />
            )
          }
        >
          {!trigger && <Eye className="h-4 w-4" />}
        </DialogTrigger>

        <DialogContent className="sm:max-w-[540px] p-0 rounded-2xl gap-0 overflow-hidden bg-white border border-slate-100 shadow-2xl">
          <div className="p-6 pb-4 border-b border-slate-100 bg-gradient-to-r from-slate-50/80 to-blue-50/30">
            <DialogTitle className="text-xl font-bold text-slate-900 tracking-tight">
              Patient Details
            </DialogTitle>
            <DialogDescription className="text-slate-500 text-xs mt-0.5">
              Complete patient profile and account overview.
            </DialogDescription>
          </div>

          <div className="px-6 py-5 overflow-y-auto max-h-[75vh] custom-scrollbar space-y-6">
            {/* Header Profile Card */}
            <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-5 flex gap-4 items-center">
              <Avatar className="h-16 w-16 border-2 border-white shadow-sm shrink-0">
                {patient?.profileImg && (
                  <AvatarImage
                    src={patient.profileImg}
                    alt={displayName}
                    className="object-cover"
                  />
                )}
                <AvatarFallback className="bg-gradient-to-tr from-blue-600 to-teal-500 text-white text-xl font-bold">
                  {getInitials(displayName)}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col min-w-0 flex-1">
                <h3 className="text-lg font-bold text-slate-900 truncate">
                  {displayName}
                </h3>
                <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                  {patient?.email || "No email"}
                </p>

                <div className="mt-2.5 flex items-center gap-2">
                  {status === "active" && (
                    <Badge
                      variant="outline"
                      className="border-emerald-200 text-emerald-700 bg-emerald-50 px-2.5 py-0.5 font-semibold text-xs rounded-full shadow-none"
                    >
                      Active
                    </Badge>
                  )}
                  {status === "pending" && (
                    <Badge
                      variant="outline"
                      className="border-amber-200 text-amber-700 bg-amber-50 px-2.5 py-0.5 font-semibold text-xs rounded-full shadow-none"
                    >
                      Pending
                    </Badge>
                  )}
                  {status === "blocked" && (
                    <Badge
                      variant="outline"
                      className="border-rose-200 text-rose-700 bg-rose-50 px-2.5 py-0.5 font-semibold text-xs rounded-full shadow-none"
                    >
                      Blocked
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Account Details */}
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Account Information
              </h4>
              <div className="bg-slate-50/50 border border-slate-100 rounded-xl overflow-hidden text-sm">
                <div className="flex items-center p-3 border-b border-slate-100">
                  <div className="w-1/3 text-slate-400 font-medium flex items-center gap-1.5 text-xs">
                    <User className="size-3.5" /> Full Name
                  </div>
                  <div className="w-2/3 text-slate-900 font-semibold text-xs sm:text-sm">
                    {displayName}
                  </div>
                </div>

                <div className="flex items-center p-3 border-b border-slate-100">
                  <div className="w-1/3 text-slate-400 font-medium flex items-center gap-1.5 text-xs">
                    <Mail className="size-3.5" /> Email
                  </div>
                  <div className="w-2/3 text-slate-900 font-semibold text-xs sm:text-sm truncate">
                    {patient?.email || "N/A"}
                  </div>
                </div>

                <div className="flex items-center p-3 border-b border-slate-100">
                  <div className="w-1/3 text-slate-400 font-medium flex items-center gap-1.5 text-xs">
                    <Phone className="size-3.5" /> Phone
                  </div>
                  <div className="w-2/3 text-slate-900 font-semibold text-xs sm:text-sm">
                    {patient?.phone || "N/A"}
                  </div>
                </div>

                <div className="flex items-center p-3 border-b border-slate-100">
                  <div className="w-1/3 text-slate-400 font-medium flex items-center gap-1.5 text-xs">
                    <Calendar className="size-3.5" /> Registered Date
                  </div>
                  <div className="w-2/3 text-slate-900 font-semibold text-xs sm:text-sm">
                    {patient?.createdAt
                      ? new Date(patient.createdAt).toLocaleString()
                      : "Recently"}
                  </div>
                </div>

                <div className="flex items-center p-3">
                  <div className="w-1/3 text-slate-400 font-medium flex items-center gap-1.5 text-xs">
                    <ShieldCheck className="size-3.5" /> Last Login
                  </div>
                  <div className="w-2/3 text-slate-900 font-semibold text-xs sm:text-sm">
                    {patient?.lastLoginAt
                      ? new Date(patient.lastLoginAt).toLocaleString()
                      : "Never logged in"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PatientDetailsModal;
