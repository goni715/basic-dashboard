import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Activity,
  XCircle,
} from "lucide-react";

interface AgentPatientStatsProps {
  total?: number;
  submitted?: number;
  underReview?: number;
  confirmed?: number;
  ongoing?: number;
  completed?: number;
}

export default function AgentPatientStats({
  total = 0,
  submitted = 0,
  underReview = 0,
  confirmed = 0,
  ongoing = 0,
  completed = 0,
}: AgentPatientStatsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
      {/* Total Cases */}
      <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-xs flex flex-col justify-between">
        <div className="h-9 w-9 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-1.5">
          <FileText className="h-4 w-4" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">{total}</h2>
        <p className="text-slate-500 text-xs font-medium">Total Cases</p>
      </div>

      {/* Submitted */}
      <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-xs flex flex-col justify-between">
        <div className="h-9 w-9 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center mb-1.5">
          <Clock className="h-4 w-4" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">{submitted}</h2>
        <p className="text-slate-500 text-xs font-medium">Submitted</p>
      </div>

      {/* Under Review */}
      <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-xs flex flex-col justify-between">
        <div className="h-9 w-9 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-1.5">
          <AlertCircle className="h-4 w-4" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">{underReview}</h2>
        <p className="text-slate-500 text-xs font-medium">Under Review</p>
      </div>

      {/* Confirmed */}
      <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-xs flex flex-col justify-between">
        <div className="h-9 w-9 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-1.5">
          <CheckCircle2 className="h-4 w-4" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">{confirmed}</h2>
        <p className="text-slate-500 text-xs font-medium">Confirmed</p>
      </div>

      {/* Ongoing */}
      <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-xs flex flex-col justify-between">
        <div className="h-9 w-9 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-1.5">
          <Activity className="h-4 w-4" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">{ongoing}</h2>
        <p className="text-slate-500 text-xs font-medium">Ongoing</p>
      </div>

      {/* Completed */}
      <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-xs flex flex-col justify-between">
        <div className="h-9 w-9 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-1.5">
          <CheckCircle2 className="h-4 w-4" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">{completed}</h2>
        <p className="text-slate-500 text-xs font-medium">Completed</p>
      </div>
    </div>
  );
}

