import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import CreateHospitalModal from "@/components/modal/hospital/CreateHospitalModal";

export function HospitalFilters() {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center w-full bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input 
          placeholder="Search hospital, city, country..." 
          className="pl-9 bg-slate-50/50 border-slate-200 rounded-lg h-11 w-full"
        />
      </div>
      <CreateHospitalModal />
    </div>
  );
}
