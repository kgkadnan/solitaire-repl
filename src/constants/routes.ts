export const headerlessRoutes = [
  '/login',
  '/forgot-password',
  '/reset-password',
  '/register',
  '/otp-verification',
  '/successfully-created'
];

export const myAccountRoutes = [
  '/my-account/summary',
  '/my-account/change-password',
  '/my-account/email-notification',
  '/my-account/report-bug',
  '/my-account/manage-diamond-sequence',
  '/my-account/kyc'
];

export const protectedRoutes = [
  '/',
  '/search',
  '/my-diamonds',
  '/my-cart',
  '/compare-stone',
  '/confirmation-screen',
  '/notification',
  ...myAccountRoutes
];
