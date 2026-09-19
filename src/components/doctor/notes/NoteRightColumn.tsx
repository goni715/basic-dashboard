import { Plus, Trash2, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PrescriptionModal from "@/components/modal/prescription/PrescriptionModal";

export default function NoteRightColumn() {
  return (
    <div className="xl:col-span-8 space-y-6 min-w-0">
      
      <Card className="border-0 shadow-sm rounded-2xl">
        <CardHeader className="pb-3 border-b border-slate-100">
          <CardTitle className="text-base">Consultation Notes</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Diagnosis Notes <span className="text-red-500">*</span></label>
            <Textarea 
              placeholder="Enter diagnosis..." 
              className="min-h-[100px] resize-none bg-slate-50/50 border-slate-200 focus-visible:ring-blue-500/30 rounded-xl" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Treatment Advice</label>
            <Textarea 
              placeholder="Enter treatment advice..." 
              className="min-h-[100px] resize-none bg-slate-50/50 border-slate-200 focus-visible:ring-blue-500/30 rounded-xl" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Follow-up Recommendation</label>
              <Input 
                placeholder="Enter recommendation..." 
                className="h-11 bg-slate-50/50 border-slate-200 focus-visible:ring-blue-500/30 rounded-xl" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Next Follow-up Date</label>
              <Input 
                type="date"
                className="h-11 bg-slate-50/50 border-slate-200 focus-visible:ring-blue-500/30 rounded-xl text-slate-500" 
              />
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <label className="text-xs font-bold text-slate-700">Internal Doctor Note</label>
            <Textarea 
              placeholder="Private notes (not shared with patient)..." 
              className="min-h-[80px] resize-none bg-slate-50/50 border-slate-200 focus-visible:ring-blue-500/30 rounded-xl" 
            />
          </div>

        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm rounded-2xl">
        <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center justify-between">
          <CardTitle className="text-base">Prescription</CardTitle>
          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white rounded-full h-8 px-4 font-semibold shadow-sm">
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Add Medicine
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          
          <div className="space-y-4">
            <div className="hidden md:grid grid-cols-[1.5fr_1fr_1fr_1fr_1.5fr_40px] gap-3 px-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Medicine Name <span className="text-red-500">*</span></div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Dosage <span className="text-red-500">*</span></div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Frequency</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Duration <span className="text-red-500">*</span></div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Instructions</div>
              <div></div>
            </div>
            
            {/* Medicine Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr_1.5fr_40px] gap-4 md:gap-3 items-start md:items-center bg-slate-50/50 p-4 md:p-2 rounded-xl border border-slate-100">
              <div className="space-y-1.5 md:space-y-0">
                 <label className="text-[10px] font-bold text-slate-400 uppercase md:hidden">Medicine Name <span className="text-red-500">*</span></label>
                 <Input defaultValue="Atorvastatin 20mg" className="h-10 bg-white" />
              </div>
              <div className="space-y-1.5 md:space-y-0">
                 <label className="text-[10px] font-bold text-slate-400 uppercase md:hidden">Dosage <span className="text-red-500">*</span></label>
                 <Input defaultValue="1 tablet" className="h-10 bg-white" />
              </div>
              <div className="space-y-1.5 md:space-y-0">
                 <label className="text-[10px] font-bold text-slate-400 uppercase md:hidden">Frequency</label>
                 <Input defaultValue="Twice daily" className="h-10 bg-white" />
              </div>
              <div className="space-y-1.5 md:space-y-0">
                 <label className="text-[10px] font-bold text-slate-400 uppercase md:hidden">Duration <span className="text-red-500">*</span></label>
                 <Input defaultValue="30 days" className="h-10 bg-white" />
              </div>
              <div className="space-y-1.5 md:space-y-0">
                 <label className="text-[10px] font-bold text-slate-400 uppercase md:hidden">Instructions</label>
                 <Input defaultValue="Take after dinner" className="h-10 bg-white" />
              </div>
              <div className="flex justify-end md:block">
                 <Button variant="ghost" size="icon" className="h-9 w-9 text-red-500 hover:bg-red-50 rounded-lg">
                   <Trash2 className="h-4 w-4" />
                 </Button>
              </div>
            </div>

            {/* Empty Row Example */}
            <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr_1.5fr_40px] gap-4 md:gap-3 items-start md:items-center bg-slate-50/50 p-4 md:p-2 rounded-xl border border-slate-100 dashed border-2">
              <div className="space-y-1.5 md:space-y-0">
                 <label className="text-[10px] font-bold text-slate-400 uppercase md:hidden">Medicine Name <span className="text-red-500">*</span></label>
                 <Input placeholder="eg. Paracetamol" className="h-10 md:bg-transparent bg-white md:border-0 border-slate-200 md:shadow-none shadow-sm focus-visible:ring-0 md:h-10" />
              </div>
              <div className="space-y-1.5 md:space-y-0">
                 <label className="text-[10px] font-bold text-slate-400 uppercase md:hidden">Dosage <span className="text-red-500">*</span></label>
                 <Input placeholder="eg. 500mg" className="h-10 md:bg-transparent bg-white md:border-0 border-slate-200 md:shadow-none shadow-sm focus-visible:ring-0 md:h-10" />
              </div>
              <div className="space-y-1.5 md:space-y-0">
                 <label className="text-[10px] font-bold text-slate-400 uppercase md:hidden">Frequency</label>
                 <Input placeholder="eg. 1-1-1" className="h-10 md:bg-transparent bg-white md:border-0 border-slate-200 md:shadow-none shadow-sm focus-visible:ring-0 md:h-10" />
              </div>
              <div className="space-y-1.5 md:space-y-0">
                 <label className="text-[10px] font-bold text-slate-400 uppercase md:hidden">Duration <span className="text-red-500">*</span></label>
                 <Input placeholder="eg. 5 days" className="h-10 md:bg-transparent bg-white md:border-0 border-slate-200 md:shadow-none shadow-sm focus-visible:ring-0 md:h-10" />
              </div>
              <div className="space-y-1.5 md:space-y-0">
                 <label className="text-[10px] font-bold text-slate-400 uppercase md:hidden">Instructions</label>
                 <Input placeholder="eg. After meal" className="h-10 md:bg-transparent bg-white md:border-0 border-slate-200 md:shadow-none shadow-sm focus-visible:ring-0 md:h-10" />
              </div>
              <div className="flex justify-end md:block">
                 <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-slate-600 rounded-lg" disabled>
                   <Trash2 className="h-4 w-4" />
                 </Button>
              </div>
            </div>
          </div>

        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm rounded-2xl">
        <CardHeader className="pb-3 border-b border-slate-100">
          <CardTitle className="text-base">Prescription Upload</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-bold text-slate-700 mb-2">Upload Prescription File</p>
              <div className="h-24 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-center cursor-pointer text-sm font-medium text-slate-500">
                Click to upload PDF
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-700 mb-2">Doctor Signature</p>
              <div className="h-24 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center text-sm font-medium text-slate-300">
                Signature placeholder
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-slate-700 mb-2">Additional Instructions</p>
            <Textarea 
              placeholder="Any additional instructions for the patient..." 
              className="min-h-[80px] resize-none bg-slate-50/50 border-slate-200 focus-visible:ring-blue-500/30 rounded-xl" 
            />
          </div>

        </CardContent>
      </Card>

      {/* Bottom Actions Row */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full pt-4">
        <div className="flex w-full sm:w-auto gap-3 flex-1">
          <Button variant="outline" className="flex-1 sm:flex-none border-slate-200 text-slate-700 hover:bg-slate-50 h-11 px-6 rounded-xl font-semibold shadow-sm">
            Save Draft
          </Button>
          <PrescriptionModal />
        </div>
        
        <div className="flex w-full sm:w-auto gap-3">
          <Button className="flex-1 sm:flex-none bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-md h-11 px-8 rounded-xl font-bold">
            Save & Send Prescription
          </Button>
        </div>
      </div>
      
      <div className="flex justify-end pt-2">
        <Button variant="outline" className="w-full sm:w-auto border-amber-200 text-amber-600 hover:bg-amber-50 h-11 px-6 rounded-xl font-bold shadow-sm gap-2">
          <CheckCircle2 className="h-4 w-4" />
          Mark Consultation Completed
        </Button>
      </div>

    </div>
  );
}
