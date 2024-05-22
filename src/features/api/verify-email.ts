import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

export const verifyEmailApi = createApi({
  reducerPath: 'verifyEmailReducer',
  baseQuery: createBaseQuery(),
  tagTypes: ['verifyEmail'],

  endpoints: builder => ({
    verifyEmail: builder.mutation({
      query: data => ({
        url: `store/customers/email/verify`,
        method: 'POST',
        body: data
      }),
      transformResponse: (response, meta) => {
        return { data: response, statusCode: meta?.response?.status };
      },
      invalidatesTags: ['verifyEmail']
    })
  })
});

export const { useVerifyEmailMutation } = verifyEmailApi;
