import { motion } from 'motion/react';
import { team } from '../data/team';

export const Team = () => {
  return (
    <section className="py-32 px-6 md:px-12 bg-vish-bg" id="team">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <h2 className="font-display text-4xl md:text-5xl font-medium text-white mb-6">Our Team</h2>
          <p className="font-sans text-xl text-gray-400 max-w-2xl">
            A collective of creative minds dedicated to pushing the boundaries of digital design.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {team.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl mb-6 bg-white/5 border border-white/10">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              
              <h3 className="font-display text-2xl text-white mb-2 group-hover:text-vish-accent transition-colors duration-300">
                {member.name}
              </h3>
              <p className="font-mono text-sm text-gray-500 mb-4 uppercase tracking-wider">
                {member.role}
              </p>
              <p className="font-sans text-gray-400 text-sm leading-relaxed opacity-0 h-0 group-hover:opacity-100 group-hover:h-auto transition-all duration-500 overflow-hidden">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
