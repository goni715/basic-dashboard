"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AddFaqModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button className="w-full sm:w-auto h-11 px-6 rounded-xl bg-[#00A3C4] hover:bg-[#008ba8] text-white font-semibold shadow-md gap-2" />}>
          <Plus className="h-4 w-4" />
          Add FAQ
        </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-2xl p-0 overflow-hidden border-0 bg-white rounded-2xl shadow-xl flex flex-col max-h-[90vh]">
        <DialogHeader className="px-6 py-4 border-b border-slate-100 shrink-0">
          <DialogTitle className="text-lg font-bold text-slate-900">
            Add New FAQ
          </DialogTitle>
          <p className="text-sm text-slate-500">Create a new frequently asked question for the patient app.</p>
        </DialogHeader>
        
        <div className="p-4 md:p-6 overflow-y-auto flex-1 space-y-6">
          <div className="space-y-4">
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Question <span className="text-rose-500">*</span></label>
              <Input placeholder="e.g. How do I book an appointment?" className="h-11 bg-slate-50 border-slate-200" />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Answer <span className="text-rose-500">*</span></label>
              <Textarea placeholder="Provide a detailed answer..." className="min-h-[120px] bg-slate-50 border-slate-200 resize-none" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Category</label>
                <div className="relative">
                  <select className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors">
                    <option>General</option>
                    <option>Appointments</option>
                    <option>Payments</option>
                    <option>Consultations</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-400">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">Status</label>
                <div className="flex items-center gap-2 pt-2">
                  <Switch id="faq-status-new" defaultChecked={true} className="data-[state=checked]:bg-emerald-500" />
                  <Label htmlFor="faq-status-new" className="text-sm font-semibold text-slate-700">Published</Label>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
          <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-100 h-10 px-6 rounded-xl font-medium" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button className="h-10 px-6 rounded-xl bg-[#00A3C4] hover:bg-[#008ba8] text-white font-semibold shadow-sm">
            Save FAQ
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddFaqModal;
