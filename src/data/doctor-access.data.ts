import { IDoctorAccess } from "@/types/doctor-access.type";

export const DUMMY_DOCTOR_ACCESS: IDoctorAccess[] = [
  {
    id: "1",
    name: "Dr. Arjun Mehta",
    email: "arjun.mehta@gmail.com",
    specialty: "Cardiology",
    hospital: "Bangkok Heart Hospital",
    permissions: 4,
    status: "Active",
    lastLogin: "Today, 9:20 AM",
    created: "Jan 15, 2026",
    avatar: "A"
  },
  {
    id: "2",
    name: "Dr. Priya Sharma",
    email: "priya.sharma@gmail.com",
    specialty: "IVF & Fertility",
    hospital: "Apollo Fertility Center",
    permissions: 3,
    status: "Invited",
    lastLogin: "Never",
    created: "Feb 10, 2026",
    avatar: "P"
  },
  {
    id: "3",
    name: "Dr. Sophia Rahman",
    email: "sophia.rahman@gmail.com",
    specialty: "Orthopedics",
    hospital: "United Hospital Dhaka",
    permissions: 2,
    status: "Disabled",
    lastLogin: "May 10, 2026",
    created: "Mar 05, 2026",
    avatar: "S"
  }
];
