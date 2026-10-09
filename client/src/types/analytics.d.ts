declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'js',
      eventNameOrConfig: string | Date,
      params?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

export {};
