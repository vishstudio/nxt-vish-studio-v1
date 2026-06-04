export const COOKIE_CONSENT_KEY = 'vish_cookie_consent';
export const COOKIE_CONSENT_EVENT = 'vish:cookies-updated';
export const COOKIE_SETTINGS_OPEN_EVENT = 'vish:cookies-open-settings';
export const COOKIE_CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 180;

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

export function parseCookieConsentValue(value: string | undefined): CookieConsent | null {
  if (!value) return null;

  try {
    return normalizeCookieConsent(JSON.parse(decodeURIComponent(value)) as Partial<CookieConsent>);
  } catch {
    return null;
  }
}

export function readCookieConsent(cookieSource: string): CookieConsent | null {
  const consentCookie = cookieSource
    .split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${COOKIE_CONSENT_KEY}=`));

  if (!consentCookie) return null;

  return parseCookieConsentValue(consentCookie.slice(COOKIE_CONSENT_KEY.length + 1));
}

export function serializeCookieConsent(consent: CookieConsent): string {
  const encodedConsent = encodeURIComponent(JSON.stringify(consent));
  const secureAttribute = typeof window !== 'undefined' && window.location.protocol === 'https:'
    ? '; Secure'
    : '';

  return `${COOKIE_CONSENT_KEY}=${encodedConsent}; Path=/; Max-Age=${COOKIE_CONSENT_MAX_AGE_SECONDS}; SameSite=Lax${secureAttribute}`;
}
