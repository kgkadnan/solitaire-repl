import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

export const downloadInvoiceApi = createApi({
  reducerPath: 'downloadInvoiceReducer',
  baseQuery: createBaseQuery(),
  tagTypes: ['donwloadInvoice'],

  endpoints: builder => ({
    donwloadInvoice: builder.query({
      query: ({ invoiceId }) => ({
        url: `/store/invoices/${invoiceId}`,
        method: 'GET' // Use the appropriate HTTP method
      }),
      providesTags: ['donwloadInvoice']
    })
  })
});

export const { useLazyDonwloadInvoiceQuery } = downloadInvoiceApi;
