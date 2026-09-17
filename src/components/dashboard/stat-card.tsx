import * as React from "react"
import { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  description: string
  icon: LucideIcon
  iconClassName?: string
}

export function StatCard({ title, value, description, icon: Icon, iconClassName }: StatCardProps) {
  return (
    <Card className="border-0 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50", iconClassName)}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{value}</div>
            <div className="text-sm font-semibold text-slate-700">{title}</div>
            <div className="text-xs font-medium text-slate-500 mt-0.5">{description}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
