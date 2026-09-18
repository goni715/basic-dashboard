"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AddMedicineModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button className="w-full sm:w-auto h-11 px-6 rounded-xl bg-[#00A3C4] hover:bg-[#008ba8] text-white font-semibold shadow-md gap-2" />}>
          <Plus className="h-4 w-4" />
          Add Medicine
        </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-4xl xl:max-w-5xl p-0 overflow-hidden border-0 bg-white rounded-2xl shadow-xl flex flex-col max-h-[90vh]">
        <DialogHeader className="px-6 py-4 border-b border-slate-100 shrink-0">
          <DialogTitle className="text-lg font-bold text-slate-900">
            Add Medicine
          </DialogTitle>
          <p className="text-sm text-slate-500">Add patient-facing medicine details and pharmacy support information.</p>
        </DialogHeader>
        
        <div className="p-4 md:p-6 overflow-y-auto flex-1 space-y-6 md:space-y-8">
          
          {/* Basic Medicine Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">Basic Medicine Info</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Medicine Name <span className="text-rose-500">*</span></label>
                <Input placeholder="e.g. Atorvastatin 20mg" className="h-11 bg-slate-50 border-slate-200" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Generic Name</label>
                <Input placeholder="e.g. Atorvastatin Calcium" className="h-11 bg-slate-50 border-slate-200" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Usage / Category <span className="text-rose-500">*</span></label>
                <Input placeholder="e.g. Cholesterol Management" className="h-11 bg-slate-50 border-slate-200" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Country Availability</label>
                <Input placeholder="e.g. Thailand, India" className="h-11 bg-slate-50 border-slate-200" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Price Level</label>
                <Input placeholder="e.g. $$" className="h-11 bg-slate-50 border-slate-200" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Stock Status <span className="text-rose-500">*</span></label>
                <Input placeholder="e.g. Available" className="h-11 bg-slate-50 border-slate-200" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Manufacturer</label>
                <Input placeholder="e.g. Pfizer" className="h-11 bg-slate-50 border-slate-200" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Publish Status</label>
                <Input placeholder="e.g. Published" className="h-11 bg-slate-50 border-slate-200" />
              </div>
            </div>
          </div>

          {/* Patient App Display Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">Patient App Display Info</h3>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Short Description <span className="text-rose-500">*</span></label>
                <Textarea placeholder="Brief description for patients..." className="min-h-[80px] bg-slate-50 border-slate-200 resize-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Full Description</label>
                <Textarea placeholder="Detailed medicine information..." className="min-h-[100px] bg-slate-50 border-slate-200 resize-none" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Dosage For Adults</label>
                  <Textarea placeholder="e.g. 1 tablet daily after meals" className="min-h-[80px] bg-slate-50 border-slate-200 resize-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Duration</label>
                  <Textarea placeholder="e.g. As prescribed by doctor" className="min-h-[80px] bg-slate-50 border-slate-200 resize-none" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Possible Side Effects</label>
                <Textarea placeholder="e.g. Nausea, headache, muscle pain" className="min-h-[80px] bg-slate-50 border-slate-200 resize-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Precautions</label>
                <Textarea placeholder="e.g. Not recommended for pregnant women" className="min-h-[80px] bg-slate-50 border-slate-200 resize-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Pharmacy Support Text</label>
                <Textarea placeholder="" className="min-h-[80px] bg-slate-50 border-slate-200 resize-none" />
              </div>
            </div>
          </div>

        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
          <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-100 h-10 px-6 rounded-xl font-medium" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-100 h-10 px-6 rounded-xl font-medium">
            Save Draft
          </Button>
          <Button className="h-10 px-6 rounded-xl bg-[#00A3C4] hover:bg-[#008ba8] text-white font-semibold shadow-sm">
            Save & Publish
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddMedicineModal;
