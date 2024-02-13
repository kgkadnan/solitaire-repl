import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

export const forgotPasswordApi = createApi({
  reducerPath: 'forgotPasswordReducer',
  baseQuery: createBaseQuery(false),
  tagTypes: ['forgotPassword'],

  endpoints: builder => ({
    forgotPassword: builder.mutation({
      query: data => ({
        url: `/store/customers/sms/password-reset-otp/send`,
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
