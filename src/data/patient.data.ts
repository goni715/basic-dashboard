import { IPatient } from "@/types/patient.type";

export const DUMMY_PATIENTS: IPatient[] = [
  {
    id: "1",
    name: "Arif Rahman",
    phone: "+880 1712-345678",
    email: "arif.rahman@email.com",
    country: "Bangladesh",
    medicalInfo: "B+, Cardiac history",
    lastActivity: "Today, 10:30 AM",
    status: "Active",
    avatar: "A",
  },
  {
    id: "2",
    name: "Rahul Ahmed",
    phone: "+880 1712-345679",
    email: "rahul.ahmed@email.com",
    country: "Bangladesh",
    medicalInfo: "Chest discomfort",
    lastActivity: "Apr 14, 2026",
    status: "Active",
    avatar: "R",
  },
  {
    id: "3",
    name: "Mohammed Rahman",
    phone: "+880 1712-345680",
    email: "rahman@example.com",
    country: "Bangladesh",
    medicalInfo: "Medicine request",
    lastActivity: "May 12, 2026",
    status: "Active",
    avatar: "M",
  },
  {
    id: "4",
    name: "Fatima Khatun",
    phone: "+880 1712-345681",
    email: "fatima@email.com",
    country: "Bangladesh",
    medicalInfo: "Follow-up required",
    lastActivity: "May 10, 2026",
    status: "Blocked",
    avatar: "F",
  }
];
