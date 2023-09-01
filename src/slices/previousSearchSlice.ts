import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const previousSearchApi = createApi({
  reducerPath: "previousSearchReducer",
  baseQuery: fetchBaseQuery({ baseUrl: apiURL }),

  endpoints: (builder) => ({
    getAllPreviousSearches: builder.query({
        query: ({ currentPage, resultsPerPage, isDeleted }) => `previous-search?is_deleted=${isDeleted}&page=${currentPage}&perPage=${resultsPerPage}`,
    }),
    updatePreviousSearch: builder.mutation({
        query: ( filter ) => ({
          url: `previous-search`,
          method: 'PUT', // Use the appropriate HTTP method
          body: filter , // Modify this to match your API's payload
        }),
      }),
  
  }),
});

export const { useGetAllPreviousSearchesQuery , useUpdatePreviousSearchMutation  } = previousSearchApi;