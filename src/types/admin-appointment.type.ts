/* eslint-disable @typescript-eslint/no-explicit-any */

export type TAppointmentStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled"
  | string;

export interface IAdminAppointmentStat {
  title: string;
  value: string;
  iconColor: string;
  bgColor: string;
}

export interface IAdminAppointment {
  _id?: string;
  id?: string;
  appointmentCode?: string;
  patientName?: string;
  patientEmail?: string;
  patientPhone?: string;
  doctorUserId?: string;
  doctorName?: string;
  doctorEmail?: string;
  doctorPhone?: string;
  doctorProfileImg?: string;
  doctorTitle?: string;
  doctorSpecialization?: string;
  doctorHospital?: string;
  doctorDesignation?: string;
  appointmentDate?: string;
  schedule?: string;
  problem?: string;
  bloodGroup?: string | null;
  dateOfBirth?: string | null;
  status: TAppointmentStatus;
  serialNumber?: number;
  cancelReason?: string | null;
  doctorNotes?: string | null;
  createdAt?: string;
  updatedAt?: string;

  // Legacy fallback compatibility
  bookingId?: string;
  patient?: string;
  doctor?: string;
  hospital?: string;
  date?: string;
  time?: string;
  type?: string;
  payment?: string;
  symptoms?: string;
  timeline?: { status: string; date?: string; active: boolean }[];
  [key: string]: any;
}

export interface IAppointmentPaginationMeta {
  page: number;
  limit: number;
  totalPages: number;
  total: number;
}

export interface IGetAppointmentsResponse {
  success: boolean;
  message: string;
  meta?: IAppointmentPaginationMeta;
  data: IAdminAppointment[];
}

export interface IAppointmentStatsData {
  total: number;
  pending: number;
  completed: number;
  confirmed: number;
  cancelled: number;
}

export interface IGetAppointmentStatsResponse {
  success: boolean;
  message: string;
  data: IAppointmentStatsData;
}

export interface IAppointmentQueryParams {
  searchTerm?: string;
  status?: string;
  appointmentDate?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  [key: string]: any;
}
