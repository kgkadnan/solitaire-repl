import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

// Define the type for the base query function

export const productApi = createApi({
  reducerPath: 'productReducer',
  baseQuery: createBaseQuery(),
  tagTypes: ['Product'],

  endpoints: builder => ({
    getAllProduct: builder.query({
      query: ({ limit, url }) => ({
        url: `/salesperson/products?limit=${limit}&${url}`
      })
      // providesTags: ['Product']
    }),
    getProductCount: builder.query({
      query: ({ searchUrl = '' }) => ({
        url: `/salesperson/products?limit=1${
          searchUrl !== '' ? '&' + searchUrl : ''
        }`
      }),
      providesTags: ['Product']
    }),
    getProductByScanningBarcode: builder.query({
      query: ({ barcode = '', location = '' }) => {
        const url =
          location && location != 'All'
            ? `/salesperson/stone/${barcode}?location=${location}`
            : `/salesperson/stone/${barcode}`;
        return { url };
      },
      providesTags: ['Product']
    })
  })
});

export const {
  useGetAllProductQuery,
  useLazyGetProductByScanningBarcodeQuery,
  useLazyGetAllProductQuery,
  useGetProductCountQuery,
  useLazyGetProductCountQuery
} = productApi;
