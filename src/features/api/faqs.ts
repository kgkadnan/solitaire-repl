import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

export const faqsApi = createApi({
  reducerPath: 'faqsReducer',
  baseQuery: createBaseQuery(),
  tagTypes: ['faqs'],

  endpoints: builder => ({
    getAllFaqs: builder.query({
      query: () => `public/data/faqs`
    })
  })
});

export const { useGetAllFaqsQuery } = faqsApi;
