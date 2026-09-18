import { ZoomIn, ZoomOut, Download, Maximize2, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ReportRightPane() {
  return (
    <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2">
      
      <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Cardiac Screening Report</h2>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-slate-500 font-medium">Patient: <span className="font-bold text-slate-700">Arif Rahman</span></span>
            <Badge variant="secondary" className="bg-slate-100 text-slate-600 text-[10px] px-1.5 py-0">Cardiac Screening</Badge>
            <span className="text-xs text-slate-400 font-medium">May 8, 2026</span>
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] px-1.5 py-0">Verified</Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-50 rounded-lg border border-slate-200 p-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-600 hover:text-slate-900"><ZoomOut className="h-4 w-4" /></Button>
            <span className="text-xs font-bold w-12 text-center">100%</span>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-600 hover:text-slate-900"><ZoomIn className="h-4 w-4" /></Button>
          </div>
          <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 h-10">
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
          <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 h-10">
            <Maximize2 className="mr-2 h-4 w-4" /> Full View
          </Button>
        </div>
      </div>

      <div className="flex gap-6 h-full min-h-[600px]">
        
        {/* PDF Viewer Mock */}
        <Card className="flex-1 border-0 shadow-sm rounded-2xl overflow-hidden bg-slate-100 relative flex items-center justify-center border-dashed border-2 border-slate-200">
           <div className="absolute inset-4 bg-white shadow-lg rounded-lg p-12">
             <div className="text-center mb-10">
               <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Bangkok Heart Hospital</p>
               <h1 className="text-2xl font-bold text-slate-900 uppercase">Cardiac Screening Report</h1>
             </div>
             
             <div className="grid grid-cols-2 gap-8 border-b border-slate-200 pb-8 mb-8">
               <div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Patient Name</p>
                 <p className="font-bold text-slate-900">Arif Rahman</p>
               </div>
               <div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Age</p>
                 <p className="font-bold text-slate-900">38 years</p>
               </div>
               <div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Gender</p>
                 <p className="font-bold text-slate-900">Male</p>
               </div>
               <div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Report Date</p>
                 <p className="font-bold text-slate-900">May 8, 2026</p>
               </div>
             </div>

             <div className="space-y-6">
               <h3 className="text-sm font-bold text-slate-900 uppercase">Test Results</h3>
               
               <div className="flex justify-between items-center py-2 border-b border-slate-100">
                 <p className="text-sm text-slate-600 font-medium">ECG</p>
                 <p className="text-sm font-bold text-emerald-600">Normal Sinus Rhythm</p>
               </div>
               <div className="flex justify-between items-center py-2 border-b border-slate-100">
                 <p className="text-sm text-slate-600 font-medium">Blood Pressure</p>
                 <p className="text-sm font-bold text-blue-600">120/80 mmHg</p>
               </div>
               <div className="flex justify-between items-center py-2 border-b border-slate-100">
                 <p className="text-sm text-slate-600 font-medium">Heart Rate</p>
                 <p className="text-sm font-bold text-blue-600">72 bpm</p>
               </div>
               <div className="flex justify-between items-center py-2 border-b border-slate-100">
                 <p className="text-sm text-slate-600 font-medium">Cholesterol</p>
                 <p className="text-sm font-bold text-emerald-600">185 mg/dL</p>
               </div>

               <div className="bg-emerald-50 rounded-xl p-4 mt-8">
                 <p className="text-[10px] font-bold text-emerald-700 uppercase mb-1">Summary</p>
                 <p className="text-sm text-emerald-800 font-medium leading-relaxed">
                   All cardiac parameters are within normal range. No significant abnormalities detected. 
                   Regular follow-up recommended in 6 months. Maintain current lifestyle and medication.
                 </p>
               </div>
             </div>
           </div>
        </Card>

        {/* Right sidebar info */}
        <div className="w-64 shrink-0 space-y-4">
          <Card className="border-0 shadow-sm rounded-2xl">
            <CardContent className="p-5 space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Report Details</h3>
              
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">Appointment</p>
                <p className="text-xs font-bold text-blue-600">BK-3SM-2026-001234</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">Uploaded</p>
                <p className="text-xs font-bold text-slate-900">May 8, 2026</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">File Type</p>
                <p className="text-xs font-bold text-slate-900">PDF</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">File Size</p>
                <p className="text-xs font-bold text-slate-900">2.4 MB</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm rounded-2xl">
            <CardContent className="p-5 space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Doctor Notes</h3>
              <p className="text-xs font-medium text-slate-600 leading-relaxed">
                All parameters look normal. Schedule follow-up in 6 months. Patient advised to continue current medication.
              </p>
              
              <div className="pt-2 space-y-2">
                <Button variant="outline" className="w-full border-slate-200 text-slate-700">
                  <Download className="mr-2 h-4 w-4" />
                  Download Report
                </Button>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Add to Notes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
