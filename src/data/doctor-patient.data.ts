import { IDoctorPatient } from "@/types/doctor-patient.type";

export const DUMMY_DOCTOR_PATIENTS: IDoctorPatient[] = [
  { id: "1", name: "Rahul Ahmed", date: "Apr 14, 2026", note: "Cardiac follow-up", active: true },
  { id: "2", name: "Arif Rahman", date: "May 15, 2026", note: "Cardiac screening", active: false },
  { id: "3", name: "Mohammed Rahman", date: "May 12, 2026", note: "Medicine follow-up", active: false },
  { id: "4", name: "Fatima Khatun", date: "May 20, 2026", note: "Fertility consultation", active: false },
];
