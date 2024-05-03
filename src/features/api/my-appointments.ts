import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';

export const myAppointmentApi = createApi({
  reducerPath: 'myAppointmentReducer',
  baseQuery: createBaseQuery(),
  tagTypes: ['my-appointment'],

  endpoints: builder => ({
    addMyAppointment: builder.mutation({
      query: data => ({
        url: `store/appointments`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['my-appointment']
    }),
    rescheduleMyAppointment: builder.mutation({
      query: ({ appointmentId, data }) => ({
        url: `store/appointments/${appointmentId}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['my-appointment']
    }),
    getMyAppointment: builder.query({
      query: () => `store/appointments`,
      providesTags: ['my-appointment']
    }),
    getMyAppointmentCreatePayload: builder.query({
      query: () => `/store/appointments/create-request-payload`,
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

export const {
  useLazyGetMyAppointmentQuery,
  useDeleteMyAppointmentMutation,
  useLazyGetMyAppointmentCreatePayloadQuery,
  useAddMyAppointmentMutation,
  useRescheduleMyAppointmentMutation
} = myAppointmentApi;
