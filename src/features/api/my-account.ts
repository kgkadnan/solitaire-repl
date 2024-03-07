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
        url: `store/customers/me/myAccount`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['myAccount']
    }),
    getProfilePhoto: builder.query({
      query: () => `store/account/profile/32`,
      providesTags: ['myAccount']
    })
  })
});

export const { useLazyGetProfilePhotoQuery, useUpdateProfilePhotoMutation } =
  myAccountApi;
