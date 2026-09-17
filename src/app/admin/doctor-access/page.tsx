"use client";

import { useState } from "react";
import { 
  Search, Plus, Eye, RefreshCw, UserMinus, UserCheck, Trash2, CheckCircle2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import CreateDoctorAccessModal from "@/components/modal/doctor-access/CreateDoctorAccessModal";
import DoctorAccessDetailsModal from "@/components/modal/doctor-access/DoctorAccessDetailsModal";

const initialDoctors = [
  {
    id: "1",
    name: "Dr. Arjun Mehta",
    email: "arjun.mehta@gmail.com",
    specialty: "Cardiology",
    hospital: "Bangkok Heart Hospital",
    permissions: 4,
    status: "Active",
    lastLogin: "Today, 9:20 AM",
    created: "Jan 15, 2026",
    avatar: "A"
  },
  {
    id: "2",
    name: "Dr. Priya Sharma",
    email: "priya.sharma@gmail.com",
    specialty: "IVF & Fertility",
    hospital: "Apollo Fertility Center",
    permissions: 3,
    status: "Invited",
    lastLogin: "Never",
    created: "Feb 10, 2026",
    avatar: "P"
  },
  {
    id: "3",
    name: "Dr. Sophia Rahman",
    email: "sophia.rahman@gmail.com",
    specialty: "Orthopedics",
    hospital: "United Hospital Dhaka",
    permissions: 2,
    status: "Disabled",
    lastLogin: "May 10, 2026",
    created: "Mar 05, 2026",
    avatar: "S"
  }
];

export default function DoctorAccessPage() {
  const [doctors, setDoctors] = useState(initialDoctors);

  return (
    <div className="space-y-8 max-w-full overflow-hidden p-2 md:p-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900">Doctor Access Management</h1>
        <p className="text-slate-500 text-sm">Invite doctors by Gmail and control dashboard access.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search by doctor name or Gmail" 
              className="pl-9 bg-white border-slate-200 rounded-lg h-10"
            />
          </div>
          <Select>
            <SelectTrigger className="w-full md:w-40 bg-white border-slate-200 rounded-lg h-10">
              <SelectValue placeholder="All Specialties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specialties</SelectItem>
              <SelectItem value="cardiology">Cardiology</SelectItem>
              <SelectItem value="orthopedics">Orthopedics</SelectItem>
              <SelectItem value="fertility">IVF & Fertility</SelectItem>
            </SelectContent>
          </Select>
        </div>

          <CreateDoctorAccessModal />
        </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Doctor Access List</h2>
          <p className="text-sm text-slate-500">Only Gmail-approved doctors can access their doctor panel.</p>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-slate-100 hover:bg-transparent">
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap py-3">Doctor Name</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap">Gmail</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap">Specialty</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap">Hospital</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap">Permissions</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap">Status</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap">Last Login</TableHead>
                <TableHead className="font-semibold text-slate-500 text-right whitespace-nowrap">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {doctors.map((doc) => (
                <TableRow key={doc.id} className="border-slate-100 hover:bg-slate-50/50 group">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border border-blue-100 bg-blue-50">
                        <AvatarFallback className="bg-blue-600 text-white text-sm font-bold">
                          {doc.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-bold text-slate-900">{doc.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-500 text-sm font-medium">{doc.email}</TableCell>
                  <TableCell className="text-slate-500 text-sm font-medium">{doc.specialty}</TableCell>
                  <TableCell className="text-slate-500 text-sm font-medium max-w-[150px] truncate">{doc.hospital}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md px-2 py-1 flex flex-col items-center justify-center w-12 h-10 leading-tight border-0 font-semibold">
                      <span>{doc.permissions}</span>
                      <span className="text-[9px] uppercase tracking-wider font-bold">enabled</span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {doc.status === 'Active' && (
                      <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100 font-semibold px-2.5 py-0.5 shadow-none rounded-md">
                        Active
                      </Badge>
                    )}
                    {doc.status === 'Invited' && (
                      <Badge className="bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100 font-semibold px-2.5 py-0.5 shadow-none rounded-md">
                        Invited
                      </Badge>
                    )}
                    {doc.status === 'Disabled' && (
                      <Badge className="bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-100 font-semibold px-2.5 py-0.5 shadow-none rounded-md">
                        Disabled
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-slate-500 text-sm font-medium whitespace-nowrap">{doc.lastLogin}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2 opacity-100 lg:opacity-70 group-hover:opacity-100 transition-opacity">
                      
                      <DoctorAccessDetailsModal doctor={doc} />
                      
                      <Button size="sm" variant="outline" className="h-8 border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold rounded-lg px-3">
                        <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                        Resend
                      </Button>
                      
                      {doc.status === 'Disabled' ? (
                        <Button size="sm" variant="outline" className="h-8 border-emerald-200 text-emerald-600 hover:bg-emerald-50 font-semibold rounded-lg px-3">
                          <UserCheck className="mr-1.5 h-3.5 w-3.5" />
                          Activate
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" className="h-8 border-amber-200 text-amber-600 hover:bg-amber-50 font-semibold rounded-lg px-3">
                          <UserMinus className="mr-1.5 h-3.5 w-3.5" />
                          Disable
                        </Button>
                      )}
                      
                      <Button size="icon" variant="outline" className="h-8 w-8 border-rose-200 text-rose-600 hover:bg-rose-50 rounded-lg flex-shrink-0">
                        <Trash2 className="h-3.5 w-3.5" />
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
