"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DUMMY_ADMIN_FAQS } from "@/data/admin-faq.data";
import AddFaqModal from "@/components/modal/settings/AddFaqModal";
import EditFaqModal from "@/components/modal/settings/EditFaqModal";

export default function FaqSettings() {
  const [faqs, setFaqs] = useState(DUMMY_ADMIN_FAQS);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">FAQ Management</h2>
          <p className="text-sm text-slate-500">Manage frequently asked questions for patients.</p>
        </div>
        <AddFaqModal />
      </div>

      <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-slate-100 hover:bg-transparent">
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap py-3 px-6 text-[10px] uppercase tracking-widest">Question & Answer</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-[10px] uppercase tracking-widest">Category</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-[10px] uppercase tracking-widest">Status</TableHead>
                <TableHead className="font-semibold text-slate-500 text-right whitespace-nowrap px-6 text-[10px] uppercase tracking-widest">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {faqs.map((faq) => (
                <TableRow key={faq.id} className="border-slate-100 hover:bg-slate-50/50">
                  <TableCell className="py-4 px-6">
                    <div className="max-w-sm md:max-w-md lg:max-w-lg space-y-1">
                      <p className="font-bold text-slate-900 text-sm leading-tight">{faq.question}</p>
                      <p className="text-xs text-slate-500 line-clamp-2">{faq.answer}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-blue-50 text-blue-600 font-medium shadow-none w-fit text-[10px] whitespace-nowrap rounded-full">
                      {faq.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      faq.status === 'Published' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 shadow-none px-3 rounded-full' :
                      'bg-amber-50 text-amber-600 border-amber-200 shadow-none px-3 rounded-full'
                    }>
                      {faq.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <div className="flex items-center justify-end gap-1">
                      <EditFaqModal faq={faq} />
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg">
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
