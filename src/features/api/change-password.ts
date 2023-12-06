import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const apiURL = process.env.NEXT_PUBLIC_API_URL;

// const header =
export const changePasswordApi = createApi({
  reducerPath: 'changePasswordReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: apiURL,
    credentials: 'include'
  }),
  tagTypes: ['changePassword'],

  endpoints: builder => ({
    ChangePassword: builder.mutation({
      query: data => ({
        url: `change-password`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['changePassword']
    })
  })
});

export const { useChangePasswordMutation } = changePasswordApi;
