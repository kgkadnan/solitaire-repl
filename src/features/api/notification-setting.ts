import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

export const notificationSettingApi = createApi({
  reducerPath: 'notificationSettingReducer',
  baseQuery: createBaseQuery(),
  tagTypes: ['notificationSetting'],

  endpoints: builder => ({
    getAllNotificationSetting: builder.query({
      query: args => ({
        url: `store/subscription`,
        method: 'GET',
        params: { ...args }
      }),
      providesTags: ['notificationSetting']
    }),
    updateNotificationSetting: builder.mutation({
      query: filter => ({
        url: `store/manage-subscription`,
        method: 'PUT', // Use the appropriate HTTP method
        body: filter // Modify this to match your API's payload
      }),
      invalidatesTags: ['notificationSetting']
    })
  })
});

export const {
  useGetAllNotificationSettingQuery,
  useUpdateNotificationSettingMutation
} = notificationSettingApi;
