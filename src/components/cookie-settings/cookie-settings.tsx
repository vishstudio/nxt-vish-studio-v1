'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { Cookie, X } from 'lucide-react';
import { Button } from '../ui/button/button';
import {
  COOKIE_CONSENT_EVENT,
  COOKIE_CONSENT_KEY,
  COOKIE_SETTINGS_OPEN_EVENT,
  type CookieConsent,
  defaultCookieConsent,
  normalizeCookieConsent,
  readCookieConsent,
  serializeCookieConsent,
} from '@/src/lib/cookie-consent';
import { HERO_REVEALED_EVENT } from '@/src/lib/site-events';

function readConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null;

  const cookieConsent = readCookieConsent(document.cookie);
  if (cookieConsent) return cookieConsent;

  try {
    const storedConsent = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!storedConsent) return null;

    const parsedConsent = JSON.parse(storedConsent) as Partial<CookieConsent>;
    const migratedConsent = normalizeCookieConsent(parsedConsent);

    if (migratedConsent) {
      document.cookie = serializeCookieConsent(migratedConsent);
      window.localStorage.removeItem(COOKIE_CONSENT_KEY);
    }

    return migratedConsent;
  } catch {
    return null;
  }
}

function writeConsent(consent: CookieConsent) {
  document.cookie = serializeCookieConsent(consent);
  window.localStorage.removeItem(COOKIE_CONSENT_KEY);
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: consent }));
}

export function openCookieSettings() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(COOKIE_SETTINGS_OPEN_EVENT));
}

interface CookieSettingsTriggerProps {
  compact?: boolean;
  className?: string;
}

export function CookieSettingsTrigger({ compact = false, className }: CookieSettingsTriggerProps) {
  return (
    <Button
      variant="secondary"
      size={compact ? 'icon' : 'sm'}
      onClick={openCookieSettings}
      ariaLabel="Open cookie settings"
      className={className}
      icon={!compact ? <Cookie className="h-4 w-4" /> : undefined}
      iconPosition="left"
    >
      {compact ? <Cookie className="h-4 w-4" /> : 'Cookie Settings'}
    </Button>
  );
}

