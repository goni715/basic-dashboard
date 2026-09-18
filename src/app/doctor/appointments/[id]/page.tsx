import * as React from "react"
import Link from "next/link"
import { 
  ArrowLeft, Video, ClipboardList, CheckCircle2, 
  FileText, Download, Eye, MapPin, Phone, Mail, User, Clock
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"

export default function AppointmentDetailsPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch data based on params.id
  const id = params.id || "BK-3SM-2026-001234"

  return (
    <div className="space-y-6 pb-12">
      {/* Top Nav */}
      <div>
        <Button variant="link" className="text-slate-500 hover:text-slate-800 p-0 h-auto gap-2"  render={<Link href="/doctor/appointments" />}>
            <ArrowLeft className="h-4 w-4" />
            Back to Appointments
          </Button>
      </div>

      {/* Header Info */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-sm font-semibold text-slate-500">
              Booking ID: <span className="text-blue-600 font-bold">{id}</span>
            </h2>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Upcoming</Badge>
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1">
              <Video className="h-3 w-3" />
              Video Consultation
            </Badge>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Date</p>
              <p className="font-semibold text-slate-900 text-sm">April 14, 2026</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Time</p>
              <p className="font-semibold text-slate-900 text-sm">10:00 AM</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Duration</p>
              <p className="font-semibold text-slate-900 text-sm">30 minutes</p>
            </div>
          </div>
        </div>

        <div className="flex w-full md:w-auto gap-3">
          <Button variant="outline" className="flex-1 md:flex-none border-blue-200 text-blue-600 hover:bg-blue-50">
            <ClipboardList className="mr-2 h-4 w-4" />
            Open Notes
          </Button>
          <Button className="flex-1 md:flex-none bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-sm">
            <Video className="mr-2 h-4 w-4" />
            Join Video Call
          </Button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column (2/3 width) */}
        <div className="xl:col-span-2 space-y-6">
          
          <Card className="border-0 shadow-sm rounded-2xl">
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base">Patient Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-1">Patient Name</p>
                  <p className="font-bold text-slate-900 text-sm">Rahul Ahmed</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-1">Phone</p>
                  <p className="font-bold text-slate-900 text-sm">+880 1712-345678</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-1">Email</p>
                  <p className="font-bold text-slate-900 text-sm">rahul.ahmed@email.com</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-1">Age</p>
                  <p className="font-bold text-slate-900 text-sm">38</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-1">Gender</p>
                  <p className="font-bold text-slate-900 text-sm">Male</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-1">Country</p>
                  <p className="font-bold text-slate-900 text-sm">Bangladesh</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm rounded-2xl">
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base">Appointment Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-1">Doctor</p>
                  <p className="font-bold text-slate-900 text-sm">Dr. Arjun Mehta</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-1">Specialty</p>
                  <p className="font-bold text-slate-900 text-sm">Cardiology</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-1">Hospital</p>
                  <p className="font-bold text-slate-900 text-sm">Bangkok Heart Hospital</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-1">Country</p>
                  <p className="font-bold text-slate-900 text-sm">Thailand</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-1">Language</p>
                  <p className="font-bold text-slate-900 text-sm">Bengali & English</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-1">Consultation Type</p>
                  <p className="font-bold text-slate-900 text-sm">Video Consultation</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100">
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-2">Payment Status</p>
                <div className="flex items-center gap-3">
                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 shadow-none">Paid</Badge>
                  <span className="text-xs font-medium text-slate-500">Read-only · Managed by admin</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm rounded-2xl">
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base">Symptoms / Notes</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700 leading-relaxed font-medium">
                Experiencing chest discomfort and irregular heartbeat. Previous cardiac history. Need consultation for ongoing treatment plan.
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm rounded-2xl">
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base">Uploaded Reports</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-4">
                {[
                  { name: "Medical Reports.pdf", size: "2.4 MB" },
                  { name: "ECG Report.pdf", size: "1.1 MB" },
                  { name: "Blood Test.pdf", size: "0.9 MB" },
                ].map((file, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-blue-100 bg-white transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 font-bold text-xs">
                        PDF
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{file.name}</p>
                        <p className="text-xs font-medium text-slate-500">{file.size}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50 font-semibold h-8"  render={<Link href="/doctor/reports" />}>
                          <Eye className="mr-1.5 h-3.5 w-3.5" /> View
                        </Button>
                      <Button variant="ghost" size="sm" className="text-slate-600 hover:bg-slate-50 font-semibold h-8">
                        <Download className="mr-1.5 h-3.5 w-3.5" /> Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm rounded-2xl">
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base">Booking Timeline</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-slate-200">
                
                {[
                  { title: "Booking Placed", date: "Apr 10, 2026", status: "completed" },
                  { title: "Confirmed", date: "Apr 11, 2026", status: "completed" },
                  { title: "Reminder Sent", date: "Apr 13, 2026", status: "completed" },
                  { title: "Consultation", date: "Apr 14, 2026", status: "current" },
                  { title: "Completed", date: "-", status: "pending" },
                ].map((item, i) => (
                  <div key={i} className="relative flex items-center gap-4 text-sm">
                    <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                      item.status === 'completed' ? 'border-blue-500 bg-blue-50 text-blue-500' :
                      item.status === 'current' ? 'border-slate-300 bg-white' :
                      'border-slate-200 bg-slate-50'
                    }`}>
                      {item.status === 'completed' && <div className="h-2 w-2 rounded-full bg-blue-500" />}
                    </div>
                    <div>
                      <p className={`font-bold ${item.status === 'pending' ? 'text-slate-400' : 'text-slate-900'}`}>{item.title}</p>
                      <p className={`text-xs font-medium ${item.status === 'pending' ? 'text-slate-300' : 'text-slate-500'}`}>{item.date}</p>
                    </div>
                  </div>
                ))}

              </div>
            </CardContent>
          </Card>

        </div>

        {/* Right Column (1/3 width) */}
        <div className="space-y-6">
          
          <Card className="border-0 shadow-sm rounded-2xl">
            <CardContent className="p-6 text-center space-y-4">
              <Avatar className="h-20 w-20 mx-auto">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-teal-500 text-white text-2xl font-bold">
                  RA
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Rahul Ahmed</h3>
                <p className="text-xs font-medium text-slate-500 mt-1">38 years · Male · Bangladesh</p>
                <div className="mt-3 inline-flex">
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200">Active Patient</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm rounded-2xl bg-blue-50/50 border-blue-100">
            <CardContent className="p-5">
              <p className="text-[10px] uppercase font-bold text-blue-600 mb-1">Next Action</p>
              <p className="font-bold text-slate-900 text-sm">Ready to start video consultation</p>
              <p className="text-xs font-medium text-slate-500 mt-1">Apr 14, 2026 at 10:00 AM</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm rounded-2xl">
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base">Consultation Checklist</CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              
              <div className="space-y-3">
                {[
                  { label: "Review symptoms", checked: true },
                  { label: "Check reports", checked: true },
                  { label: "Join call", checked: false },
                  { label: "Write notes", checked: false },
                  { label: "Add prescription", checked: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <Checkbox id={`check-${i}`} checked={item.checked} className={item.checked ? "data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500" : ""} />
                    <Label htmlFor={`check-${i}`} className={`text-sm font-semibold cursor-pointer ${item.checked ? 'text-teal-600' : 'text-slate-500'}`}>
                      {item.label}
                    </Label>
                  </div>
                ))}
              </div>

              <div className="pt-4 space-y-3">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-sm">
                  <Video className="mr-2 h-4 w-4" />
                  Join Video Call
                </Button>
                <Button variant="outline" className="w-full border-slate-200 text-slate-700 hover:bg-slate-50">
                  <User className="mr-2 h-4 w-4" />
                  View Patient
                </Button>
                <Button variant="outline" className="w-full border-teal-200 text-teal-600 hover:bg-teal-50">
                  <ClipboardList className="mr-2 h-4 w-4" />
                  Write Notes
                </Button>
              </div>

            </CardContent>
          </Card>

        </div>

      </div>
    </div>
  )
}

// Temporary inline Label component to fix import if needed, or we can just import from ui
import { Label } from "@/components/ui/label"
