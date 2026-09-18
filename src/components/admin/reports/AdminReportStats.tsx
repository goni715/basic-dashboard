import { IAdminReportStat } from "@/types/admin-report.type";

interface AdminReportStatsProps {
  stats: IAdminReportStat[];
}

export function AdminReportStats({ stats }: AdminReportStatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className={`h-10 w-10 rounded-full flex items-center justify-center mb-4 ${stat.bgColor}`}>
            <div className={`h-4 w-4 rounded-full ring-4 ${stat.iconColor} ring-white/50`}></div>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">{stat.value}</h2>
          <p className="text-slate-500 text-sm font-medium">{stat.title}</p>
        </div>
      ))}
    </div>
  );
}
