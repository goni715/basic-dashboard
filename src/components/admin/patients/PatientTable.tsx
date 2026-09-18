import { Edit, Trash2, User } from "lucide-react";
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
import { IPatient } from "@/types/patient.type";

interface PatientTableProps {
  patients: IPatient[];
}

export function PatientTable({ patients }: PatientTableProps) {
  return (
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
  );
}
