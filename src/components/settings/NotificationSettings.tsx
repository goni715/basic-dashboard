"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function NotificationSettings() {
  const notificationToggles = [
    { id: "push-notifications", label: "Push Notifications", defaultChecked: true },
    { id: "email-alerts", label: "Email Alerts", defaultChecked: true },
    { id: "sms-alerts", label: "SMS Alerts", defaultChecked: false },
    { id: "appointment-reminders", label: "Appointment Reminders", defaultChecked: true },
    { id: "medicine-order-updates", label: "Medicine Order Updates", defaultChecked: true },
    { id: "travel-alerts", label: "Travel Alerts", defaultChecked: true },
    { id: "support-messages", label: "Support Messages", defaultChecked: true },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-slate-900">Notification Settings</h2>
      </div>

      <div className="space-y-6">
        
        <div className="space-y-0 max-w-2xl">
          {notificationToggles.map((toggle, index) => (
            <div key={toggle.id} className={`flex items-center justify-between py-4 ${index !== notificationToggles.length - 1 ? 'border-b border-slate-50' : ''}`}>
              <Label htmlFor={toggle.id} className="text-sm font-bold text-slate-700 cursor-pointer">
                {toggle.label}
              </Label>
              <Switch id={toggle.id} defaultChecked={toggle.defaultChecked} className="data-[state=checked]:bg-blue-600" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 max-w-2xl pt-4 border-t border-slate-100">
          <div className="space-y-2">
            <Label className="text-xs font-bold text-slate-700">Reminder Time Before Appointment</Label>
            <div className="relative">
              <select className="w-full h-11 px-3 bg-white border border-slate-200 rounded-md text-sm text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors">
                <option>24 Hours Before</option>
                <option>12 Hours Before</option>
                <option>1 Hour Before</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-400">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-xs font-bold text-slate-700">Sender Email</Label>
            <Input defaultValue="noreply@3smedicare.com" className="h-11 bg-white border-slate-200" />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-bold text-slate-700">SMS Sender ID</Label>
            <Input defaultValue="3SMED" className="h-11 bg-white border-slate-200" />
          </div>
        </div>
      </div>

      <div>
        <Button className="h-11 px-8 rounded-xl bg-[#00A3C4] hover:bg-[#008ba8] text-white font-semibold shadow-sm mt-2">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
