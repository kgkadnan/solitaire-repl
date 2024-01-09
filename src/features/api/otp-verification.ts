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
    }),
    sendOtp: builder.mutation({
      query: filter => ({
        url: `/store/customers/sms/otp/send`,
        method: 'POST',
        body: filter
      }),
      invalidatesTags: ['OtpVerification']
    }),
    verifyPhone: builder.query({
      query: ({ country_code, phone_number }) => ({
        url: `/store/auth/${country_code}/${phone_number}`,
        method: 'GET'
      })
    })
  })
});

export const { useVerifyOTPMutation, useSendOtpMutation, useVerifyPhoneQuery } =
  otpVerificationApi;
