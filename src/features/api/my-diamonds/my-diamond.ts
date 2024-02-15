import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../base-query';

export const myDiamondApi = createApi({
  reducerPath: 'recentConfirmationReducer',
  baseQuery: createBaseQuery(),
  tagTypes: ['myDiamond'],
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
      providesTags: ['myDiamond']
    }),
    getProductDetails: builder.query({
      query: ({ id, singleExpand }) =>
        `/store/orders/${id}?expand=${singleExpand}`,
      providesTags: ['myDiamond']
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
      providesTags: ['myDiamond']
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
      providesTags: ['myDiamond']
    })
  })
});

export const {
  useCardRecentConfirmationQuery,
  useCardMyInvoiceQuery,
  useCardPreviousConfirmationQuery,
  useGetProductDetailsQuery,
  useLazyGetProductDetailsQuery
} = myDiamondApi;
