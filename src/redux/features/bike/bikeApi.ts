import { baseApi } from "../../api/baseApi";

const bikeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBikes: builder.query({
      query: (querys) => {
        let query = {};

        if (querys) {
          query = { search: querys };
        }

        return {
          url: "/bikes",
          method: "GET",
          params: query,
        };
      },
      providesTags: ["bikes"],
    }),
    getBikeById: builder.query({
      query: (id: string) => {
        return {
          url: `/bikes/${id}`,
          method: "GET",
        };
      },
      providesTags: ["bikes"],
    }),
    addBike: builder.mutation({
      query: (bike) => ({
        url: "/bikes",
        method: "POST",
        body: bike,
      }),
      invalidatesTags: ["bikes"],
    }),

    editBike: builder.mutation({
      query: (details) => {
        return {
          url: `/bikes/update-bike/${details._id}`,
          method: "PATCH",
          body: details,
        };
      },
      invalidatesTags: ["bikes"],
    }),

    deleteOneBike: builder.mutation({
      query: (bikeId) => ({
        url: "/bikes/bulk-remove",
        method: "DELETE",
        body: { ids: [bikeId] },
      }),
      invalidatesTags: ["bikes"],
    }),
    deleteBulkBike: builder.mutation({
      query: (bikeIds: string[]) => ({
        url: "/bikes/bulk-remove",
        method: "DELETE",
        body: { ids: bikeIds },
      }),
      invalidatesTags: ["bikes"],
    }),
  }),
});

export const {
  useGetAllBikesQuery,
  useGetBikeByIdQuery,
  useAddBikeMutation,
  useEditBikeMutation,
  useDeleteOneBikeMutation,
  useDeleteBulkBikeMutation,
} = bikeApi;
