import DashboardLayout from "@/components/layout/DashboardLayout";
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
