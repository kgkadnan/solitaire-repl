import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const apiURL = process.env.NEXT_PUBLIC_API_URL;

// const header =
export const cartApi = createApi({
  reducerPath: 'cartReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: apiURL,
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6ImN1c18wMUhERUtLMVQyUlNXNUpIVzdERlNUWjdEVCIsImRvbWFpbiI6InN0b3JlIiwiaWF0IjoxNjk4MDc2MTYwLCJleHAiOjE3MDA2NjgxNjB9.6Yzsnd8xXUVb_FuhgCpi77WuXBjUKUrcKgxb_RsCxe4',
    },
  }),
  tagTypes: ['cart'],

  endpoints: (builder) => ({
    addCart: builder.mutation({
      query: (data) => ({
        url: `cart`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['cart'],
    }),
    getCart: builder.query({
      query: () => `cart`,
      providesTags: ['cart'],
    }),
    deleteCart: builder.mutation({
      query: (data) => ({
        url: `cart`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['cart'],
    }),
  }),
});

export const { useAddCartMutation, useGetCartQuery, useDeleteCartMutation } =
  cartApi;
