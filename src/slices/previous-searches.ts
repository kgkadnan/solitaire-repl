import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
} from '@reduxjs/toolkit/query/react';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

// Define the type for the base query function
type BaseQuery = BaseQueryFn<any, unknown, unknown>;

export const previousSearchApi = createApi({
  reducerPath: 'previousSearchReducer',
  baseQuery: fetchBaseQuery({ baseUrl: apiURL }) as BaseQuery,
  tagTypes: ['PreviousSearch'],
  endpoints: (builder) => ({
    getAllPreviousSearches: builder.query({
      query: ({ currentPage, resultsPerPage }) =>
        `previous-search?page=${currentPage}&perPage=${resultsPerPage}`,
      providesTags: ['PreviousSearch'],
    }),
    addPreviousSearch: builder.mutation({
      query: (data) => ({
        url: `previous-search`,
        method: 'POST',
        body: data,
      }),
    }),
    updatePreviousSearch: builder.mutation({
      query: (filter) => ({
        url: `previous-search`,
        method: 'PUT', // Use the appropriate HTTP method
        body: filter, // Modify this to match your API's payload
      }),
      invalidatesTags: ['PreviousSearch'],
    }),
  }),
});

export const {
  useGetAllPreviousSearchesQuery,
  useUpdatePreviousSearchMutation,
  useAddPreviousSearchMutation,
} = previousSearchApi;
