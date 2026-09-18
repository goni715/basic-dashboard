import * as React from "react"
import Link from "next/link"
import { Search, Eye, FileText, Download } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DUMMY_DOCTOR_PATIENTS as patients } from "@/data/doctor-patient.data"
export default function PatientsPage() {
  return (
    <div className="flex flex-col xl:flex-row gap-6 pb-12 h-[calc(100vh-8rem)]">
      
      {/* Left Pane - Patient List */}
      <div className="w-full xl:w-80 flex flex-col shrink-0 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Search assigned patient..." className="pl-9 bg-white border-slate-200 rounded-xl" />
        </div>
        
        <Card className="border-0 shadow-sm rounded-2xl flex-1 overflow-hidden flex flex-col">
          <CardHeader className="py-4 border-b border-slate-100 bg-slate-50/50">
            <CardTitle className="text-sm font-bold">Assigned Patients</CardTitle>
          </CardHeader>
          <ScrollArea className="flex-1">
            <div className="p-3 space-y-2">
              {patients.map((p) => (
                <div 
                  key={p.id} 
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                    p.active ? 'bg-blue-50/50 border border-blue-100' : 'hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className={`text-xs font-bold ${p.active ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'}`}>
                      {p.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className={`text-sm font-bold truncate ${p.active ? 'text-slate-900' : 'text-slate-700'}`}>{p.name}</p>
                      {p.active && <div className="h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />}
                    </div>
                    <p className="text-[11px] font-medium text-slate-400">{p.date}</p>
                    <p className="text-xs font-medium text-slate-500 truncate mt-0.5">{p.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>

      {/* Right Pane - Patient Details */}
      <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2">
        
        <div className="flex justify-end">
          <Button variant="link" className="text-blue-600 font-semibold p-0 h-auto">
            Showing assigned patients only
          </Button>
        </div>

        <Card className="border-0 shadow-sm rounded-2xl">
          <CardContent className="p-6 flex items-center gap-6">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-teal-500 text-white text-xl font-bold">
                RA
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-xl font-bold text-slate-900">Rahul Ahmed</h2>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200">Active</Badge>
              </div>
              <p className="text-sm font-medium text-slate-500">+880 1712-345678 · rahul.ahmed@email.com</p>
              <p className="text-sm font-medium text-slate-500">38 years · Male · Bangladesh</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm rounded-2xl">
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-base">Medical Information</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
              <div>
                <p className="text-[11px] uppercase font-bold text-slate-400 mb-1">Blood Group</p>
                <p className="font-bold text-slate-900 text-sm">B+</p>
              </div>
              <div>
                <p className="text-[11px] uppercase font-bold text-slate-400 mb-1">Medical History</p>
                <p className="font-bold text-slate-900 text-sm">Previous cardiac history</p>
              </div>
              <div>
                <p className="text-[11px] uppercase font-bold text-slate-400 mb-1">Allergies</p>
                <p className="font-bold text-slate-900 text-sm">None</p>
              </div>
              <div>
                <p className="text-[11px] uppercase font-bold text-slate-400 mb-1">Preferred Language</p>
                <p className="font-bold text-slate-900 text-sm">Bengali, English</p>
              </div>
              <div>
                <p className="text-[11px] uppercase font-bold text-slate-400 mb-1">Preferred Country</p>
                <p className="font-bold text-slate-900 text-sm">Thailand</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm rounded-2xl">
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-base">Current Symptoms / Notes</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700 leading-relaxed font-medium">
              Experiencing chest discomfort and irregular heartbeat. Need consultation for ongoing treatment plan.
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm rounded-2xl overflow-hidden">
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-base">Appointment History</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="border-slate-100 hover:bg-transparent">
                  <TableHead className="text-xs font-bold text-slate-500 uppercase">Booking ID</TableHead>
                  <TableHead className="text-xs font-bold text-slate-500 uppercase">Date</TableHead>
                  <TableHead className="text-xs font-bold text-slate-500 uppercase">Type</TableHead>
                  <TableHead className="text-xs font-bold text-slate-500 uppercase">Status</TableHead>
                  <TableHead className="text-xs font-bold text-slate-500 uppercase">Notes</TableHead>
                  <TableHead className="text-xs font-bold text-slate-500 uppercase text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-slate-100">
                  <TableCell className="font-bold text-blue-600 text-sm">BK-3SM-2026-001234</TableCell>
                  <TableCell className="font-medium text-slate-600 text-sm">Apr 14, 2026</TableCell>
                  <TableCell className="font-medium text-slate-600 text-sm">Video Consultation</TableCell>
                  <TableCell><Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Upcoming</Badge></TableCell>
                  <TableCell><Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Pending</Badge></TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" className="border-slate-200 text-blue-600 font-semibold hover:bg-blue-50 h-8">View</Button>
                  </TableCell>
                </TableRow>
                <TableRow className="border-slate-100">
                  <TableCell className="font-bold text-blue-600 text-sm">APT-2026-0512</TableCell>
                  <TableCell className="font-medium text-slate-600 text-sm">May 15, 2026</TableCell>
                  <TableCell className="font-medium text-slate-600 text-sm">Video Consultation</TableCell>
                  <TableCell><Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-300">Completed</Badge></TableCell>
                  <TableCell><Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Completed</Badge></TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" className="border-slate-200 text-blue-600 font-semibold hover:bg-blue-50 h-8">View</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* We can stop here for patient details to save some context length, this represents the screenshot well */}
        <div className="h-4"></div>
      </div>

    </div>
  )
}
