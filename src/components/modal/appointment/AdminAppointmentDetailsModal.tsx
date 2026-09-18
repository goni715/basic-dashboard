"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IAdminAppointment } from "@/types/admin-appointment.type";

interface AdminAppointmentDetailsModalProps {
  appointment: IAdminAppointment;
}

const AdminAppointmentDetailsModal = ({ appointment }: AdminAppointmentDetailsModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg" />}>
          <Eye className="h-4 w-4" />
        </DialogTrigger>
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-0 bg-slate-50 rounded-2xl shadow-xl">
        <DialogHeader className="px-6 py-4 border-b border-slate-100 bg-white">
          <DialogTitle className="text-lg font-bold text-slate-900">
            Appointment Details
          </DialogTitle>
          <p className="text-sm text-slate-500">Booking information, timeline, reports, and payment.</p>
        </DialogHeader>
        
        <div className="p-6 overflow-y-auto max-h-[80vh] space-y-6">
          
          <div className="bg-white rounded-xl p-4 border border-slate-100 flex justify-between items-center shadow-sm">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Booking ID</p>
              <p className="font-bold text-slate-900">{appointment.bookingId}</p>
            </div>
            <Badge variant="outline" className={
              appointment.status === 'Confirmed' ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-none' :
              appointment.status === 'Upcoming' ? 'bg-indigo-50 text-indigo-700 border-indigo-200 shadow-none' :
              'bg-amber-50 text-amber-700 border-amber-200 shadow-none'
            }>
              {appointment.status}
            </Badge>
          </div>

          <div className="space-y-3">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase">Doctor</h4>
            <div className="bg-white rounded-xl border border-slate-100 p-4 space-y-3 shadow-sm">
              <div className="grid grid-cols-3">
                <span className="text-sm text-slate-500">Doctor</span>
                <span className="col-span-2 text-sm font-bold text-slate-900">{appointment.doctor}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-sm text-slate-500">Hospital</span>
                <span className="col-span-2 text-sm font-bold text-slate-900">{appointment.hospital}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase">Appointment</h4>
            <div className="bg-white rounded-xl border border-slate-100 p-4 space-y-3 shadow-sm">
              <div className="grid grid-cols-3">
                <span className="text-sm text-slate-500">Date</span>
                <span className="col-span-2 text-sm font-bold text-slate-900">{appointment.date}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-sm text-slate-500">Time</span>
                <span className="col-span-2 text-sm font-bold text-slate-900">{appointment.time}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-sm text-slate-500">Type</span>
                <span className="col-span-2 text-sm font-bold text-slate-900">{appointment.type}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-sm text-slate-500">Payment</span>
                <span className="col-span-2 text-sm font-bold text-slate-900">{appointment.payment}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase">Patient</h4>
            <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
              <div className="grid grid-cols-3">
                <span className="text-sm text-slate-500">Patient</span>
                <span className="col-span-2 text-sm font-bold text-slate-900">{appointment.patient}</span>
              </div>
            </div>
          </div>

          {appointment.symptoms && (
            <div className="space-y-3">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase">Symptoms / Notes</h4>
              <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm text-sm text-slate-600">
                {appointment.symptoms}
              </div>
            </div>
          )}

          {appointment.timeline && (
            <div className="space-y-3">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase">Booking Timeline</h4>
              <div className="pl-2">
                {appointment.timeline.map((item, i) => (
                  <div key={i} className="flex gap-4 relative">
                    {/* Line for timeline */}
                    {i !== appointment.timeline!.length - 1 && (
                      <div className="absolute left-2 top-6 bottom-[-16px] w-0.5 bg-blue-500"></div>
                    )}
                    <div className="mt-1">
                      <div className={`h-4 w-4 rounded-full border-[3px] border-white ring-2 ${item.active ? 'bg-blue-500 ring-blue-500' : 'bg-slate-300 ring-slate-200'}`}></div>
                    </div>
                    <div className="pb-4">
                      <p className={`text-sm font-bold ${item.active ? 'text-slate-900' : 'text-slate-500'}`}>{item.status}</p>
                      {item.date && <p className="text-xs text-slate-400 mt-1">{item.date}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        <div className="px-6 py-4 bg-white border-t border-slate-100 flex items-center justify-between gap-3">
          <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 h-10 px-6 rounded-xl font-medium" onClick={() => setOpen(false)}>
            Close
          </Button>
          <div className="flex gap-3">
            <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 h-10 px-4 rounded-xl font-medium">
              Reschedule
            </Button>
            <Button variant="outline" className="border-rose-200 text-rose-600 hover:bg-rose-50 h-10 px-6 rounded-xl font-medium">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminAppointmentDetailsModal;
