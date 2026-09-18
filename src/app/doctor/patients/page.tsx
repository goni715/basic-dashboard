"use client";

import { DUMMY_DOCTOR_PATIENTS as patients } from "@/data/doctor-patient.data";
import PatientLeftPane from "@/components/doctor/patients/PatientLeftPane";
import PatientRightPane from "@/components/doctor/patients/PatientRightPane";

export default function PatientsPage() {
  return (
    <div className="flex flex-col xl:flex-row gap-6 pb-12 h-[calc(100vh-8rem)]">
      <PatientLeftPane patients={patients} />
      <PatientRightPane />
    </div>
  );
}
