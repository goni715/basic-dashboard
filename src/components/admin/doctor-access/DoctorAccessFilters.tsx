import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CreateDoctorAccessModal from "@/components/modal/doctor-access/CreateDoctorAccessModal";

export function DoctorAccessFilters() {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
      <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search by doctor name or Gmail" 
            className="pl-9 bg-white border-slate-200 rounded-lg h-10"
          />
        </div>
        <Select>
          <SelectTrigger className="w-full md:w-40 bg-white border-slate-200 rounded-lg h-10">
            <SelectValue placeholder="All Specialties" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Specialties</SelectItem>
            <SelectItem value="cardiology">Cardiology</SelectItem>
            <SelectItem value="orthopedics">Orthopedics</SelectItem>
            <SelectItem value="fertility">IVF & Fertility</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <CreateDoctorAccessModal />
    </div>
  );
}
