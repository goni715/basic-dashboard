import { Briefcase, CheckCircle2, Clock, Users } from "lucide-react";
import TakaIcon from "@/components/icons/TakaIcon";

interface SubAgentStatsProps {
  total?: number;
  active?: number;
  totalCases?: number;
  totalEarnings?: number;
}

export default function SubAgentStats({
  total = 0,
  active = 0,
  totalCases = 0,
  totalEarnings = 0,
}: SubAgentStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Total Referral Partners */}
      <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
        <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-2">
          <Users className="h-5 w-5" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">{total}</h2>
        <p className="text-slate-500 text-sm font-medium">Total Referral Partners</p>
      </div>

      {/* Active Sub-Agents */}
      <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
        <div className="h-10 w-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-2">
          <div className="h-3.5 w-3.5 bg-emerald-500 rounded-full ring-4 ring-emerald-200" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">{active}</h2>
        <p className="text-slate-500 text-sm font-medium">Active Partners</p>
      </div>

      {/* Total Cases */}
      <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
        <div className="h-10 w-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-2">
          <Briefcase className="h-5 w-5 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">{totalCases}</h2>
        <p className="text-slate-500 text-sm font-medium">Assigned Cases</p>
      </div>

      {/* Total Earnings */}
      <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
        <div className="h-10 w-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-2">
          <TakaIcon className="h-5 w-5 text-amber-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">৳{totalEarnings}</h2>
        <p className="text-slate-500 text-sm font-medium">Total Earnings</p>
      </div>
    </div>
  );
}
