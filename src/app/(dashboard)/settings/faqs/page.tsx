import FaqSettings from "@/components/settings/FaqSettings";
import SettingsHeader from "@/components/settings/SettingsHeader";

export default function FaqSettingsPage() {
  return (
    <div className="space-y-6 max-w-full overflow-hidden p-2 md:p-4">
      <SettingsHeader
        title="FAQ Management"
        description="Create, edit, and organize frequently asked questions for patients and doctors."
      />
      <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
        <FaqSettings />
      </div>
    </div>
  );
}
