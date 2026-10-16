"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Eye, Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import UpdateDoctorModal from "./UpdateDoctorModal";

const DoctorDetailsModal = ({ doctor }: { doctor: any }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button size="sm" variant="outline" className="h-8 border-blue-200 text-blue-600 hover:bg-blue-50 font-semibold rounded-lg px-2.5 shadow-sm" onClick={() => setOpen(true)}>
        <Eye className="mr-1.5 h-3.5 w-3.5" />
        View
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[700px] p-0 rounded-2xl gap-0 overflow-hidden max-h-[95dvh] sm:max-h-[90dvh] flex flex-col bg-white">
          <div className="p-6 pb-4 border-b border-slate-100 shrink-0">
            <DialogTitle className="text-xl font-bold">Doctor Details</DialogTitle>
            <DialogDescription className="text-slate-500 mt-1.5">
              Complete details and profile information of the doctor.
            </DialogDescription>
          </div>
          
          <div className="px-6 overflow-y-auto flex-1 custom-scrollbar py-2">
            <div className="space-y-6 py-2">
              
              {/* Profile Card */}
              <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-5 space-y-4">
                <div className="flex gap-4">
                  <Avatar className="h-16 w-16 bg-gradient-to-br from-blue-500 to-teal-400 rounded-xl shadow-sm">
                    <AvatarFallback className="bg-transparent text-white text-2xl font-bold rounded-xl">
                      {doctor.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-slate-900">{doctor.name}</h3>
                    <p className="text-sm text-slate-500 font-medium">{doctor.specialty}</p>
                    <p className="text-sm text-slate-500">{doctor.hospital}</p>
                    <p className="text-sm text-slate-400">{doctor.location}</p>
                    
                    <div className="flex items-center gap-1.5 mt-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-slate-900 text-sm">{doctor.rating}</span>
                      <span className="text-slate-400 text-xs font-medium">({doctor.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-bold pt-2">
                  <span className="text-emerald-500">{doctor.experience}</span>
                  <span className="text-blue-500">{doctor.fee} / session</span>
                  <span className="text-emerald-500">Available Today</span>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {doctor.languages?.map((lang: string) => (
                    <Badge key={lang} variant="outline" className="rounded-md px-2.5 py-0.5 border-slate-200 text-slate-500 font-medium shadow-sm bg-white">
                      {lang}
                    </Badge>
                  ))}
                  {doctor.moreLangs && (
                      <Badge variant="outline" className="rounded-md px-2.5 py-0.5 border-slate-200 text-slate-500 font-medium shadow-sm bg-white">
                      Hindi
                    </Badge>
                  )}
                </div>
              </div>

              {/* About */}
              <div className="space-y-2">
                <h4 className="text-[15px] font-bold text-slate-900">About</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{doctor.about}</p>
              </div>

              {/* Education */}
              <div className="space-y-2">
                <h4 className="text-[15px] font-bold text-slate-900">Education</h4>
                <ul className="space-y-2">
                  {doctor.education?.map((edu: string, i: number) => (
                    <li key={i} className="flex gap-2.5 text-sm text-slate-500 items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                      <span>{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Expertise */}
              <div className="space-y-3">
                <h4 className="text-[15px] font-bold text-slate-900">Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {doctor.expertise?.map((item: string, i: number) => (
                    <Badge key={i} variant="secondary" className="bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg px-3 py-1.5 border-0 font-medium text-xs">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Consultation Info */}
              <div className="space-y-3 pb-4">
                <h4 className="text-[15px] font-bold text-slate-900">Consultation Info</h4>
                <div className="border border-slate-100 bg-slate-50/50 rounded-2xl p-4 space-y-4">
                  <div className="flex gap-3">
                    <span className="text-xs font-bold text-emerald-500">Video Consultation</span>
                    <span className="text-xs font-bold text-emerald-500">Hospital Visit</span>
                  </div>
                  
                  <div className="flex gap-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
                      <span key={day} className="text-xs font-bold text-blue-500">{day}</span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {['9:00 AM', '10:00 AM', '2:00 PM', '3:00 PM'].map(time => (
                      <div key={time} className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-600 shadow-sm">
                        {time}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
          
          <DialogFooter className="m-0 p-6 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-3 sm:justify-end w-full shrink-0">
            <Button variant="outline" onClick={() => setOpen(false)} className="rounded-xl h-11 px-8 border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 w-full sm:w-auto">
              Close
            </Button>
            <UpdateDoctorModal 
              doctor={doctor}
              trigger={
                <DialogTrigger render={<Button className="rounded-xl h-11 px-8 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-semibold shadow-sm w-full sm:w-auto" />}>
                  Edit Doctor
                </DialogTrigger>
              }
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DoctorDetailsModal;
