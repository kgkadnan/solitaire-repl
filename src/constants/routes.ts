export const headerlessRoutes = [
  '/login',
  '/forgot-password',
  '/reset-password',
  '/register',
  '/v2/register'
];

export const myAccountRoutes = [
  '/my-account/kyc',
  '/my-account/summary',
  '/my-account/change-password',
  '/my-account/manage-diamond-sequence',
  '/my-account/report-bug',
  '/my-account/email-notification'
];
export const notificationRoutes = [
  '/notification/all-notification',
  '/notification/setting'
];
export const v2Routes = [
  '/v2',
  '/v2/search',
  '/v2/my-diamonds',
  '/v2/saved-searches',
  '/v2/appointments',
  '/v2/my-cart',
  '/v2/setting',
  '/v2/register'
];
export const protectedRoutes = [
  '/',
  '/search',
  '/my-diamonds',
  '/my-cart',
  '/compare-stone',
  ...notificationRoutes,
  ...myAccountRoutes,
  ...v2Routes
];

export const applicationRoutes = [
  ...headerlessRoutes,
  ...protectedRoutes,
  '/match-pair',
  '/new-arrival',
  '/layouts',
  '/appointments',
  '/for-you',
  ...v2Routes
];
