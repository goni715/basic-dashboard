"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, CheckCircle, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AdminReportDetailsModal from "@/components/modal/report/AdminReportDetailsModal";
import { DUMMY_ADMIN_REPORT_STATS, DUMMY_ADMIN_REPORTS } from "@/data/admin-report.data";

export default function AdminReportsPage() {
  const [reports, setReports] = useState(DUMMY_ADMIN_REPORTS);

  return (
    <div className="space-y-8 max-w-full overflow-hidden p-2 md:p-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900">Medical Reports Management</h1>
        <p className="text-slate-500 text-sm">Review uploaded reports, verify documents, and assign reports to doctors.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {DUMMY_ADMIN_REPORT_STATS.map((stat, i) => (
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
          <h2 className="text-lg font-bold text-slate-900">Uploaded Medical Reports</h2>
          <p className="text-sm text-slate-500">Reports uploaded by patients or admins for doctor review.</p>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-slate-100 hover:bg-transparent">
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap py-3 px-6 text-[10px] uppercase tracking-widest">Report</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-[10px] uppercase tracking-widest">Patient</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-[10px] uppercase tracking-widest">Hospital</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-[10px] uppercase tracking-widest">Doctor</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-[10px] uppercase tracking-widest">Report Type</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-[10px] uppercase tracking-widest">Upload Date</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-[10px] uppercase tracking-widest">Status</TableHead>
                <TableHead className="font-semibold text-slate-500 text-right whitespace-nowrap px-6 text-[10px] uppercase tracking-widest">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id} className="border-slate-100 hover:bg-slate-50/50">
                  <TableCell className="py-4 px-6">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0 mt-1">
                        <FileText className="h-4 w-4" />
                      </div>
                      <span className="font-bold text-slate-900 text-sm max-w-[120px] leading-tight block">
                        {report.reportName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-500 text-sm font-medium">{report.patient}</TableCell>
                  <TableCell className="text-slate-500 text-sm max-w-[120px]">
                    <div className="truncate">{report.hospital}</div>
                  </TableCell>
                  <TableCell className="text-slate-500 text-sm font-medium">
                    <div className="max-w-[100px] leading-tight">{report.doctor}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-100 shadow-none font-medium rounded-xl whitespace-nowrap">
                      {report.reportType}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-500 text-sm font-medium whitespace-nowrap">{report.uploadDate}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      report.status === 'Verified' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 shadow-none px-3 rounded-full' :
                      report.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-200 shadow-none px-3 rounded-full' :
                      'bg-rose-50 text-rose-600 border-rose-200 shadow-none px-3 rounded-full'
                    }>
                      {report.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <div className="flex items-center justify-end gap-1">
                      <AdminReportDetailsModal report={report} />
                      
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
    </div>
  );
}
