import * as React from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface AuthCardProps extends React.ComponentProps<typeof Card> {
  icon?: React.ReactNode
  title: string
  description?: string
  footer?: React.ReactNode
}

export function AuthCard({ className, icon, title, description, footer, children, ...props }: AuthCardProps) {
  return (
    <Card className={cn("w-full shadow-lg border-0 bg-white/95 backdrop-blur-sm pt-6 pb-2", className)} {...props}>
      <CardHeader className="space-y-4 items-center text-center">
        {icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 text-white shadow-md">
            {icon}
          </div>
        )}
        <div className="space-y-2">
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">{title}</CardTitle>
          {description && (
            <CardDescription className="text-sm text-slate-500">
              {description}
            </CardDescription>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-2 pb-6">
        {children}
      </CardContent>
      {footer && (
        <CardFooter className="flex flex-col border-t border-slate-100 px-6 py-4">
          {footer}
        </CardFooter>
      )}
    </Card>
  )
}
