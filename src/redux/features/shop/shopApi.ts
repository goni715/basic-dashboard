/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../api/apiSlice";
import TagTypes from "@/constants/tagType.constant";
import { ErrorToast, SuccessToast } from "@/helpers/ValidationHelper";
import { IParam } from "@/types/global.type";

export const shopApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getShops: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args !== undefined && args.length > 0) {
                    args.forEach((item: IParam) => {
                        if (item.value) {
                            params.append(item.name, item.value);
                        }
                    });
                }
                return {
                    url: "/shop/get-shops",
                    method: "GET",
                    params: params,
                };
            },
            keepUnusedDataFor: 600,
            providesTags: [TagTypes.SHOPS],
        }),
        updateStaus: builder.mutation({
            query: ({ id, data }) => ({
                url: `/shop/update-shop-status/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (result) => {
                if (result?.success) {
                    return [TagTypes.SHOPS];
                }
                return [];
            },
            async onQueryStarted(_arg, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                    SuccessToast("Shop updated successfully");
                } catch (err: any) {
                    const status = err?.error?.status;
                    const message = err?.error?.data?.message || "Something Went Wrong";
                    if (status === 500) {
                        ErrorToast("Something Went Wrong");
                        return;
                    }
                    if (status !== 401) {
                        ErrorToast(message);
                    }
                }
            },
        }),
    }),
});

export const {
    useGetShopsQuery,
    useUpdateStausMutation,
} = shopApi;