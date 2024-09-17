import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

export const funnelApi = createApi({
  reducerPath: 'funnelReducer',
  baseQuery: createBaseQuery(),
  tagTypes: ['funnel'],

  endpoints: builder => ({
    registerFunnel: builder.query({
      query: ({ step, sessionId, entryPoint, mobileNumber }) =>
        `registration-funnel?funnel_step=${step}&session_id=${sessionId}${
          entryPoint ? `&entry_point=${entryPoint}` : ''
        }${mobileNumber ? `&mobile_number=${mobileNumber}` : ''}`
    })
  })
});

export const { useLazyRegisterFunnelQuery } = funnelApi;
