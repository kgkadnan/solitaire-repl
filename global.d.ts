declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: typeof YT;
    gtag: any;
    Cookiebot?: {
      consent: {
        stamp: string;
        statistics: boolean;
        preferences: boolean;
        marketing: boolean;
        necessary: boolean;
      };
      renew?: any;
    };
  }
}

export {};
