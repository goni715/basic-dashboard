import GeneralSettings from "@/components/settings/GeneralSettings";
import SettingsHeader from "@/components/settings/SettingsHeader";

export default function GeneralSettingsPage() {
  return (
    <div className="space-y-6 max-w-full overflow-hidden p-2 md:p-4">
      <SettingsHeader
        title="General Settings"
        description="Configure your platform name, admin details, default currency, and timezone."
      />
      <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
        <GeneralSettings />
      </div>
    </div>
  );
}
