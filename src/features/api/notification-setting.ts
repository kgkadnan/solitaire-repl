import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const notificationSettingApi = createApi({
  reducerPath: 'notificationSettingReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: apiURL,
   
  }),
  tagTypes: ['notificationSetting'],

  endpoints: (builder) => ({
    getAllNotificationSetting: builder.query({
      query: (args) => ({
        url: `store/subscription`,
        method: 'GET',
        params: { ...args },
      }),
      providesTags: ['notificationSetting'],
    }),
    updateNotificationSetting: builder.mutation({
      query: (filter) => ({
        url: `store/manage-subscription`,
        method: 'PUT', // Use the appropriate HTTP method
        body: filter, // Modify this to match your API's payload
      }),
      invalidatesTags: ['notificationSetting'],
    }),
  }),
});

export const {
  useGetAllNotificationSettingQuery,
  useUpdateNotificationSettingMutation,
} = notificationSettingApi;
