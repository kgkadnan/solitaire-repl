import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

export const dashboardApi = createApi({
  reducerPath: 'dashboardReducer',
  baseQuery: createBaseQuery(),
  tagTypes: ['dashboard'],

  endpoints: builder => ({
    getSalePerson: builder.query({
      query: () => `salesperson/me`,
      providesTags: ['dashboard']
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
  useLazyGetSalePersonQuery,
  useLazyGetLogoutAllQuery,
  useLazyGetLogoutQuery,
  util
} = dashboardApi;
