import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const createBaseQuery = () => {
  return fetchBaseQuery({
    baseUrl: apiURL,
    prepareHeaders: headers => {
      const storedUser = localStorage.getItem('user');
      const token = storedUser ? JSON.parse(storedUser) : null;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    }
  });
};
