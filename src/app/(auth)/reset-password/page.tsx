import { KeySquare, CheckCircle, ArrowRight } from "lucide-react"

import { AuthCard } from "@/components/auth-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ResetPasswordPage() {
  return (
    <AuthCard
      icon={<KeySquare className="h-6 w-6" />}
      title="Reset Password"
      description="Enter your new password below to reset your account."
    >
      <form className="space-y-5">
        <div className="space-y-2 text-left">
          <Label htmlFor="password" className="text-xs font-semibold text-slate-700">New Password</Label>
          <Input 
            id="password" 
            type="password" 
            placeholder="Min. 8 characters" 
            className="h-11 bg-slate-50/50 border-slate-200 focus-visible:ring-teal-500/30 transition-all rounded-lg"
            required 
            minLength={8}
          />
        </div>
        <div className="space-y-2 text-left">
          <Label htmlFor="confirmPassword" className="text-xs font-semibold text-slate-700">Confirm Password</Label>
          <Input 
            id="confirmPassword" 
            type="password" 
            placeholder="Confirm new password" 
            className="h-11 bg-slate-50/50 border-slate-200 focus-visible:ring-teal-500/30 transition-all rounded-lg"
            required 
            minLength={8}
          />
        </div>

        <Button 
          type="submit" 
          className="w-full h-11 text-sm font-medium mt-2 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-md hover:shadow-lg transition-all rounded-lg gap-2"
        >
          <CheckCircle className="h-4 w-4" />
          Reset Password
        </Button>
      </form>
    </AuthCard>
  )
}
