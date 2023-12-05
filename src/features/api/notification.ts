import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const notificationApi = createApi({
  reducerPath: 'notificationReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: apiURL,
    credentials: 'include'
  }),
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
