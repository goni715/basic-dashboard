/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IFaqItem {
  _id: string;
  id?: string;
  question: string;
  answer: string;
  category: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

export interface IFaqPaginationMeta {
  page: number;
  limit: number;
  totalPages: number;
  total: number;
}

export interface IGetFaqsResponse {
  success: boolean;
  message: string;
  meta?: IFaqPaginationMeta;
  data: IFaqItem[];
}

export interface ICreateFaqPayload {
  question: string;
  answer: string;
  category: string;
  isActive: boolean;
}

export interface IUpdateFaqPayload {
  id: string;
  data: Partial<ICreateFaqPayload>;
}

export interface IFaqQueryParams {
  searchTerm?: string;
  isActive?: boolean | string;
  page?: number;
  limit?: number;
  [key: string]: any;
}

// Legacy compatibility
export interface IAdminFaq {
  id: string;
  _id?: string;
  question: string;
  answer: string;
  category: string;
  status: string;
  isActive?: boolean;
}
