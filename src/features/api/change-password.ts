import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

// const header =
export const changePasswordApi = createApi({
  reducerPath: 'changePasswordReducer',
  baseQuery: createBaseQuery(),
  tagTypes: ['changePassword'],

  endpoints: builder => ({
    ChangePassword: builder.mutation({
      query: data => ({
        url: `change-password`,
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${data.token}`
        }
      }),
      invalidatesTags: ['changePassword']
    })
  })
});

export const { useChangePasswordMutation } = changePasswordApi;
