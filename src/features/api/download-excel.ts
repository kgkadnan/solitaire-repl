import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const downloadExcelApi = createApi({
  reducerPath: 'downloadExcelReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: apiURL,
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6ImN1c18wMUhEMFI2NFZHQThLNFcyNkFORlZDUTQ1TSIsImRvbWFpbiI6InN0b3JlIiwiaWF0IjoxNjk3NjExNzEzLCJleHAiOjE3MDAyMDM3MTN9.X_ETyZIozIhg5bm7kcu2jRxG500sCHfl98eESyBQtHo',
    },
  }),
  tagTypes: ['downloadExcel'],

  endpoints: (builder) => ({
    downloadExcel: builder.mutation({
      query: (filter) => ({
        url: `exportExcel`,
        method: 'POST', // Use the appropriate HTTP method
        body: filter, // Modify this to match your API's payload
      }),
      invalidatesTags: ['downloadExcel'],
    }),
  }),
});

export const { useDownloadExcelMutation } = downloadExcelApi;
