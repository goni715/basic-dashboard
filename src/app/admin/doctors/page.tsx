"use client";

import { useState } from "react";
import { 
  Search, Trash2,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CreateDoctorModal from "@/components/modal/doctor/CreateDoctorModal";
import UpdateDoctorModal from "@/components/modal/doctor/UpdateDoctorModal";
import DoctorDetailsModal from "@/components/modal/doctor/DoctorDetailsModal";
import { DUMMY_DOCTORS } from "@/data/doctor.data";

export default function DoctorManagementPage() {
  const [doctors, setDoctors] = useState(DUMMY_DOCTORS);

  return (
    <div className="space-y-8 max-w-full overflow-hidden p-2 md:p-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900">Doctor Management</h1>
        <p className="text-slate-500 text-sm">Manage doctor profiles shown in the patient app.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center w-full">
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <div className="relative min-w-[200px] lg:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search doctor, specialty..." 
              className="pl-9 bg-white border-slate-200 rounded-lg h-10 w-full"
            />
          </div>
          <Select>
            <SelectTrigger className="w-full md:w-40 bg-white border-slate-200 rounded-lg h-10">
              <SelectValue placeholder="All Countries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full md:w-40 bg-white border-slate-200 rounded-lg h-10">
              <SelectValue placeholder="All Hospitals" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Hospitals</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full md:w-40 bg-white border-slate-200 rounded-lg h-10">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <CreateDoctorModal />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Doctor Profiles</h2>
          <p className="text-sm text-slate-500">These details appear on the patient app doctor list and doctor details page.</p>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-slate-100 hover:bg-transparent">
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap py-3 px-6">Doctor</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap">Specialty</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap">Hospital</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap">Country / City</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap">Experience</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap">Fee</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap min-w-[150px]">Languages</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap">Status</TableHead>
                <TableHead className="font-semibold text-slate-500 text-right whitespace-nowrap px-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {doctors.map((doc) => (
                <TableRow key={doc.id} className="border-slate-100 hover:bg-slate-50/50 group">
                  <TableCell className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-blue-100 bg-blue-50 shrink-0">
                        <AvatarFallback className="bg-blue-600 text-white font-bold">
                          {doc.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 whitespace-nowrap">{doc.name}</span>
                        <span className="text-xs text-slate-500 font-medium truncate max-w-[160px]">{doc.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-500 text-sm font-medium">{doc.specialty}</TableCell>
                  <TableCell className="text-slate-500 text-sm font-medium">
                    <div className="max-w-[140px] leading-tight">
                      {doc.hospital}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-500 text-sm font-medium">
                    <div className="max-w-[120px] leading-tight">
                      {doc.location}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-500 text-sm font-medium whitespace-nowrap">{doc.experience}</TableCell>
                  <TableCell className="text-slate-900 text-sm font-bold whitespace-nowrap">{doc.fee}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1 items-center">
                      {doc.languages.map(lang => (
                        <Badge key={lang} variant="secondary" className="bg-blue-50 text-blue-600 hover:bg-blue-100 rounded border-0 font-semibold text-[11px] px-1.5 py-0">
                          {lang}
                        </Badge>
                      ))}
                      {doc.moreLangs && (
                        <span className="text-[11px] text-slate-400 font-bold ml-1">{doc.moreLangs}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {doc.status === 'Published' && (
                      <Badge className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 font-bold px-2 py-0.5 shadow-none rounded-md border-0">
                        Published
                      </Badge>
                    )}
                    {doc.status === 'Draft' && (
                      <Badge className="bg-amber-50 text-amber-600 hover:bg-amber-100 font-bold px-2 py-0.5 shadow-none rounded-md border-0">
                        Draft
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <div className="flex items-center justify-end gap-1 opacity-100 lg:opacity-70 group-hover:opacity-100 transition-opacity">
                      <DoctorDetailsModal doctor={doc} />
                      <UpdateDoctorModal doctor={doc} />
                      
                      {doc.status === 'Published' ? (
                        <Button size="sm" variant="outline" className="h-8 border-amber-200 text-amber-600 hover:bg-amber-50 font-semibold rounded-lg px-2.5 shadow-sm">
                          Unpublish
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" className="h-8 border-emerald-200 text-emerald-600 hover:bg-emerald-50 font-semibold rounded-lg px-2.5 shadow-sm">
                          Publish
                        </Button>
                      )}
                      
                      <Button size="icon" variant="outline" className="h-8 w-8 border-rose-200 text-rose-600 hover:bg-rose-50 rounded-lg flex-shrink-0 shadow-sm">
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
