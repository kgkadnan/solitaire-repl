import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const downloadExcelApi = createApi({
  reducerPath: 'downloadExcelReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: apiURL,
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6ImN1c18wMUhERUtLMVQyUlNXNUpIVzdERlNUWjdEVCIsImRvbWFpbiI6InN0b3JlIiwiaWF0IjoxNjk4MDc2MTYwLCJleHAiOjE3MDA2NjgxNjB9.6Yzsnd8xXUVb_FuhgCpi77WuXBjUKUrcKgxb_RsCxe4',
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
