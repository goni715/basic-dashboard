import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CreateDoctorModal from "@/components/modal/doctor/CreateDoctorModal";

export function DoctorFilters() {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center w-full">
      <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
        <div className="relative min-w-[200px] lg:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search doctor, specialty..." 
            className="pl-9 bg-white border-slate-200 rounded-lg h-10 w-full"
          />
        </div>
        <Select>
          <SelectTrigger className="w-full md:w-40 bg-white border-slate-200 rounded-lg h-10">
            <SelectValue placeholder="All Countries" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full md:w-40 bg-white border-slate-200 rounded-lg h-10">
            <SelectValue placeholder="All Hospitals" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Hospitals</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full md:w-40 bg-white border-slate-200 rounded-lg h-10">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <CreateDoctorModal />
    </div>
  );
}
