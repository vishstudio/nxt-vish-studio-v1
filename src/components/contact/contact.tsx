'use client';

import { trackEmailClick, trackSocialLinkClick } from '@/src/lib/analytics';
import {
  PROJECT_INQUIRY_ACTION,
  PROJECT_INQUIRY_ARIA_LABEL,
  PROJECT_INQUIRY_HREF,
} from '@/src/lib/conversion';
import { ArrowUpRight, CalendarCheck } from 'lucide-react';
import { useTinaSettings } from '../../hooks/useTinaVisualEditing';
import { CookieSettingsTrigger } from '../cookie-settings/cookie-settings-trigger';
import { LogoText } from '../logo-text/logo-text';
import { NewsletterSignup } from '../newsletter-signup/newsletter-signup';
import { Button } from '../ui/button/button';

const exploreLinks = [
  { label: 'Our work', href: '/projects' },
  { label: 'About the studio', href: '/about' },
  { label: 'Client stories', href: '/testimonials' },
  { label: 'Schedule a call', href: '/book-call' },
];

const serviceLinks = [
  { label: 'All services', href: '/services' },
  { label: 'Websites', href: '/services/websites' },
  { label: 'SaaS products', href: '/services/saas-products' },
  { label: 'AI automations', href: '/services/ai-automations' },
];

export const Contact = () => {
  const { data: settings, tinaField, rawSiteSettings } = useTinaSettings();

  return (
    <footer className="contact bg-black px-6 pb-8 pt-14 text-white md:px-12 md:pb-10 md:pt-20" id="contact">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 border-y border-white/10 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.82fr)] lg:gap-16 lg:py-14">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-vish-accent">Let&apos;s connect</p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl font-medium tracking-tight text-white sm:text-5xl md:text-6xl">
              <span className="text-white" data-tina-field={tinaField('contactHeadingLine1')}>
                {settings.contactHeadingLine1}
              </span>{' '}
              <span className="text-vish-gray" data-tina-field={tinaField('contactHeadingLine2')}>
                {settings.contactHeadingLine2}
              </span>
              <span className="text-vish-accent">.</span>
            </h2>
            <Button
              href={PROJECT_INQUIRY_HREF}
              variant="cta"
              size="md"
              ariaLabel={PROJECT_INQUIRY_ARIA_LABEL}
              dataConversionAction={PROJECT_INQUIRY_ACTION}
              icon={<CalendarCheck className="size-4" />}
              className="mt-8 w-fit"
            >
              Schedule a free call
            </Button>
          </div>
          <div className="border-t border-white/10 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <NewsletterSignup source="footer" settings={settings} tinaField={tinaField} />
          </div>
        </div>

        <div className="grid gap-x-8 gap-y-12 border-b border-white/10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-mono text-xs uppercase tracking-widest text-gray-500">Reach us</h3>
            <div className="mt-4 grid gap-3">
              <a
                href={`mailto:${settings.email}`}
                className="notranslate group flex w-fit items-center gap-1.5 font-sans text-sm text-white transition-colors hover:text-vish-accent"
                aria-label="Start a project inquiry with VISH Studio by email"
                onClick={trackEmailClick}
                translate="no"
              >
                <span>{settings.email}</span>
                <ArrowUpRight className="size-3.5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
              <a
                href={settings.phoneLink}
                className="group flex w-fit items-center gap-1.5 font-sans text-sm text-white transition-colors hover:text-vish-accent"
                aria-label="Call VISH Studio"
              >
                <span>{settings.phone}</span>
                <ArrowUpRight className="size-3.5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            </div>
            <address className="mt-6 whitespace-pre-line font-sans text-sm leading-relaxed text-gray-400 not-italic">
              {settings.address}
            </address>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-gray-500">Explore</h3>
            <nav className="mt-4 grid justify-items-start gap-3" aria-label="Footer navigation">
              {exploreLinks.map((link) => (
                <Button key={link.href} href={link.href} variant="link" size="text" className="text-sm font-normal text-gray-400 no-underline hover:text-white hover:no-underline">
                  {link.label}
                </Button>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-gray-500">Services</h3>
            <nav className="mt-4 grid justify-items-start gap-3" aria-label="Service navigation">
              {serviceLinks.map((link) => (
                <Button key={link.href} href={link.href} variant="link" size="text" className="text-sm font-normal text-gray-400 no-underline hover:text-white hover:no-underline">
                  {link.label}
                </Button>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-gray-500">Follow</h3>
            <div className="mt-4 grid justify-items-start gap-3">
              {settings.socials.map((social, index) => {
                const rawSocial = rawSiteSettings?.socials?.[index];
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target={social.openInNewTab ? '_blank' : undefined}
                    rel={social.openInNewTab ? 'noopener noreferrer' : undefined}
                    onClick={() => trackSocialLinkClick(social.name, 'footer')}
                    className="group flex items-center gap-1.5 font-sans text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    <span data-tina-field={rawSocial ? tinaField(rawSocial, 'name') : undefined}>{social.name}</span>
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        <div className="border-b border-white/10 py-10 md:py-14">
          <LogoText className="flex w-full text-white" logoClassName="w-full max-w-none md:w-full" />
        </div>

        <div className="flex flex-col gap-5 pt-6 font-mono text-xs uppercase tracking-wider text-gray-600 md:flex-row md:items-center md:justify-between">
          <span>
            {settings.copyright}{' '}
            <span className="notranslate font-logo text-sm lowercase" translate="no">
              <strong>vish</strong> studio.
            </span>
          </span>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            {settings.footerLinks.map((link) => (
              <Button key={link.label} href={link.url} variant="link" size="text" className="text-xs font-normal uppercase tracking-wider text-gray-600 no-underline hover:text-white hover:no-underline">
                {link.label}
              </Button>
            ))}
            <CookieSettingsTrigger className="h-auto bg-transparent p-0 font-mono text-xs uppercase tracking-wider text-gray-600 shadow-none hover:bg-transparent hover:text-white" />
          </div>
        </div>
      </div>
    </footer>
  );
};
