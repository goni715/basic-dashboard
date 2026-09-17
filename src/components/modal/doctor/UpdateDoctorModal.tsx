"use client";

import { useState } from "react";
import { Edit, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DoctorForm = ({ selectedDoctor }: { selectedDoctor: any }) => (
  <div className="grid gap-6 py-2 overflow-y-auto max-h-[70vh] pr-2 custom-scrollbar">
    {/* Section 1 */}
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">1</div>
        <h3 className="text-sm font-bold text-blue-600">Basic Information</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label className="text-sm font-semibold text-slate-700">Doctor Name</Label>
          <Input placeholder="Dr. Arjun Mehta" defaultValue={selectedDoctor?.name} className="border-slate-200 h-11 rounded-xl bg-slate-50/50" />
        </div>
        <div className="grid gap-2">
          <Label className="text-sm font-semibold text-slate-700">Gmail</Label>
          <Input placeholder="doctor@gmail.com" defaultValue={selectedDoctor?.email} className="border-slate-200 h-11 rounded-xl bg-slate-50/50" />
        </div>
        <div className="grid gap-2">
          <Label className="text-sm font-semibold text-slate-700">Specialty</Label>
          <Select defaultValue={selectedDoctor?.specialty}>
            <SelectTrigger className="border-slate-200 h-11 rounded-xl bg-slate-50/50">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Cardiology">Cardiology</SelectItem>
              <SelectItem value="IVF & Fertility">IVF & Fertility</SelectItem>
              <SelectItem value="Orthopedics">Orthopedics</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label className="text-sm font-semibold text-slate-700">Assigned Hospital</Label>
          <Select defaultValue={selectedDoctor?.hospital}>
            <SelectTrigger className="border-slate-200 h-11 rounded-xl bg-slate-50/50">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Bangkok Heart Hospital">Bangkok Heart Hospital</SelectItem>
              <SelectItem value="Apollo Fertility Center">Apollo Fertility Center</SelectItem>
              <SelectItem value="United Hospital Dhaka">United Hospital Dhaka</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label className="text-sm font-semibold text-slate-700">Country</Label>
          <Select defaultValue={selectedDoctor?.location?.split(', ')[1]}>
            <SelectTrigger className="border-slate-200 h-11 rounded-xl bg-slate-50/50">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Thailand">Thailand</SelectItem>
              <SelectItem value="India">India</SelectItem>
              <SelectItem value="Bangladesh">Bangladesh</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label className="text-sm font-semibold text-slate-700">City</Label>
          <Input placeholder="Bangkok" defaultValue={selectedDoctor?.location?.split(', ')[0]} className="border-slate-200 h-11 rounded-xl bg-slate-50/50" />
        </div>
        <div className="grid gap-2">
          <Label className="text-sm font-semibold text-slate-700">Years of Experience</Label>
          <Input placeholder="15 years" defaultValue={selectedDoctor?.experience} className="border-slate-200 h-11 rounded-xl bg-slate-50/50" />
        </div>
        <div className="grid gap-2">
          <Label className="text-sm font-semibold text-slate-700">Consultation Fee</Label>
          <Input placeholder="$120" defaultValue={selectedDoctor?.fee} className="border-slate-200 h-11 rounded-xl bg-slate-50/50" />
        </div>
        <div className="grid gap-2">
          <Label className="text-sm font-semibold text-slate-700">Phone Number</Label>
          <Input placeholder="+66 99 999 9999" className="border-slate-200 h-11 rounded-xl bg-slate-50/50" />
        </div>
        <div className="grid gap-2">
          <Label className="text-sm font-semibold text-slate-700">Profile Photo</Label>
          <Button variant="outline" className="w-full justify-center h-11 rounded-xl border-dashed border-2 border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-500 font-medium">
            <Upload className="mr-2 h-4 w-4" />
            Upload photo
          </Button>
        </div>
      </div>

      <div className="mt-4 grid gap-2">
        <Label className="text-sm font-semibold text-slate-700">Languages</Label>
        <div className="flex flex-wrap gap-2">
          {["Bengali", "English", "Hindi", "Thai", "Mandarin", "Arabic"].map(lang => (
            <Badge key={lang} variant="outline" className="rounded-lg px-4 py-1.5 border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer font-medium">
              {lang}
            </Badge>
          ))}
        </div>
      </div>
    </div>

    <div className="h-px bg-slate-100 my-2"></div>

    {/* Section 2 */}
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">2</div>
        <h3 className="text-sm font-bold text-blue-600">Patient App Display Info</h3>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label className="text-sm font-semibold text-slate-700">About Doctor</Label>
          <Textarea placeholder="Brief doctor biography..." defaultValue={selectedDoctor?.about} className="min-h-[100px] border-slate-200 rounded-xl bg-slate-50/50 resize-none" />
        </div>

        <div className="grid gap-2">
          <Label className="text-sm font-semibold text-slate-700">Education / Qualification</Label>
          <Input placeholder="Qualification 1" defaultValue={selectedDoctor?.education?.[0]} className="border-slate-200 h-11 rounded-xl bg-slate-50/50 mb-2" />
          <div className="flex gap-2">
            <Input placeholder="Qualification 2" defaultValue={selectedDoctor?.education?.[1]} className="flex-1 border-slate-200 h-11 rounded-xl bg-slate-50/50" />
            <Button variant="outline" className="h-11 rounded-xl border-blue-200 text-blue-600 bg-blue-50/50 hover:bg-blue-100 px-6 font-semibold">
              + Add
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label className="text-sm font-semibold text-slate-700">Consultation Types</Label>
            <div className="flex gap-2">
              <Badge variant="outline" className="rounded-lg px-3 py-2 border-slate-200 text-slate-600 bg-slate-50 font-medium cursor-pointer">Video Consultation</Badge>
              <Badge variant="outline" className="rounded-lg px-3 py-2 border-slate-200 text-slate-600 bg-slate-50 font-medium cursor-pointer">Hospital Visit</Badge>
            </div>
          </div>
          <div className="grid gap-2">
            <Label className="text-sm font-semibold text-slate-700">Availability Label</Label>
            <Select defaultValue="Available Today">
              <SelectTrigger className="border-slate-200 h-11 rounded-xl bg-slate-50/50">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Available Today">Available Today</SelectItem>
                <SelectItem value="Available Tomorrow">Available Tomorrow</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-2 mt-2">
          <Label className="text-sm font-semibold text-slate-700">Available Days</Label>
          <div className="flex flex-wrap gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <div key={day} className="w-11 h-11 rounded-full border border-slate-200 flex items-center justify-center text-sm font-medium text-slate-600 hover:bg-slate-50 cursor-pointer">
                {day}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="grid gap-2">
            <Label className="text-sm font-semibold text-slate-700">Doctor Rating</Label>
            <Input placeholder="4.9" defaultValue={selectedDoctor?.rating} className="border-slate-200 h-11 rounded-xl bg-slate-50/50" />
          </div>
          <div className="grid gap-2">
            <Label className="text-sm font-semibold text-slate-700">Review Count</Label>
            <Input placeholder="312" defaultValue={selectedDoctor?.reviews} className="border-slate-200 h-11 rounded-xl bg-slate-50/50" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const UpdateDoctorModal = ({ doctor }: { doctor: any }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="h-8 border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold rounded-lg px-2.5 shadow-sm">
          <Edit className="mr-1.5 h-3.5 w-3.5" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] p-0 rounded-2xl gap-0 overflow-hidden" onInteractOutside={(e) => e.preventDefault()}>
        <div className="p-6 pb-4 border-b border-slate-100">
          <DialogTitle className="text-xl font-bold">Edit Doctor</DialogTitle>
          <DialogDescription className="text-slate-500 mt-1.5">
            Update patient-facing doctor details and consultation availability.
          </DialogDescription>
        </div>
        
        <div className="px-6">
          <DoctorForm selectedDoctor={doctor} />
        </div>

        <DialogFooter className="p-6 border-t border-slate-100 bg-slate-50/50 flex flex-row gap-3 sm:justify-between w-full">
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="rounded-xl h-11 px-6 border-slate-200 hover:bg-white text-slate-600">
              Cancel
            </Button>
          </div>
          <Button type="submit" className="rounded-xl h-11 px-8 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-sm font-semibold ml-auto">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDoctorModal;
