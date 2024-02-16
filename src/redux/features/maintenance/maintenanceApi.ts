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

    getAllMaintenanceData: builder.query({
      query: () => ({
        url: "/maintenance",
        method: "GET",
      }),
      providesTags: ["maintenance"],
    }),

    acceptMaintenanceRequest: builder.mutation({
      query: (id: string) => ({
        url: `/maintenance/accept-request/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["maintenance"],
    }),
  }),
});

export const {
  useRequestMaintenanceMutation,
  useGetMyMaintenanceDataQuery,
  useGetAllMaintenanceDataQuery,
  useAcceptMaintenanceRequestMutation,
} = maintenanceApi;
