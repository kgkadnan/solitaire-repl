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
    forgotPassword: builder.mutation({
      query: data => ({
        url: `/store/customers/password-token`,
        method: 'POST',
        body: data
      }),
      transformResponse: (response, meta) => {
        return { data: response, statusCode: meta?.response?.status };
      },
      invalidatesTags: ['forgotPassword']
    })
  })
});

export const { useForgotPasswordMutation } = forgotPasswordApi;
