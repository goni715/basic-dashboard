import DashboardLayout from "@/components/common/dashboard-layout";
import PrivateRoute from "@/providers/PrivateRoute";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivateRoute>
      <DashboardLayout>{children}</DashboardLayout>
    </PrivateRoute>
  );
}
