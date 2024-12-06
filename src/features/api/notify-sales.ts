import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

export const notifySalesApi = createApi({
  reducerPath: 'notifySalesReducer',
  baseQuery: createBaseQuery(),
  tagTypes: ['NotifySales'],

  endpoints: builder => ({
    notifySales: builder.mutation({
      query: data => ({
        url: `/store/customers/notify-sales`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['NotifySales']
    })
  })
});

export const { useNotifySalesMutation } = notifySalesApi;
