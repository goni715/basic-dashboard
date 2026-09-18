"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function GeneralSettings() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-slate-900">General Settings</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
        <div className="space-y-2">
          <Label className="text-xs font-bold text-slate-700">Platform Name</Label>
          <Input defaultValue="3S Medicare" className="h-11 bg-white border-slate-200" />
        </div>
        
        <div className="space-y-2">
          <Label className="text-xs font-bold text-slate-700">Admin Email</Label>
          <Input defaultValue="admin@3smedicare.com" className="h-11 bg-white border-slate-200" />
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-bold text-slate-700">Support Email</Label>
          <Input defaultValue="support@3smedicare.com" className="h-11 bg-white border-slate-200" />
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-bold text-slate-700">Support Phone</Label>
          <Input defaultValue="+880 1712-345678" className="h-11 bg-white border-slate-200" />
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-bold text-slate-700">Default Currency</Label>
          <div className="relative">
            <select className="w-full h-11 px-3 bg-white border border-slate-200 rounded-md text-sm text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors">
              <option>BDT (৳)</option>
              <option>USD ($)</option>
              <option>EUR (€)</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-400">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-bold text-slate-700">Default Timezone</Label>
          <div className="relative">
            <select className="w-full h-11 px-3 bg-white border border-slate-200 rounded-md text-sm text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors">
              <option>Asia/Dhaka (GMT+6)</option>
              <option>Asia/Bangkok (GMT+7)</option>
              <option>Asia/Kolkata (GMT+5:30)</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-400">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>
      </div>

      <div className="py-4 border-y border-slate-100 flex items-center justify-between">
        <div>
          <Label className="text-sm font-bold text-slate-800 block mb-1">Maintenance Mode</Label>
          <p className="text-xs text-slate-500">Enable this to prevent patient access during updates.</p>
        </div>
        <Switch id="maintenance-mode" />
      </div>

      <div>
        <Button className="h-11 px-8 rounded-xl bg-[#00A3C4] hover:bg-[#008ba8] text-white font-semibold shadow-sm">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
