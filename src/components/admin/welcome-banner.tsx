import { CheckCircle2, TrendingUp } from "lucide-react";

export default function WelcomeBanner({ role }: { role?: string | null }) {
  const isDoctor = role?.toLowerCase() === "doctor";
  const displayName = isDoctor ? "Doctor" : "Admin";

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-teal-400 p-8 shadow-sm">
      {/* Background Graphic overlay (Abstract) */}
      <div className="absolute right-0 top-0 h-full w-1/3 opacity-20">
        <TrendingUp className="h-48 w-48 -translate-y-12 translate-x-12 text-white" />
      </div>

      <div className="relative z-10 flex flex-col gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight capitalize">
            Welcome back, {displayName} 👋
          </h2>
          <p className="text-blue-50 text-sm">
            Here is today's 3S Medicare platform overview.
          </p>
        </div>

        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center rounded-full bg-white/20 px-3 py-1.5 backdrop-blur-md">
            <span className="text-xs font-medium text-white">Sunday, June 14, 2026</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-teal-500/30 px-3 py-1.5 backdrop-blur-md border border-teal-400/20">
            <CheckCircle2 className="h-3.5 w-3.5 text-teal-100" />
            <span className="text-xs font-medium text-teal-50">System running smoothly</span>
          </div>
        </div>
      </div>
    </div>
  );
}
