import { Card, CardContent } from "@/components/ui/card";
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
  HeadphonesIcon
} from "lucide-react";
import TakaIcon from "@/components/icons/TakaIcon";
import { cn } from "@/lib/utils";

const stats = [
  {
    title: "Total Doctors",
    value: "125",
    description: "96 published",
    icon: User,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50",
  },
  {
    title: "Total Hospitals",
    value: "150",
    description: "128 published",
    icon: Building2,
    iconColor: "text-teal-500",
    iconBg: "bg-teal-50",
  },
  {
    title: "Total Patients",
    value: "2,480",
    description: "2,310 active",
    icon: Users,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50",
  },
  {
    title: "Appointments",
    value: "1,420",
    description: "86 upcoming",
    icon: Calendar,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-50",
  },
  {
    title: "Medicine Requests",
    value: "620",
    description: "46 pending review",
    icon: Link2,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
  },
  {
    title: "Medical Reports",
    value: "1,180",
    description: "92 pending verification",
    icon: FileText,
    iconColor: "text-red-500",
    iconBg: "bg-red-50",
  },
  {
    title: "Travel Requests",
    value: "860",
    description: "48 active requests",
    icon: Plane,
    iconColor: "text-sky-500",
    iconBg: "bg-sky-50",
  },
  {
    title: "Hotels",
    value: "42",
    description: "36 published",
    icon: Hotel,
    iconColor: "text-indigo-500",
    iconBg: "bg-indigo-50",
  },
  {
    title: "Health Tips",
    value: "58",
    description: "42 published",
    icon: Lightbulb,
    iconColor: "text-green-500",
    iconBg: "bg-green-50",
  },
  {
    title: "Tutorials",
    value: "45",
    description: "31 published",
    icon: PlaySquare,
    iconColor: "text-violet-500",
    iconBg: "bg-violet-50",
  },
  {
    title: "Support Tickets",
    value: "48",
    description: "Open tickets",
    icon: HeadphonesIcon,
    iconColor: "text-rose-500",
    iconBg: "bg-rose-50",
  },
  {
    title: "Revenue",
    value: "৳18,75,000",
    description: "This month",
    icon: TakaIcon,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
  },
];

export default function () {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <Card key={i} className="rounded-2xl border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl", stat.iconBg, stat.iconColor)}>
                <Icon className="h-6 w-6" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[22px] font-bold text-slate-900 leading-none tracking-tight">{stat.value}</span>
                <span className="text-[13px] font-semibold text-slate-700">{stat.title}</span>
                <span className="text-xs text-slate-500 mt-0.5">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
