import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReportModal from "@/components/modal/report/ReportModal";

export function NoteLeftColumn() {
  return (
    <div className="xl:col-span-4 space-y-6">
      <Card className="border-0 shadow-sm rounded-2xl">
        <CardHeader className="pb-3 border-b border-slate-100">
          <CardTitle className="text-sm">Patient Information</CardTitle>
        </CardHeader>
        <CardContent className="p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100/60 pb-3">
            <span className="text-xs font-semibold text-slate-400">Name</span>
            <span className="text-sm font-bold text-slate-900">Rahul Ahmed</span>
          </div>
          <div className="flex justify-between items-center border-b border-slate-100/60 pb-3">
            <span className="text-xs font-semibold text-slate-400">Age / Gender</span>
            <span className="text-sm font-bold text-slate-900">38 years · Male</span>
          </div>
          <div className="flex justify-between items-center border-b border-slate-100/60 pb-3">
            <span className="text-xs font-semibold text-slate-400">Phone</span>
            <span className="text-sm font-bold text-slate-900">+880 1712-345678</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-slate-400">Email</span>
            <span className="text-sm font-bold text-slate-900">rahul.ahmed@email.com</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm rounded-2xl">
        <CardHeader className="pb-3 border-b border-slate-100">
          <CardTitle className="text-sm">Symptoms / Notes</CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          <div className="bg-slate-50 rounded-xl p-4 text-xs text-slate-600 leading-relaxed font-medium">
            Experiencing chest discomfort and irregular heartbeat. Previous cardiac history.
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm rounded-2xl">
        <CardHeader className="pb-3 border-b border-slate-100">
          <CardTitle className="text-sm">Uploaded Reports</CardTitle>
        </CardHeader>
        <CardContent className="p-5 space-y-3">
          {[
            "Medical Reports.pdf",
            "ECG Report.pdf",
            "Blood Test.pdf"
          ].map((name, i) => (
            <div key={i} className="flex justify-between items-center border-b border-slate-100/60 pb-3 last:border-0 last:pb-0">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-bold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">PDF</span>
                <span className="text-xs font-bold text-slate-900">{name}</span>
              </div>
              <div className="flex items-center gap-2">
                <ReportModal />
                <span className="text-[11px] font-semibold text-slate-400 cursor-not-allowed">Download</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm rounded-2xl">
        <CardHeader className="pb-3 border-b border-slate-100">
          <CardTitle className="text-sm">Previous Notes / Prescription</CardTitle>
        </CardHeader>
        <CardContent className="p-5 space-y-4">
          <div>
            <p className="text-xs font-bold text-slate-700 mb-1">Last Diagnosis:</p>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">Cardiac arrhythmia — Atorvastatin prescribed.</p>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-700 mb-1">Follow-up:</p>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">6-month cardiac screening recommended.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
