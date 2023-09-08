import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const savedSearchesApi = createApi({
  reducerPath: 'savedSearchReducer',
  baseQuery: fetchBaseQuery({ baseUrl: apiURL }),

  endpoints: (builder) => ({
    getAllSavedSearches: builder.query({
      query: ({ currentPage, resultsPerPage, isDeleted }) =>
        `previous-search?isDeleted=${isDeleted}&page=${currentPage}&perPage=${resultsPerPage}`,
    }),
    updateSavedSearches: builder.mutation({
      query: (filter) => ({
        url: `previous-search`,
        method: 'PUT', // Use the appropriate HTTP method
        body: filter, // Modify this to match your API's payload
      }),
    }),
  }),
});

export const { useGetAllSavedSearchesQuery, useUpdateSavedSearchesMutation } =
  savedSearchesApi;
