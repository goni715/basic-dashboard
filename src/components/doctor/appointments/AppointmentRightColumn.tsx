import { Video, User, ClipboardList } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function () {
  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm rounded-2xl">
        <CardContent className="p-6 text-center space-y-4">
          <Avatar className="h-20 w-20 mx-auto">
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-teal-500 text-white text-2xl font-bold">
              RA
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Rahul Ahmed</h3>
            <p className="text-xs font-medium text-slate-500 mt-1">38 years · Male · Bangladesh</p>
            <div className="mt-3 inline-flex">
              <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200">Active Patient</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm rounded-2xl bg-blue-50/50 border-blue-100">
        <CardContent className="p-5">
          <p className="text-[10px] uppercase font-bold text-blue-600 mb-1">Next Action</p>
          <p className="font-bold text-slate-900 text-sm">Ready to start video consultation</p>
          <p className="text-xs font-medium text-slate-500 mt-1">Apr 14, 2026 at 10:00 AM</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm rounded-2xl">
        <CardHeader className="pb-3 border-b border-slate-100">
          <CardTitle className="text-base">Consultation Checklist</CardTitle>
        </CardHeader>
        <CardContent className="p-5 space-y-4">
          <div className="space-y-3">
            {[
              { label: "Review symptoms", checked: true },
              { label: "Check reports", checked: true },
              { label: "Join call", checked: false },
              { label: "Write notes", checked: false },
              { label: "Add prescription", checked: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-3">
                <Checkbox id={`check-${i}`} checked={item.checked} className={item.checked ? "data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500" : ""} />
                <Label htmlFor={`check-${i}`} className={`text-sm font-semibold cursor-pointer ${item.checked ? 'text-teal-600' : 'text-slate-500'}`}>
                  {item.label}
                </Label>
              </div>
            ))}
          </div>

          <div className="pt-4 space-y-3">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-sm">
              <Video className="mr-2 h-4 w-4" />
              Join Video Call
            </Button>
            <Button variant="outline" className="w-full border-slate-200 text-slate-700 hover:bg-slate-50">
              <User className="mr-2 h-4 w-4" />
              View Patient
            </Button>
            <Button variant="outline" className="w-full border-teal-200 text-teal-600 hover:bg-teal-50">
              <ClipboardList className="mr-2 h-4 w-4" />
              Write Notes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
