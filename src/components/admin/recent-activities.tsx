import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Link2, FileText, Hotel, Lightbulb, PlaySquare } from "lucide-react";
import { cn } from "@/lib/utils";

const activities = [
  {
    title: "Dr. Arjun Mehta profile published",
    module: "Doctors",
    time: "2 min ago",
    icon: User,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    title: "New medicine request submitted by Mohammed Rahman",
    module: "Medicines",
    time: "15 min ago",
    icon: Link2,
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    title: "Cardiac Screening Report verified",
    module: "Reports",
    time: "32 min ago",
    icon: FileText,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    title: "Pan Pacific Sonargaon hotel updated",
    module: "Hotels",
    time: "1 hr ago",
    icon: Hotel,
    color: "text-teal-500",
    bg: "bg-teal-50",
  },
  {
    title: "New health tip published: Summer Health",
    module: "Health Tips",
    time: "2 hr ago",
    icon: Lightbulb,
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    title: "Tutorial updated: Hospital Appointment Booking",
    module: "Tutorials",
    time: "3 hr ago",
    icon: PlaySquare,
    color: "text-sky-500",
    bg: "bg-sky-50",
  },
];

export function RecentActivities() {
  return (
    <Card className="rounded-2xl border-none shadow-sm h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold text-slate-900">Recent Platform Activities</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {activities.map((act, i) => {
          const Icon = act.icon;
          return (
            <div key={i} className="flex items-start gap-3">
              <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full mt-0.5", act.bg, act.color)}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-slate-800">{act.title}</span>
                <div className="flex items-center gap-2 text-[11px] font-medium">
                  <span className={act.color}>{act.module}</span>
                  <span className="text-slate-400">&bull; {act.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
