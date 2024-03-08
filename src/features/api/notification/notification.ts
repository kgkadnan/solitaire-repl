import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../base-query';

// const header =
export const newNotificationApi = createApi({
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
    })
  })
});

export const {
  useSeenNotificationMutation,
  useLazyGetNotificationQuery,
  useGetNotificationQuery,
  useLazyReadNotificationQuery
} = newNotificationApi;
