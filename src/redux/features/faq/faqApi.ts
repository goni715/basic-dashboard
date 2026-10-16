/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../api/apiSlice";
import TagTypes from "@/constants/tagType.constant";
import { ErrorToast, SuccessToast } from "@/helpers/ValidationHelper";
import { IParam } from "@/types/global.type";
import { SetCreateFaqError, SetUpdateFaqError, SetDeleteFaqError } from "./faqSlice";

export const faqApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFaqs: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args !== undefined && args.length > 0) {
                    args.forEach((item: IParam) => {
                        if (item.value !== undefined && item.value !== null && item.value !== "") {
                            params.append(item.name, String(item.value));
                        }
                    });
                }
                return {
                    url: "/faq/faqs",
                    method: "GET",
                    params: params,
                };
            },
            providesTags: [TagTypes.faqs],
        }),
        createFaq: builder.mutation({
            query: (data) => ({
                url: "/faq/create-faq",
                method: "POST",
                body: data,
            }),
            invalidatesTags: (result) => {
                if (result?.success) {
                    return [TagTypes.faqs];
                }
                return [];
            },
            async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                    SuccessToast("FAQ created successfully");
                } catch (err: any) {
                    const status = err?.error?.status;
                    const message = err?.error?.data?.message || "Something Went Wrong";
                    if (status === 500) {
                        dispatch(SetCreateFaqError("Something Went Wrong"));
                        return;
                    }
                    if (status !== 401) {
                        dispatch(SetCreateFaqError(message));
                    }
                }
            },
        }),
        updateFaq: builder.mutation({
            query: ({ id, data }) => ({
                url: `/faq/update-faq/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (result) => {
                if (result?.success) {
                    return [TagTypes.faqs];
                }
                return [];
            },
            async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                    SuccessToast("FAQ updated successfully");
                } catch (err: any) {
                    const status = err?.error?.status;
                    const message = err?.error?.data?.message || "Something Went Wrong";
                    if (status === 500) {
                        dispatch(SetUpdateFaqError("Something Went Wrong"));
                        return;
                    }
                    if (status !== 401) {
                        dispatch(SetUpdateFaqError(message));
                    }
                }
            },
        }),
        deleteFaq: builder.mutation({
            query: (id) => ({
                url: `/faq/delete-faq/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result) => {
                if (result?.success) {
                    return [TagTypes.faqs];
                }
                return [];
            },
            async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                    SuccessToast("FAQ deleted successfully");
                } catch (err: any) {
                    const status = err?.error?.status;
                    const message = err?.error?.data?.message || "Something Went Wrong";
                    if (status === 500) {
                        dispatch(SetDeleteFaqError("Something Went Wrong"));
                        return;
                    }
                    if (status !== 401) {
                        dispatch(SetDeleteFaqError(message));
                    }
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