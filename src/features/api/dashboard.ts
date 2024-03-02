import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

// const header =
export const dashboardApi = createApi({
  reducerPath: 'dashboardReducer',
  baseQuery: createBaseQuery(),
  tagTypes: ['dashboard'],

  endpoints: builder => ({
    getCustomer: builder.query({
      query: () => `store/customers/me/`,
      providesTags: ['dashboard']
    })
  })
});
export const { useGetCustomerQuery } = dashboardApi;
