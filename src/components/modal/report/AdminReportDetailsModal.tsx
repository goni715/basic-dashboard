"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, FileText, Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IAdminReport } from "@/types/admin-report.type";

interface AdminReportDetailsModalProps {
  report: IAdminReport;
}

const AdminReportDetailsModal = ({ report }: AdminReportDetailsModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-0 bg-slate-50 rounded-2xl shadow-xl">
        <DialogHeader className="px-6 py-4 border-b border-slate-100 bg-white">
          <DialogTitle className="text-lg font-bold text-slate-900">
            Report Details
          </DialogTitle>
          <p className="text-sm text-slate-500">Patient report information and verification status.</p>
        </DialogHeader>
        
        <div className="p-6 overflow-y-auto max-h-[80vh] space-y-6">
          
          <div className="bg-white rounded-xl p-4 border border-slate-100 flex justify-between items-start shadow-sm">
            <div className="flex gap-4">
              <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">{report.reportName}</h3>
                <p className="text-xs text-slate-500">{report.reportType} · {report.fileSize}</p>
                <div className="mt-2">
                  <Badge variant="outline" className={
                    report.status === 'Verified' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-none' :
                    report.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200 shadow-none' :
                    'bg-rose-50 text-rose-700 border-rose-200 shadow-none'
                  }>
                    {report.status}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-2 text-slate-400">
              <button className="p-2 hover:bg-slate-50 hover:text-slate-600 rounded-lg transition-colors">
                <Eye className="h-5 w-5" />
              </button>
              <button className="p-2 hover:bg-slate-50 hover:text-slate-600 rounded-lg transition-colors">
                <Download className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase">Patient Information</h4>
            <div className="bg-white rounded-xl border border-slate-100 p-4 space-y-3 shadow-sm">
              <div className="grid grid-cols-3">
                <span className="text-sm text-slate-500">Name</span>
                <span className="col-span-2 text-sm font-bold text-slate-900">{report.patient}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-sm text-slate-500">Date of Birth</span>
                <span className="col-span-2 text-sm font-bold text-slate-900">{report.patientInfo.dob}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-sm text-slate-500">Age</span>
                <span className="col-span-2 text-sm font-bold text-slate-900">{report.patientInfo.age}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-sm text-slate-500">Gender</span>
                <span className="col-span-2 text-sm font-bold text-slate-900">{report.patientInfo.gender}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase">Report Information</h4>
            <div className="bg-white rounded-xl border border-slate-100 p-4 space-y-3 shadow-sm">
              <div className="grid grid-cols-3">
                <span className="text-sm text-slate-500">Hospital</span>
                <span className="col-span-2 text-sm font-bold text-slate-900">{report.hospital}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-sm text-slate-500">Doctor</span>
                <span className="col-span-2 text-sm font-bold text-slate-900">{report.doctor}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-sm text-slate-500">Report Date</span>
                <span className="col-span-2 text-sm font-bold text-slate-900">{report.uploadDate}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-sm text-slate-500">Upload Date</span>
                <span className="col-span-2 text-sm font-bold text-slate-900">{report.uploadDate}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-sm text-slate-500">Report Type</span>
                <span className="col-span-2 text-sm font-bold text-slate-900">{report.reportType}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-sm text-slate-500">Status</span>
                <span className="col-span-2 text-sm font-bold text-slate-900">{report.status}</span>
              </div>
            </div>
          </div>

          {report.relatedReports.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase">Related Reports</h4>
              <div className="bg-white rounded-xl border border-slate-100 p-2 shadow-sm">
                {report.relatedReports.map((rel, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors">
                    <FileText className="h-4 w-4 text-slate-400" />
                    <span className="text-sm font-bold text-slate-700">{rel}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        <div className="px-6 py-4 bg-white border-t border-slate-100 flex items-center gap-3">
          <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 h-10 px-6 rounded-xl font-medium" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 h-10 px-4 rounded-xl font-medium gap-2">
            <Eye className="h-4 w-4" />
            View Full
          </Button>
          <Button variant="outline" className="border-rose-200 text-rose-600 hover:bg-rose-50 h-10 px-6 rounded-xl font-medium ml-auto">
            Reject
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminReportDetailsModal;
