"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { month: "Jan", appointments: 170, medicine: 0, reports: 0, travel: 0, support: 0 },
  { month: "Feb", appointments: 210, medicine: 0, reports: 0, travel: 0, support: 0 },
  { month: "Mar", appointments: 190, medicine: 0, reports: 0, travel: 0, support: 0 },
  { month: "Apr", appointments: 240, medicine: 0, reports: 0, travel: 0, support: 0 },
  { month: "May", appointments: 275, medicine: 0, reports: 0, travel: 0, support: 0 },
  { month: "Jun", appointments: 330, medicine: 0, reports: 0, travel: 0, support: 0 },
];

const chartConfig = {
  appointments: {
    label: "Appointments",
    color: "#3b82f6", // blue-500
  },
  medicine: {
    label: "Medicine",
    color: "#14b8a6", // teal-500
  },
  reports: {
    label: "Reports",
    color: "#22c55e", // green-500
  },
  travel: {
    label: "Travel",
    color: "#a855f7", // purple-500
  },
  support: {
    label: "Support",
    color: "#f97316", // orange-500
  },
} satisfies ChartConfig;

export default function () {
  return (
    <Card className="rounded-2xl border-none shadow-sm h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold text-slate-900">Monthly Activity Overview</CardTitle>
        <CardDescription className="text-slate-500 font-medium">
          Appointments, medicine requests, reports, travel requests, and support tickets.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <BarChart accessibilityLayer data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="month" 
                tickLine={false} 
                axisLine={false} 
                tickMargin={10} 
                fontSize={12} 
                tick={{ fill: '#64748b' }}
              />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                tickMargin={10} 
                fontSize={12} 
                tick={{ fill: '#64748b' }}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
              <Legend iconType="square" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              {/* Note: The image shows only one yellow/orange bar per month, although legend has multiple. 
                  I'll implement the multiple bars but give them small/zero data if we want to match exactly, 
                  but here I'm using the orange bar for "Appointments" to match visual or just keeping "support" orange */}
              <Bar dataKey="appointments" fill="var(--color-support)" radius={2} barSize={10} />
              {/* <Bar dataKey="medicine" fill="var(--color-medicine)" radius={4} barSize={10} />
              <Bar dataKey="reports" fill="var(--color-reports)" radius={4} barSize={10} />
              <Bar dataKey="travel" fill="var(--color-travel)" radius={4} barSize={10} />
              <Bar dataKey="support" fill="var(--color-support)" radius={4} barSize={10} /> */}
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
