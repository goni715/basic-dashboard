"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateDoctorAccessModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white rounded-lg h-10 shadow-sm shadow-blue-500/20 px-4" />}>
          <Plus className="mr-2 h-4 w-4" />
          Add Doctor Access
        </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-6 rounded-2xl gap-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add Doctor Access</DialogTitle>
          <DialogDescription className="text-slate-500">
            Send Gmail invite so the doctor can access the doctor panel.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-sm font-semibold text-slate-700">Doctor Name</Label>
            <Input id="name" placeholder="Dr. Arjun Mehta" className="border-slate-200 h-10 rounded-lg bg-slate-50/50" />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-sm font-semibold text-slate-700">Doctor Gmail</Label>
            <Input id="email" type="email" placeholder="doctor@gmail.com" className="border-slate-200 h-10 rounded-lg bg-slate-50/50" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label className="text-sm font-semibold text-slate-700">Specialty</Label>
              <Select>
                <SelectTrigger className="border-slate-200 h-10 rounded-lg bg-slate-50/50">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="orthopedics">Orthopedics</SelectItem>
                  <SelectItem value="fertility">IVF & Fertility</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label className="text-sm font-semibold text-slate-700">Assigned Hospital</Label>
              <Select>
                <SelectTrigger className="border-slate-200 h-10 rounded-lg bg-slate-50/50">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bkk">Bangkok Heart Hospital</SelectItem>
                  <SelectItem value="apollo">Apollo Fertility Center</SelectItem>
                  <SelectItem value="united">United Hospital Dhaka</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-slate-50/50 border border-slate-100 p-4 rounded-xl space-y-4 mt-2">
            <Label className="text-sm font-semibold text-slate-700 block">Doctor Permissions</Label>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="p1" defaultChecked className="border-slate-300 text-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" />
                <Label htmlFor="p1" className="text-sm font-medium text-slate-700 cursor-pointer">View assigned patients</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="p2" defaultChecked className="border-slate-300 text-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" />
                <Label htmlFor="p2" className="text-sm font-medium text-slate-700 cursor-pointer">View patient reports</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="p3" className="border-slate-300" />
                <Label htmlFor="p3" className="text-sm font-medium text-slate-700 cursor-pointer">Add consultation notes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="p4" className="border-slate-300" />
                <Label htmlFor="p4" className="text-sm font-medium text-slate-700 cursor-pointer">Upload prescription</Label>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-2 flex gap-3 sm:justify-start w-full">
          <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1 rounded-xl h-11 border-slate-200 hover:bg-slate-50 text-slate-600">
            Cancel
          </Button>
          <Button type="submit" className="flex-1 rounded-xl h-11 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-sm">
            Send Invite
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDoctorAccessModal;
