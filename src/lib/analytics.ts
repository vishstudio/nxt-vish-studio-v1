import { COOKIE_CONSENT_EVENT, readCookieConsent } from "./cookie-consent";

/**
 * Analytics event name constants.
 * Use these constants instead of string literals for type safety.
 */
export const AnalyticsEvent = {
  PAGE_VIEW: "page_view",
  BUTTON_CLICK: "button_click",
  PROJECT_INQUIRY_OPEN: "project_inquiry_open",
  PROJECT_INQUIRY_STEP: "project_inquiry_step",
  PROJECT_INQUIRY_SUBMIT: "project_inquiry_submit",
  PROJECT_INQUIRY_ERROR: "project_inquiry_error",
  CONTACT_EMAIL_CLICK: "contact_email_click",
  OUTBOUND_LINK_CLICK: "outbound_link_click",
  SOCIAL_LINK_CLICK: "social_link_click",
  PRICING_CTA_CLICK: "pricing_cta_click",
  PROJECT_SITE_CLICK: "project_site_click",
} as const;

/**
 * Cached consent state.
 * Resolved lazily on first event, invalidated when consent changes.
 */
let cachedConsent: boolean | null = null;

if (typeof window !== "undefined") {
  window.addEventListener(COOKIE_CONSENT_EVENT, (e: Event) => {
    cachedConsent = Boolean(
      (e as CustomEvent<{ analytics?: boolean }>).detail?.analytics,
    );
  });
}

/**
 * Checks if the user has granted analytics consent.
 * Returns cached value if available, otherwise reads from cookie.
 *
 * @returns True if analytics consent is granted, false otherwise
 */
const hasConsent = (): boolean => {
  if (cachedConsent !== null) return cachedConsent;
  cachedConsent = readCookieConsent(document.cookie)?.analytics ?? false;
  return cachedConsent;
};

/**
 * Internal helper that sends analytics events to Google Analytics.
 * Logs events in development, checks SSR environment, gtag availability, and user consent.
 *
 * @param eventName - The name of the event to track
 * @param params - Optional event parameters
 */
const send = (
  eventName: string,
  params?: Record<string, string | number | boolean>,
) => {
  if (process.env.NODE_ENV === "development") {
    console.debug("[GA]", eventName, params);
  }
  if (typeof window === "undefined") return;
  if (!window.gtag) return;
  if (!hasConsent()) return;
  window.gtag("event", eventName, params);
};

/**
 * Generic event tracking function.
 * Use typed helper functions below when available for better type safety and consistency.
 *
 * @param eventName - The name of the event to track
 * @param params - Optional event parameters
 */
export const trackEvent = (
  eventName: string,
  params?: Record<string, string | number | boolean>,
) => {
  send(eventName, params);
};

/**
 * Tracks button clicks with conversion actions.
 *
 * @param action - Snake_case identifier for the action (e.g., "project_inquiry_start")
 * @param label - Short identifier for the button (use the action string, not a human sentence)
 */
export const trackButtonClick = (action: string, label: string) => {
  send(AnalyticsEvent.BUTTON_CLICK, { action, label });
};

/**
 * Tracks when the project inquiry modal is opened.
 */
export const trackProjectInquiryOpen = () => {
  send(AnalyticsEvent.PROJECT_INQUIRY_OPEN);
};

/**
 * Tracks progression through project inquiry modal steps.
 *
 * @param stepIndex - Zero-based index of the step the user is advancing to
 * @param stepName - Name of the step matching modal labels
 */
export const trackProjectInquiryStep = (
  stepIndex: number,
  stepName: string,
) => {
  send(AnalyticsEvent.PROJECT_INQUIRY_STEP, {
    step_index: stepIndex,
    step_name: stepName,
  });
};

/**
 * Tracks successful project inquiry form submission.
 * Only tracks non-PII fields: project type, budget tier, and timeline.
 * Does NOT track name, email, company, or description.
 *
 * @param projectType - Type of project requested
 * @param budgetTier - Budget range selected
 * @param timeline - Project timeline selected
 */
export const trackProjectInquirySubmit = (
  projectType: string,
  budgetTier: string,
  timeline: string,
) => {
  send(AnalyticsEvent.PROJECT_INQUIRY_SUBMIT, {
    project_type: projectType,
    budget_tier: budgetTier,
    timeline,
  });
};

/**
 * Tracks errors during project inquiry form submission.
 */
export const trackProjectInquiryError = () => {
  send(AnalyticsEvent.PROJECT_INQUIRY_ERROR);
};

/**
 * Tracks clicks on email contact links.
 */
export const trackEmailClick = () => {
  send(AnalyticsEvent.CONTACT_EMAIL_CLICK);
};

/**
 * Tracks clicks on outbound links to external sites.
 *
 * @param hostname - Hostname only (e.g., "linkedin.com"), never a full URL with path
 * @param label - Human-readable label for the link
 */
export const trackOutboundLink = (hostname: string, label: string) => {
  send(AnalyticsEvent.OUTBOUND_LINK_CLICK, {
    link_url: hostname,
    link_label: label,
  });
};

/**
 * Tracks clicks on social media links.
 *
 * @param platform - Platform name (e.g., "LinkedIn", "Twitter")
 * @param location - Location of the link ("footer" | "mobile_menu")
 */
export const trackSocialLinkClick = (platform: string, location: string) => {
  send(AnalyticsEvent.SOCIAL_LINK_CLICK, { platform, location });
};

/**
 * Tracks clicks on pricing plan CTA buttons.
 *
 * @param planName - The pricing plan name
 * @param ctaType - The link type from CtaLink (e.g., "whatsapp", "email", "internal")
 */
export const trackPricingCtaClick = (planName: string, ctaType: string) => {
  send(AnalyticsEvent.PRICING_CTA_CLICK, {
    plan_name: planName,
    cta_type: ctaType,
  });
};

/**
 * Tracks clicks on project site links.
 *
 * @param slug - Project slug identifier
 * @param title - Optional project title, only pass when readily available
 */
export const trackProjectSiteClick = (slug: string, title?: string) => {
  send(AnalyticsEvent.PROJECT_SITE_CLICK, {
    project_slug: slug,
    ...(title ? { project_title: title } : {}),
  });
};
