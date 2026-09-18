"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function LegalSupportSettings() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-slate-900">Legal & Support</h2>
      </div>

      <div className="space-y-6">
        
        <div className="space-y-2 max-w-2xl">
          <Label className="text-xs font-bold text-slate-700">Help Center URL</Label>
          <Input defaultValue="https://help.3smedicare.com" className="h-11 bg-white border-slate-200" />
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-bold text-slate-700">Terms & Conditions</Label>
          <Textarea className="min-h-[120px] bg-white border-slate-200 resize-y" />
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-bold text-slate-700">Privacy Policy</Label>
          <Textarea className="min-h-[120px] bg-white border-slate-200 resize-y" />
        </div>

        <div className="pt-4 border-t border-slate-100 max-w-2xl">
          <Label className="text-sm font-bold text-slate-800 mb-4 block">Support Hours</Label>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500 font-medium">Live Chat</span>
              <span className="font-bold text-emerald-600">24/7 Available</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500 font-medium">Phone Support</span>
              <span className="font-semibold text-slate-700">9 AM - 9 PM</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500 font-medium">Email Support</span>
              <span className="font-semibold text-slate-700">Within 24 hours</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Button className="h-11 px-8 rounded-xl bg-[#00A3C4] hover:bg-[#008ba8] text-white font-semibold shadow-sm mt-4">
          Save Legal & Support Settings
        </Button>
      </div>
    </div>
  );
}
