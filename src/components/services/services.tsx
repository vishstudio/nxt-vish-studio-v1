'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button/button';
import { useTinaHome } from '../../hooks/useTinaVisualEditing';
import { SectionTitle } from '../ui/section-title/section-title';

const developmentTechStack = [
  'React',
  'TypeScript',
  'Next.js',
  'Tailwind CSS',
  'Node.js',
  'Firebase/Firestore',
];

export const Services = () => {
  const { data: content, tinaField } = useTinaHome();
  const services = content.services;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section ref={sectionRef} className="services relative py-32 px-6 md:px-12 bg-black overflow-hidden" id="services">
      <motion.img
        src="/assets/img/services-section.jpg"
        alt=""
        className="absolute -top-[10%] left-0 w-full h-[120%] object-cover opacity-30 will-change-transform"
        style={{ y: backgroundY }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
      <div className="absolute inset-0 bg-linear-to-b from-vish-bg/70 via-black/15 to-vish-bg/80" aria-hidden="true" />

      <div className="relative z-10 max-w-[1400px] mx-auto">
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
            <Button href="/services" variant="navigation" size="md" icon={<ArrowRight className="w-4 h-4" />}>
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
              className="group relative p-8 rounded-2xl bg-black/35 backdrop-blur-[2px] border border-white/10 hover:bg-black/45 hover:border-white/20 transition-all duration-500 flex flex-col justify-between min-h-[320px]"
            >
              <div>
                <span className="font-mono text-xs text-vish-accent mb-4 block">{service.id}</span>
                <h3 className="font-display text-3xl text-white mb-4 group-hover:translate-x-1 transition-transform duration-300">
                  {service.title}
                </h3>
                <p className="font-sans text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
                  {service.description}
                </p>
                {service.title === 'Development' && (
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label="Development tech stack">
                    {developmentTechStack.map((technology, techIndex) => (
                      <motion.li
                        key={technology}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2 + techIndex * 0.04 }}
                        className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-white/45 transition-colors duration-300 hover:border-white/20 hover:text-white/75"
                      >
                        {technology}
                      </motion.li>
                    ))}
                  </ul>
                )}
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
          <Button href="/services" variant="navigation" size="md" icon={<ArrowRight className="w-4 h-4" />}>
            {content.servicesButtonText}
          </Button>
        </div>
      </div>
    </section>
  );
};
