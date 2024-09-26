import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

export const faqsApi = createApi({
  reducerPath: 'faqsReducer',
  baseQuery: createBaseQuery(),
  tagTypes: ['faqs'],

  endpoints: builder => ({
    getAllFaqs: builder.query({
      query: () => `public/data/faqs`
    }),
    getNavigation :builder.query({
      query: () => `public/data/side_bar_config`
    }),


    
  })
});

export const { useGetAllFaqsQuery,useGetNavigationQuery } = faqsApi;
