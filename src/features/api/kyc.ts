import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

export const kycApi = createApi({
  reducerPath: 'kycReducer',
  baseQuery: createBaseQuery(),
  tagTypes: ['kyc'],

  endpoints: builder => ({
    kyc: builder.mutation({
      query: ({ data, ID }) => ({
        url: `/store/kyc/step/${ID}`,
        method: 'PUT',
        body: data
      }),
      transformResponse: (response, meta) => {
        return { data: response, statusCode: meta?.response?.status };
      },
      invalidatesTags: ['kyc']
    }),
    submitKYC: builder.mutation({
      query: data => ({
        url: `/store/kyc/submit`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['kyc']
    }),
    getKycPdf: builder.query({
      query: ({ country }) => ({
        url: `/store/kyc/${country}/download`,
        method: 'GET'
      }),
      providesTags: ['kyc']
    }),
    getKycDetail: builder.query({
      query: () => ({
        url: `/store/kyc`,
        method: 'GET'
      })
      // providesTags: ['kyc']
    }),
    resetKyc: builder.mutation({
      query: () => ({
        url: `/store/kyc/restart`,
        method: 'PUT'
      }),
      transformResponse: (response, meta) => {
        return { data: response, statusCode: meta?.response?.status };
      },
      invalidatesTags: ['kyc']
    }),
    uploadDocument: builder.mutation({
      query: data => ({
        url: `/store/kyc/document-upload`,
        method: 'POST',
        body: data
      }),

      invalidatesTags: ['kyc']
    }),
    deleteDocument: builder.mutation({
      query: data => ({
        url: `/store/kyc/document-remove`,
        method: 'Delete',
        body: data
      }),

      invalidatesTags: ['kyc']
    }),
    resendEmailOTP: builder.mutation({
      query: ({ trackEvent, ...data }) => ({
        url: `/store/customers/email/otp/send?event_type=KYC`,
        method: 'POST',
        body: data
      }),

      invalidatesTags: ['kyc']
    }),
    verifyEmailOTP: builder.mutation({
      query: data => ({
        url: `/store/customers/email/otp/verify`,
        method: 'POST',
        body: data
      }),

      invalidatesTags: ['kyc']
    })
  })
});

export const {
  useKycMutation,
  useGetKycDetailQuery,
  useLazyGetKycDetailQuery,
  useSubmitKYCMutation,
  useResetKycMutation,
  useVerifyEmailOTPMutation,
  useResendEmailOTPMutation,
  useLazyGetKycPdfQuery,
  useUploadDocumentMutation,
  useDeleteDocumentMutation
} = kycApi;
