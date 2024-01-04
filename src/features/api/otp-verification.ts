import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

export const otpVerificationApi = createApi({
  reducerPath: 'otpVerificationReducer',
  baseQuery: createBaseQuery(false),
  tagTypes: ['OtpVerification'],

  endpoints: builder => ({
    verifyOTP: builder.mutation({
      query: filter => ({
        url: `/store/customers/sms/otp/verify`,
        method: 'POST',
        body: filter
      }),
      invalidatesTags: ['OtpVerification']
    })
  })
});

export const { useVerifyOTPMutation } = otpVerificationApi;
