import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const downloadExcelApi = createApi({
  reducerPath: 'downloadExcelReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: apiURL,
    credentials: 'include',
    
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
