/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../api/apiSlice";
import TagTypes from "@/constants/tagType.constant";
import { SuccessToast, ErrorToast } from "@/helpers/ValidationHelper";
import { IParam } from "@/types/global.type";
import {
  IGetAgentPatientsResponse,
  IAgentPatientQueryParams,
  IUpdateAgentCommissionPayload,
  IUpdateSubAgentCommissionPayload,
  IUpdateAgentPaymentStatusPayload,
  IUpdateSubAgentPaymentStatusPayload,
  IUpdateRevenuePayload,
} from "@/types/agent-patient.type";

export const agentPatientApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAgentPatients: builder.query<
      IGetAgentPatientsResponse,
      IAgentPatientQueryParams | IParam[] | Record<string, any> | void
    >({
      query: (args) => {
        const params = new URLSearchParams();
        if (args !== undefined && Array.isArray(args) && args.length > 0) {
          args.forEach((item: IParam) => {
            if (
              item.value !== undefined &&
              item.value !== null &&
              item.value !== "" &&
              item.value !== "all"
            ) {
              params.append(item.name, String(item.value));
            }
          });
        } else if (args && typeof args === "object") {
          Object.entries(args).forEach(([key, val]) => {
            if (
              val !== undefined &&
              val !== null &&
              val !== "" &&
              val !== "all"
            ) {
              params.append(key, String(val));
            }
          });
        }
        return {
          url: "/agent-patient/all-patients/by-admin",
          method: "GET",
          params: params,
        };
      },
      providesTags: [TagTypes.AGENT_PATIENTS],
    }),

    // 1. Update Agent Commission
    updateAgentCommission: builder.mutation<
      { success: boolean; message: string; data: any },
      IUpdateAgentCommissionPayload
    >({
      query: ({ patientId, agentCommissionPercentage }) => ({
        url: `/agent-patient/update-agent-commission/${patientId}`,
        method: "PATCH",
        body: {
          agentCommissionPercentage,
        },
      }),
      invalidatesTags: (result) => (result?.success ? [TagTypes.AGENT_PATIENTS] : []),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const res = await queryFulfilled;
          SuccessToast(
            res?.data?.message || "Agent commission updated successfully"
          );
        } catch (err: any) {
          const message =
            err?.error?.data?.message ||
            err?.message ||
            "Failed to update agent commission";
          ErrorToast(message);
        }
      },
    }),

    // 2. Update Sub-Agent Commission
    updateSubAgentCommission: builder.mutation<
      { success: boolean; message: string; data: any },
      IUpdateSubAgentCommissionPayload
    >({
      query: ({ patientId, subAgentCommissionPercentage }) => ({
        url: `/agent-patient/update-sub-agent-commission/${patientId}`,
        method: "PATCH",
        body: {
          subAgentCommissionPercentage,
        },
      }),
      invalidatesTags: (result) => (result?.success ? [TagTypes.AGENT_PATIENTS] : []),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const res = await queryFulfilled;
          SuccessToast(
            res?.data?.message || "Sub-agent commission updated successfully"
          );
        } catch (err: any) {
          const message =
            err?.error?.data?.message ||
            err?.message ||
            "Failed to update sub-agent commission";
          ErrorToast(message);
        }
      },
    }),

    // 3. Update Agent Payment Status
    updateAgentPaymentStatus: builder.mutation<
      { success: boolean; message: string; data: any },
      IUpdateAgentPaymentStatusPayload
    >({
      query: ({ patientId, agentPaymentStatus }) => ({
        url: `/agent-patient/update-agent-payment-status/${patientId}`,
        method: "PATCH",
        body: {
          agentPaymentStatus,
        },
      }),
      invalidatesTags: (result) => (result?.success ? [TagTypes.AGENT_PATIENTS] : []),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const res = await queryFulfilled;
          SuccessToast(
            res?.data?.message || "Agent payment status updated successfully"
          );
        } catch (err: any) {
          const message =
            err?.error?.data?.message ||
            err?.message ||
            "Failed to update agent payment status";
          ErrorToast(message);
        }
      },
    }),

    // 4. Update Sub-Agent Payment Status
    updateSubAgentPaymentStatus: builder.mutation<
      { success: boolean; message: string; data: any },
      IUpdateSubAgentPaymentStatusPayload
    >({
      query: ({ patientId, subAgentId, subAgentPaymentStatus }) => ({
        url: `/agent-patient/sub-agent-payment-status/${patientId}`,
        method: "PATCH",
        body: {
          subAgentId,
          subAgentPaymentStatus,
        },
      }),
      invalidatesTags: (result) => (result?.success ? [TagTypes.AGENT_PATIENTS] : []),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const res = await queryFulfilled;
          SuccessToast(
            res?.data?.message || "Sub-agent payment status updated successfully"
          );
        } catch (err: any) {
          const message =
            err?.error?.data?.message ||
            err?.message ||
            "Failed to update sub-agent payment status";
          ErrorToast(message);
        }
      },
    }),

    // 5. Update Revenue
    updateRevenue: builder.mutation<
      { success: boolean; message: string; data: any },
      IUpdateRevenuePayload
    >({
      query: ({ patientId, revenue }) => ({
        url: `/agent-patient/update-revenue/${patientId}`,
        method: "PATCH",
        body: {
          revenue,
        },
      }),
      invalidatesTags: (result: any) =>
        result?.success || result?.acknowledged || result?.data?.acknowledged
          ? [TagTypes.AGENT_PATIENTS]
          : [TagTypes.AGENT_PATIENTS],
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const res = await queryFulfilled;
          SuccessToast(
            res?.data?.message || "Revenue updated successfully"
          );
        } catch (err: any) {
          const message =
            err?.error?.data?.message ||
            err?.message ||
            "Failed to update revenue";
          ErrorToast(message);
        }
      },
    }),
  }),
});

export const {
  useGetAgentPatientsQuery,
  useUpdateAgentCommissionMutation,
  useUpdateSubAgentCommissionMutation,
  useUpdateAgentPaymentStatusMutation,
  useUpdateSubAgentPaymentStatusMutation,
  useUpdateRevenueMutation,
} = agentPatientApi;
