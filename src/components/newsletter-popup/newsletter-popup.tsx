'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { COOKIE_CONSENT_EVENT, readCookieConsent } from '@/src/lib/cookie-consent';
import { getSiteSettings } from '@/src/lib/content';
import { Button } from '../ui/button/button';
import { NEWSLETTER_PROMPT_KEY, NewsletterSignup } from '../newsletter-signup/newsletter-signup';

const shouldShowPrompt = () => window.localStorage.getItem(NEWSLETTER_PROMPT_KEY) === null;
const newsletterSettings = getSiteSettings();

export const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!shouldShowPrompt()) return undefined;

    let timer: number | undefined;
    const openPrompt = () => {
      timer = window.setTimeout(() => {
        if (shouldShowPrompt()) setIsOpen(true);
      }, 1200);
    };

    if (readCookieConsent(document.cookie)) {
      timer = window.setTimeout(() => {
        if (shouldShowPrompt()) setIsOpen(true);
      }, 4200);
    } else {
      window.addEventListener(COOKIE_CONSENT_EVENT, openPrompt, { once: true });
    }

    return () => {
      if (timer) window.clearTimeout(timer);
      window.removeEventListener(COOKIE_CONSENT_EVENT, openPrompt);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleClose = () => {
    window.localStorage.setItem(NEWSLETTER_PROMPT_KEY, 'dismissed');
    setIsOpen(false);
  };

  const handleSuccess = () => {
    window.setTimeout(() => setIsOpen(false), 1800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/75 px-4 py-4 backdrop-blur-sm md:items-center md:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={handleClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="newsletter-popup-title"
            className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-vish-bg p-6 shadow-2xl shadow-black/70 md:p-8"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-vish-accent/60 to-transparent" />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleClose}
              ariaLabel="Close newsletter signup"
              className="absolute right-5 top-5 border border-white/10 bg-white/[0.04] text-white/60 hover:border-white/25"
            >
              <X className="size-4" />
            </Button>
            <div id="newsletter-popup-title" className="pr-12">
              <NewsletterSignup source="popup" settings={newsletterSettings} onSuccess={handleSuccess} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
