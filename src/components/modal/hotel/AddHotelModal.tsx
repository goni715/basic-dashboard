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

const AddHotelModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button className="w-full sm:w-auto h-11 px-6 rounded-xl bg-[#00A3C4] hover:bg-[#008ba8] text-white font-semibold shadow-md gap-2" />}>
          <Plus className="h-4 w-4" />
          Add Hotel
        </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-4xl xl:max-w-5xl p-0 overflow-hidden border-0 bg-white rounded-2xl shadow-xl flex flex-col max-h-[90vh]">
        <DialogHeader className="px-6 py-4 border-b border-slate-100 shrink-0">
          <DialogTitle className="text-lg font-bold text-slate-900">
            Add Hotel
          </DialogTitle>
          <p className="text-sm text-slate-500">Add hotel details for the patient app hotel list and hotel details page.</p>
        </DialogHeader>
        
        <div className="p-4 md:p-6 overflow-y-auto flex-1 space-y-6 md:space-y-8">
          
          {/* Basic Hotel Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">Basic Hotel Info</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Hotel Name <span className="text-rose-500">*</span></label>
                <Input placeholder="e.g. Pan Pacific Sonargaon" className="h-11 bg-slate-50 border-slate-200" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Country</label>
                <Input placeholder="e.g. Bangladesh" className="h-11 bg-slate-50 border-slate-200" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">City <span className="text-rose-500">*</span></label>
                <Input placeholder="e.g. Dhaka" className="h-11 bg-slate-50 border-slate-200" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Nearby Hospital</label>
                <Input placeholder="e.g. United Hospital" className="h-11 bg-slate-50 border-slate-200" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Distance from Hospital</label>
                <Input placeholder="e.g. 1.2 km" className="h-11 bg-slate-50 border-slate-200" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Price Per Night <span className="text-rose-500">*</span></label>
                <Input placeholder="e.g. ৳12,500" className="h-11 bg-slate-50 border-slate-200" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Price Type</label>
                <Input placeholder="e.g. Per Night" className="h-11 bg-slate-50 border-slate-200" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Rating</label>
                <Input placeholder="e.g. 4.8" className="h-11 bg-slate-50 border-slate-200" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Status</label>
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
                <label className="text-xs font-bold text-slate-700">Full About Hotel</label>
                <Textarea placeholder="Detailed hotel information..." className="min-h-[100px] bg-slate-50 border-slate-200 resize-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Location Note</label>
                <Textarea placeholder="Location and transportation notes..." className="min-h-[80px] bg-slate-50 border-slate-200 resize-none" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Contact Phone</label>
                  <Input placeholder="+880 1700 000000" className="h-11 bg-slate-50 border-slate-200" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Contact Email</label>
                  <Input placeholder="hotel@example.com" className="h-11 bg-slate-50 border-slate-200" />
                </div>
              </div>
            </div>
          </div>

          {/* Guest Review Preview */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">Guest Review Preview</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Review 1 - Guest Name</label>
                <Input placeholder="e.g. Ahmed Hassan" className="h-11 bg-slate-50 border-slate-200" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Review 1 - Rating</label>
                <Input placeholder="e.g. 5" className="h-11 bg-slate-50 border-slate-200" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Review 2 - Guest Name</label>
                <Input placeholder="e.g. Sarah Lee" className="h-11 bg-slate-50 border-slate-200" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Review 2 - Rating</label>
                <Input placeholder="e.g. 4" className="h-11 bg-slate-50 border-slate-200" />
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

export default AddHotelModal;
