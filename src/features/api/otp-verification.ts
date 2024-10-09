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
        body: filter,
        headers: {
          Authorization: `Bearer ${filter.resend_token}`
        }
      }),

      invalidatesTags: ['OtpVerification']
    }),
    sendOtp: builder.mutation({
      query: filter => ({
        url: `/store/customers/sms/otp/send?entry_point=${
          localStorage.getItem('entryPoint') || ''
        }`,
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
    }),
    verifyResetOTP: builder.mutation({
      query: filter => ({
        url: `/store/customers/sms/password-reset-otp/verify`,
        method: 'POST',
        body: filter
      }),

      invalidatesTags: ['OtpVerification']
    }),
    sendResetOtp: builder.mutation({
      query: filter => ({
        url: `/store/customers/sms/password-reset-otp/send`,
        method: 'POST',
        body: filter
      }),
      invalidatesTags: ['OtpVerification']
    }),
    sendEmailResetOtp: builder.mutation({
      query: data => ({
        url: `/store/customers/email/otp/resend-or-edit`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['OtpVerification']
    })
  })
});

export const {
  useVerifyOTPMutation,
  useVerifyResetOTPMutation,
  useSendOtpMutation,
  useVerifyPhoneQuery,
  useSendResetOtpMutation,
  useSendEmailResetOtpMutation
} = otpVerificationApi;
