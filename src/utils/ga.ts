// utils/ga.ts
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA; // Replace with your GA4 Measurement ID

// Function to track events in Google Analytics 4
export const trackEvent = ({
  action,
  category,
  label,
  ...params
}: {
  action: string;
  category?: string;
  label?: string;
  [key: string]: any;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    if (
      window.Cookiebot &&
      window.Cookiebot.consent &&
      window.Cookiebot.consent.statistics
    ) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        platform: 'Web',
        ...params // Dynamically include all other custom parameters
      });
    }
  }
};
