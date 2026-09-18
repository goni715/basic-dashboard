import { Search } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IDoctorPatient } from "@/types/doctor-patient.type";

interface PatientLeftPaneProps {
  patients: IDoctorPatient[];
}

export default function ({ patients }: PatientLeftPaneProps) {
  return (
    <div className="w-full xl:w-80 flex flex-col shrink-0 gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input placeholder="Search assigned patient..." className="pl-9 bg-white border-slate-200 rounded-xl" />
      </div>
      
      <Card className="border-0 shadow-sm rounded-2xl flex-1 overflow-hidden flex flex-col">
        <CardHeader className="py-4 border-b border-slate-100 bg-slate-50/50">
          <CardTitle className="text-sm font-bold">Assigned Patients</CardTitle>
        </CardHeader>
        <ScrollArea className="flex-1">
          <div className="p-3 space-y-2">
            {patients.map((p) => (
              <div 
                key={p.id} 
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                  p.active ? 'bg-blue-50/50 border border-blue-100' : 'hover:bg-slate-50 border border-transparent'
                }`}
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback className={`text-xs font-bold ${p.active ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'}`}>
                    {p.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className={`text-sm font-bold truncate ${p.active ? 'text-slate-900' : 'text-slate-700'}`}>{p.name}</p>
                    {p.active && <div className="h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />}
                  </div>
                  <p className="text-[11px] font-medium text-slate-400">{p.date}</p>
                  <p className="text-xs font-medium text-slate-500 truncate mt-0.5">{p.note}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}
