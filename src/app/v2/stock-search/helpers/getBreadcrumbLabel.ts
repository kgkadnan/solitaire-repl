import { Routes } from '@/constants/v2/enums/routes';

// Utility function to get breadcrumb label based on the route
export const getBreadcrumbLabel = (path: string): string => {
  console.log('path', path);
  switch (path) {
    case Routes.DASHBOARD:
      return 'Dashboard';
    case Routes.DETAIL_PAGE:
      return 'Dashboard';
    case Routes.STOCK_SEARCH:
      return 'Stock Search';
    case Routes.SEARCH:
      return 'Search';
    case Routes.YOUR_ORDERS:
      return 'Your Orders';
    case Routes.SAVED_SEARCH:
      return 'Saved Searches';
    case Routes.APPOINTMENTS:
      return 'Appointments';
    case Routes.MY_CART:
      return 'My Cart';
    case Routes.SETTINGS:
      return 'Settings';
    case Routes.KYC:
      return 'KYC';
    case Routes.NEW_ARRIVAL:
      return 'New Arrivals';
    case Routes.BID_TO_BUY:
      return 'Bid to Buy';
    case Routes.MY_APPOINTMENTS:
      return 'My Appointments';
    case Routes.MY_ACCOUNT:
      return 'My Account';
    case Routes.FAQS:
      return 'FAQs';
    case Routes.MATCHING_PAIR:
      return 'Matching Pair';
    case Routes.TURKEY:
      return 'Turkey';
    default:
      return 'Unknown'; // Fallback for unmatched routes
  }
};
