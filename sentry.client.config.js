// sentry.client.config.js
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN, // Replace with your DSN
  tracesSampleRate: 1.0 // Adjust this value for performance monitoring (0.0 to 1.0)
});
