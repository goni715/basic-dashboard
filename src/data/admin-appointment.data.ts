import { IAdminAppointmentStat, IAdminAppointment } from "@/types/admin-appointment.type";

export const DUMMY_ADMIN_APPOINTMENT_STATS: IAdminAppointmentStat[] = [
  { title: "Total Appointments", value: "1,420", iconColor: "bg-blue-500", bgColor: "bg-blue-100" },
  { title: "Upcoming", value: "1", iconColor: "bg-teal-400", bgColor: "bg-teal-50" },
  { title: "Pending Approval", value: "1", iconColor: "bg-amber-400", bgColor: "bg-amber-50" },
  { title: "Completed", value: "1,050", iconColor: "bg-emerald-500", bgColor: "bg-emerald-50" },
  { title: "Cancelled", value: "0", iconColor: "bg-rose-500", bgColor: "bg-rose-50" },
];

export const DUMMY_ADMIN_APPOINTMENTS: IAdminAppointment[] = [
  {
    id: "1",
    bookingId: "BK-3SM-2026-001234",
    patient: "Rahul Ahmed",
    doctor: "Dr. Arjun Mehta",
    hospital: "Bangkok Heart Hospital",
    date: "Apr 14, 2026",
    time: "10:00 AM",
    type: "Video Consultation",
    payment: "Paid $130",
    status: "Confirmed",
    symptoms: "Chest discomfort and shortness of breath during physical activity.",
    timeline: [
      { status: "Booking Placed", active: true },
    ]
  },
  {
    id: "2",
    bookingId: "APT-2026-0512",
    patient: "Arif Rahman",
    doctor: "Dr. Sarah Ahmed",
    hospital: "Bangkok Heart Hospital",
    date: "May 15, 2026",
    time: "2:00 PM",
    type: "Video Consultation",
    payment: "Paid",
    status: "Upcoming",
    symptoms: "Regular cardiac screening.",
    timeline: [
      { status: "Booking Placed", active: true },
    ]
  },
  {
    id: "3",
    bookingId: "BK-2026-002110",
    patient: "Fatima Khatun",
    doctor: "Dr. Priya Sharma",
    hospital: "Apollo Fertility Center",
    date: "May 20, 2026",
    time: "11:30 AM",
    type: "Hospital Visit",
    payment: "Pending",
    status: "Pending",
    symptoms: "Initial fertility consultation.",
    timeline: [
      { status: "Booking Placed", active: true },
    ]
  },
];
