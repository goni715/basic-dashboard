import { IAppointmentStat, IAppointment } from "@/types/appointment.type";

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
