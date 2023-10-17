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
     ({
        url: `previous-search?limit=${currentPage}&offset=${resultsPerPage}`,
        method: 'GET',
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6ImN1c18wMUhDOVYxVDRNSkVWWkhWTUJZUkY4NDFRTiIsImRvbWFpbiI6InN0b3JlIiwiaWF0IjoxNjk3NTQ0NjEyLCJleHAiOjE3MDAxMzY2MTJ9.FMnWqLfZfocWUZI0GAmGRmfCwLnEwCe3XtR_COUNnQk',
        },
      }),
      providesTags: ['PreviousSearch'],
    }),
    addPreviousSearch: builder.mutation({
      query: (data) => ({
        url: `previous-search`,
        method: 'POST',
        body: data,
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6ImN1c18wMUhDOVYxVDRNSkVWWkhWTUJZUkY4NDFRTiIsImRvbWFpbiI6InN0b3JlIiwiaWF0IjoxNjk3NTQ0NjEyLCJleHAiOjE3MDAxMzY2MTJ9.FMnWqLfZfocWUZI0GAmGRmfCwLnEwCe3XtR_COUNnQk',
        },
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
