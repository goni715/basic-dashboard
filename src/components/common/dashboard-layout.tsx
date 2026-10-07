"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/admin/sidebar";
import Header from "@/components/admin/header";

export default function ({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
      setIsAuthenticated(true);
    } else {
      router.push("/login");
    }
  }, [router]);

  // Prevent flash of content before checking auth
  if (!isMounted) {
    return null; // Or a loading spinner
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

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
