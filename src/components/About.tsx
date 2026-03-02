import { motion } from 'motion/react';
import { TextReveal } from './TextReveal';
import { getHomePage } from '../lib/content';

export const About = () => {
  const content = getHomePage();

  return (
    <section className="py-32 px-6 md:px-12 bg-vish-bg" id="about">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-medium mb-8 text-white">
            {content.aboutHeading}<span className="text-vish-accent">.</span>
          </h2>
        </motion.div>
        <div>
          <TextReveal className="font-display text-2xl md:text-3xl lg:text-4xl font-medium text-white mb-20 leading-[1.3]">
            {content.aboutParagraph1}
          </TextReveal>
          <TextReveal className="font-display text-2xl md:text-3xl lg:text-4xl font-medium text-white leading-[1.3]">
            {content.aboutParagraph2}
          </TextReveal>
        </div>
      </div>
    </section>
  );
};
