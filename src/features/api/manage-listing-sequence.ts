import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

export const manageListingSequenceApi = createApi({
  reducerPath: 'manageListingSequenceReducer',
  baseQuery: createBaseQuery(),
  tagTypes: ['manageListingSequence'],

  endpoints: builder => ({
    addManageListingSequence: builder.mutation({
      query: data => ({
        url: `/store/account/customer-manage-listing-sequence`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['manageListingSequence']
    }),
    getManageListingSequence: builder.query({
      query: () => ({
        url: `/store/account/customer-manage-listing-sequence`,
        method: 'GET'
      }),
      keepUnusedDataFor: 0,
      providesTags: ['manageListingSequence']
    })
  })
});

export const {
  useAddManageListingSequenceMutation,
  useGetManageListingSequenceQuery,
  useLazyGetManageListingSequenceQuery
} = manageListingSequenceApi;
