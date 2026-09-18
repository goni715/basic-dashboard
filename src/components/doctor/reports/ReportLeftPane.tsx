import { Search } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IDoctorReport } from "@/types/report.type";

interface ReportLeftPaneProps {
  reports: IDoctorReport[];
}

export default function ({ reports }: ReportLeftPaneProps) {
  return (
    <div className="w-full lg:w-80 flex flex-col shrink-0 gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input placeholder="Search report or patient..." className="pl-9 bg-white border-slate-200 rounded-xl" />
      </div>
      
      <Card className="border-0 shadow-sm rounded-2xl flex-1 overflow-hidden flex flex-col">
        <CardHeader className="py-4 border-b border-slate-100 bg-slate-50/50">
          <CardTitle className="text-sm font-bold">Patient Reports</CardTitle>
        </CardHeader>
        <ScrollArea className="flex-1">
          <div className="p-3 space-y-2">
            {reports.map((r) => (
              <div 
                key={r.id} 
                className={`flex flex-col gap-1 p-4 rounded-xl cursor-pointer transition-colors ${
                  r.active ? 'bg-blue-50/50 border-2 border-blue-500' : 'hover:bg-slate-50 border-2 border-transparent'
                }`}
              >
                <div className="flex justify-between items-start">
                  <p className={`text-sm font-bold ${r.active ? 'text-slate-900' : 'text-slate-700'}`}>{r.name}</p>
                  {r.pending ? (
                    <span className="text-[10px] font-bold text-amber-600">Pending</span>
                  ) : (
                    <span className="text-[10px] font-bold text-emerald-600">Verified</span>
                  )}
                </div>
                <p className="text-xs font-medium text-slate-500">{r.patient}</p>
                <div className="flex gap-2 mt-1">
                  <Badge variant="secondary" className="bg-slate-100 text-slate-600 text-[10px] px-1.5 py-0">{r.name.split(' ')[0]}</Badge>
                  <span className="text-[11px] font-medium text-slate-400">{r.date}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}
