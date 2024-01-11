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
      transformResponse: (response, meta) => {
        return { data: response, statusCode: meta?.response?.status };
      },
      invalidatesTags: ['kyc']
    }),
    getKycDetail: builder.query({
      query: () => ({
        url: `/store/kyc`,
        method: 'GET'
      })
      // invalidatesTags: ['kyc']
    }),
    resetKyc: builder.mutation({
      query: () => ({
        url: `/store/kyc/restart`,
        method: 'PUT'
      }),
      transformResponse: (response, meta) => {
        return { data: response, statusCode: meta?.response?.status };
      },
      invalidatesTags: ['kyc']
    })
  })
});

export const { useKycMutation, useGetKycDetailQuery, useResetKycMutation } =
  kycApi;
