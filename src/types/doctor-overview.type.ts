import { LucideIcon } from "lucide-react";

export interface IDoctorStat {
  title: string;
  value: number;
  description: string;
  icon: any; // LucideIcon
  color: string;
}

export interface ITodaysAppointment {
  id: string;
  time: string;
  patient: string;
  type: string;
  symptoms: string;
  status: string;
}
