import { motion } from 'motion/react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
import { useTinaHome } from '../hooks/useTinaVisualEditing';
import { SectionTitle } from './ui/SectionTitle';

export const Services = () => {
  const { data: content, tinaField } = useTinaHome();
  const services = content.services;

  return (
    <section className="py-32 px-6 md:px-12 bg-black/20" id="services">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle className="mb-6" tinaField={tinaField('servicesHeading')}>
              {content.servicesHeading}
            </SectionTitle>
            <p className="font-sans text-gray-400 text-lg max-w-md" data-tina-field={tinaField('servicesSubtext')}>
              {content.servicesSubtext}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:block"
          >
            <Button href="/services" variant="white" size="md" icon={<ArrowRight className="w-4 h-4" />}>
              {content.servicesButtonText}
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.a
              key={index}
              href="/services"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all duration-500 flex flex-col justify-between min-h-[320px]"
            >
              <div>
                <span className="font-mono text-xs text-vish-accent mb-4 block">{service.id}</span>
                <h3 className="font-display text-3xl text-white mb-4 group-hover:translate-x-1 transition-transform duration-300">
                  {service.title}
                </h3>
                <p className="font-sans text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
                  {service.description}
                </p>
              </div>

              <div className="flex justify-between items-end mt-8">
                <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-vish-accent group-hover:text-black transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-12 md:hidden flex justify-center">
          <Button href="/services" variant="white" size="md" icon={<ArrowRight className="w-4 h-4" />}>
            {content.servicesButtonText}
          </Button>
        </div>
      </div>
    </section>
  );
};
