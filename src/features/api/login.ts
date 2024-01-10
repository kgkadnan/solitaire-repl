import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

export const loginApi = createApi({
  reducerPath: 'loginReducer',
  baseQuery: createBaseQuery(false),
  tagTypes: ['Login'],

  endpoints: builder => ({
    verifyLogin: builder.mutation({
      query: filter => ({
        url: `/store/auth/token`,
        method: 'POST', // Use the appropriate HTTP method
        body: filter // Modify this to match your API's payload
      }),
      invalidatesTags: ['Login']
    }),
    getAuthData: builder.query({
      query: token => ({
        url: '/store/auth',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    })
  })
});

export const { useVerifyLoginMutation, useGetAuthDataQuery } = loginApi;
