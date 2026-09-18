import * as React from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { RoleGuard } from "@/components/common/role-guard"

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RoleGuard allowedRole="doctor">
      <div className="flex min-h-screen w-full bg-slate-50/50">
        {/* Desktop Sidebar */}
        <Sidebar />
        
        {/* Main Content Area */}
        <div className="flex flex-1 flex-col lg:pl-64">
          <Header />
          
          <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
            {children}
          </main>
        </div>
      </div>
    </RoleGuard>
  )
}
