import { motion } from 'motion/react';
import { Process } from '../components/Process';
import { Contact } from '../components/Contact';
import { PageLayout } from '../components/ui/PageLayout';
import { PageHero } from '../components/ui/PageHero';
import { SectionTitle } from '../components/ui/SectionTitle';
import { useTinaServices } from '../hooks/useTinaVisualEditing';

export const ServicesPage = () => {
  const { data: content, tinaField, rawServicesPage } = useTinaServices();
  const services = content.categories;

  return (
    <PageLayout>
      <PageHero
        label={content.heroLabel}
        labelTinaField={tinaField('heroLabel')}
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

      {/* Detailed Services List */}
      <section className="px-6 md:px-12 py-32 bg-black">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-32">
          {services.map((service, index) => {
            const rawCat = rawServicesPage?.categories?.[index];
            return (
              <motion.div
                key={service.category}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-white/10 pt-12"
              >
                <div className="lg:col-span-4">
                  <span className="font-mono text-vish-accent text-sm mb-4 block">0{index + 1}</span>
                  <SectionTitle
                    size="xl"
                    className="mb-6"
                    tinaField={rawCat ? tinaField(rawCat, 'category') : undefined}
                  >
                    {service.category}
                  </SectionTitle>
                </div>

                <div className="lg:col-span-8 flex flex-col gap-12">
                  <p
                    className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-2xl"
                    data-tina-field={rawCat ? tinaField(rawCat, 'description') : undefined}
                  >
                    {service.description}
                  </p>

                  <div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4"
                    data-tina-field={rawCat ? tinaField(rawCat, 'items') : undefined}
                  >
                    {service.items.map((item, itemIndex) => {
                      const rawItem = rawCat?.items?.[itemIndex];
                      return (
                        <div key={item} className="flex items-center gap-4 group">
                          <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-vish-accent transition-colors duration-300" />
                          <span
                            className="font-sans text-lg text-white/60 group-hover:text-white transition-colors duration-300"
                            data-tina-field={rawItem !== undefined ? tinaField(rawCat, 'items') : undefined}
                          >
                            {item}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <Process />
      <Contact />
    </PageLayout>
  );
};
