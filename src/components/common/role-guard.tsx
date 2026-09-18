"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ({ 
  children, 
  allowedRole 
}: { 
  children: React.ReactNode;
  allowedRole: "admin" | "doctor";
}) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const role = localStorage.getItem("role");

    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    if (role !== allowedRole) {
      if (role === "doctor") {
        router.push("/doctor");
      } else if (role === "admin") {
        router.push("/");
      } else {
        router.push("/login");
      }
      return;
    }

    setIsAuthorized(true);
  }, [router, allowedRole]);

  if (!isAuthorized) {
    return null; // Prevent flash of unauthorized content
  }

  return <>{children}</>;
}
