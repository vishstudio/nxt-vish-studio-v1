'use client';

import { FormEvent, useId, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { createNewsletterSubscription } from '@/src/lib/firebase';
import { trackNewsletterSubscribe } from '@/src/lib/analytics';
import type { SiteSettings } from '@/src/lib/content';
import { Button } from '../ui/button/button';
import { FormField } from '../form-field/form-field';

export const NEWSLETTER_PROMPT_KEY = 'vish-newsletter-prompt-status';

const getNewsletterErrorMessage = (error: unknown) => {
  const message = error instanceof Error ? error.message : '';
  if (message.includes('permission-denied') || message.includes('Missing or insufficient permissions')) {
    return 'Newsletter storage permissions are not live yet. Please deploy the latest Firestore rules, then try again.';
  }

  return message || 'We could not save your email. Please try again.';
};

interface NewsletterSignupProps {
  source: 'popup' | 'footer';
  settings: Pick<
    SiteSettings,
    | 'newsletterHeading'
    | 'newsletterDescription'
    | 'newsletterButtonLabel'
    | 'newsletterConsent'
    | 'footerNewsletterHeading'
    | 'footerNewsletterDescription'
  >;
  tinaField?: (fieldName: string) => string | undefined;
  onSuccess?: () => void;
}

export const NewsletterSignup = ({ source, settings, tinaField, onSuccess }: NewsletterSignupProps) => {
  const inputId = useId();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const isPopup = source === 'popup';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'submitting') return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      await createNewsletterSubscription(email, source);
      window.localStorage.setItem(NEWSLETTER_PROMPT_KEY, 'subscribed');
      setStatus('success');
      trackNewsletterSubscribe(source);
      onSuccess?.();
    } catch (error) {
      setStatus('error');
      setErrorMessage(getNewsletterErrorMessage(error));
    }
  };

  const copy = isPopup
    ? {
        heading: settings.newsletterHeading,
        description: settings.newsletterDescription,
      }
    : {
        heading: settings.footerNewsletterHeading,
        description: settings.footerNewsletterDescription,
      };

  if (status === 'success') {
    return (
      <div className={isPopup ? 'py-6' : 'rounded-2xl border border-vish-accent/30 bg-vish-accent/[0.06] p-5'} aria-live="polite">
        <div className="flex items-start gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-vish-accent text-black">
            <Check className="size-4" aria-hidden="true" />
          </span>
          <div>
            <p className="font-display text-2xl text-white">You&apos;re on the list<span className="text-vish-accent">.</span></p>
            <p className="mt-2 font-sans text-sm leading-relaxed text-gray-400">
              Watch your inbox for the next VISH Studio note.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-vish-accent">Studio notes</p>
      <h2
        className={isPopup ? 'mt-4 font-display text-4xl leading-[0.98] text-white sm:text-5xl' : 'mt-3 font-display text-3xl leading-tight text-white'}
        data-tina-field={tinaField?.(isPopup ? 'newsletterHeading' : 'footerNewsletterHeading')}
      >
        {copy.heading}<span className="text-vish-accent">.</span>
      </h2>
      <p
        className="mt-4 max-w-xl font-sans text-sm leading-relaxed text-gray-400 md:text-base"
        data-tina-field={tinaField?.(isPopup ? 'newsletterDescription' : 'footerNewsletterDescription')}
      >
        {copy.description}
      </p>

      <form onSubmit={handleSubmit} className="mt-6">
        <div className={isPopup ? 'space-y-3' : 'grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end'}>
          <FormField
            id={inputId}
            label="Email address"
            labelClassName="sr-only"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="you@company.com"
            autoComplete="email"
            required
            inputClassName={isPopup ? '' : 'px-4 py-3 text-sm'}
          />
          <Button
            type="submit"
            variant="cta"
            size="md"
            disabled={status === 'submitting'}
            className={isPopup ? 'w-full' : 'min-h-12 whitespace-nowrap'}
            icon={<ArrowRight className="size-4" />}
          >
            {status === 'submitting' ? 'Joining...' : settings.newsletterButtonLabel}
          </Button>
        </div>
        {status === 'error' && (
          <p className="mt-3 font-sans text-sm leading-relaxed text-red-300" role="alert">
            {errorMessage}
          </p>
        )}
        <p
          className="mt-4 font-sans text-xs leading-relaxed text-gray-500"
          data-tina-field={isPopup ? tinaField?.('newsletterConsent') : undefined}
        >
          {settings.newsletterConsent}
        </p>
      </form>
    </div>
  );
};
