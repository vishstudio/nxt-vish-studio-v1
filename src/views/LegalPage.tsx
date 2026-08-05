'use client';
import type React from 'react';
import { motion } from 'motion/react';
import { PageLayout } from '../components/ui/page-layout/page-layout';
import { PageHero } from '../components/ui/page-hero/page-hero';
import { Contact } from '../components/contact/contact';
import { SectionTitle } from '../components/ui/section-title/section-title';
import { useTinaLegalPage } from '../hooks/useTinaVisualEditing';

interface LegalPageProps {
  slug: 'privacy' | 'terms';
}

const protectedEmail = 'hello@vish.studio';

const renderTextWithProtectedEmail = (text: string) =>
  text.split(protectedEmail).flatMap((part, index, parts) => {
    const nodes: React.ReactNode[] = [];

    if (part) {
      nodes.push(part);
    }

    if (index < parts.length - 1) {
      nodes.push(
        <span key={`email-${index}`} className="notranslate" translate="no">
          {protectedEmail}
        </span>,
      );
    }

    return nodes;
  });

const renderParagraphs = (body: string) => {
  return body
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => (
      <p key={paragraph} className="font-sans text-lg md:text-xl text-gray-400 leading-relaxed">
        {renderTextWithProtectedEmail(paragraph)}
      </p>
    ));
};

export const LegalPage = ({ slug }: LegalPageProps) => {
  const { data: content, tinaField, rawLegalPage } = useTinaLegalPage(slug);

  if (!content) {
    return (
      <PageLayout>
        <section className="legal-page px-6 md:px-12 py-32">
          <div className="max-w-[1400px] mx-auto">
            <h1 className="font-display text-5xl text-white">Page not found.</h1>
          </div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageHero
        label={content.heroLabel}
        labelTinaField={tinaField('heroLabel')}
        backgroundImage="/assets/img/legal-hero.jpg"
        title={
          <h1
            className="font-display text-6xl md:text-8xl lg:text-9xl font-medium tracking-tight leading-[0.95] text-white mb-12"
            data-tina-field={tinaField('title')}
          >
            {content.title}<span className="text-vish-accent">.</span>
          </h1>
        }
        description={content.intro}
        descriptionTinaField={tinaField('intro')}
      />

      <section className="legal-page px-6 md:px-12 py-24 md:py-32 bg-vish-bg">
        <div className="max-w-[1100px] mx-auto">
          <div className="border-y border-white/10 py-6 mb-16">
            <p
              className="font-mono text-xs text-gray-500 uppercase tracking-widest"
              data-tina-field={tinaField('lastUpdated')}
            >
              Last updated: {content.lastUpdated}
            </p>
          </div>

          <div className="space-y-14">
            {content.sections.map((section, index) => {
              const rawSection = rawLegalPage?.sections?.[index];

              return (
                <motion.section
                  key={`${section.title}-${index}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: (index % 3) * 0.05 }}
                  className="border-t border-white/10 pt-10"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
                    <div className="md:col-span-4">
                      <span className="font-mono text-xs text-vish-accent">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <SectionTitle
                        size="sm"
                        className="mt-3"
                        tinaField={rawSection ? tinaField(rawSection, 'title') : undefined}
                      >
                        {section.title}
                      </SectionTitle>
                    </div>
                    <div
                      className="md:col-span-8 space-y-5"
                      data-tina-field={rawSection ? tinaField(rawSection, 'body') : undefined}
                    >
                      {renderParagraphs(section.body)}
                    </div>
                  </div>
                </motion.section>
              );
            })}
          </div>
        </div>
      </section>

      <Contact />
    </PageLayout>
  );
};
