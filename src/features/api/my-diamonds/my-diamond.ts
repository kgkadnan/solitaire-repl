import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn
} from '@reduxjs/toolkit/query/react';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

// Define the type for the base query function
type BaseQuery = BaseQueryFn<any, unknown, unknown>;

export const myDiamondAPI = createApi({
  reducerPath: 'recentConfirmationReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: apiURL,
    credentials: 'include'
  }) as BaseQuery,
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
        `/store/customers/me/orders?status=${resentConfiramtionStatus}&invoice_status=${resentConfiramtionInvoiceStatus}&expand=${expand}&${recentConfiramtionSearchUrl}&limit=${recentConfirmlimit}&created_at[gte]=${recentConfirmationSelectedDays}`,
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
        `/store/customers/me/orders?status=${myInvoiceStatus}&invoice_status=${myInvoiceInvoiceStatus}&${myInvoiceSearchUrl}&limit=${myInvoicelimit}&created_at[gte]=${myInvoiceSelectedDays}`,
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
        `/store/customers/me/orders?limit=${limit}&offset=${offset}&status=${previousConfirmStatus}&${previousConfirmationSearchUrl}&created_at[gte]=${previousConfirmationSelectedDays}`,
      providesTags: ['myDiamond']
    })
  })
});

export const {
  useCardRecentConfirmationQuery,
  useCardMyInvoiceQuery,
  useCardPreviousConfirmationQuery,
  useGetProductDetailsQuery
} = myDiamondAPI;
