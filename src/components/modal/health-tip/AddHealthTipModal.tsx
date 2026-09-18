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

const AddHealthTipModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button className="w-full sm:w-auto h-11 px-6 rounded-xl bg-[#00A3C4] hover:bg-[#008ba8] text-white font-semibold shadow-md gap-2" />}>
          <Plus className="h-4 w-4" />
          Add Health Tip
        </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-4xl xl:max-w-5xl p-0 overflow-hidden border-0 bg-white rounded-2xl shadow-xl flex flex-col max-h-[90vh]">
        <DialogHeader className="px-6 py-4 border-b border-slate-100 shrink-0">
          <DialogTitle className="text-lg font-bold text-slate-900">
            Add Health Tip
          </DialogTitle>
          <p className="text-sm text-slate-500">Add article content for the patient app health tips page.</p>
        </DialogHeader>
        
        <div className="p-4 md:p-6 overflow-y-auto flex-1 space-y-6 md:space-y-8">
          
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">Basic Info</h3>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Title <span className="text-rose-500">*</span></label>
                <Input placeholder="e.g. Summer Health: Stay Hydrated" className="h-11 bg-slate-50 border-slate-200" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Category</label>
                  <Input className="h-11 bg-slate-50 border-slate-200" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Language</label>
                  <Input className="h-11 bg-slate-50 border-slate-200" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Read Time</label>
                  <Input placeholder="e.g. 5 min read" className="h-11 bg-slate-50 border-slate-200" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Status</label>
                  <Input className="h-11 bg-slate-50 border-slate-200" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">Featured</label>
                  <div className="flex items-center gap-2">
                    <Switch id="featured-new" />
                    <Label htmlFor="featured-new" className="text-sm text-slate-500">Not Featured</Label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">Content</h3>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Short Summary <span className="text-rose-500">*</span></label>
                <Textarea placeholder="Brief summary for patients..." className="min-h-[80px] bg-slate-50 border-slate-200 resize-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">English Content</label>
                <Textarea placeholder="Full article content in English..." className="min-h-[120px] bg-slate-50 border-slate-200 resize-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Bengali Content</label>
                <Textarea placeholder="বাংলায় সম্পূর্ণ নিবন্ধ..." className="min-h-[120px] bg-slate-50 border-slate-200 resize-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Important Note</label>
                <Textarea placeholder="Any critical note or disclaimer..." className="min-h-[80px] bg-slate-50 border-slate-200 resize-none" />
              </div>
            </div>
          </div>

          {/* SEO / App Preview */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">SEO / App Preview</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">App Preview Title</label>
                <Input placeholder="Title shown in app cards..." className="h-11 bg-slate-50 border-slate-200" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Tags</label>
                <Input placeholder="e.g. hydration, summer, health" className="h-11 bg-slate-50 border-slate-200" />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-700">App Preview Description</label>
                <Textarea placeholder="Short description for app preview..." className="min-h-[80px] bg-slate-50 border-slate-200 resize-none" />
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

export default AddHealthTipModal;
