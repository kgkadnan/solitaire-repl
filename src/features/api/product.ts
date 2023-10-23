import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
} from '@reduxjs/toolkit/query/react';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

// Define the type for the base query function
type BaseQuery = BaseQueryFn<any, unknown, unknown>;

export const productApi = createApi({
  reducerPath: 'productReducer',
  baseQuery: fetchBaseQuery({ baseUrl: apiURL }) as BaseQuery,
  tagTypes: ['Product'],

  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: ({ offset, limit, url }) => ({
        url: `/store/products?limit=${limit}&offset=${offset}&${url}`,
      }),
      providesTags: ['Product'],
    }),
    getProductCount: builder.query({
      query: ({ searchUrl = '' }) => ({
        url: `/store/products?limit=1&expand=collection&fields=id${
          searchUrl !== '' ? '&' + searchUrl : ''
        }`,
      }),
      providesTags: ['Product'],
    }),
  }),
});

export const { useGetAllProductQuery, useGetProductCountQuery } = productApi;
