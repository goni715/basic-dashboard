"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Edit } from "lucide-react";

const UpdateHospitalModal = ({ hospital }: { hospital: any }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline" className="h-8 border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold rounded-lg px-2.5 shadow-sm">
            <Edit className="mr-1.5 h-3.5 w-3.5" />
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[700px] p-0 rounded-2xl gap-0 overflow-hidden" onInteractOutside={(e) => e.preventDefault()}>
          <div className="p-6 pb-4 border-b border-slate-100">
            <DialogTitle className="text-xl font-bold">Edit Hospital</DialogTitle>
            <DialogDescription className="text-slate-500 mt-1.5">
              Add patient-facing hospital information.
            </DialogDescription>
          </div>
          
          <div className="px-6 py-4 overflow-y-auto max-h-[70vh] custom-scrollbar grid gap-6">
            <div>
              <h3 className="text-sm font-bold text-slate-800 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2 md:col-span-2">
                  <Label className="text-sm font-semibold text-slate-700">
                    Hospital Name<span className="text-rose-500">*</span>
                  </Label>
                  <Input defaultValue={hospital?.name} placeholder="e.g. Bangkok International Hospital" className="border-slate-200 h-11 rounded-xl bg-slate-50/50" />
                </div>
                
                <div className="grid gap-2">
                  <Label className="text-sm font-semibold text-slate-700">
                    Country<span className="text-rose-500">*</span>
                  </Label>
                  <Input defaultValue={hospital?.country} className="border-slate-200 h-11 rounded-xl bg-slate-50/50" />
                </div>
                
                <div className="grid gap-2">
                  <Label className="text-sm font-semibold text-slate-700">
                    City<span className="text-rose-500">*</span>
                  </Label>
                  <Input defaultValue={hospital?.city} placeholder="City name" className="border-slate-200 h-11 rounded-xl bg-slate-50/50" />
                </div>

                <div className="grid gap-2">
                  <Label className="text-sm font-semibold text-slate-700">Price Level</Label>
                  <Input defaultValue={hospital?.price} className="border-slate-200 h-11 rounded-xl bg-slate-50/50" />
                </div>

                <div className="grid gap-2">
                  <Label className="text-sm font-semibold text-slate-700">Rating (0-5)</Label>
                  <Input defaultValue={hospital?.rating} placeholder="4.8" className="border-slate-200 h-11 rounded-xl bg-slate-50/50" />
                </div>

                <div className="grid gap-2">
                  <Label className="text-sm font-semibold text-slate-700">Contact Phone</Label>
                  <Input placeholder="+66 2 310 3000" className="border-slate-200 h-11 rounded-xl bg-slate-50/50" />
                </div>

                <div className="grid gap-2">
                  <Label className="text-sm font-semibold text-slate-700">Contact Email</Label>
                  <Input placeholder="info@hospital.com" className="border-slate-200 h-11 rounded-xl bg-slate-50/50" />
                </div>

                <div className="grid gap-2 md:col-span-2">
                  <Label className="text-sm font-semibold text-slate-700">Website URL</Label>
                  <Input placeholder="www.hospital.com" className="border-slate-200 h-11 rounded-xl bg-slate-50/50" />
                </div>
                
                <div className="flex items-center gap-3 md:col-span-2 mt-2">
                  <Switch id={`bengali-support-${hospital?.id}`} defaultChecked={hospital?.bengali} className="data-[state=checked]:bg-blue-600" />
                  <Label htmlFor={`bengali-support-${hospital?.id}`} className="text-sm font-semibold text-slate-700 cursor-pointer">
                    Bengali Support Available
                  </Label>
                </div>
              </div>
            </div>

            <div className="h-px bg-slate-100"></div>

            <div>
              <h3 className="text-sm font-bold text-slate-800 mb-4">Patient App Display Info</h3>
            </div>
          </div>

          <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex flex-row gap-3 sm:justify-start w-full">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="rounded-xl h-11 px-6 border-slate-200 hover:bg-white text-slate-600 font-semibold">
              Cancel
            </Button>
            <Button type="button" variant="outline" className="rounded-xl h-11 px-6 border-slate-200 hover:bg-white text-slate-600 font-semibold">
              Save Draft
            </Button>
            <Button type="submit" className="rounded-xl h-11 px-8 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-sm font-semibold">
              Save & Publish
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateHospitalModal;
