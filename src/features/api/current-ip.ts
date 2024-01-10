import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const currentIPApi = createApi({
  reducerPath: 'currentIPReducer',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://ipapi.co/' }),
  endpoints: builder => ({
    getCountryCode: builder.query({
      query: () => `json/`
    })
  })
});

export const { useGetCountryCodeQuery } = currentIPApi;