export function CookieSettings() {
  const pathname = usePathname();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasHeroRevealed, setHasHeroRevealed] = useState(false);
  const [showPreferenceBanner, setShowPreferenceBanner] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [draftConsent, setDraftConsent] = useState<CookieConsent>(defaultCookieConsent);

  useEffect(() => {
    const savedConsent = readConsent();
    setConsent(savedConsent);
    setDraftConsent(savedConsent ?? defaultCookieConsent);
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (pathname !== '/') {
      setHasHeroRevealed(true);
      return undefined;
    }

    setHasHeroRevealed(false);

    const handleHeroRevealed = () => {
      setHasHeroRevealed(true);
    };

    window.addEventListener(HERO_REVEALED_EVENT, handleHeroRevealed);
    return () => window.removeEventListener(HERO_REVEALED_EVENT, handleHeroRevealed);
  }, [pathname]);

  useEffect(() => {
    if (!hasLoaded || !hasHeroRevealed || consent) {
      setShowPreferenceBanner(false);
      return undefined;
    }

    const bannerTimer = window.setTimeout(() => {
      setShowPreferenceBanner(true);
    }, 3000);

    return () => window.clearTimeout(bannerTimer);
  }, [consent, hasHeroRevealed, hasLoaded]);

  const openPanel = () => {
    setDraftConsent(consent ?? defaultCookieConsent);
    setIsPanelOpen(true);
  };

  useEffect(() => {
    window.addEventListener(COOKIE_SETTINGS_OPEN_EVENT, openPanel);
    return () => window.removeEventListener(COOKIE_SETTINGS_OPEN_EVENT, openPanel);
  });

  const saveConsent = (nextConsent: CookieConsent) => {
    writeConsent(nextConsent);
    setConsent(nextConsent);
    setDraftConsent(nextConsent);
    setIsPanelOpen(false);
  };

  const acceptAll = () => saveConsent({ necessary: true, analytics: true });
  const rejectOptional = () => saveConsent(defaultCookieConsent);
  const toggleAnalytics = () => {
    setDraftConsent({
      necessary: true,
      analytics: !draftConsent.analytics,
    });
  };

  if (!hasLoaded) {
    return null;
  }

  return (
    <>
      <AnimatePresence>
        {!consent && !isPanelOpen && showPreferenceBanner && (
          <motion.aside
            initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-5 left-4 right-4 z-[80] mx-auto max-w-[1400px] rounded-[2rem] border border-white/10 bg-black/85 p-5 shadow-2xl shadow-black/60 backdrop-blur-xl md:bottom-8 md:left-6 md:right-6 md:p-6"
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
              <div>
                <p className="mb-3 font-mono text-xs uppercase tracking-widest text-vish-accent">
                  Cookie Preferences
                </p>
                <h2 className="font-display text-2xl leading-tight text-white md:text-3xl">
                  We use cookies to keep the site sharp.
                </h2>
                <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-gray-400">
                  Necessary cookies keep the website working. Analytics cookies help us understand performance and improve the experience.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 justify-end">
                <Button variant="ghost" size="sm" onClick={openPanel}>
                  Settings
                </Button>
                <Button variant="outline" size="sm" onClick={rejectOptional}>
                  Reject
                </Button>
                <Button variant='white' size="sm" onClick={acceptAll}>
                  Accept
                </Button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isPanelOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[90] bg-black/65 backdrop-blur-sm"
            onClick={() => setIsPanelOpen(false)}
          >
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-labelledby="cookie-settings-title"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 36 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="ml-auto flex h-full w-full flex-col overflow-y-auto border-l border-white/10 bg-[#050505] p-6 shadow-2xl shadow-black/70 sm:w-[460px] md:p-8"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="mb-4 font-mono text-xs uppercase tracking-widest text-vish-accent">
                    Privacy Controls
                  </p>
                  <h2 id="cookie-settings-title" className="font-display text-4xl leading-tight text-white md:text-5xl">
                    Cookie settings<span className="text-vish-accent">.</span>
                  </h2>
                </div>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => setIsPanelOpen(false)}
                  ariaLabel="Close cookie settings"
                  className="h-11 w-11 shrink-0"
                >
                  <X className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
                </Button>
              </div>
              <p className="mt-5 max-w-xl font-sans text-sm leading-relaxed text-gray-400 md:text-base">
                Choose which optional cookies VISH Studio can use. You can update these settings at any time from this panel.
              </p>

              <div className="mt-8 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <h3 className="font-display text-xl text-white">Necessary cookies</h3>
                      <p className="mt-2 font-sans text-sm leading-relaxed text-gray-500">
                        Required for core website behavior and cannot be disabled.
                      </p>
                    </div>
                    <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-white/45">
                      Always on
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-display text-xl text-white">Analytics cookies</h3>
                      <p className="mt-2 max-w-md font-sans text-sm leading-relaxed text-gray-500">
                        Allows Google Analytics to measure traffic and page interactions without changing the website experience.
                      </p>
                    </div>
                    <Button
                      variant={draftConsent.analytics ? 'cta' : 'outline'}
                      size="sm"
                      onClick={toggleAnalytics}
                      ariaLabel={`Turn analytics cookies ${draftConsent.analytics ? 'off' : 'on'}`}
                    >
                      {draftConsent.analytics ? 'Analytics On' : 'Analytics Off'}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6">
                <Button variant="ghost" size="sm" onClick={() => setIsPanelOpen(false)}>
                  Cancel
                </Button>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="sm" onClick={rejectOptional}>
                    Reject Optional
                  </Button>
                  <Button variant="cta" size="sm" onClick={() => saveConsent(draftConsent)}>
                    Save Settings
                  </Button>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
