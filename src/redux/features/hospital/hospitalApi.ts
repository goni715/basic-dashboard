/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../api/apiSlice";
import TagTypes from "@/constants/tagType.constant";
import { ErrorToast, SuccessToast } from "@/helpers/ValidationHelper";
import { IParam } from "@/types/global.type";
import {
  IGetHospitalsResponse,
  IHospitalQueryParams,
} from "@/types/hospital.type";
import {
  SetCreateHospitalError,
  SetUpdateHospitalError,
  SetDeleteHospitalError,
} from "./hospitalSlice";

export const hospitalApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHospitals: builder.query<
      IGetHospitalsResponse,
      IHospitalQueryParams | IParam[] | Record<string, any> | void
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
          url: "/hospital/get-hospitals",
          method: "GET",
          params: params,
        };
      },
      providesTags: [TagTypes.HOSPITALS],
    }),

    getHospitalById: builder.query({
      query: (hospitalId: string) => ({
        url: `/hospital/get-hospital/${hospitalId}`,
        method: "GET",
      }),
      providesTags: [TagTypes.HOSPITALS],
    }),

    createHospital: builder.mutation({
      query: (data) => {
        let body = data;
        if (!(data instanceof FormData) && data?.image instanceof File) {
          const formData = new FormData();
          Object.keys(data).forEach((key) => {
            if (data[key] !== undefined && data[key] !== null) {
              formData.append(key, data[key]);
            }
          });
          body = formData;
        }
        return {
          url: "/hospital/create-hospital",
          method: "POST",
          body,
        };
      },
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.HOSPITALS];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          SuccessToast("Hospital added successfully");
        } catch (err: any) {
          const status = err?.error?.status;
          const message =
            err?.error?.data?.message ||
            err?.error?.data?.error ||
            "Something Went Wrong";
          if (status === 500) {
            dispatch(SetCreateHospitalError("Something Went Wrong"));
            ErrorToast("Something Went Wrong");
          } else {
            dispatch(SetCreateHospitalError(message));
            ErrorToast(message);
          }
        }
      },
    }),

    updateHospital: builder.mutation({
      query: ({ id, data }) => {
        let body = data;
        if (!(data instanceof FormData) && data?.image instanceof File) {
          const formData = new FormData();
          Object.keys(data).forEach((key) => {
            if (data[key] !== undefined && data[key] !== null) {
              formData.append(key, data[key]);
            }
          });
          body = formData;
        }
        return {
          url: `/hospital/update-hospital/${id}`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.HOSPITALS];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          SuccessToast("Hospital updated successfully");
        } catch (err: any) {
          const status = err?.error?.status;
          const message =
            err?.error?.data?.message ||
            err?.error?.data?.error ||
            "Something Went Wrong";
          if (status === 500) {
            dispatch(SetUpdateHospitalError("Something Went Wrong"));
            ErrorToast("Something Went Wrong");
          } else {
            dispatch(SetUpdateHospitalError(message));
            ErrorToast(message);
          }
        }
      },
    }),

    deleteHospital: builder.mutation({
      query: (id) => ({
        url: `/hospital/delete-hospital/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.HOSPITALS];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          SuccessToast("Hospital deleted successfully");
        } catch (err: any) {
          const status = err?.error?.status;
          const message =
            err?.error?.data?.message ||
            err?.error?.data?.error ||
            "Something Went Wrong";
          if (status === 500) {
            dispatch(SetDeleteHospitalError("Something Went Wrong"));
            ErrorToast("Something Went Wrong");
          } else {
            dispatch(SetDeleteHospitalError(message));
            ErrorToast(message);
          }
        }
      },
    }),

    changeHospitalStatus: builder.mutation<
      { success: boolean; message: string; data: any },
      {
        hospitalId: string;
        status: "published" | "draft" | "archive";
      }
    >({
      query: ({ hospitalId, status }) => ({
        url: `/hospital/update-hospital/${hospitalId}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.HOSPITALS];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const res = await queryFulfilled;
          SuccessToast(
            res?.data?.message || "Hospital status updated successfully"
          );
        } catch (err: any) {
          const message =
            err?.error?.data?.message ||
            err?.error?.data?.error ||
            "Failed to update hospital status";
          ErrorToast(message);
        }
      },
    }),
  }),
});

export const {
  useGetHospitalsQuery,
  useGetHospitalByIdQuery,
  useCreateHospitalMutation,
  useUpdateHospitalMutation,
  useDeleteHospitalMutation,
  useChangeHospitalStatusMutation,
} = hospitalApi;
