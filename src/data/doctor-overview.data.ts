import { Calendar, Clock, Users, FileText, FileSignature, FileHeart } from "lucide-react"
import { IDoctorStat, ITodaysAppointment } from "@/types/doctor-overview.type";

export const DUMMY_DOCTOR_STATS: IDoctorStat[] = [
  { title: "Today's Appointments", value: 6, description: "3 video, 3 hospital visits", icon: Calendar, color: "text-blue-600 bg-blue-50" },
  { title: "Upcoming Appointments", value: 18, description: "Next 7 days", icon: Clock, color: "text-teal-600 bg-teal-50" },
  { title: "Assigned Patients", value: 42, description: "Admin assigned", icon: Users, color: "text-emerald-600 bg-emerald-50" },
  { title: "Pending Notes", value: 4, description: "Need completion", icon: FileSignature, color: "text-amber-600 bg-amber-50" },
  { title: "Pending Prescriptions", value: 3, description: "After consultation", icon: FileHeart, color: "text-purple-600 bg-purple-50" },
  { title: "Reports to Review", value: 9, description: "Uploaded by patients", icon: FileText, color: "text-rose-600 bg-rose-50" },
];

export const DUMMY_TODAYS_APPOINTMENTS: ITodaysAppointment[] = [
  { id: "1", time: "10:00 AM", patient: "Rahul Ahmed", type: "Video Consultation", symptoms: "Chest discomfort", status: "Upcoming" },
  { id: "2", time: "11:30 AM", patient: "Fatima Khatun", type: "Hospital Visit", symptoms: "Fertility consultation", status: "Confirmed" },
  { id: "3", time: "2:00 PM", patient: "Arif Rahman", type: "Video Consultation", symptoms: "Irregular heartbeat", status: "Upcoming" },
];
