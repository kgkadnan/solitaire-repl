import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

export const savedSearchesApi = createApi({
  reducerPath: 'savedSearchReducer',
  baseQuery: createBaseQuery(),
  tagTypes: ['SavedSearch'],

  endpoints: builder => ({
    getAllSavedSearches: builder.query({
      query: ({ limit, offset, searchByName, dateSearchUrl }) =>
        `saved-search?limit=${limit}&offset=${offset}&name=${searchByName}${dateSearchUrl}`,
      providesTags: ['SavedSearch']
    }),
    getSavedSearchList: builder.query({
      query: searchByName => `saved-search-list?name=${searchByName}`,
      providesTags: ['SavedSearch']
    }),
    addSavedSearch: builder.mutation({
      query: data => ({
        url: `saved-search`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['SavedSearch']
    }),
    updateSavedSearch: builder.mutation({
      query: data => ({
        url: `saved-search`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['SavedSearch']
    }),
    deleteSavedSearch: builder.mutation({
      query: filter => ({
        url: `saved-search`,
        method: 'DELETE',
        body: filter // Modify this to match your API's payload
      }),
      invalidatesTags: ['SavedSearch']
    })
  })
});

export const {
  useGetAllSavedSearchesQuery,
  useUpdateSavedSearchMutation,
  useGetSavedSearchListQuery,
  useAddSavedSearchMutation,
  useDeleteSavedSearchMutation
} = savedSearchesApi;
