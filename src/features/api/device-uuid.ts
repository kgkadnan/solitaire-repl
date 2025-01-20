import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

export const deviceUUIDApi = createApi({
  reducerPath: 'deviceUuidReducer',
  baseQuery: createBaseQuery(),
  tagTypes: ['deviceUuid'],

  endpoints: builder => ({
    addDeviceUUID: builder.mutation({
      query: data => ({
        url: `/store/customers/me/save-device-uuid`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['deviceUuid']
    })
  })
});

export const { useAddDeviceUUIDMutation } = deviceUUIDApi;
