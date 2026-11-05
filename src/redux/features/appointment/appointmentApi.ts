/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../api/apiSlice";
import TagTypes from "@/constants/tagType.constant";
import { IParam } from "@/types/global.type";
import {
  IGetAppointmentsResponse,
  IGetAppointmentStatsResponse,
  IAppointmentQueryParams,
} from "@/types/admin-appointment.type";

export const appointmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAppointments: builder.query<
      IGetAppointmentsResponse,
      IAppointmentQueryParams | IParam[] | Record<string, any> | void
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
          url: "/appointment/all-appointments",
          method: "GET",
          params: params,
        };
      },
      providesTags: [TagTypes.APPOINTMENTS],
    }),

    getAppointmentStats: builder.query<IGetAppointmentStatsResponse, void>({
      query: () => ({
        url: "/appointment/stats",
        method: "GET",
      }),
      providesTags: [TagTypes.APPOINTMENTS],
    }),
  }),
});

export const { useGetAppointmentsQuery, useGetAppointmentStatsQuery } =
  appointmentApi;
