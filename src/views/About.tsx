'use client';
import { ArrowRight, CalendarCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { Contact } from '../components/contact/contact';
import { ProjectsCta } from '../components/projects-cta/projects-cta';
import { Team } from '../components/team/team';
import { TextReveal } from '../components/text-reveal/text-reveal';
import { TrustedPartners } from '../components/trusted-partners/trusted-partners';
import { Button } from '../components/ui/button/button';
import { PageLayout } from '../components/ui/page-layout/page-layout';
import { PageHero } from '../components/ui/page-hero/page-hero';
import { SectionTitle } from '../components/ui/section-title/section-title';
import { useTinaAbout } from '../hooks/useTinaVisualEditing';
import {
  PROJECT_INQUIRY_ACTION,
  PROJECT_INQUIRY_ARIA_LABEL,
  PROJECT_INQUIRY_HREF,
} from '../lib/conversion';

export const AboutPage = () => {
  const { data: content, tinaField, rawAboutPage } = useTinaAbout();

  return (
    <PageLayout>
      <PageHero
        label={content.heroLabel}
        labelTinaField={tinaField('heroLabel')}
        backgroundImage="/assets/img/about-hero.jpg"
        title={
          <h1 className="mb-10 font-display text-6xl font-medium leading-[0.95] tracking-tight text-white md:text-8xl lg:text-9xl">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="block"
              data-tina-field={tinaField('heroTitleLine1')}
            >
              {content.heroTitleLine1}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="block text-gray-500"
              data-tina-field={tinaField('heroTitleLine2')}
            >
              {content.heroTitleLine2}<span className="text-vish-accent">.</span>
            </motion.span>
          </h1>
        }
        description={content.heroDescription}
        descriptionTinaField={tinaField('heroDescription')}
        action={
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9"
          >
            <Button
              variant="cta"
              size="lg"
              href={PROJECT_INQUIRY_HREF}
              icon={<CalendarCheck className="h-5 w-5" />}
              iconPosition="right"
              ariaLabel={PROJECT_INQUIRY_ARIA_LABEL}
              dataConversionAction={PROJECT_INQUIRY_ACTION}
              className="font-mono text-xs font-semibold uppercase tracking-widest"
            >
              Schedule a Free Call
            </Button>
          </motion.div>
        }
      />

      <section className="bg-vish-bg px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-start gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 lg:aspect-square"
            data-tina-field={tinaField('studioImage')}
          >
            <img
              src={content.studioImage}
              alt={content.studioImageAlt}
              className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
            />
          </motion.div>

          <div className="space-y-10 lg:py-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="mb-5 block font-mono text-xs uppercase tracking-widest text-vish-accent">
                The VISH story
              </span>
              <SectionTitle size="sm" tinaField={tinaField('introHeading')}>
                {content.introHeading}
              </SectionTitle>
            </motion.div>
            <div className="max-w-2xl space-y-7">
              <TextReveal
                className="font-sans text-lg leading-relaxed text-gray-400 md:text-xl"
                tinaField={tinaField('introParagraph1')}
              >
                {content.introParagraph1}
              </TextReveal>
              <TextReveal
                className="font-sans text-lg leading-relaxed text-gray-400 md:text-xl"
                tinaField={tinaField('introParagraph2')}
              >
                {content.introParagraph2}
              </TextReveal>
            </div>
            <Button
              variant="outline"
              size="md"
              href="/projects"
              icon={<ArrowRight className="h-4 w-4" />}
              iconPosition="right"
              className="font-mono text-xs font-semibold uppercase tracking-widest"
            >
              See the work
            </Button>
          </div>
        </div>
      </section>

      <Team members={content.teamMembers} rawTinaMembers={rawAboutPage?.teamMembers} tinaField={tinaField} />

      <TrustedPartners />

      <section className="bg-vish-bg px-6 py-24 text-white md:px-12 md:py-32">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 lg:grid-cols-[minmax(18rem,0.7fr)_minmax(0,1.3fr)] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <span
              className="mb-4 block font-mono text-sm uppercase tracking-widest text-vish-accent"
              data-tina-field={tinaField('valuesLabel')}
            >
              {content.valuesLabel}
            </span>
            <SectionTitle size="lg" tinaField={tinaField('valuesHeading')}>
              {content.valuesHeading}
            </SectionTitle>
          </div>

          <div className="grid grid-cols-1 border-t border-white/10">
            {content.values.map((value, index) => (
              <div
                key={value.id}
                className="group grid grid-cols-1 gap-7 border-b border-white/10 py-12 transition-colors duration-500 hover:bg-white/[0.02] md:grid-cols-12 md:py-14"
                data-tina-field={rawAboutPage?.values?.[index] ? tinaField(rawAboutPage.values[index], 'id') : undefined}
              >
                <div className="pt-2 font-mono text-sm text-vish-accent md:col-span-1">
                  /{value.id}
                </div>
                <div className="md:col-span-5">
                  <h3
                    className="font-display text-4xl font-medium text-white transition-transform duration-500 group-hover:translate-x-2 md:text-5xl"
                    data-tina-field={rawAboutPage?.values?.[index] ? tinaField(rawAboutPage.values[index], 'title') : undefined}
                  >
                    {value.title}
                  </h3>
                </div>
                <div className="md:col-span-6">
                  <p
                    className="max-w-lg font-sans text-lg leading-relaxed text-gray-400 transition-colors duration-500 group-hover:text-gray-300 md:text-xl"
                    data-tina-field={rawAboutPage?.values?.[index] ? tinaField(rawAboutPage.values[index], 'description') : undefined}
                  >
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProjectsCta index={2} backgroundImage="/assets/img/about-studio.jpg" />

      <Contact />
    </PageLayout>
  );
};
