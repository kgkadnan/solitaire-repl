import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const savedSearchesApi = createApi({
  reducerPath: "savedSearchReducer",
  baseQuery: fetchBaseQuery({ baseUrl: apiURL }),

  endpoints: (builder) => ({
    getAllSavedSearches: builder.query({
      query: () => "saveAndSearch",
    }),
    // getProduct: builder.query({
    //   query: (product) => `products/search?q=${product}`,   
    // }),
  }),
});

export const { useGetAllSavedSearchesQuery  } = savedSearchesApi;