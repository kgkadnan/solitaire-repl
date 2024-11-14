import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

export const gemTracApi = createApi({
  reducerPath: 'gemTracReducer',
  baseQuery: createBaseQuery(),
  tagTypes: ['gemTrac'],

  endpoints: builder => ({
    getGemTrac: builder.query({
      query: ({ product_id }) =>
        `/store/product/traceability?key=${product_id}`,
      providesTags: ['gemTrac']
    })
  })
});

export const { useLazyGetGemTracQuery } = gemTracApi;
