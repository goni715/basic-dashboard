"use client";

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ShieldCheck, Eye, ArrowRight, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function LoginPage() {
  const router = useRouter();
  const [adminEmail, setAdminEmail] = useState("admin@gmail.com");
  const [adminPassword, setAdminPassword] = useState("123456");

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminEmail === "admin@gmail.com" && adminPassword === "123456") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", "admin");
      router.push("/");
    } else {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="w-full">
      <Card className="w-full shadow-lg border-0 bg-white/95 backdrop-blur-sm pt-6 pb-2">
        <div className="flex justify-center px-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 text-white shadow-md mx-auto">
            <ShieldCheck className="h-6 w-6" />
          </div>
        </div>

        <CardHeader className="space-y-2 items-center text-center pt-2">
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">Admin Login</CardTitle>
          <CardDescription className="text-sm text-slate-500">
            Secure access to the administration dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2 pb-6">
          <form className="space-y-5" onSubmit={handleAdminLogin}>
            <div className="space-y-2 text-left">
              <Label htmlFor="admin-email" className="text-xs font-semibold text-slate-700">Email Address</Label>
              <Input 
                id="admin-email" 
                type="email" 
                placeholder="admin@gmail.com" 
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="h-11 bg-slate-50/50 border-slate-200 focus-visible:ring-blue-500/30 transition-all rounded-lg"
                required 
              />
            </div>
            <div className="space-y-2 text-left relative">
              <Label htmlFor="admin-password" className="text-xs font-semibold text-slate-700">Password</Label>
              <div className="relative">
                <Input 
                  id="admin-password" 
                  type="password" 
                  placeholder="123456" 
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="h-11 bg-slate-50/50 border-slate-200 pr-10 focus-visible:ring-blue-500/30 transition-all rounded-lg"
                  required 
                />
                <button 
                  type="button" 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center space-x-2">
                <Checkbox id="admin-remember" className="border-slate-300 text-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 rounded-sm" />
                <Label htmlFor="admin-remember" className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-slate-600">
                  Remember me
                </Label>
              </div>
              <Link href="/forgot-password" className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                Forgot Password?
              </Link>
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 text-sm font-medium bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-md hover:shadow-lg transition-all rounded-lg gap-2"
            >
              Login
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col border-t border-slate-100 px-6 py-4">
          <div className="flex items-center justify-center text-xs text-slate-500 gap-1.5">
            <Lock className="h-3.5 w-3.5" />
            <span>Secure admin access only</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
