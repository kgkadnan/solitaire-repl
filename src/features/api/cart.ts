import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const cartApi = createApi({
  reducerPath: 'cartReducer',
  baseQuery: fetchBaseQuery({ baseUrl: apiURL }),
  tagTypes: ['cart'],

  endpoints: (builder) => ({
    addCart: builder.mutation({
      query: (data) => ({
        url: `cart`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useAddCartMutation } = cartApi;
