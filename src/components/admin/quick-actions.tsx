import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const buttons = [
  { label: "Add Medicine", bg: "bg-blue-500 hover:bg-blue-600" },
  { label: "Add Hotel", bg: "bg-teal-500 hover:bg-teal-600" },
  { label: "Add Health Tip", bg: "bg-emerald-500 hover:bg-emerald-600" },
  { label: "Add Tutorial", bg: "bg-purple-500 hover:bg-purple-600" },
];

export default function () {
  return (
    <Card className="rounded-2xl border-none shadow-sm mt-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold text-slate-900">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4">
        {buttons.map((btn, i) => (
          <Button key={i} className={`rounded-xl text-white shadow-sm gap-2 px-5 py-5 ${btn.bg}`}>
            <PlusCircle className="h-4 w-4" />
            {btn.label}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
