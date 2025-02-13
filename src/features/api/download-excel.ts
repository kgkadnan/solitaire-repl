import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

export const downloadExcelApi = createApi({
  reducerPath: 'downloadExcelReducer',
  baseQuery: createBaseQuery(),
  tagTypes: ['downloadExcel'],

  endpoints: builder => ({
    downloadExcel: builder.mutation({
      query: filter => ({
        url: `/salesperson/products/export-excel`,
        method: 'POST', // Use the appropriate HTTP method
        body: filter // Modify this to match your API's payload
      }),
      invalidatesTags: ['downloadExcel']
    }),
    emailExcel: builder.mutation({
      query: filter => ({
        url: `/salesperson/products/email-excel`,
        method: 'POST', // Use the appropriate HTTP method
        body: filter // Modify this to match your API's payload
      }),
      invalidatesTags: ['downloadExcel']
    })
  })
});

export const { useDownloadExcelMutation, useEmailExcelMutation } =
  downloadExcelApi;
