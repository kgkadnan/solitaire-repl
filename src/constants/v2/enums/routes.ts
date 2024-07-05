export enum Routes {
  DASHBOARD = '/v2',
  SEARCH = '/v2/search',
  YOUR_ORDERS = '/v2/your-orders',
  SAVED_SEARCH = '/v2/saved-searches',
  APPOINTMENTS = '/v2/appointments',
  MY_CART = '/v2/my-cart',
  SETTINGS = '/v2/setting',
  KYC = '/v2/kyc',
  NEW_ARRIVAL = '/v2/new-arrivals',
  BID_TO_BUY = '/v2/bid-2-buy',
  MY_APPOINTMENTS = '/v2/my-appointments',
  MY_ACCOUNT = '/v2/my-account',
  FAQS = '/v2/faqs',
  MATCHING_PAIR = '/v2/matching-pair'
}
// Enum using the enum keyword
export enum SubRoutes {
  BID_TO_BUY = 'bid_to_buy',
  NEW_SEARCH = 'new-search',
  RESULT = 'result',
  SAVED_SEARCH = 'saved-search',
  NEW_ARRIVAL = 'new-arrival'
}

export enum MatchSubRoutes {
  NEW_SEARCH = 'new-search',
  RESULT = 'result',
  SAVED_SEARCH = 'saved-search'
}
