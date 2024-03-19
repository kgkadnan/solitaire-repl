import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

// Define a new API service
export const publicApi = createApi({
  reducerPath: 'publicApi',
  baseQuery: createBaseQuery(),
  tagTypes: ['public'],

  endpoints: builder => ({
    getBase64: builder.query({
      query: ({ url }) => `/public/get-blob-base64?url=${url}`,
      providesTags: ['public']
    })
  })
});

// Export the auto-generated hooks for usage in components
export const { useLazyGetBase64Query } = publicApi;
export default publicApi;
