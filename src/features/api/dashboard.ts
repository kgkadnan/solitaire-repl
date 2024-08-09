import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

export const dashboardApi = createApi({
  reducerPath: 'dashboardReducer',
  baseQuery: createBaseQuery(),
  tagTypes: ['dashboard'],

  endpoints: builder => ({
    getCustomer: builder.query({
      query: () => `store/customers/me?dashboard=new`,
      providesTags: ['dashboard']
    }),
    getBidHistory: builder.query({
      query: () => `store/customers/me/bid-history`
    }),
    getBidToBuyHistory: builder.query({
      query: () => `store/customers/me/bidtobuy-history`
    }),
    getLogoutAll: builder.query({
      query: () => `store/customers/me/logout-all`
    }),
    getLogout: builder.query({
      query: () => `store/customers/me/logout`
    })
  })
});
export const {
  useLazyGetCustomerQuery,
  useGetCustomerQuery,
  useGetBidHistoryQuery,
  useGetBidToBuyHistoryQuery,
  useLazyGetBidToBuyHistoryQuery,
  useLazyGetLogoutAllQuery,
  useLazyGetLogoutQuery
} = dashboardApi;
