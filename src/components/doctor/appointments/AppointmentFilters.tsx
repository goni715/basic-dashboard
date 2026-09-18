import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AppointmentFilters() {
  return (
    <div className="p-6 pb-2">
      <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Search patient or booking ID..." className="pl-9 h-11 bg-slate-50/50 border-slate-200 rounded-xl w-full max-w-md" />
        </div>
        <div className="flex w-full md:w-auto items-center gap-3">
          <Button variant="outline" className="h-11 border-slate-200 rounded-xl text-slate-600 w-11 px-0 shrink-0">
            <Filter className="h-4 w-4" />
          </Button>
          <Input placeholder="Date range" className="h-11 bg-slate-50/50 border-slate-200 rounded-xl md:w-[200px]" disabled />
          <Button className="h-11 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white rounded-xl shadow-sm px-6 whitespace-nowrap">
            Today
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-bold text-slate-900">Appointment List</h2>
        <p className="text-sm font-medium text-slate-500">Only appointments assigned to this doctor are shown.</p>
      </div>
    </div>
  );
}
