import { IAdminTutorialStat } from "@/types/admin-tutorial.type";

interface AdminTutorialStatsProps {
  stats: IAdminTutorialStat[];
}

export function AdminTutorialStats({ stats }: AdminTutorialStatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <h2 className="text-3xl font-black text-blue-600 mb-1">{stat.value}</h2>
          <div>
            <p className="text-slate-900 text-sm font-bold">{stat.title}</p>
            <p className="text-slate-500 text-xs mt-1">{stat.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
