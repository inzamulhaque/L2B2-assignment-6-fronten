import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginCredential) => ({
        url: "/auth/login",
        method: "POST",
        body: loginCredential,
      }),
    }),
    signup: builder.mutation({
      query: (signupCredential) => ({
        url: "/users",
        method: "POST",
        body: signupCredential,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
