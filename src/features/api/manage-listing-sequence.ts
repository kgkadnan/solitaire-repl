import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const apiURL = process.env.NEXT_PUBLIC_API_URL;

// const header =
export const manageListingSequenceApi = createApi({
  reducerPath: 'manageListingSequenceReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: apiURL,
    credentials: 'include'
  }),
  tagTypes: ['manageListingSequence'],

  endpoints: builder => ({
    addManageListingSequence: builder.mutation({
      query: data => ({
        url: `customer-manage-listing-sequence`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['manageListingSequence']
    }),
    getManageListingSequence: builder.query({
      query: () => ({
        url: `customer-manage-listing-sequence`,
        method: 'GET'
      }),
      providesTags: ['manageListingSequence']
    })
  })
});

export const {
  useAddManageListingSequenceMutation,
  useGetManageListingSequenceQuery
} = manageListingSequenceApi;
