import { IAdminReportStat, IAdminReport } from "@/types/admin-report.type";

export const DUMMY_ADMIN_REPORT_STATS: IAdminReportStat[] = [
  { title: "Total Reports", value: "4", iconColor: "bg-blue-500", bgColor: "bg-blue-100" },
  { title: "Pending Verification", value: "2", iconColor: "bg-amber-500", bgColor: "bg-amber-100" },
  { title: "Verified Reports", value: "2", iconColor: "bg-emerald-500", bgColor: "bg-emerald-100" },
  { title: "Rejected Reports", value: "0", iconColor: "bg-rose-500", bgColor: "bg-rose-100" },
];

export const DUMMY_ADMIN_REPORTS: IAdminReport[] = [
  {
    id: "1",
    reportName: "Cardiac Screening Report",
    reportType: "Cardiac Screening",
    patient: "Arif Rahman",
    hospital: "Bangkok Heart Hospital, Thailand",
    doctor: "Dr. Sarah Ahmed",
    uploadDate: "May 10, 2026",
    status: "Verified",
    fileSize: "PDF - 2.4 MB",
    patientInfo: {
      dob: "Mar 15, 1986",
      age: "38 years",
      gender: "Male"
    },
    relatedReports: ["Blood Test Results"]
  },
  {
    id: "2",
    reportName: "Blood Test Results",
    reportType: "Lab Report",
    patient: "Arif Rahman",
    hospital: "Bangkok Heart Hospital",
    doctor: "Dr. Sarah Ahmed",
    uploadDate: "May 1, 2026",
    status: "Verified",
    fileSize: "PDF - 1.1 MB",
    patientInfo: {
      dob: "Mar 15, 1986",
      age: "38 years",
      gender: "Male"
    },
    relatedReports: ["Cardiac Screening Report"]
  },
  {
    id: "3",
    reportName: "ECG Report",
    reportType: "Diagnostic",
    patient: "Rahul Ahmed",
    hospital: "Bangkok Heart Hospital",
    doctor: "Dr. Arjun Mehta",
    uploadDate: "Apr 28, 2026",
    status: "Pending",
    fileSize: "PDF - 3.5 MB",
    patientInfo: {
      dob: "Jan 12, 1980",
      age: "46 years",
      gender: "Male"
    },
    relatedReports: []
  },
  {
    id: "4",
    reportName: "Prescription",
    reportType: "Prescription",
    patient: "Mohammed Rahman",
    hospital: "Not Assigned",
    doctor: "Not Assigned",
    uploadDate: "Apr 25, 2026",
    status: "Pending",
    fileSize: "PDF - 0.5 MB",
    patientInfo: {
      dob: "Aug 05, 1990",
      age: "35 years",
      gender: "Male"
    },
    relatedReports: []
  },
];
