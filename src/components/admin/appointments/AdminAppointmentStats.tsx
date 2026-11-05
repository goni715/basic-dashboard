import { Calendar, CheckCircle2, Clock, XCircle, FileText } from "lucide-react";

interface AppointmentStatsProps {
  total?: number;
  pending?: number;
  confirmed?: number;
  completed?: number;
  cancelled?: number;
}

export default function AdminAppointmentStats({
  total = 0,
  pending = 0,
  confirmed = 0,
  completed = 0,
  cancelled = 0,
}: AppointmentStatsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
      {/* Total Appointments */}
      <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-xs flex flex-col justify-between">
        <div className="h-9 w-9 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-1.5">
          <Calendar className="h-4 w-4" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">{total}</h2>
        <p className="text-slate-500 text-xs font-medium">Total Bookings</p>
      </div>

      {/* Pending */}
      <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-xs flex flex-col justify-between">
        <div className="h-9 w-9 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-1.5">
          <Clock className="h-4 w-4" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">{pending}</h2>
        <p className="text-slate-500 text-xs font-medium">Pending</p>
      </div>

      {/* Confirmed */}
      <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-xs flex flex-col justify-between">
        <div className="h-9 w-9 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-1.5">
          <CheckCircle2 className="h-4 w-4" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">{confirmed}</h2>
        <p className="text-slate-500 text-xs font-medium">Confirmed</p>
      </div>

      {/* Completed */}
      <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-xs flex flex-col justify-between">
        <div className="h-9 w-9 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-1.5">
          <CheckCircle2 className="h-4 w-4" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">{completed}</h2>
        <p className="text-slate-500 text-xs font-medium">Completed</p>
      </div>

      {/* Cancelled */}
      <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-xs flex flex-col justify-between">
        <div className="h-9 w-9 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center mb-1.5">
          <XCircle className="h-4 w-4" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">{cancelled}</h2>
        <p className="text-slate-500 text-xs font-medium">Cancelled</p>
      </div>
    </div>
  );
}
