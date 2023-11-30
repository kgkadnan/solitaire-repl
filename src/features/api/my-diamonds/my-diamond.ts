import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
} from '@reduxjs/toolkit/query/react';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

// Define the type for the base query function
type BaseQuery = BaseQueryFn<any, unknown, unknown>;

export const myDiamondAPI = createApi({
  reducerPath: 'recentConfirmationReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: apiURL,
    credentials: 'include',
  }) as BaseQuery,
  tagTypes: ['myDiamond'],
  endpoints: (builder) => ({
    cardRecentConfirmation: builder.query({
      query: ({
        myDiamondStatus,
        fulfillmentStatus,
        paymentStatus,
        fields,
        expand,
        dateSearchUrl,
      }) =>
        `/store/customers/me/orders?status=${myDiamondStatus}&fulfillment_status=${fulfillmentStatus}&payment_status=${paymentStatus}&fields=${fields}&expand=${expand}&${dateSearchUrl}`,
      providesTags: ['myDiamond'],
    }),
    getAllRecentConfirmation: builder.query({
      query: ({ orderId, singleExpand }) =>
        `/store/orders/${orderId}?expand=${singleExpand}`,
      providesTags: ['myDiamond'],
    }),

    confirmStone: builder.mutation({
      query: (data) => ({
        url: `confirm-stone`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['myDiamond'],
    }),
  }),
});

export const {
  useCardRecentConfirmationQuery,
  useGetAllRecentConfirmationQuery,
  useConfirmStoneMutation,
} = myDiamondAPI;
