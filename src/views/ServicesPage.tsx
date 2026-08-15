'use client';
import { motion } from 'motion/react';
import { Contact } from '../components/contact/contact';
import { ServiceCatalogue } from '../components/service-catalogue/service-catalogue';
import { PageLayout } from '../components/ui/page-layout/page-layout';
import { PageHero } from '../components/ui/page-hero/page-hero';
import { SectionTitle } from '../components/ui/section-title/section-title';
import { useTinaServices } from '../hooks/useTinaVisualEditing';

export const ServicesPage = () => {
  const { data: content, tinaField, rawServicesPage } = useTinaServices();
  const services = content.categories;

  return (
    <PageLayout>
      <PageHero
        label={content.heroLabel}
        labelTinaField={tinaField('heroLabel')}
        backgroundImage="/assets/img/services-hero.jpg"
        title={
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-medium tracking-tight leading-[0.95] text-white mb-12">
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
      />

      <ServiceCatalogue
        services={services}
        rawCategories={rawServicesPage?.categories}
        tinaField={tinaField}
      />
      <Contact />
    </PageLayout>
  );
};
