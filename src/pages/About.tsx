import { motion } from 'motion/react';
import { Contact } from '../components/Contact';
import { Team } from '../components/Team';
import { TextReveal } from '../components/TextReveal';
import { TrustedPartners } from '../components/TrustedPartners';
import { PageLayout } from '../components/ui/PageLayout';
import { PageHero } from '../components/ui/PageHero';
import { useTinaAbout } from '../hooks/useTinaVisualEditing';

export const AboutPage = () => {
  const { data: content, tinaField } = useTinaAbout();

  return (
    <PageLayout>
      <PageHero
        label={content.heroLabel}
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

      {/* Image & Intro Section */}
      <section className="px-6 md:px-12 py-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/3] lg:aspect-square overflow-hidden rounded-sm"
            >
              <img
                src={content.studioImage}
                alt={content.studioImageAlt}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>

            <div className="space-y-12 lg:pt-24">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-4xl md:text-5xl leading-tight"
                data-tina-field={tinaField('introHeading')}
              >
                {content.introHeading}
              </motion.h2>
              <div className="space-y-12">
                <TextReveal className="font-sans text-xl text-gray-400 leading-relaxed">
                  {content.introParagraph1}
                </TextReveal>
                <TextReveal className="font-sans text-xl text-gray-400 leading-relaxed">
                  {content.introParagraph2}
                </TextReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-6 md:px-12 py-32 bg-vish-bg text-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-24">
            <span className="font-mono text-sm text-vish-accent uppercase tracking-widest block mb-4">{content.valuesLabel}</span>
            <h2 className="font-display text-6xl md:text-8xl tracking-tight leading-none text-white">{content.valuesHeading}</h2>
          </div>

          <div className="grid grid-cols-1 border-t border-white/10">
            {content.values.map((value, index) => (
              <div key={index} className="group grid grid-cols-1 md:grid-cols-12 gap-8 py-16 border-b border-white/10 transition-colors duration-500 hover:bg-white/[0.02]">
                <div className="md:col-span-1 font-mono text-sm text-vish-accent pt-2">
                  /{value.id}
                </div>
                <div className="md:col-span-5">
                  <h3 className="font-display text-4xl md:text-5xl font-medium text-white group-hover:translate-x-2 transition-transform duration-500">{value.title}</h3>
                </div>
                <div className="md:col-span-6">
                  <p className="font-sans text-xl text-gray-400 leading-relaxed max-w-lg group-hover:text-gray-300 transition-colors duration-500">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Team members={content.teamMembers} />
      <TrustedPartners />
      <Contact />
    </PageLayout>
  );
};
