import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const notificationApi = createApi({
  reducerPath: 'notificationReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: apiURL,
    credentials: 'include',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6ImN1c18wMUhEMFI2NFZHQThLNFcyNkFORlZDUTQ1TSIsImRvbWFpbiI6InN0b3JlIiwiaWF0IjoxNjk3NjExNzEzLCJleHAiOjE3MDAyMDM3MTN9.X_ETyZIozIhg5bm7kcu2jRxG500sCHfl98eESyBQtHo',
    },
  }),
  tagTypes: ['notification'],

  endpoints: (builder) => ({
    getAllNotification: builder.query({
      query: () => `store/all-notification`,
      providesTags: ['notification'],
    }),
    updateNotification: builder.mutation({
      query: (filter) => ({
        url: `notification`,
        method: 'PUT', // Use the appropriate HTTP method
        body: filter, // Modify this to match your API's payload
      }),
      invalidatesTags: ['notification'],
    }),
  }),
});

export const { useGetAllNotificationQuery, useUpdateNotificationMutation } =
  notificationApi;
