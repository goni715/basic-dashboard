"use client";

import { useState } from "react";
import { Settings, Globe, Bell, Shield, BookOpen, HelpCircle } from "lucide-react";

import GeneralSettings from "@/components/settings/GeneralSettings";
import CountriesLanguagesSettings from "@/components/settings/CountriesLanguagesSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";
import LegalSupportSettings from "@/components/settings/LegalSupportSettings";
import FaqSettings from "@/components/settings/FaqSettings";

type TabId = "general" | "countries" | "notifications" | "security" | "legal" | "faq";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("general");

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "countries", label: "Countries & Languages", icon: Globe },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "legal", label: "Legal & Support", icon: BookOpen },
    { id: "faq", label: "FAQs", icon: HelpCircle },
  ] as const;

  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return <GeneralSettings />;
      case "countries":
        return <CountriesLanguagesSettings />;
      case "notifications":
        return <NotificationSettings />;
      case "security":
        return <SecuritySettings />;
      case "legal":
        return <LegalSupportSettings />;
      case "faq":
        return <FaqSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 max-w-full overflow-hidden p-2 md:p-4 min-h-[calc(100vh-100px)]">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 text-sm">Manage platform preferences, security, notifications, payment methods, and legal information.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
        {/* Sidebar Navigation */}
        <div className="w-full lg:w-64 shrink-0 bg-white rounded-2xl shadow-sm border border-slate-100 p-2 lg:p-3 flex flex-row lg:flex-col gap-1 overflow-x-auto custom-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all whitespace-nowrap text-left ${
                  isActive 
                    ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-md shadow-blue-500/20" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="leading-tight">{tab.label.split(' & ').join(' &\n')}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
