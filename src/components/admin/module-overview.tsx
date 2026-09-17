import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  User, 
  Building2, 
  Users, 
  Calendar, 
  Link2, 
  FileText, 
  Plane, 
  Hotel, 
  Lightbulb, 
  PlaySquare, 
  HeadphonesIcon,
  DollarSign
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const modules = [
  { name: "Doctors", total: 125, pending: 29, icon: User, color: "text-blue-500", bg: "bg-blue-50" },
  { name: "Hospitals", total: 150, pending: 22, icon: Building2, color: "text-teal-500", bg: "bg-teal-50" },
  { name: "Patients", total: 2480, pending: 170, icon: Users, color: "text-emerald-500", bg: "bg-emerald-50" },
  { name: "Appointments", total: 1420, pending: 84, icon: Calendar, color: "text-purple-500", bg: "bg-purple-50" },
  { name: "Medicines", total: 340, pending: 54, icon: Link2, color: "text-orange-500", bg: "bg-orange-50" },
  { name: "Reports", total: 1180, pending: 92, icon: FileText, color: "text-red-500", bg: "bg-red-50" },
  { name: "Travel", total: 860, pending: 48, icon: Plane, color: "text-sky-500", bg: "bg-sky-50" },
  { name: "Hotels", total: 42, pending: 6, icon: Hotel, color: "text-indigo-500", bg: "bg-indigo-50" },
  { name: "Health Tips", total: 58, pending: 16, icon: Lightbulb, color: "text-green-500", bg: "bg-green-50" },
  { name: "Tutorials", total: 45, pending: 14, icon: PlaySquare, color: "text-violet-500", bg: "bg-violet-50" },
  { name: "Support", total: 48, pending: 48, icon: HeadphonesIcon, color: "text-rose-500", bg: "bg-rose-50" },
  { name: "Payments", total: 201, pending: 12, icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
];

export function ModuleOverview() {
  return (
    <Card className="rounded-2xl border-none shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold text-slate-900">Module Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {modules.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <div key={i} className="flex flex-col gap-3 rounded-xl border border-slate-100 p-4 hover:shadow-sm transition-shadow">
                <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg", mod.bg, mod.color)}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-sm text-slate-900">{mod.name}</span>
                  <span className="text-xs text-slate-500">Total: {mod.total}</span>
                  <span className="text-[11px] font-medium text-orange-500">Pending: {mod.pending}</span>
                </div>
                <Link href="#" className={cn("text-xs font-semibold hover:underline mt-1 flex items-center gap-1", mod.color)}>
                  <span className="text-[10px]">👁</span> View
                </Link>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
