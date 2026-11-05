/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../api/apiSlice";
import TagTypes from "@/constants/tagType.constant";
import { ErrorToast, SuccessToast } from "@/helpers/ValidationHelper";
import { IParam } from "@/types/global.type";
import {
  IGetFaqsResponse,
  ICreateFaqPayload,
  IUpdateFaqPayload,
  IFaqQueryParams,
} from "@/types/admin-faq.type";
import {
  SetCreateFaqError,
  SetUpdateFaqError,
  SetDeleteFaqError,
} from "./faqSlice";

export const faqApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFaqs: builder.query<
      IGetFaqsResponse,
      IFaqQueryParams | IParam[] | Record<string, any> | void
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
          url: "/faq/all-faqs",
          method: "GET",
          params: params,
        };
      },
      providesTags: [TagTypes.faqs],
    }),

    createFaq: builder.mutation<
      { success: boolean; message: string; data: any },
      ICreateFaqPayload
    >({
      query: (data) => ({
        url: "/faq/create-faq",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => (result?.success ? [TagTypes.faqs] : []),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          SuccessToast(res?.data?.message || "FAQ created successfully");
        } catch (err: any) {
          const message =
            err?.error?.data?.message ||
            err?.message ||
            "Something Went Wrong";
          ErrorToast(message);
          dispatch(SetCreateFaqError(message));
        }
      },
    }),

    updateFaq: builder.mutation<
      { success: boolean; message: string; data: any },
      IUpdateFaqPayload
    >({
      query: ({ id, data }) => ({
        url: `/faq/update-faq/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) => (result?.success ? [TagTypes.faqs] : []),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          SuccessToast(res?.data?.message || "FAQ updated successfully");
        } catch (err: any) {
          const message =
            err?.error?.data?.message ||
            err?.message ||
            "Something Went Wrong";
          ErrorToast(message);
          dispatch(SetUpdateFaqError(message));
        }
      },
    }),

    deleteFaq: builder.mutation<
      { success: boolean; message: string; data: any },
      string
    >({
      query: (id) => ({
        url: `/faq/delete-faq/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => (result?.success ? [TagTypes.faqs] : []),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          SuccessToast(res?.data?.message || "FAQ deleted successfully");
        } catch (err: any) {
          const message =
            err?.error?.data?.message ||
            err?.message ||
            "Something Went Wrong";
          ErrorToast(message);
          dispatch(SetDeleteFaqError(message));
        }
      },
    }),
  }),
});

export const {
  useGetFaqsQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqApi;
