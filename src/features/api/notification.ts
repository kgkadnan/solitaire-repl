import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

export const notificationApi = createApi({
  reducerPath: 'notificationReducer',
  baseQuery: createBaseQuery(),
  tagTypes: ['notification'],

  endpoints: builder => ({
    getAllNotification: builder.query({
      query: args => ({
        url: `store/all-notification`,
        method: 'GET',
        params: { ...args }
      }),
      providesTags: ['notification']
    }),
    updateNotification: builder.mutation({
      query: filter => ({
        url: `store/notification`,
        method: 'PUT', // Use the appropriate HTTP method
        body: filter // Modify this to match your API's payload
      }),
      invalidatesTags: ['notification']
    })
  })
});

export const { useGetAllNotificationQuery, useUpdateNotificationMutation } =
  notificationApi;
