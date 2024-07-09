import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

// Define a new API service
export const trackPageApi = createApi({
  reducerPath: 'trackPageApi',
  baseQuery: createBaseQuery(),
  tagTypes: ['trackPageApi'],

  endpoints: builder => ({
    sharePageEvent: builder.mutation({
      query: data => ({
        url: `track/page/log-time-spent`,
        method: 'POST',
        body: data
      })
    })
  })
});

// Export the auto-generated hooks for usage in components
export const { useSharePageEventMutation } = trackPageApi;
export default trackPageApi;
