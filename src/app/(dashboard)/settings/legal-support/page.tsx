import LegalSupportSettings from "@/components/settings/LegalSupportSettings";
import SettingsHeader from "@/components/settings/SettingsHeader";

export default function LegalSupportPage() {
  return (
    <div className="space-y-6 max-w-full overflow-hidden p-2 md:p-4">
      <SettingsHeader
        title="Legal & Support"
        description="Update your terms of service, privacy policy, and support channels."
      />
      <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
        <LegalSupportSettings />
      </div>
    </div>
  );
}
