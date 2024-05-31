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
    })
  })
});

export const {
  useLazyGetProfilePhotoQuery,
  useUpdateProfilePhotoMutation,
  useDeleteProfileMutation
} = myProfileApi;
