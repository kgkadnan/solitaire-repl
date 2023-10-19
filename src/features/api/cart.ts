import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const apiURL = process.env.NEXT_PUBLIC_API_URL;

// const header =
export const cartApi = createApi({
  reducerPath: 'cartReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: apiURL,
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6ImN1c18wMUhEMFI2NFZHQThLNFcyNkFORlZDUTQ1TSIsImRvbWFpbiI6InN0b3JlIiwiaWF0IjoxNjk3NjExNzEzLCJleHAiOjE3MDAyMDM3MTN9.X_ETyZIozIhg5bm7kcu2jRxG500sCHfl98eESyBQtHo',
    },
  }),
  tagTypes: ['cart'],

  endpoints: (builder) => ({
    addCart: builder.mutation({
      query: (data) => ({
        url: `cart`,
        method: 'POST',
        body: data,
      }),
    }),
    getCart: builder.query({
      query: () => `cart`,
      providesTags: ['cart'],
    }),
    deleteCart: builder.mutation({
      query: (data) => ({
        url: `carts`,
        method: 'DELETE',
        body: data,
      }),
    }),
  }),
});

export const { useAddCartMutation, useGetCartQuery, useDeleteCartMutation } =
  cartApi;
