import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';
import { getDeviceDetails } from '../../utils/get-device-details';

const { screenSize, deviceType, os } = getDeviceDetails();

export const funnelApi = createApi({
  reducerPath: 'funnelReducer',
  baseQuery: createBaseQuery(),
  tagTypes: ['funnel'],

  endpoints: builder => ({
    registerFunnel: builder.query({
      query: ({ step, sessionId, entryPoint, mobileNumber, status }) => ({
        url: `registration-funnel?funnel_step=${step}&session_id=${sessionId}${
          entryPoint ? `&entry_point=${entryPoint}` : ''
        }${mobileNumber ? `&mobile_number=${mobileNumber}` : ''}${
          status ? `&status=${status}` : ''
        }`,
        headers: {
          'tracking-header': JSON.stringify({
            platform: 'Web',
            screen_size: screenSize,
            os: os,
            device_type: deviceType
          })
        }
      })
    })
  })
});

export const { useLazyRegisterFunnelQuery } = funnelApi;
