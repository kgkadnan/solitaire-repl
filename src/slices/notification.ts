import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const notificationApi = createApi({
  reducerPath: 'notificationReducer',
  baseQuery: fetchBaseQuery({ baseUrl: apiURL }),
  tagTypes: ['notification'],

  endpoints: (builder) => ({
    getAllNotification: builder.query({
      query: () => `notification`,
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
