import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

export const getAllCountryCodeApi = createApi({
  reducerPath: 'getAllCountryCodeReducer',
  baseQuery: createBaseQuery(),
  endpoints: builder => ({
    getAllCountryCode: builder.query({
      query: () => `public/data/country-code-list`
    })
  })
});

export const { useGetAllCountryCodeQuery, useLazyGetAllCountryCodeQuery } =
  getAllCountryCodeApi;
