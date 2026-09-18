"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IAdminTutorial } from "@/types/admin-tutorial.type";

interface EditTutorialModalProps {
  tutorial: IAdminTutorial;
}

const EditTutorialModal = ({ tutorial }: EditTutorialModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button size="icon" variant="ghost" className="h-8 w-8 text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg" />}>
          <Edit className="h-4 w-4" />
        </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-4xl xl:max-w-5xl p-0 overflow-hidden border-0 bg-white rounded-2xl shadow-xl flex flex-col max-h-[90vh]">
        <DialogHeader className="px-6 py-4 border-b border-slate-100 shrink-0">
          <DialogTitle className="text-lg font-bold text-slate-900">
            Edit Tutorial
          </DialogTitle>
          <p className="text-sm text-slate-500">Update tutorial video and step-by-step-guide for the patient app.</p>
        </DialogHeader>
        
        <div className="p-4 md:p-6 overflow-y-auto flex-1 space-y-6 md:space-y-8">
          
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">Basic Tutorial Info</h3>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Tutorial Title <span className="text-rose-500">*</span></label>
                <Input defaultValue={tutorial.title} className="h-11 bg-slate-50 border-slate-200" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Category</label>
                  <Input defaultValue={tutorial.category} className="h-11 bg-slate-50 border-slate-200" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Duration <span className="text-rose-500">*</span></label>
                  <Input defaultValue={tutorial.duration} className="h-11 bg-slate-50 border-slate-200" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Video URL</label>
                  <Input defaultValue="https://youtube.com/watch?v=..." className="h-11 bg-slate-50 border-slate-200" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Views Count</label>
                  <Input defaultValue={tutorial.views} className="h-11 bg-slate-50 border-slate-200" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Status</label>
                  <Input defaultValue={tutorial.status} className="h-11 bg-slate-50 border-slate-200" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">Featured</label>
                  <div className="flex items-center gap-2">
                    <Switch id={`tut-featured-${tutorial.id}`} defaultChecked={tutorial.featured} />
                    <Label htmlFor={`tut-featured-${tutorial.id}`} className="text-sm text-slate-500">
                      {tutorial.featured ? "Featured" : "Not Featured"}
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">Tutorial Detail Content</h3>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Short Description <span className="text-rose-500">*</span></label>
                <Textarea defaultValue={`Learn about ${tutorial.title}`} className="min-h-[80px] bg-slate-50 border-slate-200 resize-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Full Description</label>
                <Textarea className="min-h-[120px] bg-slate-50 border-slate-200 resize-none" />
              </div>
            </div>
          </div>

          {/* Step-by-Step */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">Step-by-Step Guide</h3>
            
            <div className="space-y-3">
              {[
                { step: 1, title: "Research and Select Hospital", desc: "Search and compare hospitals based on your condition and budget." },
                { step: 2, title: "Check Doctor Availability", desc: "View available doctors and their schedules." },
                { step: 3, title: "Prepare Medical Documents", desc: "Gather your existing reports, prescriptions, and identification." },
              ].map((item) => (
                <div key={item.step} className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-slate-100 p-4 rounded-xl bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-[#00A3C4] text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {item.step}
                    </div>
                    <Input defaultValue={item.title} className="bg-white border-slate-200" />
                  </div>
                  <Input defaultValue={item.desc} className="bg-white border-slate-200" />
                </div>
              ))}
            </div>
          </div>

          {/* Related Content */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">Related Content</h3>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Tags</label>
              <Input defaultValue={tutorial.category} className="h-11 bg-slate-50 border-slate-200" />
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

export default EditTutorialModal;
