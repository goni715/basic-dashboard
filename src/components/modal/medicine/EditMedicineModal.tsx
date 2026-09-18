"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IAdminMedicine } from "@/types/admin-medicine.type";

interface EditMedicineModalProps {
  medicine: IAdminMedicine;
}

const EditMedicineModal = ({ medicine }: EditMedicineModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button size="icon" variant="ghost" className="h-8 w-8 text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg" />}>
          <Edit className="h-4 w-4" />
        </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-4xl xl:max-w-5xl p-0 overflow-hidden border-0 bg-white rounded-2xl shadow-xl flex flex-col max-h-[90vh]">
        <DialogHeader className="px-6 py-4 border-b border-slate-100 shrink-0">
          <DialogTitle className="text-lg font-bold text-slate-900">
            Edit Medicine
          </DialogTitle>
          <p className="text-sm text-slate-500">Update patient-facing medicine details and pharmacy support information.</p>
        </DialogHeader>
        
        <div className="p-4 md:p-6 overflow-y-auto flex-1 space-y-6 md:space-y-8">
          
          {/* Basic Medicine Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">Basic Medicine Info</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Medicine Name <span className="text-rose-500">*</span></label>
                <Input defaultValue={medicine.name} className="h-11 bg-slate-50 border-slate-200" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Generic Name</label>
                <Input defaultValue={medicine.genericName} className="h-11 bg-slate-50 border-slate-200" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Usage / Category <span className="text-rose-500">*</span></label>
                <Input defaultValue={medicine.usage} className="h-11 bg-slate-50 border-slate-200" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Country Availability</label>
                <Input defaultValue={medicine.country} className="h-11 bg-slate-50 border-slate-200" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Price Level</label>
                <Input defaultValue={medicine.price} className="h-11 bg-slate-50 border-slate-200" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Stock Status <span className="text-rose-500">*</span></label>
                <Input defaultValue={medicine.stock} className="h-11 bg-slate-50 border-slate-200" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Manufacturer</label>
                <Input className="h-11 bg-slate-50 border-slate-200" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Publish Status</label>
                <Input defaultValue={medicine.status} className="h-11 bg-slate-50 border-slate-200" />
              </div>
            </div>
          </div>

          {/* Patient App Display Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">Patient App Display Info</h3>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Short Description <span className="text-rose-500">*</span></label>
                <Textarea className="min-h-[80px] bg-slate-50 border-slate-200 resize-none" defaultValue={`${medicine.name} is used for ${medicine.purpose}.`} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Full Description</label>
                <Textarea className="min-h-[100px] bg-slate-50 border-slate-200 resize-none" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Dosage For Adults</label>
                  <Textarea className="min-h-[80px] bg-slate-50 border-slate-200 resize-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Duration</label>
                  <Textarea className="min-h-[80px] bg-slate-50 border-slate-200 resize-none" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Possible Side Effects</label>
                <Textarea className="min-h-[80px] bg-slate-50 border-slate-200 resize-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Precautions</label>
                <Textarea className="min-h-[80px] bg-slate-50 border-slate-200 resize-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Pharmacy Support Text</label>
                <Textarea className="min-h-[80px] bg-slate-50 border-slate-200 resize-none" />
              </div>
            </div>
          </div>

        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
          <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-100 h-10 px-6 rounded-xl font-medium" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button className="h-10 px-6 rounded-xl bg-[#00A3C4] hover:bg-[#008ba8] text-white font-semibold shadow-sm">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditMedicineModal;
