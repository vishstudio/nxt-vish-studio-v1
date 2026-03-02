import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export const Services = () => {
  const services = [
    {
      title: "Strategy",
      description: "We build the foundation for your digital presence.",
      items: ["Brand Strategy", "UX Research", "Content Strategy", "Market Analysis"]
    },
    {
      title: "Design",
      description: "Crafting beautiful, functional, and user-centric interfaces.",
      items: ["UI/UX Design", "Visual Identity", "Motion Design", "Design Systems"]
    },
    {
      title: "Development",
      description: "Turning designs into robust, scalable digital products.",
      items: ["Frontend Development", "Backend Engineering", "CMS Integration", "Creative Coding"]
    },
    {
      title: "Marketing",
      description: "Amplifying your message to reach the right audience.",
      items: ["SEO Optimization", "Social Media", "Email Marketing", "Analytics"]
    }
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-vish-bg" id="services">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-24 flex justify-between items-end">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl md:text-5xl font-medium text-white"
          >
            Our Services<span className="text-vish-accent">.</span>
          </motion.h2>
          <motion.a 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            href="#" 
            className="hidden md:flex items-center gap-2 text-sm font-sans font-medium text-gray-400 hover:text-vish-accent transition-colors"
          >
            View full capabilities <ArrowUpRight className="w-4 h-4" />
          </motion.a>
        </div>

        <div className="flex flex-col">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group border-t border-white/10 hover:border-white/20 py-12 md:py-16 flex flex-col md:flex-row md:items-start justify-between gap-8 hover:bg-white/5 transition-all duration-300 px-4 -mx-4 rounded-xl"
            >
              <div className="md:w-1/3">
                <h3 className="font-display text-3xl md:text-4xl font-medium text-white group-hover:text-vish-accent group-hover:translate-x-2 transition-all duration-300">
                  {service.title}
                </h3>
              </div>
              
              <div className="md:w-2/3 flex flex-col md:flex-row gap-8 md:gap-16">
                <p className="font-sans text-lg text-gray-400 max-w-sm leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                  {service.items.map((item, i) => (
                    <li key={i} className="font-sans text-sm text-gray-500 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-vish-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-px bg-white/10 origin-left"
          />
        </div>
      </div>
    </section>
  );
};
