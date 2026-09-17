"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Eye, CheckCircle2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const DoctorAccessDetailsModal = ({ doctor }: { doctor: any }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button size="sm" variant="outline" className="h-8 border-blue-200 text-blue-600 hover:bg-blue-50 font-semibold rounded-lg px-3" onClick={() => setOpen(true)}>
        <Eye className="mr-1.5 h-3.5 w-3.5" />
        View
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-full sm:max-w-md p-0 bg-white border-l border-slate-100 flex flex-col">
          <SheetHeader className="p-6 border-b border-slate-100">
            <SheetTitle className="text-lg font-bold text-slate-900">Access Details</SheetTitle>
          </SheetHeader>
          
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-8">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 bg-gradient-to-br from-blue-500 to-teal-400 border-2 border-white shadow-sm">
                  <AvatarFallback className="bg-transparent text-white text-2xl font-bold">
                    {doctor.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900">{doctor.name}</h3>
                  <p className="text-sm text-slate-500 font-medium">{doctor.email}</p>
                  <div className="mt-2">
                    {doctor.status === 'Active' && (
                      <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100 font-semibold shadow-none rounded-md px-2.5">
                        Active
                      </Badge>
                    )}
                    {doctor.status === 'Invited' && (
                      <Badge className="bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100 font-semibold shadow-none rounded-md px-2.5">
                        Invited
                      </Badge>
                    )}
                    {doctor.status === 'Disabled' && (
                      <Badge className="bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-100 font-semibold shadow-none rounded-md px-2.5">
                        Disabled
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-slate-50">
                  <span className="text-sm text-slate-400 font-medium">Specialty</span>
                  <span className="text-sm font-semibold text-slate-900">{doctor.specialty}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-slate-50">
                  <span className="text-sm text-slate-400 font-medium">Hospital</span>
                  <span className="text-sm font-semibold text-slate-900">{doctor.hospital}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-slate-50">
                  <span className="text-sm text-slate-400 font-medium">Last Login</span>
                  <span className="text-sm font-semibold text-slate-900">{doctor.lastLogin}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-sm text-slate-400 font-medium">Created</span>
                  <span className="text-sm font-semibold text-slate-900">{doctor.created}</span>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900">Permissions</h4>
                <div className="space-y-3">
                  {['View assigned patients', 'View patient reports', 'Add consultation notes', 'Upload prescription'].map((perm, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      <span className="text-sm font-medium text-slate-700">{perm}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50/80 rounded-xl p-5 border border-slate-100 space-y-4">
                <h4 className="text-sm font-bold text-slate-900">Invite History</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500 font-medium">Invite sent</span>
                    <span className="text-sm font-semibold text-slate-700">{doctor.created}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500 font-medium">Invite accepted</span>
                    <span className="text-sm font-semibold text-slate-700">Jan 16, 2026</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500 font-medium">Last access</span>
                    <span className="text-sm font-semibold text-slate-700">{doctor.lastLogin}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 border-t border-slate-100 flex gap-4 mt-auto">
            <Button variant="outline" className="flex-1 rounded-xl h-12 border-slate-200 font-semibold text-slate-600 hover:bg-slate-50">
              Resend Invite
            </Button>
            {doctor?.status === 'Disabled' ? (
              <Button className="flex-1 rounded-xl h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold shadow-sm">
                Activate Access
              </Button>
            ) : (
              <Button className="flex-1 rounded-xl h-12 bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-sm">
                Disable Access
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default DoctorAccessDetailsModal;
