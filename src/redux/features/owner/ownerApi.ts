/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../api/apiSlice";
import TagTypes from "@/constants/tagType.constant";
import { ErrorToast, SuccessToast } from "@/helpers/ValidationHelper";
import { IParam } from "@/types/global.type";
import { SetCreateOwnerError, SetUpdateOwnerError, SetDeleteOwnerError } from "./ownerSlice";

export const ownerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOwners: builder.query({
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
          url: "/owner/get-owners",
          method: "GET",
          params: params,
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.OWNERS],
    }),

    createOwner: builder.mutation({
      query: (data) => ({
        url: "/owner/create-owner",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.OWNERS];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          SuccessToast("Owner created successfully");
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            dispatch(SetCreateOwnerError("Something Went Wrong"));
          } else {
            dispatch(SetCreateOwnerError(message));
          }
        }
      },
    }),

    updateOwner: builder.mutation({
      query: ({ id, data }) => ({
        url: `/owner/update-owner/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.OWNERS];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          SuccessToast("Owner updated successfully");
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            dispatch(SetUpdateOwnerError("Something Went Wrong"));
          } else {
            dispatch(SetUpdateOwnerError(message));
          }
        }
      },
    }),

    deleteOwner: builder.mutation({
      query: (id) => ({
        url: `/owner/delete-owner/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.OWNERS];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          SuccessToast("Owner deleted successfully");
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            dispatch(SetDeleteOwnerError("Something Went Wrong"));
            ErrorToast("Something Went Wrong");
          } else {
            dispatch(SetDeleteOwnerError(message));
            ErrorToast(message);
          }
        }
      },
    }),
  }),
});

export const {
  useGetOwnersQuery,
  useCreateOwnerMutation,
  useUpdateOwnerMutation,
  useDeleteOwnerMutation,
} = ownerApi;
