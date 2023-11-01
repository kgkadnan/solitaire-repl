import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const apiURL = process.env.NEXT_PUBLIC_API_URL;

// const header =
export const cartApi = createApi({
  reducerPath: 'cartReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: apiURL,
    credentials: 'include',
    
  }),
  tagTypes: ['cart'],

  endpoints: (builder) => ({
    addCart: builder.mutation({
      query: (data) => ({
        url: `cart`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['cart'],
    }),
    getCart: builder.query({
      query: () => `cart`,
      providesTags: ['cart'],
    }),
    deleteCart: builder.mutation({
      query: (data) => ({
        url: `cart`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['cart'],
    }),
  }),
});

export const { useAddCartMutation, useGetCartQuery, useDeleteCartMutation } =
  cartApi;
