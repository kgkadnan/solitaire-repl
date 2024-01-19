export const headerlessRoutes = [
  '/login',
  '/forgot-password',
  '/reset-password',
  '/register'
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
export const v2Routes = ['/v2'];
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
  '/for-you'
];
