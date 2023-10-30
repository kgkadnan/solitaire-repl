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
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6ImN1c18wMUhEMFI2NFZHQThLNFcyNkFORlZDUTQ1TSIsImRvbWFpbiI6InN0b3JlIiwiaWF0IjoxNjk3NjExNzEzLCJleHAiOjE3MDAyMDM3MTN9.X_ETyZIozIhg5bm7kcu2jRxG500sCHfl98eESyBQtHo',
    },
  }) as BaseQuery,
  tagTypes: ['PreviousSearch'],
  endpoints: (builder) => ({
    getAllPreviousSearches: builder.query({
      query: ({ limit, offset, searchUrl = '', searchByName }) => ({
        url: `previous-search?limit=${limit}&offset=${offset}&name=${searchByName}${searchUrl}`,
        method: 'GET',
      }),
      providesTags: ['PreviousSearch'],
    }),
    getPreviousSearchList: builder.query({
      query: (searchByName) => `previous-search-list?name=${searchByName}`,
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
    deletePreviousSearch: builder.mutation({
      query: (filter) => ({
        url: `previous-search`,
        method: 'DELETE', // Use the appropriate HTTP method
        body: filter, // Modify this to match your API's payload
      }),
      invalidatesTags: ['PreviousSearch'],
    }),
  }),
});

export const {
  useGetAllPreviousSearchesQuery,
  useGetSpecificPreviousQuery,
  useGetPreviousSearchListQuery,
  useAddPreviousSearchMutation,
  useDeletePreviousSearchMutation,
} = previousSearchApi;
