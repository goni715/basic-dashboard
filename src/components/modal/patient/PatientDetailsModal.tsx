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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Eye } from "lucide-react";

const PatientDetailsModal = ({ patient }: { patient: any }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={<Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg" />}>
            <Eye className="h-4 w-4" />
          </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] p-0 rounded-2xl gap-0 overflow-hidden">
          <div className="p-6 pb-4 border-b border-slate-100">
            <DialogTitle className="text-xl font-bold">Patient Details</DialogTitle>
            <DialogDescription className="text-slate-500 mt-1.5">
              Complete patient profile overview.
            </DialogDescription>
          </div>
          
          <div className="px-6 py-4 overflow-y-auto max-h-[70vh] custom-scrollbar space-y-6">
            
            <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-5 flex gap-4 items-center">
              <Avatar className="h-16 w-16 bg-gradient-to-br from-blue-500 to-teal-400 rounded-xl shadow-sm">
                <AvatarFallback className="bg-transparent text-white text-2xl font-bold rounded-xl">
                  {patient?.avatar || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <h3 className="text-xl font-bold text-slate-900">{patient?.name}</h3>
                <p className="text-sm text-slate-500 font-medium">{patient?.phone} • {patient?.email}</p>
                <div className="mt-2">
                  {patient?.status === 'Active' && (
                    <Badge variant="outline" className="border-emerald-200 text-emerald-600 bg-emerald-50 px-3 py-0.5 font-semibold text-xs rounded-md shadow-none">
                      Active
                    </Badge>
                  )}
                  {patient?.status === 'Blocked' && (
                    <Badge variant="outline" className="border-rose-200 text-rose-600 bg-rose-50 px-3 py-0.5 font-semibold text-xs rounded-md shadow-none">
                      Blocked
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Personal Information</h4>
              <div className="bg-slate-50/50 border border-slate-100 rounded-xl overflow-hidden text-sm">
                <div className="flex items-center p-3 border-b border-slate-100">
                  <div className="w-1/3 text-slate-400 font-medium">Date of Birth</div>
                  <div className="w-2/3 text-slate-900 font-bold">{patient?.dob || "1986-03-15"}</div>
                </div>
                <div className="flex items-center p-3 border-b border-slate-100">
                  <div className="w-1/3 text-slate-400 font-medium">Gender</div>
                  <div className="w-2/3 text-slate-900 font-bold">{patient?.gender || "Male"}</div>
                </div>
                <div className="flex items-center p-3 border-b border-slate-100">
                  <div className="w-1/3 text-slate-400 font-medium">Country</div>
                  <div className="w-2/3 text-slate-900 font-bold">{patient?.country || "Bangladesh"}</div>
                </div>
                <div className="flex items-center p-3 border-b border-slate-100">
                  <div className="w-1/3 text-slate-400 font-medium">City</div>
                  <div className="w-2/3 text-slate-900 font-bold">{patient?.city || "Dhaka"}</div>
                </div>
                <div className="flex items-center p-3">
                  <div className="w-1/3 text-slate-400 font-medium">Address</div>
                  <div className="w-2/3 text-slate-900 font-bold">{patient?.address || "45 Gulshan Ave, Dhaka"}</div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Medical Information</h4>
              <div className="bg-slate-50/50 border border-slate-100 rounded-xl overflow-hidden text-sm">
                <div className="flex items-center p-3 border-b border-slate-100">
                  <div className="w-1/3 text-slate-400 font-medium">Blood Group</div>
                  <div className="w-2/3 text-slate-900 font-bold">{patient?.bloodGroup || "B+"}</div>
                </div>
                <div className="flex items-center p-3 border-b border-slate-100">
                  <div className="w-1/3 text-slate-400 font-medium">Allergies</div>
                  <div className="w-2/3 text-slate-900 font-bold">{patient?.allergies || "Penicillin"}</div>
                </div>
                <div className="flex items-center p-3">
                  <div className="w-1/3 text-slate-400 font-medium">Medical Info</div>
                  <div className="w-2/3 text-slate-900 font-bold leading-tight">{patient?.medicalInfo || "B+, Cardiac history"}</div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Latest Appointments</h4>
              <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-4 text-sm text-slate-400 font-medium">
                No recent appointments.
              </div>
            </div>

          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PatientDetailsModal;
