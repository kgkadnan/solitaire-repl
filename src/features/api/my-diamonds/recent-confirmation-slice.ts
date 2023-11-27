import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
} from '@reduxjs/toolkit/query/react';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

// Define the type for the base query function
type BaseQuery = BaseQueryFn<any, unknown, unknown>;

export const recentConfirmationApi = createApi({
  reducerPath: 'recentConfirmationReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: apiURL,
    credentials: 'include',
  }) as BaseQuery,
  tagTypes: ['recentConfirmation'],
  endpoints: (builder) => ({
    cardRecentConfirmation: builder.query({
      query: ({
        myDiamondStatus,
        fulfillmentStatus,
        paymentStatus,
        fields,
        expand,
      }) =>
        `/store/customers/me/orders?status=${myDiamondStatus}&fulfillment_status=${fulfillmentStatus}&payment_status=${paymentStatus}&fields=${fields}&expand=${expand}`,
      providesTags: ['recentConfirmation'],
    }),
    getAllRecentConfirmation: builder.query({
      query: ({ orderId, singleExpand }) => `/store/orders/${orderId}`,
      providesTags: ['recentConfirmation'],
    }),
  }),
});

export const {
  useCardRecentConfirmationQuery,
  useGetAllRecentConfirmationQuery,
} = recentConfirmationApi;
