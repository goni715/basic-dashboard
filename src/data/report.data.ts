import { IDoctorReport, IReportDetail } from "@/types/report.type";

export const DUMMY_DOCTOR_REPORTS: IDoctorReport[] = [
  { id: "1", name: "Cardiac Screening Report", patient: "Arif Rahman", date: "May 8, 2026", active: true },
  { id: "2", name: "ECG Report", patient: "Rahul Ahmed", date: "Apr 28, 2026", active: false },
  { id: "3", name: "Blood Test Results", patient: "Rahul Ahmed", date: "May 1, 2026", active: false },
  { id: "4", name: "Prescription", patient: "Mohammed Rahman", date: "Apr 25, 2026", active: false, pending: true },
];

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
