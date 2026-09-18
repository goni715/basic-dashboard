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
import { IAdminHealthTip } from "@/types/admin-health-tip.type";

interface EditHealthTipModalProps {
  tip: IAdminHealthTip;
}

const EditHealthTipModal = ({ tip }: EditHealthTipModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button size="icon" variant="ghost" className="h-8 w-8 text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg" />}>
          <Edit className="h-4 w-4" />
        </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-4xl xl:max-w-5xl p-0 overflow-hidden border-0 bg-white rounded-2xl shadow-xl flex flex-col max-h-[90vh]">
        <DialogHeader className="px-6 py-4 border-b border-slate-100 shrink-0">
          <DialogTitle className="text-lg font-bold text-slate-900">
            Edit Health Tip
          </DialogTitle>
          <p className="text-sm text-slate-500">Edit article content for the patient app health tips page.</p>
        </DialogHeader>
        
        <div className="p-4 md:p-6 overflow-y-auto flex-1 space-y-6 md:space-y-8">
          
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">Basic Info</h3>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Title <span className="text-rose-500">*</span></label>
                <Input defaultValue={tip.title} className="h-11 bg-slate-50 border-slate-200" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Category</label>
                  <Input defaultValue={tip.category} className="h-11 bg-slate-50 border-slate-200" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Language</label>
                  <Input defaultValue={tip.language} className="h-11 bg-slate-50 border-slate-200" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Read Time</label>
                  <Input defaultValue={tip.readTime} className="h-11 bg-slate-50 border-slate-200" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Status</label>
                  <Input defaultValue={tip.status} className="h-11 bg-slate-50 border-slate-200" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">Featured</label>
                  <div className="flex items-center gap-2">
                    <Switch id={`featured-${tip.id}`} defaultChecked={tip.featured} />
                    <Label htmlFor={`featured-${tip.id}`} className="text-sm text-slate-500">
                      {tip.featured ? "Featured" : "Not Featured"}
                    </Label>
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
                <Textarea className="min-h-[80px] bg-slate-50 border-slate-200 resize-none" defaultValue={`Learn about ${tip.title}...`} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">English Content</label>
                <Textarea className="min-h-[120px] bg-slate-50 border-slate-200 resize-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Bengali Content</label>
                <Textarea className="min-h-[120px] bg-slate-50 border-slate-200 resize-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Important Note</label>
                <Textarea className="min-h-[80px] bg-slate-50 border-slate-200 resize-none" />
              </div>
            </div>
          </div>

          {/* SEO / App Preview */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">SEO / App Preview</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">App Preview Title</label>
                <Input defaultValue={tip.title} className="h-11 bg-slate-50 border-slate-200" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Tags</label>
                <Input defaultValue={tip.category} className="h-11 bg-slate-50 border-slate-200" />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-700">App Preview Description</label>
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

export default EditHealthTipModal;
