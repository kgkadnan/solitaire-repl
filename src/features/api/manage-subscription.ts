import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

// const header =
export const manageSubscriptionApi = createApi({
  reducerPath: 'manageSubscriptionReducer',
  baseQuery: createBaseQuery(),
  tagTypes: ['manage-subscription'],

  endpoints: builder => ({
    manageSubscription: builder.mutation({
      query: data => ({
        url: `store/account/manage-notification-subscription`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['manage-subscription']
    }),
    getSubscription: builder.query({
      query: () => `store/account/manage-notification-subscription`,
      providesTags: ['manage-subscription']
    })
  })
});

export const { useLazyGetSubscriptionQuery, useManageSubscriptionMutation } =
  manageSubscriptionApi;
