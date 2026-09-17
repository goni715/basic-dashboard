"use client";

import { useState } from "react";
import { 
  Edit, Trash2, User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PatientDetailsModal from "@/components/modal/patient/PatientDetailsModal";

const initialPatients = [
  {
    id: "1",
    name: "Arif Rahman",
    phone: "+880 1712-345678",
    email: "arif.rahman@email.com",
    country: "Bangladesh",
    medicalInfo: "B+, Cardiac history",
    lastActivity: "Today, 10:30 AM",
    status: "Active",
    avatar: "A",
  },
  {
    id: "2",
    name: "Rahul Ahmed",
    phone: "+880 1712-345679",
    email: "rahul.ahmed@email.com",
    country: "Bangladesh",
    medicalInfo: "Chest discomfort",
    lastActivity: "Apr 14, 2026",
    status: "Active",
    avatar: "R",
  },
  {
    id: "3",
    name: "Mohammed Rahman",
    phone: "+880 1712-345680",
    email: "rahman@example.com",
    country: "Bangladesh",
    medicalInfo: "Medicine request",
    lastActivity: "May 12, 2026",
    status: "Active",
    avatar: "M",
  },
  {
    id: "4",
    name: "Fatima Khatun",
    phone: "+880 1712-345681",
    email: "fatima@email.com",
    country: "Bangladesh",
    medicalInfo: "Follow-up required",
    lastActivity: "May 10, 2026",
    status: "Blocked",
    avatar: "F",
  }
];

export default function PatientManagementPage() {
  const [patients, setPatients] = useState(initialPatients);

  return (
    <div className="space-y-8 max-w-full overflow-hidden p-2 md:p-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900">Patient Management</h1>
        <p className="text-slate-500 text-sm">View patient profiles, medical info, reports, appointments, and requests.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-2">
            <div className="h-4 w-4 bg-blue-600 rounded-full ring-4 ring-blue-100"></div>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">4</h2>
          <p className="text-slate-500 text-sm font-medium">Total Patients</p>
        </div>
        <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="h-10 w-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-2">
            <div className="h-4 w-4 bg-emerald-500 rounded-full ring-4 ring-emerald-100"></div>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">3</h2>
          <p className="text-slate-500 text-sm font-medium">Active Patients</p>
        </div>
        <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="h-10 w-10 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-2">
            <div className="h-4 w-4 bg-teal-500 rounded-full ring-4 ring-teal-100"></div>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">740</h2>
          <p className="text-slate-500 text-sm font-medium">Patients with Reports</p>
        </div>
        <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="h-10 w-10 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mb-2">
            <div className="h-4 w-4 bg-rose-500 rounded-full ring-4 ring-rose-100"></div>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">1</h2>
          <p className="text-slate-500 text-sm font-medium">Blocked Patients</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Patient List</h2>
          <p className="text-sm text-slate-500">Patient records connected with appointments, medicine requests, and reports.</p>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-slate-100 hover:bg-transparent">
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap py-3 px-6 text-xs uppercase tracking-wider">Patient</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-xs uppercase tracking-wider">Phone</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-xs uppercase tracking-wider">Email</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-xs uppercase tracking-wider">Country</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-xs uppercase tracking-wider">Medical Info</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-xs uppercase tracking-wider">Last Activity</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-xs uppercase tracking-wider">Status</TableHead>
                <TableHead className="font-semibold text-slate-500 text-right whitespace-nowrap px-6 text-xs uppercase tracking-wider">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id} className="border-slate-100 hover:bg-slate-50/50 group">
                  <TableCell className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 bg-teal-500 text-white rounded-full flex items-center justify-center shrink-0">
                        <User className="h-5 w-5" />
                      </Avatar>
                      <span className="font-bold text-slate-900 whitespace-nowrap">{patient.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-500 text-sm font-medium">{patient.phone}</TableCell>
                  <TableCell className="text-slate-500 text-sm font-medium">{patient.email}</TableCell>
                  <TableCell className="text-slate-500 text-sm font-medium">{patient.country}</TableCell>
                  <TableCell className="text-slate-500 text-sm font-medium max-w-[200px] truncate">{patient.medicalInfo}</TableCell>
                  <TableCell className="text-slate-500 text-sm font-medium whitespace-nowrap">{patient.lastActivity}</TableCell>
                  <TableCell>
                    {patient.status === 'Active' && (
                      <Badge variant="outline" className="border-emerald-200 text-emerald-600 bg-emerald-50 px-2.5 py-0.5 font-semibold text-xs rounded-md shadow-none">
                        Active
                      </Badge>
                    )}
                    {patient.status === 'Blocked' && (
                      <Badge variant="outline" className="border-rose-200 text-rose-600 bg-rose-50 px-2.5 py-0.5 font-semibold text-xs rounded-md shadow-none">
                        Blocked
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <div className="flex items-center justify-end gap-1 opacity-100 lg:opacity-70 group-hover:opacity-100 transition-opacity">
                      
                      <PatientDetailsModal patient={patient} />
                      
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg">
                        <Edit className="h-4 w-4" />
                      </Button>
                      
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg">
                        <Trash2 className="h-4 w-4" />
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
