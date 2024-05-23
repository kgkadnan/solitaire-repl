import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

export const resetPasswordApi = createApi({
  reducerPath: 'resetPasswordReducer',
  baseQuery: createBaseQuery(),
  tagTypes: ['resetPassword'],

  endpoints: builder => ({
    resetPassword: builder.mutation({
      query: data => ({
        url: `store/customers/password-reset`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['resetPassword']
    })
  })
});

export const { useResetPasswordMutation } = resetPasswordApi;
