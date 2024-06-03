import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

// Define a new API service
export const copyURLApi = createApi({
  reducerPath: 'copyURLApi',
  baseQuery: createBaseQuery(),
  tagTypes: ['copyURL'],

  endpoints: builder => ({
    trackCopyUrlEvent: builder.query({
      query: ({ url }) => `/track/stone/copy-url/${url}`,
      providesTags: ['copyURL']
    })
  })
});

// Export the auto-generated hooks for usage in components
export const { useLazyTrackCopyUrlEventQuery } = copyURLApi;
export default copyURLApi;
