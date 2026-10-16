import NotificationSettings from "@/components/settings/NotificationSettings";
import SettingsHeader from "@/components/settings/SettingsHeader";

export default function NotificationSettingsPage() {
  return (
    <div className="space-y-6 max-w-full overflow-hidden p-2 md:p-4">
      <SettingsHeader
        title="Notification Settings"
        description="Configure automated alerts, push notifications, email triggers, and SMS senders."
      />
      <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
        <NotificationSettings />
      </div>
    </div>
  );
}
