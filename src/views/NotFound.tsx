'use client';
import { motion } from 'motion/react';
import { SectionTitle } from '../components/ui/section-title/section-title';
import { ArrowRight } from 'lucide-react';
import { PageLayout } from '../components/ui/page-layout/page-layout';
import { Button } from '../components/ui/button/button';
import { Contact } from '../components/contact/contact';
import { useTinaPage } from '../hooks/tina/usePage';
import { getNotFoundPage } from '../lib/content';

export const NotFound = () => {
  const { data: content, tinaField } = useTinaPage('not-found.json', getNotFoundPage());

  return (
    <PageLayout>
      <section className="min-h-[70vh] flex flex-col items-center justify-center px-6 md:px-12 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-vish-accent/5 rounded-full blur-[120px] opacity-50 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-display text-8xl md:text-[12rem] lg:text-[15rem] leading-none font-bold text-white tracking-tighter mb-4">
              404<span className="text-vish-accent">.</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionTitle className="mb-8" tinaField={tinaField('heading')}>{content.heading}</SectionTitle>
            <p
              className="font-sans text-xl text-gray-400 leading-relaxed mb-12 max-w-xl mx-auto"
              data-tina-field={tinaField('description')}
            >
              {content.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Button 
              href="/"
              variant="navigation"
              icon={<ArrowRight className="w-4 h-4" />}
              tinaField={tinaField('ctaLabel')}
            >
              {content.ctaLabel}
            </Button>
          </motion.div>
        </div>
      </section>
      <Contact />
    </PageLayout>
  );
};
