import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

export default function ({ role }: { role?: string | null }) {
  const displayName = role === "doctor" ? "Doctor" : "Admin";
  
  return (
    <header className="sticky top-0 z-30 flex h-[88px] w-full items-center justify-between border-b border-slate-100 bg-white/80 px-8 backdrop-blur-md">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold tracking-tight text-slate-900">Dashboard Overview</h1>
        <p className="text-[13px] font-medium text-slate-500 mt-0.5">
          Monitor all platform modules, recent activities, and monthly performance.
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 border border-slate-100 shadow-sm">
          <AvatarImage src="" alt={displayName} />
          <AvatarFallback className="bg-blue-50 text-blue-600">
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
        <span className="text-sm font-semibold text-slate-700 capitalize">{displayName}</span>
      </div>
    </header>
  );
}
