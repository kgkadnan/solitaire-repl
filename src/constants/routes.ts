export const headerlessRoutes = [
  '/v2/register',
  '/v2/login',
  '/v2/forgot-password',
  '/privacy-policy'
];

export const v2Routes = [
  '/',
  '/v2',
  '/v2/search',
  '/v2/kyc',
  '/v2/your-orders',
  '/v2/saved-searches',
  '/v2/appointments',
  '/v2/my-cart',
  '/v2/setting',
  '/v2/register',
  '/v2/login',
  '/v2/forgot-password',
  '/v2/new-arrivals',
  '/v2/bid-2-buy',
  '/v2/my-account',
  '/v2/faqs',
  '/v2/my-appointments',
];
export const protectedRoutes = ['/', ...v2Routes];

export const applicationRoutes = [
  ...headerlessRoutes,
  ...protectedRoutes,
  ...v2Routes
];
