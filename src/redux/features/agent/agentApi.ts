/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../api/apiSlice";
import TagTypes from "@/constants/tagType.constant";
import { IParam } from "@/types/global.type";
import {
  IGetAgentsResponse,
  IAgentQueryParams,
  ICreateAgentPayload,
} from "@/types/agent.type";
import { SuccessToast, ErrorToast } from "@/helpers/ValidationHelper";

export const agentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAgents: builder.query<
      IGetAgentsResponse,
      IAgentQueryParams | IParam[] | Record<string, any> | void
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
          url: "/agent/all-agents",
          method: "GET",
          params: params,
        };
      },
      providesTags: [TagTypes.AGENTS],
    }),

    createAgent: builder.mutation<
      { success: boolean; message: string; data: any },
      ICreateAgentPayload
    >({
      query: (data) => ({
        url: "/agent/create-agent",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.AGENTS];
        }
        return [TagTypes.AGENTS];
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const res = await queryFulfilled;
          SuccessToast(res?.data?.message || "Agent is created successfully");
        } catch (err: any) {
          const message =
            err?.error?.data?.message ||
            err?.error?.data?.error ||
            "Failed to create agent";
          ErrorToast(message);
        }
      },
    }),
  }),
});

export const { useGetAgentsQuery, useCreateAgentMutation } = agentApi;
