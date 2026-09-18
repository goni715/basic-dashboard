"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DUMMY_REPORT_DETAIL } from "@/data/report.data"

const ReportModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <button className="text-[11px] font-bold text-blue-600 hover:underline">View</button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl p-0 overflow-hidden border-0 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl">
        <DialogHeader className="px-6 py-4 border-b border-slate-100 flex flex-row items-center justify-between">
          <DialogTitle className="text-sm font-bold text-slate-900">
            Cardiac Screening Report — Full View
          </DialogTitle>
        </DialogHeader>
        
        {/* Mock PDF Content inside Dialog */}
        <div className="p-8 md:p-12 bg-slate-50 overflow-y-auto max-h-[80vh]">
          <div className="bg-white shadow-md rounded-xl p-8 md:p-12 border border-slate-100 max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-2">{DUMMY_REPORT_DETAIL.hospitalName}</p>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase">{DUMMY_REPORT_DETAIL.reportName}</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-8 border-b border-slate-100 pb-8 mb-8 bg-slate-50/50 p-6 rounded-xl">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Patient Name</p>
                <p className="font-bold text-slate-900">{DUMMY_REPORT_DETAIL.patientName}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Age</p>
                <p className="font-bold text-slate-900">{DUMMY_REPORT_DETAIL.age}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Gender</p>
                <p className="font-bold text-slate-900">{DUMMY_REPORT_DETAIL.gender}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Report Date</p>
                <p className="font-bold text-slate-900">{DUMMY_REPORT_DETAIL.reportDate}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-slate-100/60">
                <p className="text-sm text-slate-500 font-semibold">ECG</p>
                <p className="text-sm font-bold text-emerald-600">{DUMMY_REPORT_DETAIL.ecg}</p>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-100/60">
                <p className="text-sm text-slate-500 font-semibold">Blood Pressure</p>
                <p className="text-sm font-bold text-emerald-600">{DUMMY_REPORT_DETAIL.bloodPressure}</p>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-100/60">
                <p className="text-sm text-slate-500 font-semibold">Heart Rate</p>
                <p className="text-sm font-bold text-emerald-600">{DUMMY_REPORT_DETAIL.heartRate}</p>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-100/60">
                <p className="text-sm text-slate-500 font-semibold">Cholesterol</p>
                <p className="text-sm font-bold text-emerald-600">{DUMMY_REPORT_DETAIL.cholesterol}</p>
              </div>

              <div className="bg-emerald-50 rounded-xl p-5 mt-8 border border-emerald-100/50">
                <p className="text-sm text-emerald-800 font-medium leading-relaxed">
                  {DUMMY_REPORT_DETAIL.summary}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportModal;
