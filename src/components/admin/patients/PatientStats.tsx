interface PatientStatsProps {
  total?: number;
  active?: number;
  pending?: number;
  blocked?: number;
}

export default function PatientStats({
  total = 0,
  active = 0,
  pending = 0,
  blocked = 0,
}: PatientStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
        <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-2">
          <div className="h-3.5 w-3.5 bg-blue-600 rounded-full ring-4 ring-blue-200"></div>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">{total}</h2>
        <p className="text-slate-500 text-sm font-medium">Total Patients</p>
      </div>

      <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
        <div className="h-10 w-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-2">
          <div className="h-3.5 w-3.5 bg-emerald-500 rounded-full ring-4 ring-emerald-200"></div>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">{active}</h2>
        <p className="text-slate-500 text-sm font-medium">Active Patients</p>
      </div>

      <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
        <div className="h-10 w-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-2">
          <div className="h-3.5 w-3.5 bg-amber-500 rounded-full ring-4 ring-amber-200"></div>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">{pending}</h2>
        <p className="text-slate-500 text-sm font-medium">Pending Patients</p>
      </div>

      <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
        <div className="h-10 w-10 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center mb-2">
          <div className="h-3.5 w-3.5 bg-rose-500 rounded-full ring-4 ring-rose-200"></div>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">{blocked}</h2>
        <p className="text-slate-500 text-sm font-medium">Blocked Patients</p>
      </div>
    </div>
  );
}
