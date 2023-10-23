import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const notificationApi = createApi({
  reducerPath: 'notificationReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: apiURL,
    credentials: 'include',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6ImN1c18wMUhERUtLMVQyUlNXNUpIVzdERlNUWjdEVCIsImRvbWFpbiI6InN0b3JlIiwiaWF0IjoxNjk4MDc2MTYwLCJleHAiOjE3MDA2NjgxNjB9.6Yzsnd8xXUVb_FuhgCpi77WuXBjUKUrcKgxb_RsCxe4',
    },
  }),
  tagTypes: ['notification'],

  endpoints: (builder) => ({
    getAllNotification: builder.query({
      query: (args) => ({
        url: `store/all-notification`,
        method: 'GET',
        params: { ...args },
      }),
      providesTags: ['notification'],
    }),
    updateNotification: builder.mutation({
      query: (filter) => ({
        url: `store/notification`,
        method: 'PUT', // Use the appropriate HTTP method
        body: filter, // Modify this to match your API's payload
      }),
      invalidatesTags: ['notification'],
    }),
  }),
});

export const { useGetAllNotificationQuery, useUpdateNotificationMutation } =
  notificationApi;
