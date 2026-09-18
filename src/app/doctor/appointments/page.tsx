import * as React from "react"
import Link from "next/link"
import { Search, Filter, Video, Hospital, Eye, FileText, CalendarDays } from "lucide-react"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DUMMY_APPOINTMENT_STATS as stats, DUMMY_APPOINTMENTS as appointments } from "@/data/appointment.data"
export default function AppointmentsPage() {
  return (
    <div className="space-y-6">

      {/* Stat Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="border-0 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
              <div className="text-sm font-semibold text-slate-500">{stat.title}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-0 shadow-sm rounded-2xl overflow-hidden">

        {/* Toolbar */}
        <div className="p-6 pb-2">
          <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Search patient or booking ID..." className="pl-9 h-11 bg-slate-50/50 border-slate-200 rounded-xl w-full max-w-md" />
            </div>
            <div className="flex w-full md:w-auto items-center gap-3">
              <Button variant="outline" className="h-11 border-slate-200 rounded-xl text-slate-600 w-11 px-0 shrink-0">
                <Filter className="h-4 w-4" />
              </Button>
              <Input placeholder="Date range" className="h-11 bg-slate-50/50 border-slate-200 rounded-xl md:w-[200px]" disabled />
              <Button className="h-11 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white rounded-xl shadow-sm px-6 whitespace-nowrap">
                Today
              </Button>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-bold text-slate-900">Appointment List</h2>
            <p className="text-sm font-medium text-slate-500">Only appointments assigned to this doctor are shown.</p>
          </div>
        </div>

        {/* Table */}
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="border-slate-100 hover:bg-transparent">
                  <TableHead className="font-semibold text-slate-500 px-6 py-3 min-w-[160px]">BOOKING ID</TableHead>
                  <TableHead className="font-semibold text-slate-500 min-w-[200px]">PATIENT</TableHead>
                  <TableHead className="font-semibold text-slate-500 min-w-[180px]">DATE & TIME</TableHead>
                  <TableHead className="font-semibold text-slate-500">DURATION</TableHead>
                  <TableHead className="font-semibold text-slate-500 min-w-[150px]">TYPE</TableHead>
                  <TableHead className="font-semibold text-slate-500 min-w-[200px]">SYMPTOMS/REPORTS</TableHead>
                  <TableHead className="font-semibold text-slate-500">STATUS</TableHead>
                  <TableHead className="font-semibold text-slate-500 text-right px-6 min-w-[180px]">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((apt) => (
                  <TableRow key={apt.id} className="border-slate-100 hover:bg-slate-50/50">
                    <TableCell className="font-bold text-blue-600 px-6 py-4">{apt.id}</TableCell>
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
                    <TableCell className="font-medium text-slate-600">{apt.date}</TableCell>
                    <TableCell className="font-medium text-slate-600">{apt.duration}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-600 whitespace-nowrap">
                        {apt.type.includes('Video') ? <Video className="h-4 w-4 text-blue-500" /> : <Hospital className="h-4 w-4 text-emerald-500" />}
                        {apt.type}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1.5 max-w-[200px]">
                        <span className="text-xs font-medium text-slate-600 truncate">{apt.symptoms}</span>
                        {apt.reports > 0 && (
                          <div className="flex items-center gap-1.5">
                            <Badge variant="secondary" className="bg-blue-50 text-blue-600 hover:bg-blue-100 font-semibold text-[10px] px-1.5 py-0">
                              <FileText className="mr-1 h-3 w-3" />
                              {apt.reports} {apt.reports > 1 ? 'files' : 'file'}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        apt.status === 'Upcoming' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                          apt.status === 'Completed' ? 'bg-slate-100 text-slate-700 border-slate-300' :
                            'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }>
                        {apt.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right px-6">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" className="border-slate-200 text-blue-600 font-semibold hover:bg-blue-50 h-8">
                          <Link href={`/doctor/appointments/${apt.id}`}>
                            <Eye className="mr-1.5 h-3.5 w-3.5" />
                            View
                          </Link>
                        </Button>
                        {apt.status !== 'Completed' ? (
                          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-semibold shadow-sm h-8 px-4">
                            <Video className="mr-1.5 h-3.5 w-3.5" />
                            Join
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" className="border-emerald-200 text-emerald-600 font-semibold hover:bg-emerald-50 h-8">
                            <FileText className="mr-1.5 h-3.5 w-3.5" />
                            Notes
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="h-4"></div>
    </div>
  )
}
