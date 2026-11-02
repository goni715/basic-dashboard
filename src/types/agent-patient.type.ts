/* eslint-disable @typescript-eslint/no-explicit-any */

export type TAgentPatientStatus =
  | "submitted"
  | "under_review"
  | "confirmed"
  | "ongoing"
  | "completed"
  | "cancelled"
  | string;

export type TPaymentStatus = "paid" | "unpaid" | string;

export interface IAgentPatientTimeline {
  submittedAt?: string | null;
  underReviewAt?: string | null;
  confirmedAt?: string | null;
  ongoingAt?: string | null;
  completedAt?: string | null;
  cancelledAt?: string | null;
}

export interface IAgentPatientAgent {
  _id?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  profileImg?: string;
  [key: string]: any;
}

export interface IAgentPatientSubAgent {
  _id?: string;
  refCode?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  agencyName?: string;
  [key: string]: any;
}

export interface IAgentPatient {
  _id?: string;
  id?: string;
  caseId: string;
  agentUserId?: string;
  subAgentId?: string | null;
  fullName: string;
  phone?: string;
  age?: number;
  gender?: string;
  treatmentType?: string;
  symptoms?: string;
  preferredCountry?: string;
  budgetRange?: string;
  reports?: string[];
  status: TAgentPatientStatus;
  timeline?: IAgentPatientTimeline;
  createdAt?: string;
  updatedAt?: string;

  // Commission & Payment fields
  commissionFee?: number;
  paymentStatus?: TPaymentStatus;
  agentCommissionFee?: number;
  agentPaymentStatus?: TPaymentStatus;
  subAgentCommission?: number;
  subAgentCommissionFee?: number;
  subAgentPaymentStatus?: TPaymentStatus;
  totalCommissionFee?: number;
  totalCommission?: number;

  agent?: IAgentPatientAgent | null;
  subAgent?: IAgentPatientSubAgent | null;
  [key: string]: any;
}

export interface IAgentPatientPaginationMeta {
  page: number;
  limit: number;
  totalPages: number;
  total: number;
}

export interface IGetAgentPatientsResponse {
  success: boolean;
  message: string;
  meta?: IAgentPatientPaginationMeta;
  data: IAgentPatient[];
}

export interface IAgentPatientQueryParams {
  searchTerm?: string;
  status?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  [key: string]: any;
}

export interface IUpdateAgentCommissionPayload {
  patientId: string;
  agentUserId: string;
  agentCommissionFee: number;
}

export interface IUpdateSubAgentCommissionPayload {
  patientId: string;
  subAgentCommissionFee: number;
}

export interface IUpdateAgentPaymentStatusPayload {
  patientId: string;
  agentPaymentStatus: "paid" | "unpaid";
}

export interface IUpdateSubAgentPaymentStatusPayload {
  patientId: string;
  subAgentId: string;
  subAgentPaymentStatus: "paid" | "unpaid";
}
