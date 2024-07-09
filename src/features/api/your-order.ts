import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

export const yourOrderApi = createApi({
  reducerPath: 'yourOrderReducer',
  baseQuery: createBaseQuery(),
  tagTypes: ['yourOrder'],
  endpoints: builder => ({
    cardRecentConfirmation: builder.query({
      query: ({
        resentConfiramtionStatus,
        resentConfiramtionInvoiceStatus,
        expand,
        recentConfiramtionSearchUrl,
        recentConfirmlimit,
        recentConfirmationSelectedDays
      }) =>
        `/store/customers/me/orders?status=${resentConfiramtionStatus}&invoice_status=${resentConfiramtionInvoiceStatus}&expand=${expand}&${
          recentConfiramtionSearchUrl ? recentConfiramtionSearchUrl : ''
        }&limit=${recentConfirmlimit}&${
          recentConfirmationSelectedDays
            ? `created_at[gte]=${recentConfirmationSelectedDays}`
            : ''
        }`,
      providesTags: ['yourOrder']
    }),
    getProductDetails: builder.query({
      query: ({ id, singleExpand }) =>
        `/store/orders/${id}?expand=${singleExpand}`,
      providesTags: ['yourOrder']
    }),
    cardMyInvoice: builder.query({
      query: ({
        myInvoiceStatus,
        myInvoiceInvoiceStatus,
        myInvoiceSearchUrl,
        myInvoicelimit,
        myInvoiceSelectedDays
      }) =>
        `/store/customers/me/orders?status=${myInvoiceStatus}&invoice_status=${myInvoiceInvoiceStatus}&${
          myInvoiceSearchUrl ? myInvoiceSearchUrl : ''
        }&limit=${myInvoicelimit}&${
          myInvoiceSelectedDays
            ? `created_at[gte]=${myInvoiceSelectedDays}`
            : ''
        }`,
      providesTags: ['yourOrder']
    }),
    cardPreviousConfirmation: builder.query({
      query: ({
        limit,
        offset,
        previousConfirmStatus,
        previousConfirmationSearchUrl,
        previousConfirmationSelectedDays
      }) =>
        `/store/customers/me/orders?${offset ? `offset=${offset}&` : ''}${
          limit ? `limit=${limit}&` : ''
        }&status=${previousConfirmStatus}&${
          previousConfirmationSearchUrl ? previousConfirmationSearchUrl : ''
        }&${
          previousConfirmationSelectedDays
            ? `created_at[gte]=${previousConfirmationSelectedDays}`
            : ''
        }`,
      providesTags: ['yourOrder']
    }),
    searchPendingOrderByKeyword: builder.query({
      query: ({ keyword }) =>
        `/store/customers/me/orders?status=pending&invoice_status=pending&expand=items&search_keyword=${keyword}&limit=50`,
      providesTags: ['yourOrder']
    })
  })
});

export const {
  useCardRecentConfirmationQuery,
  useLazyCardMyInvoiceQuery,
  useLazyCardPreviousConfirmationQuery,
  useLazyCardRecentConfirmationQuery,
  useCardMyInvoiceQuery,
  useCardPreviousConfirmationQuery,
  useGetProductDetailsQuery,
  useLazyGetProductDetailsQuery,
  useLazySearchPendingOrderByKeywordQuery
} = yourOrderApi;
