import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

export const notificationApi = createApi({
  reducerPath: 'noitificationReducer',
  baseQuery: createBaseQuery(),
  tagTypes: ['notification'],

  endpoints: builder => ({
    seenNotification: builder.mutation({
      query: data => ({
        url: `store/customers/me/notices/seen`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['notification']
    }),

    getNotification: builder.query({
      query: () => `store/customers/me/notices`,
      providesTags: ['notification']
    }),
    readNotification: builder.query({
      query: ({ noticeId }) => `/store/customers/me/notices/read/${noticeId}`,
      providesTags: ['notification']
    }),
    readAllNotification: builder.mutation({
      query: () => ({
        url: `/store/customers/me/notices/read-all`,
        method: 'PUT'
      }),
      invalidatesTags: ['notification']
    })
  })
});

export const {
  useSeenNotificationMutation,
  useLazyGetNotificationQuery,
  useGetNotificationQuery,
  useReadAllNotificationMutation,
  useLazyReadNotificationQuery
} = notificationApi;
