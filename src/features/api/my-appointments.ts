import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

export const myAppointmentApi = createApi({
  reducerPath: 'myAppointmentReducer',
  baseQuery: createBaseQuery(),
  tagTypes: ['my-appointment'],

  endpoints: builder => ({
    getMyAppointment: builder.query({
      query: () => `store/appointments`,
      providesTags: ['my-appointment']
    }),
    deleteMyAppointment: builder.mutation({
      query: appointmentId => ({
        url: `store/appointments/${appointmentId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['my-appointment']
    })
  })
});

export const { useLazyGetMyAppointmentQuery, useDeleteMyAppointmentMutation } =
  myAppointmentApi;
