import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

export const cartApi = createApi({
  reducerPath: 'cartReducer',
  baseQuery: createBaseQuery(),
  tagTypes: ['cart'],

  endpoints: builder => ({
    addCart: builder.mutation({
      query: data => ({
        url: `store/customers/me/cart`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['cart']
    }),
    getCart: builder.query({
      query: ({ page }) => `store/customers/me/cart?page=${page}`,
      providesTags: ['cart']
    }),
    deleteCart: builder.mutation({
      query: data => ({
        url: `store/customers/me/cart`,
        method: 'DELETE',
        body: data
      }),
      invalidatesTags: ['cart']
    })
  })
});

export const {
  useAddCartMutation,
  useGetCartQuery,
  useLazyGetCartQuery,
  useDeleteCartMutation
} = cartApi;
