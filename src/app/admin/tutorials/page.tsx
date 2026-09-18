"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PlayCircle, Eye, Edit, Trash2, Star } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddTutorialModal from "@/components/modal/tutorial/AddTutorialModal";
import EditTutorialModal from "@/components/modal/tutorial/EditTutorialModal";
import { DUMMY_ADMIN_TUTORIAL_STATS, DUMMY_ADMIN_TUTORIALS } from "@/data/admin-tutorial.data";

export default function AdminTutorialsPage() {
  const [tutorials, setTutorials] = useState(DUMMY_ADMIN_TUTORIALS);

  return (
    <div className="space-y-8 max-w-full overflow-hidden p-2 md:p-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900">Tutorial Management</h1>
        <p className="text-slate-500 text-sm">Manage tutorial videos, categories, guides, and related tutorials shown in the patient app.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {DUMMY_ADMIN_TUTORIAL_STATS.map((stat, i) => (
          <div key={i} className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
            <h2 className="text-3xl font-black text-blue-600 mb-1">{stat.value}</h2>
            <div>
              <p className="text-slate-900 text-sm font-bold">{stat.title}</p>
              <p className="text-slate-500 text-xs mt-1">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <Input 
          placeholder="Search tutorial title or category..." 
          className="max-w-md h-11 bg-white border-slate-200 focus-visible:ring-blue-500 rounded-xl"
        />
        <AddTutorialModal />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Tutorial List</h2>
          <p className="text-sm text-slate-500">These tutorials appear in the user app tutorials section and tutorial detail page.</p>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-slate-100 hover:bg-transparent">
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap py-3 px-6 text-[10px] uppercase tracking-widest">Tutorial</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-[10px] uppercase tracking-widest">Category</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-[10px] uppercase tracking-widest">Duration</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-[10px] uppercase tracking-widest">Views</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-[10px] uppercase tracking-widest">Featured</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-[10px] uppercase tracking-widest">Status</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-[10px] uppercase tracking-widest">Last Updated</TableHead>
                <TableHead className="font-semibold text-slate-500 text-right whitespace-nowrap px-6 text-[10px] uppercase tracking-widest">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tutorials.map((tutorial) => (
                <TableRow key={tutorial.id} className="border-slate-100 hover:bg-slate-50/50">
                  <TableCell className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center shrink-0">
                        <PlayCircle className="h-4 w-4" />
                      </div>
                      <span className="font-bold text-slate-900 text-sm max-w-[200px] leading-tight block">
                        {tutorial.title}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-purple-50 text-purple-600 font-medium shadow-none w-fit text-[10px] whitespace-nowrap rounded-full">
                      {tutorial.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-900 font-bold text-sm">
                    {tutorial.duration}
                  </TableCell>
                  <TableCell className="text-slate-500 text-sm font-medium">
                    {tutorial.views}
                  </TableCell>
                  <TableCell>
                    {tutorial.featured ? (
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="h-3 w-3 fill-amber-500" />
                        <span className="font-bold text-sm">Yes</span>
                      </div>
                    ) : (
                      <span className="text-slate-400 font-medium text-sm">No</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      tutorial.status === 'Published' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 shadow-none px-3 rounded-full' :
                      'bg-amber-50 text-amber-600 border-amber-200 shadow-none px-3 rounded-full'
                    }>
                      {tutorial.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-500 text-sm font-medium whitespace-nowrap">
                    {tutorial.lastUpdated}
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <div className="flex items-center justify-end gap-1">
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <EditTutorialModal tutorial={tutorial} />
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
