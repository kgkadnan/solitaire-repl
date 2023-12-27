import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const forgotPasswordApi = createApi({
  reducerPath: 'forgotPasswordReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: apiURL,
    credentials: 'include'
  }),
  tagTypes: ['forgotPassword'],

  endpoints: builder => ({
    ForgotPassword: builder.mutation({
      query: data => ({
        url: `/store/customers/password-token`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['forgotPassword']
    })
  })
});

export const { useForgotPasswordMutation } = forgotPasswordApi;
