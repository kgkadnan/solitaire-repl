import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

export const requestCallBackApi = createApi({
  reducerPath: 'requestCallBackReducer',
  baseQuery: createBaseQuery(),
  tagTypes: ['requestCallBack'],

  endpoints: builder => ({
    reuestCallBack: builder.mutation({
      query: data => ({
        url: `store/customers/me/request-callback`,
        method: 'POST',
        body: data
      })
    }),
    getRequestCallBackTimeSlots: builder.query({
      query: () => `store/customers/me/timeslots`
    })
  })
});

export const {
  useReuestCallBackMutation,
  useLazyGetRequestCallBackTimeSlotsQuery
} = requestCallBackApi;
