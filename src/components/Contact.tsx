'use client';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useTinaSettings } from '../hooks/useTinaVisualEditing';

export const Contact = () => {
  const { data: settings, tinaField, rawSiteSettings } = useTinaSettings();

  return (
    <section className="bg-black text-white py-32 pb-4 px-6 md:px-12 relative overflow-hidden" id="contact">
      {/* Background Grid - Optional subtle texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* Header */}
        <div className="mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-6xl md:text-8xl lg:text-9xl font-medium tracking-tight leading-[0.95] text-white"
          >
            <span className="text-white" data-tina-field={tinaField('contactHeadingLine1')}>{settings.contactHeadingLine1}</span> <br />
            <span className="text-gray-500" data-tina-field={tinaField('contactHeadingLine2')}>{settings.contactHeadingLine2}</span><span className="text-vish-accent">.</span>
          </motion.h2>
        </div>

        <div className="border-t border-white/10 pt-24">

          {/* Main Contact Link */}
          <div className="mb-24">
            <a
              href={`mailto:${settings.email}`}
              className="block w-full"
            >
              <motion.div
                initial="initial"
                whileHover="hover"
                variants={{
                  initial: { backgroundColor: "rgba(0,0,0,0)" },
                  hover: {
                    backgroundColor: "#FFD600",
                    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
                  }
                }}
                className="flex items-center justify-between border-b border-white/10 py-8 px-4 md:px-8 -mx-4 md:-mx-8 rounded-xl"
              >
                <motion.span
                  className="font-display text-4xl md:text-7xl text-white"
                  variants={{
                    hover: {
                      color: "#000000",
                      x: 10,
                      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
                    }
                  }}
                >
                  {settings.email}
                </motion.span>
                <motion.div
                  variants={{
                    initial: { color: "#6b7280", rotate: 0 },
                    hover: {
                      color: "#000000",
                      rotate: 45,
                      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
                    }
                  }}
                >
                  <ArrowUpRight className="w-12 h-12 md:w-24 md:h-24" />
                </motion.div>
              </motion.div>
            </a>
          </div>

          {/* Secondary Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">

            {/* Phone */}
            <div>
              <h3 className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-6">Call Us</h3>
              <a href={settings.phoneLink} className="block font-display text-2xl hover:text-vish-accent transition-colors">{settings.phone}</a>
            </div>

            {/* Address */}
            <div>
              <h3 className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-6">Visit Us</h3>
              <address className="font-sans text-lg text-gray-400 not-italic leading-relaxed whitespace-pre-line">
                {settings.address}
              </address>
            </div>

            {/* Socials */}
            <div>
              <h3 className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-6">Socials</h3>
              <div className="flex flex-col gap-4">
                {settings.socials.map((social, index) => {
                  const rawSocial = rawSiteSettings?.socials?.[index];
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target={social.openInNewTab ? '_blank' : undefined}
                      rel={social.openInNewTab ? 'noopener noreferrer' : undefined}
                      className="font-sans text-lg text-gray-400 hover:text-white transition-colors flex items-center gap-2 group w-fit"
                    >
                      <span data-tina-field={rawSocial ? tinaField(rawSocial, 'name') : undefined}>{social.name}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-mono text-gray-600 uppercase tracking-wider">
          <span>{settings.copyright}</span>
          <div className="flex gap-8">
            {settings.footerLinks.map((link) => (
              <a key={link.label} href={link.url} className="hover:text-white transition-colors">{link.label}</a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
