import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a new API service
export const publicApi = createApi({
  reducerPath: 'publicApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://medusa-test.kgkit.net/public/page/',
    headers: {
      Accept: 'text/html',
      'Content-Type': 'text/html'
    }
  }),

  endpoints: builder => ({
    getHtmlContent: builder.query({
      query: ({ query }) => `${query}`,
      transformResponse: (responseText: string) => responseText // Return the raw response text as string
    })
  })
});

// Export the auto-generated hooks for usage in components
export const { useLazyGetHtmlContentQuery } = publicApi;
export default publicApi;
