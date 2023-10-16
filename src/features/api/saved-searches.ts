import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const savedSearchesApi = createApi({
  reducerPath: 'savedSearchReducer',
  baseQuery: fetchBaseQuery({ baseUrl: apiURL }),
  tagTypes: ['SavedSearch'],

  endpoints: (builder) => ({
    getAllSavedSearches: builder.query({
      query: ({ currentPage, resultsPerPage }) =>
        `saved-search?page=${currentPage}&perPage=${resultsPerPage}`,
      providesTags: ['SavedSearch'],
    }),
    updateSavedSearches: builder.mutation({
      query: (filter) => ({
        url: `saved-search`,
        method: 'PUT', // Use the appropriate HTTP method
        body: filter, // Modify this to match your API's payload
      }),
      invalidatesTags: ['SavedSearch'],
    }),
  }),
});

export const { useGetAllSavedSearchesQuery, useUpdateSavedSearchesMutation } =
  savedSearchesApi;
