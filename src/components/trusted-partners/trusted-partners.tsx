'use client';
import { motion } from 'motion/react';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useTinaPartners } from '../../hooks/useTinaVisualEditing';
import { PROJECT_INQUIRY_ACTION, PROJECT_INQUIRY_HREF } from '../../lib/conversion';
import { Button } from '../ui/button/button';
import { SectionTitle } from '../ui/section-title/section-title';

export const TrustedPartners = () => {
  const { data, tinaField } = useTinaPartners();
  const partners = data.partners;
  const proofPoints = data.proofPoints;

  return (
    <section className="trusted-partners bg-vish-bg px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <p
              className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-vish-accent"
              data-tina-field={tinaField('partnersLabel')}
            >
              {data.partnersLabel}
            </p>
            <SectionTitle
              size="sm"
              className="max-w-xl leading-[1.04]"
              tinaField={tinaField('trustHeading')}
            >
              {data.trustHeading}
            </SectionTitle>

            <p
              className="mt-6 max-w-md font-sans text-base leading-relaxed text-vish-gray md:text-lg"
              data-tina-field={tinaField('trustDescription')}
            >
              {data.trustDescription}
            </p>
            <div className="mt-8">
              <Button
                href={PROJECT_INQUIRY_HREF}
                variant="cta"
                size="md"
                icon={<ArrowUpRight className="h-4 w-4" />}
                iconPosition="right"
                dataConversionAction={PROJECT_INQUIRY_ACTION}
                className="w-full font-mono text-xs font-semibold uppercase tracking-widest sm:w-auto"
                data-tina-field={tinaField('ctaLabel')}
              >
                {data.ctaLabel}
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="lg:col-span-7"
          >
            <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
              {partners.map((partner, index) => {
                const isLastOddPartner = partners.length % 2 !== 0 && index === partners.length - 1;
                const cellClassName = `group flex min-h-[6rem] items-center justify-between gap-5 bg-vish-bg p-5 md:p-6 ${
                  isLastOddPartner ? 'sm:col-span-2' : ''
                }`;
                const partnerContent = (
                  <>
                    <span className="font-display text-xl font-medium leading-tight text-white transition-colors duration-300 group-hover:text-vish-accent md:text-2xl">
                      {partner.name}
                    </span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-vish-gray transition-colors duration-300 group-hover:border-vish-accent/40 group-hover:text-vish-accent">
                      {partner.url ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ShieldCheck className="h-4 w-4" />
                      )}
                    </span>
                  </>
                );

                return partner.url ? (
                  <a
                    key={partner.name}
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${cellClassName} transition-colors duration-300 hover:bg-white/[0.03]`}
                  >
                    {partnerContent}
                  </a>
                ) : (
                  <div
                    key={partner.name}
                    className={cellClassName}
                  >
                    {partnerContent}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {proofPoints.map((proof) => (
                <div key={proof.label} className="rounded-2xl border border-white/10 px-5 py-4">
                  <p className="font-display text-2xl font-medium leading-none text-white md:text-3xl">
                    {proof.value}
                  </p>
                  <p className="mt-2 font-mono text-[0.66rem] font-semibold uppercase tracking-widest text-vish-gray">
                    {proof.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
