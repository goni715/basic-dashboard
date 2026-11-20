/* eslint-disable @typescript-eslint/no-explicit-any */
export type TAgentStatus = "active" | "pending" | "blocked" | string;
export type TAgentApprovalStatus = "approved" | "pending" | "rejected" | string;

export interface ICreateAgentPayload {
  fullName: string;
  email: string;
  phone: string;
  agencyName: string;
  password: string;
}

export interface IAgent {
  _id?: string;
  id?: string;
  userId?: string;
  agencyName?: string;
  fullName: string;
  email: string;
  phone?: string;
  profileImg?: string;
  status: TAgentStatus;
  approvalStatus: TAgentApprovalStatus;
  userStatus?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

export interface IAgentPaginationMeta {
  page: number;
  limit: number;
  totalPages: number;
  total: number;
}

export interface IGetAgentsResponse {
  success: boolean;
  message: string;
  meta?: IAgentPaginationMeta;
  data: IAgent[];
}

export interface IAgentQueryParams {
  searchTerm?: string;
  status?: string;
  approvalStatus?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  [key: string]: any;
}
