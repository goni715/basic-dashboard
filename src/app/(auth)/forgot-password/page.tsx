import Link from "next/link"
import { ShieldAlert, Send, ArrowLeft } from "lucide-react"

import AuthCard from "@/components/common/auth-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      icon={<ShieldAlert className="h-6 w-6" />}
      title="Forgot Password"
      description="Enter your email and we'll send reset instructions."
    >
      <form className="space-y-6">
        <div className="space-y-2 text-left">
          <Label htmlFor="email" className="text-xs font-semibold text-slate-700">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="admin@3smedicare.com"
            className="h-11 bg-slate-50/50 border-slate-200 focus-visible:ring-teal-500/30 transition-all rounded-lg"
            required
          />
        </div>

        <div className="space-y-3">
          <Button
            type="submit"
            className="w-full h-11 text-sm font-medium bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-md hover:shadow-lg transition-all rounded-lg gap-2"
          >
            <Send className="h-4 w-4" />
            Send Reset Link
          </Button>

          <Link href="/login" className="block w-full">
            <Button
              type="button"
              variant="outline"
              className="w-full h-11 text-sm font-medium border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all rounded-lg"
            >
              Back to Login
            </Button>
          </Link>
        </div>
      </form>
    </AuthCard>
  )
}
