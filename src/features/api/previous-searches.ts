import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

// Define the type for the base query function
export const previousSearchApi = createApi({
  reducerPath: 'previousSearchReducer',
  baseQuery: createBaseQuery(),
  tagTypes: ['PreviousSearch'],
  endpoints: builder => ({
    getAllPreviousSearches: builder.query({
      query: ({ limit, offset, searchUrl = '', searchByName }) => ({
        url: `previous-search?limit=${limit}&offset=${offset}&name=${searchByName}${searchUrl}`,
        method: 'GET'
      }),
      providesTags: ['PreviousSearch']
    }),
    getPreviousSearchList: builder.query({
      query: searchByName => `previous-search-list?name=${searchByName}`,
      providesTags: ['PreviousSearch']
    }),
    getSpecificPrevious: builder.query({
      query: ({ id }) => `previous-search?id=${id}`,
      providesTags: ['PreviousSearch']
    }),
    addPreviousSearch: builder.mutation({
      query: data => ({
        url: `previous-search`,
        method: 'POST',
        body: data
      })
    }),
    deletePreviousSearch: builder.mutation({
      query: filter => ({
        url: `previous-search`,
        method: 'DELETE', // Use the appropriate HTTP method
        body: filter // Modify this to match your API's payload
      }),
      invalidatesTags: ['PreviousSearch']
    })
  })
});

export const {
  useGetAllPreviousSearchesQuery,
  useGetSpecificPreviousQuery,
  useGetPreviousSearchListQuery,
  useAddPreviousSearchMutation,
  useDeletePreviousSearchMutation
} = previousSearchApi;
