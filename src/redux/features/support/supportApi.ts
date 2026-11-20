/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../api/apiSlice";
import TagTypes from "@/constants/tagType.constant";
import { IParam } from "@/types/global.type";
import { ISupportResponse, ISupportQueryParams } from "@/types/support.type";
import { SuccessToast, ErrorToast } from "@/helpers/ValidationHelper";

export const supportApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSupports: builder.query<
      ISupportResponse,
      ISupportQueryParams | IParam[] | Record<string, any> | void
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
          url: "/support/all-supports",
          method: "GET",
          params: params,
        };
      },
      providesTags: [TagTypes.SUPPORTS],
    }),

    updateSupportStatus: builder.mutation<
      any,
      { id: string; status: "open" | "in_progress" | "closed" | string }
    >({
      query: ({ id, status }) => ({
        url: `/support/update-status/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result) => {
        if (result?.success || result?.acknowledged) {
          return [TagTypes.SUPPORTS];
        }
        return [TagTypes.SUPPORTS];
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const res = await queryFulfilled;
          SuccessToast(res?.data?.message || "Support status is updated successfully.");
        } catch (err: any) {
          const message =
            err?.error?.data?.message ||
            err?.error?.data?.error ||
            "Failed to update support status";
          ErrorToast(message);
        }
      },
    }),
  }),
});

export const { useGetSupportsQuery, useUpdateSupportStatusMutation } = supportApi;
