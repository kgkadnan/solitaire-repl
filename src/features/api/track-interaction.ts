import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

// Define a new API service
export const trackApi = createApi({
  reducerPath: 'trackApi',
  baseQuery: createBaseQuery(),
  tagTypes: ['trackApi'],

  endpoints: builder => ({
    shareEvent: builder.query({
      query: data => ({
        url: `track/share-button`,
        method: 'POST',
        body: data
      }),
      providesTags: ['trackApi']
    })
  })
});

// Export the auto-generated hooks for usage in components
export const { useLazyShareEventQuery } = trackApi;
export default trackApi;
