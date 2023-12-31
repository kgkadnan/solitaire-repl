import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

export const kycApi = createApi({
  reducerPath: 'kycReducer',
  baseQuery: createBaseQuery(),
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
