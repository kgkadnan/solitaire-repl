import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const notificationSettingApi = createApi({
  reducerPath: 'notificationSettingReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: apiURL,
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6ImN1c18wMUhERUtLMVQyUlNXNUpIVzdERlNUWjdEVCIsImRvbWFpbiI6InN0b3JlIiwiaWF0IjoxNjk4MDc2MTYwLCJleHAiOjE3MDA2NjgxNjB9.6Yzsnd8xXUVb_FuhgCpi77WuXBjUKUrcKgxb_RsCxe4',
    },
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
