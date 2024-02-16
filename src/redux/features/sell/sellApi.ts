import { baseApi } from "../../api/baseApi";

const sellApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSell: builder.mutation({
      query: (data) => ({
        url: "/sales/order",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["bikes", "sell"],
    }),

    salesHistory: builder.query({
      query: (time) => ({
        url: `/sales/sales-history?time=${time}`,
        method: "GET",
      }),
      providesTags: ["sell"],
    }),
  }),
});

export const { useCreateSellMutation, useSalesHistoryQuery } = sellApi;
