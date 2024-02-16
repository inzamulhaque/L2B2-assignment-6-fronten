import { baseApi } from "../../api/baseApi";

const maintenanceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    requestMaintenance: builder.mutation({
      query: (data) => ({
        url: "/maintenance",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["maintenance"],
    }),

    getMyMaintenanceData: builder.query({
      query: () => ({
        url: "/maintenance/my-maintenance-request",
        method: "GET",
      }),
      providesTags: ["maintenance"],
    }),
  }),
});

export const { useRequestMaintenanceMutation, useGetMyMaintenanceDataQuery } =
  maintenanceApi;
