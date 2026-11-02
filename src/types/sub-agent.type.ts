/* eslint-disable @typescript-eslint/no-explicit-any */
export type TSubAgentStatus = "active" | "inactive" | "blocked" | "pending" | string;

export interface ISubAgent {
  _id?: string;
  id?: string;
  refCode?: string;
  agentUserId?: string;
  fullName: string;
  agencyName?: string;
  email: string;
  phone?: string;
  joinedDate?: string;
  cases?: number;
  ongoing?: number;
  done?: number;
  earnings?: number;
  status: TSubAgentStatus;
  notes?: string;
  lastActiveAt?: string;
  initials?: string;
  profileImg?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

export interface ISubAgentPaginationMeta {
  page: number;
  limit: number;
  totalPages: number;
  total: number;
}

export interface IGetSubAgentsResponse {
  success: boolean;
  message: string;
  meta?: ISubAgentPaginationMeta;
  data: ISubAgent[];
}

export interface ISubAgentQueryParams {
  searchTerm?: string;
  status?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  [key: string]: any;
}

