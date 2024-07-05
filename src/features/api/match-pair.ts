import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

// Define the type for the base query function

export const matchingPairApi = createApi({
  reducerPath: 'matchingPairApi',
  baseQuery: createBaseQuery(),
  tagTypes: ['MatchingPair'],

  endpoints: builder => ({
    getAllMatchingPair: builder.query({
      query: ({ offset, limit, url }) => ({
        url: `/store/products-matching-pair?limit=${limit}&offset=${offset}&expand=variants&${url}`
      })
    }),
    getMatchingPairCount: builder.query({
      query: ({ searchUrl = '' }) => ({
        url: `/store/products-matching-pair?limit=1&expand=variants&fields=id${
          searchUrl !== '' ? '&' + searchUrl : ''
        }`
      }),
      providesTags: ['MatchingPair']
    }),
    getSimilarMatchingPair: builder.query({
      query: ({ product_id, matching_product_id }) => ({
        url: `/store/similar-product?product_id=${product_id}&matching_pair_product_id=${matching_product_id}`
      }),
      providesTags: ['MatchingPair']
    })
  })
});

export const {
  useLazyGetAllMatchingPairQuery,
  useGetMatchingPairCountQuery,
  useLazyGetMatchingPairCountQuery,
  useLazyGetSimilarMatchingPairQuery
} = matchingPairApi;
