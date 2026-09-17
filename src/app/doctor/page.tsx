import * as React from "react"
import Link from "next/link"
import { Calendar, Clock, Users, FileText, FileSignature, FileHeart, ChevronRight, Video, Hospital, Eye } from "lucide-react"

import { WelcomeBanner } from "@/components/dashboard/welcome-banner"
import { StatCard } from "@/components/dashboard/stat-card"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const stats = [
  { title: "Today's Appointments", value: 6, description: "3 video, 3 hospital visits", icon: Calendar, color: "text-blue-600 bg-blue-50" },
  { title: "Upcoming Appointments", value: 18, description: "Next 7 days", icon: Clock, color: "text-teal-600 bg-teal-50" },
  { title: "Assigned Patients", value: 42, description: "Admin assigned", icon: Users, color: "text-emerald-600 bg-emerald-50" },
  { title: "Pending Notes", value: 4, description: "Need completion", icon: FileSignature, color: "text-amber-600 bg-amber-50" },
  { title: "Pending Prescriptions", value: 3, description: "After consultation", icon: FileHeart, color: "text-purple-600 bg-purple-50" },
  { title: "Reports to Review", value: 9, description: "Uploaded by patients", icon: FileText, color: "text-rose-600 bg-rose-50" },
]

const todaysAppointments = [
  { id: "1", time: "10:00 AM", patient: "Rahul Ahmed", type: "Video Consultation", symptoms: "Chest discomfort", status: "Upcoming" },
  { id: "2", time: "11:30 AM", patient: "Fatima Khatun", type: "Hospital Visit", symptoms: "Fertility consultation", status: "Confirmed" },
  { id: "3", time: "2:00 PM", patient: "Arif Rahman", type: "Video Consultation", symptoms: "Irregular heartbeat", status: "Upcoming" },
]

export default function DoctorDashboard() {
  return (
    <div className="space-y-6">
      <WelcomeBanner 
        doctorName="Dr. Arjun Mehta"
        specialty="Cardiology"
        hospital="Bangkok Heart Hospital"
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, i) => (
          <StatCard 
            key={i}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
            iconClassName={stat.color}
          />
        ))}
      </div>

      <Card className="border-0 shadow-sm rounded-2xl overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between py-5 px-6 border-b border-slate-100">
          <div>
            <CardTitle className="text-lg font-bold">Today's Appointments</CardTitle>
            <p className="text-sm text-slate-500 font-medium">Scheduled for today</p>
          </div>
          <Button variant="ghost" className="text-blue-600 font-semibold text-sm hover:bg-blue-50" asChild>
            <Link href="/doctor/appointments">
              View all
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-slate-100 hover:bg-transparent">
                <TableHead className="font-semibold text-slate-500 px-6 py-3">TIME</TableHead>
                <TableHead className="font-semibold text-slate-500">PATIENT</TableHead>
                <TableHead className="font-semibold text-slate-500">TYPE</TableHead>
                <TableHead className="font-semibold text-slate-500">SYMPTOMS</TableHead>
                <TableHead className="font-semibold text-slate-500">STATUS</TableHead>
                <TableHead className="font-semibold text-slate-500 text-right px-6">ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {todaysAppointments.map((apt) => (
                <TableRow key={apt.id} className="border-slate-100 hover:bg-slate-50/50">
                  <TableCell className="font-bold text-slate-900 px-6 py-4">{apt.time}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-blue-100 text-blue-700 text-xs font-bold">
                          {apt.patient.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-bold text-slate-900">{apt.patient}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                      {apt.type.includes('Video') ? <Video className="h-4 w-4 text-blue-500" /> : <Hospital className="h-4 w-4 text-emerald-500" />}
                      {apt.type}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-slate-600 font-medium max-w-[200px] truncate">
                    {apt.symptoms}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      apt.status === 'Upcoming' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }>
                      {apt.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" className="border-slate-200 text-blue-600 font-semibold hover:bg-blue-50" asChild>
                        <Link href={`/doctor/appointments/${apt.id}`}>
                          <Eye className="mr-1.5 h-3.5 w-3.5" />
                          View
                        </Link>
                      </Button>
                      {apt.type.includes('Video') && (
                        <Button size="sm" className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-semibold shadow-sm">
                          <Video className="mr-1.5 h-3.5 w-3.5" />
                          Join Call
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Spacer for bottom */}
      <div className="h-4"></div>
    </div>
  )
}
