'use client';

import { trackEmailClick, trackSocialLinkClick } from '@/src/lib/analytics';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useTinaSettings } from '../../hooks/useTinaVisualEditing';
import { CookieSettingsTrigger } from '../cookie-settings/cookie-settings-trigger';
import { LogoText } from '../logo-text/logo-text';
import { NewsletterSignup } from '../newsletter-signup/newsletter-signup';

export const Contact = () => {
  const { data: settings, tinaField, rawSiteSettings } = useTinaSettings();

  return (
    <footer className="contact relative overflow-hidden bg-black px-6 py-20 pb-4 text-white md:px-12 md:py-24 md:pb-5" id="contact">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,#000_45%,transparent_100%)]" />

      <div
        aria-hidden="true"
        className="notranslate pointer-events-none absolute inset-x-0 bottom-4 z-0 overflow-hidden text-center"
        translate="no"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={{
            hidden: { opacity: 0, y: '0.3em', filter: 'blur(8px)' },
            visible: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
            },
          }}
          className="notranslate inline-flex text-white/[0.055] select-none"
        >
          <LogoText logoClassName="w-screen max-w-none md:w-screen" />
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px]">
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl font-display text-5xl font-medium leading-[0.94] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <span className="text-white" data-tina-field={tinaField('contactHeadingLine1')}>
            {settings.contactHeadingLine1}
          </span>{' '}
          <span className="text-vish-gray" data-tina-field={tinaField('contactHeadingLine2')}>
            {settings.contactHeadingLine2}
          </span>
          <span className="text-vish-accent">.</span>
        </motion.h2>

        <div className="mt-12 grid gap-10 border-y border-white/10 py-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(24rem,1.1fr)] lg:gap-20 lg:py-12">
          <div className="flex flex-col justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-vish-accent">Start a conversation</p>
              <a
                href={`mailto:${settings.email}`}
                className="notranslate mt-5 flex w-fit items-center gap-4 font-display text-3xl leading-none text-white transition-colors hover:text-vish-accent sm:text-4xl md:text-5xl"
                aria-label="Start a project inquiry with VISH Studio by email"
                onClick={trackEmailClick}
                translate="no"
              >
                {settings.email}
                <ArrowUpRight className="size-7 shrink-0 sm:size-8" aria-hidden="true" />
              </a>
            </div>
            <p className="mt-8 max-w-md font-sans text-sm leading-relaxed text-gray-400 md:text-base">
              Based in Mauritius, partnering with scaling brands globally to engineer distinct digital ecosystems.
            </p>
          </div>

          <NewsletterSignup source="footer" settings={settings} tinaField={tinaField} />
        </div>

        <div className="grid gap-9 py-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-gray-500">Call us</h3>
            <a href={settings.phoneLink} className="mt-4 block font-display text-2xl text-white transition-colors hover:text-vish-accent">
              {settings.phone}
            </a>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-gray-500">Visit us</h3>
            <address className="mt-4 whitespace-pre-line font-sans text-base leading-relaxed text-gray-400 not-italic">
              {settings.address}
            </address>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-mono text-xs uppercase tracking-widest text-gray-500">Follow the studio</h3>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
              {settings.socials.map((social, index) => {
                const rawSocial = rawSiteSettings?.socials?.[index];
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target={social.openInNewTab ? '_blank' : undefined}
                    rel={social.openInNewTab ? 'noopener noreferrer' : undefined}
                    onClick={() => trackSocialLinkClick(social.name, 'footer')}
                    className="group flex items-center gap-1.5 font-sans text-base text-gray-400 transition-colors hover:text-white"
                  >
                    <span data-tina-field={rawSocial ? tinaField(rawSocial, 'name') : undefined}>{social.name}</span>
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-6 font-mono text-xs uppercase tracking-wider text-gray-600 md:flex-row">
          <span>
            {settings.copyright}{' '}
            <span className="notranslate font-logo text-sm lowercase" translate="no">
              <strong>vish</strong> studio.
            </span>
          </span>
          <div className="flex flex-wrap items-center justify-center gap-5 md:justify-end md:gap-7">
            {settings.footerLinks.map((link) => (
              <a key={link.label} href={link.url} className="transition-colors hover:text-white">
                {link.label}
              </a>
            ))}
            <CookieSettingsTrigger className="h-auto bg-transparent p-0 font-mono text-xs uppercase tracking-wider text-gray-600 shadow-none hover:bg-transparent hover:text-white" />
          </div>
        </div>
      </div>
    </footer>
  );
};
