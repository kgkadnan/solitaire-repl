declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: typeof YT;
    gtag: any;
    Cookiebot?: {
      consents: {
        statistics: boolean;
        preferences: boolean;
        marketing: boolean;
        necessary: boolean;
      };
    };
  }
}

export {};
