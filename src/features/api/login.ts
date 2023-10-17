import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
} from '@reduxjs/toolkit/query/react';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

// Define the type for the base query function
type BaseQuery = BaseQueryFn<any, unknown, unknown>;

export const loginApi = createApi({
  reducerPath: 'loginReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: apiURL,
    credentials: 'include',
  }) as BaseQuery,
  tagTypes: ['Login'],

  endpoints: (builder) => ({
    verifyLogin: builder.mutation({
      query: (filter) => ({
        url: `/store/auth`,
        method: 'POST', // Use the appropriate HTTP method
        body: filter, // Modify this to match your API's payload
      }),
      invalidatesTags: ['Login'],
    }),
  }),
});

export const { useVerifyLoginMutation } = loginApi;
