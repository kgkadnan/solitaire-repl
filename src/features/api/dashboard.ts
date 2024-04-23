import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

// const header =
export const dashboardApi = createApi({
  reducerPath: 'dashboardReducer',
  baseQuery: createBaseQuery(),
  tagTypes: ['dashboard'],

  endpoints: builder => ({
    getCustomer: builder.query({
      query: () => `store/customers/me`,
      providesTags: ['dashboard']
    }),
    getBidHistory: builder.query({
      query: () => `store/customers/me/bid-history`
    }),
    getBidToBuyHistory: builder.query({
      query: () => `store/customers/me/bidtobuy-history`
    })
  })
});
export const {
  useGetCustomerQuery,
  useGetBidHistoryQuery,
  useGetBidToBuyHistoryQuery
} = dashboardApi;
