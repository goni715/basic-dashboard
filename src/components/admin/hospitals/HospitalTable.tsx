import { Eye, Trash2, CheckCircle, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UpdateHospitalModal from "@/components/modal/hospital/UpdateHospitalModal";
import { IHospital } from "@/types/hospital.type";

interface HospitalTableProps {
  hospitals: IHospital[];
}

export function HospitalTable({ hospitals }: HospitalTableProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-900">Hospital List</h2>
        <p className="text-sm text-slate-500">These hospitals appear on the patient app hospital list and hospital details page.</p>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="border-slate-100 hover:bg-transparent">
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap py-3 px-6 text-xs uppercase tracking-wider">Hospital</TableHead>
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-xs uppercase tracking-wider">Country / City</TableHead>
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-xs uppercase tracking-wider">Specialties</TableHead>
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-xs uppercase tracking-wider">Rating</TableHead>
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-xs uppercase tracking-wider">Price</TableHead>
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-xs uppercase tracking-wider">Bengali</TableHead>
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-xs uppercase tracking-wider">Status</TableHead>
              <TableHead className="font-semibold text-slate-500 text-right whitespace-nowrap px-6 text-xs uppercase tracking-wider">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hospitals.map((hospital) => (
              <TableRow key={hospital.id} className="border-slate-100 hover:bg-slate-50/50 group">
                <TableCell className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-teal-500 flex items-center justify-center shrink-0 shadow-sm text-white">
                      <Globe className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 whitespace-nowrap">{hospital.name}</span>
                      <span className="text-xs text-slate-400 font-medium truncate max-w-[200px]">{hospital.location}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-slate-700 text-sm font-medium">{hospital.country}</span>
                    <span className="text-slate-400 text-xs font-medium">{hospital.city}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1 items-center max-w-[180px]">
                    {hospital.specialties.map((spec: string) => (
                      <Badge key={spec} variant="secondary" className="bg-blue-50 text-blue-600 hover:bg-blue-100 rounded border-0 font-medium text-xs px-2 py-0.5">
                        {spec}
                      </Badge>
                    ))}
                    {hospital.moreSpecialties && (
                      <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200 rounded border-0 font-medium text-xs px-2 py-0.5">
                        {hospital.moreSpecialties}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <span className="text-amber-500 text-sm">★</span>
                    <span className="text-slate-900 text-sm font-bold">{hospital.rating}</span>
                  </div>
                </TableCell>
                <TableCell className="text-slate-900 text-sm font-bold">{hospital.price}</TableCell>
                <TableCell>
                  {hospital.bengali && (
                    <Badge variant="outline" className="border-emerald-200 text-emerald-600 bg-emerald-50 px-2 py-0.5 font-semibold text-xs rounded-md">
                      Bengali
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {hospital.status === 'Published' && (
                    <Badge variant="outline" className="border-emerald-200 text-emerald-600 bg-emerald-50 font-bold px-2 py-0.5 shadow-none rounded-md">
                      Published
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right px-6">
                  <div className="flex items-center justify-end gap-1 opacity-100 lg:opacity-70 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Eye className="h-4 w-4" />
                    </Button>
                    
                    <UpdateHospitalModal hospital={hospital} />
                    
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg">
                      <CheckCircle className="h-4 w-4" />
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
