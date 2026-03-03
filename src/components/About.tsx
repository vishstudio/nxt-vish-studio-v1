import { motion } from 'motion/react';
import { TextReveal } from './TextReveal';
import { useTinaHome } from '../hooks/useTinaVisualEditing';
import { SectionTitle } from './ui/SectionTitle';

export const About = () => {
  const { data: content, tinaField } = useTinaHome();

  return (
    <section className="py-32 px-6 md:px-12 bg-vish-bg" id="about">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle className="mb-8" tinaField={tinaField('aboutHeading')}>
            {content.aboutHeading}
          </SectionTitle>
        </motion.div>
        <div>
          <div data-tina-field={tinaField('aboutParagraph1')}>
            <TextReveal className="font-display text-2xl md:text-3xl lg:text-4xl font-medium text-white mb-20 leading-[1.3]">
              {content.aboutParagraph1}
            </TextReveal>
          </div>
          <div data-tina-field={tinaField('aboutParagraph2')}>
            <TextReveal className="font-display text-2xl md:text-3xl lg:text-4xl font-medium text-white leading-[1.3]">
              {content.aboutParagraph2}
            </TextReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
