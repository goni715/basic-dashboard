import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function () {
  return (
    <div className="flex flex-col xl:flex-row gap-4 justify-between xl:items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input placeholder="Search patient or appointment..." className="pl-9 bg-slate-50 border-slate-200 rounded-xl" />
      </div>

      <div className="flex flex-wrap items-center gap-x-8 gap-y-4 xl:justify-end flex-1">
        <div>
          <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Patient</p>
          <p className="font-bold text-slate-900 text-sm">Rahul Ahmed</p>
        </div>
        <div>
          <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Appointment ID</p>
          <p className="font-bold text-blue-600 text-sm">BK-3SM-2026-001234</p>
        </div>
        <div>
          <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Type</p>
          <p className="font-bold text-slate-900 text-sm">Video Consultation</p>
        </div>
        <div>
          <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Date & Time</p>
          <p className="font-bold text-slate-900 text-sm">Apr 14, 2026, 10:00 AM</p>
        </div>
        <div>
          <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Call Duration</p>
          <p className="font-bold text-slate-900 text-sm">28 minutes</p>
        </div>
        <div className="ml-auto">
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 shadow-none px-3 py-1 font-bold">Notes Pending</Badge>
        </div>
      </div>
    </div>
  );
}
