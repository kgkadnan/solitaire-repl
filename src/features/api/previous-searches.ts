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
  baseQuery: fetchBaseQuery({
    baseUrl: apiURL,
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6ImN1c18wMUhERUtLMVQyUlNXNUpIVzdERlNUWjdEVCIsImRvbWFpbiI6InN0b3JlIiwiaWF0IjoxNjk4MDc2MTYwLCJleHAiOjE3MDA2NjgxNjB9.6Yzsnd8xXUVb_FuhgCpi77WuXBjUKUrcKgxb_RsCxe4',
    },
  }) as BaseQuery,
  tagTypes: ['PreviousSearch'],
  endpoints: (builder) => ({
    getAllPreviousSearches: builder.query({
      query: ({ limit, offset, searchUrl = '' }) => ({
        url: `previous-search?limit=${limit}&offset=${offset}${searchUrl}`,
        method: 'GET',
      }),
      providesTags: ['PreviousSearch'],
    }),
    getSpecificPrevious: builder.query({
      query: ({ id }) => `previous-search?id=${id}`,
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
  useGetSpecificPreviousQuery,
} = previousSearchApi;
