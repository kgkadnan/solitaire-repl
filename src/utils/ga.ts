// utils/ga.ts
export const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // Replace with your GA4 Measurement ID

// Event type definition for tracking events
interface EventParams {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

// Function to track events in Google Analytics 4
export const trackEvent = ({ action, category, label, value }: EventParams) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
};
