import { Link2, Eye, Trash2 } from "lucide-react";
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
import EditMedicineModal from "@/components/modal/medicine/EditMedicineModal";
import { IAdminMedicine } from "@/types/admin-medicine.type";

interface AdminMedicineTableProps {
  medicines: IAdminMedicine[];
}

export function AdminMedicineTable({ medicines }: AdminMedicineTableProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-900">Medicine List</h2>
        <p className="text-sm text-slate-500">These medicines appear in the user app medicine list and medicine details page.</p>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="border-slate-100 hover:bg-transparent">
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap py-3 px-6 text-[10px] uppercase tracking-widest">Medicine</TableHead>
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-[10px] uppercase tracking-widest">Generic Name</TableHead>
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-[10px] uppercase tracking-widest">Usage</TableHead>
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-[10px] uppercase tracking-widest">Country</TableHead>
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-[10px] uppercase tracking-widest">Alternatives</TableHead>
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-[10px] uppercase tracking-widest">Price</TableHead>
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-[10px] uppercase tracking-widest">Stock</TableHead>
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-[10px] uppercase tracking-widest">Status</TableHead>
              <TableHead className="font-semibold text-slate-500 text-right whitespace-nowrap px-6 text-[10px] uppercase tracking-widest">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medicines.map((medicine) => (
              <TableRow key={medicine.id} className="border-slate-100 hover:bg-slate-50/50">
                <TableCell className="py-4 px-6">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0 mt-1">
                      <Link2 className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 text-sm max-w-[150px] leading-tight block">
                        {medicine.name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium block mt-1">{medicine.purpose}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-slate-500 text-sm">
                  <div className="max-w-[120px] leading-tight">{medicine.genericName}</div>
                </TableCell>
                <TableCell className="text-slate-500 text-sm">
                  <div className="max-w-[100px] leading-tight">{medicine.usage}</div>
                </TableCell>
                <TableCell className="text-slate-500 text-sm font-medium">{medicine.country}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    {medicine.alternatives.map((alt, i) => (
                      <Badge key={i} variant="secondary" className="bg-slate-100 text-slate-400 font-medium shadow-none w-fit text-[10px]">
                        {alt}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-slate-900 font-bold text-sm">{medicine.price}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={
                    medicine.stock === 'Available' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 shadow-none px-3 rounded-full' :
                    'bg-rose-50 text-rose-600 border-rose-200 shadow-none px-3 rounded-full'
                  }>
                    {medicine.stock}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={
                    medicine.status === 'Published' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 shadow-none px-3 rounded-full' :
                    'bg-amber-50 text-amber-600 border-amber-200 shadow-none px-3 rounded-full'
                  }>
                    {medicine.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right px-6">
                  <div className="flex items-center justify-end gap-1">
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <EditMedicineModal medicine={medicine} />
                    <Button variant="ghost" className="h-8 px-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg text-xs font-bold">
                      Unpublish
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
