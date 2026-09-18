import { IPrescription } from "@/types/prescription.type";

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
