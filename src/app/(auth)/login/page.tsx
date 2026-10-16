"use client";

import { ShieldCheck, Lock } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="w-full">
      <Card className="w-full shadow-lg border-0 bg-white/95 backdrop-blur-sm pt-6 pb-2">
        <div className="flex justify-center px-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 text-white shadow-md mx-auto">
            <ShieldCheck className="h-6 w-6" />
          </div>
        </div>

        <CardHeader className="space-y-2 items-center text-center pt-2">
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
            Admin Login
          </CardTitle>
          <CardDescription className="text-sm text-slate-500">
            Secure access to the administration dashboard.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-2 pb-6">
          <LoginForm />
        </CardContent>

        <CardFooter className="flex flex-col border-t border-slate-100 px-6 py-4">
          <div className="flex items-center justify-center text-xs text-slate-500 gap-1.5">
            <Lock className="h-3.5 w-3.5" />
            <span>Secure admin access only</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
