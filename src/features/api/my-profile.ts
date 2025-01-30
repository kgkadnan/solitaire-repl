import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

export const myProfileApi = createApi({
  reducerPath: 'myProfileReducer',
  baseQuery: createBaseQuery(),
  tagTypes: ['myProfile'],

  endpoints: builder => ({
    updateProfilePhoto: builder.mutation({
      query: data => ({
        url: `store/account/upload-profile-photo`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['myProfile']
    }),
    getProfilePhoto: builder.query({
      query: ({ size }) => `store/account/profile/${size}?redirect=true`,
      providesTags: ['myProfile']
    }),
    deleteProfile: builder.mutation({
      query: data => ({
        url: `store/account/profile`,
        method: 'DELETE',
        body: data
      }),
      invalidatesTags: ['myProfile']
    }),
    customerCheck: builder.query({
      query: ({ email, phone, country_code }) => {
        // Construct query parameters dynamically
        const params = new URLSearchParams();
        if (email) params.append('email', email);
        if (phone) params.append('phone', phone);
        if (country_code) params.append('country_code', country_code);

        return `/profile/customer/check?${params.toString()}`;
      },
      providesTags: ['myProfile']
    }),
    // PATCH: Update customer contact info
    updateCustomerProfile: builder.mutation({
      query: body => ({
        url: '/profile/customer',
        method: 'PATCH',
        body
      }),
      invalidatesTags: ['myProfile'] // Ensures fresh data after update
    })
  })
});

export const {
  useLazyGetProfilePhotoQuery,
  useUpdateProfilePhotoMutation,
  useDeleteProfileMutation,
  useLazyCustomerCheckQuery,
  useUpdateCustomerProfileMutation
} = myProfileApi;
