import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const kycApi = createApi({
  reducerPath: 'kycReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: apiURL,
    credentials: 'include'
  }),
  tagTypes: ['kyc'],

  endpoints: builder => ({
    kyc: builder.mutation({
      query: ({ data, ID }) => ({
        url: `/store/kyc/step/${ID}`,
        method: 'PUT',
        body: data
      }),

      invalidatesTags: ['kyc']
    })
  })
});

export const { useKycMutation } = kycApi;
