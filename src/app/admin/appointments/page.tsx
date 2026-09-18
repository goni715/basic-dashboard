"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, XCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AdminAppointmentDetailsModal from "@/components/modal/appointment/AdminAppointmentDetailsModal";
import { DUMMY_ADMIN_APPOINTMENT_STATS, DUMMY_ADMIN_APPOINTMENTS } from "@/data/admin-appointment.data";

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState(DUMMY_ADMIN_APPOINTMENTS);

  return (
    <div className="space-y-8 max-w-full overflow-hidden p-2 md:p-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900">Appointment Management</h1>
        <p className="text-slate-500 text-sm">Manage consultation bookings, schedules, reports, and booking status.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {DUMMY_ADMIN_APPOINTMENT_STATS.map((stat, i) => (
          <div key={i} className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center mb-4 ${stat.bgColor}`}>
              <div className={`h-4 w-4 rounded-full ring-4 ${stat.iconColor} ring-white/50`}></div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">{stat.value}</h2>
            <p className="text-slate-500 text-sm font-medium">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Appointment List</h2>
          <p className="text-sm text-slate-500">Consultation bookings from patient app and manual admin entries.</p>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-slate-100 hover:bg-transparent">
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap py-3 px-6 text-[10px] uppercase tracking-widest">Booking ID</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-[10px] uppercase tracking-widest">Patient</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-[10px] uppercase tracking-widest">Doctor</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-[10px] uppercase tracking-widest">Hospital</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-[10px] uppercase tracking-widest">Date & Time</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-[10px] uppercase tracking-widest">Type</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-[10px] uppercase tracking-widest">Payment</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-[10px] uppercase tracking-widest">Status</TableHead>
                <TableHead className="font-semibold text-slate-500 text-right whitespace-nowrap px-6 text-[10px] uppercase tracking-widest">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((apt) => (
                <TableRow key={apt.id} className="border-slate-100 hover:bg-slate-50/50">
                  <TableCell className="py-4 px-6 font-bold text-blue-600 text-xs">{apt.bookingId}</TableCell>
                  <TableCell className="font-bold text-slate-900 text-xs">
                    {apt.patient.split(' ').map((n, i) => (
                      <div key={i}>{n}</div>
                    ))}
                  </TableCell>
                  <TableCell className="text-slate-500 text-xs">
                    <div className="font-medium text-slate-900">{apt.doctor}</div>
                  </TableCell>
                  <TableCell className="text-slate-500 text-xs">
                    <div className="max-w-[120px]">{apt.hospital}</div>
                  </TableCell>
                  <TableCell className="text-slate-500 text-xs">
                    <div className="font-medium text-slate-900">{apt.date}</div>
                    <div>{apt.time}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      apt.type.includes('Video') ? 'bg-blue-50 text-blue-600 border-blue-100 rounded-full font-medium' :
                      'bg-purple-50 text-purple-600 border-purple-100 rounded-full font-medium'
                    }>
                      {apt.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-500 text-xs">{apt.payment}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      apt.status === 'Confirmed' ? 'bg-blue-50 text-blue-600 border-blue-200 shadow-none px-3 rounded-full' :
                      apt.status === 'Upcoming' ? 'bg-indigo-50 text-indigo-600 border-indigo-200 shadow-none px-3 rounded-full' :
                      'bg-amber-50 text-amber-600 border-amber-200 shadow-none px-3 rounded-full'
                    }>
                      {apt.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <div className="flex items-center justify-end gap-1">
                      <AdminAppointmentDetailsModal appointment={apt} />
                      
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg">
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
