export const COOKIE_CONSENT_KEY = 'vish_cookie_consent';
export const COOKIE_CONSENT_EVENT = 'vish:cookies-updated';
export const COOKIE_SETTINGS_OPEN_EVENT = 'vish:cookies-open-settings';

export interface CookieConsent {
  necessary: true;
  analytics: boolean;
}

export const defaultCookieConsent: CookieConsent = {
  necessary: true,
  analytics: false,
};

export function normalizeCookieConsent(value: Partial<CookieConsent> | null): CookieConsent | null {
  if (!value) return null;

  return {
    necessary: true,
    analytics: Boolean(value.analytics),
  };
}
