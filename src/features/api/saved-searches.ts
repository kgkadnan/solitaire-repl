import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const savedSearchesApi = createApi({
  reducerPath: 'savedSearchReducer',
  baseQuery: fetchBaseQuery({ baseUrl: apiURL, headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6ImN1c18wMUhEMFI2NFZHQThLNFcyNkFORlZDUTQ1TSIsImRvbWFpbiI6InN0b3JlIiwiaWF0IjoxNjk3NjExNzEzLCJleHAiOjE3MDAyMDM3MTN9.X_ETyZIozIhg5bm7kcu2jRxG500sCHfl98eESyBQtHo',
  }, }),
  tagTypes: ['SavedSearch'],

  endpoints: (builder) => ({
    getAllSavedSearches: builder.query({
      query: ({ currentPage, resultsPerPage }) =>
        `saved-search?page=${currentPage}&perPage=${resultsPerPage}`,
      providesTags: ['SavedSearch'],
    }),
    addSavedSearch: builder.mutation({
      query: (data) => ({
        url: `saved-search`,
        method: 'POST',
        body: data,
       
      }),
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

export const { useGetAllSavedSearchesQuery, useUpdateSavedSearchesMutation, useAddSavedSearchMutation} =
  savedSearchesApi;
