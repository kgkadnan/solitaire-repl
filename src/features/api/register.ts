import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

export const registerApi = createApi({
  reducerPath: 'registerReducer',
  baseQuery: createBaseQuery(false),
  tagTypes: ['Register'],

  endpoints: builder => ({
    register: builder.mutation({
      query: data => ({
        url: `/store/customers`,
        method: 'POST', // Use the appropriate HTTP method
        body: data // Modify this to match your API's payload
      }),
      invalidatesTags: ['Register']
    }),
    trackRegisterFlow: builder.query({
      query: ({ event }) => ({
        url: `/event-track/${event}`
      })
    })
  })
});

export const { useRegisterMutation, useLazyTrackRegisterFlowQuery } =
  registerApi;
