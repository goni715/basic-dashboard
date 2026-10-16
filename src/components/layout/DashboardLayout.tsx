"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Sidebar from "./Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50/50">
            <Sidebar hideMobile />
            <div className="flex flex-col md:pl-64">
                <Header />
                <main className="flex-1 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
