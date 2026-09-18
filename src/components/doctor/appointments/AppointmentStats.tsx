import { Card, CardContent } from "@/components/ui/card";
import { IAppointmentStat } from "@/types/appointment.type";

interface AppointmentStatsProps {
  stats: IAppointmentStat[];
}

export function AppointmentStats({ stats }: AppointmentStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <Card key={i} className="border-0 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
            <div className="text-sm font-semibold text-slate-500">{stat.title}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
