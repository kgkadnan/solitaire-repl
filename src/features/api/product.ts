import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn
} from '@reduxjs/toolkit/query/react';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

// Define the type for the base query function
type BaseQuery = BaseQueryFn<any, unknown, unknown>;

export const productApi = createApi({
  reducerPath: 'productReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: apiURL,
    credentials: 'include'
  }) as BaseQuery,
  tagTypes: ['Product'],

  endpoints: builder => ({
    getAllProduct: builder.query({
      query: ({ offset, limit, url }) => ({
        // query: ({ url }) => ({
        url: `/store/products?limit=${limit}&offset=${offset}&${url}`
        // url: `/store/products?${url}`,
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
    confirmProduct: builder.mutation({
      query: data => ({
        url: `confirm-stone`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Product']
    })
  })
});

export const {
  useGetAllProductQuery,
  useGetProductCountQuery,
  useConfirmProductMutation
} = productApi;
