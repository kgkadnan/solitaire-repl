import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

export const funnelApi = createApi({
  reducerPath: 'funnelReducer',
  baseQuery: createBaseQuery(),
  tagTypes: ['funnel'],

  endpoints: builder => ({
    registerFunnel: builder.query({
      query: ({step,sessionId}) => `registration-funnel?funnel_step=${step}&session_id=${sessionId}`
    })
  })
});

export const { useRegisterFunnelQuery } = funnelApi;
