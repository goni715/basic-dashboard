import Link from "next/link";
import { ArrowLeft, Video, ClipboardList } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface AppointmentHeaderProps {
  id: string;
}

export function AppointmentHeader({ id }: AppointmentHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Top Nav */}
      <div>
        <Button variant="link" className="text-slate-500 hover:text-slate-800 p-0 h-auto gap-2" render={<Link href="/doctor/appointments" />} nativeButton={false}>
          <ArrowLeft className="h-4 w-4" />
          Back to Appointments
        </Button>
      </div>

      {/* Header Info */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-sm font-semibold text-slate-500">
              Booking ID: <span className="text-blue-600 font-bold">{id}</span>
            </h2>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Upcoming</Badge>
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1">
              <Video className="h-3 w-3" />
              Video Consultation
            </Badge>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Date</p>
              <p className="font-semibold text-slate-900 text-sm">April 14, 2026</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Time</p>
              <p className="font-semibold text-slate-900 text-sm">10:00 AM</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Duration</p>
              <p className="font-semibold text-slate-900 text-sm">30 minutes</p>
            </div>
          </div>
        </div>

        <div className="flex w-full md:w-auto gap-3">
          <Button variant="outline" className="flex-1 md:flex-none border-blue-200 text-blue-600 hover:bg-blue-50">
            <ClipboardList className="mr-2 h-4 w-4" />
            Open Notes
          </Button>
          <Button className="flex-1 md:flex-none bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-sm">
            <Video className="mr-2 h-4 w-4" />
            Join Video Call
          </Button>
        </div>
      </div>
    </div>
  );
}
