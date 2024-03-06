import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

// const header =
export const publicApi = createApi({
  reducerPath: 'publicReducer',
  baseQuery: createBaseQuery(),
  tagTypes: ['public'],

  endpoints: builder => ({
    getPublicData: builder.query({
      query: ({ query }) => `public/page/${query}`,
      providesTags: ['public']
    })
  })
});

export const { useLazyGetPublicDataQuery } = publicApi;
