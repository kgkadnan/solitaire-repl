import { getDeviceDetails } from '@/utils/get-device-details';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiURL = process.env.NEXT_PUBLIC_API_URL;
const { screenSize, deviceType, os } = getDeviceDetails();

type ICustomHeaders = {
  [key: string]: string | number | boolean;
};

export const createBaseQuery = (
  auth = true,
  customHeaders?: ICustomHeaders
) => {
  return fetchBaseQuery({
    baseUrl: apiURL,
    prepareHeaders: headers => {
      const storedUser = localStorage.getItem('auth');
      const token = storedUser ? JSON.parse(storedUser) : null;

      // Set authorization header if auth is true and a token exists
      if (auth && token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set(
        'tracking-header',
        JSON.stringify({
          platform: 'Web',
          screen_size: screenSize,
          os: os,
          device_type: deviceType
        })
      );
      // Merge custom headers with existing headers
      customHeaders &&
        Object.keys(customHeaders).forEach(key => {
          headers.set(key, String(customHeaders[key]));
        });

      return headers;
    }
  });
};
