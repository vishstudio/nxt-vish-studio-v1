import { motion } from 'motion/react';

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
          <h2 className="font-display text-4xl font-medium mb-8 text-white">About Us</h2>
        </motion.div>
        <div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-xl md:text-2xl text-gray-400 leading-relaxed mb-8"
          >
            We are a team of designers, developers, and strategists passionate about creating digital experiences that matter. We believe in simplicity, clarity, and the power of good design to transform businesses.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-sans text-xl md:text-2xl text-gray-400 leading-relaxed"
          >
            From our studio in New York, we work with clients globally to build brands, websites, and products that stand out in a crowded digital landscape.
          </motion.p>
        </div>
      </div>
    </section>
  );
};
