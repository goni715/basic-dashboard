"use client"

import * as React from "react"
import Link from "next/link"
import { ShieldCheck, ArrowRight } from "lucide-react"

import { AuthCard } from "@/components/common/auth-card"
import { Button } from "@/components/ui/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export default function VerifyOtpPage() {
  const [value, setValue] = React.useState("")

  return (
    <AuthCard
      icon={<ShieldCheck className="h-6 w-6" />}
      title="Verify Email"
      description="Enter the 6-digit code sent to your email address."
    >
      <form className="space-y-6">
        <div className="flex justify-center py-2">
          <InputOTP
            maxLength={6}
            value={value}
            onChange={(value) => setValue(value)}
            containerClassName="gap-2"
          >
            <InputOTPGroup className="gap-2">
              <InputOTPSlot index={0} className="w-12 h-14 text-lg font-bold rounded-md border-slate-200 focus-visible:ring-teal-500/30" />
              <InputOTPSlot index={1} className="w-12 h-14 text-lg font-bold rounded-md border-slate-200 focus-visible:ring-teal-500/30" />
              <InputOTPSlot index={2} className="w-12 h-14 text-lg font-bold rounded-md border-slate-200 focus-visible:ring-teal-500/30" />
              <InputOTPSlot index={3} className="w-12 h-14 text-lg font-bold rounded-md border-slate-200 focus-visible:ring-teal-500/30" />
              <InputOTPSlot index={4} className="w-12 h-14 text-lg font-bold rounded-md border-slate-200 focus-visible:ring-teal-500/30" />
              <InputOTPSlot index={5} className="w-12 h-14 text-lg font-bold rounded-md border-slate-200 focus-visible:ring-teal-500/30" />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <div className="space-y-3">
          <Button
            type="submit"
            className="w-full h-11 text-sm font-medium bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-md hover:shadow-lg transition-all rounded-lg gap-2"
          >
            Verify Code
            <ArrowRight className="h-4 w-4" />
          </Button>

          <div className="text-center text-xs text-slate-500">
            Didn't receive the code?{" "}
            <button type="button" className="font-semibold text-teal-600 hover:text-teal-700 hover:underline">
              Resend Code
            </button>
          </div>
        </div>
      </form>
    </AuthCard>
  )
}
