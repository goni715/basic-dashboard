import { IAppointment, IAppointmentStat } from "@/types/appointment.type";
import { IDoctorStat, ITodaysAppointment } from "@/types/doctor-overview.type";
import { IDoctorPatient } from "@/types/doctor-patient.type";
import { IPrescription } from "@/types/prescription.type";
import { IDoctorReport, IReportDetail } from "@/types/report.type";
import { Calendar, Clock, Users, FileText, FileSignature, FileHeart } from "lucide-react"


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

export const DUMMY_APPOINTMENT_STATS: IAppointmentStat[] = [
  { title: "Today", value: 6 },
  { title: "Upcoming", value: 18 },
  { title: "Completed", value: 124 },
  { title: "Cancelled", value: 8 },
];

export const DUMMY_APPOINTMENTS: IAppointment[] = [
  { 
    id: "BK-3SM-2026-001234", patient: "Rahul Ahmed", date: "Apr 14, 2026, 10:00 AM", 
    duration: "30 min", type: "Video Consultation", symptoms: "Chest discomfort and irregular heartbeat", 
    reports: 3, status: "Upcoming" 
  },
  { 
    id: "APT-2026-0512", patient: "Arif Rahman", date: "May 15, 2026, 2:00 PM", 
    duration: "30 min", type: "Video Consultation", symptoms: "Previous cardiac history", 
    reports: 2, status: "Confirmed" 
  },
  { 
    id: "BK-2026-002110", patient: "Fatima Khatun", date: "May 20, 2026, 11:30 AM", 
    duration: "45 min", type: "Hospital Visit", symptoms: "Follow-up consultation", 
    reports: 1, status: "Confirmed" 
  },
  { 
    id: "BK-2026-002009", patient: "Mohammed Rahman", date: "May 12, 2026, 4:00 PM", 
    duration: "30 min", type: "Video Consultation", symptoms: "Medicine follow-up", 
    reports: 1, status: "Completed" 
  },
];

export const DUMMY_DOCTOR_PATIENTS: IDoctorPatient[] = [
  { id: "1", name: "Rahul Ahmed", date: "Apr 14, 2026", note: "Cardiac follow-up", active: true },
  { id: "2", name: "Arif Rahman", date: "May 15, 2026", note: "Cardiac screening", active: false },
  { id: "3", name: "Mohammed Rahman", date: "May 12, 2026", note: "Medicine follow-up", active: false },
  { id: "4", name: "Fatima Khatun", date: "May 20, 2026", note: "Fertility consultation", active: false },
];

export const DUMMY_DOCTOR_REPORTS: IDoctorReport[] = [
  { id: "1", name: "Cardiac Screening Report", patient: "Arif Rahman", date: "May 8, 2026", active: true },
  { id: "2", name: "ECG Report", patient: "Rahul Ahmed", date: "Apr 28, 2026", active: false },
  { id: "3", name: "Blood Test Results", patient: "Rahul Ahmed", date: "May 1, 2026", active: false },
  { id: "4", name: "Prescription", patient: "Mohammed Rahman", date: "Apr 25, 2026", active: false, pending: true },
];

export const DUMMY_PRESCRIPTION: IPrescription = {
  doctorName: "Dr. Arjun Mehta",
  doctorDetails: "Cardiology · Bangkok Heart Hospital",
  patientName: "Rahul Ahmed",
  patientDetails: "38 years · Male · Apr 14, 2026",
  diagnosis: "Cardiac arrhythmia — Atorvastatin prescribed.",
  medicines: [
    {
      name: "Atorvastatin 20mg",
      dosage: "1 tablet",
      frequency: "Twice daily",
      duration: "30 days",
      instructions: "Take after dinner"
    }
  ]
};

export const DUMMY_REPORT_DETAIL: IReportDetail = {
  hospitalName: "Bangkok Heart Hospital",
  reportName: "Cardiac Screening Report",
  patientName: "Arif Rahman",
  age: "38 years",
  gender: "Male",
  reportDate: "May 8, 2026",
  ecg: "Normal Sinus Rhythm",
  bloodPressure: "120/80 mmHg",
  heartRate: "72 bpm",
  cholesterol: "185 mg/dL",
  summary: "All cardiac parameters are within normal range. No significant abnormalities detected. Regular follow-up recommended in 6 months. Maintain current lifestyle and medication."
};
