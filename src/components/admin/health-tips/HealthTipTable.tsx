import { Lightbulb, Eye, Star } from "lucide-react";
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
import EditHealthTipModal from "@/components/modal/health-tip/EditHealthTipModal";
import { IAdminHealthTip } from "@/types/admin-health-tip.type";

interface HealthTipTableProps {
  tips: IAdminHealthTip[];
}

export default function ({ tips }: HealthTipTableProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-900">Health Tips List</h2>
        <p className="text-sm text-slate-500">These tips appear in the user app health tips section and detail page.</p>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="border-slate-100 hover:bg-transparent">
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap py-3 px-6 text-[10px] uppercase tracking-widest">Health Tip</TableHead>
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-[10px] uppercase tracking-widest">Category</TableHead>
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-[10px] uppercase tracking-widest">Language</TableHead>
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-[10px] uppercase tracking-widest">Read Time</TableHead>
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-[10px] uppercase tracking-widest">Featured</TableHead>
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-[10px] uppercase tracking-widest">Publish Date</TableHead>
              <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-[10px] uppercase tracking-widest">Status</TableHead>
              <TableHead className="font-semibold text-slate-500 text-right whitespace-nowrap px-6 text-[10px] uppercase tracking-widest">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tips.map((tip) => (
              <TableRow key={tip.id} className="border-slate-100 hover:bg-slate-50/50">
                <TableCell className="py-4 px-6">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shrink-0 mt-1">
                      <Lightbulb className="h-4 w-4" />
                    </div>
                    <span className="font-bold text-slate-900 text-sm max-w-[250px] leading-tight block">
                      {tip.title}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-blue-50 text-blue-600 font-medium shadow-none w-fit text-[10px] whitespace-nowrap rounded-full">
                    {tip.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-500 text-sm">
                  <div className="max-w-[100px] leading-tight">{tip.language}</div>
                </TableCell>
                <TableCell className="text-slate-500 text-sm">
                  <div className="max-w-[80px] leading-tight">{tip.readTime}</div>
                </TableCell>
                <TableCell>
                  {tip.featured ? (
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="h-3 w-3 fill-amber-500" />
                      <span className="font-bold text-sm">Yes</span>
                    </div>
                  ) : (
                    <span className="text-slate-400 font-medium text-sm">No</span>
                  )}
                </TableCell>
                <TableCell className="text-slate-500 text-sm font-medium whitespace-nowrap">
                  {tip.publishDate}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={
                    tip.status === 'Published' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 shadow-none px-3 rounded-full' :
                    'bg-amber-50 text-amber-600 border-amber-200 shadow-none px-3 rounded-full'
                  }>
                    {tip.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right px-6">
                  <div className="flex items-center justify-end gap-1">
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <EditHealthTipModal tip={tip} />
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
