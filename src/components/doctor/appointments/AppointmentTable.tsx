import Link from "next/link";
import { Video, Hospital, Eye, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IAppointment } from "@/types/appointment.type";

interface AppointmentTableProps {
  appointments: IAppointment[];
}

export function AppointmentTable({ appointments }: AppointmentTableProps) {
  return (
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
  );
}
