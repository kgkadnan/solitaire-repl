import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

// const header =
export const myAccountApi = createApi({
  reducerPath: 'myAccountReducer',
  baseQuery: createBaseQuery(),
  tagTypes: ['myAccount'],

  endpoints: builder => ({
    updateProfilePhoto: builder.mutation({
      query: data => ({
        url: `store/account/upload-profile-photo`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['myAccount']
    }),
    getProfilePhoto: builder.query({
      query: ({ size }) => `store/account/profile/${size}?redirect=true`,
      providesTags: ['myAccount']
    }),
    deleteProfile: builder.mutation({
      query: data => ({
        url: `store/account/profile`,
        method: 'DELETE',
        body: data
      }),
      invalidatesTags: ['myAccount']
    })
  })
});

export const {
  useLazyGetProfilePhotoQuery,
  useUpdateProfilePhotoMutation,
  useDeleteProfileMutation
} = myAccountApi;
