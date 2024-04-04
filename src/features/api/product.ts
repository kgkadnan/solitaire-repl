import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

// Define the type for the base query function

export const productApi = createApi({
  reducerPath: 'productReducer',
  baseQuery: createBaseQuery(),
  tagTypes: ['Product'],

  endpoints: builder => ({
    getAllProduct: builder.query({
      query: ({ offset, limit, url }) => ({
        url: `/store/products?limit=${limit}&offset=${offset}&${url}`
      }),
      providesTags: ['Product']
    }),
    getProductCount: builder.query({
      query: ({ searchUrl = '' }) => ({
        url: `/store/products?limit=1&expand=variants&fields=id${
          searchUrl !== '' ? '&' + searchUrl : ''
        }`
      }),
      providesTags: ['Product']
    }),
    getProductById: builder.mutation({
      query: data => ({
        url: `/store/products/search`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Product']
    }),
    confirmProduct: builder.mutation({
      query: data => ({
        url: `/store/products/confirm`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Product']
    })
  })
});

export const {
  useGetAllProductQuery,
  useLazyGetAllProductQuery,
  useGetProductCountQuery,
  useLazyGetProductCountQuery,
  useConfirmProductMutation,
  useGetProductByIdMutation
} = productApi;
