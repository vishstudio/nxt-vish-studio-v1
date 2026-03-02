import { motion } from 'motion/react';
import { Navbar } from '../components/Navbar';
import { CustomCursor } from '../components/CustomCursor';
import { Process } from '../components/Process';
import { Contact } from '../components/Contact';
import { ScrollCircular } from '../components/ScrollCircular';

export const ServicesPage = () => {
  const services = [
    {
      category: "Strategy",
      description: "We build the foundation for your digital presence, ensuring every decision is data-driven and aligned with your business goals.",
      items: ["Brand Strategy", "UX Research", "Content Strategy", "Market Analysis", "Digital Transformation", "Product Roadmap"]
    },
    {
      category: "Design",
      description: "Crafting beautiful, functional, and user-centric interfaces that tell your story and engage your audience.",
      items: ["UI/UX Design", "Visual Identity", "Motion Design", "Design Systems", "Prototyping", "Interaction Design"]
    },
    {
      category: "Development",
      description: "Turning designs into robust, scalable digital products using cutting-edge technologies and best practices.",
      items: ["Frontend Development", "Backend Engineering", "CMS Integration", "Creative Coding", "E-commerce Solutions", "API Development"]
    },
    {
      category: "Marketing",
      description: "Amplifying your message to reach the right audience and drive meaningful growth for your brand.",
      items: ["SEO Optimization", "Social Media Strategy", "Email Marketing", "Analytics & Reporting", "Performance Marketing", "Content Creation"]
    }
  ];

  return (
    <div className="bg-vish-bg min-h-screen text-white selection:bg-vish-accent selection:text-black cursor-none">
      <CustomCursor />
      <Navbar />
      <ScrollCircular />

      <main className="pt-32">
        {/* Hero Section */}
        <section className="px-6 md:px-12 py-20 min-h-[60vh] flex flex-col justify-end">
          <div className="max-w-[1400px] mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <span className="font-mono text-sm text-vish-accent uppercase tracking-widest">Our Expertise</span>
            </motion.div>

            <h1 className="font-display text-7xl md:text-9xl font-medium tracking-tight leading-[0.9] text-white mb-12">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                Services
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="block text-gray-500"
              >
                & Capabilities<span className="text-vish-accent">.</span>
              </motion.span>
            </h1>
          </div>
        </section>

        {/* Detailed Services List */}
        <section className="px-6 md:px-12 py-32 bg-black">
          <div className="max-w-[1400px] mx-auto flex flex-col gap-32">
            {services.map((service, index) => (
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
                  <h2 className="font-display text-5xl md:text-6xl text-white mb-6">{service.category}</h2>
                </div>

                <div className="lg:col-span-8 flex flex-col gap-12">
                  <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-2xl">
                    {service.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                    {service.items.map((item) => (
                      <div key={item} className="flex items-center gap-4 group">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-vish-accent transition-colors duration-300" />
                        <span className="font-sans text-lg text-white/60 group-hover:text-white transition-colors duration-300">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <Process />
        <Contact />
      </main>
    </div>
  );
};
