import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const apiURL = process.env.NEXT_PUBLIC_API_URL;

// const header =
export const cartApi = createApi({
  reducerPath: 'cartReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: apiURL,
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6ImN1c18wMUhDOVYxVDRNSkVWWkhWTUJZUkY4NDFRTiIsImRvbWFpbiI6InN0b3JlIiwiaWF0IjoxNjk3NTMyNTYwLCJleHAiOjE3MDAxMjQ1NjB9.qdhsLTNiU7sNLyUbesWLxjtql9MceZCBYIxZ1nnCh9U',
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
    }),
  }),
});

export const { useAddCartMutation } = cartApi;
