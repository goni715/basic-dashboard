import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const actions = [
  { text: "46 medicine requests need review", color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200" },
  { text: "92 reports pending verification", color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-200" },
  { text: "12 hospitals pending review", color: "text-teal-600", bg: "bg-teal-50", border: "border-teal-200" },
  { text: "6 hotels saved as draft", color: "text-slate-600", bg: "bg-slate-50", border: "border-slate-200" },
  { text: "8 health tips waiting to publish", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
  { text: "5 tutorials missing thumbnails", color: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
];

export default function () {
  return (
    <Card className="rounded-2xl border-none shadow-sm h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold text-slate-900">Pending Actions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {actions.map((act, i) => (
          <div 
            key={i} 
            className={cn(
              "flex items-center gap-3 rounded-xl border p-3.5",
              act.bg, 
              act.border
            )}
          >
            <Clock className={cn("h-4 w-4 shrink-0", act.color)} />
            <span className={cn("text-sm font-medium", act.color)}>{act.text}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
