"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function PrescriptionDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-0 bg-white rounded-2xl shadow-xl">
        <DialogHeader className="px-6 py-4 border-b border-slate-100">
          <DialogTitle className="text-sm font-bold text-slate-900">
            Prescription Preview
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-8 max-h-[80vh] overflow-y-auto">
          <div className="text-center mb-8">
            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-2">3S Medicare · Doctor Portal</p>
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Medical Prescription</h2>
            <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-teal-500 mx-auto mt-3 rounded-full" />
          </div>

          <div className="flex flex-col md:flex-row gap-8 justify-between border-b border-slate-100 pb-8 mb-6">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Doctor</p>
              <p className="font-bold text-slate-900 text-lg">Dr. Arjun Mehta</p>
              <p className="text-xs font-medium text-slate-500 mt-1">Cardiology · Bangkok Heart Hospital</p>
            </div>
            <div className="md:text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Patient</p>
              <p className="font-bold text-slate-900 text-lg">Rahul Ahmed</p>
              <p className="text-xs font-medium text-slate-500 mt-1">38 years · Male · Apr 14, 2026</p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-5 mb-8 border border-slate-100">
            <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">Diagnosis</p>
            <p className="text-sm font-semibold text-slate-800">Cardiac arrhythmia — Atorvastatin prescribed.</p>
          </div>

          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase mb-3">Medicines</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-100/50 text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-semibold rounded-l-lg">Medicine</th>
                    <th className="px-4 py-3 font-semibold">Dosage</th>
                    <th className="px-4 py-3 font-semibold">Frequency</th>
                    <th className="px-4 py-3 font-semibold">Duration</th>
                    <th className="px-4 py-3 font-semibold rounded-r-lg">Instructions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/50">
                    <td className="px-4 py-4 font-bold text-slate-900">Atorvastatin 20mg</td>
                    <td className="px-4 py-4 font-medium text-slate-600">1 tablet</td>
                    <td className="px-4 py-4 font-medium text-slate-600">Twice daily</td>
                    <td className="px-4 py-4 font-medium text-slate-600">30 days</td>
                    <td className="px-4 py-4 font-medium text-slate-600">Take after dinner</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex justify-end gap-3 rounded-b-2xl">
           {/* In a real app we'd use DialogClose, but standard button is fine for demo */}
          <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-100 w-full md:w-auto px-8 h-11">
            Close
          </Button>
          <Button className="w-full md:w-auto px-8 h-11 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-bold shadow-md">
            Save & Send
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
