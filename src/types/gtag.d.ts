declare global {
  interface Window {
    /**
     * Google Analytics gtag function for tracking events and page views.
     * Available after the Google Analytics script has loaded.
     *
     * @param command - The gtag command (e.g., "event", "config", "consent")
     * @param args - Additional arguments specific to the command
     */
    gtag?: (command: string, ...args: unknown[]) => void;

    /**
     * Google Analytics data layer array.
     * Used internally by gtag to queue and process analytics events.
     */
    dataLayer?: unknown[];

    /**
     * Custom flag indicating whether the Vish Studio Google Analytics script has loaded.
     * Prevents duplicate script injection.
     */
    __vishGoogleAnalyticsLoaded?: boolean;
  }
}

export {};
