import { motion } from 'motion/react';
import { TextReveal } from './TextReveal';

export const About = () => {
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
            About <br className="hidden md:block" />
            Us<span className="text-vish-accent">.</span>
          </h2>
        </motion.div>
        <div>
          <TextReveal className="font-display text-2xl md:text-3xl lg:text-4xl font-medium text-white mb-20 leading-[1.3]">
            We are a team of designers, developers, and strategists passionate about creating digital experiences that matter. We believe in simplicity, clarity, and the power of good design to transform businesses.
          </TextReveal>
          <TextReveal className="font-display text-2xl md:text-3xl lg:text-4xl font-medium text-white leading-[1.3]">
            From our studio in New York, we work with clients globally to build brands, websites, and products that stand out in a crowded digital landscape.
          </TextReveal>
        </div>
      </div>
    </section>
  );
};
