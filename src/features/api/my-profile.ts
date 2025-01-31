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
      query: ({ email, phone, country_code, channel }) => {
        // Construct query parameters dynamically
        const params = new URLSearchParams();
        if (email) params.append('email', email);
        if (phone) params.append('phone', phone);
        if (country_code) params.append('country_code', country_code);

        // Construct the base URL with the optional channel parameter
        const baseUrl = `/store/account/profile/customer/check/${channel}`;

        return `${baseUrl}?${params.toString()}`;
      }
    }),
    // PATCH: Update customer contact info
    updateCustomerProfile: builder.mutation({
      query: body => ({
        url: '/store/account/profile/customer',
        method: 'PATCH',
        body
      })
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
