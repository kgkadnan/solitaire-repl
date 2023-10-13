import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const notificationSettingApi = createApi({
  reducerPath: 'notificationSettingReducer',
  baseQuery: fetchBaseQuery({ baseUrl: apiURL, credentials: 'include' }),
  tagTypes: ['notificationSetting'],

  endpoints: (builder) => ({
    getAllNotificationSetting: builder.query({
      query: (args) => ({
        url: `subscription`,
        method: 'GET',
        params: { ...args },
      }),
      providesTags: ['notificationSetting'],
    }),
    updateNotificationSetting: builder.mutation({
      query: (filter) => ({
        url: `manage-subscription`,
        method: 'PUT', // Use the appropriate HTTP method
        body: filter, // Modify this to match your API's payload
        credentials: 'include',
        // headers: {
        //   Cookie:
        //     'connect.sid=s%3AX-BXAeOVF2dqX9af4GwpedFh1Db86k-H.eEIHv41OPI6JbekBOfxi8%2FqtyYvs250RL%2Bcfo1oQfms',
        //   // SameSite: 'None',
        // },
      }),
      invalidatesTags: ['notificationSetting'],
    }),
  }),
});

export const {
  useGetAllNotificationSettingQuery,
  useUpdateNotificationSettingMutation,
} = notificationSettingApi;
