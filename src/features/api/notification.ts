import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const notificationApi = createApi({
  reducerPath: 'notificationReducer',
  baseQuery: fetchBaseQuery({ baseUrl: apiURL,credentials: 'include',
  }),
  tagTypes: ['notification'],

  endpoints: (builder) => ({
    getAllNotification: builder.query({
      query: () => `store/all-notification`,
      providesTags: ['notification'],
    }),
  }),
});

export const { useGetAllNotificationQuery } = notificationApi;
