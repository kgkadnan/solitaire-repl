import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn
} from '@reduxjs/toolkit/query/react';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

// Define the type for the base query function
type BaseQuery = BaseQueryFn<any, unknown, unknown>;

export const registerApi = createApi({
  reducerPath: 'registerReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: apiURL,
    credentials: 'include'
  }) as BaseQuery,
  tagTypes: ['Register'],

  endpoints: builder => ({
    register: builder.mutation({
      query: data => ({
        url: `/store/customers`,
        method: 'POST', // Use the appropriate HTTP method
        body: data // Modify this to match your API's payload
      }),
      invalidatesTags: ['Register']
    })
  })
});

export const { useRegisterMutation } = registerApi;
