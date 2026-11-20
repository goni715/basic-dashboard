/* eslint-disable @typescript-eslint/no-explicit-any */
export type TSupportStatus = "open" | "in_progress" | "closed" | string;

export interface ISupportItem {
  _id: string;
  ticket?: string;
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  replyMessage?: string;
  replyAt?: string | null;
  status: TSupportStatus;
  createdAt?: string;
  updatedAt?: string;
}

// Backward compatibility alias
export type ISupport = ISupportItem;

export interface ISupportPaginationMeta {
  page: number;
  limit: number;
  totalPages: number;
  total: number;
}

export interface ISupportResponse {
  statusCode?: number;
  success: boolean;
  message: string;
  meta?: ISupportPaginationMeta;
  data: ISupportItem[];
}

export interface ISupportQueryParams {
  searchTerm?: string;
  status?: string;
  page?: number;
  limit?: number;
  [key: string]: any;
}
