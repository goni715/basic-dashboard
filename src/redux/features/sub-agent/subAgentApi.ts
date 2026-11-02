/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../api/apiSlice";
import TagTypes from "@/constants/tagType.constant";
import { IParam } from "@/types/global.type";
import {
  IGetSubAgentsResponse,
  ISubAgentQueryParams,
} from "@/types/sub-agent.type";

export const subAgentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubAgents: builder.query<
      IGetSubAgentsResponse,
      ISubAgentQueryParams | IParam[] | Record<string, any> | void
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
          url: "/referral-partner/sub-agents",
          method: "GET",
          params: params,
        };
      },
      providesTags: [TagTypes.SUB_AGENTS],
    }),
  }),
});

export const { useGetSubAgentsQuery } = subAgentApi;

