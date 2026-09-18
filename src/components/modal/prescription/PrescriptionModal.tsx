"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Eye } from "lucide-react"
import { DUMMY_PRESCRIPTION } from "@/data/prescription.data"

const PrescriptionModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex-1 sm:flex-none border-blue-200 text-blue-600 hover:bg-blue-50 h-11 px-6 rounded-xl font-semibold shadow-sm gap-2">
          <Eye className="h-4 w-4" />
          Preview Prescription
        </Button>
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
              <p className="font-bold text-slate-900 text-lg">{DUMMY_PRESCRIPTION.doctorName}</p>
              <p className="text-xs font-medium text-slate-500 mt-1">{DUMMY_PRESCRIPTION.doctorDetails}</p>
            </div>
            <div className="md:text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Patient</p>
              <p className="font-bold text-slate-900 text-lg">{DUMMY_PRESCRIPTION.patientName}</p>
              <p className="text-xs font-medium text-slate-500 mt-1">{DUMMY_PRESCRIPTION.patientDetails}</p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-5 mb-8 border border-slate-100">
            <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">Diagnosis</p>
            <p className="text-sm font-semibold text-slate-800">{DUMMY_PRESCRIPTION.diagnosis}</p>
          </div>

          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase mb-3">Medicines</p>
            <div className="overflow-x-auto border border-slate-100 rounded-xl">
              <Table>
                <TableHeader className="bg-slate-100/50">
                  <TableRow className="hover:bg-transparent border-slate-100">
                    <TableHead className="font-semibold text-slate-500 h-11">Medicine</TableHead>
                    <TableHead className="font-semibold text-slate-500 h-11">Dosage</TableHead>
                    <TableHead className="font-semibold text-slate-500 h-11">Frequency</TableHead>
                    <TableHead className="font-semibold text-slate-500 h-11">Duration</TableHead>
                    <TableHead className="font-semibold text-slate-500 h-11">Instructions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {DUMMY_PRESCRIPTION.medicines.map((med, index) => (
                    <TableRow key={index} className="border-slate-100 hover:bg-slate-50/50">
                      <TableCell className="font-bold text-slate-900 py-4">{med.name}</TableCell>
                      <TableCell className="font-medium text-slate-600 py-4">{med.dosage}</TableCell>
                      <TableCell className="font-medium text-slate-600 py-4">{med.frequency}</TableCell>
                      <TableCell className="font-medium text-slate-600 py-4">{med.duration}</TableCell>
                      <TableCell className="font-medium text-slate-600 py-4">{med.instructions}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex justify-end gap-3 rounded-b-2xl">
          <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-100 w-full md:w-auto px-8 h-11" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button className="w-full md:w-auto px-8 h-11 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-bold shadow-md">
            Save & Send
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PrescriptionModal;
