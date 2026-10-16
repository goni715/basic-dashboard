import CountriesLanguagesSettings from "@/components/settings/CountriesLanguagesSettings";
import SettingsHeader from "@/components/settings/SettingsHeader";

export default function CountriesLanguagesPage() {
  return (
    <div className="space-y-6 max-w-full overflow-hidden p-2 md:p-4">
      <SettingsHeader
        title="Countries & Languages"
        description="Manage active operational countries, supported languages, and regional defaults."
      />
      <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
        <CountriesLanguagesSettings />
      </div>
    </div>
  );
}
