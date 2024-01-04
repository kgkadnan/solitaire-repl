export const headerlessRoutes = [
  '/login',
  '/forgot-password',
  '/reset-password',
  '/register',
  '/otp-verification',
  '/successfully-created'
];

export const protectedRoutes = [
  '/',
  '/search',
  '/my-diamonds',
  '/my-cart',
  '/compare-stone',
  '/notification',
  '/my-account'
];

export const applicationRoutes = [
  ...headerlessRoutes,
  ...protectedRoutes,
  '/match-pair',
  '/new-arrival',
  '/layouts',
  '/appointments'
];
